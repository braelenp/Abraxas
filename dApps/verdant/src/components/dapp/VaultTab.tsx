import React, { useState } from 'react'
import AbraxasCallout from '../AbraxasCallout'
import { TrendingUp, Layers, Globe, Lock } from 'lucide-react'

type AssetType = 'carbon_credit' | 'regenerative_farm' | 'conservation_easement'
type YieldAgent = 'Sophia Sentinel' | 'Sophia Yield' | 'Sophia Harvest'

interface VaultAsset {
  id: string
  name: string
  type: AssetType
  value: number
  apy: number
  vintage: string
  agent: YieldAgent
  staked: boolean
}

const MOCK_ASSETS: VaultAsset[] = [
  {
    id: 'vcc-001',
    name: 'Sierra Madre Carbon Block A',
    type: 'carbon_credit',
    value: 12400,
    apy: 8.2,
    vintage: '2024',
    agent: 'Sophia Sentinel',
    staked: true,
  },
  {
    id: 'rf-002',
    name: 'Oaxaca Regenerative Farm Tranche',
    type: 'regenerative_farm',
    value: 38700,
    apy: 11.4,
    vintage: '2023',
    agent: 'Sophia Yield',
    staked: false,
  },
  {
    id: 'ce-003',
    name: 'Pacific Coastal Easement · Series 1',
    type: 'conservation_easement',
    value: 67200,
    apy: 6.8,
    vintage: '2025',
    agent: 'Sophia Harvest',
    staked: true,
  },
]

const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  carbon_credit: 'Carbon Credit',
  regenerative_farm: 'Regenerative Farm',
  conservation_easement: 'Conservation Easement',
}

const AGENT_COLORS: Record<YieldAgent, string> = {
  'Sophia Sentinel': '#6ee7b7',
  'Sophia Yield': '#c084fc',
  'Sophia Harvest': '#bef264',
}

const STAKE_CONFIGS = [
  { duration: '30d',  multiplier: '1.2×',  label: '30 Days',  highlight: false },
  { duration: '90d',  multiplier: '1.8×',  label: '90 Days',  highlight: true  },
  { duration: '180d', multiplier: '2.5×',  label: '180 Days', highlight: false },
]

const VaultTab: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [stakeConfig, setStakeConfig]     = useState<string>('90d')

  const totalValue  = MOCK_ASSETS.reduce((s, a) => s + a.value, 0)
  const stakedAbra  = 14280
  const selected    = MOCK_ASSETS.find((a) => a.id === selectedAsset)

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
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-emerald-500/80 text-sm">ᛃ</span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-emerald-600/70 uppercase">
            Jera · Grove Vault
          </span>
        </div>
        <h2 className="font-cinzel text-base font-semibold text-emerald-200/90 mb-1">
          Grove Vault
        </h2>
        <p className="text-xs text-slate-400/70 leading-relaxed">
          Once a carbon credit or land asset is tokenized through the Grove, it is auto-deposited here.
          Sequestration proceeds, harvest revenues, and ecosystem service distributions flow to token
          holders per epoch.
        </p>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Layers, label: 'Assets', value: MOCK_ASSETS.length.toString(), sub: 'tokenized' },
          { icon: Lock,   label: 'ABRA Staked', value: stakedAbra.toLocaleString(), sub: 'tokens' },
          { icon: Globe,  label: 'Network', value: 'Devnet', sub: 'Solana' },
        ].map(({ icon: Icon, label, value, sub }) => (
          <div
            key={label}
            className="rounded-lg p-3 text-center"
            style={{
              background: 'rgba(13,32,24,0.5)',
              border: '1px solid rgba(16,185,129,0.12)',
            }}
          >
            <Icon size={14} className="mx-auto mb-1.5 text-emerald-500/70" />
            <div className="font-cinzel text-sm font-semibold text-emerald-300/90">{value}</div>
            <div className="font-mono text-[9px] text-emerald-700/60 uppercase tracking-wider">{label}</div>
            <div className="font-mono text-[9px] text-emerald-800/50">{sub}</div>
          </div>
        ))}
      </div>

      {/* Total value */}
      <div
        className="rounded-lg px-4 py-3 flex items-center justify-between"
        style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.18)',
        }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="font-grotesk text-xs text-slate-400/80">Total Vault Value</span>
        </div>
        <span className="font-cinzel text-sm font-semibold text-emerald-300/90">
          ${totalValue.toLocaleString()}
        </span>
      </div>

      {/* Asset list */}
      <div className="space-y-2">
        <div className="font-mono text-[10px] text-emerald-700/60 tracking-widest uppercase mb-2">
          Vault Holdings
        </div>
        {MOCK_ASSETS.map((asset) => {
          const isSelected = selectedAsset === asset.id
          return (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(isSelected ? null : asset.id)}
              className="w-full text-left rounded-xl p-4 transition-all duration-200"
              style={{
                background: isSelected ? 'rgba(16,185,129,0.1)' : 'rgba(13,32,24,0.55)',
                border: `1px solid ${isSelected ? 'rgba(16,185,129,0.45)' : 'rgba(16,185,129,0.12)'}`,
                boxShadow: isSelected ? '0 0 14px rgba(16,185,129,0.1)' : 'none',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-grotesk text-xs font-medium text-slate-300/90 mb-1 truncate">
                    {asset.name}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        color: '#6ee7b7',
                      }}
                    >
                      {ASSET_TYPE_LABELS[asset.type]}
                    </span>
                    <span className="font-mono text-[9px] text-emerald-700/60">
                      Vintage {asset.vintage}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-cinzel text-sm text-emerald-300/90">
                    ${asset.value.toLocaleString()}
                  </div>
                  <div className="font-mono text-[10px] text-emerald-500/70">
                    {asset.apy}% APY
                  </div>
                </div>
              </div>

              {isSelected && (
                <div
                  className="mt-3 pt-3 space-y-2"
                  style={{ borderTop: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-emerald-700/70">Yield Agent</span>
                    <span style={{ color: AGENT_COLORS[asset.agent] }}>{asset.agent}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-emerald-700/70">Status</span>
                    <span className={asset.staked ? 'text-emerald-400/80' : 'text-slate-500/70'}>
                      {asset.staked ? 'Staked · Earning' : 'Unstaked'}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-emerald-700/70">Token ID</span>
                    <span className="text-emerald-600/60">{asset.id.toUpperCase()}</span>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Stake config */}
      {selected && (
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(13,32,24,0.6)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          <div className="font-mono text-[10px] tracking-widest text-emerald-700/60 uppercase mb-3">
            ABRA Stake Configuration
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {STAKE_CONFIGS.map((cfg) => (
              <button
                key={cfg.duration}
                onClick={() => setStakeConfig(cfg.duration)}
                className="rounded-lg p-2.5 text-center transition-all duration-200"
                style={{
                  background:
                    stakeConfig === cfg.duration
                      ? cfg.highlight
                        ? 'rgba(16,185,129,0.2)'
                        : 'rgba(16,185,129,0.12)'
                      : 'rgba(16,185,129,0.04)',
                  border: `1px solid ${stakeConfig === cfg.duration ? 'rgba(16,185,129,0.55)' : 'rgba(16,185,129,0.12)'}`,
                  boxShadow:
                    stakeConfig === cfg.duration && cfg.highlight
                      ? '0 0 12px rgba(16,185,129,0.22)'
                      : 'none',
                }}
              >
                <div className="font-cinzel text-xs font-semibold text-emerald-300/90">
                  {cfg.multiplier}
                </div>
                <div className="font-mono text-[9px] text-emerald-700/60">{cfg.label}</div>
                {cfg.highlight && (
                  <div className="font-mono text-[8px] text-emerald-500/70 mt-0.5">Popular</div>
                )}
              </button>
            ))}
          </div>

          <button
            className="w-full py-2 font-grotesk text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.1))',
              border: '1px solid rgba(16,185,129,0.5)',
              color: '#a7f3d0',
            }}
          >
            Stake ABRA · {STAKE_CONFIGS.find((c) => c.duration === stakeConfig)?.multiplier} Yield
          </button>
        </div>
      )}

      <AbraxasCallout />
    </div>
  )
}

export default VaultTab
