import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { ArrowDownUp, Zap, Info, Shield } from 'lucide-react'

const TOKENS = ['SOL', 'USDC', 'RAY', 'BONK', 'JTO', 'WIF']

export default function TradePage() {
  const { connected } = useWallet()
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('USDC')
  const [amount, setAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')

  const handleSwapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  const estimatedOutput = amount
    ? (parseFloat(amount) * (fromToken === 'SOL' ? 142.5 : 1 / 142.5)).toFixed(4)
    : '0.0000'

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Shield size={48} className="text-gold/40 mx-auto mb-4" />
        <h2 className="text-2xl font-black uppercase tracking-widest text-offwhite/60 mb-4">
          CONNECT WALLET
        </h2>
        <p className="text-offwhite/40 text-sm">Connect your wallet to access trading.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="section-title">EXECUTION ENGINE</p>
        <h1 className="text-3xl font-black uppercase tracking-widest text-offwhite">TRADE</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Interface */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <p className="section-title mb-0">SWAP</p>
              <span className="text-xs font-mono text-offwhite/40">via Jupiter</span>
            </div>

            {/* From */}
            <div className="mb-2">
              <label className="label block mb-2">FROM</label>
              <div className="flex gap-2">
                <select
                  value={fromToken}
                  onChange={e => setFromToken(e.target.value)}
                  className="input-field w-28 flex-shrink-0"
                >
                  {TOKENS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="input-field flex-1"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center my-4">
              <button
                onClick={handleSwapTokens}
                className="border border-steel/50 p-2 text-steel hover:border-gold hover:text-gold transition-colors"
              >
                <ArrowDownUp size={16} />
              </button>
            </div>

            {/* To */}
            <div className="mb-6">
              <label className="label block mb-2">TO</label>
              <div className="flex gap-2">
                <select
                  value={toToken}
                  onChange={e => setToToken(e.target.value)}
                  className="input-field w-28 flex-shrink-0"
                >
                  {TOKENS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="input-field flex-1 font-mono text-gold">
                  {estimatedOutput}
                </div>
              </div>
            </div>

            {/* Slippage */}
            <div className="mb-6">
              <label className="label block mb-2">SLIPPAGE TOLERANCE</label>
              <div className="flex gap-2">
                {['0.1', '0.5', '1.0'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSlippage(s)}
                    className={`flex-1 py-2 text-xs font-bold uppercase border transition-colors ${
                      slippage === s
                        ? 'border-gold bg-gold/20 text-gold'
                        : 'border-steel/40 text-offwhite/60 hover:border-steel'
                    }`}
                  >
                    {s}%
                  </button>
                ))}
                <input
                  type="number"
                  value={slippage}
                  onChange={e => setSlippage(e.target.value)}
                  className="input-field w-20 text-xs"
                  placeholder="custom"
                />
              </div>
            </div>

            {/* Execute */}
            <button
              disabled={!amount || parseFloat(amount) <= 0}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Zap size={16} />
              EXECUTE TRADE
            </button>

            {/* Info */}
            <div className="mt-4 flex items-start gap-2 text-xs text-offwhite/40">
              <Info size={12} className="flex-shrink-0 mt-0.5" />
              <span>Trades route through Jupiter Aggregator for best execution price.</span>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <p className="section-title mb-0">
              {fromToken}/{toToken} CHART
            </p>
            <div className="flex gap-2">
              {['1H', '4H', '1D', '1W'].map(tf => (
                <button key={tf} className="text-xs font-bold uppercase text-offwhite/40 hover:text-gold transition-colors px-2 py-1">
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center border border-steel/20">
            <div className="text-center">
              <p className="text-2xl font-mono font-black text-offwhite mb-2">
                1 {fromToken} = {fromToken === 'SOL' ? '142.50' : '0.007'} {toToken}
              </p>
              <p className="text-xs text-offwhite/40">Live chart integration available via TradingView</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
