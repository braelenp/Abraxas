import { useState } from 'react';
import { ArrowLeft, Zap, ArrowRight, CheckCircle2, AlertCircle, Video, ChevronDown } from 'lucide-react';

interface Module2Props {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function AcademyModule2({ onBack, onComplete }: Module2Props) {
  const [activeTab, setActiveTab] = useState<'intro' | 'content' | 'quiz'>('intro');
  const [showVideo, setShowVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      q: 'What does CV5 primarily address in capital compliance?',
      opts: [
        'Marketing and brand compliance',
        'Capital requirements and solvency standards',
        'Social media governance',
        'Employee benefits'
      ],
      correct: 1
    },
    {
      q: 'What is the core advantage of Utila custody?',
      opts: [
        'Lower transaction fees',
        'Sovereign, decentralized asset custody without intermediaries',
        'Faster token transfers',
        'Better user interface'
      ],
      correct: 1
    },
    {
      q: 'Which regulatory framework does Abraxas leverage for compliance?',
      opts: [
        'Traditional banking law only',
        'Crypto-exclusive regulations',
        'Multi-jurisdictional framework with institutional infrastructure',
        'No regulation needed'
      ],
      correct: 2
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-300/30 bg-slate-900/50 hover:bg-slate-900/70 text-blue-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Academy
            </button>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-blue-300/60">&gt; [MODULE_2] COMPLIANCE</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200">Utila Custody & CV5 Capital Compliance</h1>
              <p className="text-sm leading-relaxed text-slate-300/90 max-w-2xl">
                Master sovereign custody solutions and regulatory capital compliance frameworks that power institutional DeFi.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b border-blue-300/20 pb-4 overflow-x-auto">
            {(['intro', 'content', 'quiz'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500/30 to-blue-400/20 border border-blue-300/40 text-blue-100 shadow-lg'
                    : 'text-blue-300/60 hover:text-blue-300/80 border border-blue-300/10'
                }`}
              >
                {tab === 'intro' && '🎬 Intro'}
                {tab === 'content' && '📚 Content'}
                {tab === 'quiz' && '✓ Quiz'}
              </button>
            ))}
          </div>

          <div className="rounded-lg sm:rounded-xl border border-blue-300/30 bg-gradient-to-br from-blue-500/8 to-slate-900/60 p-6 space-y-6 mb-6">
            {activeTab === 'intro' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-blue-300/20 bg-blue-500/10 p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-blue-200">Sovereign Custody in a Regulated World</h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Institutional capital has strict requirements. Authorities demand proof of compliance. Traditional custodians extract fees and impose restrictions.
                    Utila reimagines custody through decentralization while maintaining regulatory alignment.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    CV5 Capital Compliance ensures Abraxas meets institutional standards without sacrificing sovereignty.
                  </p>
                </div>

                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-blue-300/40 bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    Watch Custody Framework Deep Dive
                  </div>
                  <ChevronDown size={16} className={`transition ${showVideo ? 'rotate-180' : ''}`} />
                </button>

                {showVideo && (
                  <div className="rounded-lg border border-blue-300/20 overflow-hidden bg-black" style={{ height: '300px' }}>
                    <video
                      src="/assets/module2-utila-custody.mp4"
                      title="Utila Custody"
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
                  <h2 className="text-xl font-bold text-blue-200">Custody & Compliance</h2>

                  <div className="rounded-lg border border-blue-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-blue-200">Utila Custody Model</h3>
                    <p className="text-sm text-slate-300">
                      Utila enables truly sovereign asset custody by eliminating intermediaries while providing institutional-grade security and auditability.
                      Multi-signature protocols, time-locks, and transparent on-chain governance replace traditional centralizedcustody.
                    </p>
                  </div>

                  <div className="rounded-lg border border-blue-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-blue-200">CV5 Capital Compliance</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-blue-400 font-bold">→</span>
                        <span><strong>Capital Requirements:</strong> Maintains solvency ratios per institutional standards</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-blue-400 font-bold">→</span>
                        <span><strong>Verification (V):</strong> Continuous on-chain audit trail</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-blue-400 font-bold">→</span>
                        <span><strong>Collateral (C):</strong> Over-collateralization protections</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-blue-400 font-bold">→</span>
                        <span><strong>Coverage (5x):</strong> 5x coverage of liabilities required</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-blue-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-blue-200">Key Benefits</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>✓ No intermediary fees</li>
                      <li>✓ Full transparency and auditability</li>
                      <li>✓ Institutional regulatory alignment</li>
                      <li>✓ Instant settlement on-chain</li>
                      <li>✓ Multi-jurisdictional compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {!quizComplete ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-blue-200">Test Your Knowledge</h2>
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg border border-blue-300/20 bg-slate-950/50 p-4 space-y-3">
                        <p className="font-semibold text-blue-100 text-sm">
                          Q{qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswer(qIdx, oIdx)}
                              className={`w-full px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm font-semibold transition border ${
                                quizAnswers[qIdx] === oIdx
                                  ? 'bg-blue-500/20 border-blue-300/60 text-blue-100'
                                  : 'bg-slate-900/50 border-blue-300/20 text-slate-300 hover:border-blue-300/40'
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
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/30 to-blue-400/20 border border-blue-300/60 text-blue-100 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500/40 hover:to-blue-400/30 transition"
                    >
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 rounded-lg border border-blue-300/30 bg-blue-500/15 p-6">
                      {passed ? (
                        <>
                          <CheckCircle2 size={48} className="mx-auto text-blue-300" />
                          <p className="text-2xl font-bold text-blue-200">🎉 Mastery Unlocked!</p>
                          <p className="text-sm text-blue-300/90">
                            Score: {finalScore}/{questions.length} - You've earned 350 Airdrop Points!
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={48} className="mx-auto text-blue-400" />
                          <p className="text-xl font-bold text-blue-200">Try Again</p>
                          <p className="text-sm text-blue-300/90">
                            Score: {finalScore}/{questions.length} - Need 2/3 to pass
                          </p>
                        </>
                      )}
                    </div>

                    {passed && (
                      <button
                        onClick={() => onComplete(350)}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/40 to-blue-400/30 border border-blue-300/60 text-blue-100 font-bold uppercase tracking-wider hover:from-blue-500/50 hover:to-blue-400/40 transition flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Claim 350 Points & Continue
                        <ArrowRight size={16} />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => {
                          setQuizAnswers([]);
                          setQuizComplete(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/30 to-blue-400/20 border border-blue-300/40 text-blue-100 font-bold uppercase tracking-wider transition"
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
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-blue-400/60 bg-gradient-to-r from-blue-500/30 to-blue-400/25 text-blue-200 font-bold uppercase tracking-wider hover:shadow-lg transition"
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
