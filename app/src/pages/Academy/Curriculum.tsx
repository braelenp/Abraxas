import { useCallback, useEffect, useMemo, useState } from 'react';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Crown,
  ExternalLink,
  Layers3,
  LineChart,
  Lock,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { LessonCard } from './components/LessonCard';
import { ProgressBar } from './components/ProgressBar';
import { Quiz, type QuizResult } from './components/Quiz';
import { VideoPlayer } from './components/VideoPlayer';
import {
  ACADEMY_OVERVIEW,
  ABRAXAS_CORE_VALUE_PROP,
  ACADEMY_MODULES,
  ACADEMY_MODULE_MAP,
  ACADEMY_ONCHAIN_SYNC_STORAGE_KEY,
  ACADEMY_PROGRESS_STORAGE_KEY,
  ACADEMY_TOTAL_REWARD_POINTS,
  type AcademyChapter,
  type AcademyInteractiveElement,
  type AcademyModule,
  type ModuleAccent,
  type ModuleId,
} from './data/curriculumData';

const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

type AcademyProgressState = {
  completedModules: ModuleId[];
  passedQuizzes: ModuleId[];
  updatedAt: number;
};

type SyncState = {
  signature: string;
  syncedAt: string;
};

const defaultProgressState: AcademyProgressState = {
  completedModules: [],
  passedQuizzes: [],
  updatedAt: 0,
};

const accentPalette: Record<ModuleAccent, { badge: string; button: string; ring: string; glow: string }> = {
  purple: {
    badge: 'border-purple-300/35 bg-purple-500/10 text-purple-100',
    button: 'border-purple-300/45 bg-purple-500/15 text-purple-100',
    ring: 'border-purple-300/30',
    glow: 'from-purple-500/22 via-fuchsia-500/10 to-cyan-400/8',
  },
  cyan: {
    badge: 'border-cyan-300/35 bg-cyan-500/10 text-cyan-100',
    button: 'border-cyan-300/45 bg-cyan-500/15 text-cyan-100',
    ring: 'border-cyan-300/30',
    glow: 'from-cyan-400/20 via-blue-500/10 to-slate-950/10',
  },
  fuchsia: {
    badge: 'border-fuchsia-300/35 bg-fuchsia-500/10 text-fuchsia-100',
    button: 'border-fuchsia-300/45 bg-fuchsia-500/15 text-fuchsia-100',
    ring: 'border-fuchsia-300/30',
    glow: 'from-fuchsia-500/22 via-purple-500/10 to-cyan-400/8',
  },
  emerald: {
    badge: 'border-emerald-300/35 bg-emerald-500/10 text-emerald-100',
    button: 'border-emerald-300/45 bg-emerald-500/15 text-emerald-100',
    ring: 'border-emerald-300/30',
    glow: 'from-emerald-500/20 via-cyan-500/10 to-slate-950/10',
  },
  amber: {
    badge: 'border-amber-300/35 bg-amber-500/10 text-amber-100',
    button: 'border-amber-300/45 bg-amber-500/15 text-amber-100',
    ring: 'border-amber-300/30',
    glow: 'from-amber-400/22 via-orange-500/10 to-fuchsia-500/8',
  },
};

function loadProgress(): AcademyProgressState {
  if (typeof window === 'undefined') {
    return defaultProgressState;
  }

  try {
    const raw = window.localStorage.getItem(ACADEMY_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return defaultProgressState;
    }

    const parsed = JSON.parse(raw) as Partial<AcademyProgressState>;

    return {
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules as ModuleId[] : [],
      passedQuizzes: Array.isArray(parsed.passedQuizzes) ? parsed.passedQuizzes as ModuleId[] : [],
      updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : 0,
    };
  } catch {
    return defaultProgressState;
  }
}

function loadSyncState(): SyncState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ACADEMY_ONCHAIN_SYNC_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<SyncState>;
    if (!parsed.signature || !parsed.syncedAt) {
      return null;
    }

    return {
      signature: parsed.signature,
      syncedAt: parsed.syncedAt,
    };
  } catch {
    return null;
  }
}

function useAcademyProgress() {
  const [progress, setProgress] = useState<AcademyProgressState>(() => loadProgress());
  const [syncState, setSyncState] = useState<SyncState | null>(() => loadSyncState());
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(ACADEMY_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completedCount = progress.completedModules.length;
  const passedQuizCount = progress.passedQuizzes.length;
  const earnedPoints = useMemo(
    () => progress.completedModules.reduce((sum, moduleId) => sum + ACADEMY_MODULE_MAP[moduleId].rewardPoints, 0),
    [progress.completedModules],
  );

  const markModuleComplete = useCallback((moduleId: ModuleId) => {
    setProgress((current) => {
      if (current.completedModules.includes(moduleId)) {
        return current;
      }

      return {
        ...current,
        completedModules: [...current.completedModules, moduleId],
        updatedAt: Date.now(),
      };
    });
  }, []);

  const markQuizPassed = useCallback((moduleId: ModuleId) => {
    setProgress((current) => {
      if (current.passedQuizzes.includes(moduleId)) {
        return current;
      }

      return {
        ...current,
        passedQuizzes: [...current.passedQuizzes, moduleId],
        updatedAt: Date.now(),
      };
    });
  }, []);

  const syncProgressOnChain = useCallback(async () => {
    if (!connected || !publicKey || !sendTransaction) {
      setSyncError('Connect a Solana wallet to sync Academy progress on-chain.');
      return;
    }

    try {
      setIsSyncing(true);
      setSyncError(null);

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      const payload = {
        app: 'abraxas-academy',
        completedModules: progress.completedModules,
        passedQuizzes: progress.passedQuizzes,
        updatedAt: progress.updatedAt,
      };
      const instruction = new TransactionInstruction({
        programId: MEMO_PROGRAM_ID,
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }],
        data: Buffer.from(JSON.stringify(payload), 'utf8'),
      });
      const transaction = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(instruction);

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed');

      const nextState = {
        signature,
        syncedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(ACADEMY_ONCHAIN_SYNC_STORAGE_KEY, JSON.stringify(nextState));
      }

      setSyncState(nextState);
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : 'Failed to sync progress on-chain.');
    } finally {
      setIsSyncing(false);
    }
  }, [connected, connection, progress.completedModules, progress.passedQuizzes, progress.updatedAt, publicKey, sendTransaction]);

  return {
    progress,
    syncState,
    syncError,
    isSyncing,
    completedCount,
    passedQuizCount,
    earnedPoints,
    markModuleComplete,
    markQuizPassed,
    syncProgressOnChain,
  };
}

function getModulePath(moduleId: ModuleId) {
  return `/app/academy/${moduleId}`;
}

function formatSyncTime(syncState: SyncState | null) {
  if (!syncState) {
    return 'Not synced on-chain yet';
  }

  return new Date(syncState.syncedAt).toLocaleString();
}

function ModuleStatusPill({ completed, passedQuiz }: { completed: boolean; passedQuiz: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em]">
      <span className={`rounded-full border px-2 py-1 ${completed ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 bg-slate-900/70 text-slate-400'}`}>
        {completed ? 'Completed' : 'In Progress'}
      </span>
      <span className={`rounded-full border px-2 py-1 ${passedQuiz ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200' : 'border-slate-700 bg-slate-900/70 text-slate-400'}`}>
        {passedQuiz ? 'Quiz Passed' : 'Quiz Pending'}
      </span>
    </div>
  );
}

function MetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof TrendingUp }) {
  return (
    <div className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-950/75 p-4 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          <p className="mt-2 text-xs text-slate-400">{detail}</p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

function ModulePreviewCard({
  module,
  isCompleted,
  passedQuiz,
}: {
  module: AcademyModule;
  isCompleted: boolean;
  passedQuiz: boolean;
}) {
  const palette = accentPalette[module.accent];

  return (
    <article className="glow-panel relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-950/80 p-5 backdrop-blur-xl">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${palette.glow}`} />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] ${palette.badge}`}>
              {module.badge}
            </span>
            <h2 className="mt-3 text-xl font-semibold text-white">{module.title}</h2>
            <p className="mt-1 text-sm text-slate-300">{module.subtitle}</p>
            <p className={`mt-2 text-xs uppercase tracking-[0.2em] ${module.id === 'strategy' ? 'text-purple-200/80' : 'text-slate-500'}`}>
              {module.id === 'strategy' ? 'Flagship day trading module' : 'Advanced backend module'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-right">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500">Reward</p>
            <p className="mt-1 text-sm font-semibold text-cyan-200">{module.rewardPoints} pts</p>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-200/85">{module.description}</p>

        <ModuleStatusPill completed={isCompleted} passedQuiz={passedQuiz} />

        <div className="grid gap-3 sm:grid-cols-2">
          {module.objectives.slice(0, 2).map((objective) => (
            <div key={objective} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
              {objective}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="text-xs text-slate-400">
            {module.duration} learning path
          </div>
          <Link
            to={getModulePath(module.id)}
            className={`ui-action inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${palette.button}`}
          >
            <span>{isCompleted ? 'Review Module' : 'Open Module'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function StrategyPatternPanel() {
  const patternCopy = {
    SFA: 'SFA spots a strong continuation when price structure and TDI resume in the dominant direction after a pause.',
    CTSFA: 'CTSFA highlights the rare reversal window where counter-trend force overpowers the previous impulse and structure begins to rotate.',
    MBLC: 'MBLC confirms continuation when the Market Base Line keeps bias intact and the Signal Line re-accelerates through it.',
    MBLB: 'MBLB marks the bounce condition: price respects the trend structure while the Market Base Line refuses to surrender control.',
  };
  const sessionWindows = [
    { label: 'Asia', detail: '7 PM to 4 AM EDT • accumulation and lower range expansion.' },
    { label: 'London', detail: '4 AM to 1 PM EDT • liquidity injection and trend expansion.' },
    { label: 'New York', detail: '8 AM to 5 PM EDT • prime window with special focus on 9:30 AM EDT.' },
  ];
  const [selected, setSelected] = useState<keyof typeof patternCopy>('SFA');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(patternCopy).map((pattern) => (
          <button
            key={pattern}
            type="button"
            onClick={() => setSelected(pattern as keyof typeof patternCopy)}
            className={`ui-action rounded-xl border px-3 py-2 text-sm font-semibold ${selected === pattern ? 'border-cyan-300/50 bg-cyan-400/10 text-cyan-100' : 'border-slate-700 bg-slate-900/75 text-slate-300'}`}
          >
            {pattern}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm leading-6 text-slate-300">
        {patternCopy[selected]}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {sessionWindows.map((session) => (
          <div key={session.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">{session.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{session.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterCard({ chapter, index }: { chapter: AcademyChapter; index: number }) {
  return (
    <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-slate-950/75 p-5 backdrop-blur-xl">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Chapter {index}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{chapter.title}</h3>
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-500/10 p-2 text-cyan-200">
            <BookOpen size={16} />
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-300">{chapter.summary}</p>

        <ul className="space-y-2 text-sm text-slate-300/90">
          {chapter.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {chapter.kidAnalogy ? (
          <div className="rounded-2xl border border-purple-300/20 bg-purple-500/8 p-4 text-sm leading-6 text-purple-100/90">
            {chapter.kidAnalogy}
          </div>
        ) : null}

        {chapter.adultAnalogy ? (
          <div className="rounded-2xl border border-amber-300/20 bg-amber-500/8 p-4 text-sm leading-6 text-amber-100/90">
            {chapter.adultAnalogy}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function TokenizationWorkbench() {
  const assets = ['Luxury watches', 'Private jets', 'Fine art', 'Wine', 'Debt instruments'] as const;
  const [selectedAsset, setSelectedAsset] = useState<(typeof assets)[number]>('Luxury watches');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {assets.map((asset) => (
          <button
            key={asset}
            type="button"
            onClick={() => setSelectedAsset(asset)}
            className={`ui-action rounded-xl border px-3 py-2 text-sm ${selectedAsset === asset ? 'border-cyan-300/50 bg-cyan-400/10 text-cyan-100' : 'border-slate-700 bg-slate-900/75 text-slate-300'}`}
          >
            {asset}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">Asset Intake</p>
          <p className="mt-2 text-sm text-slate-300">{selectedAsset} enters appraisal, legal wrapping, servicing, and metadata definition.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">Proof Layer</p>
          <p className="mt-2 text-sm text-slate-300">Custody attestations and ownership records bind to the NFT metadata before minting.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">Vault Ready</p>
          <p className="mt-2 text-sm text-slate-300">The resulting La Casa NFT can move into a Sophia Vault as proof-backed collateral.</p>
        </div>
      </div>
    </div>
  );
}

function VaultSimulator() {
  const [collateralValue, setCollateralValue] = useState(250000);
  const [mintedAbra, setMintedAbra] = useState(120000);
  const ratio = Math.round((collateralValue / Math.max(mintedAbra, 1)) * 100);
  const healthy = ratio >= 150;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200/70">Collateral Value</span>
          <input
            type="range"
            min={150000}
            max={500000}
            step={10000}
            value={collateralValue}
            onChange={(event) => setCollateralValue(Number(event.target.value))}
            className="mt-4 w-full accent-fuchsia-400"
          />
          <span className="mt-3 block text-lg font-semibold text-white">${collateralValue.toLocaleString()}</span>
        </label>
        <label className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200/70">ABRAX Minted</span>
          <input
            type="range"
            min={50000}
            max={250000}
            step={10000}
            value={mintedAbra}
            onChange={(event) => setMintedAbra(Number(event.target.value))}
            className="mt-4 w-full accent-fuchsia-400"
          />
          <span className="mt-3 block text-lg font-semibold text-white">{mintedAbra.toLocaleString()} ABRAX</span>
        </label>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <ProgressBar
          value={Math.min(ratio, 250)}
          total={250}
          label="Collateral Ratio"
          detail={healthy ? 'Vault remains above the 150% minimum and can sustain redemptions cleanly.' : 'Vault is below the 150% threshold. Add collateral or reduce ABRAX exposure.'}
        />
        <p className={`mt-4 text-sm font-semibold ${healthy ? 'text-emerald-300' : 'text-amber-300'}`}>
          Current ratio: {ratio}% {healthy ? '• healthy headroom' : '• action required'}
        </p>
      </div>
    </div>
  );
}

function SpeciesScoreboard() {
  const metrics = ['market cap', 'value growth', 'duration active', 'decision quality'] as const;
  const [selectedMetric, setSelectedMetric] = useState<(typeof metrics)[number]>('market cap');
  const baseScores = {
    Raido: { 'market cap': 88, 'value growth': 93, 'duration active': 81, 'decision quality': 84 },
    Tide: { 'market cap': 78, 'value growth': 86, 'duration active': 90, 'decision quality': 89 },
    Circuit: { 'market cap': 74, 'value growth': 79, 'duration active': 95, 'decision quality': 94 },
    'King AI': { 'market cap': 91, 'value growth': 88, 'duration active': 87, 'decision quality': 97 },
  };

  const ranking = Object.entries(baseScores).sort((left, right) => right[1][selectedMetric] - left[1][selectedMetric]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <button
            key={metric}
            type="button"
            onClick={() => setSelectedMetric(metric)}
            className={`ui-action rounded-xl border px-3 py-2 text-sm capitalize ${selectedMetric === metric ? 'border-emerald-300/50 bg-emerald-500/10 text-emerald-100' : 'border-slate-700 bg-slate-900/75 text-slate-300'}`}
          >
            {metric}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {ranking.map(([name, score], index) => (
          <div key={name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">#{index + 1} {name}</p>
                <p className="text-xs text-slate-400">{selectedMetric} signal</p>
              </div>
              <span className="text-lg font-semibold text-emerald-200">{score[selectedMetric]}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full border border-emerald-300/15 bg-slate-950/80">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,#22c55e_0%,#3cf3ff_100%)]" style={{ width: `${score[selectedMetric]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SovereigntyChecklist() {
  const items = [
    'You own the vaults',
    'You own the agents',
    'You keep the gains',
  ] as const;
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const active = checked.includes(item);

        return (
          <button
            key={item}
            type="button"
            onClick={() => setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}
            className={`ui-action flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${active ? 'border-amber-300/50 bg-amber-500/10 text-amber-50' : 'border-slate-700 bg-slate-900/75 text-slate-300'}`}
          >
            <span className="text-sm font-semibold">{item}</span>
            <CheckCircle2 size={18} className={active ? 'text-amber-200' : 'text-slate-600'} />
          </button>
        );
      })}
      <p className="text-xs text-slate-400">Complete all three to close the Academy with the sovereignty model intact.</p>
    </div>
  );
}

function InteractiveWorkbench({ module, element }: { module: AcademyModule; element: AcademyInteractiveElement }) {
  if (element.type === 'chart' && element.embedUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90">
        <div className="aspect-[4/3] w-full sm:aspect-video">
          <iframe
            title={element.title}
            src={element.embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (module.id === 'strategy') {
    return <StrategyPatternPanel />;
  }

  if (module.id === 'tokenization') {
    return <TokenizationWorkbench />;
  }

  if (module.id === 'vaults') {
    return <VaultSimulator />;
  }

  if (module.id === 'species') {
    return <SpeciesScoreboard />;
  }

  return <SovereigntyChecklist />;
}

function ModuleIcon({ moduleId }: { moduleId: ModuleId }) {
  if (moduleId === 'strategy') {
    return <LineChart size={18} />;
  }
  if (moduleId === 'tokenization') {
    return <Layers3 size={18} />;
  }
  if (moduleId === 'vaults') {
    return <Lock size={18} />;
  }
  if (moduleId === 'species') {
    return <BrainCircuit size={18} />;
  }

  return <Crown size={18} />;
}

export function CurriculumHub() {
  const {
    progress,
    syncState,
    syncError,
    isSyncing,
    completedCount,
    passedQuizCount,
    earnedPoints,
    syncProgressOnChain,
  } = useAcademyProgress();

  const nextModule = ACADEMY_MODULES.find((module) => !progress.completedModules.includes(module.id)) ?? ACADEMY_MODULES[ACADEMY_MODULES.length - 1];

  return (
    <div className="space-y-6 pb-6">
      <section className="glow-panel relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-950/85 p-5 backdrop-blur-xl sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(153,69,255,0.28),transparent_34%),radial-gradient(circle_at_right,rgba(34,211,238,0.18),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(90deg,rgba(148,163,184,0.08)_0px,rgba(148,163,184,0.08)_1px,transparent_2px,transparent_22px)]" />
        <div className="relative space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-300/65">Abraxas Academy</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">{ABRAXAS_CORE_VALUE_PROP}</h1>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-3 text-cyan-200">
              <BookOpen size={22} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-200/85 whitespace-pre-line">{ABRAXAS_CORE_VALUE_PROP}</p>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-purple-300/20 bg-purple-500/8 p-4 space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200/80">Primary Focus</p>
              <h2 className="text-xl font-semibold text-white">Day trading first. Sovereign asset management second.</h2>
              <p className="text-sm leading-6 text-slate-200/90">
                The Academy now leads with the clearest market fit: a disciplined day trading curriculum built around repeatable setups, real execution windows, and a framework that feels stronger than sports betting because it is based on structure, not luck.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/8 p-4 space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200/80">Backend Progression</p>
              <p className="text-sm leading-6 text-slate-200/90">
                Once the day trading edge is clear, the rest of Abraxas becomes the backend progression: tokenization, Sophia Vaults, ABRAX liquidity, and AI agents that can scale, protect, and automate the same edge around real capital.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">{ACADEMY_OVERVIEW.title}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{ACADEMY_OVERVIEW.subtitle}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">{ACADEMY_OVERVIEW.published}</div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">{ACADEMY_OVERVIEW.repurposed}</div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">{ACADEMY_OVERVIEW.author}</div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">{ACADEMY_OVERVIEW.targetAudience}</div>
              </div>
            </div>
            <div className="rounded-2xl border border-purple-300/20 bg-purple-500/8 p-4 space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200/80">Preface</p>
              {ACADEMY_OVERVIEW.preface.slice(0, 2).map((paragraph) => (
                <p key={paragraph} className="text-sm leading-6 text-slate-200/90">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-300/20 bg-amber-500/8 p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-200/80">Access</p>
            <p className="mt-2 text-sm leading-6 text-slate-200/90">{ACADEMY_OVERVIEW.access}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="Modules" value={`${completedCount}/${ACADEMY_MODULES.length}`} detail="Curriculum modules completed locally on this device." icon={BookOpen} />
            <MetricCard label="Reward Points" value={`${earnedPoints}/${ACADEMY_TOTAL_REWARD_POINTS}`} detail="Points unlocked by marking each Academy module complete." icon={Award} />
            <MetricCard label="Quiz Passes" value={`${passedQuizCount}/${ACADEMY_MODULES.length}`} detail="Knowledge checks passed across the full Abraxas operating model." icon={Sparkles} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <ProgressBar
                value={completedCount}
                total={ACADEMY_MODULES.length}
                label="Curriculum Completion"
                detail={`Next live module: ${nextModule.badge} — ${nextModule.title}`}
              />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">Optional Solana Sync</p>
                  <p className="mt-2 text-sm text-slate-300">Write a Memo transaction containing your Academy progress snapshot.</p>
                </div>
                <Wallet className="text-cyan-300" size={18} />
              </div>
              <button
                type="button"
                onClick={() => void syncProgressOnChain()}
                className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-100"
              >
                <span>{isSyncing ? 'Syncing Progress...' : 'Sync Progress to Solana'}</span>
                <ExternalLink size={15} />
              </button>
              <p className="text-xs text-slate-400">Last sync: {formatSyncTime(syncState)}</p>
              {syncError ? <p className="text-xs text-amber-300">{syncError}</p> : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={getModulePath(nextModule.id)}
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-purple-300/45 bg-purple-500/15 px-4 py-2.5 text-sm font-semibold text-purple-100"
            >
              <span>{completedCount === ACADEMY_MODULES.length ? 'Review Final Module' : `Continue with ${nextModule.title}`}</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://discord.gg/EhgEe2MPa"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/75 px-4 py-2.5 text-sm font-semibold text-slate-200"
            >
              <span>Join Discord Community</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {ACADEMY_MODULES.map((module) => (
          <ModulePreviewCard
            key={module.id}
            module={module}
            isCompleted={progress.completedModules.includes(module.id)}
            passedQuiz={progress.passedQuizzes.includes(module.id)}
          />
        ))}
      </section>
    </div>
  );
}

export function AcademyModuleScreen({ moduleId }: { moduleId: ModuleId }) {
  const module = ACADEMY_MODULE_MAP[moduleId];
  const {
    progress,
    completedCount,
    passedQuizCount,
    markModuleComplete,
    markQuizPassed,
  } = useAcademyProgress();
  const [activeElementIndex, setActiveElementIndex] = useState(0);
  const [lastQuizResult, setLastQuizResult] = useState<QuizResult | null>(null);

  const isCompleted = progress.completedModules.includes(moduleId);
  const passedQuiz = progress.passedQuizzes.includes(moduleId);
  const palette = accentPalette[module.accent];
  const nextModule = ACADEMY_MODULES.find((entry) => entry.order === module.order + 1) ?? null;
  const activeElement = module.interactiveElements[activeElementIndex];

  const handleQuizComplete = useCallback((result: QuizResult) => {
    setLastQuizResult(result);
    if (result.passed) {
      markQuizPassed(moduleId);
    }
  }, [markQuizPassed, moduleId]);

  return (
    <div className="space-y-6 pb-6">
      <section className="glow-panel relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-950/85 p-5 backdrop-blur-xl sm:p-6">
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${palette.glow}`} />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.08)_0px,rgba(148,163,184,0.08)_1px,transparent_2px,transparent_16px)]" />
        <div className="relative space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/app/academy"
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-200"
            >
              <ArrowLeft size={16} />
              <span>Academy Hub</span>
            </Link>
            <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] ${palette.badge}`}>
              {module.badge}
            </span>
            <ModuleStatusPill completed={isCompleted} passedQuiz={passedQuiz} />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{module.subtitle}</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">{module.title}</h1>
              <p className="mt-4 text-base leading-7 text-slate-200/85">{module.headline}</p>
            </div>
            <div className={`rounded-2xl border bg-slate-900/70 p-3 ${palette.ring} text-white`}>
              <ModuleIcon moduleId={moduleId} />
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-300/85 whitespace-pre-line">{ABRAXAS_CORE_VALUE_PROP}</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="Module Reward" value={`${module.rewardPoints} pts`} detail={`${module.duration} to complete this sequence.`} icon={Award} />
            <MetricCard label="Curriculum Progress" value={`${completedCount}/${ACADEMY_MODULES.length}`} detail="Global Academy completion across all modules." icon={TrendingUp} />
            <MetricCard label="Quiz Passes" value={`${passedQuizCount}/${ACADEMY_MODULES.length}`} detail="Pass the short quiz and keep moving through the stack." icon={Shield} />
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">Mission Brief</p>
              <p className="mt-3 text-sm leading-6 text-slate-200/85">{module.description}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <ProgressBar
                value={module.objectives.length}
                total={module.objectives.length}
                label="Learning Objectives"
                detail="Every module closes with a quiz and a manual completion checkpoint."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glow-panel rounded-3xl border border-cyan-300/20 bg-slate-950/75 p-5 backdrop-blur-xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Objectives</p>
          <div className="mt-4 space-y-3">
            {module.objectives.map((objective, index) => (
              <div key={objective} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-xs font-semibold text-cyan-100">
                  {index + 1}
                </span>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glow-panel rounded-3xl border border-cyan-300/20 bg-slate-950/75 p-5 backdrop-blur-xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Key Visuals</p>
          <div className="mt-4 space-y-3">
            {module.keyVisuals.map((visual) => (
              <div key={visual.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-white">{visual.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{visual.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Lessons</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Core concepts to internalize</h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {module.lessons.map((lesson, index) => (
            <LessonCard key={lesson.title} lesson={lesson} index={index + 1} accent={module.accent} />
          ))}
        </div>
      </section>

      {module.chapters?.length ? (
        <section className="space-y-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Curriculum Chapters</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Preserved source material, adapted into the Academy flow</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {module.chapters.map((chapter, index) => (
              <ChapterCard key={chapter.title} chapter={chapter} index={index + 1} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="glow-panel rounded-3xl border border-cyan-300/20 bg-slate-950/75 p-5 backdrop-blur-xl space-y-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Interactive Layer</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Work the model, do not just read it</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {module.interactiveElements.map((element, index) => (
            <button
              key={element.title}
              type="button"
              onClick={() => setActiveElementIndex(index)}
              className={`ui-action rounded-xl border px-4 py-2 text-sm font-semibold ${activeElementIndex === index ? palette.button : 'border-slate-700 bg-slate-900/75 text-slate-300'}`}
            >
              {element.title}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-sm font-semibold text-white">{activeElement.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{activeElement.detail}</p>
          <div className="mt-4">
            <InteractiveWorkbench module={module} element={activeElement} />
          </div>
          {activeElement.href && activeElement.ctaLabel ? (
            <div className="mt-4">
              <Link
                to={activeElement.href}
                className={`ui-action inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${palette.button}`}
              >
                <span>{activeElement.ctaLabel}</span>
                <ExternalLink size={15} />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <VideoPlayer video={module.video} />

      <Quiz questions={module.quiz} onComplete={handleQuizComplete} />

      <section className="glow-panel rounded-3xl border border-cyan-300/20 bg-slate-950/75 p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">Completion</p>
            <h2 className="text-xl font-semibold text-white">Close the module and update your global Academy progress.</h2>
            <p className="text-sm leading-6 text-slate-300">{isCompleted ? module.completionCopy : 'Use the completion checkpoint to persist progress locally. If your wallet is connected, you can sync the full Academy snapshot from the hub.'}</p>
            {lastQuizResult && !lastQuizResult.passed ? (
              <p className="text-sm text-amber-300">Quiz score recorded at {lastQuizResult.score}/{lastQuizResult.total}. Review the module and retry before moving on.</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => markModuleComplete(moduleId)}
              className={`ui-action inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${isCompleted ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100' : palette.button}`}
            >
              <CheckCircle2 size={16} />
              <span>{isCompleted ? 'Module Completed' : module.completionLabel}</span>
            </button>
            <Link
              to={nextModule ? getModulePath(nextModule.id) : '/app/academy'}
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/75 px-4 py-3 text-sm font-semibold text-slate-200"
            >
              <span>{nextModule ? `Next: ${nextModule.title}` : 'Return to Academy Hub'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}