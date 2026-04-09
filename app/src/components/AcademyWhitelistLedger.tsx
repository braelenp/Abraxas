/**
 * Academy Whitelist Ledger Component
 * - Display all enrolled whitelist users
 * - Show enrollment data and points
 * - Auto-refresh updates
 * - Public-facing ledger
 */

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, TrendingUp, Users, Calendar } from 'lucide-react';

interface WhitelistEntry {
  walletAddress: string;
  discordHandle: string;
  enrolledAt: string;
  status: 'whitelisted';
  bonusPoints: number;
}

interface AcademyWhitelistLedgerProps {
  compact?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  limit?: number;
}

export function AcademyWhitelistLedger({
  compact = false,
  autoRefresh = true,
  refreshInterval = 5000, // 5 seconds
  limit = 50,
}: AcademyWhitelistLedgerProps) {
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'points'>('date');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  // Load all whitelist entries from localStorage
  const loadEntries = useCallback(() => {
    setIsRefreshing(true);
    try {
      const allEntries: WhitelistEntry[] = [];
      
      // Scan all localStorage keys for whitelist enrollments
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('academy_whitelist_')) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const entry = JSON.parse(data) as WhitelistEntry;
              allEntries.push(entry);
            }
          } catch {
            // Skip malformed entries
          }
        }
      }

      // Sort by selected criteria
      if (sortBy === 'date') {
        allEntries.sort((a, b) => 
          new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
        );
      } else {
        allEntries.sort((a, b) => b.bonusPoints - a.bonusPoints);
      }

      setEntries(allEntries.slice(0, limit));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading whitelist entries:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [sortBy, limit]);

  // Initial load
  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadEntries();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadEntries]);

  const formatDate = (isoDate: string): string => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch {
      return isoDate;
    }
  };

  const shortenWallet = (wallet: string): string => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">
              Academy Enrolled
            </h3>
          </div>
          <span className="text-xs text-slate-400">{entries.length} members</span>
        </div>

        {/* Compact list */}
        <div className="space-y-2">
          {entries.slice(0, 5).map((entry) => (
            <div
              key={entry.walletAddress}
              className="flex items-center justify-between bg-slate-950/50 p-2 rounded border border-slate-700 text-xs"
            >
              <div className="flex-1 min-w-0">
                <div className="text-slate-300 font-mono truncate">
                  {shortenWallet(entry.walletAddress)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-300">+{entry.bonusPoints}</div>
                <div className="text-slate-500">pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full ledger
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-1 flex items-center gap-2">
            <span>Academy Whitelist Ledger</span>
            <span className="text-lg text-emerald-300">📋</span>
          </h2>
          <p className="text-sm text-slate-400">
            Public record of all Academy whitelist enrollments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-slate-400">Last Updated</div>
            <div className="text-sm font-mono text-slate-300">{lastUpdated}</div>
          </div>
          <button
            onClick={() => loadEntries()}
            disabled={isRefreshing}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh ledger"
          >
            <RefreshCw
              size={18}
              className={`text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900/60 border border-emerald-400/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-emerald-400" />
            <span className="text-xs text-slate-400 uppercase tracking-widest">Total Enrolled</span>
          </div>
          <div className="text-3xl font-bold text-emerald-300">{entries.length}</div>
        </div>

        <div className="bg-slate-900/60 border border-cyan-400/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-cyan-400" />
            <span className="text-xs text-slate-400 uppercase tracking-widest">Total Points</span>
          </div>
          <div className="text-3xl font-bold text-cyan-300">
            {entries.reduce((sum, e) => sum + e.bonusPoints, 0)}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-purple-400/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-purple-400" />
            <span className="text-xs text-slate-400 uppercase tracking-widest">Avg Points</span>
          </div>
          <div className="text-3xl font-bold text-purple-300">
            {entries.length > 0 
              ? Math.round(entries.reduce((sum, e) => sum + e.bonusPoints, 0) / entries.length)
              : 0
            }
          </div>
        </div>
      </div>

      {/* Sort controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setSortBy('date')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            sortBy === 'date'
              ? 'bg-emerald-600 text-white border border-emerald-500'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
          }`}
        >
          Newest First
        </button>
        <button
          onClick={() => setSortBy('points')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            sortBy === 'points'
              ? 'bg-emerald-600 text-white border border-emerald-500'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
          }`}
        >
          Most Points
        </button>
      </div>

      {/* Table */}
      {entries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-900/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Discord Handle
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Enrolled At
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={entry.walletAddress}
                  className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <code className="text-xs text-slate-300 font-mono bg-slate-950/50 px-2 py-1 rounded">
                      {shortenWallet(entry.walletAddress)}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-300">
                      {entry.discordHandle && entry.discordHandle !== 'Not provided'
                        ? entry.discordHandle
                        : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-400 text-xs">
                      {formatDate(entry.enrolledAt)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-bold text-emerald-300">+{entry.bonusPoints}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded text-xs text-emerald-300 font-semibold">
                      ✓ {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-700">
          <Users size={48} className="mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400 mb-2">No whitelist enrollments yet</p>
          <p className="text-slate-500 text-sm">Enroll in the Academy to appear on this ledger</p>
        </div>
      )}

      {/* Footer note */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-xs text-slate-400">
        <p>
          This ledger auto-refreshes every {refreshInterval / 1000} seconds and shows all Academy
          whitelist enrollments. Each member receives +500 airdrop points upon enrollment.
        </p>
      </div>
    </div>
  );
}
