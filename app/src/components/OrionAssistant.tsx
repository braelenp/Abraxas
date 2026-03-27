import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';

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

const ORION_STORAGE_KEY = 'abraxas_king_saved_chats_v1';

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
    return 'I am King AI. In Vaults, I can help route La Casa deposits, compare athlete-equity exposure, and highlight the safest next value-creation move.';
  }

  if (pathname.includes('/app/circuit')) {
    return 'I am King AI. In Circuit, I can help tune protection thresholds, stage payouts, and explain exactly which metric shifts warning into protection.';
  }

  if (pathname.includes('/app/sophia')) {
    return 'I am King AI. In Sophia, I can guide manager assignment, mint flow, and the cleanest sequence of actions after wallet connection.';
  }

  if (pathname.includes('/app/orion')) {
    return 'I am King AI. This is your athlete-equity command hub. Ask for development strategy across training, value growth, circuit safety, and Sophia execution planning.';
  }

  return 'I am King AI. On Dashboard, I can translate athlete momentum, vault value growth, and safety signals into the next action.';
}

function isOrionIntroMessage(text: string) {
  const normalized = text.trim();
  const introCandidates = [
    getOrionChatIntro('/app'),
    getOrionChatIntro('/app/vaults'),
    getOrionChatIntro('/app/circuit'),
    getOrionChatIntro('/app/sophia'),
    getOrionChatIntro('/app/orion'),
    'I am King AI. Ask me anything about athlete equity, circuit safety, or Sophia workflows.',
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
    if (normalized.includes('deposit') || normalized.includes('la casa') || normalized.includes('exposure')) {
      return 'In Vaults, route La Casa exposure into the OYM vault first, then allocate incrementally into the athlete token with the strongest development signal. That keeps your cost basis aligned with live growth mechanics.';
    }

    if (normalized.includes('risk') || normalized.includes('warning') || normalized.includes('protect')) {
      return 'In Vaults, keep athlete-equity additions smaller when Circuit is already in warning. Build exposure through staged La Casa deposits and let Sophia widen the protective buffer before pushing harder.';
    }

    return 'Vaults mode active. Ask me to compare athlete tokens, size a La Casa deposit, or identify the next safest allocation move.';
  }

  if (scope === 'circuit') {
    if (normalized.includes('trigger') || normalized.includes('threshold') || normalized.includes('stress') || normalized.includes('risk')) {
      return 'In Circuit, tune one threshold at a time and run Evaluate Circuit after each change. Start near 450/350/500 bps, then raise stress inputs until athlete-equity volatility transitions from warning to protection.';
    }

    return 'Circuit mode active. Ask me to tune trigger values, stage protective payouts, or explain why a state stayed normal, warning, or protected.';
  }

  if (scope === 'sophia') {
    if (normalized.includes('manager') || normalized.includes('assign') || normalized.includes('vault')) {
      return 'In Sophia, assign the Sentinel profile to athlete-equity vaults first, then widen into Yield or Defensive once you have a stable development cadence and clear Circuit behavior.';
    }

    if (normalized.includes('mint') || normalized.includes('agent') || normalized.includes('nft')) {
      return 'Sophia mint checkout is still a stub in this build. Use it to validate wallet-first manager setup while the vault and King AI loops mature on devnet.';
    }

    return 'Sophia mode active. Ask me to plan manager assignment, tune rental strategy, or sequence wallet-first actions.';
  }

  if (normalized.includes('wallet') || normalized.includes('connect')) {
    return 'Tap Connect Wallet in the header, choose Phantom or Backpack, and approve the session. Once connected, all simulator actions are unlocked.';
  }

  if (normalized.includes('cdubb') || normalized.includes('ajwill') || normalized.includes('hailee') || normalized.includes('athlete')) {
    return 'Focus on the athlete with the strongest mix of training score, stat index, and NIL momentum. The best Abraxas move is the one that compounds measurable development into valuation, not the one that simply chases the hottest print.';
  }

  if (scope === 'dashboard' || pathname.includes('/app/orion')) {
    if (normalized.includes('circuit') || normalized.includes('risk') || normalized.includes('trigger')) {
      return 'Use the Circuit tab to set speed, liquidity drain, and activity spike thresholds, then stress test to confirm warning/protect behavior before increasing athlete-equity exposure.';
    }

    if (normalized.includes('vault') || normalized.includes('allocation') || normalized.includes('market')) {
      return 'Use Vaults to route La Casa exposure into the OYM basket, then allocate gradually across the athlete tokens with the cleanest King AI signal. Smaller staged moves keep Circuit optionality intact.';
    }

    if (normalized.includes('sophia') || normalized.includes('agent') || normalized.includes('mint')) {
      return 'In this build, Sophia remains the manager layer around the athlete-equity vault. You can assign agents now and keep the mint stub for devnet validation until the full autonomous loop is wired.';
    }

    return 'Ask me for cross-tab strategy across athlete development, vault allocations, circuit posture, and Sophia execution planning.';
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
      description: 'I help you price La Casa deposits, compare athlete-equity allocations, and keep exposure growth aligned with Circuit safety.',
    };
  }

  if (pathname.includes('/app/circuit')) {
    return {
      title: 'Circuit Guidance',
      description: 'I help you tune trigger thresholds, stage protective payouts, and isolate which metric shifts warning to protection.',
    };
  }

  if (pathname.includes('/app/sophia')) {
    return {
      title: 'Sophia Guidance',
      description: 'I help you walk through manager workflows, verify setup, and sequence the next actions after connection.',
    };
  }

  if (pathname.includes('/app/orion')) {
    return {
      title: 'King AI Command Hub',
      description: 'Use me for cross-tab strategy: athlete development, vault decisions, circuit safety checks, and execution planning in one thread.',
    };
  }

  return {
    title: 'Dashboard Guidance',
    description: 'I help you interpret athlete momentum and turn dashboard context into clear, high-confidence next moves.',
  };
}

type OrionAssistantProps = {
  embedded?: boolean;
};

export function OrionAssistant({ embedded = false }: OrionAssistantProps) {
  const { pathname } = useLocation();
  const { athleteTokens } = useAbraxas();
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
    if (pathname.includes('/app/vaults')) return 'Which athlete token should absorb the next La Casa deposit?';
    if (pathname.includes('/app/sophia')) return 'Which Sophia profile fits this vault?';
    return 'Ask about athlete equity, King AI, or Circuit safety...';
  }, [pathname]);

  const chatIntro = useMemo(() => getOrionChatIntro(pathname), [pathname]);
  const tabIntro = useMemo(() => getOrionTabIntro(pathname), [pathname]);
  const athleteTicker = useMemo(
    () => athleteTokens.map((token) => `${token.symbol} ${token.valueGrowthPct.toFixed(1)}%`).join(' • '),
    [athleteTokens],
  );
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
        <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase font-mono">&gt; [KING_AI] ASSISTANT_ACTIVE</h2>
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
        <p className="mt-2 text-[11px] text-slate-400/90">Live basket: {athleteTicker}</p>
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
            aria-label="Toggle King AI Assistant"
            className="orion-widget-pulse ui-action pointer-events-auto grid h-14 w-14 place-items-center rounded-full border border-cyan-300/65 bg-slate-900/88 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
          >
            <Brain size={24} strokeWidth={2.1} />
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