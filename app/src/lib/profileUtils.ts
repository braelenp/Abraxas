/**
 * Profile Management Utilities
 * - Abraxas ID generation
 * - Rune selection
 * - Blessing personalization
 * - Referral links
 * - Points calculation
 */

// Elder Futhark runes with mystical properties
const ELDER_FUTHARK_RUNES = [
  'ᚠ', // Fehu - Wealth, prosperity
  'ᚢ', // Uruz - Strength, health
  'ᚦ', // Thurisaz - Protection, conflict
  'ᚨ', // Ansuz - Communication, air
  'ᚱ', // Raido - Journey, wheel
  'ᚲ', // Kenaz - Fire, knowing
  'ᚳ', // Gebo - Gift, exchange
  'ᚦ', // Wunjo - Joy, harmony
  'ᚼ', // Hagalaz - Transformation
  'ᚾ', // Nauthiz - Necessity, constraint
  'ᛁ', // Isa - Ice, stillness
  'ᛃ', // Jera - Harvest, cycle
  'ᛇ', // Eihwaz - Yew, mystery
  'ᛈ', // Perthro - Secret, initiation
  'ᛉ', // Algiz - Protection, elk
  'ᛋ', // Sowilo - Sun, victory
  'ᛏ', // Tiwaz - War, justice
  'ᛒ', // Berkano - Birch, growth
  'ᛖ', // Ehwaz - Horse, progress
  'ᛗ', // Mannaz - Human, self
  'ᛗ', // Laguz - Water, flow
  'ᛜ', // Inguz - Seed, potential
  'ᛞ', // Othala - Inheritance, home
  'ᛟ', // Dagaz - Day, transformation
];

const BLESSINGS_TEMPLATES = [
  'In the dance of runes, your path is illuminated.',
  'By the ancient threads, fortune flows through you.',
  'The Abraxas recognizes your entrance into the eternal market.',
  'Your presence harmonizes with the cosmic ledger.',
  'Through fire and code, you emerge transformed.',
  'The serpent coils around your prosperity.',
  'In the shadow of runes, clarity emerges.',
  'Your steps echo through the halls of abundance.',
  'By deception\'s end, truth becomes your covenant.',
  'The market bows to those who truly understand it.',
  'In numbers infinite, you find your voice.',
  'The rune speaks: you are prepared for greatness.',
  'Through sacrifice and wisdom, gates open.',
  'Your essence joins the eternal exchange.',
  'In the weaving of fates, you are the thread.',
];

const POSITIVE_ADJECTIVES = [
  'visionary',
  'bold',
  'steadfast',
  'luminous',
  'eternal',
  'sovereign',
  'mystic',
  'radiant',
  'boundless',
  'arcane',
  'astral',
  'serene',
  'fierce',
];

// Sequential ID counter (in production, this would be database-backed)
let abraxasIdCounter = Math.floor(Math.random() * 100000) + 1; // Start between 1-100k

/**
 * Generate a unique sequential Abraxas ID
 */
export function generateAbraxasId(): string {
  const id = abraxasIdCounter++;
  return `ABRAXAS-${String(id).padStart(6, '0')}`;
}

/**
 * Get a random Elder Futhark rune
 */
export function getRandomRune(): string {
  return ELDER_FUTHARK_RUNES[Math.floor(Math.random() * ELDER_FUTHARK_RUNES.length)];
}

/**
 * Generate a personalized Abraxas Blessing
 * Combines template with random adjectives for uniqueness
 */
export function generateBlessing(): string {
  const baseBlessing = BLESSINGS_TEMPLATES[
    Math.floor(Math.random() * BLESSINGS_TEMPLATES.length)
  ];

  // Add emphasis with random adjective for additional personalization
  if (Math.random() > 0.4) {
    const adjective = POSITIVE_ADJECTIVES[
      Math.floor(Math.random() * POSITIVE_ADJECTIVES.length)
    ];
    return `${baseBlessing} You are ${adjective}.`;
  }

  return baseBlessing;
}

/**
 * Generate a unique referral code
 * Used for tracking referrals and generating referral links
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a referral link with all necessary info
 * Format: app.abraxas.xyz/campaign?ref=CODE&rune=ᚠ&id=ABRAXAS-001234
 */
export function createReferralLink(
  abraxasId: string,
  rune: string,
  referralCode: string,
  baseUrl: string = typeof window !== 'undefined'
    ? `${window.location.origin}/campaign`
    : 'https://abraxas.app/campaign'
): string {
  const params = new URLSearchParams({
    ref: referralCode,
    rune: encodeURIComponent(rune),
    id: abraxasId,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Calculate airdrop points based on action type
 */
export function calculatePointsForAction(
  actionType:
    | 'profile_creation'
    | 'card_share'
    | 'referral_signup'
    | 'referral_staking'
    | 'engagement',
  metadata?: Record<string, any>
): number {
  const pointsMap: Record<string, number> = {
    profile_creation: 100,
    card_share: 10,
    referral_signup: 50,
    referral_staking: 150, // Bonus for successful staking referral
    engagement: 5,
  };

  let points = pointsMap[actionType] || 0;

  // Bonus multipliers based on metadata
  if (metadata?.isHighValueReferral) {
    points *= 2; // 2x for high-value referrals
  }

  return points;
}

/**
 * Parse referral link to extract parameters
 */
export function parseReferralLink(url: string): {
  referralCode: string | null;
  abraxasId: string | null;
  rune: string | null;
} {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    return {
      referralCode: params.get('ref'),
      abraxasId: params.get('id'),
      rune: params.get('rune'),
    };
  } catch {
    return { referralCode: null, abraxasId: null, rune: null };
  }
}

/**
 * Format points for display with breakdown
 */
export function formatPointsDisplay(
  breakdown: { [key: string]: number }
): string {
  const items = Object.entries(breakdown)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => `${key}: ${value}`);

  return items.join(' • ');
}

/**
 * Estimate progress toward airdrop threshold
 */
export function calculateAirdropProgress(
  currentPoints: number,
  targetPoints: number = 500 // Target for Sharathon airdrop
): {
  percentage: number;
  remaining: number;
  isEligible: boolean;
} {
  const percentage = Math.min((currentPoints / targetPoints) * 100, 100);
  const remaining = Math.max(targetPoints - currentPoints, 0);

  return {
    percentage,
    remaining,
    isEligible: currentPoints >= targetPoints,
  };
}

/**
 * Generate a summary message for email with airdrop summary
 */
export function generateAirdropSummaryEmail(
  abraxasId: string,
  rune: string,
  blessing: string,
  points: { [key: string]: number },
  totalPoints: number,
  totalReferrals: number,
  airdropAmountEstimate: number
): string {
  const progress = calculateAirdropProgress(totalPoints);

  return `
Your Abraxas ID Card Summary

ID Number: ${abraxasId}
Your Rune: ${rune}
Blessing: ${blessing}

Airdrop Program Summary
═══════════════════════════════════════

Total Points Earned: ${totalPoints}
Progress to Airdrop: ${progress.percentage.toFixed(1)}% (${totalPoints} / 500 points)
Successful Referrals: ${totalReferrals}

Points Breakdown:
${Object.entries(points)
  .filter(([, v]) => v > 0)
  .map(([k, v]) => `  • ${k}: ${v} points`)
  .join('\n')}

Estimated Airdrop Reward: $${airdropAmountEstimate.toFixed(2)} ABRA
(Exact amount will be calculated after Sharathon ends on ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()})

Making DeFi Great Again 🔮✨

Claim your airdrop at: https://abraxas.app/claim

═══════════════════════════════════════
This is your unique Abraxas receipt. Keep it safe!
`;
}

/**
 * Mock email sending (in production, integrate with Resend or SendGrid)
 */
export async function sendAirdropSummaryEmail(
  email: string,
  abraxasId: string,
  rune: string,
  blessing: string,
  points: { [key: string]: number },
  totalPoints: number,
  totalReferrals: number,
  airdropAmountEstimate: number
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailBody = generateAirdropSummaryEmail(
      abraxasId,
      rune,
      blessing,
      points,
      totalPoints,
      totalReferrals,
      airdropAmountEstimate
    );

    // TODO: Replace with actual email service (Resend, SendGrid, etc.)
    console.log('📧 Email would be sent to:', email);
    console.log('─'.repeat(60));
    console.log(emailBody);
    console.log('─'.repeat(60));

    // For now, simulate success
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
