import { useState } from 'react';
import { ArrowLeft, Zap, ArrowRight, CheckCircle2, AlertCircle, Video, ChevronDown } from 'lucide-react';

interface Module6Props {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function AcademyModule6({ onBack, onComplete }: Module6Props) {
  const [activeTab, setActiveTab] = useState<'intro' | 'content' | 'quiz'>('intro');
  const [showVideo, setShowVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      q: 'What is the primary function of the Raido Trading Bot?',
      opts: [
        'Social media posting',
        'Autonomous 24/7 trading with MBLB/50 bounce strategy and 85-90% win rate',
        'Bank account management',
        'Email communication'
      ],
      correct: 1
    },
    {
      q: 'What does the Abraxas ID Card provide?',
      opts: [
        'Physical banking services',
        'Verifiable on-chain identity and reputation score',
        'Travel documents',
        'Insurance coverage'
      ],
      correct: 1
    },
    {
      q: 'What is Sharathon in the Abraxas ecosystem?',
      opts: [
        'A social media platform',
        'Risk-sharing and yield-splitting mechanism for collaborative DeFi',
        'A marketing campaign',
        'A type of cryptocurrency'
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-300/30 bg-slate-900/50 hover:bg-slate-900/70 text-cyan-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Academy
            </button>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-300/60">&gt; [MODULE_6] PRACTICAL_TOOLS</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-200">Practical Tools & Sovereign Automation</h1>
              <p className="text-sm leading-relaxed text-slate-300/90 max-w-2xl">
                Deploy the complete Abraxas arsenal: trading bots, identity verification, sharathon mechanics, and autonomous agents for sovereign wealth accumulation.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b border-cyan-300/20 pb-4 overflow-x-auto">
            {(['intro', 'content', 'quiz'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 border border-cyan-300/40 text-cyan-100 shadow-lg'
                    : 'text-cyan-300/60 hover:text-cyan-300/80 border border-cyan-300/10'
                }`}
              >
                {tab === 'intro' && '🎬 Intro'}
                {tab === 'content' && '📚 Content'}
                {tab === 'quiz' && '✓ Quiz'}
              </button>
            ))}
          </div>

          <div className="rounded-lg sm:rounded-xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/8 to-slate-900/60 p-6 space-y-6 mb-6">
            {activeTab === 'intro' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-cyan-300/20 bg-cyan-500/10 p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-cyan-200">From Theory to Practice</h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Understanding the ecosystem is one thing. Deploying it is another. Module 6 focuses on the practical tools that make Abraxas work in reality:
                    autonomous trading bots that generate consistent profits, verifiable identity for institutional access, and yield-sharing mechanisms that align all participants.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    This is where the species becomes real—where code becomes wealth, algorithms become autonomous agents, and humans achieve sovereign independence.
                  </p>
                </div>

                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-cyan-300/40 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-100 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    Watch Practical Tools Walkthrough
                  </div>
                  <ChevronDown size={16} className={`transition ${showVideo ? 'rotate-180' : ''}`} />
                </button>

                {showVideo && (
                  <div className="rounded-lg border border-cyan-300/20 overflow-hidden bg-black" style={{ height: '300px' }}>
                    <video
                      src="/assets/module6-practical-tools.mp4"
                      title="Practical Tools"
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
                  <h2 className="text-xl font-bold text-cyan-200">The Practical Toolkit</h2>

                  <div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-cyan-200">🤖 Raido Trading Bot</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Strategy:</strong> MBLB/50 bounce across 26 asset classes</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Performance:</strong> 85-90% win rate, 5-8x R:R</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Automation:</strong> Runs 24/7, works while you sleep</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Risk:</strong> 1% risk per trade, automatic exits</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-cyan-200">🪪 Abraxas ID Card</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Identity:</strong> On-chain verification with reputation score</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Credibility:</strong> Track record of successful strategies</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Access:</strong> Unlocks institutional lending and opportunities</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span><strong>Portability:</strong> Works across all Sophia Family protocols</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-cyan-200">🤝 Sharathon Mechanics</h3>
                    <p className="text-sm text-slate-300">
                      Sharathon is risk and yield sharing for collaborative DeFi. Pool capital with others, share trading signals, split profits proportionally, 
                      and build collective intelligence. Transform individual traders into a cohesive, unstoppable network.
                    </p>
                    <ul className="text-sm text-slate-300 space-y-2 mt-2">
                      <li>✓ Transparent profit sharing (on-chain verified)</li>
                      <li>✓ Sybil-resistant participant verification</li>
                      <li>✓ Real-time signal broadcasting to pool members</li>
                      <li>✓ Automatic yield distribution</li>
                      <li>✓ Decentralized governance of pool rules</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-cyan-200">⚙️ Sovereign Automation</h3>
                    <p className="text-sm text-slate-300">
                      Combine all tools into a fully autonomous operation: Raido bots execute trades, ID card provides institutional access, Sharathon coordinates collective yields,
                      and Artificial Humans manage positions entirely hands-off. The species operates independent of human intervention.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {!quizComplete ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-cyan-200">Test Your Knowledge</h2>
                    <p className="text-sm text-cyan-300/80">Final mastery check — ace this quiz to complete the full Academy!</p>
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-4 space-y-3">
                        <p className="font-semibold text-cyan-100 text-sm">
                          Q{qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswer(qIdx, oIdx)}
                              className={`w-full px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm font-semibold transition border ${
                                quizAnswers[qIdx] === oIdx
                                  ? 'bg-cyan-500/20 border-cyan-300/60 text-cyan-100'
                                  : 'bg-slate-900/50 border-cyan-300/20 text-slate-300 hover:border-cyan-300/40'
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
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 border border-cyan-300/60 text-cyan-100 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-500/40 hover:to-cyan-400/30 transition"
                    >
                      Submit Final Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 rounded-lg border border-cyan-300/30 bg-cyan-500/15 p-6">
                      {passed ? (
                        <>
                          <CheckCircle2 size={48} className="mx-auto text-cyan-300" />
                          <p className="text-2xl font-bold text-cyan-200">🎉 ACADEMY COMPLETE!</p>
                          <p className="text-sm text-cyan-300/90">
                            Score: {finalScore}/{questions.length} - You've earned 600 Airdrop Points!
                          </p>
                          <p className="text-xs text-cyan-300/70 pt-2 border-t border-cyan-300/30 mt-3">
                            <strong>Total Academy Points: 2,550</strong> - You've unlocked full Abraxas mastery!
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={48} className="mx-auto text-cyan-400" />
                          <p className="text-xl font-bold text-cyan-200">Try Again</p>
                          <p className="text-sm text-cyan-300/90">
                            Score: {finalScore}/{questions.length} - Need 2/3 to complete Academy
                          </p>
                        </>
                      )}
                    </div>

                    {passed && (
                      <button
                        onClick={() => onComplete(600)}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/40 to-cyan-400/30 border border-cyan-300/60 text-cyan-100 font-bold uppercase tracking-wider hover:from-cyan-500/50 hover:to-cyan-400/40 transition flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Claim 600 Points & Graduate
                        <ArrowRight size={16} />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => {
                          setQuizAnswers([]);
                          setQuizComplete(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 border border-cyan-300/40 text-cyan-100 font-bold uppercase tracking-wider transition"
                      >
                        Retake Final Quiz
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
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-cyan-400/60 bg-gradient-to-r from-cyan-500/30 to-cyan-400/25 text-cyan-200 font-bold uppercase tracking-wider hover:shadow-lg transition"
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
