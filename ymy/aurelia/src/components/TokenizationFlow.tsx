import React, { useState } from 'react'

type Step = 'upload' | 'mint' | 'vault' | 'done'

const steps: { id: Step; label: string; icon: string; desc: string }[] = [
  {
    id: 'upload',
    label: 'Upload Deed',
    icon: '📜',
    desc: 'Submit your property deed or title document. Aurelia parses address, parcel ID, and valuation metadata.',
  },
  {
    id: 'mint',
    label: 'Mint Token',
    icon: '🔶',
    desc: 'Preview your SPL token: symbol, supply, fractional units. Sign the devnet mint transaction.',
  },
  {
    id: 'vault',
    label: 'Vault Deposit',
    icon: '🏛',
    desc: 'Your tokenized property enters the Aurelia Vault. Capital raises, yield distribution, and HOA logic activate.',
  },
]

export default function TokenizationFlow() {
  const [active, setActive] = useState<Step>('upload')
  const [uploadDone, setUploadDone] = useState(false)
  const [mintDone, setMintDone] = useState(false)
  const [vaultDone, setVaultDone] = useState(false)
  const [txHash, setTxHash] = useState('')

  const mockMint = () => {
    const hash = Array.from({ length: 44 }, () =>
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[
        Math.floor(Math.random() * 58)
      ]
    ).join('')
    setTxHash(hash)
    setMintDone(true)
    setActive('vault')
  }

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono tracking-[0.3em] text-gold-500 mb-3 uppercase">
            Tokenization Protocol
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gold-400 glow-gold mb-4">
            Illuminating Real Property
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            From paper deed to on-chain liquidity in three sovereign steps. Running on Solana devnet.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setActive(s.id)}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg transition-all duration-300 ${
                  active === s.id
                    ? 'bg-gold-500/10 border border-gold-500/40 text-gold-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-mono tracking-wider">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-16 h-px bg-gradient-to-r from-gold-500/30 to-purple-500/30 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step panels */}
        <div className="glass rounded-2xl p-6 md:p-10">
          {active === 'upload' && (
            <div className="animate-fade-up">
              <h3 className="font-serif text-xl text-gold-300 mb-2">
                {steps[0].icon} {steps[0].label}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{steps[0].desc}</p>

              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                  uploadDone
                    ? 'border-green-500/60 bg-green-500/5'
                    : 'border-gold-500/30 hover:border-gold-500/60 hover:bg-gold-500/5'
                }`}
                onClick={() => { setUploadDone(true); setActive('mint') }}
              >
                {uploadDone ? (
                  <div>
                    <p className="text-green-400 font-mono text-sm mb-1">✓ deed_123_main_st.pdf</p>
                    <p className="text-gray-500 text-xs">Parcel: 0412-038-017 · APN verified</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl mb-3">📂</p>
                    <p className="text-gray-400 text-sm">Drop deed PDF or click to simulate upload</p>
                    <p className="text-gray-600 text-xs mt-1">Devnet mock. No real file transmitted.</p>
                  </div>
                )}
              </div>

              {uploadDone && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Address', value: '123 Main St, Austin TX' },
                    { label: 'Parcel ID', value: '0412-038-017' },
                    { label: 'Est. Value', value: '$420,000' },
                    { label: 'Type', value: 'Single Family' },
                  ].map((d) => (
                    <div key={d.label} className="glass-purple rounded-lg p-3">
                      <p className="text-gray-500 text-xs mb-1">{d.label}</p>
                      <p className="text-gold-400 text-sm font-mono">{d.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {active === 'mint' && (
            <div className="animate-fade-up">
              <h3 className="font-serif text-xl text-gold-300 mb-2">
                {steps[1].icon} {steps[1].label}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{steps[1].desc}</p>

              {/* Token preview card */}
              <div className="glass-purple rounded-xl p-6 mb-6 max-w-sm mx-auto text-center">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-serif font-bold text-dark-900"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #fde68a)' }}
                >
                  ARL
                </div>
                <p className="font-serif text-gold-400 text-lg mb-1">AURELIA-123MAIN</p>
                <p className="font-mono text-gray-400 text-xs mb-4">SPL Token · Devnet</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Supply</p>
                    <p className="text-gold-400 font-mono">420,000</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Decimals</p>
                    <p className="text-gold-400 font-mono">6</p>
                  </div>
                  <div>
                    <p className="text-gray-500">$/Token</p>
                    <p className="text-gold-400 font-mono">$1.00</p>
                  </div>
                </div>
              </div>

              {mintDone ? (
                <div className="text-center">
                  <p className="text-green-400 text-sm mb-1">✓ Minted on devnet</p>
                  <p className="font-mono text-gray-500 text-xs break-all">{txHash}</p>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={mockMint}
                    className="px-8 py-3 rounded-lg font-serif text-sm tracking-wider text-dark-900 font-bold transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
                  >
                    Sign &amp; Mint on Devnet
                  </button>
                </div>
              )}
            </div>
          )}

          {active === 'vault' && (
            <div className="animate-fade-up">
              <h3 className="font-serif text-xl text-gold-300 mb-2">
                {steps[2].icon} {steps[2].label}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{steps[2].desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Vault Status', value: 'Active', color: 'text-green-400' },
                  { label: 'Capital Target', value: '$840,000', color: 'text-gold-400' },
                  { label: 'Yield APY', value: '7.4%', color: 'text-cyan-400' },
                  { label: 'Investors', value: '0', color: 'text-purple-400' },
                  { label: 'HOA Logic', value: 'Enabled', color: 'text-gold-300' },
                  { label: 'Network', value: 'Devnet', color: 'text-gray-400' },
                ].map((d) => (
                  <div key={d.label} className="glass-purple rounded-xl p-4">
                    <p className="text-gray-500 text-xs mb-2">{d.label}</p>
                    <p className={`font-mono font-semibold ${d.color}`}>{d.value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setVaultDone(true)}
                className={`w-full py-3 rounded-lg font-serif tracking-wider text-sm transition-all ${
                  vaultDone
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400 cursor-default'
                    : 'bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 hover:scale-[1.01]'
                }`}
              >
                {vaultDone ? '✓ Property Deposited into Aurelia Vault' : 'Deposit into Vault'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
