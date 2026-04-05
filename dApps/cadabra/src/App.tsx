import { useEffect, useMemo, useState, useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { TokenGatedPage } from './pages/TokenGatedPage'
import { LoadingPage } from './pages/LoadingPage'
import { useTokenBalance } from './hooks/useTokenBalance'
import { MINIMUM_TOKENS_FOR_ACCESS } from './lib/token'
import { Sidebar } from './components/Sidebar'
import { TabHeader } from './components/TabHeader'
import { TrendingPanel } from './components/TrendingPanel'
import { MobileNav } from './components/MobileNav'
import { Pulse } from './components/Pulse'

type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'pulse' | 'profile'

type Comment = {
  id: number
  author: string
  handle: string
  body: string
  avatar: string
}

type Post = {
  id: number
  author: string
  handle: string
  content: string
  image: string
  coin: string
  likes: number
  comments: Comment[]
  shares: number
  reposts: number
  tokenized: boolean
}

type Kol = {
  id: number
  name: string
  handle: string
  niche: string
  followers: string
  engagement: string
  pastCoinPerformance: string
  successRate: string
  verified: boolean
}

type FounderProject = {
  id: number
  project: string
  founder: string
  handle: string
  stage: string
  category: string
  traction: string
  budget: string
}

type CoinStat = {
  ticker: string
  volume24h: string
  marketCap: string
  socialVelocity: string
}

const seedPosts: Post[] = [
  {
    id: 1,
    author: 'Luna Forge',
    handle: '@lunaforge',
    content: 'Cadabra launch thread: meme energy can now become liquid social capital in one tap.',
    image: 'Mirror runes igniting over a city skyline.',
    coin: 'MIRR',
    likes: 412,
    comments: [{ id: 1, author: 'Nyx', handle: '@nyx_signal', body: 'This is the social layer we needed.', avatar: '🔮' }],
    shares: 102,
    reposts: 63,
    tokenized: false,
  },
  {
    id: 2,
    author: 'Astra KOL',
    handle: '@astraalpha',
    content: 'Founder quality filter is live. Real teams only. Reputation moves on-chain now.',
    image: 'Purple beam slicing through static.',
    coin: 'SOPH',
    likes: 311,
    comments: [],
    shares: 71,
    reposts: 48,
    tokenized: false,
  },
  {
    id: 3,
    author: 'Meme Cathedral',
    handle: '@memecathedral',
    content: 'Dropped a trilogy format: meme -> launch -> creator split. Cadabra flow is smooth.',
    image: 'Golden sigil over a black mirror.',
    coin: 'RUNE',
    likes: 529,
    comments: [{ id: 2, author: 'Orbital', handle: '@orbitaldev', body: 'Tokenized content keeps compounding.', avatar: '⚙️' }],
    shares: 132,
    reposts: 90,
    tokenized: true,
  },
  {
    id: 4,
    author: 'Vein Sentinel',
    handle: '@veinsentinel',
    content: 'KOL marketplace deal board is active. Transparent outcomes and payout rails.',
    image: 'Two hands exchanging a luminous coin.',
    coin: 'VEIN',
    likes: 210,
    comments: [],
    shares: 53,
    reposts: 40,
    tokenized: false,
  },
  {
    id: 5,
    author: 'Sage Genesis',
    handle: '@sagegenesis',
    content: 'Cadabra is where intent becomes distribution. The graph is social first, token native.',
    image: 'Cyan particles spiraling around a wand.',
    coin: 'GEN',
    likes: 388,
    comments: [],
    shares: 84,
    reposts: 52,
    tokenized: false,
  },
  {
    id: 6,
    author: 'Pulse Oracle',
    handle: '@pulseoracle',
    content: 'Daily alpha: meme cycles shortened by half once creator rails became one-click.',
    image: 'Signal chart projected from the mirror.',
    coin: 'PLS',
    likes: 267,
    comments: [],
    shares: 66,
    reposts: 39,
    tokenized: false,
  },
  {
    id: 7,
    author: 'Delta Mancer',
    handle: '@deltamancer',
    content: 'Shipping our first tokenized spaces archive. Ownership follows attention now.',
    image: 'Audio waveform etched as a glowing rune.',
    coin: 'ECHO',
    likes: 290,
    comments: [],
    shares: 62,
    reposts: 44,
    tokenized: false,
  },
  {
    id: 8,
    author: 'Aurelia Node',
    handle: '@aurelianode',
    content: 'Real collaboration metrics in the KOL board are game changing. No more fake reach.',
    image: 'Ledger of influence lit in amber.',
    coin: 'AUR',
    likes: 348,
    comments: [],
    shares: 92,
    reposts: 61,
    tokenized: true,
  },
  {
    id: 9,
    author: 'Coin Alchemist',
    handle: '@coinalchemist',
    content: 'Meme stack for this week: creator cut automation + social rewards.',
    image: 'Stack of coins reflecting a moonlit sky.',
    coin: 'ALCH',
    likes: 176,
    comments: [],
    shares: 40,
    reposts: 28,
    tokenized: false,
  },
  {
    id: 10,
    author: 'Solana Rituals',
    handle: '@solrituals',
    content: 'Cadabra feels like decentralized X for meme economies. Fast, direct, native.',
    image: 'Crowd under light beams with rune projections.',
    coin: 'RITL',
    likes: 472,
    comments: [],
    shares: 133,
    reposts: 81,
    tokenized: false,
  },
  {
    id: 11,
    author: 'Project Echo',
    handle: '@projectecho',
    content: 'Launching in 48h. Looking for two KOLs with proven conversion histories.',
    image: 'Countdown timer over an obsidian mirror.',
    coin: 'ECHO',
    likes: 221,
    comments: [],
    shares: 59,
    reposts: 33,
    tokenized: false,
  },
  {
    id: 12,
    author: 'Founder Relay',
    handle: '@founderrelay',
    content: 'No gatekeepers, only reputation trails. This is what social-fi needed.',
    image: 'Trail of light crossing a dark chamber.',
    coin: 'RELY',
    likes: 198,
    comments: [],
    shares: 46,
    reposts: 36,
    tokenized: false,
  },
]

const kolDirectory: Kol[] = [
  {
    id: 1,
    name: 'Nova Cantor',
    handle: '@novacantor',
    niche: 'Meme coin narratives',
    followers: '412K',
    engagement: '8.7%',
    pastCoinPerformance: '+172% avg',
    successRate: '78%',
    verified: true,
  },
  {
    id: 2,
    name: 'Cypher Bloom',
    handle: '@cypherbloom',
    niche: 'Community launches',
    followers: '289K',
    engagement: '9.1%',
    pastCoinPerformance: '+140% avg',
    successRate: '74%',
    verified: true,
  },
  {
    id: 3,
    name: 'Mirage Ops',
    handle: '@mirageops',
    niche: 'Trend interception',
    followers: '198K',
    engagement: '10.2%',
    pastCoinPerformance: '+121% avg',
    successRate: '69%',
    verified: true,
  },
]

const founderProjects: FounderProject[] = [
  {
    id: 1,
    project: 'Ghost Mint',
    founder: 'Rhea',
    handle: '@rheafoundry',
    stage: 'Pre-launch',
    category: 'Meme protocol',
    traction: '42K waitlist',
    budget: '15K USDC',
  },
  {
    id: 2,
    project: 'Rune Rally',
    founder: 'Dorian',
    handle: '@dorianrally',
    stage: 'Live',
    category: 'Creator coin',
    traction: '8.1M impressions',
    budget: '22K USDC',
  },
  {
    id: 3,
    project: 'Orb House',
    founder: 'Mina',
    handle: '@minaorb',
    stage: 'Growth',
    category: 'Tokenized media',
    traction: '5K token holders',
    budget: '12K USDC',
  },
]

const coinStats: CoinStat[] = [
  { ticker: 'MIRR', volume24h: '$4.2M', marketCap: '$38M', socialVelocity: 'High' },
  { ticker: 'SOPH', volume24h: '$3.1M', marketCap: '$29M', socialVelocity: 'High' },
  { ticker: 'RUNE', volume24h: '$2.5M', marketCap: '$21M', socialVelocity: 'Medium' },
  { ticker: 'AUR', volume24h: '$1.8M', marketCap: '$17M', socialVelocity: 'High' },
]



function App() {
  // Solana wallet connection
  const { connected, publicKey, connect, disconnect, select, wallets } = useWallet()
  
  // Token gating
  const { isLoading: isCheckingBalance, hasMinimum } = useTokenBalance(MINIMUM_TOKENS_FOR_ACCESS)

  // Refs
  const contentRef = useRef<HTMLDivElement>(null)

  // UI state
  const [isLoading, setIsLoading] = useState(true)
  const [enteredMirror, setEnteredMirror] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [toast, setToast] = useState('')
  const [feed, setFeed] = useState<Post[]>(seedPosts.slice(0, 6))
  const [cursor, setCursor] = useState(6)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [marketView, setMarketView] = useState<'creators' | 'kols'>('creators')
  const [xUsername, setXUsername] = useState('')
  const [xVerified, setXVerified] = useState(false)
  const [isCheckingX, setIsCheckingX] = useState(false)
  const [composer, setComposer] = useState({ content: '', image: '', coin: '' })
  const [newComment, setNewComment] = useState<Record<number, string>>({})
  const [following, setFollowing] = useState<Record<string, boolean>>({ '@novacantor': true })
  const [myProfile, setMyProfile] = useState({
    name: 'Mirror Builder',
    handle: '@mirrorbuilder',
    bio: 'Tokenizing narratives in the Cadabra layer.',
    avatar: '✨',
  })
  const [tabTransition, setTabTransition] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [_profileEdited, _setProfileEdited] = useState(false)
  const [_selectedKol, _setSelectedKol] = useState<Kol | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const hasMore = cursor < seedPosts.length

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!enteredMirror || activeTab !== 'home') return

    const onScroll = () => {
      if (isFetchingMore || !hasMore) return
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      if (!nearBottom) return

      setIsFetchingMore(true)
      setTimeout(() => {
        setFeed((prev) => [...prev, ...seedPosts.slice(cursor, cursor + 3)])
        setCursor((prev) => prev + 3)
        setIsFetchingMore(false)
      }, 550)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [activeTab, cursor, enteredMirror, hasMore, isFetchingMore])

  const filteredExplore = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) {
      return {
        posts: feed,
        coins: coinStats,
        kols: kolDirectory,
      }
    }

    return {
      posts: feed.filter(
        (p) =>
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.coin.toLowerCase().includes(q),
      ),
      coins: coinStats.filter((c) => c.ticker.toLowerCase().includes(q)),
      kols: kolDirectory.filter(
        (k) =>
          k.name.toLowerCase().includes(q) ||
          k.handle.toLowerCase().includes(q) ||
          k.niche.toLowerCase().includes(q),
      ),
    }
  }, [feed, searchTerm])

  const toggleLike = (postId: number) => {
    setFeed((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + (likedPosts.has(postId) ? -1 : 1) } : p)))
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const repost = (postId: number) => {
    setFeed((prev) => prev.map((p) => (p.id === postId ? { ...p, reposts: p.reposts + 1 } : p)))
    setToast('Reposted to your followers')
  }

  const share = (postId: number) => {
    setFeed((prev) => prev.map((p) => (p.id === postId ? { ...p, shares: p.shares + 1 } : p)))
    setToast('Share link copied (mock)')
  }

  const tokenizePost = (postId: number) => {
    setFeed((prev) => prev.map((p) => (p.id === postId ? { ...p, tokenized: true } : p)))
    setComposer((prev) => ({ ...prev, content: 'Forging this post as La Casa NFT on devnet.' }))
    setActiveTab('post')
    setToast('Redirected to Forge flow (mock)')
  }

  const addComment = (postId: number) => {
    const body = (newComment[postId] ?? '').trim()
    if (!body) return

    setFeed((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, { id: Date.now(), author: myProfile.name, handle: myProfile.handle, body, avatar: myProfile.avatar }],
            }
          : p,
      ),
    )
    setNewComment((prev) => ({ ...prev, [postId]: '' }))
    setToast('Comment added')
  }

  const submitPost = () => {
    const content = composer.content.trim()
    if (!content) return

    const post: Post = {
      id: Date.now(),
      author: myProfile.name,
      handle: myProfile.handle,
      content,
      image: composer.image.trim() || 'User-generated mirror frame.',
      coin: composer.coin.trim().toUpperCase() || 'CADA',
      likes: 0,
      comments: [],
      shares: 0,
      reposts: 0,
      tokenized: false,
    }

    setFeed((prev) => [post, ...prev])
    setComposer({ content: '', image: '', coin: '' })
    setActiveTab('home')
    setToast('Post published to Cadabra feed')
  }

  const verifyX = () => {
    const normalized = xUsername.trim().replace('@', '')
    if (!normalized) return
    setIsCheckingX(true)
    setTimeout(() => {
      const isReal = normalized.length >= 4 && !normalized.includes('fake')
      setXVerified(isReal)
      setIsCheckingX(false)
      setToast(isReal ? `X username @${normalized} verified` : 'Verification failed, try another handle')
    }, 1000)
  }

  const toggleFollow = (handle: string) => {
    setFollowing((prev) => ({ ...prev, [handle]: !prev[handle] }))
    const isFollowing = following[handle]
    setToast(isFollowing ? `Unfollowed ${handle}` : `Following ${handle}`)
  }

  const saveProfile = () => {
    if (!myProfile.name.trim()) {
      setToast('Name cannot be empty')
      return
    }
    _setProfileEdited(false)
    setToast('Profile saved successfully')
  }

  const selectKol = (kol: Kol) => {
    _setSelectedKol(kol)
    setToast(`Selected ${kol.name} for viewing`)
  }

  const investInKol = (kol: Kol) => {
    if (!connected) {
      setToast('Connect wallet to invest')
      return
    }
    setToast(`Initiated investment flow for ${kol.name}`)
  }

  const requestKol = (kol: Kol) => {
    if (!connected) {
      setToast('Connect wallet to request KOL')
      return
    }
    setToast(`Requested ${kol.name} for collaboration`)
  }

  const endorseProject = (project: FounderProject) => {
    if (!connected) {
      setToast('Connect wallet to endorse')
      return
    }
    setToast(`Endorsed "${project.project}" - thanks for supporting!`)
  }

  // Token gating logic
  if (isCheckingBalance) {
    return <LoadingPage />
  }

  if (!hasMinimum) {
    return <TokenGatedPage />
  }

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        {/* Grid background */}
        <div className="grid-bg absolute inset-0" />
        
        {/* Scanlines overlay */}
        <div className="scanlines absolute inset-0" />
        
        {/* Data streams */}
        <div className="data-stream" style={{ top: '10%', animationDelay: '0s', left: '-100%' }}>
          &gt; SOCIAL_DIMENSION_LOADING | STATUS: ONLINE
        </div>
        <div className="data-stream" style={{ top: '20%', animationDelay: '2s', left: '-100%' }}>
          &gt; WARP_CORE_ENGAGED | CADABRA_PROTOCOL_V2.4
        </div>
        <div className="data-stream" style={{ top: '80%', animationDelay: '1s', left: '-100%' }}>
          &gt; MIRROR_LAYER_INITIALIZING | SOCIAL_DIMENSION_STABLE
        </div>
        
        {/* Animated beams */}
        <div className="beam left-[10%] top-[-10vh]" style={{ animationDelay: '0s' }} />
        <div className="beam left-[50%] top-[-20vh]" style={{ animationDelay: '0.7s' }} />
        <div className="beam left-[75%] top-[-15vh]" style={{ animationDelay: '1.4s' }} />
        <div className="beam left-[25%] top-[-25vh] opacity-50" style={{ animationDelay: '0.3s' }} />

        {/* Central loading container */}
        <div className="relative z-10 flex flex-col items-center gap-12">
          {/* Radar rings */}
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 border border-cyan-500/30 rounded-full" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <div className="absolute inset-3 border border-cyan-500/20 rounded-full" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
            <div className="absolute inset-6 border border-cyan-500/10 rounded-full" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
            
            {/* Logo with animated rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mirror-core">
                <div className="cadabra-rune glitch">◇</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 glitch">
              CADABRA
            </h1>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 font-mono">
              ◇ THE SOCIAL DIMENSION ◇
            </div>
          </div>

          {/* Status displays */}
          <div className="space-y-2 text-center font-mono text-xs">
            <div className="flex items-center justify-center gap-2">
              <span className="text-cyan-400/60">[</span>
              <span className="text-cyan-400 animate-pulse">●</span>
              <span className="text-cyan-400/60">] SYSTEMS_ONLINE</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-cyan-300/50">
              <span className="text-cyan-300/30">[</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="text-cyan-300/30">] PROTOCOL_LOADING</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-cyan-200/40">
              <span className="text-cyan-200/20">[</span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
              <span className="text-cyan-200/20">] MIRROR_LAYER_INITIALIZING</span>
            </div>
          </div>

          {/* Loading bar */}
          <div className="space-y-2 w-full flex flex-col items-center">
            <div className="loading-bar" />
            <p className="text-xs text-cyan-400/60 font-mono">WARP_DRIVE: CHARGING</p>
          </div>
        </div>
      </div>
    )
  }

  if (!enteredMirror) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6">
        {/* Grid background */}
        <div className="grid-bg absolute inset-0" />
        
        {/* Scanlines overlay */}
        <div className="scanlines absolute inset-0" />
        
        {/* Data streams */}
        <div className="data-stream" style={{ top: '15%', animationDelay: '0s', left: '-100%' }}>
          &gt; DIMENSION_CADABRA | WARP_STATUS: ENGAGED
        </div>
        <div className="data-stream" style={{ top: '85%', animationDelay: '3s', left: '-100%' }}>
          &gt; SOCIAL_CAPITAL_DETECTED | INITIALIZING_TRANSFER_PROTOCOL
        </div>

        {/* Beams */}
        <div className="beam left-[15%] top-[-20vh]" style={{ animationDelay: '0.2s' }} />
        <div className="beam left-[65%] top-[-15vh]" style={{ animationDelay: '1s' }} />
        <div className="beam left-[35%] top-[-25vh] opacity-40" style={{ animationDelay: '0.5s' }} />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center gap-12 max-w-2xl pb-48">
          {/* Logo */}
          <div className="mirror-core">
            <div className="cadabra-rune glitch">◇</div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 glitch">
              CADABRA
            </h1>
            <p className="text-lg uppercase tracking-[0.2em] text-cyan-300/70 font-mono">◇ THE SOCIAL DIMENSION ◇</p>
          </div>

          {/* Description */}
          <p className="text-center text-base leading-relaxed text-slate-300 max-w-lg font-mono text-sm">
            Where memes become assets and community becomes capital. A premium social layer for the decentralized economy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <button
              onClick={() => setEnteredMirror(true)}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold uppercase tracking-[0.1em] rounded-lg transition hover:shadow-lg hover:shadow-cyan-500/50 whitespace-nowrap"
            >
              Enter Portal
            </button>
            <button
              onClick={() => window.open('https://discord.gg/EhgEe2MPa', '_blank')}
              className="px-8 py-3 border border-cyan-400/50 text-cyan-300 font-bold uppercase tracking-[0.1em] rounded-lg hover:bg-cyan-500/10 transition whitespace-nowrap"
            >
              Discord
            </button>
            <button
              onClick={() => window.open('https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold uppercase tracking-[0.1em] rounded-lg transition hover:shadow-lg hover:shadow-orange-500/50 whitespace-nowrap"
            >
              Buy $ABRA
            </button>
          </div>

          {/* Wallet */}
          <button
            onClick={() => {
              if (connected) {
                disconnect().catch(() => setToast('Failed to disconnect'))
              } else {
                if (wallets.length > 0) {
                  select(wallets[0].adapter.name)
                  connect().catch(() => setToast('Failed to connect wallet'))
                } else {
                  setToast('No wallets available')
                }
              }
            }}
            className="text-sm text-cyan-300/70 hover:text-cyan-300 transition"
          >
            {connected ? `✓ ${publicKey?.toBase58().slice(0, 8)}...` : 'Connect Wallet'}
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4 py-2 bg-slate-900/90 border border-cyan-400/50 rounded-full text-xs uppercase tracking-[0.1em] text-cyan-300">
            {toast}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Grid background */}
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      
      {/* Beams */}
      <div className="beam fixed left-[15%] top-[-20vh] pointer-events-none" style={{ animationDelay: '0.2s' }} />
      <div className="beam fixed left-[85%] top-[-10vh] pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="beam fixed left-[40%] top-[-30vh] pointer-events-none opacity-40" style={{ animationDelay: '0.5s' }} />

      {/* Grid background */}
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      
      {/* Scanlines overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none" />

      <div className="relative z-10 h-screen w-full bg-black/40 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed md:hidden inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setTabTransition(true)
        setActiveTab(tab)
        if (contentRef.current) {
          contentRef.current.scrollTop = 0
        }
        setTimeout(() => setTabTransition(false), 100)
      }} isOpen={sidebarOpen} />

      <div className="flex-1 overflow-y-auto transition-all duration-300" ref={contentRef}>
        <main className="flex flex-col md:flex-row w-full overflow-hidden">
          <div className="flex-1 border-r border-cyan-400/20 pb-20 md:pb-0 overflow-y-auto">
            <TabHeader activeTab={activeTab} isTransitioning={tabTransition} sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

            <div className={`${tabTransition ? 'opacity-0' : 'opacity-100 fade-in'} transition-opacity duration-300`}>
              {activeTab === 'home' && (
                <section className="space-y-0">
                  <div className="border-b border-purple-300/20 px-4 py-4 glass-sm">
                    <p className="mb-2 text-sm text-purple-100">Meme and Coin Feed</p>
                    <p className="text-xs text-purple-100/70">Sovereign social rail for meme trading, coin launches, and tokenized content.</p>
                  </div>

                  {feed.map((post, idx) => (
                    <article
                      key={post.id}
                      className="border-b border-purple-300/20 p-4 transition-all hover:bg-purple-500/8 slide-in-up cursor-pointer"
                      style={{ animationDelay: `${idx * 30}ms` }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div className="flex gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full border border-cyan-300/50 bg-gradient-to-br from-cyan-500/25 to-purple-500/25 flex items-center justify-center text-xs font-semibold text-cyan-100">
                          {post.author.slice(0, 1)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-purple-100">{post.author}</p>
                              <p className="text-sm text-purple-100/60">{post.handle}</p>
                            </div>
                            <span className="rounded-full border border-orange-300/40 bg-orange-400/10 px-2 py-1 text-xs font-semibold text-orange-100">
                              ${post.coin}
                            </span>
                          </div>

                          <p className="mt-2 text-sm leading-relaxed text-purple-50">{post.content}</p>

                          {post.image && (
                            <div className="mt-3 rounded-xl glass-sm p-3 text-xs text-cyan-100/85 smooth-hover hover:glow-cyan">
                              {post.image}
                            </div>
                          )}

                          <div className="mt-3 flex gap-2 text-xs text-purple-100/70">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className={`smooth-hover flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                                likedPosts.has(post.id)
                                  ? 'text-red-400 bg-red-500/15 scale-105'
                                  : 'hover:text-purple-100 hover:bg-purple-500/10'
                              }`}
                            >
                              <span className={likedPosts.has(post.id) ? 'scale-125' : ''}>❤️</span>
                              {post.likes}
                            </button>
                            <button className="smooth-hover hover:text-purple-100 hover:bg-purple-500/10 px-2 py-1 rounded-lg">
                              💬 {post.comments.length}
                            </button>
                            <button onClick={() => repost(post.id)} className="smooth-hover hover:text-purple-100 hover:bg-purple-500/10 px-2 py-1 rounded-lg">
                              🔄 {post.reposts}
                            </button>
                            <button onClick={() => share(post.id)} className="smooth-hover hover:text-purple-100 hover:bg-purple-500/10 px-2 py-1 rounded-lg">
                              📤 {post.shares}
                            </button>
                            <button
                              onClick={() => tokenizePost(post.id)}
                              className="smooth-hover ml-auto text-orange-100/90 hover:text-orange-100 hover:bg-orange-500/15 px-2 py-1 rounded-lg"
                            >
                              ✨ {post.tokenized ? 'NFT' : 'Tokenize'}
                            </button>
                          </div>

                          {post.comments.length > 0 && (
                            <details className="mt-3 text-xs">
                              <summary className="cursor-pointer text-purple-200/70 hover:text-purple-100 smooth-transition">
                                {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                              </summary>
                              <div className="mt-2 space-y-2 rounded-lg glass p-2">
                                {post.comments.map((comment) => (
                                  <div key={comment.id} className="flex gap-2 text-purple-100/85">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-xs font-semibold">
                                      {comment.avatar}
                                    </div>
                                    <div className="flex-1">
                                      <span className="font-semibold">{comment.author}</span>: {comment.body}
                                    </div>
                                  </div>
                                ))}
                                <div className="flex gap-1 pt-2">
                                  <input
                                    value={newComment[post.id] ?? ''}
                                    onChange={(e) => setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))}
                                    placeholder="Reply"
                                    className="flex-1 rounded-lg glass px-2 py-1 text-xs text-purple-100 placeholder:text-purple-100/40 smooth-transition focus:glow-cyan"
                                  />
                                  <button
                                    onClick={() => addComment(post.id)}
                                    className="btn-secondary"
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}

                  <div className="border-t border-purple-300/20 p-4 text-center text-xs text-purple-200/60">
                    {isFetchingMore ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Loading more reflections...</span>
                      </div>
                    ) : hasMore ? (
                      'Scroll for more'
                    ) : (
                      'End of feed'
                    )}
                  </div>
                </section>
              )}

              {activeTab === 'explore' && (
                <section className="space-y-0 divide-y divide-purple-300/20">
                  <div className="border-b border-purple-300/20 px-4 py-4 glass-sm">
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search memes, coins, KOLs"
                      className="w-full rounded-full glass px-4 py-3 text-sm text-purple-100 placeholder:text-purple-100/40 smooth-transition focus:glow-cyan"
                    />
                  </div>

                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="border-b border-r border-purple-300/20 p-4 md:border-b-0">
                      <p className="mb-3 text-xs uppercase tracking-[0.15em] text-purple-100/80">Posts & Memes</p>
                      <div className="space-y-2">
                        {filteredExplore.posts.slice(0, 8).map((post) => (
                          <button
                            key={post.id}
                            onClick={() => setActiveTab('home')}
                            className="card-glass smooth-hover w-full scale-in"
                          >
                            <p className="text-xs font-semibold text-purple-100">{post.author}</p>
                            <p className="text-xs text-purple-100/75">{post.content.slice(0, 80)}...</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-b border-purple-300/20 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.15em] text-orange-100/80">Trending Coins</p>
                      <div className="space-y-2">
                        {filteredExplore.coins.map((coin) => (
                          <button
                            key={coin.ticker}
                            className="card-glass smooth-hover w-full scale-in"
                          >
                            <p className="text-xs font-semibold text-orange-100">${coin.ticker}</p>
                            <p className="text-xs text-orange-100/70">{coin.marketCap}</p>
                            <p className="text-xs text-orange-100/60">Velocity: {coin.socialVelocity}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'post' && (
                <section className="space-y-4 p-4">
                  <div className="card-glass">
                    <p className="text-lg text-orange-100 font-semibold">Create and Tokenize</p>
                  </div>
                  <div className="space-y-3 glass rounded-2xl p-4">
                    <textarea
                      rows={4}
                      value={composer.content}
                      onChange={(e) => setComposer((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="What's happening?!"
                      className="w-full glass rounded-xl px-3 py-2 text-sm text-purple-50 placeholder:text-purple-100/40 smooth-transition focus:glow-purple"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        value={composer.image}
                        onChange={(e) => setComposer((prev) => ({ ...prev, image: e.target.value }))}
                        placeholder="Image caption"
                        className="glass rounded-xl px-3 py-2 text-sm text-purple-50 placeholder:text-purple-100/40 smooth-transition focus:glow-purple"
                      />
                      <input
                        value={composer.coin}
                        onChange={(e) => setComposer((prev) => ({ ...prev, coin: e.target.value }))}
                        placeholder="Coin ticker"
                        className="glass rounded-xl px-3 py-2 text-sm text-purple-50 placeholder:text-purple-100/40 smooth-transition focus:glow-purple"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={submitPost}
                        className="btn-primary flex-1"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => setComposer({ content: '', image: '', coin: '' })}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'trending' && (
                <section className="space-y-0 divide-y divide-purple-300/20 p-4">
                  <div className="mb-4 pb-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.15em] text-orange-100/80">Coin Metrics</p>
                    <div className="grid gap-2 md:grid-cols-2">
                      {coinStats.map((coin) => (
                        <div
                          key={coin.ticker}
                          className="card-glass scale-in"
                        >
                          <p className="font-semibold text-orange-100">${coin.ticker}</p>
                          <p className="text-xs text-orange-100/70">Vol: {coin.volume24h}</p>
                          <p className="text-xs text-orange-100/70">Cap: {coin.marketCap}</p>
                          <p className="text-xs text-orange-100/60 mt-1">Velocity: {coin.socialVelocity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.15em] text-cyan-100/80">Top KOLs</p>
                    <div className="grid gap-2 md:grid-cols-2">
                      {kolDirectory.map((kol) => (
                        <div
                          key={kol.id}
                          className="card-glass scale-in"
                        >
                          <p className="font-semibold text-cyan-100">{kol.name}</p>
                          <p className="text-xs text-cyan-100/70">{kol.followers} followers</p>
                          <p className="text-xs text-cyan-100/70">Engagement: {kol.engagement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'marketplace' && (
                <section className="space-y-0 divide-y divide-purple-300/20">
                  <div className="border-b border-purple-300/20 px-4 py-4 glass-sm">
                    <p className="mb-3 text-xs uppercase tracking-[0.15em] text-purple-100/80">X Username Verification</p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        value={xUsername}
                        onChange={(e) => setXUsername(e.target.value)}
                        placeholder="@username"
                        className="flex-1 glass rounded-full px-4 py-2 text-sm text-purple-50 placeholder:text-purple-100/40 smooth-transition focus:glow-purple"
                      />
                      <button
                        onClick={verifyX}
                        disabled={isCheckingX}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCheckingX ? '...' : 'Verify'}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-purple-100/75">Status: {xVerified ? '✓ Verified' : '○ Pending'}</p>
                  </div>

                  <div className="p-4">
                    <div className="mb-4 flex gap-2">
                      <button
                        onClick={() => setMarketView('creators')}
                        className={`btn-premium px-4 py-2 text-xs uppercase tracking-[0.15em] ${
                          marketView === 'creators'
                            ? 'border border-purple-300/70 bg-purple-500/20 text-purple-100'
                            : 'border border-purple-300/25 text-purple-200/75'
                        }`}
                      >
                        Creators
                      </button>
                      <button
                        onClick={() => setMarketView('kols')}
                        className={`btn-premium px-4 py-2 text-xs uppercase tracking-[0.15em] ${
                          marketView === 'kols'
                            ? 'border border-cyan-300/70 bg-cyan-500/20 text-cyan-100'
                            : 'border border-cyan-300/25 text-cyan-200/75'
                        }`}
                      >
                        Projects
                      </button>
                    </div>

                    {marketView === 'creators' && (
                      <div className="space-y-3">
                        {kolDirectory.map((kol) => (
                          <div key={kol.id} className="card-glass scale-in">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold text-purple-100">
                                  {kol.name} {kol.verified ? '✓' : ''}
                                </p>
                                <p className="text-xs text-purple-100/70">{kol.handle}</p>
                                <p className="text-xs text-purple-100/60">{kol.niche}</p>
                              </div>
                              <button onClick={() => requestKol(kol)} className="btn-primary px-3 py-2 text-xs">
                                Request
                              </button>
                            </div>
                            <div className="mt-3 grid gap-1 text-xs text-purple-100/70">
                              <p>{kol.followers} followers • {kol.engagement} engagement</p>
                              <p>Success: {kol.successRate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {marketView === 'kols' && (
                      <div className="space-y-3">
                        {founderProjects.map((project) => (
                          <div key={project.id} className="card-glass scale-in">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold text-cyan-100">{project.project}</p>
                                <p className="text-xs text-cyan-100/70">
                                  {project.founder} ({project.handle})
                                </p>
                                <p className="text-xs text-cyan-100/60">{project.category}</p>
                              </div>
                              <button onClick={() => endorseProject(project)} className="btn-primary px-3 py-2 text-xs">
                                Endorse
                              </button>
                            </div>
                            <div className="mt-3 grid gap-1 text-xs text-cyan-100/70">
                              <p>{project.traction} • {project.stage}</p>
                              <p>Budget: {project.budget}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeTab === 'profile' && (
                <section className="space-y-0 divide-y divide-purple-300/20">
                  <div className="border-b border-purple-300/20 px-4 py-4">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 rounded-full border border-cyan-300/60 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-2xl font-semibold text-cyan-100">
                        {myProfile.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-purple-100">{myProfile.name}</p>
                        <p className="text-sm text-purple-100/60">{myProfile.handle}</p>
                        <p className="mt-2 text-sm text-purple-100/75">{myProfile.bio}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.15em] text-purple-100/80">Edit Profile</p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={myProfile.avatar}
                          onChange={(e) => setMyProfile((prev) => ({ ...prev, avatar: e.target.value.slice(0, 2) }))}
                          placeholder="Avatar (emoji or 1-2 chars)"
                          maxLength={2}
                          className="glass w-16 rounded-lg px-3 py-2 text-center text-sm text-purple-100 smooth-transition focus:glow-purple"
                        />
                        <input
                          value={myProfile.name}
                          onChange={(e) => setMyProfile((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Name"
                          className="glass flex-1 rounded-lg px-3 py-2 text-sm text-purple-100 smooth-transition focus:glow-purple"
                        />
                      </div>
                      <textarea
                        value={myProfile.bio}
                        onChange={(e) => setMyProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="Bio"
                        rows={3}
                        className="glass w-full rounded-lg px-3 py-2 text-sm text-purple-100 smooth-transition focus:glow-purple"
                      />
                      <button onClick={saveProfile} className="btn-primary w-full">
                        Save Profile
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.15em] text-cyan-100/80">Following</p>
                    <div className="space-y-2">
                      {kolDirectory.map((kol) => (
                        <div key={kol.id} className="flex items-center justify-between glass rounded-lg p-3 smooth-transition hover:bg-cyan-500/5">
                          <div className="flex-1 cursor-pointer" onClick={() => selectKol(kol)}>
                            <p className="text-sm font-semibold text-cyan-100">{kol.name}</p>
                            <p className="text-xs text-cyan-100/70">{kol.handle}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => investInKol(kol)}
                              className="btn-secondary px-2 py-1 text-xs"
                              title="Invest in this KOL"
                            >
                              💰
                            </button>
                            <button
                              onClick={() => toggleFollow(kol.handle)}
                              className="btn-secondary px-3 py-1 text-xs"
                            >
                              {following[kol.handle] ? '✓' : '+'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'pulse' && <Pulse />}
            </div>
          </div>
        </main>
      </div>

      <TrendingPanel
        coinStats={coinStats}
        kolDirectory={kolDirectory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        following={following}
        setFollowing={setFollowing}
      />

      <MobileNav activeTab={activeTab} setActiveTab={(tab) => {
        setTabTransition(true)
        setActiveTab(tab)
        if (contentRef.current) {
          contentRef.current.scrollTop = 0
        }
        setTimeout(() => setTabTransition(false), 100)
      }} />

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 scale-in rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
          {toast}
        </div>
      )}
      </div>
    </div>
  )
}

export default App
