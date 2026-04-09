import React, { useState } from 'react'
import AbraxasCallout from '../AbraxasCallout'
import { Shield, CheckCircle, Clock, Users, FileText } from 'lucide-react'

interface Proposal {
  id: string
  title: string
  type: string
  status: 'Active' | 'Passed' | 'Pending'
  votes: { for: number; against: number; abstain: number }
  endsIn: string
  description: string
}

const PROPOSALS: Proposal[] = [
  {
    id: 'GVP-001',
    title: 'Approve Sierra Madre Certification Renewal · VCS 2024',
    type: 'Certification',
    status: 'Active',
    votes: { for: 78, against: 12, abstain: 10 },
    endsIn: '2d 14h',
    description:
      'Renew the VCS certification for Sierra Madre Carbon Block A, extending the verification period through 2026 and enabling continued offset issuance.',
  },
  {
    id: 'GVP-002',
    title: 'Expand Oaxaca Regenerative Farm to Adjacent Parcels',
    type: 'Land Use',
    status: 'Active',
    votes: { for: 61, against: 28, abstain: 11 },
    endsIn: '5d 3h',
    description:
      'Authorize the acquisition and integration of two adjacent land parcels (approx. 180 hectares) into the existing regenerative farming operation.',
  },
  {
    id: 'GVP-003',
    title: 'Establish Pacific Coastal Easement Conservation Protocol',
    type: 'Easement',
    status: 'Passed',
    votes: { for: 91, against: 5, abstain: 4 },
    endsIn: 'Closed',
    description:
      'On-chain encoding of permanent conservation easement terms for the Pacific Coastal holding, restricting extractive development.',
  },
  {
    id: 'GVP-004',
    title: 'Update Epoch Distribution: Weekly → Bi-weekly',
    type: 'Protocol',
    status: 'Pending',
    votes: { for: 0, against: 0, abstain: 0 },
    endsIn: 'Starts in 1d',
    description:
      'Proposal to migrate yield distribution intervals from weekly to bi-weekly to reduce gas overhead and smooth distribution curves.',
  },
]

const STATUS_COLORS: Record<string, string> = {
  Active:  '#10b981',
  Passed:  '#6ee7b7',
  Pending: '#84cc16',
}

const GuardianTab: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted]       = useState<Record<string, 'for' | 'against' | 'abstain'>>({})

  const castVote = (id: string, choice: 'for' | 'against' | 'abstain') => {
    setVoted((prev) => ({ ...prev, [id]: choice }))
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
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-emerald-500/80 text-sm">ᛟ</span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-emerald-600/70 uppercase">
            Othala · Guardian Council
          </span>
        </div>
        <h2 className="font-cinzel text-base font-semibold text-emerald-200/90 mb-1">
          Guardian
        </h2>
        <p className="text-xs text-slate-400/70 leading-relaxed">
          On-chain governance over land-use decisions, certification renewals, and conservation
          easements. Landowners and ABRA holders reclaim control from intermediaries.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FileText, label: 'Proposals', value: PROPOSALS.length.toString() },
          { icon: Users,    label: 'Voters',    value: '1,284' },
          { icon: Shield,   label: 'Quorum',    value: '51%' },
        ].map(({ icon: Icon, label, value }) => (
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
          </div>
        ))}
      </div>

      {/* Proposals */}
      <div>
        <div className="font-mono text-[10px] text-emerald-700/60 tracking-widest uppercase mb-2">
          Active Proposals
        </div>
        <div className="space-y-2">
          {PROPOSALS.map((p) => {
            const isOpen      = selected === p.id
            const userVote    = voted[p.id]
            const totalVotes  = p.votes.for + p.votes.against + p.votes.abstain
            const forPct      = totalVotes ? (p.votes.for / totalVotes) * 100 : 0

            return (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? 'rgba(16,185,129,0.07)' : 'rgba(13,32,24,0.55)',
                  border: `1px solid ${isOpen ? 'rgba(16,185,129,0.4)' : 'rgba(16,185,129,0.12)'}`,
                }}
              >
                <button
                  className="w-full text-left p-4"
                  onClick={() => setSelected(isOpen ? null : p.id)}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[9px] text-emerald-700/60">{p.id}</span>
                        <span
                          className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                          style={{
                            background: `${STATUS_COLORS[p.status]}15`,
                            border: `1px solid ${STATUS_COLORS[p.status]}30`,
                            color: STATUS_COLORS[p.status],
                          }}
                        >
                          {p.status}
                        </span>
                        <span
                          className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                          style={{
                            background: 'rgba(16,185,129,0.07)',
                            border: '1px solid rgba(16,185,129,0.15)',
                            color: '#6ee7b7aa',
                          }}
                        >
                          {p.type}
                        </span>
                      </div>
                      <p className="font-grotesk text-xs font-medium text-slate-300/90 leading-snug">
                        {p.title}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-700/60">
                        <Clock size={9} />
                        <span>{p.endsIn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vote bar */}
                  {totalVotes > 0 && (
                    <div className="w-full h-1.5 rounded-full bg-emerald-900/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${forPct}%` }}
                      />
                    </div>
                  )}
                </button>

                {/* Expanded vote panel */}
                {isOpen && (
                  <div
                    className="px-4 pb-4 space-y-3"
                    style={{ borderTop: '1px solid rgba(16,185,129,0.12)' }}
                  >
                    <p className="text-xs text-slate-400/70 leading-relaxed pt-3">
                      {p.description}
                    </p>

                    {totalVotes > 0 && (
                      <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                        {[
                          { label: 'For',     count: p.votes.for,     color: '#10b981' },
                          { label: 'Against', count: p.votes.against, color: '#f87171' },
                          { label: 'Abstain', count: p.votes.abstain, color: '#6b7280' },
                        ].map((v) => (
                          <div key={v.label} className="text-center">
                            <div style={{ color: v.color }} className="text-sm font-semibold">
                              {v.count}%
                            </div>
                            <div className="text-slate-600">{v.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {p.status === 'Active' && (
                      <div>
                        {userVote ? (
                          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400/80">
                            <CheckCircle size={13} />
                            <span>Voted: {userVote.charAt(0).toUpperCase() + userVote.slice(1)}</span>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            {(['for', 'against', 'abstain'] as const).map((choice) => (
                              <button
                                key={choice}
                                onClick={() => castVote(p.id, choice)}
                                className="flex-1 py-1.5 font-grotesk text-[10px] font-semibold tracking-wider uppercase rounded transition-all"
                                style={{
                                  background:
                                    choice === 'for'
                                      ? 'rgba(16,185,129,0.14)'
                                      : choice === 'against'
                                      ? 'rgba(248,113,113,0.12)'
                                      : 'rgba(107,114,128,0.12)',
                                  border:
                                    choice === 'for'
                                      ? '1px solid rgba(16,185,129,0.35)'
                                      : choice === 'against'
                                      ? '1px solid rgba(248,113,113,0.3)'
                                      : '1px solid rgba(107,114,128,0.25)',
                                  color:
                                    choice === 'for'
                                      ? '#6ee7b7'
                                      : choice === 'against'
                                      ? '#fca5a5'
                                      : '#9ca3af',
                                }}
                              >
                                {choice}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {p.status === 'Passed' && (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-emerald-400" />
                        <span className="font-mono text-[11px] text-emerald-400/70">
                          Proposal passed · Enacted on-chain
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <AbraxasCallout />
    </div>
  )
}

export default GuardianTab
