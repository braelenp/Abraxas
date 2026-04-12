import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, Flame, Sparkles, FileText, ArrowRight, Shield, Zap, Wind, Eye, Newspaper, MessageCircle } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';
import { OracleEngine } from '../components/OracleEngine';
import { DaughterPage, type DaughterConfig } from './DaughterPage';
import { useAbraBalance } from '../hooks/useAbraBalance';
import { AcademyWhitelistModal } from '../components/AcademyWhitelistModal';

// Breaking Signals mock data (imported from MarketPage data structure)
type BreakingSignal = {
  id: string;
  title: string;
  source: 'Solana' | 'Blockworks' | 'Bags' | 'Polymarket' | 'CoinDesk' | 'DeFi Protocol';
  timestamp: string;
  snippet: string;
  category: 'dapp_equity' | 'rwa' | 'gaming' | 'defi' | 'market';
};

const breakingSignals: BreakingSignal[] = [
  {
    id: 'signal-1',
    title: 'Pulse Gaming Protocol Reaches $500M TVL Milestone',
    source: 'Solana',
    timestamp: '2 hours ago',
    snippet: `DApp equity tokenization demonstrates strong institutional adoption as Sophia's Family protocols scale across gaming, music, and real estate layers.`,
    category: 'dapp_equity',
  },
  {
    id: 'signal-2',
    title: 'Ethereum RWA Market Gap Analysis: $2.3T Opportunity',
    source: 'Blockworks',
    timestamp: '4 hours ago',
    snippet: 'Real-world assets remain significantly underrepresented on blockchain infrastructure despite regulatory clarity.',
    category: 'rwa',
  },
  {
    id: 'signal-3',
    title: 'Bags DEX Volume Peak: $1.2B in 24hr Trading',
    source: 'Bags',
    timestamp: '6 hours ago',
    snippet: 'Token liquidity pools experience sustained growth as institutional traders adopt decentralized market structure.',
    category: 'market',
  },
  {
    id: 'signal-4',
    title: 'Polymarket Bitcoin ATH Prediction: $145K by Q3 2026',
    source: 'Polymarket',
    timestamp: '8 hours ago',
    snippet: 'Prediction markets signal bullish sentiment on macro Bitcoin thesis with $890M notional volume.',
    category: 'market',
  },
  {
    id: 'signal-5',
    title: 'Music Rights RWA Pilot Launched on Solana',
    source: 'CoinDesk',
    timestamp: '12 hours ago',
    snippet: 'Independent artists tokenize royalty streams, creating new liquidity access for IP-backed securities.',
    category: 'rwa',
  },
  {
    id: 'signal-6',
    title: 'CircuitBreaker Threshold Study: DeFi Stability Metrics',
    source: 'DeFi Protocol',
    timestamp: '18 hours ago',
    snippet: 'Research indicates circuit breaker mechanisms reduce cascade liquidations by 47% in volatile markets.',
    category: 'defi',
  },
  {
    id: 'signal-7',
    title: 'Gaming Token Markets Rally: Guild Economy Signals Strength',
    source: 'Blockworks',
    timestamp: '52 minutes ago',
    snippet: 'On-chain gaming guilds reporting 27% QoQ growth in tokenized asset holdings and yield farming participation.',
    category: 'gaming',
  },
];

const RUNE_CONFIG = {
	rune: 'ᚲ',
	runeName: 'Kenaz',
	runeEssence: 'Torch · Capital Forging',
	agentName: 'FORGE',
	lore: 'Kenaz is the rune of transformation. The Forge tokenizes World Labs institutional digital asset management, converting raw capital into dapp equity positions with algorithmic compounding, liquidity, and autonomous market participation. Institutional rigor. Retail accessibility. You do not choose the asset class. The one that burns for you reveals itself.',
	ctaLabel: 'Enter the Forge',
	coreGlow: '234, 88, 12',
	fireGlow: '251, 191, 36',
	accentClass: 'text-orange-300',
} as const;

const STEPS = [
	{ n: 1, label: 'Upload asset proof' },
	{ n: 2, label: 'Self-attestation' },
	{ n: 3, label: 'Mint La Casa NFT' },
	{ n: 4, label: 'Auto-deposit into Sophia vault' },
];

// Daughter Configurations
const DAUGHTER_CONFIGS: Record<string, DaughterConfig> = {
	echo: {
		name: 'Echo',
		subtitle: 'Sovereign of Sound',
		headerReveal: 'Welcome to the frequency.',
		description: 'Music Rights & Media',
		lore: 'Echo tokenizes music rights, publishing royalties, and media IP. Fractional ownership of streaming revenue, publishing catalogs, and creator equity becomes on-chain La Casa NFTs. Artists, producers, and investors now share the harvest together.',
		accentColor: 'orange',
		icon: '📻',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Music Rights',
				desc: 'Submit publishing agreements, recordings, and royalty contracts',
				icon: '📋',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable copyright provenance',
				icon: '♪',
			},
			{
				step: 3,
				label: 'Distribute Yields',
				desc: 'Auto-compound streaming revenues, mechanical royalties, sync fees',
				icon: '🏆',
			},
		],
		features: [
			{
				title: 'Fractional Ownership',
				description: 'Own shares of music catalogs and publishing rights',
				icon: '🎵',
			},
			{
				title: 'Royalty Streaming',
				description: 'Real-time distribution of streaming revenue on-chain',
				icon: '💰',
			},
			{
				title: 'Creator Equity',
				description: 'Artists tokenize their stake in their work',
				icon: '🎤',
			},
			{
				title: 'Liquidity & Yield',
				description: 'Trade music IP in DeFi or earn APY',
				icon: '📊',
			},
		],
		assetClasses: [
			{ name: 'Master Recordings', desc: 'Sound recordings and production masters', icon: '🎧' },
			{ name: 'Publishing Rights', desc: 'Composition and songwriter IP', icon: '📜' },
			{ name: 'Royalty Streams', desc: 'Mechanical, performance, and sync royalties', icon: '💳' },
			{ name: 'Artist Catalogs', desc: 'Complete discographies and back catalogs', icon: '🎸' },
			{ name: 'Producer Credits', desc: 'Production fees and studio equity', icon: '🎚️' },
			{ name: 'Sync Licensing', desc: 'Film, TV, and advertising rights', icon: '🎬' },
		],
		dappUrl: 'https://echo-pied-phi.vercel.app/',
		dappLabel: 'Enter Echo',
	},
	pulse: {
		name: 'Pulse',
		subtitle: 'Guardian of Gameplay',
		headerReveal: 'Welcome to the arena.',
		description: 'Gaming Clips & Live Streams',
		lore: 'Pulse tokenizes gaming clips, esports tournaments, and streamer content. Fractional ownership of tournament franchises, content rights, and player equity becomes on-chain La Casa NFTs. Gamers and investors now own the victories.',
		accentColor: 'cyan',
		icon: '⚡',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Gaming Assets',
				desc: 'Submit tournament clips, streams, and player contracts',
				icon: '🎮',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable esports provenance',
				icon: '🏅',
			},
			{
				step: 3,
				label: 'Generate Tournament Yield',
				desc: 'Auto-compound sponsorship, prize pools, and viewership revenue',
				icon: '💎',
			},
		],
		features: [
			{
				title: 'Esports Franchises',
				description: 'Own shares of gaming teams and tournaments',
				icon: '🏆',
			},
			{
				title: 'Streamer Equity',
				description: 'Creators tokenize their channel ownership',
				icon: '📹',
			},
			{
				title: 'Content Revenue',
				description: 'Sponsorships and ad revenue distributed on-chain',
				icon: '💰',
			},
			{
				title: 'Player Staking',
				description: 'Athletes stake earnings and build personal brands',
				icon: '⭐',
			},
		],
		assetClasses: [
			{ name: 'Tournament Franchises', desc: 'League teams and esports organizations', icon: '🎯' },
			{ name: 'Content Rights', desc: 'Gaming clips and stream archives', icon: '📺' },
			{ name: 'Player Contracts', desc: 'Pro players and content creator equity', icon: '🎪' },
			{ name: 'Sponsorship Deals', desc: 'Brand partnerships and revenue rights', icon: '🤝' },
			{ name: 'Premium Channels', desc: 'Exclusive streaming licenses', icon: '🔐' },
			{ name: 'Gaming Guilds', desc: 'Decentralized gaming communities', icon: '⚔️' },
		],
		dappUrl: 'https://pulse-eta-three.vercel.app/',
		dappLabel: 'Enter Pulse',
	},
	aurelia: {
		name: 'Aurelia',
		subtitle: 'Sovereign of Structures',
		headerReveal: 'Welcome to the foundation.',
		description: 'Real Estate & Development',
		lore: 'Aurelia tokenizes real estate, development rights, and property equity. Fractional ownership of commercial buildings, land development projects, and rental income becomes on-chain La Casa NFTs. Real property now lives in digital sovereignty.',
		accentColor: 'amber',
		icon: '🏛️',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Property Docs',
				desc: 'Submit deeds, appraisals, and development permits',
				icon: '🏠',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable property records',
				icon: '🔑',
			},
			{
				step: 3,
				label: 'Deploy Rental Yield',
				desc: 'Auto-compound rental income, appreciation, and development upside',
				icon: '🏢',
			},
		],
		features: [
			{
				title: 'Fractional Properties',
				description: 'Own equity shares in commercial and residential real estate',
				icon: '🏘️',
			},
			{
				title: 'Rental Income Streams',
				description: 'Automated rent collection and distribution on-chain',
				icon: '💵',
			},
			{
				title: 'Development Rights',
				description: 'Tokenize future development and appreciation potential',
				icon: '🏗️',
			},
			{
				title: 'REITs & Fund Access',
				description: 'Large property portfolios as liquid tokens',
				icon: '📊',
			},
		],
		assetClasses: [
			{ name: 'Commercial Properties', desc: 'Office, retail, and industrial buildings', icon: '🏢' },
			{ name: 'Residential Units', desc: 'Apartments, condos, and single-family homes', icon: '🏠' },
			{ name: 'Land Development', desc: 'Vacant land and development rights', icon: '🌍' },
			{ name: 'REITs', desc: 'Real Estate Investment Trust shares', icon: '📈' },
			{ name: 'Mortgages', desc: 'Income from mortgage-backed securities', icon: '📋' },
			{ name: 'Hotel Assets', desc: 'Hospitality properties and booking rights', icon: '🏨' },
		],
		dappUrl: 'https://aurelia-tau.vercel.app/',
		dappLabel: 'Enter Aurelia',
	},
	vein: {
		name: 'Vein',
		subtitle: 'Sovereign of the Deep',
		headerReveal: 'Welcome to the mineral reserves.',
		description: 'Minerals & Natural Resources',
		lore: 'Vein tokenizes mineral rights, precious metals, and natural resource extraction. Fractional ownership of mining operations, commodity futures, and resource reserves becomes on-chain La Casa NFTs. The earth now yields to algorithmic sovereignty.',
		accentColor: 'purple',
		icon: '⛏️',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Mining Permits',
				desc: 'Submit extraction rights, geological surveys, and reserve reports',
				icon: '📊',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable mineral provenance',
				icon: '💎',
			},
			{
				step: 3,
				label: 'Generate Commodity Yield',
				desc: 'Auto-compound extraction revenues, commodity prices, and reserve appreciation',
				icon: '⛓️',
			},
		],
		features: [
			{
				title: 'Mineral Rights',
				description: 'Own extraction equity from mining operations',
				icon: '⛏️',
			},
			{
				title: 'Commodity Hedging',
				description: 'Price-indexed yield for precious metals and minerals',
				icon: '📈',
			},
			{
				title: 'Reserve Appreciation',
				description: 'Benefit from resource scarcity and long-term value',
				icon: '💰',
				},
			{
				title: 'Supply Chain Tracking',
				description: 'Immutable provenance from extraction to market',
				icon: '🔗',
			},
		],
		assetClasses: [
			{ name: 'Gold & Precious Metals', desc: 'Bullion and mining operations', icon: '🥇' },
			{ name: 'Rare Earths', desc: 'Critical minerals for technology', icon: '✨' },
			{ name: 'Lithium & Cobalt', desc: 'Battery metals and energy storage', icon: '🔋' },
			{ name: 'Oil & Gas Rights', desc: 'Energy commodity extraction', icon: '🛢️' },
			{ name: 'Agricultural Land', desc: 'Farmland and commodity production', icon: '🌾' },
			{ name: 'Commodity Futures', desc: 'Forward contracts and hedging', icon: '📊' },
		],
		dappUrl: 'https://vein-delta.vercel.app/',
		dappLabel: 'Enter Vein',
	},
	verdant: {
		name: 'Verdant',
		subtitle: 'Sovereign of Sustainability',
		headerReveal: 'Welcome to the living world.',
		description: 'Carbon & Environmental Assets',
		lore: 'Verdant tokenizes carbon credits, renewable energy, and environmental assets. Fractional ownership of wind farms, solar installations, and carbon offsets becomes on-chain La Casa NFTs. The planet now yields yield.',
		accentColor: 'emerald',
		icon: '🌿',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Environmental Assets',
				desc: 'Submit carbon credits, renewable permits, and impact reports',
				icon: '📜',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable environmental provenance',
				icon: '🌱',
			},
			{
				step: 3,
				label: 'Generate Green Yields',
				desc: 'Auto-compound carbon credits, renewable energy revenue, and impact premiums',
				icon: '♻️',
			},
		],
		features: [
			{
				title: 'Renewable Energy',
				description: 'Own solar, wind, and hydro power generation',
				icon: '⚡',
			},
			{
				title: 'Carbon Credits',
				description: 'Tokenized verified carbon offsets with impact tracking',
				icon: '🍃',
			},
			{
				title: 'Impact Yield',
				description: 'Environmental returns + ESG premium valuations',
				icon: '🌍',
			},
			{
				title: 'Biodiversity Rights',
				description: 'Ecosystem recovery and conservation equity',
				icon: '🦋',
			},
		],
		assetClasses: [
			{ name: 'Solar Farms', desc: 'Photovoltaic installations and generation rights', icon: '☀️' },
			{ name: 'Wind Turbines', desc: 'Wind energy production and capacity', icon: '💨' },
			{ name: 'Hydroelectric', desc: 'Water power and dam operations', icon: '💧' },
			{ name: 'Carbon Credits', desc: 'Verified offsets and permits', icon: '🌫️' },
			{ name: 'Forest Conservation', desc: 'Reforestation and biodiversity projects', icon: '🌲' },
			{ name: 'Green Bonds', desc: 'Sustainable project financing', icon: '📈' },
		],
		dappUrl: 'https://verdant-puce.vercel.app/',
		dappLabel: 'Enter Verdant',
	},
	nautica: {
		name: 'Nautica',
		subtitle: 'Sovereign of the Seas',
		headerReveal: 'Welcome to the next degree.',
		description: 'Yachts & Luxury Maritime',
		lore: 'Nautica tokenizes yachts and luxury maritime assets. Fractional ownership, charter rights, and high-value physical assets become on-chain La Casa NFTs. The species now claims the oceans.',
		accentColor: 'blue',
		icon: '⛵',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Yacht Docs',
				desc: 'Submit vessel registration, titles, and ownership proof',
				icon: '📋',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable maritime provenance',
				icon: '🚢',
			},
			{
				step: 3,
				label: 'Deploy Charter Yield',
				desc: 'Auto-compound charter revenues, appreciation, and maritime income',
				icon: '🏆',
			},
		],
		features: [
			{
				title: 'Fractional Ownership',
				description: 'Democratize superyacht access through tokenized shares',
				icon: '🌊',
			},
			{
				title: 'Charter Revenue Streams',
				description: 'Automate income distribution from charter bookings on-chain',
				icon: '💰',
			},
			{
				title: 'Provenance Tracking',
				description: 'Immutable maritime records certified on-chain',
				icon: '⚓',
			},
			{
				title: 'Liquidity & Yield',
				description: 'Trade fractional yacht equity in DeFi or earn APY',
				icon: '📊',
			},
		],
		assetClasses: [
			{ name: 'Superyachts', desc: '100+ meters luxury vessels', icon: '🛥️' },
			{ name: 'Motor Yachts', desc: 'Performance and comfort craft', icon: '⛵' },
			{ name: 'Sailing Yachts', desc: 'Classic and modern sailcraft', icon: '🎐' },
			{ name: 'Charter Boats', desc: 'Commercial rental fleets', icon: '🚤' },
			{ name: 'Cargo Vessels', desc: 'Maritime trade assets', icon: '🚢' },
			{ name: 'Marina Rights', desc: 'Berthing and docking equity', icon: '⛵' },
		],
		dappUrl: 'https://nautica-five.vercel.app/',
		dappLabel: 'Enter Nautica',
	},
	eir: {
		name: 'Eir',
		subtitle: 'Healer of the Species',
		headerReveal: 'Welcome to the next degree.',
		description: 'Healthcare & Biotech Assets',
		lore: 'Eir tokenizes healthcare assets, medical data sovereignty, wellness protocols, and biotech innovations. Patient-owned records, tokenized treatments, fractional ownership of clinics, and regenerative health become on-chain La Casa NFTs. The species now claims the body, the healing arts, and the future of medicine.',
		accentColor: 'emerald',
		icon: '💚',
		flowSteps: [
			{
				step: 1,
				label: 'Upload Medical Assets',
				desc: 'Submit healthcare contracts, biotech IP, and clinic documentation',
				icon: '📋',
			},
			{
				step: 2,
				label: 'Mint La Casa NFT',
				desc: 'On-chain tokenization with immutable medical provenance',
				icon: '🏥',
			},
			{
				step: 3,
				label: 'Deploy Wellness Yield',
				desc: 'Auto-compound treatment revenues, clinic profits, and biotech innovations',
				icon: '🏆',
			},
		],
		features: [
			{
				title: 'Patient Data Sovereignty',
				description: 'Own and monetize your medical records on-chain',
				icon: '📊',
			},
			{
				title: 'Clinic Fractionalisation',
				description: 'Tokenize ownership of healthcare providers and facilities',
				icon: '🏥',
			},
			{
				title: 'Biotech Innovation Equity',
				description: 'Invest in pharmaceutical and wellness protocols',
				icon: '🧬',
			},
			{
				title: 'Regenerative Health',
				description: 'Earn yields from wellness and longevity services',
				icon: '💚',
			},
		],
		assetClasses: [
			{ name: 'Medical Data', desc: 'Patient records and health identity', icon: '📋' },
			{ name: 'Clinic Equity', desc: 'Fractional ownership of healthcare facilities', icon: '🏥' },
			{ name: 'Treatment Protocols', desc: 'Approved medical procedures and therapies', icon: '⚕️' },
			{ name: 'Biotech IP', desc: 'Pharmaceutical and regenerative health patents', icon: '🧬' },
			{ name: 'Insurance Pools', desc: 'Decentralized health insurance products', icon: '🛡️' },
			{ name: 'Wellness Services', desc: 'Preventative care and longevity programs', icon: '🧘' },
		],
		dappUrl: 'https://eir-theta.vercel.app/',
		dappLabel: 'Enter Eir',
	},
		skadi: {
			name: 'Skaði',
			subtitle: 'Guardian of Velocity',
			headerReveal: 'Welcome to the velocity.',
			description: 'Luxury Mobility & Performance',
			lore: 'Skaði tokenizes jets, aircraft, and high-performance vehicles. Fractional ownership of supercars, private aviation, and speed-racing assets becomes on-chain La Casa NFTs. The species now claims the skies and conquers velocity.',
			accentColor: 'amber',
			icon: '✈️',
			flowSteps: [
				{
					step: 1,
					label: 'Upload Vehicle Docs',
					desc: 'Submit aircraft registrations, vehicle titles, and performance certifications',
					icon: '📋',
				},
				{
					step: 2,
					label: 'Mint La Casa NFT',
					desc: 'On-chain tokenization with immutable vehicle provenance',
					icon: '🏎️',
				},
				{
					step: 3,
					label: 'Deploy Velocity Yield',
					desc: 'Auto-compound charter fees, rental income, and appreciation gains',
					icon: '🏆',
				},
			],
			features: [
				{
					title: 'Fractional Aircraft',
					description: 'Own equity shares in jets and luxury aircraft',
					icon: '✈️',
				},
				{
					title: 'Supercar Ownership',
					description: 'Democratize access to high-performance vehicles',
					icon: '🏎️',
				},
				{
					title: 'Charter Revenue',
					description: 'Earn from aircraft charters and vehicle rentals on-chain',
					icon: '💰',
				},
				{
					title: 'Performance Equity',
					description: 'Stake racing teams, speed records, and velocity assets',
					icon: '⚡',
				},
			],
			assetClasses: [
				{ name: 'Jets & Aircraft', desc: 'Private aviation and commercial aircraft', icon: '✈️' },
				{ name: 'Supercars', desc: 'High-performance luxury vehicles', icon: '🏎️' },
				{ name: 'Performance Vehicles', desc: 'Racing cars and exotic automobiles', icon: '🚗' },
				{ name: 'Aviation Charter Rights', desc: 'Flight hours and charter equity', icon: '✈️' },
				{ name: 'Maintenance Assets', desc: 'Service centers and technical facilities', icon: '🔧' },
				{ name: 'Racing Teams', desc: 'Motorsport franchises and driver equity', icon: '🏁' },
			],
			dappUrl: 'https://your-skadi-dapp-url.com/',
			dappLabel: 'Enter Skaði',
		},
		freyja: {
			name: 'Freyja',
			subtitle: 'The Golden Sovereign',
			headerReveal: 'Welcome to golden grace.',
			description: 'Luxury Collectibles & Fine Goods',
			lore: 'Freyja tokenizes watches, wine, fine art, and investment-grade luxury collectibles. Fractional ownership of timepieces, rare spirits, and museum-quality artifacts becomes on-chain La Casa NFTs. The species now claims beauty, rarity, and timeless value.',
			accentColor: 'amber',
			icon: '👑',
			flowSteps: [
				{
					step: 1,
					label: 'Upload Collectible Docs',
					desc: 'Submit authentication certificates, appraisals, and provenance records',
					icon: '📋',
				},
				{
					step: 2,
					label: 'Mint La Casa NFT',
					desc: 'On-chain tokenization with immutable collectible provenance',
					icon: '✨',
				},
				{
					step: 3,
					label: 'Generate Luxury Yield',
					desc: 'Auto-compound appreciation, auction gains, and exclusive access fees',
					icon: '🏆',
				},
			],
			features: [
				{
					title: 'Timepiece Fractionalisation',
					description: 'Own shares of rare watches and luxury timepieces',
					icon: '⌚',
				},
				{
					title: 'Wine & Spirits Trading',
					description: 'Invest in fine wines, rare spirits, and vintage collections',
					icon: '🍷',
				},
				{
					title: 'Fine Art & Artifacts',
					description: 'Fractional ownership of museum-quality art pieces',
					icon: '🎨',
				},
				{
					title: 'Collectible Appreciation',
					description: 'Earn from scarcity premium and luxury market growth',
					icon: '📈',
				},
			],
			assetClasses: [
				{ name: 'Luxury Watches', desc: 'Rolex, Patek Philippe, Audemars Piguet, etc.', icon: '⌚' },
				{ name: 'Rare Wines', desc: 'Vintage wines and rare collectible bottles', icon: '🍷' },
				{ name: 'Spirits & Distillery', desc: 'Premium whiskey, cognac, and aged spirits', icon: '🥃' },
				{ name: 'Fine Art', desc: 'Paintings, sculptures, and museum pieces', icon: '🎨' },
				{ name: 'Jewelry & Gems', desc: 'Diamonds, precious metals, and heirloom pieces', icon: '💎' },
				{ name: 'Rare Memorabilia', desc: 'Collectible artifacts and historical pieces', icon: '🖼️' },
			],
			dappUrl: 'https://your-freyja-dapp-url.com/',
			dappLabel: 'Enter Freyja',
		},
		gaia: {
			name: 'Gaia',
			subtitle: 'The Botanical Sovereign',
			headerReveal: 'Welcome to regeneration.',
			description: 'Botanical & Cannabis Assets',
			lore: 'Gaia tokenizes cannabis, medicinal plants, and regenerative agricultural assets. Fractional ownership of cultivation licenses, seed genetics, processing facilities, and botanical intellectual property becomes on-chain La Casa NFTs. The species now claims the botanical kingdom and its healing potential.',
			accentColor: 'emerald',
			icon: '🌱',
			flowSteps: [
				{
					step: 1,
					label: 'Upload Botanical Docs',
					desc: 'Submit cultivation licenses, genetics documentation, and compliance records',
					icon: '📋',
				},
				{
					step: 2,
					label: 'Mint La Casa NFT',
					desc: 'On-chain tokenization with immutable botanical provenance',
					icon: '🌿',
				},
				{
					step: 3,
					label: 'Deploy Agricultural Yield',
					desc: 'Auto-compound harvest revenues, licensing fees, and IP royalties',
					icon: '🏆',
				},
			],
			features: [
				{
					title: 'Cannabis Cultivation',
					description: 'Own licensed grow operations and processing facilities',
					icon: '🌿',
				},
				{
					title: 'Seed Genetics IP',
					description: 'Monetize proprietary seed genetics and strain innovations',
					icon: '🧬',
				},
				{
					title: 'Medicinal Protocols',
					description: 'Tokenize medical research and therapeutic applications',
					icon: '⚕️',
				},
				{
					title: 'Regenerative Agriculture',
					description: 'Earn from sustainable farming and carbon-neutral operations',
					icon: '🌍',
				},
			],
			assetClasses: [
				{ name: 'Cannabis Cultivation', desc: 'Licensed grow operations and farms', icon: '🌿' },
				{ name: 'Seed Genetics', desc: 'Proprietary strains and genetic IP', icon: '🧬' },
				{ name: 'Processing Facilities', desc: 'Extraction and product manufacturing', icon: '⚙️' },
				{ name: 'Medicinal IP', desc: 'Research, licensing, and therapeutic patents', icon: '⚕️' },
				{ name: 'Distribution Networks', desc: 'Retail partnerships and supply chains', icon: '🚚' },
				{ name: 'Regenerative Land', desc: 'Carbon-neutral farming and sustainability assets', icon: '🌍' },
			],
			dappUrl: 'https://your-gaia-dapp-url.com/',
			dappLabel: 'Enter Gaia',
		},
	};

	// Sons of Sophia (Infrastructure Providers) Configurations
	const SON_CONFIGS: Record<string, DaughterConfig> = {
		genesis: {
			name: 'Genesis',
			subtitle: 'The Prime Foundation',
			headerReveal: 'Welcome to the genesis.',
			description: 'The Prime Foundation',
			lore: 'Genesis is the foundational provider—the bedrock upon which Sophia\'s entire infrastructure rests. It manages the capital pools, treasury operations, and institutional-grade liquidity mechanisms that power all tokenization flows. Genesis does not tokenize. Genesis enables everything else.',
			accentColor: 'orange',
			icon: '🔥',
			flowSteps: [
				{
					step: 1,
					label: 'Seed Capital Pools',
					desc: 'Deploy institutional liquidity and treasury reserves',
					icon: '💳',
				},
				{
					step: 2,
					label: 'Algorithmic Distribution',
					desc: 'Smart contracts route capital via optimized mechanisms',
					icon: '⚙️',
				},
				{
					step: 3,
					label: 'Yield Aggregation',
					desc: 'Compound and redistribute returns across the ecosystem',
					icon: '📈',
				},
			],
			features: [
				{
					title: 'Capital Pools',
					description: 'Access to institutional liquidity for all tokenization',
					icon: '💰',
				},
				{
					title: 'Yield Distribution',
					description: 'Automated returns routing to all providers',
					icon: '📊',
				},
				{
					title: 'Treasury Management',
					description: 'Multi-signature governance over all reserves',
					icon: '🏛️',
				},
				{
					title: 'Emergency Circuits',
					description: 'Fail-safes and circuit breakers for crisis events',
					icon: '🔐',
				},
			],
			assetClasses: [
				{ name: 'Liquidity Pools', desc: 'DEX and lending protocol reserves', icon: '💧' },
				{ name: 'Treasury Assets', desc: 'Institutional reserves and holdings', icon: '💎' },
				{ name: 'Yield Mechanisms', desc: 'Staking, farming, and protocol fees', icon: '📈' },
				{ name: 'Capital Allocation', desc: 'Strategic deployment across ecosystem', icon: '🎯' },
				{ name: 'Risk Buffers', desc: 'Emergency reserves and insurance pools', icon: '🛡️' },
				{ name: 'Governance Treasury', desc: 'DAO-controlled multi-sig wallets', icon: '🔑' },
			],
			dappUrl: 'https://genesis-seven-self.vercel.app/',
			dappLabel: 'Enter Genesis',
		},
	valkyr: {
		name: 'Valkyr',
		subtitle: 'The Wise Guardian',
		headerReveal: 'Welcome to the vigilance.',
		description: 'The Wise Guardian',
		lore: 'Valkyr is the guardian of protocol integrity. It manages permissions, access controls, and administrative governance across all Sophia infrastructure. Valkyr ensures only verified participants interact with La Casa NFTs and that institutional standards are maintained at every touchpoint.',
		accentColor: 'purple',
		icon: '🛡️',
		flowSteps: [
			{
				step: 1,
				label: 'Permission Framework',
				desc: 'Role-based access controls and credential systems',
				icon: '🔐',
			},
			{
				step: 2,
				label: 'KYC/AML Integration',
				desc: 'Institutional verification and compliance workflows',
				icon: '✓',
			},
			{
				step: 3,
				label: 'Governance Execution',
				desc: 'Multi-sig treasury operations and protocol decisions',
				icon: '⚖️',
			},
		],
		features: [
			{
				title: 'Access Control',
				description: 'Fine-grained permission systems for protocol layers',
				icon: '🔑',
			},
			{
				title: 'Compliance Engine',
				description: 'Automated KYC, AML, and regulatory checks',
				icon: '✅',
			},
			{
				title: 'Multi-Sig Governance',
				description: 'Secure treasury and parameter management',
				icon: '👥',
			},
			{
				title: 'Audit Trail',
				description: 'Immutable governance logs and decision records',
				icon: '📜',
			},
		],
		assetClasses: [
			{ name: 'Access Tokens', desc: 'Role and permission credentials', icon: '🎫' },
			{ name: 'Governance Shares', desc: 'Multi-sig holder positions', icon: '🗳️' },
			{ name: 'Compliance Records', desc: 'KYC/AML verification data', icon: '📋' },
			{ name: 'Safety Vaults', desc: 'Emergency pause mechanisms', icon: '⏸️' },
			{ name: 'Permission Levels', desc: 'Institutional access tiers', icon: '🏛️' },
			{ name: 'Audit Commitments', desc: 'Third-party verification records', icon: '🔍' },
		],
		dappUrl: 'https://valkyr-v1.vercel.app/',
		dappLabel: 'Enter Valkyr',
	},
	raido: {
		name: 'Raido',
		subtitle: 'The Swift Provider',
		headerReveal: 'Welcome to velocity.',
		description: 'The Swift Provider',
		lore: 'Raido accelerates capital velocity across the Abraxas stack. It optimizes transaction throughput, manages swap routing, and ensures minimal slippage in all token exchanges. Raido is speed in service of capital efficiency.',
		accentColor: 'cyan',
		icon: '⚡',
		flowSteps: [
			{
				step: 1,
				label: 'Transaction Routing',
				desc: 'Optimal path discovery for minimal fees and slippage',
				icon: '🗺️',
			},
			{
				step: 2,
				label: 'Execution Engines',
				desc: 'Sub-millisecond trade settlement with atomic guarantees',
				icon: '⚙️',
			},
			{
				step: 3,
				label: 'Settlement Verification',
				desc: 'Finality confirmation and fund reconciliation',
				icon: '✓',
			},
		],
		features: [
			{
				title: 'Flash Swaps',
				description: 'Uncollateralized atomic swaps with settlement finality',
				icon: '⚡',
			},
			{
				title: 'Route Optimization',
				description: 'AI-powered path discovery across liquidity venues',
				icon: '🧠',
			},
			{
				title: 'MEV Protection',
				description: 'Encrypted ordering to prevent sandwich attacks',
				icon: '🔒',
			},
			{
				title: 'Slippage Guarantees',
				description: 'Pre-execution price commitments to prevent loss',
				icon: '💯',
			},
		],
		assetClasses: [
			{ name: 'Liquidity Pools', desc: 'DEX aggregation reserves', icon: '🌊' },
			{ name: 'Swap Routes', desc: 'Multi-hop exchange pathways', icon: '🛣️' },
			{ name: 'Price Feeds', desc: 'Real-time oracle data streams', icon: '📊' },
			{ name: 'AMM Contracts', desc: 'Constant product and stable swap pools', icon: '📈' },
			{ name: 'Bridge Liquidity', desc: 'Cross-chain routing capacity', icon: '🌉' },
			{ name: 'Execution Queue', desc: 'High-speed transaction processing', icon: '⏱️' },
		],
		dappUrl: 'https://raido.vercel.app/',
		dappLabel: 'Enter Raido',
	},
	fenrir: {
		name: 'Fenrir',
		subtitle: 'The Fierce Protector',
		headerReveal: 'Welcome to the fortress.',
		description: 'The Fierce Protector',
		lore: 'Fenrir is the fortress that guards the Abraxas realm. It manages security protocols, detects threats, prevents exploits, and responds to anomalies across all infrastructure layers. Fenrir does not permit vulnerability.',
		accentColor: 'red',
		icon: '💨',
		flowSteps: [
			{
				step: 1,
				label: 'Threat Detection',
				desc: 'Real-time anomaly scoring and pattern recognition',
				icon: '🔍',
			},
			{
				step: 2,
				label: 'Smart Contract Audits',
				desc: 'Automated static analysis and formal verification',
				icon: '✓',
			},
			{
				step: 3,
				label: 'Emergency Response',
				desc: 'Rapid circuit-breaker activation and recovery protocols',
				icon: '🚨',
			},
		],
		features: [
			{
				title: 'Vulnerability Scanning',
				description: 'Continuous monitoring for known and novel attack vectors',
				icon: '🔐',
			},
			{
				title: 'Behavioral Analysis',
				description: 'Machine learning-driven anomaly detection',
				icon: '🧠',
			},
			{
				title: 'Circuit Breakers',
				description: 'Automated protection against liquidation cascades',
				icon: '⏸️',
			},
			{
				title: 'Incident Response',
				description: 'Rapid remediation and forensic capabilities',
				icon: '🚒',
			},
		],
		assetClasses: [
			{ name: 'Security Audits', desc: 'Third-party contract verification', icon: '✓' },
			{ name: 'Insurance Pools', desc: 'Smart contract loss protection', icon: '📋' },
			{ name: 'Threshold Guards', desc: 'Liquidation circuit breakers', icon: '⏸️' },
			{ name: 'Incident Records', desc: 'Security event logs and analysis', icon: '📊' },
			{ name: 'Recovery Funds', desc: 'Emergency capital for exploit remediation', icon: '💰' },
			{ name: 'Monitoring Tools', desc: 'Real-time security dashboards', icon: '📈' },
		],
		dappUrl: 'https://fenrir-teal.vercel.app/',
		dappLabel: 'Enter Fenrir',
	},
	mimir: {
		name: 'Mimir',
		subtitle: 'The Oracle Provider',
		headerReveal: 'Welcome to omniscience.',
		description: 'The Oracle Provider',
		lore: 'Mimir is the oracle that sees all truths. It aggregates data feeds, validates external information, and pipes verified reality into the blockchain. Mimir does not guess—it knows. Every price, every metric, every truth flows through Mimir.',
		accentColor: 'blue',
		icon: '👁️',
		flowSteps: [
			{
				step: 1,
				label: 'Data Aggregation',
				desc: 'Multi-source collection from exchanges, APIs, and sensors',
				icon: '📡',
			},
			{
				step: 2,
				label: 'Validation & Consensus',
				desc: 'Redundancy checks and Byzantine-fault-tolerant agreement',
				icon: '✓',
			},
			{
				step: 3,
				label: 'Feed Publication',
				desc: 'Tamper-proof pushes to on-chain consumer contracts',
				icon: '📊',
			},
		],
		features: [
			{
				title: 'Price Feeds',
				description: 'Real-time commodity, stock, and crypto pricing',
				icon: '💹',
			},
			{
				title: 'Data Redundancy',
				description: 'Multi-provider consensus to eliminate single points of failure',
				icon: '🔄',
			},
			{
				title: 'Latency Optimization',
				description: 'Sub-second feed publication to minimize staleness',
				icon: '⚡',
			},
			{
				title: 'Heartbeat Monitoring',
				description: 'Automatic feed health checks and alert systems',
				icon: '💓',
			},
		],
		assetClasses: [
			{ name: 'Price Feeds', desc: 'Real-world asset pricing data', icon: '💹' },
			{ name: 'Weather Data', desc: 'Agricultural and climate information', icon: '🌤️' },
			{ name: 'Satellite Imagery', desc: 'Geospatial asset verification', icon: '🛰️' },
			{ name: 'Supply Chain Data', desc: 'Shipment and logistics tracking', icon: '📦' },
			{ name: 'Sports/Gaming Stats', desc: 'Live performance metrics', icon: '📊' },
			{ name: 'Market Sentiment', desc: 'Aggregated social and sentiment signals', icon: '💬' },
		],
		dappUrl: 'https://mimir-ub62.vercel.app/',
		dappLabel: 'Enter Mimir',
	},
};

// Sophia's Daughters organized by Phase
const DAUGHTERS_PHASE1 = [
	{
		name: 'Echo',
		description: 'Music Rights & Media',
		rune: '📻',
		url: 'https://echo-pied-phi.vercel.app/',
		isComingSoon: false,
	},
	{
		name: 'Pulse',
		description: 'Gaming Clips & Live Streams',
		rune: '⚡',
		url: 'https://pulse-eta-three.vercel.app/',
		isComingSoon: false,
	},
];

const DAUGHTERS_PHASE2 = [
	{
		name: 'Aurelia',
		description: 'Real Estate & Development',
		rune: '🏛️',
		url: 'https://aurelia-tau.vercel.app/',
		isComingSoon: false,
	},
	{
		name: 'Vein',
		description: 'Minerals & Natural Resources',
		rune: '⛏️',
		url: 'https://vein-delta.vercel.app/',
		isComingSoon: false,
	},
	{
		name: 'Verdant',
		description: 'Carbon & Environmental Assets',
		rune: '🌿',
		url: 'https://verdant-puce.vercel.app/',
		isComingSoon: false,
	},
];

const DAUGHTERS_PHASE3 = [
	{
		name: 'Nautica',
		description: 'Yachts & Luxury Maritime',
		rune: '⛵',
		isComingSoon: false,
		isInternal: true,
	},
	{
		name: 'Eir',
		description: 'Healthcare & Biotech Assets',
		rune: 'ᛒ',
		isComingSoon: false,
		isInternal: true,
	},
];

const DAUGHTERS_PHASE4 = [
	{
		name: 'Skaði',
		description: 'Luxury Mobility & Performance',
		rune: '✈️',
		isComingSoon: true,
		isInternal: true,
	},
	{
		name: 'Freyja',
		description: 'Luxury Collectibles & Fine Goods',
		rune: '👑',
		isComingSoon: true,
		isInternal: true,
	},
	{
		name: 'Gaia',
		description: 'Botanical & Cannabis Assets',
		rune: '🌱',
		isComingSoon: true,
		isInternal: true,
	},
];

// The Sons of Sophia - The Providers
const SONS = [
	{
		name: 'Genesis',
		description: 'The Prime Foundation',
		rune: '🔥',
		url: 'https://genesis-seven-self.vercel.app/',
		isComingSoon: false,
		icon: Flame,
	},
	{
		name: 'Valkyr',
		description: 'The Wise Guardian',
		rune: '🛡️',
		url: 'https://valkyr-v1.vercel.app/',
		isComingSoon: false,
		icon: Shield,
	},
	{
		name: 'Raido',
		description: 'The Swift Provider',
		rune: '⚡',
		url: 'https://raido.vercel.app/',
		isComingSoon: false,
		icon: Zap,
	},
	{
		name: 'Fenrir',
		description: 'The Fierce Protector',
		rune: '💨',
		url: 'https://fenrir-teal.vercel.app/',
		isComingSoon: false,
		icon: Wind,
	},
	{
		name: 'Mimir',
		description: 'The Oracle Provider',
		rune: '👁️',
		url: 'https://mimir-ub62.vercel.app/',
		isComingSoon: false,
		icon: Eye,
	},
];

export function ForgePage() {
	const navigate = useNavigate();
	const fileRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [currentStep, setCurrentStep] = useState(1);
	const [attested, setAttested] = useState(false);
	const [minted, setMinted] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [selectedDaughter, setSelectedDaughter] = useState<string | null>(null);
	const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null);
	const [selectedSon, setSelectedSon] = useState<string | null>(null);
	const [showWhitelistModal, setShowWhitelistModal] = useState(false);
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
		oracleEngine: false,
		sophiaProtocol: true,
	});

	// Token gating for Mirror/Cadabra access
	const { hasMinimum } = useAbraBalance(10);

	const handleEnterMirror = () => {
		if (!hasMinimum) {
			alert('You need at least 10 $ABRA to access the Mirror. Please acquire $ABRA first.');
			return;
		}
		window.open('https://cadabra-eight.vercel.app/', '_blank');
	};

	const handleFiles = (picked: FileList | null) => {
		if (!picked) return;
		setFiles(Array.from(picked));
		if (currentStep === 1) setCurrentStep(2);
	};

	const handleAttest = () => {
		setAttested(true);
		setCurrentStep(3);
	};

	const handleMint = () => {
		setIsMinting(true);
		setTimeout(() => {
			setIsMinting(false);
			setMinted(true);
			setCurrentStep(4);
		}, 2200);
	};

	const firstFile = files[0];
	const previewUrl = firstFile && firstFile.type.startsWith('image/') ? URL.createObjectURL(firstFile) : null;

	const handleDaughterBuyAbra = () => {
		// This would typically navigate to a token purchase page or exchange
		console.log('Buy $ABRA clicked');
		// Example: window.open('https://your-exchange-url', '_blank');
	};

	if (selectedDaughter) {
		const daughterConfig = DAUGHTER_CONFIGS[selectedDaughter] || SON_CONFIGS[selectedDaughter];
		if (daughterConfig) {
			return (
				<div className="relative">
					<DaughterPage 
						config={daughterConfig} 
						onClose={() => setSelectedDaughter(null)} 
						onBuyAbra={handleDaughterBuyAbra} 
					/>
				</div>
			);
		}
	}

	return (
		<>
			<RuneRealm {...RUNE_CONFIG}>
			{/* Institutional Positioning */}
			<section className="space-y-4 py-6 mb-2">
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-orange-400/40 pl-6 space-y-2 font-mono">
						<p className="text-xs font-bold text-orange-300/70 uppercase tracking-widest">&gt; WHAT_IS_THE_FORGE</p>
						<p className="text-sm text-slate-300/90">
							The Forge tokenizes World Labs Protocol—an institutional-grade digital asset management system. We convert institutional-caliber asset infrastructure into consumer-accessible dapp equity, vaults, and yield protocols.
						</p>
					</div>
				</div>
			</section>

			{/* The Forging Process – Briefing */}
			<section className="space-y-6 py-8 mb-4">
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-orange-400/50 pl-6 space-y-4 font-mono">
						<h2 className="text-lg font-bold text-orange-300 tracking-wider uppercase">&gt; SYSTEM_INITIALIZATION</h2>
						<div className="space-y-3 text-sm text-slate-300/80">
							<p>
								<span className="text-orange-400 font-mono">[01_TOKENIZE]</span> <span className="text-orange-400/70 text-[11px] font-mono">Upload asset proof: Deeds, Rights, Commodities, IP. Any intrinsic value asset.</span>
							</p>
							<p>
								<span className="text-orange-400 font-mono">[02_ATTEST]</span> <span className="text-orange-400/70 text-[11px] font-mono">Self-certify ownership. No intermediaries. Maintain sovereign control.</span>
							</p>
							<p>
								<span className="text-orange-400 font-mono">[03_FORGE]</span> <span className="text-orange-400/70 text-[11px] font-mono">Mint RWA token on-chain. Eligible for liquidity & yield protocols.</span>
							</p>
							<p>
								<span className="text-orange-400 font-mono">[04_YIELD]</span> <span className="text-orange-400/70 text-[11px] font-mono">Deposit into specialized vaults. Capital compounds autonomously.</span>
							</p>
						</div>
						<p className="text-xs text-orange-300/70 pt-2 italic uppercase tracking-widest">&gt; ENTER_FORGE_TO_BEGIN</p>
					</div>
				</div>
			</section>

			{/* The Living Oracle – Self-Replicating Growth Engine */}
			<section className="py-8 border-t border-slate-700/30">
				<div className="max-w-6xl mx-auto px-4">
					{/* Toggleable Header */}
					<button
						onClick={() => setExpandedSections(prev => ({ ...prev, oracleEngine: !prev.oracleEngine }))}
						className="w-full flex items-center justify-between mb-4 px-4 py-3 rounded-lg border border-orange-400/30 bg-orange-500/5 hover:bg-orange-500/10 transition group"
					>
						<h3 className="text-lg font-bold text-orange-300 tracking-wider uppercase">&gt; NEST_ORACLE_ENGINE</h3>
						<span className={`transition-transform ${expandedSections.oracleEngine ? 'rotate-180' : ''}`}>▼</span>
					</button>
					
					{expandedSections.oracleEngine && <OracleEngine />}
				</div>
			</section>

			{/* FORGING SELECTOR - Choose Daughter & Son before crafting */}
			<section className="space-y-8 py-8 border-t border-slate-700/30">
				<div className="max-w-6xl mx-auto px-4">
					<div className="border-l-4 border-cyan-400/50 pl-6 space-y-6 font-mono">
						<h2 className="text-lg font-bold text-cyan-300 tracking-wider uppercase">&gt; INITIALIZATION_SEQUENCE</h2>
						<p className="text-sm text-slate-300/80">Before forging begins, select your specialization and your infrastructure partner.</p>
						
						{/* Daughters Selector */}
						<div className="space-y-3">
							<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&gt; SELECT_DAUGHTER_(ASSET_CLASS)</p>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
								{Object.entries(DAUGHTER_CONFIGS).map(([key, config]) => (
									<button
										key={key}
										onClick={() => setSelectedDaughter(key)}
										className={`rounded-lg border px-4 py-3 text-center transition ${
											selectedDaughter === key
												? 'border-cyan-400 bg-cyan-500/20'
												: 'border-cyan-300/20 bg-slate-900/40 hover:border-cyan-300/40 hover:bg-slate-900/60'
										}`}
									>
										<div className="text-2xl mb-1">{config.icon}</div>
										<div className="text-xs font-bold text-slate-100 uppercase">{config.name}</div>
										<div className="text-[10px] text-slate-400 mt-1">{config.description}</div>
									</button>
								))}
							</div>
						</div>

						{/* Asset Classes within Selected Daughter */}
						{selectedDaughter && DAUGHTER_CONFIGS[selectedDaughter] && (
							<div className="space-y-3">
								<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&gt; SELECT_ASSET_CLASS_WITHIN_{selectedDaughter.toUpperCase()}</p>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{DAUGHTER_CONFIGS[selectedDaughter].assetClasses.map((asset, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedAssetClass(asset.name)}
											className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
												selectedAssetClass === asset.name
													? 'border-purple-400 bg-purple-500/20'
													: 'border-purple-300/20 bg-slate-900/40 hover:border-purple-300/40 hover:bg-slate-900/60'
											}`}
										>
											<div className="font-bold text-slate-100 truncate">{asset.icon} {asset.name}</div>
											<div className="text-[10px] text-slate-400 truncate">{asset.desc}</div>
										</button>
									))}
								</div>
							</div>
						)}

						{/* Sons Selector */}
						<div className="space-y-3">
							<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&gt; SELECT_SON_(INFRASTRUCTURE_PROVIDER)</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								{SONS.map((son) => (
									<button
										key={son.name}
										onClick={() => setSelectedSon(son.name.toLowerCase())}
										className={`rounded-lg border px-4 py-3 text-center transition ${
											selectedSon === son.name.toLowerCase()
												? 'border-violet-400 bg-violet-500/20'
												: 'border-violet-300/20 bg-slate-900/40 hover:border-violet-300/40 hover:bg-slate-900/60'
										}`}
									>
										<div className="text-3xl mb-1">{son.rune}</div>
										<div className="text-xs font-bold text-slate-100 uppercase">{son.name}</div>
										<div className="text-[10px] text-slate-400 mt-1">{son.description}</div>
									</button>
								))}
							</div>
						</div>

						{/* Ready Message */}
						{selectedDaughter && selectedAssetClass && selectedSon && (
							<div className="rounded-lg border border-emerald-400/50 bg-emerald-500/10 p-4 space-y-2">
								<p className="text-sm font-bold text-emerald-300">✓ CONFIGURATION_READY</p>
								<p className="text-xs text-emerald-300/90">
									<span className="font-semibold">{DAUGHTER_CONFIGS[selectedDaughter].name}:</span> {selectedAssetClass} <br/>
									<span className="font-semibold">Provider:</span> {selectedSon.charAt(0).toUpperCase() + selectedSon.slice(1)}
								</p>
								<p className="text-[10px] text-emerald-300/70">Now you are ready to begin forging.</p>
								<button
									onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
									className="mt-2 inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-gradient-to-r from-emerald-500/20 to-cyan-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-200 hover:border-emerald-400/60 transition"
								>
									Begin Forging ↑
								</button>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Sophia's Family – The Sacred Gallery */}
			<section className="space-y-12 py-8">

				{/* CADABRA - THE SOCIAL MIRROR (Prominent Placement) */}
				<div className="space-y-4">
					<div className="border-l-4 border-purple-400/50 pl-6 space-y-4 font-mono">
						<h3 className="text-lg font-bold text-purple-300 tracking-wider uppercase">&gt; CADABRA_THE_SOCIAL_MIRROR</h3>
						<p className="text-sm text-slate-300/80">
							The Abraxas protocol is the engine. <span className="text-purple-300 font-semibold">Cadabra is the nervous system.</span> While your assets tokenize and compound, Cadabra captures the most valuable signal: collective human intelligence on markets.
						</p>
						<div className="bg-gradient-to-r from-purple-500/10 via-slate-900/50 to-slate-900/50 border border-purple-300/20 rounded-lg p-4 space-y-3">
							<div className="flex gap-3">
								<span className="text-purple-400 font-mono text-[10px] font-bold uppercase shrink-0">[ALPHA]</span>
								<p className="text-xs text-slate-300">Real-time price discovery, KOL positioning, meme cycle tracking across every RWA asset class.</p>
							</div>
							<div className="flex gap-3">
								<span className="text-purple-400 font-mono text-[10px] font-bold uppercase shrink-0">[CONVICTION]</span>
								<p className="text-xs text-slate-300">Every forged asset has a discussion channel. Community consensus flows before protocols move.</p>
							</div>
							<div className="flex gap-3">
								<span className="text-purple-400 font-mono text-[10px] font-bold uppercase shrink-0">[DESTINY]</span>
								<p className="text-xs text-slate-300">Price discovery, narrative coalescing, institutional intent manifestation—Market structure begins at the Mirror.</p>
							</div>
						</div>
						<button
							onClick={handleEnterMirror}
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-300/40 bg-gradient-to-r from-purple-500/20 to-violet-500/15 px-4 py-3 text-xs font-bold uppercase tracking-wider text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.15)] transition hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-300/60"
						>
							Enter the Mirror → Cadabra
							<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
						</button>
						<button
							type="button"
							onClick={() => setShowWhitelistModal(true)}
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-purple-400/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.15)] transition hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-400/60"
						>
							<Sparkles size={12} />
							Join Academy Whitelist
						</button>
						<button
							type="button"
							onClick={() => navigate('/app/ledger')}
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/40 bg-gradient-to-r from-emerald-500/20 to-cyan-400/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.15)] transition hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-emerald-400/60"
						>
							📋 View Whitelist Ledger
						</button>
					</div>
				</div>

				{/* SOPHIA'S FAMILY - DAUGHTERS */}
				<div className="space-y-8">
					<div className="border-b border-orange-400/30 pb-6 font-mono">
						<h2 className="text-2xl font-bold text-orange-300 tracking-widest mb-2 uppercase">&gt; [SOPHIA_FAMILY_PROTOCOL]</h2>
						<p className="text-sm text-orange-300/70 uppercase tracking-wider">&gt; Select_Asset_Class || Initialize_Specialization</p>
					</div>

					{/* Phase 1 – Digital Content & Experiences */}
					<div className="space-y-4">
					<div className="px-1 font-mono">
						<h3 className="text-sm font-bold text-orange-400 tracking-widest uppercase">&gt; [PHASE_1] DIGITAL_CONTENT</h3>
						<p className="text-[10px] text-orange-300/60 mt-1 uppercase tracking-wider">MOST_PROMINENT | INITIATIVE_PRIORITY</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{DAUGHTERS_PHASE1.map((daughter) => (
								<button
									key={daughter.name}
									onClick={() => setSelectedDaughter(daughter.name.toLowerCase())}
									type="button"
									className={`group relative overflow-hidden rounded-xl border text-left backdrop-blur transition ${
										daughter.isComingSoon
											? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
											: 'border-orange-300/30 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 hover:border-orange-300/60 hover:from-orange-500/15 hover:shadow-[0_0_20px_rgba(234,88,12,0.2)]'
									}`}
									disabled={daughter.isComingSoon}
								>
									{!daughter.isComingSoon && (
										<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 opacity-0 group-hover:opacity-100 transition" />
									)}
									<div className="relative z-10 flex flex-col h-full p-6">
										<div className="flex items-start gap-3 mb-4">
										<span className="text-3xl leading-none shrink-0">{daughter.rune}</span>
											<h3 className={`text-sm font-bold tracking-widest leading-tight pt-1 uppercase font-mono ${
												daughter.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-orange-300 transition'
											}`}>
												{daughter.name}
											</h3>
										</div>
											<p className={`text-[10px] leading-relaxed mb-5 flex-grow font-mono uppercase tracking-[0.05em] ${
											daughter.isComingSoon ? 'text-slate-500' : 'text-slate-400'
										}`}>
											{daughter.description}
										</p>
										{daughter.isComingSoon ? (
											<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-4 py-3 w-full justify-center">
														<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">[COMING_SOON]</span>
											</div>
										) : (
											<button
												type="button"
												className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-300/40 bg-gradient-to-r from-orange-500/20 to-amber-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-orange-200 shadow-[0_0_12px_rgba(234,88,12,0.15)] transition group-hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] group-hover:border-orange-300/60"
											>
												Enter {daughter.name}
												<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
											</button>
										)}
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Phase 2 – Real-World & Advanced Assets */}
					<div className="space-y-4 mt-8">
					<div className="px-1 font-mono">
						<h3 className="text-sm font-bold text-amber-400 tracking-widest uppercase">&gt; [PHASE_2] REALWORLD_ADVANCED</h3>
						<p className="text-[10px] text-amber-300/60 mt-1 uppercase tracking-wider">EXPANDING_HORIZONS | COMPLEX_MARKETS</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{DAUGHTERS_PHASE2.map((daughter) => (
								<button
									key={daughter.name}
									onClick={() => setSelectedDaughter(daughter.name.toLowerCase())}
									type="button"
									className={`group relative overflow-hidden rounded-xl border text-left backdrop-blur transition ${
										daughter.isComingSoon
											? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
											: 'border-amber-300/25 bg-gradient-to-br from-amber-500/8 via-slate-900/80 to-slate-900/60 hover:border-amber-300/50 hover:from-amber-500/12 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]'
									}`}
									disabled={daughter.isComingSoon}
								>
									{!daughter.isComingSoon && (
										<div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 opacity-0 group-hover:opacity-100 transition" />
									)}
									<div className="relative z-10 flex flex-col h-full p-6">
										<div className="flex items-start gap-3 mb-4">
										<span className="text-3xl leading-none shrink-0">{daughter.rune}</span>
											<h3 className={`text-sm font-bold tracking-widest leading-tight pt-1 uppercase font-mono ${
												daughter.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-amber-300 transition'
											}`}>
												{daughter.name}
											</h3>
										</div>
											<p className={`text-[10px] leading-relaxed mb-5 flex-grow font-mono uppercase tracking-[0.05em] ${
												daughter.isComingSoon ? 'text-slate-500' : 'text-slate-400'
											}`}>
												{daughter.description}
											</p>
											{daughter.isComingSoon ? (
												<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-4 py-3 w-full justify-center">
													<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">[COMING_SOON]</span>
											</div>
										) : (
											<button
												type="button"
												className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300/40 bg-gradient-to-r from-amber-500/20 to-yellow-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.15)] transition group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:border-amber-300/60"
											>
												Enter {daughter.name}
												<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
											</button>
										)}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Phase 3 – Frontier Sovereignty */}
				<div className="space-y-4 mt-12">
					<div className="px-1 font-mono">
						<h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase">&gt; [PHASE_3] FRONTIER_SOVEREIGNTY</h3>
						<p className="text-[10px] text-cyan-300/60 mt-1 uppercase tracking-wider">OCEANIC & REGENERATIVE_FUTURES</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{DAUGHTERS_PHASE3.map((daughter) => (
							<button
								key={daughter.name}
								onClick={() => setSelectedDaughter(daughter.name.toLowerCase())}
								type="button"
								className={`group relative overflow-hidden rounded-xl border text-left backdrop-blur transition ${
									daughter.isComingSoon
										? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
										: 'border-cyan-300/30 bg-gradient-to-br from-cyan-500/8 via-slate-900/80 to-slate-900/60 hover:border-cyan-300/60 hover:from-cyan-500/15 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
								}`}
								disabled={daughter.isComingSoon}
							>
								{!daughter.isComingSoon && (
									<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-100 transition" />
								)}
								<div className="relative z-10 flex flex-col h-full p-6">
									<div className="flex items-start gap-3 mb-4">
										<span className="text-3xl leading-none shrink-0">{daughter.rune}</span>
										<h3 className={`text-sm font-bold tracking-widest leading-tight pt-1 uppercase font-mono ${
											daughter.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-cyan-300 transition'
										}`}>
											{daughter.name}
										</h3>
									</div>
									<p className={`text-[10px] leading-relaxed mb-5 flex-grow font-mono uppercase tracking-[0.05em] ${
										daughter.isComingSoon ? 'text-slate-500' : 'text-slate-400'
									}`}>
										{daughter.description}
									</p>
									{daughter.isComingSoon ? (
										<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-4 py-3 w-full justify-center">
											<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">[COMING_SOON]</span>
										</div>
									) : (
										<button
											type="button"
											className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:border-cyan-300/60"
										>
											Enter {daughter.name}
											<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
										</button>
									)}
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Phase 4 – Luxury Dominion */}
				<div className="space-y-4 mt-12">
					<div className="px-1 font-mono">
						<h3 className="text-sm font-bold text-amber-400 tracking-widest uppercase">&gt; [PHASE_4] LUXURY_DOMINION</h3>
						<p className="text-[10px] text-amber-300/60 mt-1 uppercase tracking-wider">VELOCITY | TREASURE | REGENERATION</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{DAUGHTERS_PHASE4.map((daughter) => (
							<button
								key={daughter.name}
								onClick={() => setSelectedDaughter(daughter.name.toLowerCase())}
								type="button"
								className={`group relative overflow-hidden rounded-xl border text-left backdrop-blur transition ${
									daughter.isComingSoon
										? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
										: 'border-amber-300/30 bg-gradient-to-br from-amber-500/8 via-slate-900/80 to-slate-900/60 hover:border-amber-300/60 hover:from-amber-500/15 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]'
								}`}
								disabled={daughter.isComingSoon}
							>
								{!daughter.isComingSoon && (
									<div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 opacity-0 group-hover:opacity-100 transition" />
								)}
								<div className="relative z-10 flex flex-col h-full p-6">
									<div className="flex items-start gap-3 mb-4">
										<span className="text-3xl leading-none shrink-0">{daughter.rune}</span>
										<h3 className={`text-sm font-bold tracking-widest leading-tight pt-1 uppercase font-mono ${
											daughter.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-amber-300 transition'
										}`}>
											{daughter.name}
										</h3>
									</div>
									<p className={`text-[10px] leading-relaxed mb-5 flex-grow font-mono uppercase tracking-[0.05em] ${
										daughter.isComingSoon ? 'text-slate-500' : 'text-slate-400'
									}`}>
										{daughter.description}
									</p>
									{daughter.isComingSoon ? (
										<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-4 py-3 w-full justify-center">
											<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">[COMING_SOON]</span>
										</div>
									) : (
										<button
											type="button"
											className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300/40 bg-gradient-to-r from-amber-500/20 to-yellow-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.15)] transition group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:border-amber-300/60"
										>
											Enter {daughter.name}
											<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
										</button>
									)}
								</div>
							</button>
						))}
					</div>
				</div>

				{/* THE SONS OF SOPHIA – THE PROVIDERS */}
				<div className="space-y-6 border-t border-slate-700/30 pt-12">
					<div className="px-1 font-mono">
						<h2 className="text-sm font-bold text-violet-400 tracking-widest uppercase mb-2">&gt; [SONS_PROTOCOL] ANCILLARY_SERVICES</h2>
						<p className="text-[10px] text-violet-300/60 mt-1 uppercase tracking-wider">INFRASTRUCTURE_PARTNERS | ADVANCED_PROVIDERS</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
						{SONS.map((son) => (
							<button
								key={son.name}
								onClick={() => setSelectedDaughter(son.name.toLowerCase())}
								type="button"
								className={`group relative overflow-hidden rounded-xl border text-center backdrop-blur transition ${
									son.isComingSoon
										? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
										: 'border-violet-300/25 bg-gradient-to-br from-violet-500/8 via-slate-900/80 to-slate-900/60 hover:border-violet-300/50 hover:from-violet-500/12 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]'
								}`}
								disabled={son.isComingSoon}
							>
								{!son.isComingSoon && (
									<div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-500/0 opacity-0 group-hover:opacity-100 transition" />
								)}
								<div className="relative z-10 flex flex-col h-full p-6">
									<div className="flex items-center justify-center mb-4">
										<div className={`p-3 rounded-lg ${
											son.isComingSoon 
												? 'bg-slate-800/30' 
												: 'bg-gradient-to-br from-violet-500/20 to-purple-500/10 group-hover:from-violet-500/30 group-hover:to-purple-500/20'
										}`}>
											<span className="text-5xl">{son.rune}</span>
										</div>
									</div>
										<h3 className={`text-sm font-bold tracking-widest mb-2 text-center uppercase font-mono ${
										son.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-violet-300 transition'
									}`}>
										{son.name}
									</h3>
										<p className={`text-[10px] leading-relaxed mb-5 flex-grow text-center font-mono uppercase tracking-[0.05em] ${
										son.isComingSoon ? 'text-slate-500' : 'text-slate-400'
									}`}>
										{son.description}
									</p>
									{son.isComingSoon ? (
										<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-3 py-2.5 w-full justify-center">
											<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">[COMING_SOON]</span>
										</div>
									) : (
										<button
											type="button"
											className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-violet-300/40 bg-gradient-to-r from-violet-500/20 to-purple-500/15 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-violet-200 shadow-[0_0_12px_rgba(167,139,250,0.15)] transition group-hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] group-hover:border-violet-300/60"
										>
											Enter {son.name}
											<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
										</button>
									)}
								</div>
							</button>
						))}
					</div>
				</div>

			</section>

			{/* Breaking Signals – Market Context Widget */}
			<section className="space-y-4 py-8 border-t border-slate-700/30 mt-8">
				<details className="group cursor-pointer">
					<summary className="flex items-center gap-3 px-1 font-mono mb-6 select-none hover:opacity-80 transition">
						<span className="text-sm font-bold text-orange-300 tracking-widest uppercase">&gt; [HORIZON_SIGNALS] MARKET_CONTEXT</span>
						<span className="text-[10px] text-orange-300/60 ml-auto group-open:hidden">▸ expand</span>
						<span className="text-[10px] text-orange-300/60 ml-auto hidden group-open:inline">▾ collapse</span>
					</summary>
					<article className="glow-panel rounded-2xl border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(10,37,64,0.82),rgba(56,189,248,0.08))] p-5 backdrop-blur-xl overflow-hidden animate-pulse" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
						<div className="space-y-3 mb-4">
							<div className="flex items-center gap-3">
								<div className="relative">
									<div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-lg animate-pulse" />
									<Newspaper className="text-cyan-300 relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" size={18} />
								</div>
								<div>
									<h3 className="text-sm font-bold text-cyan-200 tracking-widest uppercase">Breaking Signals</h3>
									<p className="text-[10px] text-cyan-300/60 font-mono">Horizon Oracle Live Feed</p>
								</div>
							</div>
							<p className="text-xs leading-relaxed text-slate-300/75 italic">
								Real-time market signals from across RWA, athlete equity, and DeFi markets inform your tokenization strategy.
							</p>
						</div>

						{/* Scrollable News Feed */}
						<div className="space-y-2 max-h-48 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.3)_rgba(15,23,42,0.5)]">
							{breakingSignals.map((signal, idx) => (
								<div
									key={signal.id}
									className="group relative rounded-lg border border-cyan-300/15 bg-slate-950/40 backdrop-blur-sm p-3 hover:bg-slate-950/60 hover:border-cyan-300/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
									style={{
										animationDelay: `${idx * 50}ms`,
										animation: 'fadeInUp 0.6s ease-out forwards',
									}}
								>
									{/* Category badge */}
									<div className="absolute top-2 right-2">
										<span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border backdrop-blur-sm ${
											signal.category === 'dapp_equity'
												? 'border-orange-400/30 bg-orange-400/10 text-orange-300'
												: signal.category === 'rwa'
												? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
												: signal.category === 'gaming'
												? 'border-violet-400/30 bg-violet-400/10 text-violet-300'
												: signal.category === 'defi'
												? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
												: 'border-amber-400/30 bg-amber-400/10 text-amber-300'
										}`}>
											{signal.category}
										</span>
									</div>

									<div className="flex items-center gap-2 mb-2">
										<span className="text-[10px] font-mono font-bold text-cyan-300/80 uppercase tracking-wider">[{signal.source}]</span>
										<span className="text-[9px] text-slate-400/70">{signal.timestamp}</span>
									</div>

									<h4 className="text-xs font-semibold text-slate-100 mb-1 line-clamp-2">
										{signal.title}
									</h4>

									<p className="text-[11px] leading-relaxed text-slate-300/80 line-clamp-1">
										{signal.snippet}
									</p>
								</div>
							))}
						</div>
					</article>
				</details>
			</section>

			{/* Optional: Tokenization Form (Collapsible Section) */}
			<section className="space-y-4 py-12 border-t border-slate-700/30 mt-8">
				<div className="space-y-2 mb-6">
					<h2 className="text-sm font-bold text-slate-300 tracking-widest uppercase font-mono">&gt; [DIRECT] TOKENIZATION_FLOW</h2>
					<p className="text-[10px] text-slate-400/70 mt-1 uppercase tracking-wider">
						Begin raw asset tokenization process
					</p>
				</div>

				{/* Begin tokenization CTA */}
				<article className="glow-panel rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
					<div className="flex items-center gap-3 mb-3">
						<Flame size={20} className="text-orange-300 shrink-0" />
						<div>
							<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-200/80">Kenaz Protocol</p>
						<h2 className="text-sm font-bold text-slate-300 tracking-widest uppercase font-mono">INITIALIZE_TOKENIZATION</h2>
					</div>
				</div>
				<p className="text-[10px] leading-relaxed text-slate-400/70 mb-4 uppercase tracking-[0.05em]">
					Upload proof of ownership | Abraxas mints La Casa NFT | Auto-deposit to Sophia Vault
					</p>
					<button
						type="button"
						onClick={() => fileRef.current?.click()}
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/60 bg-gradient-to-r from-orange-500/25 to-amber-500/20 px-4 py-3 text-sm font-bold uppercase tracking-wider text-orange-100 shadow-[0_0_20px_rgba(234,88,12,0.2)] transition hover:shadow-[0_0_28px_rgba(234,88,12,0.35)]"
					>
						<Sparkles size={15} />
						Begin Tokenization
					</button>
				</article>

				{/* Step tracker */}
				<article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
					<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">Tokenization Flow</p>
					<ol className="space-y-2">
						{STEPS.map(({ n, label }) => {
							const done = currentStep > n;
							const active = currentStep === n;
							return (
								<li key={n} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${active ? 'border border-orange-300/30 bg-orange-500/10' : 'border border-transparent'}`}>
									<span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition ${done ? 'bg-orange-400 text-slate-950' : active ? 'border border-orange-300/60 text-orange-300' : 'border border-slate-600/60 text-slate-600'}`}>
										{done ? <CheckCircle size={13} /> : n}
									</span>
									<span className={`text-xs ${done ? 'text-slate-400 line-through' : active ? 'font-semibold text-slate-200' : 'text-slate-600'}`}>{label}</span>
								</li>
							);
						})}
					</ol>
				</article>

				{/* Upload section */}
				<article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
					<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">Upload Asset Proof</p>
					<input
						ref={fileRef}
						type="file"
						multiple
						accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
						className="hidden"
						onChange={(e) => handleFiles(e.target.files)}
					/>
					{files.length === 0 ? (
						<button
							type="button"
							onClick={() => fileRef.current?.click()}
							className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-slate-600/60 bg-slate-950/40 px-4 py-6 text-xs text-slate-500 transition hover:border-orange-300/40 hover:text-slate-400"
						>
							<Upload size={22} className="text-slate-600" />
								<span className="font-mono text-orange-400">[PROOF_UPLOAD]</span>
							<span className="text-[10px] text-slate-600">PDF, JPG, PNG — multiple files accepted</span>
						</button>
					) : (
						<div className="space-y-2">
							{files.map((f) => (
								<div key={f.name} className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-950/50 px-3 py-2">
									<FileText size={13} className="shrink-0 text-orange-300/70" />
									<span className="truncate text-xs text-slate-300">{f.name}</span>
									<span className="ml-auto shrink-0 text-[10px] text-slate-500">{(f.size / 1024).toFixed(0)} KB</span>
								</div>
							))}
							<button
								type="button"
								onClick={() => fileRef.current?.click()}
								className="mt-1 text-[10px] text-slate-500 underline underline-offset-2 hover:text-slate-400"
							>
								Add more files
							</button>
						</div>
					)}
				</article>

				{/* Self-attestation — step 2 */}
				{currentStep >= 2 && !attested && (
					<article className="glow-panel rounded-2xl border border-amber-300/25 bg-slate-900/60 p-4 backdrop-blur">
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Self-Attestation</p>
						<p className="text-[10px] leading-relaxed text-slate-400/70 mb-4 uppercase tracking-[0.05em] font-mono">
							&gt; I confirm lawful ownership of this asset. Initiating on-chain tokenization.
						</p>
						<button
							type="button"
							onClick={handleAttest}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
						>
							<CheckCircle size={14} />
							I Confirm Ownership
						</button>
					</article>
				)}

				{/* NFT preview — step 3 */}
				{currentStep >= 3 && !minted && (
					<article className="glow-panel rounded-2xl border border-orange-300/25 bg-slate-900/60 p-4 backdrop-blur">
						<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">La Casa NFT Preview</p>
						<div className="flex gap-4 items-center mb-4">
							<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-orange-300/25 bg-slate-950">
								{previewUrl ? (
									<img src={previewUrl} alt="Asset preview" className="h-full w-full object-cover" />
								) : (
									<div className="flex h-full w-full items-center justify-center">
										<FileText size={24} className="text-orange-300/40" />
									</div>
								)}
								<div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-orange-300/20" />
							</div>
							<div className="min-w-0">
								<p className="truncate text-[11px] font-bold text-cyan-300 font-mono">{firstFile?.name ?? 'Asset'}</p>
								<p className="mt-0.5 text-[10px] text-slate-500">{files.length} file{files.length !== 1 ? 's' : ''} attached</p>
								<div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-orange-300/30 bg-orange-500/10 px-2 py-0.5">
									<span className="text-[10px] font-semibold text-orange-300">La Casa NFT</span>
								</div>
							</div>
						</div>
						<button
							type="button"
							onClick={handleMint}
							disabled={isMinting}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/50 bg-gradient-to-r from-orange-500/25 to-amber-500/20 px-4 py-2.5 text-sm font-bold text-orange-100 shadow-[0_0_16px_rgba(234,88,12,0.2)] transition hover:shadow-[0_0_24px_rgba(234,88,12,0.35)] disabled:opacity-50"
						>
							<Flame size={14} />
							{isMinting ? 'Minting...' : 'Forge This Asset into Sovereignty'}
						</button>
					</article>
				)}

				{/* Success — step 4 */}
				{minted && (
					<article className="glow-panel rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-5 backdrop-blur text-center">
						<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-orange-300/40 bg-orange-500/15">
							<CheckCircle size={22} className="text-orange-300" />
						</div>
						<p className="text-sm font-bold text-green-400 font-mono">✓ [NFT_MINTED] LA_CASA</p>
						<p className="mt-1 text-[10px] text-green-400/60 font-mono uppercase tracking-wider">Asset tokenized | Auto-deposited to Sophia vault</p>
						{previewUrl && (
							<img src={previewUrl} alt="Minted asset" className="mx-auto mt-4 h-28 w-28 rounded-xl border border-orange-300/25 object-cover shadow-[0_0_20px_rgba(234,88,12,0.2)]" />
						)}
						<p className="mt-3 text-[10px] font-mono text-orange-300/70">VAULT ASSIGNMENT PENDING SOPHIA REVIEW</p>
					</article>
				)}

			</section>
		</RuneRealm>
		<AcademyWhitelistModal
			isOpen={showWhitelistModal}
			onClose={() => setShowWhitelistModal(false)}
			onSuccess={() => setShowWhitelistModal(false)}
		/>
		</>
	);
}
