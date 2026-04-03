export interface RuneTab {
  id: string
  rune: string
  name: string
  essence: string
  lore: string
  icon: string
  color: 'cyan' | 'purple' | 'orange' | 'gold'
  content: string
}

export const VALKYR_RUNE_TABS: RuneTab[] = [
  {
    id: 'warden',
    rune: 'ᛉ',
    name: 'Warden',
    essence: 'Protection · Divine Guardianship',
    lore: 'Algiz stands as the rune of divine protection, elk antlers raised against all unseen forces. The Warden holds the threshold between chaos and the sovereign order of Valkyr. Live portfolio monitoring, risk alerts, and strategic intelligence all answer to the Warden\'s watch.',
    icon: '🛡️',
    color: 'purple',
    content:
      'Dashboard Overview\n\nValkyr\'s sentinel watches over your entire asset position. Real-time alerts, portfolio composition, and risk metrics flow through the Warden\'s lens.',
  },
  {
    id: 'sophia',
    rune: 'ᚨ',
    name: 'Sophia',
    essence: 'Divine Wisdom · Sacred Speech',
    lore: 'Ansuz carries the breath of Odin, divine intelligence flowing into form. Sophia speaks your vaults into being, governing every deposit, allocation, and yield cycle with autonomous precision. Cold storage custody. Multi-sig architecture. The vault is law.',
    icon: '🏛️',
    color: 'cyan',
    content:
      'Custody & Vaults\n\nMulti-signature cold storage protecting your tokenized positions. Sophia\'s vault architecture ensures zero-knowledge custody with cryptographic proof of reserves.',
  },
  {
    id: 'raido',
    rune: 'ᛋ',
    name: 'Raido',
    essence: 'Sun · Victorious Vision',
    lore: 'Sowilo is the sun-wheel, the unstoppable light of sovereign victory. Raido sees every asset class trajectory across the Sophia family—from Echo\'s royalties to Aurelia\'s real estate. The trajectory is visible before the market makes its move.',
    icon: '📊',
    color: 'gold',
    content:
      'Strategic Oversight\n\nComprehensive view of all tokenized assets under Valkyr protection. Asset allocation, performance tracking, and strategic positioning guidance.',
  },
  {
    id: 'flux',
    rune: 'ᛚ',
    name: 'Flux',
    essence: 'Water · Swift Flow',
    lore: 'Laguz flows where force cannot follow. Flux reads the current of every market tide, executing strategic rebalancing and yield optimization with fluid precision. Capital moves when Flux moves.',
    icon: '⚡',
    color: 'cyan',
    content:
      'Capital Flow & Rebalancing\n\nDynamic capital routing to maximize protection and yield. Real-time rebalancing based on market conditions and vault strategies.',
  },
  {
    id: 'king',
    rune: 'ᛏ',
    name: 'King',
    essence: 'Tyr · Wise Kingship',
    lore: 'Tiwaz is the spear of Tyr, sacrificial wisdom that upholds cosmic law. King renders sovereign judgment on asset quality, strategic timing, and long-term value creation. The forecast becomes law.',
    icon: '👑',
    color: 'purple',
    content:
      'Governance & Decisions\n\nOn-chain governance for strategic custody decisions. Stakeholder voting on vault parameters, allocation strategy, and protective measures.',
  },
  {
    id: 'aegis',
    rune: 'ᚦ',
    name: 'Aegis',
    essence: 'Thorn · Unbreakable Defense',
    lore: 'Thurisaz is the thorn of Thor, the force that stops chaos in its path. Aegis monitors every threshold of your vaults, triggering circuit protections against price volatility, liquidity drain, and anomalous activity before entropy can breach the walls.',
    icon: '🔐',
    color: 'orange',
    content:
      'Circuit Breaker & Defense\n\nAutomated protective mechanisms trigger at configurable thresholds. Stop-loss protections, volatility halts, and emergency lockdown protocols.',
  },
  {
    id: 'forge',
    rune: 'ᚲ',
    name: 'Forge',
    essence: 'Torch · Capital Forging',
    lore: 'Kenaz is the rune of transformation. The Forge converts protected capital into strategic opportunities. Here, assets gain positioning—trading dormancy for compounding, liquidity, and autonomous strategy execution. The opportunity that burns for you reveals itself.',
    icon: '🔥',
    color: 'gold',
    content:
      'Strategic Opportunities\n\nAligned opportunities across the Sophia family. Yield generation, strategic partnerships, and long-term wealth building.',
  },
]
