import React, { useState, useEffect } from 'react'
import AbraxasCallout from '../AbraxasCallout'
import { Activity, RefreshCw, ExternalLink } from 'lucide-react'

interface MockTx {
  sig: string
  type: string
  amount: string
  age: string
  status: 'Confirmed' | 'Finalized'
}

interface MockBlock {
  slot: number
  time: string
  txCount: number
  leader: string
}

function randSig(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const INITIAL_TXS: MockTx[] = [
  { sig: randSig(), type: 'MintSPL',      amount: '1 VCC-001',    age: '2s',  status: 'Finalized'  },
  { sig: randSig(), type: 'StakeABRA',    amount: '5,000 ABRA',   age: '14s', status: 'Confirmed'  },
  { sig: randSig(), type: 'VaultDeposit', amount: '1 RF-002',     age: '31s', status: 'Finalized'  },
  { sig: randSig(), type: 'YieldClaim',   amount: '142.8 ABRA',   age: '1m',  status: 'Finalized'  },
  { sig: randSig(), type: 'MintSPL',      amount: '1 CE-003',     age: '4m',  status: 'Finalized'  },
]

const INITIAL_BLOCKS: MockBlock[] = [
  { slot: 318_204_711, time: 'just now',  txCount: 3,  leader: 'Verdant Node A' },
  { slot: 318_204_710, time: '0.4s ago',  txCount: 7,  leader: 'Verdant Node B' },
  { slot: 318_204_709, time: '0.8s ago',  txCount: 5,  leader: 'Verdant Node C' },
  { slot: 318_204_708, time: '1.2s ago',  txCount: 2,  leader: 'Verdant Node A' },
]

const TYPE_COLORS: Record<string, string> = {
  MintSPL:      '#6ee7b7',
  StakeABRA:    '#c084fc',
  VaultDeposit: '#bef264',
  YieldClaim:   '#34d399',
}

const DevnetTab: React.FC = () => {
  const [txs, setTxs]       = useState<MockTx[]>(INITIAL_TXS)
  const [blocks, setBlocks] = useState<MockBlock[]>(INITIAL_BLOCKS)
  const [slot, setSlot]     = useState(318_204_711)
  const [tps, setTps]       = useState(3_241)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlot((s) => s + 1)
      setTps(Math.floor(2800 + Math.random() * 800))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const refresh = () => {
    setSpinning(true)
    setTimeout(() => {
      setTxs((prev) => [
        { sig: randSig(), type: 'YieldClaim', amount: `${(Math.random() * 200 + 50).toFixed(1)} ABRA`, age: 'just now', status: 'Confirmed' },
        ...prev.slice(0, 4),
      ])
      setBlocks((prev) => [
        { slot: slot + 1, time: 'just now', txCount: Math.floor(Math.random() * 8 + 1), leader: 'Verdant Node A' },
        ...prev.slice(0, 3),
      ])
      setSpinning(false)
    }, 600)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="rounded-xl p-5"
        style={{
          background: 'rgba(13,32,24,0.7)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-500" />
            <span className="font-mono text-[10px] tracking-[0.22em] text-emerald-600/70 uppercase">
              Verdant · Solana Devnet
            </span>
          </div>
          <button
            onClick={refresh}
            className="p-1.5 rounded hover:bg-emerald-900/30"
            title="Refresh"
          >
            <RefreshCw size={13} className={`text-emerald-600/70`} />
          </button>
        </div>
        <h2 className="font-cinzel text-base font-semibold text-emerald-200/90">
          Block Explorer
        </h2>
      </div>

      {/* Network stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Current Slot',  value: slot.toLocaleString() },
          { label: 'TPS',           value: tps.toLocaleString() },
          { label: 'Network',       value: 'Devnet' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg p-3 text-center"
            style={{
              background: 'rgba(13,32,24,0.5)',
              border: '1px solid rgba(16,185,129,0.12)',
            }}
          >
            <div className="font-cinzel text-xs font-semibold text-emerald-300/90">{value}</div>
            <div className="font-mono text-[9px] text-emerald-700/60 mt-0.5 uppercase tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent blocks */}
      <div>
        <div className="font-mono text-[10px] text-emerald-700/60 tracking-widest uppercase mb-2">
          Recent Blocks
        </div>
        <div className="space-y-1.5">
          {blocks.map((b) => (
            <div
              key={b.slot}
              className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{
                background: 'rgba(13,32,24,0.5)',
                border: '1px solid rgba(16,185,129,0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#10b981', boxShadow: '0 0 5px #10b981' }}
                />
                <span className="font-mono text-[11px] text-emerald-400/80">
                  {b.slot.toLocaleString()}
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-700/60">{b.txCount} txs</span>
              <span className="font-mono text-[10px] text-emerald-700/50 hidden sm:block">{b.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="font-mono text-[10px] text-emerald-700/60 tracking-widest uppercase mb-2">
          Recent Transactions
        </div>
        <div className="space-y-1.5 overflow-hidden">
          {txs.map((tx) => (
            <div
              key={tx.sig}
              className="rounded-lg px-3 py-2.5"
              style={{
                background: 'rgba(13,32,24,0.5)',
                border: '1px solid rgba(16,185,129,0.1)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: `${TYPE_COLORS[tx.type] || '#6ee7b7'}18`,
                    border: `1px solid ${TYPE_COLORS[tx.type] || '#6ee7b7'}30`,
                    color: TYPE_COLORS[tx.type] || '#6ee7b7',
                  }}
                >
                  {tx.type}
                </span>
                <span className="font-mono text-[10px] text-emerald-700/50">{tx.age}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500/70 truncate max-w-[140px] sm:max-w-[220px]">
                  {tx.sig.slice(0, 14)}…{tx.sig.slice(-8)}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[9px]"
                    style={{ color: tx.status === 'Finalized' ? '#10b981' : '#34d399' }}
                  >
                    {tx.status}
                  </span>
                  <a
                    href={`https://explorer.solana.com/tx/${tx.sig}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700/50 hover:text-emerald-500/80"
                  >
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
              <div className="font-mono text-[10px] text-emerald-600/60 mt-1">{tx.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Solana Explorer link */}
      <a
        href="https://explorer.solana.com/?cluster=devnet"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md font-grotesk text-xs font-medium tracking-wider text-emerald-600/80 hover:text-emerald-400/90"
        style={{ border: '1px solid rgba(16,185,129,0.16)' }}
      >
        Open Solana Explorer
        <ExternalLink size={11} />
      </a>

      <AbraxasCallout />
    </div>
  )
}

export default DevnetTab
