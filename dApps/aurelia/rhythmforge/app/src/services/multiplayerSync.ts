export type MultiplayerState = {
  playerId: string;
  score: number;
  combo: number;
  health: number;
  songTimeMs: number;
  updatedAt: number;
};

export type MultiplayerGameplayEvent = {
  playerId: string;
  eventType: 'hit' | 'miss' | 'submit';
  laneIndex: number | null;
  score: number;
  combo: number;
  health: number;
  songTimeMs: number;
  emittedAt: number;
  serverSeq?: number;
  serverTime?: number;
};

type MultiplayerEnvelope = {
  roomId: string;
  type:
    | 'hello'
    | 'hello-ack'
    | 'sync-request'
    | 'sync-response'
    | 'state-update'
    | 'heartbeat'
    | 'peer-left'
    | 'gameplay-event';
  payload: MultiplayerState;
  event?: MultiplayerGameplayEvent;
  serverTime?: number;
  playerId?: string;
  clientSentAt?: number;
  clientEchoAt?: number;
};

type StateHandler = (states: MultiplayerState[]) => void;
type EventHandler = (event: MultiplayerGameplayEvent) => void;

export class MultiplayerSyncClient {
  private roomId: string;
  private playerId: string;
  private onStates: StateHandler;
  private onEvent?: EventHandler;
  private channel: BroadcastChannel | null = null;
  private socket: WebSocket | null = null;
  private peerStates = new Map<string, MultiplayerState>();
  private clockOffsetMs = 0;
  private syncIntervalId: number | null = null;
  private lastServerEventSeq = 0;

  constructor(roomId: string, playerId: string, onStates: StateHandler, onEvent?: EventHandler) {
    this.roomId = roomId;
    this.playerId = playerId;
    this.onStates = onStates;
    this.onEvent = onEvent;

    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(`rhythmforge:${roomId}`);
      this.channel.onmessage = (event: MessageEvent<MultiplayerEnvelope>) => {
        this.handleMessage(event.data);
      };
    }

    const websocketUrl = import.meta.env.VITE_MULTIPLAYER_WS_URL as string | undefined;
    if (websocketUrl) {
      try {
        this.socket = new WebSocket(websocketUrl);
        this.socket.onopen = () => {
          this.sendSocketMessage({
            roomId: this.roomId,
            type: 'hello',
            playerId: this.playerId,
            payload: this.emptyState(),
            clientSentAt: Date.now(),
          });
          this.startClockSync();
        };
        this.socket.onmessage = (event) => {
          try {
            this.handleMessage(JSON.parse(event.data) as MultiplayerEnvelope);
          } catch {
            // Ignore malformed packets.
          }
        };
        this.socket.onclose = () => {
          this.stopClockSync();
        };
      } catch {
        // Fall back to BroadcastChannel-only mode.
      }
    }
  }

  publish(state: Omit<MultiplayerState, 'playerId' | 'updatedAt'>) {
    const envelope: MultiplayerEnvelope = {
      roomId: this.roomId,
      type: 'state-update',
      payload: {
        playerId: this.playerId,
        score: state.score,
        combo: state.combo,
        health: state.health,
        songTimeMs: state.songTimeMs,
        updatedAt: Date.now(),
      },
      serverTime: Date.now() + this.clockOffsetMs,
    };

    this.channel?.postMessage(envelope);
    this.sendSocketMessage(envelope);
  }

  heartbeat() {
    const envelope: MultiplayerEnvelope = {
      roomId: this.roomId,
      type: 'heartbeat',
      payload: this.emptyState(),
      serverTime: Date.now() + this.clockOffsetMs,
    };

    this.channel?.postMessage(envelope);
    this.sendSocketMessage(envelope);
  }

  publishGameplayEvent(event: Omit<MultiplayerGameplayEvent, 'playerId' | 'emittedAt'>) {
    const envelope: MultiplayerEnvelope = {
      roomId: this.roomId,
      type: 'gameplay-event',
      payload: this.emptyState(),
      event: {
        ...event,
        playerId: this.playerId,
        emittedAt: Date.now(),
      },
      playerId: this.playerId,
      serverTime: Date.now() + this.clockOffsetMs,
    };

    this.channel?.postMessage(envelope);
    this.sendSocketMessage(envelope);
  }

  dispose() {
    this.stopClockSync();
    this.sendSocketMessage({
      roomId: this.roomId,
      type: 'peer-left',
      payload: this.emptyState(),
      playerId: this.playerId,
      clientSentAt: Date.now(),
    });

    this.channel?.close();
    if (this.socket) {
      this.socket.close();
    }
  }

  private handleMessage(message: MultiplayerEnvelope) {
    if (!message || message.roomId !== this.roomId) {
      return;
    }

    if (message.type === 'hello-ack' && typeof message.serverTime === 'number') {
      this.updateClockOffset(message.serverTime, message.clientEchoAt ?? Date.now());
      return;
    }

    if (message.type === 'sync-response' && typeof message.serverTime === 'number') {
      const echoedClientSentAt = message.clientEchoAt ?? Date.now();
      const now = Date.now();
      const rtt = Math.max(0, now - echoedClientSentAt);
      const candidateOffset = message.serverTime - (echoedClientSentAt + rtt / 2);
      this.clockOffsetMs = this.clockOffsetMs * 0.75 + candidateOffset * 0.25;
      return;
    }

    if (message.type === 'sync-request') {
      this.sendSocketMessage({
        roomId: this.roomId,
        type: 'sync-response',
        payload: this.emptyState(),
        playerId: this.playerId,
        serverTime: Date.now(),
        clientEchoAt: message.clientSentAt,
      });
      return;
    }

    if (message.type === 'peer-left' && message.playerId) {
      this.peerStates.delete(message.playerId);
      this.emitActiveStates();
      return;
    }

    if (message.type === 'gameplay-event' && message.event) {
      if (message.event.playerId === this.playerId) {
        return;
      }

      const incomingSeq = message.event.serverSeq ?? Number.MAX_SAFE_INTEGER;
      if (incomingSeq <= this.lastServerEventSeq) {
        return;
      }
      this.lastServerEventSeq = incomingSeq;

      this.onEvent?.({
        ...message.event,
        serverTime: message.serverTime,
      });
      return;
    }

    if (message.payload.playerId === this.playerId) {
      return;
    }

    if (message.type !== 'state-update' && message.type !== 'heartbeat') {
      return;
    }

    const canonicalUpdatedAt = typeof message.serverTime === 'number'
      ? message.serverTime - this.clockOffsetMs
      : message.payload.updatedAt;

    const normalizedState: MultiplayerState = {
      ...message.payload,
      updatedAt: canonicalUpdatedAt,
    };

    this.peerStates.set(normalizedState.playerId, normalizedState);
    this.emitActiveStates();
  }

  private emitActiveStates() {
    const activeStates = [...this.peerStates.values()]
      .filter((state) => Date.now() - state.updatedAt < 15_000)
      .sort((a, b) => b.score - a.score);

    this.onStates(activeStates);
  }

  private sendSocketMessage(message: MultiplayerEnvelope) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  private startClockSync() {
    this.stopClockSync();
    this.syncIntervalId = window.setInterval(() => {
      this.sendSocketMessage({
        roomId: this.roomId,
        type: 'sync-request',
        playerId: this.playerId,
        payload: this.emptyState(),
        clientSentAt: Date.now(),
      });
    }, 3000);
  }

  private stopClockSync() {
    if (this.syncIntervalId !== null) {
      window.clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  private updateClockOffset(serverTime: number, echoedClientSentAt: number) {
    const now = Date.now();
    const rtt = Math.max(0, now - echoedClientSentAt);
    const candidateOffset = serverTime - (echoedClientSentAt + rtt / 2);
    this.clockOffsetMs = this.clockOffsetMs * 0.7 + candidateOffset * 0.3;
  }

  private emptyState(): MultiplayerState {
    return {
      playerId: this.playerId,
      score: 0,
      combo: 0,
      health: 0,
      songTimeMs: 0,
      updatedAt: Date.now(),
    };
  }
}
