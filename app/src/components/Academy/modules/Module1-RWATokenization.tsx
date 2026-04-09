import { useState, useEffect } from 'react';
import { ArrowLeft, Zap, ArrowRight, CheckCircle2, AlertCircle, Video, ChevronDown } from 'lucide-react';

interface Module1Props {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function AcademyModule1({ onBack, onComplete }: Module1Props) {
  const [activeTab, setActiveTab] = useState<'intro' | 'content' | 'quiz'>('intro');
  const [showVideo, setShowVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      q: 'What is tokenization in the context of RWAs?',
      opts: [
        'Converting physical assets into digital representations on blockchain',
        'Creating a token for marketing purposes',
        'Transferring assets to a bank',
        'Printing physical certificates'
      ],
      correct: 0
    },
    {
      q: 'Which of these is NOT typically tokenized as an RWA?',
      opts: [
        'Real estate property',
        'Art and collectibles',
        'Cryptocurrency (already digital)',
        'Commodities like gold'
      ],
      correct: 2
    },
    {
      q: 'What blockchain does Abraxas use for RWA tokenization?',
      opts: [
        'Ethereum',
        'Bitcoin',
        'Solana',
        'Polkadot'
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
          {/* Header */}
          <div className="space-y-4 mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-300/30 bg-slate-900/50 hover:bg-slate-900/70 text-purple-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Academy
            </button>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-300/60">&gt; [MODULE_1] FOUNDATIONS</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-200">Foundations of Tokenization of RWAs</h1>
              <p className="text-sm leading-relaxed text-slate-300/90 max-w-2xl">
                Understand how real-world assets are identified, valued, and converted into digital tokens on the Solana blockchain. The foundation of Abraxas ecosystem.
              </p>
            </div>
          </div>

          {/* Module Selector */}
          <div className="flex gap-2 mb-6 border-b border-amber-300/20 pb-4 overflow-x-auto">
            {(['intro', 'content', 'quiz'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-amber-500/30 to-amber-400/20 border border-amber-300/40 text-amber-100 shadow-lg'
                    : 'text-amber-300/60 hover:text-amber-300/80 border border-amber-300/10'
                }`}
              >
                {tab === 'intro' && '🎬 Intro'}
                {tab === 'content' && '📚 Content'}
                {tab === 'quiz' && '✓ Quiz'}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="rounded-lg sm:rounded-xl border border-amber-300/30 bg-gradient-to-br from-amber-500/8 to-slate-900/60 p-6 space-y-6 mb-6">
            {/* Intro Tab */}
            {activeTab === 'intro' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-300/20 bg-amber-500/10 p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-amber-200">The Tokenization Revolution</h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    For centuries, real-world assets have been trapped in inefficient markets. Land sits idle. Art gathers dust. Commodities lack liquidity. 
                    Tokenization breaks these barriers, converting any asset into a digital token that can be instantly transferred, fractionally owned, and globally traded.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Abraxas harnesses this power through Solana's speed and efficiency, creating a seamless bridge between the physical world and decentralized finance.
                  </p>
                </div>

                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-amber-300/40 bg-amber-500/15 hover:bg-amber-500/25 text-amber-100 font-semibold transition"
                >
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    Watch Cinematic Introduction
                  </div>
                  <ChevronDown size={16} className={`transition ${showVideo ? 'rotate-180' : ''}`} />
                </button>

                {showVideo && (
                  <div className="rounded-lg border border-amber-300/20 overflow-hidden bg-black" style={{ height: '300px' }}>
                    <video
                      src="/assets/module1-intro-rwa.mp4"
                      title="RWA Tokenization"
                      className="w-full h-full object-contain"
                      controls
                      controlsList="nodownload"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-amber-200">Core Concepts</h2>

                  <div className="rounded-lg border border-amber-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-amber-200">What is Tokenization?</h3>
                    <p className="text-sm text-slate-300">
                      Tokenization is the process of converting ownership rights or claims to an asset into a digital token on a blockchain. 
                      A token represents a fractional or full ownership stake that can be traded, held, or transferred instantly.
                    </p>
                  </div>

                  <div className="rounded-lg border border-amber-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-amber-200">Why Tokenize RWAs?</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-amber-400 font-bold">→</span>
                        <span><strong>Liquidity:</strong> Convert illiquid assets into tradable tokens</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-amber-400 font-bold">→</span>
                        <span><strong>Accessibility:</strong> Fractional ownership lowers entry barriers</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-amber-400 font-bold">→</span>
                        <span><strong>Efficiency:</strong> Smart contracts automate settlements and dividends</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-amber-400 font-bold">→</span>
                        <span><strong>Transparency:</strong> Immutable records on blockchain</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-amber-300/20 bg-slate-950/50 p-4 space-y-3">
                    <h3 className="font-semibold text-amber-200">RWA Classes Abraxas Tokenizes</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div className="rounded border border-amber-300/15 bg-slate-900/50 p-2 text-center font-mono">Real Estate</div>
                      <div className="rounded border border-amber-300/15 bg-slate-900/50 p-2 text-center font-mono">Art & Collectibles</div>
                      <div className="rounded border border-amber-300/15 bg-slate-900/50 p-2 text-center font-mono">Commodities</div>
                      <div className="rounded border border-amber-300/15 bg-slate-900/50 p-2 text-center font-mono">Equity Stakes</div>
                      <div className="rounded border border-amber-300/15 bg-slate-900/50 p-2 text-center font-mono">IP Rights</div>
                      <div className="rounded border border-amber-300/15 bg-slate-900/50 p-2 text-center font-mono">Athletes</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {!quizComplete ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-amber-200">Test Your Knowledge</h2>
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg border border-amber-300/20 bg-slate-950/50 p-4 space-y-3">
                        <p className="font-semibold text-amber-100 text-sm">
                          Q{qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.opts.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswer(qIdx, oIdx)}
                              className={`w-full px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm font-semibold transition border ${
                                quizAnswers[qIdx] === oIdx
                                  ? 'bg-amber-500/20 border-amber-300/60 text-amber-100'
                                  : 'bg-slate-900/50 border-amber-300/20 text-slate-300 hover:border-amber-300/40'
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
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500/30 to-amber-400/20 border border-amber-300/60 text-amber-100 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500/40 hover:to-amber-400/30 transition"
                    >
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 rounded-lg border border-amber-300/30 bg-amber-500/15 p-6">
                      {passed ? (
                        <>
                          <CheckCircle2 size={48} className="mx-auto text-amber-300" />
                          <p className="text-2xl font-bold text-amber-200">🎉 Mastery Unlocked!</p>
                          <p className="text-sm text-amber-300/90">
                            Score: {finalScore}/{questions.length} - You've earned 250 Airdrop Points!
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={48} className="mx-auto text-amber-400" />
                          <p className="text-xl font-bold text-amber-200">Try Again</p>
                          <p className="text-sm text-amber-300/90">
                            Score: {finalScore}/{questions.length} - Need 2/3 to pass
                          </p>
                        </>
                      )}
                    </div>

                    {passed && (
                      <button
                        onClick={() => onComplete(250)}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500/40 to-amber-400/30 border border-amber-300/60 text-amber-100 font-bold uppercase tracking-wider hover:from-amber-500/50 hover:to-amber-400/40 transition flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Claim 250 Points & Continue
                        <ArrowRight size={16} />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => {
                          setQuizAnswers([]);
                          setQuizComplete(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500/30 to-amber-400/20 border border-amber-300/40 text-amber-100 font-bold uppercase tracking-wider transition"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="flex gap-3">
            <a
              href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 text-amber-200 font-bold uppercase tracking-wider hover:shadow-lg transition"
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
