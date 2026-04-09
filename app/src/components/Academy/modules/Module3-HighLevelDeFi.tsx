import { useState } from 'react';
import { ArrowLeft, Zap, ArrowRight, CheckCircle2, AlertCircle, Video, ChevronDown } from 'lucide-react';

interface Module3Props {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function AcademyModule3({ onBack, onComplete }: Module3Props) {
  const [activeTab, setActiveTab] = useState<'intro' | 'content' | 'quiz'>('intro');
  const [showVideo, setShowVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      q: 'What does M1 Pulldown unlock?',
      opts: [
        'Blockchain scaling solutions',
        'Institutional capital locked out of DeFi',
        'Marketing campaigns',
        'Mobile applications'
      ],
      correct: 1
    },
    {
      q: 'How does undercollateralized lending improve capital efficiency?',
      opts: [
        'By removing all requirements',
        'By using algorithmic trust instead of 100%+ collateral',
        'By eliminating interest rates',
        'By moving to traditional banks'
      ],
      correct: 1
    },
    {
      q: 'What is the key innovation of high-level DeFi in Abraxas?',
      opts: [
        'Higher fees',
        'Institutional-grade capital flows with algorithmic trust',
        'Slower transactions',
        'Removing audit requirements'
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-300/30 bg-slate-900/50 hover:bg-slate-900/70 text-orange-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Academy
            </button>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-orange-300/60">&gt; [MODULE_3] DEFI</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-200">High-Level DeFi: M1 Pulldown & Undercollateralized Lending</h1>
              <p className="text-sm leading-relaxed text-slate-300/90 max-w-2xl">
                Explore institutional capital flows, algorithmic trust models, and the mechanisms that unlock billions in DeFi liquidity.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b border-orange-300/20 pb-4 overflow-x-auto">
            {(['intro', 'content', 'quiz'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500/30 to-orange-400/20 border border-orange-300/40 text-orange-100 shadow-lg'
                    : 'text-orange-300/60 hover:text-orange-300/80 border border-orange-300/10'
                }`}
              >
                {tab === 'intro' && '🎬 Intro'}
                {tab === 'content' && '📚 Content'}
                {tab === 'quiz' && '✓ Quiz'}
              </button>
            ))}
          </div>

          <div className="rounded-lg sm:rounded-xl border border-orange-300/30 bg-gradient-to-br from-orange-500/8 to-slate-900/60 p-6 space-y-6 mb-6">
            {activeTab === 'intro' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-orange-300/20 bg-orange-500/10 p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-orange-200">The Next Degree of Finance</h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Trillions of dollars are trapped in traditional finance. Institutional capital cannot access DeFi. Market impact constraints prevent natural flows.
                    M1 Pulldown and undercollateralized lending breakthrough these barriers with algorithmic trust.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    King AI monitors these flows. Abraxas captures them. ABRA stakers benefit immediately.
                  </p>
                </div>

                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-orange-300/40 bg-orange-500/15 hover:bg-orange-500/25 text-orange-100 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    Watch DeFi Capital Flows Explained
                  </div>
                  <ChevronDown size={16} className={`transition ${showVideo ? 'rotate-180' : ''}`} />
                </button>

                {showVideo && (
                  <div className="rounded-lg border border-orange-300/20 overflow-hidden bg-black" style={{ height: '300px' }}>
                    <video
                      src="/assets/module3-defi-flows.mp4"
                      title="High-Level DeFi"
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
                  <h2 className="text-xl font-bold text-orange-200">M1 Pulldown & Institutional Lending</h2>

                  <div className="rounded-lg border border-orange-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-orange-200">M1 Pulldown Mechanism</h3>
                    <p className="text-sm text-slate-300">
                      M1 represents institutional capital locked in derivative hedges and market-impact-constrained positions. 
                      Pulldown unlocks this capital through structured releases over90-180 days with protective derivative hedges intact.
                    </p>
                  </div>

                  <div className="rounded-lg border border-orange-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-orange-200">Undercollateralized Lending</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-orange-400 font-bold">→</span>
                        <span><strong>Traditional Model:</strong> 100% collateral required (capital inefficient)</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-orange-400 font-bold">→</span>
                        <span><strong>Abraxas Model:</strong> 80-110% collateral through algorithmic trust</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-orange-400 font-bold">→</span>
                        <span><strong>King AI Audits:</strong> Portfolio analysis, win rates, liquidation history</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-orange-400 font-bold">→</span>
                        <span><strong>Result:</strong> 5x+ efficiency improvement for borrowers</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-orange-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-orange-200">How $ABRA Stakers Benefit</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>✓ First-order yields from M1 capital flows</li>
                      <li>✓ Lending protocol fee capture</li>
                      <li>✓ 24% base APY + M1 bonuses</li>
                      <li>✓ Compounding rewards</li>
                      <li>✓ Institutional risk premium</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {!quizComplete ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-orange-200">Test Your Knowledge</h2>
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg border border-orange-300/20 bg-slate-950/50 p-4 space-y-3">
                        <p className="font-semibold text-orange-100 text-sm">
                          Q{qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswer(qIdx, oIdx)}
                              className={`w-full px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm font-semibold transition border ${
                                quizAnswers[qIdx] === oIdx
                                  ? 'bg-orange-500/20 border-orange-300/60 text-orange-100'
                                  : 'bg-slate-900/50 border-orange-300/20 text-slate-300 hover:border-orange-300/40'
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
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500/30 to-orange-400/20 border border-orange-300/60 text-orange-100 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-500/40 hover:to-orange-400/30 transition"
                    >
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 rounded-lg border border-orange-300/30 bg-orange-500/15 p-6">
                      {passed ? (
                        <>
                          <CheckCircle2 size={48} className="mx-auto text-orange-300" />
                          <p className="text-2xl font-bold text-orange-200">🎉 Mastery Unlocked!</p>
                          <p className="text-sm text-orange-300/90">
                            Score: {finalScore}/{questions.length} - You've earned 400 Airdrop Points!
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={48} className="mx-auto text-orange-400" />
                          <p className="text-xl font-bold text-orange-200">Try Again</p>
                          <p className="text-sm text-orange-300/90">
                            Score: {finalScore}/{questions.length} - Need 2/3 to pass
                          </p>
                        </>
                      )}
                    </div>

                    {passed && (
                      <button
                        onClick={() => onComplete(400)}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500/40 to-orange-400/30 border border-orange-300/60 text-orange-100 font-bold uppercase tracking-wider hover:from-orange-500/50 hover:to-orange-400/40 transition flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Claim 400 Points & Continue
                        <ArrowRight size={16} />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => {
                          setQuizAnswers([]);
                          setQuizComplete(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500/30 to-orange-400/20 border border-orange-300/40 text-orange-100 font-bold uppercase tracking-wider transition"
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
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-orange-400/60 bg-gradient-to-r from-orange-500/30 to-orange-400/25 text-orange-200 font-bold uppercase tracking-wider hover:shadow-lg transition"
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
