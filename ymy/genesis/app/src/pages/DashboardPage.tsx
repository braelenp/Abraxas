import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Shield } from 'lucide-react'
import StatCard from '../components/StatCard'
import { formatBalance, shortenAddress } from '../lib/solana'
import { useApp } from '../providers/AppProvider'
import type { Transaction } from '../lib/types'

const MOCK_TOKENS = [
  { symbol: 'SOL', price: 142.50, change: 3.2, balance: 4.5 },
  { symbol: 'USDC', price: 1.00, change: 0.01, balance: 250.0 },
  { symbol: 'RAY', price: 2.80, change: -1.5, balance: 120.0 },
]

export default function DashboardPage() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const { state, transactions } = useApp()
  const [solBalance, setSolBalance] = useState<number>(0)

  useEffect(() => {
    if (!publicKey) return
    connection.getBalance(publicKey).then(setSolBalance)
  }, [publicKey, connection])

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Shield size={48} className="text-gold/40 mx-auto mb-4" />
        <h2 className="text-2xl font-black uppercase tracking-widest text-offwhite/60 mb-4">
          CONNECT WALLET
        </h2>
        <p className="text-offwhite/40 text-sm">Connect your wallet to access the command center.</p>
      </div>
    )
  }

  const portfolioValue = MOCK_TOKENS.reduce((sum, t) => sum + t.price * t.balance, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-title">COMMAND CENTER</p>
          <h1 className="text-3xl font-black uppercase tracking-widest text-offwhite">
            DASHBOARD
          </h1>
        </div>
        {publicKey && (
          <div className="card text-right">
            <p className="label">OPERATOR</p>
            <p className="font-mono text-sm text-offwhite">{shortenAddress(publicKey.toBase58())}</p>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="SOL BALANCE"
          value={`${formatBalance(solBalance)} SOL`}
          sub="on-chain balance"
        />
        <StatCard
          label="PORTFOLIO VALUE"
          value={`$${portfolioValue.toFixed(2)}`}
          sub="estimated total"
          change={2.4}
        />
        <StatCard
          label="TRADE COUNT"
          value={state.userAccount?.tradeCount.toString() ?? '0'}
          sub="lifetime trades"
        />
        <StatCard
          label="STATUS"
          value={state.isInitialized ? 'ACTIVE' : 'PENDING'}
          sub={state.isInitialized ? 'account initialized' : 'needs onboarding'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <p className="section-title mb-0">HOLDINGS</p>
            <Link to="/trade" className="text-xs font-bold uppercase tracking-widest text-gold hover:text-gold/70">
              TRADE →
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-steel/30">
                <th className="label text-left pb-2">ASSET</th>
                <th className="label text-right pb-2">PRICE</th>
                <th className="label text-right pb-2">BALANCE</th>
                <th className="label text-right pb-2">VALUE</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TOKENS.map(token => (
                <tr key={token.symbol} className="border-b border-steel/10 hover:bg-steel/10 transition-colors">
                  <td className="py-3 font-mono font-bold text-offwhite">{token.symbol}</td>
                  <td className="py-3 text-right font-mono text-sm text-offwhite/80">
                    ${token.price.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-mono text-sm text-offwhite/80">
                    {token.balance.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-mono text-sm text-gold">
                    ${(token.price * token.balance).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-gold" />
            <p className="section-title mb-0">RECENT ACTIVITY</p>
          </div>
          {transactions.length === 0 ? (
            <p className="text-xs text-offwhite/30 text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 8).map((tx: Transaction) => (
                <div key={tx.signature} className="flex justify-between items-center py-2 border-b border-steel/10">
                  <div>
                    <p className="text-xs font-bold uppercase text-offwhite">{tx.type}</p>
                    <p className="text-xs font-mono text-offwhite/40">{shortenAddress(tx.signature)}</p>
                  </div>
                  <span className={`text-xs font-bold ${
                    tx.status === 'confirmed' ? 'text-green-400' :
                    tx.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {tx.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
