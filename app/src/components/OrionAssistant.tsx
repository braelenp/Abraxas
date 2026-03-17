import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: number;
};

type ChatSession = {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
};

type OrionScope = 'dashboard' | 'vaults' | 'circuit' | 'sophia' | 'orion';

type ScopedChatState = {
  sessions: ChatSession[];
  activeSessionId: string;
};

type OrionStorageState = Partial<Record<OrionScope, ScopedChatState>>;

const ORION_STORAGE_KEY = 'abraxas_orion_saved_chats_v1';

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrionScope(pathname: string, embedded: boolean): OrionScope {
  if (embedded || pathname.includes('/app/orion')) {
    return 'orion';
  }

  if (pathname.includes('/app/vaults')) {
    return 'vaults';
  }

  if (pathname.includes('/app/circuit')) {
    return 'circuit';
  }

  if (pathname.includes('/app/sophia')) {
    return 'sophia';
  }

  return 'dashboard';
}

function getOrionChatIntro(pathname: string) {
  if (pathname.includes('/app/vaults')) {
    return 'I am Orion. In Vaults, I can help compare allocation moves, highlight risk-sensitive metrics, and suggest the safest next rebalance step.';
  }

  if (pathname.includes('/app/circuit')) {
    return 'I am Orion. In Circuit, I can help tune trigger thresholds, stress test scenarios, and explain exactly which metric shifts warning to protect.';
  }

  if (pathname.includes('/app/sophia')) {
    return 'I am Orion. In Sophia, I can guide mint flow, agent setup, and the cleanest sequence of actions after wallet connection.';
  }

  if (pathname.includes('/app/orion')) {
    return 'I am Orion. This is your command hub—ask for cross-tab strategy across vaults, circuit safety, and Sophia execution planning.';
  }

  return 'I am Orion. On Dashboard, I can translate live signals into clear next actions across vault operations, safety checks, and execution flow.';
}

function isOrionIntroMessage(text: string) {
  const normalized = text.trim();
  const introCandidates = [
    getOrionChatIntro('/app'),
    getOrionChatIntro('/app/vaults'),
    getOrionChatIntro('/app/circuit'),
    getOrionChatIntro('/app/sophia'),
    getOrionChatIntro('/app/orion'),
    'I am Orion. Ask me anything about vaults, circuit safety, or Sophia workflows.',
  ];

  return introCandidates.includes(normalized);
}

function createDefaultSession(pathname: string): ChatSession {
  return {
    id: createId(),
    title: 'New Chat',
    updatedAt: Date.now(),
    messages: [
      {
        id: createId(),
        role: 'assistant',
        text: getOrionChatIntro(pathname),
        createdAt: Date.now(),
      },
    ],
  };
}

function getOrionReply(question: string, pathname: string, scope: OrionScope) {
  const normalized = question.toLowerCase();

  if (scope === 'vaults') {
    if (normalized.includes('risk') || normalized.includes('warning') || normalized.includes('protect')) {
      return 'In Vaults, pair utilization changes with circuit sensitivity before reallocation. Shift size gradually and re-check warning/protect behavior after each move.';
    }

    if (normalized.includes('apy') || normalized.includes('yield') || normalized.includes('allocation') || normalized.includes('rebalance')) {
      return 'In Vaults, compare utilization and projected APY first, then rebalance in smaller steps. Orion recommends incremental allocation moves instead of single large shifts.';
    }

    return 'Vaults mode active. Ask me to compare allocations, identify risk-sensitive vault metrics, or plan your next rebalance step.';
  }

  if (scope === 'circuit') {
    if (normalized.includes('trigger') || normalized.includes('threshold') || normalized.includes('stress') || normalized.includes('risk')) {
      return 'In Circuit, tune one threshold at a time and run Evaluate Circuit after each change. Start near 450/350/500 bps, then raise stress inputs to see warning/protect transitions clearly.';
    }

    return 'Circuit mode active. Ask me to tune trigger values, run stress scenarios, or explain why a state stayed normal, warning, or protect.';
  }

  if (scope === 'sophia') {
    if (normalized.includes('list') || normalized.includes('rent') || normalized.includes('fee') || normalized.includes('market')) {
      return 'In Sophia, set a clear daily fee, list first, and then validate renter flow with a small test. Keep wallet connected so logs and actions stay synchronized.';
    }

    if (normalized.includes('mint') || normalized.includes('agent') || normalized.includes('nft')) {
      return 'Sophia mint checkout is reserved for V2 in this build. Use the current Sophia stubs to validate flow sequencing and prepare agent operations.';
    }

    return 'Sophia mode active. Ask me to plan listing/renting steps, tune daily fee strategy, or sequence wallet-first actions.';
  }

  if (normalized.includes('wallet') || normalized.includes('connect')) {
    return 'Tap Connect Wallet in the header, choose Phantom or Backpack, and approve the session. Once connected, all simulator actions are unlocked.';
  }

  if (scope === 'dashboard' || pathname.includes('/app/orion')) {
    if (normalized.includes('circuit') || normalized.includes('risk') || normalized.includes('trigger')) {
      return 'Use the Circuit tab to set speed, liquidity drain, and activity spike thresholds, then stress test to confirm warning/protect behavior before production moves.';
    }

    if (normalized.includes('vault') || normalized.includes('yield') || normalized.includes('allocation')) {
      return 'Use Vaults to compare utilization, APY, and allocation drift. Orion recommends gradual reallocations with circuit checks between each step.';
    }

    if (normalized.includes('sophia') || normalized.includes('agent') || normalized.includes('mint')) {
      return 'In this V1 build, Sophia mint checkout is reserved for V2. You can still test listing/renting stubs and agent workflow sequencing.';
    }

    return 'Ask me for cross-tab strategy across vault allocations, circuit risk posture, and Sophia execution planning.';
  }

  return 'Ask me for the next best action in this tab and I will keep guidance scoped to your current workflow.';
}

function readOrionStorage(): OrionStorageState {
  try {
    const raw = localStorage.getItem(ORION_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as OrionStorageState & { sessions?: ChatSession[]; activeSessionId?: string };

    // Migrate pre-scope schema by preserving old data under dashboard scope.
    if (Array.isArray(parsed.sessions)) {
      return {
        dashboard: {
          sessions: parsed.sessions,
          activeSessionId: parsed.activeSessionId ?? parsed.sessions[0]?.id ?? '',
        },
      };
    }

    return parsed;
  } catch {
    return {};
  }
}

function getOrionTabIntro(pathname: string) {
  if (pathname.includes('/app/vaults')) {
    return {
      title: 'Vaults Guidance',
      description: 'I help you compare utilization, allocation moves, and assignment choices so you can rebalance with confidence.',
    };
  }

  if (pathname.includes('/app/circuit')) {
    return {
      title: 'Circuit Guidance',
      description: 'I help you tune trigger thresholds, stress-test scenarios, and isolate which metric shifts warning to protect.',
    };
  }

  if (pathname.includes('/app/sophia')) {
    return {
      title: 'Sophia Guidance',
      description: 'I help you walk through mint and agent workflows, verify setup, and sequence next actions after connection.',
    };
  }

  if (pathname.includes('/app/orion')) {
    return {
      title: 'Orion Command Hub',
      description: 'Use me for cross-tab strategy: vault decisions, circuit safety checks, and execution planning in one thread.',
    };
  }

  return {
    title: 'Dashboard Guidance',
    description: 'I help you interpret platform signals and turn dashboard context into clear, high-confidence next moves.',
  };
}

type OrionAssistantProps = {
  embedded?: boolean;
};

export function OrionAssistant({ embedded = false }: OrionAssistantProps) {
  const { pathname } = useLocation();
  const scope = useMemo(() => getOrionScope(pathname, embedded), [embedded, pathname]);
  const [open, setOpen] = useState(embedded);
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedded) {
      setOpen(true);
    }
  }, [embedded]);

  useEffect(() => {
    if (!embedded) {
      setOpen(false);
    }
  }, [embedded, pathname]);

  useEffect(() => {
    const stored = readOrionStorage();
    const scoped = stored[scope];

    if (!scoped || scoped.sessions.length === 0) {
      const fallback = createDefaultSession(pathname);
      setSessions([fallback]);
      setActiveSessionId(fallback.id);
      setHistoryOpen(false);
      setInput('');
      setHydrated(true);
      return;
    }

    setSessions(scoped.sessions);
    setActiveSessionId(scoped.activeSessionId && scoped.sessions.some((session) => session.id === scoped.activeSessionId) ? scoped.activeSessionId : scoped.sessions[0].id);
    setHistoryOpen(false);
    setInput('');
    setHydrated(true);
  }, [pathname, scope]);

  useEffect(() => {
    if (!hydrated || sessions.length === 0) return;

    const stored = readOrionStorage();
    stored[scope] = { sessions, activeSessionId };
    localStorage.setItem(ORION_STORAGE_KEY, JSON.stringify(stored));
  }, [activeSessionId, hydrated, scope, sessions]);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId) ?? sessions[0],
    [activeSessionId, sessions],
  );

  const orderedSessions = useMemo(() => [...sessions].sort((left, right) => right.updatedAt - left.updatedAt), [sessions]);

  useEffect(() => {
    if (!activeSession || (!open && !embedded)) return;
    const timer = setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [activeSession?.messages.length, embedded, open]);

  const placeholder = useMemo(() => {
    if (pathname.includes('/app/circuit')) return 'How do I test a circuit trigger?';
    if (pathname.includes('/app/vaults')) return 'Which vault metric should I watch first?';
    if (pathname.includes('/app/sophia')) return 'How do I mint a Sophia NFT?';
    return 'Type your question...';
  }, [pathname]);

  const chatIntro = useMemo(() => getOrionChatIntro(pathname), [pathname]);
  const tabIntro = useMemo(() => getOrionTabIntro(pathname), [pathname]);
  const visibleMessages = useMemo(
    () => activeSession?.messages.filter((message) => !(message.role === 'assistant' && isOrionIntroMessage(message.text))) ?? [],
    [activeSession?.messages],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || !activeSession) return;

    const reply = getOrionReply(question, pathname, scope);

    const now = Date.now();
    const userMessage: ChatMessage = { id: createId(), role: 'user', text: question, createdAt: now };
    const assistantMessage: ChatMessage = { id: createId(), role: 'assistant', text: reply, createdAt: now + 1 };

    setSessions((current) =>
      current.map((session) => {
        if (session.id !== activeSession.id) return session;

        const shouldReplaceTitle = session.title === 'New Chat' || session.messages.length <= 1;
        return {
          ...session,
          title: shouldReplaceTitle ? question.slice(0, 28) : session.title,
          updatedAt: now,
          messages: [...session.messages, userMessage, assistantMessage],
        };
      }),
    );

    setInput('');
  };

  const onCreateChat = () => {
    const next = createDefaultSession(pathname);
    setSessions((current) => [next, ...current]);
    setActiveSessionId(next.id);
    setHistoryOpen(false);
    setInput('');
  };

  const panel = (
    <section
      aria-hidden={!open && !embedded}
      className={`glow-panel w-full rounded-3xl border border-cyan-300/40 bg-slate-950/98 p-3 backdrop-blur-2xl ${
        embedded
          ? 'pointer-events-auto'
          : `transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom ${
              open
                ? 'pointer-events-auto translate-y-0 opacity-100 scale-100'
                : 'pointer-events-none translate-y-3 opacity-0 scale-[0.98]'
            }`
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-cyan-300">Orion Assistant</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistoryOpen((current) => !current)}
            className={`ui-action rounded-lg border px-2 py-1 text-[11px] font-semibold ${historyOpen ? 'border-cyan-300/60 bg-cyan-300/20 text-cyan-100' : 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100'}`}
          >
            History
          </button>
          <button
            onClick={onCreateChat}
            className="ui-action rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-2 py-1 text-[11px] font-semibold text-cyan-100"
          >
            New
          </button>
          {!embedded ? (
            <button
              onClick={() => setOpen(false)}
              className="ui-action rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-2 py-1 text-[11px] font-semibold text-cyan-100"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-2 rounded-xl border border-cyan-300/30 bg-slate-900/70 p-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-200/90">{tabIntro.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">{tabIntro.description}</p>
      </div>

      {historyOpen ? (
        <div className="mb-2 rounded-xl border border-cyan-300/30 bg-slate-900/70 p-2">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300/90">Saved Chats</p>
          <div className="max-h-28 space-y-1 overflow-y-auto pr-1 text-xs">
            {orderedSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  setActiveSessionId(session.id);
                  setHistoryOpen(false);
                }}
                className={`ui-action w-full rounded-lg border px-2 py-1 text-left ${
                  session.id === activeSession?.id ? 'border-cyan-300/60 bg-cyan-300/18 text-cyan-100' : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {session.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div ref={messagesContainerRef} className="mb-2 max-h-48 space-y-2 overflow-y-auto pr-1 text-sm">
        <p className="rounded-xl border border-cyan-300/30 bg-slate-900 px-3 py-2 leading-snug text-slate-200">
          {chatIntro}
        </p>
        {visibleMessages.slice(-10).map((message) => (
          <p
            key={message.id}
            className={`rounded-xl px-3 py-2 leading-snug ${message.role === 'user' ? 'ml-auto w-fit bg-cyan-300/20 text-cyan-100' : 'bg-slate-900 text-slate-200'}`}
          >
            {message.text}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-cyan-300/40 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
        />
        <button type="submit" className="ui-action w-full rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
          Send
        </button>
      </form>
    </section>
  );

  if (!hydrated) {
    return null;
  }

  if (embedded) {
    return panel;
  }

  return (
    <>
      {open ? <div className="pointer-events-none fixed top-0 left-1/2 z-20 h-full w-full max-w-md -translate-x-1/2 bg-slate-950/12 backdrop-blur-[2px]" /> : null}

      <div
        className="pointer-events-none fixed bottom-[calc(4.85rem+env(safe-area-inset-bottom))] left-1/2 z-30 w-full max-w-md -translate-x-1/2 px-5"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle Orion Assistant"
            className="orion-widget-pulse ui-action pointer-events-auto grid h-14 w-14 place-items-center rounded-full border border-cyan-300/65 bg-slate-900/88 text-2xl shadow-[0_0_24px_rgba(34,211,238,0.55)]"
          >
            🧠
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'mb-3 max-h-[30rem] opacity-100' : 'mb-0 max-h-0 opacity-0'}`}
        >
          {panel}
        </div>
      </div>
    </>
  );
}