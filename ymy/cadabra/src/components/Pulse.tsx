type Clip = {
  id: number
  creator: string
  handle: string
  title: string
  category: 'gaming' | 'sports' | 'defi' | 'stream'
  thumbnail: string
  nftMinted: boolean
  views: number
  likes: number
  tokenPrice: number
  creatorShare: string
  avatar: string
}

interface PulseProps {
  clips?: Clip[]
}

const defaultClips: Clip[] = [
  {
    id: 1,
    creator: 'Gamer Ghost',
    handle: '@gamerghost',
    title: '1v5 Clutch in Squad Battle',
    category: 'gaming',
    thumbnail: '🎮 Intense gaming moment caught on stream',
    nftMinted: true,
    views: 42100,
    likes: 3240,
    tokenPrice: 2.5,
    creatorShare: '70%',
    avatar: '👻',
  },
  {
    id: 2,
    creator: 'Sports Oracle',
    handle: '@sportsora',
    title: 'Legendary Half-Court Shot',
    category: 'sports',
    thumbnail: '🏀 Unbelievable sports highlight',
    nftMinted: true,
    views: 89500,
    likes: 7210,
    tokenPrice: 4.2,
    creatorShare: '70%',
    avatar: '🎯',
  },
  {
    id: 3,
    creator: 'DeFi Streamer',
    handle: '@defistream',
    title: 'Arbitrage Opportunity Spotted',
    category: 'defi',
    thumbnail: '💰 Real-time DeFi trading action',
    nftMinted: false,
    views: 23400,
    likes: 1820,
    tokenPrice: 1.8,
    creatorShare: '70%',
    avatar: '📊',
  },
  {
    id: 4,
    creator: 'Stream King',
    handle: '@streamkinggg',
    title: '12hr Charity Stream Finale',
    category: 'stream',
    thumbnail: '🎤 Epic community stream moment',
    nftMinted: true,
    views: 156200,
    likes: 12400,
    tokenPrice: 3.1,
    creatorShare: '70%',
    avatar: '👑',
  },
  {
    id: 5,
    creator: 'Speedrunner Z',
    handle: '@speedz33',
    title: 'World Record Speedrun Achieved',
    category: 'gaming',
    thumbnail: '🚀 Record-breaking speedrun moment',
    nftMinted: true,
    views: 67800,
    likes: 5340,
    tokenPrice: 2.9,
    creatorShare: '70%',
    avatar: '⚡',
  },
  {
    id: 6,
    creator: 'Trading Analyst',
    handle: '@tradinganalyst',
    title: 'Market Prediction Analysis',
    category: 'defi',
    thumbnail: '📈 Market analysis breakthrough',
    nftMinted: false,
    views: 34100,
    likes: 2650,
    tokenPrice: 1.5,
    creatorShare: '70%',
    avatar: '🔮',
  },
]

function getCategoryColor(
  category: string,
): 'purple' | 'orange' | 'cyan' | 'green' {
  const colors: Record<string, 'purple' | 'orange' | 'cyan' | 'green'> = {
    gaming: 'purple',
    sports: 'orange',
    defi: 'cyan',
    stream: 'green',
  }
  return colors[category] || 'purple'
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    gaming: '🎮',
    sports: '🏆',
    defi: '💰',
    stream: '🎤',
  }
  return icons[category] || '✨'
}

export function Pulse({ clips = defaultClips }: PulseProps) {
  return (
    <section className="space-y-0 divide-y divide-purple-300/20">
      <div className="border-b border-purple-300/20 px-4 py-4 glass-sm">
        <p className="mb-2 text-sm text-purple-100">Tokenized Content</p>
        <p className="text-xs text-purple-100/70">
          Gaming, sports, and DeFi moments instantly minted as La Casa NFTs.
          Creators earn 70% of all trading fees.
        </p>
      </div>

      <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
        {clips.map((clip) => {
          const colorName = getCategoryColor(clip.category)
          const borderClasses: Record<string, string> = {
            purple: 'border-purple-300/40 hover:border-purple-300/60 bg-purple-500/8 hover:bg-purple-500/15',
            orange: 'border-orange-300/40 hover:border-orange-300/60 bg-orange-500/8 hover:bg-orange-500/15',
            cyan: 'border-cyan-300/40 hover:border-cyan-300/60 bg-cyan-500/8 hover:bg-cyan-500/15',
            green: 'border-green-300/40 hover:border-green-300/60 bg-green-500/8 hover:bg-green-500/15',
          }

          return (
            <div
              key={clip.id}
              className={`border p-4 transition-all cursor-pointer slide-in-up ${borderClasses[colorName]}`}
            >
              {/* Thumbnail */}
              <div className="mb-3 rounded-lg glass-sm p-3 text-sm text-cyan-100/85 smooth-hover">
                {clip.thumbnail}
              </div>

              {/* Header */}
              <div className="flex items-start gap-2 mb-3">
                <div className="h-8 w-8 flex-shrink-0 rounded-full border border-cyan-300/50 bg-gradient-to-br from-cyan-500/25 to-purple-500/25 flex items-center justify-center text-xs font-semibold text-cyan-100">
                  {clip.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-purple-100 truncate">
                    {clip.creator}
                  </p>
                  <p className="text-xs text-purple-100/60 truncate">{clip.handle}</p>
                </div>
              </div>

              {/* Title */}
              <p className="text-sm font-semibold text-purple-100 mb-2 line-clamp-2">
                {clip.title}
              </p>

              {/* Category Badge */}
              <div className="mb-3 inline-flex items-center gap-1">
                <span className={`text-${colorName}-100 text-lg`}>
                  {getCategoryIcon(clip.category)}
                </span>
                <span
                  className={`rounded-full border border-${colorName}-300/40 bg-${colorName}-400/10 px-2 py-1 text-xs font-semibold text-${colorName}-100`}
                >
                  {clip.category.charAt(0).toUpperCase() + clip.category.slice(1)}
                </span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-purple-100/70">
                <div>
                  <p className="text-purple-100/60">👁️ Views</p>
                  <p className="font-semibold text-purple-100">
                    {(clip.views / 1000).toFixed(1)}K
                  </p>
                </div>
                <div>
                  <p className="text-purple-100/60">❤️ Likes</p>
                  <p className="font-semibold text-purple-100">
                    {(clip.likes / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              {/* NFT Minting Info */}
              {clip.nftMinted && (
                <div className="mb-3 rounded-lg border border-orange-300/40 bg-orange-400/8 p-2">
                  <p className="text-xs text-orange-100 font-semibold">✨ La Casa NFT</p>
                  <p className="text-xs text-orange-100/70">
                    Floor: ${clip.tokenPrice.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Trading Fee Split */}
              <div className="rounded-lg border border-cyan-300/30 bg-cyan-500/5 p-2 mb-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-cyan-100/70">Creator Commission</span>
                  <span className="font-semibold text-cyan-100">
                    {clip.creatorShare}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn-primary text-xs py-2">
                  {clip.nftMinted ? 'Trade' : 'Mint NFT'}
                </button>
                <button className="flex-1 btn-secondary text-xs py-2">
                  Watch
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* End of feed */}
      <div className="border-t border-purple-300/20 p-4 text-center text-xs text-purple-200/60">
        More clips loading from the network...
      </div>
    </section>
  )
}
