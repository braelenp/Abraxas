// King AI knowledge base — powers both the overview modal and the chat layer.
// Rule-based matching covers all major app areas. Extend keywords/answer pairs as
// the product grows without changing the widget or modal components.

export type KingMessage = { role: "user" | "king"; text: string };

const knowledge: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["dash", "dashboard", "command center", "home", "main"],
    answer:
      "The Dash tab is your Athlete Command Center. It shows your live stats — drills completed, current streak, pending SKR rewards, and badge tier — all pulled from your Solana devnet athlete profile. You can initialize your on-chain profile here and log drills directly through the Drill Tracker below the stats.",
  },
  {
    keywords: ["drill", "log", "complete", "workout", "training", "session", "tracker"],
    answer:
      "Open the Dash tab and scroll to the Drill Tracker. Each Swain drill card shows the focus area, duration, and SKR reward. Tap Complete to record it on-chain via your connected wallet. Your streak, total drills, and reward balance all update automatically after each logged session.",
  },
  {
    keywords: ["king", "kingslee", "recommendation", "suggest", "recommend", "next move"],
    answer:
      "The King tab surfaces my full recommendation matrix. I analyze your drill history, streak consistency, and badge velocity to recommend your next Swain session. I track three core dimensions: Footwork Efficiency, Burst Window readiness, and Contact Finish preparation. The more you log, the sharper my reads become. Ask me anything about your training rhythm.",
  },
  {
    keywords: ["nil", "badge", "mint", "milestone", "swain shooter"],
    answer:
      "NIL badges are on-chain proof milestones minted when your athlete profile crosses defined training thresholds. The Swain Shooter badge is the first to target — it requires verified shooting workout volume and streak consistency. Once triggered, the badge record lives on Solana and can be shared with coaches and evaluators.",
  },
  {
    keywords: ["recruit", "recruiter", "share", "visible", "coaches", "profile", "proof"],
    answer:
      "The Recruit tab is your public-facing training proof layer. It maps your on-chain drill events to readable signals that coaches can verify: shooting count, finishing sessions, and milestone streaks. A shareable public view with opt-in visibility controls is the next feature in that pipeline — connect your wallet and build your log now so it's ready.",
  },
  {
    keywords: ["team", "aau", "squad", "roster", "accountability", "group"],
    answer:
      "The Team tab is built for AAU organizations. It tracks connected squads, live session slots, and shared drill packs. The @swain_basketball content feed is connected at the bottom of the integration section. Once coach workflows are ready, you'll see live Swain session scheduling, team-level drill compliance data, and post-session recap NFTs here.",
  },
  {
    keywords: ["skr", "reward", "claim", "token", "earn", "points"],
    answer:
      "SKR rewards are accrued each time you log a drill on-chain. Your pending balance shows on the Dash tab. Once rewards are queued, tap 'Claim SKR Rewards' to trigger the on-chain claim transaction. This calls the claim_skr_rewards instruction on your athlete profile PDA on Solana devnet.",
  },
  {
    keywords: ["wallet", "connect", "phantom", "solflare", "solana", "not connected", "connection"],
    answer:
      "Connect your wallet using the wallet button in the app header at the top of the screen. We support Phantom and Solflare on Solana devnet. Once connected, your athlete profile PDA is derived from your public key. All drill logs, badge mints, and reward claims require an active wallet connection and a small SOL balance for transaction fees.",
  },
  {
    keywords: ["streak", "consecutive", "daily", "days", "best streak"],
    answer:
      "Your streak increments each day you log at least one drill on-chain. Maintaining a streak boosts your SKR bonus multipliers and accelerates badge threshold velocity. The Dash shows your current streak and all-time best streak from your athlete profile. The King tab's Streak Stability metric tracks the momentum trend.",
  },
  {
    keywords: ["initialize", "profile", "create account", "start", "new athlete", "setup"],
    answer:
      "If you're new, connect your wallet first, then go to the Dash tab and tap 'Initialize Athlete Profile'. This sends the initialize_profile instruction to the OYM Solana program and creates your athlete PDA on devnet. You'll need a small SOL balance for the transaction fee. After initialization, all your drill logs and rewards are tied to that account.",
  },
  {
    keywords: ["navigate", "how do i", "how to", "where", "find", "get to", "go to", "tabs", "sections"],
    answer:
      "Use the four tabs at the bottom of the screen: Dash for your live command center, King for AI training guidance, Recruit for your NIL proof layer, and Team for AAU squad features. The King AI floating button is available on every tab so you can ask me questions anytime without leaving your current view.",
  },
  {
    keywords: ["what is", "what does", "explain", "overview", "about", "platform", "app"],
    answer:
      "Own Your Moment is a high-performance basketball training platform built on Solana. Athletes log daily Swain drills on-chain, build a verifiable training history, accumulate SKR rewards, and earn NIL-ready badges. King AI (that's me) provides personalized guidance based on your logged data. The goal: when a coach or evaluator looks you up, your work is already proven on-chain.",
  },
  {
    keywords: ["shot", "shooting", "perimeter", "footwork", "finishing", "contact", "burst"],
    answer:
      "Based on your current drill mix, I track three areas: perimeter shot balance (needs 12% more reps), burst window readiness (streak is strong enough to layer reactive reads), and contact finish preparation (rim-pressure volume is trending up). Check the King tab for the full recommendation matrix with specific Swain drills mapped to each area.",
  },
];

export function kingAnswer(question: string): string {
  const q = question.toLowerCase();
  for (const entry of knowledge) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.answer;
    }
  }
  return "I'm locked in on your training, but I don't have a specific read on that yet. Try asking me about your drills, streak, SKR rewards, NIL badges, recruiter profile, wallet setup, or how to navigate the app — those are my strongest areas right now.";
}
