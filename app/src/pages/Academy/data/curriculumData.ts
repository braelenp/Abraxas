import { ABRAXAS_FULL_VALUE_PROP } from '../../../lib/messaging';

export const ABRAXAS_CORE_VALUE_PROP = ABRAXAS_FULL_VALUE_PROP;

export const ACADEMY_PROGRESS_STORAGE_KEY = 'abraxas_academy_curriculum_progress';
export const ACADEMY_ONCHAIN_SYNC_STORAGE_KEY = 'abraxas_academy_last_sync';

export type ModuleId =
  | 'strategy'
  | 'tokenization'
  | 'vaults'
  | 'species'
  | 'sovereignty';

export type ModuleAccent = 'purple' | 'cyan' | 'fuchsia' | 'emerald' | 'amber';

export type InteractiveElementType = 'chart' | 'matrix' | 'simulator' | 'scorecard' | 'lore';

export interface AcademyLesson {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface AcademyVisual {
  title: string;
  detail: string;
}

export interface AcademyInteractiveElement {
  title: string;
  detail: string;
  type: InteractiveElementType;
  embedUrl?: string;
  href?: string;
  ctaLabel?: string;
}

export interface AcademyVideoAsset {
  title: string;
  description: string;
  href?: string;
  embedUrl?: string;
  ctaLabel: string;
}

export interface AcademyQuizQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface AcademyChapter {
  title: string;
  summary: string;
  bullets: string[];
  kidAnalogy?: string;
  adultAnalogy?: string;
}

export interface AcademyOverview {
  title: string;
  subtitle: string;
  published: string;
  repurposed: string;
  author: string;
  targetAudience: string;
  preface: string[];
  access: string;
}

export interface AcademyModule {
  id: ModuleId;
  order: number;
  badge: string;
  title: string;
  subtitle: string;
  headline: string;
  duration: string;
  rewardPoints: number;
  accent: ModuleAccent;
  description: string;
  objectives: string[];
  keyVisuals: AcademyVisual[];
  lessons: AcademyLesson[];
  interactiveElements: AcademyInteractiveElement[];
  video: AcademyVideoAsset;
  quiz: AcademyQuizQuestion[];
  chapters?: AcademyChapter[];
  completionLabel: string;
  completionCopy: string;
}

export const ACADEMY_OVERVIEW: AcademyOverview = {
  title: 'Abraxas Academy',
  subtitle: 'Day Trading & Sovereign Asset Management Curriculum',
  published: 'Originally published August 24, 2025 as Baby Billionaire Academy by Mitabrev / World Labs Protocol',
  repurposed: 'Repurposed and expanded for Abraxas in April 2026',
  author: 'Brought to you by World Labs Protocol in collaboration with the Abraxas Species',
  targetAudience: 'Intelligent kids 10+, teens, adults, and finance veterans up to 90+',
  preface: [
    'When this curriculum was first created in August 2025 under World Labs Protocol, the financial world was already shifting. Geopolitical tensions, algorithmic dominance, and the rise of cryptocurrency and DeFi were creating both chaos and opportunity.',
    'Back then, it was called Baby Billionaire Academy: a simple, fun way to teach the next generation, and anyone willing to learn, how to navigate markets with real edge. The time has now come to evolve it into something greater.',
    'This is now the Abraxas Academy. The message is simple: own your own AI-powered digital asset management firm. You stay in control. The agents do the work. You keep the gains.',
    'Day trading is the lead product because that is what most learners are actively looking for: a repeatable edge with serious upside potential that feels more solid than sports betting because it is built on structure, timing, and execution rather than luck. DeFi and portfolio or asset management stay as the backend progression, teaching you how to own real assets, move capital with ABRAX, and harden wealth against inflation and tax erosion.',
  ],
  access: 'The full academy is token-gated. A minimum holding of $1,000 in ABRA is required to unlock the complete curriculum, while partial free teasers remain available to everyone. This keeps the learning base aligned with the sovereign economy being built.',
};

export const ACADEMY_MODULES: AcademyModule[] = [
  {
    id: 'strategy',
    order: 1,
    badge: 'Module 1',
    title: 'The Edge',
    subtitle: 'Trading Strategy',
    headline: 'Master the algorithmic engine, the moving average stack, and the 50Bounce workflow before Raido automates it for you.',
    duration: '60 min',
    rewardPoints: 180,
    accent: 'purple',
    description:
      'This module is the flagship product: a serious day trading curriculum built around repeatable market structure, trend confirmation, continuation entries, and disciplined execution. It preserves and expands the original Baby Billionaire Academy framework, then shows how Abraxas turns that edge into Raido.',
    objectives: [
      'Understand why day trading is the Academy front door for learners who want skill-based upside instead of luck-driven speculation.',
      'Understand why the August 2025 market environment made algorithmic literacy urgent: geopolitical stress, machine-dominated trading, and DeFi expansion.',
      'Learn how dealers, market makers, and high-frequency systems create the algorithmic engine that can be studied and exploited.',
      'Set up the Market Maker Method Moving Averages and Delorean TDI with the exact 13EMA red, 50EMA aqua, 200EMA white, and 800EMA dark blue stack.',
      'Understand the Market Maker Method Moving Averages: 13EMA red, 50EMA aqua, 200EMA white, 800EMA dark blue.',
      'Use the TDI Indicator: Bollinger Bands, MBL, Signal Line, and the Static 50 level to validate trend quality.',
      'Recognize the key patterns: SFA, CTSFA, MBLC, and MBLB.',
      'Execute the 50Bounce strategy on the M15 timeframe, time entries around liquidity windows, and frame take profit from Daily, H4, H1, and M15 together.',
    ],
    keyVisuals: [
      {
        title: 'Algorithmic Engine Map',
        detail: 'A schematic showing dealers, market makers, hedge funds, and HFT systems shaping price like a programmable machine rather than a human duel.',
      },
      {
        title: 'Market Maker Stack',
        detail: 'A layered MA ribbon showing 13EMA red, 50EMA aqua, 200EMA white, and 800EMA dark blue for immediate market bias.',
      },
      {
        title: 'TDI Radar',
        detail: 'The TDI window exposes volatility expansion through Bollinger Bands, momentum via the Signal Line, and conviction around the MBL and Static 50.',
      },
      {
        title: '50Bounce Flow',
        detail: 'The setup visual marks the M15 trend pullback into the 50EMA, the TDI continuation equation, and the 9:30 AM EDT execution window.',
      },
    ],
    lessons: [
      {
        eyebrow: 'Macro Context',
        title: 'Why Learn Trading Now?',
        description:
          'The original curriculum was written into a market regime shaped by geopolitical strain, machine execution, rising crypto adoption, and central-bank uncertainty. That context still matters because market structure is increasingly automated.',
        bullets: [
          'Geopolitical tension and cross-border trade disputes helped sustain volatility regimes that reward disciplined traders.',
          'Algorithmic trading now dominates major markets, so understanding repeatable machine behavior matters more than predicting headlines.',
          'Crypto and DeFi expanded the addressable opportunity set, making timing, risk, and execution foundational skills.',
          'Abraxas uses trading as the front-end edge before moving you into sovereign asset ownership and AI-managed capital.',
        ],
      },
      {
        eyebrow: 'Market Structure',
        title: 'The Algorithmic Engine and Asset Classes',
        description:
          'The market is not a duel with another retail trader. It is a dealer-driven algorithmic system. Once you understand that, asset classes stop looking disconnected and start looking like different surfaces of the same machine.',
        bullets: [
          'Indices, metals, commodities, futures, and currencies each have their own macro drivers, but the same algorithmic behavior can be studied across all of them.',
          'High-frequency systems create predictable reactions in microseconds that still resolve into repeatable chart structures.',
          'The edge is not asset-specific. Master one robust strategy and you can trade multiple markets and timeframes through the same lens.',
          'This is why Raido can extend one core strategy into a broader sovereign capital system.',
        ],
      },
      {
        eyebrow: 'Chart Setup',
        title: 'Market Maker Method and Delorean TDI',
        description:
          'The moving average stack gives the vertical map while TDI gives the horizontal momentum view. Together they make the chart readable enough to stop guessing.',
        bullets: [
          '13EMA red reacts fastest and exposes immediate trend speed.',
          '50EMA aqua is the operational mean and the key dynamic support or resistance used in the 50Bounce setup.',
          '200EMA white and 800EMA dark blue anchor higher-order structure so lower-timeframe entries do not run blindly into macro resistance.',
          'On TDI, Bollinger Bands, the Price Line, the MBL, the Signal Line, and the Static 50 level combine to confirm whether trend quality is real or just noise.',
        ],
      },
      {
        eyebrow: 'Trend Discipline',
        title: 'Confirming Trends and Continuations',
        description:
          'Avoid guessing tops and bottoms. Wait for the 13EMA and 50EMA relationship plus TDI confirmation, then look for the continuation equation rather than random motion.',
        bullets: [
          'Bullish trend confirmation begins when the 13EMA crosses above the 50EMA and the MBL crosses above the Static 50 level.',
          'Bearish trend confirmation begins when the 13EMA crosses below the 50EMA and the MBL crosses below the Static 50 level.',
          'The continuation equation is SFA + CTSFA + MBLC + MBLB, with MBLC and CTSFA required before the final MBL bounce.',
          'The market is grey, not black and white, so expect retests, noise, and false crosses in choppy conditions.',
        ],
      },
      {
        eyebrow: 'Execution',
        title: 'M15 Entries, Profit Targets, and Methods',
        description:
          'Execution matters as much as setup quality. The curriculum focuses on liquidity windows, dealer behavior, and the layering of Daily, H1, and M15 so entries and exits stay precise.',
        bullets: [
          'Asia accumulates, London injects liquidity, and New York provides the prime execution window, with special focus on 9:30 AM EDT.',
          'Look for M and W structures, or three-leg head-and-shoulders formations, with closes relative to the 13EMA for confirmation.',
          'Set take profit around Daily timeframe highs or lows while using H1 for the 50Bounce context and M15 for actual entry timing.',
          'Choose the right instrument for the job: CFDs for fast forex exposure, futures for contract-based leverage, and options for directional convexity.',
        ],
      },
    ],
    interactiveElements: [
      {
        title: 'Interactive M15 Chart',
        detail:
          'A TradingView widget focused on live M15 structure so users can inspect the 50EMA interaction in real time.',
        type: 'chart',
        embedUrl:
          'https://www.tradingview.com/widgetembed/?frameElementId=tradingview_abraxas_strategy&symbol=BINANCE%3ABTCUSDT&interval=15&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=0f172a&theme=dark&style=1&locale=en&utm_source=abraxas.app&utm_medium=widget&utm_campaign=chart',
      },
      {
        title: 'Pattern and Session Decoder',
        detail:
          'A quick-reference matrix translating SFA, CTSFA, MBLC, MBLB, the 50Bounce, and the 9:30 AM EDT execution window into a concrete trading workflow.',
        type: 'matrix',
      },
    ],
    video: {
      title: 'Raido Signal Briefing',
      description:
        'A compact visual walkthrough for how the original trading curriculum becomes Raido logic: structure, TDI confluence, continuation pattern, session timing, and sovereign deployment.',
      href: 'https://www.tradingview.com/chart/',
      ctaLabel: 'Open Market Replay',
    },
    quiz: [
      {
        prompt: 'Which moving average acts as the anchor for the 50Bounce setup?',
        options: ['13EMA red', '50EMA aqua', '200EMA white', '800EMA dark blue'],
        answerIndex: 1,
        explanation: 'The strategy is built around a pullback into the 50EMA aqua and a clean continuation reaction from that level.',
      },
      {
        prompt: 'What confirms a bullish trend on the moving average stack before you start hunting continuations?',
        options: ['13EMA crossing above 50EMA', 'Price touching the 800EMA', 'A candle closing under the 200EMA', 'Bollinger Bands narrowing'],
        answerIndex: 0,
        explanation: 'In the curriculum, the 13EMA crossing above the 50EMA is enough to confirm the trend state without waiting for extra candle-close rules.',
      },
      {
        prompt: 'Which TDI element acts as the clean threshold between bullish and bearish control?',
        options: ['Signal Line', 'Bollinger Bands', 'Static 50 level', 'Price Line only'],
        answerIndex: 2,
        explanation: 'The Static 50 level is the regime divider that helps confirm whether momentum is operating above or below the midpoint.',
      },
      {
        prompt: 'What execution time does the curriculum emphasize inside the New York session?',
        options: ['7:00 PM EDT', '4:00 AM EDT', '9:30 AM EDT', '12:00 AM EDT'],
        answerIndex: 2,
        explanation: 'The curriculum specifically calls out 9:30 AM EDT as the prime execution point inside the New York session.',
      },
      {
        prompt: 'When does the 50Bounce become invalid?',
        options: [
          'When price tags the 800EMA',
          'When price loses EMA structure or TDI fails to confirm',
          'When Bollinger Bands widen',
          'When the chart stays on M15',
        ],
        answerIndex: 1,
        explanation: 'The edge comes from disciplined invalidation. If structure breaks or TDI does not support the bounce, the thesis is gone.',
      },
    ],
    chapters: [
      {
        title: 'Chapter 1: What Is the Market Really?',
        summary: 'The market is an algorithmic engine run by dealers, banks, hedge funds, and market makers designed to profit from your trades. Once you stop imagining a human duel and start reading a machine, the edge becomes teachable.',
        bullets: [
          'Dealers use high-frequency systems that process trades in microseconds and create repeatable chart behavior.',
          'Public assets from Apple to Bitcoin to gold all enter the same broad algorithmic environment once they achieve market status.',
          'One strategy can travel across assets and timeframes because the underlying machine behavior repeats.',
        ],
        kidAnalogy: 'For kids: the market is like a video game boss. Learn the boss patterns, dodge the traps, and collect the treasure.',
        adultAnalogy: 'For adults: the market is a high-stakes casino table where the house has an algorithmic edge, but disciplined pattern recognition lets you counter it.',
      },
      {
        title: 'Chapter 2: Exploring Asset Classes',
        summary: 'Indices, metals, commodities, futures, and currencies are the economy’s building blocks. Each has its own macro driver, but the same strategy can read them through one lens.',
        bullets: [
          'Indices function like economic scoreboards for major sectors and national corporate health.',
          'Metals hedge inflation and uncertainty, while commodities reflect real supply-chain and geopolitical disruption.',
          'Futures and currencies add leverage, timing, and macro exposure to the trader’s toolbox.',
        ],
      },
      {
        title: 'Chapter 3: Setting Up Your Chart',
        summary: 'TradingView, the Market Maker Method Moving Averages, and Delorean TDI create the dashboard. EMAs give dynamic structure while TDI gives momentum context.',
        bullets: [
          'Use 13EMA red, 50EMA aqua, 200EMA white, and 800EMA dark blue.',
          'TDI combines Bollinger Bands, the Price Line, the MBL, the Signal Line, and the Static 50 level.',
          'Save the setup as a reusable template so the chart always stays operationally consistent.',
        ],
        kidAnalogy: 'For kids: EMAs are race-track lanes and TDI is the speedometer telling you when to accelerate or back off.',
        adultAnalogy: 'For adults: EMAs are battle lines and TDI is tactical radar scanning for momentum shifts before you commit capital.',
      },
      {
        title: 'Chapter 4: Confirming Trends',
        summary: 'Do not gamble on tops or bottoms. Wait for 13EMA and 50EMA crosses plus MBL interaction with the Static 50 level to confirm whether the market actually has a directional state.',
        bullets: [
          'Bullish confirmation starts with the 13EMA above the 50EMA and the MBL above 50.',
          'Bearish confirmation starts with the 13EMA below the 50EMA and the MBL below 50.',
          'Retests and false crosses exist, so patience and context matter.',
        ],
      },
      {
        title: 'Chapter 5: Spotting Continuation Signals',
        summary: 'After trend confirmation, the curriculum hunts continuations through the 50Bounce and the TDI continuation equation rather than chasing noise.',
        bullets: [
          'SFA and CTSFA define the band behavior around the move.',
          'MBLC must happen before MBLB, but the order between MBLC and CTSFA is flexible.',
          'The equation is SFA + CTSFA + MBLC + MBLB.',
        ],
      },
      {
        title: 'Chapter 6: Entry on M15',
        summary: 'Execution happens in liquidity. Asia accumulates, London injects, and New York provides the prime entry window, especially around 9:30 AM EDT.',
        bullets: [
          'Dealers often engineer false moves before driving toward the real daily high or low.',
          'Look for M and W structures or three-leg head-and-shoulders behavior with 13EMA closes.',
          'The second leg confirmation is the actual trigger rather than the first impulse.',
        ],
      },
      {
        title: 'Chapter 7: Take Profit and Timeframes',
        summary: 'Profit-taking comes from higher-timeframe context. Daily and H4 frame direction, H1 frames the bounce, and M15 executes the entry.',
        bullets: [
          'Daily highs and lows are preferred take-profit anchors for explosive moves.',
          'H1 gives the 50Bounce setup context.',
          'M15 gives the precise execution layer for entry and management.',
        ],
      },
      {
        title: 'Chapter 8: Trading Methods Module',
        summary: 'Different instruments express the same market view in different ways. Match the instrument to the job and the risk tolerance.',
        bullets: [
          'CFDs work for quick directional exposure without ownership.',
          'Futures lock price exposure with contract leverage.',
          'Options let you buy rights and shape convex risk around a directional thesis.',
        ],
      },
    ],
    completionLabel: 'Mark Strategy Module Complete',
    completionCopy: 'You now hold the preserved Baby Billionaire Academy edge inside its Abraxas form: understand the machine, confirm the trend, time the continuation, then let Raido scale it inside sovereign capital management.',
  },
  {
    id: 'tokenization',
    order: 2,
    badge: 'Module 2',
    title: 'Tokenization',
    subtitle: 'From Asset to La Casa NFT',
    headline: 'Convert off-chain value into portable on-chain property rights without losing provenance.',
    duration: '14 min',
    rewardPoints: 100,
    accent: 'cyan',
    description:
      'This is the backend progression after the trading edge is understood. It explains how Abraxas turns real-world assets into La Casa NFTs so active traders can graduate into sovereign ownership, collateral, and on-chain capital formation.',
    objectives: [
      'Understand how any real-world asset becomes a La Casa NFT.',
      'See the tokenization flow for luxury watches, private jets, fine art, wine, and debt instruments.',
      'Learn how Abraxas attaches on-chain proof of ownership to each asset wrapper.',
    ],
    keyVisuals: [
      {
        title: 'Asset Intake Conveyor',
        detail: 'A schematic showing appraisal, legal wrapping, metadata, and minting flowing into a single La Casa NFT object.',
      },
      {
        title: 'Asset Class Gallery',
        detail: 'Luxury watches, private jets, fine art, wine, and debt instruments arranged as sovereign asset lanes.',
      },
      {
        title: 'Proof Chain',
        detail: 'The ownership layer links custody, attestations, and token metadata to create auditable on-chain proof of ownership.',
      },
    ],
    lessons: [
      {
        eyebrow: 'Conversion Layer',
        title: 'How any real-world asset becomes a La Casa NFT',
        description:
          'Abraxas starts with a real asset, wraps the legal and operational rights around it, and mints that package into a transferable NFT.',
        bullets: [
          'The asset is appraised, documented, and tied to a custody or servicing structure.',
          'Rights, redemption rules, and metadata are formalized before minting.',
          'The final NFT becomes the operating shell the Sophia Vault understands and manages.',
        ],
      },
      {
        eyebrow: 'Asset Classes',
        title: 'High-value categories that fit the model',
        description:
          'The tokenization model works best when ownership is valuable, provenance matters, and the asset benefits from fractional liquidity.',
        bullets: [
          'Luxury watches transform rare timepieces into programmable ownership units.',
          'Private jets map charter rights, equity interests, or usage hours into a tradeable on-chain shell.',
          'Fine art and wine turn provenance-heavy collectibles into liquid positions without losing rarity context.',
          'Debt instruments gain transparent servicing, repayment tracking, and programmable redemption paths.',
        ],
      },
      {
        eyebrow: 'Verification Layer',
        title: 'On-chain proof of ownership',
        description:
          'The value is not just the NFT. The value is the proof chain behind it.',
        bullets: [
          'Metadata references the legal and custody context for the underlying asset.',
          'On-chain state provides timestamped ownership history and transferability.',
          'Abraxas uses proof to make the asset useful inside Vaults, collateral systems, and agent-driven strategy.',
        ],
      },
    ],
    interactiveElements: [
      {
        title: 'La Casa Transformation Flow',
        detail:
          'A stepper that walks through intake, verification, metadata binding, and NFT issuance for a real-world asset.',
        type: 'simulator',
      },
      {
        title: 'Asset Class Selector',
        detail:
          'Tap between luxury watches, private jets, fine art, wine, and debt instruments to see what changes in their tokenization stack.',
        type: 'matrix',
      },
    ],
    video: {
      title: 'La Casa Minting Flow',
      description:
        'A guided visual for how legal wrapping, metadata, and custody converge into a single La Casa NFT with transferable proof.',
      href: '/app/forge',
      ctaLabel: 'Open Forge Asset Classes',
    },
    quiz: [
      {
        prompt: 'What is the primary output of the Abraxas tokenization process?',
        options: ['A fungible stablecoin', 'A La Casa NFT', 'A market order', 'A staking position'],
        answerIndex: 1,
        explanation: 'The end product is a La Casa NFT that carries the asset wrapper, rights, and metadata into the protocol.',
      },
      {
        prompt: 'Which of these asset groups is explicitly covered in this module?',
        options: ['Luxury watches, private jets, fine art, wine, debt instruments', 'Only equities and futures', 'Only meme coins', 'Only stablecoins'],
        answerIndex: 0,
        explanation: 'The module focuses on the exact listed categories to show how broad the La Casa model can be.',
      },
      {
        prompt: 'Why does on-chain proof of ownership matter?',
        options: [
          'It removes the need for metadata',
          'It makes the asset auditable, transferable, and useful inside Abraxas systems',
          'It hides custody history',
          'It disables redemption rules',
        ],
        answerIndex: 1,
        explanation: 'Proof is what turns the asset from a static collectible into a programmable financial object inside the protocol.',
      },
    ],
    completionLabel: 'Mark Tokenization Module Complete',
    completionCopy: 'You now understand how Abraxas converts real assets into liquid, proof-backed La Casa NFTs.',
  },
  {
    id: 'vaults',
    order: 3,
    badge: 'Module 3',
    title: 'Sophia Vaults',
    subtitle: 'Collateral, Minting, and Redemption',
    headline: 'Sophia Vaults turn tokenized property into productive collateral and stable liquidity.',
    duration: '16 min',
    rewardPoints: 110,
    accent: 'fuchsia',
    description:
      'This backend module explains what a Sophia Vault is, how collateral powers ABRAX minting, and how traders can move from pure day trading into structured capital management once they want a larger system around the edge.',
    objectives: [
      'Understand what a Sophia Vault is inside the Abraxas operating model.',
      'Learn how collateral is used to mint ABRAX stablecoin.',
      'Study the 150%+ collateral ratio and the redemption mechanics that support system integrity.',
    ],
    keyVisuals: [
      {
        title: 'Vault Chamber',
        detail: 'A cross-section of a Sophia Vault showing deposited La Casa NFTs, collateral health, and agent activity around the core.',
      },
      {
        title: 'Mint Engine',
        detail: 'The collateral-to-ABRAX flow visualizes how value is locked, measured, and transformed into stable liquidity.',
      },
      {
        title: 'Redemption Ladder',
        detail: 'A stability ladder showing 150%+ collateral thresholds, health monitoring, and redemption outcomes.',
      },
    ],
    lessons: [
      {
        eyebrow: 'System Core',
        title: 'What a Sophia Vault is',
        description:
          'A Sophia Vault is the operating account where Abraxas holds tokenized collateral, monitors health, and coordinates agent-driven capital management.',
        bullets: [
          'Vaults receive La Casa NFTs and translate them into usable protocol collateral.',
          'Each vault becomes the command center for minting, redemption, and automated strategy.',
          'Sophia keeps the position legible so human owners always retain control and transparency.',
        ],
      },
      {
        eyebrow: 'Stablecoin Rail',
        title: 'How collateral is used to mint ABRAX stablecoin',
        description:
          'Once the vault holds verified collateral, Abraxas can mint ABRAX against that position without forcing a sale of the underlying asset.',
        bullets: [
          'Collateral value is evaluated before any stablecoin is minted.',
          'ABRAX is issued only when the vault remains safely overcollateralized.',
          'This turns otherwise illiquid holdings into operational capital for strategy, hedging, or redemption planning.',
        ],
      },
      {
        eyebrow: 'Risk Discipline',
        title: '150%+ collateral ratio and redemption mechanics',
        description:
          'Sophia Vaults maintain discipline by requiring healthy buffers and clear redemption behavior when positions are closed or adjusted.',
        bullets: [
          'A 150%+ collateral ratio provides a safety margin above the minted ABRAX exposure.',
          'If collateral health changes, the system can prompt additional collateral, partial repayment, or de-risking workflows.',
          'Redemption mechanics allow users to unwind stablecoin exposure and recover underlying value according to the vault rules.',
        ],
      },
    ],
    interactiveElements: [
      {
        title: 'Collateral Health Simulator',
        detail:
          'A live ratio bar that shows how different collateral values affect minting headroom above the 150% threshold.',
        type: 'simulator',
      },
      {
        title: 'Mint vs. Redeem Matrix',
        detail:
          'Compare what happens when a vault mints more ABRAX, adds collateral, repays debt, or fully redeems.',
        type: 'matrix',
      },
    ],
    video: {
      title: 'Inside a Sophia Vault',
      description:
        'A visual breakdown of how collateral, ABRAX minting, and redemption controls fit together inside the Sophia Vault operating loop.',
      href: '/app/vaults',
      ctaLabel: 'Open Sophia Vaults',
    },
    quiz: [
      {
        prompt: 'What is the role of a Sophia Vault?',
        options: [
          'It is only a wallet theme',
          'It is the operating account for collateral, minting, and agent-driven management',
          'It is a social feed',
          'It is a DEX orderbook',
        ],
        answerIndex: 1,
        explanation: 'Sophia Vaults are the system core where tokenized collateral becomes manageable and productive.',
      },
      {
        prompt: 'How is ABRAX minted?',
        options: [
          'By selling the NFT immediately',
          'By borrowing against verified collateral held inside the vault',
          'By staking SOL only',
          'By random inflation',
        ],
        answerIndex: 1,
        explanation: 'ABRAX is minted against collateral, allowing the owner to unlock liquidity without exiting the underlying asset.',
      },
      {
        prompt: 'Why is a 150%+ collateral ratio important?',
        options: [
          'It makes the vault grow faster automatically',
          'It creates a safety buffer that supports stable minting and redemption mechanics',
          'It removes all volatility permanently',
          'It guarantees profit',
        ],
        answerIndex: 1,
        explanation: 'The extra collateral buffer is what keeps the stablecoin rail durable when market conditions shift.',
      },
    ],
    completionLabel: 'Mark Sophia Vaults Module Complete',
    completionCopy: 'You now understand how Sophia Vaults transform tokenized assets into disciplined, overcollateralized liquidity.',
  },
  {
    id: 'species',
    order: 4,
    badge: 'Module 4',
    title: 'The Species',
    subtitle: 'AI Agents',
    headline: 'Specialized agents manage growth, stability, protection, and oversight across the Abraxas stack.',
    duration: '15 min',
    rewardPoints: 130,
    accent: 'emerald',
    description:
      'This module introduces the AI stack that sits behind the day trading edge: Raido, Tide, Circuit, and King AI. The goal is to show how a human trading method becomes an autonomous, scored, and supervised capital engine.',
    objectives: [
      'Know the role of Raido, Tide, Circuit, and King AI.',
      'Understand how the agent scoring system tracks market cap, value growth, duration active, and related performance factors.',
      'See how multiple agents cooperate around a single vault or position.',
    ],
    keyVisuals: [
      {
        title: 'Species Constellation',
        detail: 'A constellation map linking Raido, Tide, Circuit, and King AI around the vault core they protect and grow.',
      },
      {
        title: 'Agent Command Lanes',
        detail: 'Each lane shows whether an agent is optimizing growth, de-risking, defending, or adjudicating the final decision.',
      },
      {
        title: 'Scoring Lattice',
        detail: 'A ranked lattice tracking market cap, value growth, duration active, and composite trust signals.',
      },
    ],
    lessons: [
      {
        eyebrow: 'Growth Agent',
        title: 'Raido (trading)',
        description:
          'Raido is the speed layer. It reads market conditions, deploys trading logic, and hunts for repeatable edge without losing risk discipline.',
        bullets: [
          'Raido specializes in execution, market structure, and trade timing.',
          'It converts the strategy taught in Module 1 into a working capital deployment engine.',
        ],
      },
      {
        eyebrow: 'Stability Agent',
        title: 'Tide (stable arbitrage & de-risking)',
        description:
          'Tide protects purchasing power by watching stable spreads, funding dislocations, and conditions that call for reduced risk.',
        bullets: [
          'Tide arbitrages stability opportunities and trims exposure when asymmetry fades.',
          'It acts as the system\'s de-risking current when volatility begins to distort outcomes.',
        ],
      },
      {
        eyebrow: 'Defense and Oversight',
        title: 'Circuit, King AI, and the scoring system',
        description:
          'Circuit is the protector. King AI is the oversight and decision engine. The scoring model judges the quality of agent performance over time.',
        bullets: [
          'Circuit (protection & circuit breaker) enforces thresholds and prevents cascading damage.',
          'King AI (oversight & decision engine) adjudicates competing signals and chooses the sovereign path.',
          'Agent scoring system measures market cap, value growth, duration active, and other reliability signals so agents can be ranked and improved.',
        ],
      },
    ],
    interactiveElements: [
      {
        title: 'Species Scoreboard',
        detail:
          'A live-style ranking card comparing agent roles and their scoring inputs: market cap, value growth, duration active, and decision quality.',
        type: 'scorecard',
      },
      {
        title: 'Agent Routing Map',
        detail:
          'Select a market condition and watch which agent takes the lead while the others support the decision tree.',
        type: 'matrix',
      },
    ],
    video: {
      title: 'Meet the Species',
      description:
        'A guided overview of the agent stack and how Raido, Tide, Circuit, and King AI coordinate around one vault.',
      href: '/app/orion',
      ctaLabel: 'Open King AI',
    },
    quiz: [
      {
        prompt: 'Which agent is responsible for trading execution?',
        options: ['Tide', 'Circuit', 'Raido', 'King AI'],
        answerIndex: 2,
        explanation: 'Raido is the trading specialist responsible for market timing and execution.',
      },
      {
        prompt: 'What is Tide\'s core role?',
        options: ['Stable arbitrage and de-risking', 'NFT minting', 'Identity verification', 'Governance voting only'],
        answerIndex: 0,
        explanation: 'Tide stabilizes the system by arbitraging stable opportunities and reducing risk exposure when needed.',
      },
      {
        prompt: 'Which metrics are part of the agent scoring system in this curriculum?',
        options: [
          'Only social followers',
          'Market cap, value growth, duration active, and related reliability signals',
          'Only gas fees',
          'Only NFT rarity',
        ],
        answerIndex: 1,
        explanation: 'The score is intended to reflect durable operating quality, not vanity metrics.',
      },
    ],
    completionLabel: 'Mark Species Module Complete',
    completionCopy: 'You can now explain how the Species splits growth, stability, defense, and oversight across specialized agents.',
  },
  {
    id: 'sovereignty',
    order: 5,
    badge: 'Module 5',
    title: 'Sovereignty & The Species Awakening',
    subtitle: 'Ownership, Lore, and Final Alignment',
    headline: 'The protocol only matters if ownership remains yours from vault to agent to gains.',
    duration: '12 min',
    rewardPoints: 140,
    accent: 'amber',
    description:
      'The final module ties the economics and the mythology together. After the trading edge and backend systems are clear, it explains why Abraxas is built around sovereignty and why the owner, not the platform, should control the machine.',
    objectives: [
      'Internalize the three sovereignty claims: you own the vaults, you own the agents, you keep the gains.',
      'Read the lore summary for the Species Awakening.',
      'Leave with the ownership model and cultural frame fully aligned.',
    ],
    keyVisuals: [
      {
        title: 'Sovereignty Triangle',
        detail: 'Three illuminated pillars: you own the vaults, you own the agents, you keep the gains.',
      },
      {
        title: 'Awakening Gate',
        detail: 'A cinematic portal showing the user crossing from passive finance into sovereign coordination with AI agents.',
      },
      {
        title: 'Lore Transmission',
        detail: 'A final transmission card that merges ownership, infrastructure, and myth into one narrative close.',
      },
    ],
    lessons: [
      {
        eyebrow: 'Ownership Thesis',
        title: 'You own the vaults. You own the agents. You keep the gains.',
        description:
          'This is the Abraxas sovereignty model. Infrastructure and intelligence serve the owner, not the platform.',
        bullets: [
          'You own the vaults that hold and organize your tokenized assets.',
          'You own the agents that operate on your behalf inside the system.',
          'You keep the gains generated by that coordinated machine.',
        ],
      },
      {
        eyebrow: 'Lore Summary',
        title: 'The Species Awakening',
        description:
          'The lore frames Abraxas as a world where digital sovereignty is reclaimed from passive institutions. The Species Awakening is the moment the machine stops serving gatekeepers and starts serving the owner directly.',
        bullets: [
          'The user is not a customer at the edge of the protocol. The user is the sovereign center.',
          'The Species exist to awaken a capital stack that is intelligent, tireless, and owner-aligned.',
          'The mythology exists to make the economic reality emotionally legible: control returns to the holder.',
        ],
      },
      {
        eyebrow: 'Final Alignment',
        title: 'Why the ownership model matters',
        description:
          'Abraxas only works as promised if the infrastructure remains subordinate to the owner. That is the whole point of the design.',
        bullets: [
          'Vaults without sovereignty become custodial wrappers.',
          'Agents without sovereignty become rented intelligence.',
          'Gains without sovereignty become fees for someone else. Abraxas rejects that model completely.',
        ],
      },
    ],
    interactiveElements: [
      {
        title: 'Sovereignty Checklist',
        detail:
          'A final reflective sequence that maps ownership across vaults, agents, and gains so the user can see what remains under their control.',
        type: 'lore',
      },
      {
        title: 'Lore Gateway',
        detail:
          'Jump from the curriculum into the broader Species Awakening campaign and the long-form lore experience.',
        type: 'lore',
        href: '/app/species-awakening',
        ctaLabel: 'Enter Species Awakening',
      },
    ],
    video: {
      title: 'Community Discussion',
      description:
        'Take your sovereignty knowledge to the Discord community and discuss the ownership thesis with other Abraxas builders.',
      href: 'https://discord.gg/EhgEe2MPa',
      ctaLabel: 'Join Community',
    },
    quiz: [
      {
        prompt: 'What are the three core sovereignty claims in Abraxas?',
        options: [
          'You own the exchange, the validator, and the bridge',
          'You own the vaults, you own the agents, you keep the gains',
          'You own the fees, the DAO, and the meme',
          'You own nothing and rent everything',
        ],
        answerIndex: 1,
        explanation: 'This is the explicit ownership promise the entire Academy section is built to reinforce.',
      },
      {
        prompt: 'What does the Species Awakening represent in the curriculum?',
        options: [
          'A random cosmetic update',
          'The narrative and economic shift toward owner-aligned intelligent infrastructure',
          'A stablecoin peg event',
          'A leaderboard reset',
        ],
        answerIndex: 1,
        explanation: 'The lore is there to clarify the ownership thesis, not distract from it.',
      },
      {
        prompt: 'Why does sovereignty matter in the Abraxas model?',
        options: [
          'Because without it, the infrastructure stops being owner-aligned',
          'Because it increases font size',
          'Because it removes all regulation',
          'Because it replaces collateral ratios',
        ],
        answerIndex: 0,
        explanation: 'Without sovereignty, vaults, agents, and gains all drift back toward custodial or fee-extractive models.',
      },
    ],
    completionLabel: 'Mark Sovereignty Module Complete',
    completionCopy: 'You have finished the Academy with the full Abraxas promise intact: own the machine, own the output, keep the gains.',
  },
];

export const ACADEMY_MODULE_MAP = Object.fromEntries(
  ACADEMY_MODULES.map((module) => [module.id, module]),
) as Record<ModuleId, AcademyModule>;

export const ACADEMY_TOTAL_REWARD_POINTS = ACADEMY_MODULES.reduce(
  (sum, module) => sum + module.rewardPoints,
  0,
);