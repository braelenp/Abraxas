export type SwainDrill = {
  id: string;
  title: string;
  focus: string;
  durationMinutes: number;
  reward: number;
  recommendedFor: string;
  description: string;
  source: string;
};

export type ExampleAthlete = {
  id: string;
  name: string;
  initials: string;
  imagePath?: string;
  position: string;
  classYear: string;
  archetype: string;
  team: string;
  summary: string;
  verifiedWorkouts: number;
  finishingSessions: number;
  streak: number;
  pendingSkr: number;
  readiness: string;
  badge: string;
  focusAreas: string[];
};

export type GameStatEntry = {
  id: string;
  athleteId: string;
  competition: "School" | "AAU";
  opponent: string;
  dateLabel: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fgPct: number;
  threePct: number;
  translationTag: "Strong carryover" | "Rising carryover" | "Needs carryover";
  translationNote: string;
};

export type NilMerchItem = {
  id: string;
  athleteId: string;
  title: string;
  category: string;
  price: string;
  status: string;
  description: string;
};

export const swainDrills: SwainDrill[] = [
  {
    id: "swain-hesi-series",
    title: "Hesi Split Reads",
    focus: "Burst creation",
    durationMinutes: 18,
    reward: 40,
    recommendedFor: "Guards building downhill decision speed",
    description: "Attack from the wing, freeze the help defender, split the gap, and finish off one foot.",
    source: "Placeholder from @swain_basketball content pipeline",
  },
  {
    id: "swain-corner-balance",
    title: "Corner Drift Balance",
    focus: "Footwork + balance",
    durationMinutes: 14,
    reward: 28,
    recommendedFor: "Shooters improving relocation mechanics",
    description: "Relocate off penetration, square in the air, and land with a stable shooting base.",
    source: "Placeholder from @swain_basketball content pipeline",
  },
  {
    id: "swain-finishing-contact",
    title: "Contact Finishing Ladder",
    focus: "Paint finishing",
    durationMinutes: 20,
    reward: 50,
    recommendedFor: "Wings absorbing contact around the rim",
    description: "Progress through pads, inside-hand finishes, extension layups, and short-roll touch shots.",
    source: "Placeholder from @swain_basketball content pipeline",
  },
];

export const swainIntegrationChecklist = [
  "Replace placeholder drill feed with approved Swain Basketball content source or CMS endpoint.",
  "Store drill metadata off-chain and anchor drill completions on-chain through the athlete profile PDA.",
  "Attach video clips in public/assets or a CDN once media rights and upload flow are finalized.",
];

export const recruiterSnapshot = [
  { label: "Verified Shooting Workouts", value: "41" },
  { label: "Finishing Sessions", value: "18" },
  { label: "Coach-Verified Milestones", value: "07" },
];

export const exampleAthletes: ExampleAthlete[] = [
  {
    id: "aj-williams",
    name: "AJ Williams",
    initials: "AJ",
    imagePath: "/assets/ajwilliams.jpg",
    position: "Wing",
    classYear: "2027",
    archetype: "Explosive downhill scorer",
    team: "OYM National",
    summary: "Example athlete profile showing how verified drill history, streaks, and NIL progress can appear in the product.",
    verifiedWorkouts: 17,
    finishingSessions: 8,
    streak: 6,
    pendingSkr: 124,
    readiness: "High major watch",
    badge: "USA Gold Standard",
    focusAreas: ["Rim pressure", "Transition reads", "Point-of-attack defense"],
  },
  {
    id: "caleb-wilson",
    name: "Caleb Wilson",
    initials: "CW",
    imagePath: "/assets/calebwilson.jpg",
    position: "Forward",
    classYear: "2025",
    archetype: "Two-way mismatch creator",
    team: "OYM Select",
    summary: "Example frontcourt profile centered on versatility, defensive activity, and consistency markers recruiters can scan quickly.",
    verifiedWorkouts: 14,
    finishingSessions: 6,
    streak: 5,
    pendingSkr: 96,
    readiness: "Immediate impact prospect",
    badge: "Mismatch Engine",
    focusAreas: ["Face-up creation", "Weak-side rim protection", "Short-roll playmaking"],
  },
  {
    id: "hailee-swain",
    name: "Hailee Swain",
    initials: "HS",
    imagePath: "/assets/haileeswain.jpg",
    position: "Guard",
    classYear: "2028",
    archetype: "Shotmaking lead guard",
    team: "Swain Elite",
    summary: "Example youth guard profile that demonstrates how early-stage athletes can still show discipline, growth trends, and coach-facing proof.",
    verifiedWorkouts: 10,
    finishingSessions: 4,
    streak: 4,
    pendingSkr: 72,
    readiness: "Emerging national radar",
    badge: "Shot Creator",
    focusAreas: ["Pull-up balance", "Handle under pressure", "Decision speed"],
  },
];

export const schoolGameStats: GameStatEntry[] = [
  {
    id: "school-aj-01",
    athleteId: "aj-williams",
    competition: "School",
    opponent: "Lincoln Prep",
    dateLabel: "Jan 12",
    minutes: 30,
    points: 23,
    rebounds: 7,
    assists: 4,
    steals: 2,
    blocks: 1,
    turnovers: 2,
    fgPct: 54,
    threePct: 38,
    translationTag: "Strong carryover",
    translationNote: "Rim pressure and transition reads from training are showing up in live game decisions.",
  },
  {
    id: "school-aj-02",
    athleteId: "aj-williams",
    competition: "School",
    opponent: "Eastbrook Academy",
    dateLabel: "Jan 20",
    minutes: 28,
    points: 18,
    rebounds: 5,
    assists: 6,
    steals: 3,
    blocks: 0,
    turnovers: 1,
    fgPct: 48,
    threePct: 40,
    translationTag: "Strong carryover",
    translationNote: "Low turnover count reflects drill discipline holding under defensive pressure.",
  },
  {
    id: "school-aj-03",
    athleteId: "aj-williams",
    competition: "School",
    opponent: "North Central HS",
    dateLabel: "Feb 3",
    minutes: 32,
    points: 27,
    rebounds: 8,
    assists: 3,
    steals: 2,
    blocks: 2,
    turnovers: 3,
    fgPct: 61,
    threePct: 44,
    translationTag: "Strong carryover",
    translationNote: "Best FG% of the season correlates with 6-day training streak leading into this game.",
  },
  {
    id: "school-caleb-01",
    athleteId: "caleb-wilson",
    competition: "School",
    opponent: "South Ridge",
    dateLabel: "Jan 14",
    minutes: 29,
    points: 19,
    rebounds: 11,
    assists: 3,
    steals: 1,
    blocks: 2,
    turnovers: 3,
    fgPct: 58,
    threePct: 34,
    translationTag: "Strong carryover",
    translationNote: "Finishing and weak-side reads translate to efficient two-way impact.",
  },
  {
    id: "school-caleb-02",
    athleteId: "caleb-wilson",
    competition: "School",
    opponent: "Riverside Prep",
    dateLabel: "Jan 22",
    minutes: 31,
    points: 14,
    rebounds: 13,
    assists: 5,
    steals: 2,
    blocks: 4,
    turnovers: 2,
    fgPct: 52,
    threePct: 29,
    translationTag: "Strong carryover",
    translationNote: "Rim protection reps directly visible in 4-block game — defensive instincts carrying over.",
  },
  {
    id: "school-caleb-03",
    athleteId: "caleb-wilson",
    competition: "School",
    opponent: "Valley View",
    dateLabel: "Feb 5",
    minutes: 26,
    points: 22,
    rebounds: 9,
    assists: 4,
    steals: 1,
    blocks: 1,
    turnovers: 2,
    fgPct: 63,
    threePct: 38,
    translationTag: "Strong carryover",
    translationNote: "Face-up creation drill work translating into efficient mid-range and short-roll scoring.",
  },
  {
    id: "school-hailee-01",
    athleteId: "hailee-swain",
    competition: "School",
    opponent: "West Valley",
    dateLabel: "Jan 15",
    minutes: 27,
    points: 15,
    rebounds: 4,
    assists: 6,
    steals: 2,
    blocks: 0,
    turnovers: 2,
    fgPct: 46,
    threePct: 36,
    translationTag: "Rising carryover",
    translationNote: "Handle-under-pressure drills are improving game control and shot quality late in possessions.",
  },
  {
    id: "school-hailee-02",
    athleteId: "hailee-swain",
    competition: "School",
    opponent: "Central Cougars",
    dateLabel: "Jan 24",
    minutes: 30,
    points: 19,
    rebounds: 3,
    assists: 8,
    steals: 3,
    blocks: 0,
    turnovers: 1,
    fgPct: 50,
    threePct: 41,
    translationTag: "Rising carryover",
    translationNote: "Career-high 8 assists with 1 turnover — decision-speed training showing game-ready results.",
  },
  {
    id: "school-hailee-03",
    athleteId: "hailee-swain",
    competition: "School",
    opponent: "Hawthorne Girls",
    dateLabel: "Feb 8",
    minutes: 28,
    points: 22,
    rebounds: 5,
    assists: 5,
    steals: 4,
    blocks: 0,
    turnovers: 2,
    fgPct: 54,
    threePct: 43,
    translationTag: "Strong carryover",
    translationNote: "Pull-up balance work paying off — three mid-range pull-ups converted in fourth quarter.",
  },
];

export const aauGameStats: GameStatEntry[] = [
  {
    id: "aau-aj-01",
    athleteId: "aj-williams",
    competition: "AAU",
    opponent: "Phenom Elite",
    dateLabel: "Circuit Week 3",
    minutes: 31,
    points: 21,
    rebounds: 6,
    assists: 5,
    steals: 2,
    blocks: 1,
    turnovers: 3,
    fgPct: 51,
    threePct: 37,
    translationTag: "Strong carryover",
    translationNote: "Game-speed finishing remains stable against length and physical pressure.",
  },
  {
    id: "aau-aj-02",
    athleteId: "aj-williams",
    competition: "AAU",
    opponent: "Drive Nation",
    dateLabel: "Circuit Week 5",
    minutes: 29,
    points: 25,
    rebounds: 5,
    assists: 6,
    steals: 1,
    blocks: 0,
    turnovers: 2,
    fgPct: 58,
    threePct: 42,
    translationTag: "Strong carryover",
    translationNote: "Burst creation drill sequences directly producing efficient off-dribble scoring against elite defenders.",
  },
  {
    id: "aau-aj-03",
    athleteId: "aj-williams",
    competition: "AAU",
    opponent: "Team Loaded",
    dateLabel: "Circuit Week 7",
    minutes: 33,
    points: 19,
    rebounds: 7,
    assists: 7,
    steals: 3,
    blocks: 1,
    turnovers: 2,
    fgPct: 49,
    threePct: 35,
    translationTag: "Strong carryover",
    translationNote: "Transition reads leading to assist opportunities — playmaking instinct sharpened through Swain reps.",
  },
  {
    id: "aau-caleb-01",
    athleteId: "caleb-wilson",
    competition: "AAU",
    opponent: "Coastline Pro16",
    dateLabel: "Circuit Week 3",
    minutes: 30,
    points: 17,
    rebounds: 12,
    assists: 4,
    steals: 1,
    blocks: 3,
    turnovers: 2,
    fgPct: 56,
    threePct: 33,
    translationTag: "Strong carryover",
    translationNote: "Short-roll playmaking and rim protection are translating into high-value possessions.",
  },
  {
    id: "aau-caleb-02",
    athleteId: "caleb-wilson",
    competition: "AAU",
    opponent: "Brad Beal Elite",
    dateLabel: "Circuit Week 5",
    minutes: 28,
    points: 20,
    rebounds: 10,
    assists: 3,
    steals: 2,
    blocks: 2,
    turnovers: 3,
    fgPct: 59,
    threePct: 36,
    translationTag: "Strong carryover",
    translationNote: "Mismatch creation drill work generating quality mid-range looks and defensive switches.",
  },
  {
    id: "aau-caleb-03",
    athleteId: "caleb-wilson",
    competition: "AAU",
    opponent: "AOT Select",
    dateLabel: "Circuit Week 7",
    minutes: 32,
    points: 15,
    rebounds: 14,
    assists: 5,
    steals: 1,
    blocks: 4,
    turnovers: 1,
    fgPct: 53,
    threePct: 31,
    translationTag: "Strong carryover",
    translationNote: "Lowest turnover of circuit season — short-roll discipline and patient footwork visible throughout.",
  },
  {
    id: "aau-hailee-01",
    athleteId: "hailee-swain",
    competition: "AAU",
    opponent: "Midwest Storm",
    dateLabel: "Circuit Week 3",
    minutes: 26,
    points: 13,
    rebounds: 3,
    assists: 7,
    steals: 2,
    blocks: 0,
    turnovers: 2,
    fgPct: 44,
    threePct: 35,
    translationTag: "Rising carryover",
    translationNote: "Decision-speed work is increasing assist quality and lowering rushed attempts.",
  },
  {
    id: "aau-hailee-02",
    athleteId: "hailee-swain",
    competition: "AAU",
    opponent: "Lady Pressure",
    dateLabel: "Circuit Week 5",
    minutes: 29,
    points: 18,
    rebounds: 4,
    assists: 6,
    steals: 3,
    blocks: 0,
    turnovers: 1,
    fgPct: 50,
    threePct: 40,
    translationTag: "Rising carryover",
    translationNote: "Pull-up balance drill sessions correlating with cleaner catch-and-shoot release under circuit pressure.",
  },
  {
    id: "aau-hailee-03",
    athleteId: "hailee-swain",
    competition: "AAU",
    opponent: "Southeast Fire",
    dateLabel: "Circuit Week 7",
    minutes: 31,
    points: 21,
    rebounds: 5,
    assists: 9,
    steals: 2,
    blocks: 1,
    turnovers: 2,
    fgPct: 53,
    threePct: 42,
    translationTag: "Strong carryover",
    translationNote: "9 assists with controlled ball-handling — lead guard identity solidifying from training volume.",
  },
];

export const nilMarketplaceItems: NilMerchItem[] = [
  {
    id: "aj-hoodie",
    athleteId: "aj-williams",
    title: "AJ Williams USA Gold Hoodie",
    category: "Hoodie",
    price: "$78",
    status: "Top seller",
    description: "Signature heavyweight hoodie built around AJ's USA Gold Standard identity and downhill scorer brand.",
  },
  {
    id: "aj-tee",
    athleteId: "aj-williams",
    title: "Pressure Wing Performance Tee",
    category: "Training Tee",
    price: "$42",
    status: "Preorder live",
    description: "Lightweight shooter-fit tee tied to AJ's transition reads and rim-pressure branding.",
  },
  {
    id: "caleb-hoodie",
    athleteId: "caleb-wilson",
    title: "Mismatch Engine Crew",
    category: "Crewneck",
    price: "$74",
    status: "Coach favorite",
    description: "Caleb Wilson mock NIL drop centered on versatility, feel, and two-way mismatch play.",
  },
  {
    id: "caleb-shorts",
    athleteId: "caleb-wilson",
    title: "Pro16 Mobility Shorts",
    category: "Shorts",
    price: "$48",
    status: "Limited run",
    description: "Practice shorts designed around Caleb's switchability and movement profile.",
  },
  {
    id: "hailee-tee",
    athleteId: "hailee-swain",
    title: "Shot Creator Tee",
    category: "Graphic Tee",
    price: "$38",
    status: "New drop",
    description: "Hailee Swain mock NIL tee built around confidence, handle, and shotmaking identity.",
  },
  {
    id: "hailee-sleeve",
    athleteId: "hailee-swain",
    title: "Lead Guard Shooter Sleeve",
    category: "Accessory",
    price: "$24",
    status: "Bundle ready",
    description: "Mock performance accessory bundle concept for Hailee's lead-guard brand package.",
  },
];
