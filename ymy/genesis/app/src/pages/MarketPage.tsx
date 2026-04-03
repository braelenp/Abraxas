import { useState } from 'react'
import { Search, TrendingUp, TrendingDown, Filter } from 'lucide-react'
import type { TokenInfo } from '../lib/types'

const MOCK_MARKETS: TokenInfo[] = [
  { symbol: 'SOL', name: 'Solana', price: 142.50, change24h: 3.2, volume24h: 2400000000, marketCap: 65000000000 },
  { symbol: 'RAY', name: 'Raydium', price: 2.80, change24h: -1.5, volume24h: 45000000, marketCap: 800000000 },
  { symbol: 'JTO', name: 'Jito', price: 3.10, change24h: 5.8, volume24h: 120000000, marketCap: 450000000 },
  { symbol: 'WIF', name: 'dogwifhat', price: 1.85, change24h: -4.2, volume24h: 85000000, marketCap: 1850000000 },
  { symbol: 'BONK', name: 'Bonk', price: 0.000024, change24h: 2.1, volume24h: 180000000, marketCap: 1500000000 },
  { symbol: 'PYTH', name: 'Pyth Network', price: 0.32, change24h: 1.7, volume24h: 55000000, marketCap: 420000000 },
  { symbol: 'BSOL', name: 'BlazeStake SOL', price: 163.20, change24h: 3.0, volume24h: 8000000, marketCap: 320000000 },
  { symbol: 'MNGO', name: 'Mango Markets', price: 0.018, change24h: -2.3, volume24h: 3000000, marketCap: 45000000 },
]

function formatVolume(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`
  return `$${n.toLocaleString()}`
}

export default function MarketPage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'change24h' | 'volume24h' | 'marketCap' | 'price'>('marketCap')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('desc') }
  }

  const filtered = MOCK_MARKETS
    .filter(t => t.symbol.toLowerCase().includes(search.toLowerCase()) ||
                 t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const factor = sortDir === 'asc' ? 1 : -1
      return (a[sortBy] - b[sortBy]) * factor
    })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="section-title">INTELLIGENCE FEED</p>
        <h1 className="text-3xl font-black uppercase tracking-widest text-offwhite">MARKET</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="SEARCH ASSETS..."
            className="input-field pl-9"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2 px-4">
          <Filter size={14} />
          FILTER
        </button>
      </div>

      {/* Market Table */}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-steel/30">
              <th className="label text-left pb-3">#</th>
              <th className="label text-left pb-3">ASSET</th>
              <th
                className="label text-right pb-3 cursor-pointer hover:text-gold transition-colors"
                onClick={() => handleSort('price')}
              >
                PRICE {sortBy === 'price' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
              </th>
              <th
                className="label text-right pb-3 cursor-pointer hover:text-gold transition-colors"
                onClick={() => handleSort('change24h')}
              >
                24H {sortBy === 'change24h' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
              </th>
              <th
                className="label text-right pb-3 cursor-pointer hover:text-gold transition-colors"
                onClick={() => handleSort('volume24h')}
              >
                VOLUME {sortBy === 'volume24h' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
              </th>
              <th
                className="label text-right pb-3 cursor-pointer hover:text-gold transition-colors"
                onClick={() => handleSort('marketCap')}
              >
                MKT CAP {sortBy === 'marketCap' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
              </th>
              <th className="label text-right pb-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((token, i) => (
              <tr key={token.symbol} className="border-b border-steel/10 hover:bg-steel/10 transition-colors">
                <td className="py-4 text-offwhite/30 font-mono text-xs">{i + 1}</td>
                <td className="py-4">
                  <div>
                    <p className="font-mono font-black text-offwhite">{token.symbol}</p>
                    <p className="text-xs text-offwhite/40">{token.name}</p>
                  </div>
                </td>
                <td className="py-4 text-right font-mono text-sm text-offwhite">
                  ${token.price < 0.001 ? token.price.toExponential(2) : token.price.toFixed(2)}
                </td>
                <td className="py-4 text-right">
                  <span className={`font-bold text-sm flex items-center justify-end gap-1 ${
                    token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {token.change24h >= 0
                      ? <TrendingUp size={12} />
                      : <TrendingDown size={12} />
                    }
                    {Math.abs(token.change24h).toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 text-right font-mono text-sm text-offwhite/70">
                  {formatVolume(token.volume24h)}
                </td>
                <td className="py-4 text-right font-mono text-sm text-offwhite/70">
                  {formatVolume(token.marketCap)}
                </td>
                <td className="py-4 text-right">
                  <button className="text-xs font-bold uppercase border border-gold/40 text-gold px-3 py-1 hover:bg-gold/10 transition-colors">
                    TRADE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
