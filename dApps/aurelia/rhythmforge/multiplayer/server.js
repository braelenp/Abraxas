const http = require('http');
const { WebSocketServer, WebSocket } = require('ws');

const port = Number(process.env.MULTIPLAYER_PORT || 8787);

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, now: Date.now() }));
    return;
  }

  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Rhythmforge multiplayer relay is running.');
});

const wss = new WebSocketServer({ server });

const roomMembers = new Map();
const roomEventSequences = new Map();

const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const now = () => Date.now();

const nextRoomSequence = (roomId) => {
  const nextValue = (roomEventSequences.get(roomId) || 0) + 1;
  roomEventSequences.set(roomId, nextValue);
  return nextValue;
};

wss.on('connection', (socket) => {
  socket.meta = {
    roomId: null,
    playerId: null,
  };

  socket.on('message', (rawData) => {
    const message = safeJsonParse(rawData.toString());
    if (!message || typeof message !== 'object') {
      return;
    }

    const roomId = typeof message.roomId === 'string' ? message.roomId : null;
    const playerId = typeof message.playerId === 'string' ? message.playerId : null;

    if (!roomId) {
      return;
    }

    if (message.type === 'hello') {
      socket.meta.roomId = roomId;
      socket.meta.playerId = playerId || socket.meta.playerId;

      if (!roomMembers.has(roomId)) {
        roomMembers.set(roomId, new Set());
      }
      roomMembers.get(roomId).add(socket);

      socket.send(
        JSON.stringify({
          roomId,
          type: 'hello-ack',
          payload: message.payload || {},
          serverTime: now(),
          clientEchoAt: message.clientSentAt,
        })
      );
      return;
    }

    if (message.type === 'sync-request') {
      socket.send(
        JSON.stringify({
          roomId,
          type: 'sync-response',
          payload: message.payload || {},
          serverTime: now(),
          clientEchoAt: message.clientSentAt,
        })
      );
      return;
    }

    const members = roomMembers.get(roomId);
    if (!members) {
      return;
    }

    const relayEnvelope = JSON.stringify({
      ...message,
      roomId,
      serverTime: now(),
      playerId: playerId || socket.meta.playerId,
      event:
        message.type === 'gameplay-event' && message.event
          ? {
              ...message.event,
              serverSeq: nextRoomSequence(roomId),
            }
          : message.event,
    });

    for (const peer of members) {
      if (peer === socket || peer.readyState !== WebSocket.OPEN) {
        continue;
      }
      peer.send(relayEnvelope);
    }
  });

  socket.on('close', () => {
    const { roomId, playerId } = socket.meta;
    if (!roomId || !roomMembers.has(roomId)) {
      return;
    }

    const members = roomMembers.get(roomId);
    members.delete(socket);

    const peerLeft = JSON.stringify({
      roomId,
      type: 'peer-left',
      payload: {},
      playerId,
      serverTime: now(),
    });

    for (const peer of members) {
      if (peer.readyState === WebSocket.OPEN) {
        peer.send(peerLeft);
      }
    }

    if (members.size === 0) {
      roomMembers.delete(roomId);
      roomEventSequences.delete(roomId);
    }
  });
});

server.listen(port, () => {
  console.log(`Rhythmforge multiplayer relay listening on ws://localhost:${port}`);
});
