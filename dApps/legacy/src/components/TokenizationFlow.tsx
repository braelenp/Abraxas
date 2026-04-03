import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface Step {
  id: string
  label: string
  icon: string
  desc: string
}

const STEPS: Step[] = [
  {
    id: 'upload',
    label: 'Upload Contract',
    icon: '📜',
    desc: 'Submit your NIL contract, endorsement agreement, or performance proof. Legacy parses athlete name, deal value, duration, and royalty metadata.',
  },
  {
    id: 'mint',
    label: 'Mint Token',
    icon: '🏅',
    desc: 'Preview your SPL equity token: symbol, supply, fractional units. Sign the devnet mint transaction to immortalize the deal on-chain.',
  },
  {
    id: 'vault',
    label: 'Vault Deposit',
    icon: '🏛',
    desc: 'Your tokenized NIL deal enters the Legacy Vault. Capital raises, performance yield distribution, and brand governance logic activate automatically.',
  },
]

export function TokenizationFlow({ onStepClick }: { onStepClick?: (stepId: string) => void }) {
  const [activeStep, setActiveStep] = useState<string>('upload')

  const handleStepClick = (stepId: string) => {
    setActiveStep(stepId)
    onStepClick?.(stepId)
  }

  return (
    <div className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-subtitle tracking-wider text-red-300 mb-3">TOKENIZATION PROTOCOL</h2>
          <h3 className="text-title text-red-200 mb-4">Preserving Human Achievement</h3>
          <p className="text-body text-slate-400 max-w-2xl mx-auto">
            From paper NIL contract to on-chain equity in three sovereign steps. Running on Solana devnet.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Connecting line with gradient */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/30 to-purple-500/30 pointer-events-none" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step circle */}
                <div
                  onClick={() => handleStepClick(step.id)}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-6 cursor-pointer transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-red-500/20 border-red-500/40 shadow-lg shadow-red-500/20'
                      : 'bg-slate-900/50 border-slate-700/50 hover:border-red-400/30'
                  } border-2 glow-panel`}
                >
                  <span className="text-4xl">{step.icon}</span>

                  {/* Step number indicator */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-950 border border-red-400/40 flex items-center justify-center text-xs font-mono text-red-400">
                    {idx + 1}
                  </div>
                </div>

                {/* Step label and description */}
                <h4
                  className={`text-center font-semibold mb-2 transition-colors ${
                    activeStep === step.id ? 'text-red-400' : 'text-slate-300'
                  }`}
                >
                  {step.label}
                </h4>
                <p className="text-xs text-slate-500 text-center max-w-xs">{step.desc}</p>

                {/* Arrow connector for desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-8 text-red-400/40 z-20">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active step detail card */}
        <div className="mt-16 p-8 glow-panel rounded-lg border border-red-400/40 bg-gradient-to-br from-red-950/10 to-purple-950/10">
          {/* Find active step */}
          {STEPS.map((step) => 
            activeStep === step.id ? (
              <div key={step.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{step.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-300">{step.label}</h4>
                    <p className="text-xs text-slate-500">Step {STEPS.findIndex((s) => s.id === step.id) + 1} of {STEPS.length}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                <div className="flex gap-2 pt-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30 transition-colors text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Simulated transaction hash display */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          <span>Simulated devnet ready · Hash: {generateMockHash().substring(0, 20)}...</span>
        </div>
      </div>
    </div>
  )
}

function generateMockHash(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
