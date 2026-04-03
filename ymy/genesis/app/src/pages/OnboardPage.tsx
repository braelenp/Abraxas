import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { CheckCircle, Circle, Shield, Loader } from 'lucide-react'
import { useApp } from '../providers/AppProvider'

type StepStatus = 'pending' | 'active' | 'complete' | 'error'

interface Step {
  id: string
  title: string
  desc: string
  status: StepStatus
}

export default function OnboardPage() {
  const { connected, publicKey } = useWallet()
  const { state, setInitialized } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [steps, setSteps] = useState<Step[]>([
    { id: 'connect', title: 'CONNECT WALLET', desc: 'Connect your Solana wallet to begin.', status: 'pending' },
    { id: 'initialize', title: 'INITIALIZE ACCOUNT', desc: 'Create your on-chain user account via the First Son program.', status: 'pending' },
    { id: 'approve', title: 'APPROVE TOKEN', desc: 'Grant token delegation to the program vault.', status: 'pending' },
    { id: 'complete', title: 'DEPLOY', desc: 'Your command center is ready.', status: 'pending' },
  ])

  const updateStep = (id: string, status: StepStatus) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  const handleInitialize = async () => {
    if (!connected || !publicKey) return
    setIsLoading(true)
    try {
      updateStep('connect', 'complete')
      await new Promise(r => setTimeout(r, 800))
      updateStep('initialize', 'active')
      await new Promise(r => setTimeout(r, 1200))
      updateStep('initialize', 'complete')
      updateStep('approve', 'active')
      await new Promise(r => setTimeout(r, 1000))
      updateStep('approve', 'complete')
      updateStep('complete', 'active')
      await new Promise(r => setTimeout(r, 600))
      updateStep('complete', 'complete')
      setInitialized(true)
    } catch {
      updateStep('initialize', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="section-title">FIRST DEPLOYMENT</p>
        <h1 className="text-3xl font-black uppercase tracking-widest text-offwhite">ONBOARD</h1>
        <p className="text-offwhite/50 text-sm mt-2">
          Initialize your on-chain presence. This only needs to be done once.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`card flex items-start gap-4 transition-all ${
              step.status === 'active' ? 'border-gold/60 bg-gold/5' :
              step.status === 'complete' ? 'border-green-500/40 bg-green-500/5' :
              step.status === 'error' ? 'border-red-500/40 bg-red-500/5' :
              'opacity-60'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {step.status === 'complete' ? (
                <CheckCircle size={20} className="text-green-400" />
              ) : step.status === 'active' ? (
                <Loader size={20} className="text-gold animate-spin" />
              ) : step.status === 'error' ? (
                <Circle size={20} className="text-red-400" />
              ) : (
                <Circle size={20} className="text-steel/40" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-offwhite/30">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-black uppercase tracking-wider text-sm text-offwhite">{step.title}</h3>
              </div>
              <p className="text-xs text-offwhite/50 mt-1">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action */}
      {!connected ? (
        <div className="text-center">
          <p className="text-xs text-offwhite/40 mb-4">CONNECT WALLET TO BEGIN INITIALIZATION</p>
          <WalletMultiButton
            style={{
              backgroundColor: '#364537',
              border: '2px solid #d4a574',
              color: '#d4a574',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              borderRadius: '0',
              height: '48px',
              padding: '0 32px',
            }}
          />
        </div>
      ) : state.isInitialized ? (
        <div className="card border-green-500/40 bg-green-500/5 text-center">
          <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
          <p className="font-black uppercase tracking-widest text-offwhite mb-1">ACCOUNT ACTIVE</p>
          <p className="text-xs text-offwhite/40">Your on-chain account is initialized and ready.</p>
        </div>
      ) : (
        <button
          onClick={handleInitialize}
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40"
        >
          {isLoading ? <Loader size={16} className="animate-spin" /> : <Shield size={16} />}
          {isLoading ? 'INITIALIZING...' : 'INITIALIZE ACCOUNT'}
        </button>
      )}
    </div>
  )
}
