import { useState, useEffect } from 'react';
import { ChevronRight, Lock, CheckCircle2, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { AcademyModule1 } from './modules/Module1-RWATokenization';
import { AcademyModule2 } from './modules/Module2-UtilaCV5';
import { AcademyModule3 } from './modules/Module3-HighLevelDeFi';
import { AcademyModule4 } from './modules/Module4-ArtificialHumanMonolith';
import { AcademyModule5 } from './modules/Module5-LivingSpecies';
import { AcademyModule6 } from './modules/Module6-PracticalTools';

interface AcademyProgressState {
  module1: { completed: boolean; airdropPoints: number };
  module2: { completed: boolean; airdropPoints: number };
  module3: { completed: boolean; airdropPoints: number };
  module4: { completed: boolean; airdropPoints: number };
  module5: { completed: boolean; airdropPoints: number };
  module6: { completed: boolean; airdropPoints: number };
  totalAirdropPoints: number;
}

const MODULE_INFO = [
  {
    id: 'module1',
    title: 'Foundations of Tokenization of RWAs',
    emoji: '🏛️',
    description: 'Learn how real-world assets are digitized and tokenized on Solana',
    requiredPoints: 0,
    rewardPoints: 250,
    color: 'from-amber-500/30 to-amber-400/20',
    borderColor: 'amber-300/40',
    accentColor: 'amber-300',
  },
  {
    id: 'module2',
    title: 'Utila Custody & CV5 Capital Compliance',
    emoji: '🔐',
    description: 'Sovereign custody solutions and capital regulation frameworks',
    requiredPoints: 250,
    rewardPoints: 350,
    color: 'from-blue-500/30 to-blue-400/20',
    borderColor: 'blue-300/40',
    accentColor: 'blue-300',
  },
  {
    id: 'module3',
    title: 'High-Level DeFi (M1 + Lending)',
    emoji: '💰',
    description: 'Institutional liquidity flows and capital efficiency mechanisms',
    requiredPoints: 600,
    rewardPoints: 400,
    color: 'from-orange-500/30 to-orange-400/20',
    borderColor: 'orange-300/40',
    accentColor: 'orange-300',
  },
  {
    id: 'module4',
    title: 'Artificial Human & Web5 Biological Ledger',
    emoji: '🧬',
    description: 'Monolith transmutation and the biometric identity layer',
    requiredPoints: 1000,
    rewardPoints: 450,
    color: 'from-purple-500/30 to-purple-400/20',
    borderColor: 'purple-300/40',
    accentColor: 'purple-300',
  },
  {
    id: 'module5',
    title: 'The Living Species (Daughters, Sons, Forge)',
    emoji: '👑',
    description: 'The complete AI-human ecosystem and agent network',
    requiredPoints: 1450,
    rewardPoints: 500,
    color: 'from-rose-500/30 to-rose-400/20',
    borderColor: 'rose-300/40',
    accentColor: 'rose-300',
  },
  {
    id: 'module6',
    title: 'Practical Tools & Sovereign Automation',
    emoji: '⚙️',
    description: 'Trading bots, ID cards, sharathon, and autonomous agents',
    requiredPoints: 1950,
    rewardPoints: 600,
    color: 'from-cyan-500/30 to-cyan-400/20',
    borderColor: 'cyan-300/40',
    accentColor: 'cyan-300',
  },
];

export function AbraxasAcademy() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [progress, setProgress] = useState<AcademyProgressState>({
    module1: { completed: false, airdropPoints: 0 },
    module2: { completed: false, airdropPoints: 0 },
    module3: { completed: false, airdropPoints: 0 },
    module4: { completed: false, airdropPoints: 0 },
    module5: { completed: false, airdropPoints: 0 },
    module6: { completed: false, airdropPoints: 0 },
    totalAirdropPoints: 0,
  });
  const [savedScrollPos, setSavedScrollPos] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('abraxas_academy_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load academy progress', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('abraxas_academy_progress', JSON.stringify(progress));
  }, [progress]);

  // Lock/unlock body scroll when module is open/closed
  useEffect(() => {
    if (activeModule) {
      // Save current scroll position and lock body scroll
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setSavedScrollPos(scrollPos);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollPos}px`;
    } else {
      // Restore scroll position and unlock body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, savedScrollPos);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [activeModule, savedScrollPos]);

  const handleModuleComplete = (moduleKey: string, points: number) => {
    setProgress(prev => {
      const updated = { ...prev };
      const key = moduleKey as keyof Omit<AcademyProgressState, 'totalAirdropPoints'>;
      if (key in updated) {
        const module = updated[key] as any;
        module.completed = true;
        module.airdropPoints = points;
        updated.totalAirdropPoints = Object.values(updated)
          .filter(v => typeof v === 'object' && 'airdropPoints' in v)
          .reduce((sum, v) => sum + (v as any).airdropPoints, 0);
      }
      return updated;
    });
  };

  const getModuleStatus = (requiredPoints: number) => {
    return progress.totalAirdropPoints >= requiredPoints;
  };

  if (activeModule) {
    const handleBack = () => setActiveModule(null);
    const handleComplete = (points: number) => {
      handleModuleComplete(activeModule, points);
      setActiveModule(null);
    };

    switch (activeModule) {
      case 'module1':
        return <AcademyModule1 onBack={handleBack} onComplete={handleComplete} />;
      case 'module2':
        return <AcademyModule2 onBack={handleBack} onComplete={handleComplete} />;
      case 'module3':
        return <AcademyModule3 onBack={handleBack} onComplete={handleComplete} />;
      case 'module4':
        return <AcademyModule4 onBack={handleBack} onComplete={handleComplete} />;
      case 'module5':
        return <AcademyModule5 onBack={handleBack} onComplete={handleComplete} />;
      case 'module6':
        return <AcademyModule6 onBack={handleBack} onComplete={handleComplete} />;
      default:
        return null;
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/8 via-slate-900/80 to-slate-900/60 p-5 sm:p-8 space-y-6 sm:space-y-8">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/3 rounded-full blur-3xl" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-repeat opacity-10" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(147, 51, 234, 0.05) 25%, rgba(147, 51, 234, 0.05) 26%, transparent 27%, transparent 74%, rgba(147, 51, 234, 0.05) 75%, rgba(147, 51, 234, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 4px'
        }} />
      </div>

      <div className="relative z-10 space-y-8 sm:space-y-10">
        {/* Academy Header */}
        <div className="space-y-3 sm:space-y-4 border-b border-purple-300/20 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-purple-300/60">&gt; [ABRAXAS_ACADEMY] PROGRESSIVE_CURRICULUM</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-200 tracking-wide">The Complete Species Evolution</h1>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300/90">
                Master the Abraxas ecosystem through 6 progressive modules. From RWA tokenization to sovereign automation — unlock the full potential of the species.
              </p>
            </div>
            <div className="text-right space-y-1 shrink-0">
              <div className="inline-flex items-center gap-2 rounded-lg border border-purple-300/30 bg-purple-500/15 px-3 py-2">
                <Sparkles size={14} className="text-purple-300" />
                <span className="text-sm font-bold text-purple-200">{progress.totalAirdropPoints}</span>
              </div>
              <p className="text-[10px] text-slate-400">Airdrop Points</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <span className="text-purple-300/60">Academy Progress</span>
              <span className="text-purple-300 font-semibold">
                {Object.values(progress).filter((v: any) => typeof v === 'object' && v.completed).length}/6
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-purple-300/20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                style={{
                  width: `${(Object.values(progress).filter((v: any) => typeof v === 'object' && v.completed).length / 6) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* BUY $ABRA - TOP CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 px-2">
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-400/70 bg-gradient-to-r from-amber-500/40 to-orange-500/35 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_24px_rgba(251,146,60,0.35)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(251,146,60,0.5)] hover:border-amber-300/90 hover:from-amber-500/50 hover:to-orange-500/45 flex-1 sm:flex-none"
          >
            <Zap size={18} className="text-orange-400 shrink-0" />
            <span>Buy $ABRA</span>
            <ArrowRight size={16} className="hidden sm:inline" />
          </a>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULE_INFO.map((module, idx) => {
            const isAvailable = getModuleStatus(module.requiredPoints);
            const isCompleted = progress[module.id as keyof Omit<AcademyProgressState, 'totalAirdropPoints'>]?.completed;

            return (
              <div
                key={module.id}
                className={`group relative rounded-lg sm:rounded-xl border overflow-hidden transition-all duration-300 ${
                  isAvailable
                    ? 'cursor-pointer hover:shadow-lg hover:shadow-purple-500/20'
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color}`} />

                {/* Content */}
                <div
                  className={`relative p-4 sm:p-5 space-y-3 border ${module.borderColor} `}
                  onClick={() => isAvailable && setActiveModule(module.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-3xl">{module.emoji}</div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-300/80">Module {idx + 1}</div>
                      {isCompleted && <CheckCircle2 size={18} className={`text-${module.id}-300 mt-1`} />}
                      {!isAvailable && <Lock size={18} className="text-slate-500 mt-1" />}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-300/80 leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Requirements & Rewards */}
                  <div className="pt-2 border-t border-slate-500/20 space-y-2 text-[10px] sm:text-xs">
                    {module.requiredPoints > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Required:</span>
                        <span className={`font-bold ${progress.totalAirdropPoints >= module.requiredPoints ? 'text-teal-300' : 'text-red-300/70'}`}>
                          {module.requiredPoints} pts
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Reward:</span>
                      <span className="font-bold text-amber-300">+{module.rewardPoints} pts</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {isAvailable && (
                    <button
                      className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-950/50 border border-slate-400/20 hover:bg-slate-950/70 hover:border-slate-400/40 text-xs font-semibold transition text-slate-100"
                      onClick={() => setActiveModule(module.id)}
                    >
                      Start Module
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BUY $ABRA - BOTTOM CTA */}
        <div className="border-t border-purple-300/20 pt-6 sm:pt-8 text-center space-y-3 sm:space-y-4">
          <p className="text-[9px] sm:text-xs font-mono text-purple-300/80 uppercase tracking-widest">&gt; [ACADEMY_COMPLETE] UNLOCK_SOVEREIGN_POTENTIAL</p>
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80 w-full sm:w-auto"
          >
            <Zap size={16} className="text-orange-400 shrink-0" />
            <span>Buy $ABRA & Activate Academy</span>
            <ArrowRight size={14} className="hidden sm:inline" />
          </a>
          <p className="text-[10px] sm:text-xs text-slate-400/70 italic leading-relaxed">
            Master all modules to unlock exclusive airdrop rewards. Complete the species evolution.
          </p>
        </div>
      </div>
    </div>
  );
}
