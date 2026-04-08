import { useState } from 'react';
import { ArrowLeft, Zap, ArrowRight, CheckCircle2, AlertCircle, Video, ChevronDown } from 'lucide-react';

interface Module4Props {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function AcademyModule4({ onBack, onComplete }: Module4Props) {
  const [activeTab, setActiveTab] = useState<'intro' | 'content' | 'quiz'>('intro');
  const [showVideo, setShowVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      q: 'What is the Monolith transmutation in Abraxas?',
      opts: [
        'A type of cryptocurrency mining',
        'Digital representation of a unique biological identity',
        'A blockchain consensus mechanism',
        'A marketing term'
      ],
      correct: 1
    },
    {
      q: 'What does Web5 Biological Ledger enable?',
      opts: [
        'Faster internet speeds',
        'Decentralized identity verification using biometric data',
        'Cryptocurrency mining pools',
        'Social media integration'
      ],
      correct: 1
    },
    {
      q: 'How does Artificial Human enhance DeFi participation?',
      opts: [
        'By replacing human traders completely',
        'Enabling algorithmic trust verification and autonomous agents',
        'By removing all security measures',
        'Through centralized governance'
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-300/30 bg-slate-900/50 hover:bg-slate-900/70 text-purple-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Academy
            </button>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-purple-300/60">&gt; [MODULE_4] MONOLITH</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-200">Artificial Human & Web5 Biological Ledger</h1>
              <p className="text-sm leading-relaxed text-slate-300/90 max-w-2xl">
                The Monolith transmutation bridges digital identity with biometric verification for sovereign, decentralized human verification.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b border-purple-300/20 pb-4 overflow-x-auto">
            {(['intro', 'content', 'quiz'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500/30 to-purple-400/20 border border-purple-300/40 text-purple-100 shadow-lg'
                    : 'text-purple-300/60 hover:text-purple-300/80 border border-purple-300/10'
                }`}
              >
                {tab === 'intro' && '🎬 Intro'}
                {tab === 'content' && '📚 Content'}
                {tab === 'quiz' && '✓ Quiz'}
              </button>
            ))}
          </div>

          <div className="rounded-lg sm:rounded-xl border border-purple-300/30 bg-gradient-to-br from-purple-500/8 to-slate-900/60 p-6 space-y-6 mb-6">
            {activeTab === 'intro' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="rounded-lg border border-purple-300/20 bg-purple-500/10 p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-purple-200">The Digital Identity Revolution</h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Traditional digital identity relies on centralized providers and passwords. Monolith reimagines this through a Biological Ledger—
                    a Web5 standard where your biometric signature becomes your unforgeable digital identity.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Artificial Human agents use this verified identity to participate in DeFi with algorithmic trust and sovereign authentication.
                  </p>
                </div>

                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-purple-300/40 bg-purple-500/15 hover:bg-purple-500/25 text-purple-100 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    Watch Monolith Transmutation Video
                  </div>
                  <ChevronDown size={16} className={`transition ${showVideo ? 'rotate-180' : ''}`} />
                </button>

                {showVideo && (
                  <div className="rounded-lg border border-purple-300/20 overflow-hidden bg-black" style={{ height: '300px' }}>
                    <video
                      src="/assets/module4-monolith-ledger.mp4"
                      title="Monolith Transmutation"
                      className="w-full h-full object-contain"
                      controls
                      controlsList="nodownload"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-purple-200">The Monolith Transmutation</h2>

                  <div className="rounded-lg border border-purple-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-purple-200">Artificial Human Layer</h3>
                    <p className="text-sm text-slate-300">
                      Artificial Humans are AI-guided agents that operate with digitally verified identity. They execute trades, manage positions, and participate in protocols entirely autonomously,
                      powered by biometric verification and algorithmic trust.
                    </p>
                  </div>

                  <div className="rounded-lg border border-purple-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-purple-200">Web5 Biological Ledger</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-purple-400 font-bold">→</span>
                        <span><strong>Biometric Signature:</strong> Unique fingerprint of your biological identity</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-purple-400 font-bold">→</span>
                        <span><strong>Decentralized Verification:</strong> No central authority owns your identity</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-purple-400 font-bold">→</span>
                        <span><strong>Unforgeable:</strong> Impossible to spoof or steal (unlike passwords)</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-purple-400 font-bold">→</span>
                        <span><strong>Multi-Chain:</strong> Works across all major blockchains</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-purple-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-purple-200">Use Cases</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>✓ Autonomous AI trading agents</li>
                      <li>✓ Proof-of-humanity without KYC</li>
                      <li>✓ Sybil-resistant governance voting</li>
                      <li>✓ Personal data sovereignty</li>
                      <li>✓ Cross-chain identity verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6 animate-in fade-in">
                {!quizComplete ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-purple-200">Test Your Knowledge</h2>
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg border border-purple-300/20 bg-slate-950/50 p-4 space-y-3">
                        <p className="font-semibold text-purple-100 text-sm">
                          Q{qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswer(qIdx, oIdx)}
                              className={`w-full px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm font-semibold transition border ${
                                quizAnswers[qIdx] === oIdx
                                  ? 'bg-purple-500/20 border-purple-300/60 text-purple-100'
                                  : 'bg-slate-900/50 border-purple-300/20 text-slate-300 hover:border-purple-300/40'
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
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/30 to-purple-400/20 border border-purple-300/60 text-purple-100 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500/40 hover:to-purple-400/30 transition"
                    >
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 rounded-lg border border-purple-300/30 bg-purple-500/15 p-6">
                      {passed ? (
                        <>
                          <CheckCircle2 size={48} className="mx-auto text-purple-300" />
                          <p className="text-2xl font-bold text-purple-200">🎉 Mastery Unlocked!</p>
                          <p className="text-sm text-purple-300/90">
                            Score: {finalScore}/{questions.length} - You've earned 450 Airdrop Points!
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={48} className="mx-auto text-purple-400" />
                          <p className="text-xl font-bold text-purple-200">Try Again</p>
                          <p className="text-sm text-purple-300/90">
                            Score: {finalScore}/{questions.length} - Need 2/3 to pass
                          </p>
                        </>
                      )}
                    </div>

                    {passed && (
                      <button
                        onClick={() => onComplete(450)}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/40 to-purple-400/30 border border-purple-300/60 text-purple-100 font-bold uppercase tracking-wider hover:from-purple-500/50 hover:to-purple-400/40 transition flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Claim 450 Points & Continue
                        <ArrowRight size={16} />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => {
                          setQuizAnswers([]);
                          setQuizComplete(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/30 to-purple-400/20 border border-purple-300/40 text-purple-100 font-bold uppercase tracking-wider transition"
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
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/30 to-purple-400/25 text-purple-200 font-bold uppercase tracking-wider hover:shadow-lg transition"
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
