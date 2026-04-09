import { useState } from 'react';
import { ArrowLeft, Zap, ArrowRight, CheckCircle2, AlertCircle, Video, ChevronDown } from 'lucide-react';

interface Module5Props {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function AcademyModule5({ onBack, onComplete }: Module5Props) {
  const [activeTab, setActiveTab] = useState<'intro' | 'content' | 'quiz'>('intro');
  const [showVideo, setShowVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      q: 'What are the Sons in the Abraxas ecosystem?',
      opts: [
        'Marketing divisions',
        'Specialized daughter dApps for institutional capital',
        'Bank branches',
        'Social media accounts'
      ],
      correct: 1
    },
    {
      q: 'What is the Forge in Abraxas?',
      opts: [
        'A blockchain consensus mechanism',
        'The RWA tokenization hub connecting all dApps',
        'A type of cryptocurrency exchange',
        'A trading bot'
      ],
      correct: 1
    },
    {
      q: 'What does Circuit provide in the ecosystem?',
      opts: [
        'Marketing campaigns',
        'Risk monitoring and circuit breaker protection',
        'Customer service',
        'Mining pools'
      ],
      correct: 1
    }
  ];

  const handleAnswer = (qIdx: number, optIdx: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[qIdx] = optIdx;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    const correct = quizAnswers.filter((ans, idx) => ans === questions[idx].correct).length;
    if (correct >= 2) {
      setQuizComplete(true);
    }
  };

  const finalScore = quizAnswers.filter((ans, idx) => ans === questions[idx].correct).length;
  const passed = finalScore >= 2;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-8 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-300/30 bg-slate-900/50 hover:bg-slate-900/70 text-rose-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Academy
            </button>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-rose-300/60">&gt; [MODULE_5] SPECIES</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-200">The Living Species: Daughters, Sons, Forge & Circuit</h1>
              <p className="text-sm leading-relaxed text-slate-300/90 max-w-2xl">
                Explore the complete AI-human ecosystem where specialized Daughters and Sons drive institutional capital flows through unified Forge orchestration.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b border-rose-300/20 pb-4 overflow-x-auto">
            {(['intro', 'content', 'quiz'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-rose-500/30 to-rose-400/20 border border-rose-300/40 text-rose-100 shadow-lg'
                    : 'text-rose-300/60 hover:text-rose-300/80 border border-rose-300/10'
                }`}
              >
                {tab === 'intro' && '🎬 Intro'}
                {tab === 'content' && '📚 Content'}
                {tab === 'quiz' && '✓ Quiz'}
              </button>
            ))}
          </div>

          <div className="rounded-lg sm:rounded-xl border border-rose-300/30 bg-gradient-to-br from-rose-500/8 to-slate-900/60 p-6 space-y-6 mb-6">
            {activeTab === 'intro' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-rose-300/20 bg-rose-500/10 p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-rose-200">The Complete Species Network</h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Beyond individual tools, Abraxas creates a living ecosystem. Daughters specialize in different RWA classes. Sons drive institutional flows. 
                    Forge serves as the unified orchestration layer. Circuit monitors risk across the entire network.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Together, they form a sovereign, AI-governed species that operates autonomously in service of human prosperity.
                  </p>
                </div>

                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-rose-300/40 bg-rose-500/15 hover:bg-rose-500/25 text-rose-100 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    Watch The Species Evolution
                  </div>
                  <ChevronDown size={16} className={`transition ${showVideo ? 'rotate-180' : ''}`} />
                </button>

                {showVideo && (
                  <div className="rounded-lg border border-rose-300/20 overflow-hidden bg-black" style={{ height: '300px' }}>
                    <video
                      src="/assets/module5-species-ecosystem.mp4"
                      title="The Living Species"
                      className="w-full h-full object-contain"
                      controls
                      controlsList="nodownload"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-rose-200">The Ecosystem Architecture</h2>

                  <div className="rounded-lg border border-rose-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-rose-200">👑 The Daughters</h3>
                    <p className="text-sm text-slate-300">
                      Specialized dApps focused on specific RWA classes: Verdant (real estate), Echo (music/IP), Aurelia (digital assets), Cadabra (athlete equity), 
                      Vein (commodities), Valkyr (derivatives), Mimir (data/analytics). Each daughter masters its domain with dedicated tokenomics and mechanisms.
                    </p>
                  </div>

                  <div className="rounded-lg border border-rose-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-rose-200">⚔️ The Sons</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-rose-400 font-bold">→</span>
                        <span><strong>Abraxas Prime:</strong> Main protocol hub and governance center</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-rose-400 font-bold">→</span>
                        <span><strong>Raido:</strong> Day trading and institutional capital flow optimization</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-rose-400 font-bold">→</span>
                        <span><strong>Sophia:</strong> Agent management and AI orchestration layer</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-rose-400 font-bold">→</span>
                        <span><strong>Orion (King AI):</strong> Strategic intelligence and institutional decision-making</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-rose-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-rose-200">🔪 The Forge</h3>
                    <p className="text-sm text-slate-300">
                      The unified RWA tokenization and orche stration hub. Forge connects all Daughters and Sons, providing shared infrastructure for 
                      asset verification, yield distribution, and cross-dApp liquidity. Acts as the species' nervous system.
                    </p>
                  </div>

                  <div className="rounded-lg border border-rose-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-rose-200">⚡ The Circuit</h3>
                    <p className="text-sm text-slate-300">
                      Risk monitoring and protection mechanism. Circuit watches vaults, monitors price speed, liquidity drain, and activity spikes. 
                      Can automatically trigger protective actions: None / Release Liquidity / Pause Risk. Ensures ecosystem stability.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {!quizComplete ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-rose-200">Test Your Knowledge</h2>
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg border border-rose-300/20 bg-slate-950/50 p-4 space-y-3">
                        <p className="font-semibold text-rose-100 text-sm">
                          Q{qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswer(qIdx, oIdx)}
                              className={`w-full px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm font-semibold transition border ${
                                quizAnswers[qIdx] === oIdx
                                  ? 'bg-rose-500/20 border-rose-300/60 text-rose-100'
                                  : 'bg-slate-900/50 border-rose-300/20 text-slate-300 hover:border-rose-300/40'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={submitQuiz}
                      disabled={quizAnswers.length < questions.length}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500/30 to-rose-400/20 border border-rose-300/60 text-rose-100 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:from-rose-500/40 hover:to-rose-400/30 transition"
                    >
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 rounded-lg border border-rose-300/30 bg-rose-500/15 p-6">
                      {passed ? (
                        <>
                          <CheckCircle2 size={48} className="mx-auto text-rose-300" />
                          <p className="text-2xl font-bold text-rose-200">🎉 Mastery Unlocked!</p>
                          <p className="text-sm text-rose-300/90">
                            Score: {finalScore}/{questions.length} - You've earned 500 Airdrop Points!
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={48} className="mx-auto text-rose-400" />
                          <p className="text-xl font-bold text-rose-200">Try Again</p>
                          <p className="text-sm text-rose-300/90">
                            Score: {finalScore}/{questions.length} - Need 2/3 to pass
                          </p>
                        </>
                      )}
                    </div>

                    {passed && (
                      <button
                        onClick={() => onComplete(500)}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500/40 to-rose-400/30 border border-rose-300/60 text-rose-100 font-bold uppercase tracking-wider hover:from-rose-500/50 hover:to-rose-400/40 transition flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Claim 500 Points & Continue
                        <ArrowRight size={16} />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => {
                          setQuizAnswers([]);
                          setQuizComplete(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500/30 to-rose-400/20 border border-rose-300/40 text-rose-100 font-bold uppercase tracking-wider transition"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <a
              href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-rose-400/60 bg-gradient-to-r from-rose-500/30 to-rose-400/25 text-rose-200 font-bold uppercase tracking-wider hover:shadow-lg transition"
            >
              <Zap size={16} />
              Buy $ABRA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
