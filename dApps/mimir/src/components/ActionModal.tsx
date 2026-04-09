import { useState } from 'react'

interface ActionModalProps {
  isOpen: boolean
  actionType: 'BUY' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW' | null
  onClose: () => void
}

export default function ActionModal({ isOpen, actionType, onClose }: ActionModalProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')

  if (!isOpen || !actionType) return null

  const actionConfig = {
    BUY: {
      title: 'BUY $ABRA',
      steps: ['Select Amount', 'Review', 'Confirm'],
      description: 'Purchase Abraxas tokens directly',
      placeHolder: 'Enter amount...',
      icon: '💎',
    },
    SWAP: {
      title: 'SWAP ASSETS',
      steps: ['Select Pair', 'Set Amount', 'Review', 'Confirm'],
      description: 'Exchange one asset for another',
      placeHolder: 'Enter swap amount...',
      icon: '🔄',
    },
    DEPOSIT: {
      title: 'DEPOSIT',
      steps: ['Select Asset', 'Enter Amount', 'Confirm'],
      description: 'Add funds to your oracle account',
      placeHolder: 'Enter deposit amount...',
      icon: '📥',
    },
    WITHDRAW: {
      title: 'WITHDRAW',
      steps: ['Select Asset', 'Enter Amount', 'Confirm'],
      description: 'Withdraw funds from your account',
      placeHolder: 'Enter withdrawal amount...',
      icon: '📤',
    },
  }

  const config = actionConfig[actionType]
  const maxSteps = config.steps.length

  const handleNext = () => {
    if (step < maxSteps) {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    setAmount('')
    setStep(1)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4 rounded-lg border p-8"
        style={{
          borderColor: 'rgba(0, 245, 255, 0.4)',
          background: 'linear-gradient(135deg, rgba(5,5,8,0.95) 0%, rgba(10,10,20,0.9) 100%)',
          boxShadow: '0 0 32px rgba(0, 245, 255, 0.3), 0 0 64px rgba(153, 69, 255, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-cyan-300"
          style={{ color: '#00f5ff' }}
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <span className="text-5xl">{config.icon}</span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-bold text-center mb-2 tracking-widest"
          style={{
            fontFamily: "'Space Mono', monospace",
            background: 'linear-gradient(135deg, #00f5ff, #9945ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {config.title}
        </h2>

        {/* Description */}
        <p
          className="text-center text-sm mb-6"
          style={{ color: '#8080a0', fontFamily: "'Space Mono', monospace" }}
        >
          {config.description}
        </p>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8 justify-center">
          {config.steps.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 rounded-full duration-300"
              style={{
                background: idx + 1 <= step ? '#00f5ff' : 'rgba(0, 245, 255, 0.2)',
                boxShadow:
                  idx + 1 <= step ? '0 0 8px #00f5ff' : 'none',
              }}
            />
          ))}
        </div>

        {/* Step Label */}
        <p
          className="text-center text-xs mb-6 tracking-widest"
          style={{
            fontFamily: "'Space Mono', monospace",
            color: '#00f5ff',
          }}
        >
          STEP {step} OF {maxSteps}: {config.steps[step - 1]}
        </p>

        {/* Step Content */}
        <div className="mb-8">
          {step === 1 && (
            <div>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={config.placeHolder}
                className="w-full px-4 py-3 rounded-lg border mb-3 bg-black/50 text-white placeholder-gray-600 transition-all"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  fontFamily: "'Space Mono', monospace",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 245, 255, 0.6)'
                  e.target.style.boxShadow = '0 0 12px rgba(0, 245, 255, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 245, 255, 0.3)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <p
                className="text-xs"
                style={{ color: '#8080a0', fontFamily: "'Space Mono', monospace" }}
              >
                Available: 50,000 USDC
              </p>
            </div>
          )}

          {step === 2 && (
            <div
              className="p-4 rounded-lg border space-y-3"
              style={{
                borderColor: 'rgba(0, 245, 255, 0.25)',
                background: 'rgba(0, 245, 255, 0.05)',
              }}
            >
              <div className="flex justify-between">
                <span style={{ color: '#8080a0' }}>Amount</span>
                <span style={{ color: '#ffffff', fontFamily: "'Space Mono', monospace" }}>
                  {amount || '0'} {actionType === 'SWAP' ? 'SOL' : 'USDC'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#8080a0' }}>Fee</span>
                <span style={{ color: '#00ff88' }}>0.5%</span>
              </div>
              <div
                className="border-t pt-3 flex justify-between"
                style={{ borderColor: 'rgba(0, 245, 255, 0.2)' }}
              >
                <span style={{ color: '#ffffff' }}>Total</span>
                <span
                  style={{
                    color: '#00f5ff',
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 'bold',
                  }}
                >
                  ${(parseFloat(amount || '0') * 1.005).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {step === maxSteps && (
            <div
              className="p-4 rounded-lg border text-center"
              style={{
                borderColor: 'rgba(0, 255, 136, 0.3)',
                background: 'rgba(0, 255, 136, 0.1)',
              }}
            >
              <p
                className="text-lg font-bold"
                style={{ color: '#00ff88', fontFamily: "'Space Mono', monospace" }}
              >
                ✓ READY TO CONFIRM
              </p>
              <p className="text-xs mt-2" style={{ color: '#8080a0' }}>
                Review all details above before confirming
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="flex-1 px-4 py-2 rounded-lg border font-bold tracking-widest disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{
              fontFamily: "'Space Mono', monospace",
              borderColor: 'rgba(0, 245, 255, 0.3)',
              color: '#00f5ff',
              background: 'transparent',
            }}
          >
            BACK
          </button>

          <button
            onClick={step === maxSteps ? handleComplete : handleNext}
            className="flex-1 px-4 py-2 rounded-lg border font-bold tracking-widest transition-all hover:scale-105"
            style={{
              fontFamily: "'Space Mono', monospace",
              borderColor: step === maxSteps ? '#00ff88' : '#00f5ff',
              background:
                step === maxSteps
                  ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.3) 0%, rgba(0, 255, 136, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(0, 245, 255, 0.2) 0%, rgba(153, 69, 255, 0.1) 100%)',
              color: step === maxSteps ? '#00ff88' : '#00f5ff',
              boxShadow:
                step === maxSteps
                  ? '0 0 12px rgba(0, 255, 136, 0.3)'
                  : '0 0 12px rgba(0, 245, 255, 0.2)',
            }}
          >
            {step === maxSteps ? 'CONFIRM' : 'NEXT'}
          </button>
        </div>
      </div>
    </div>
  )
}
