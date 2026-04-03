import idl from "../idl/ownyourmoment.json";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

export const network = "devnet";
export const endpoint = clusterApiUrl(network);
export const programId = new PublicKey(idl.address);
export const idlMetadata = idl.metadata;

export const heroMetrics = [
  { label: "Drills Completed", value: "128", detail: "+14 this week" },
  { label: "Current Streak", value: "09", detail: "2 more for bonus SKR" },
  { label: "Pending SKR", value: "420", detail: "claimable on devnet" },
  { label: "Badge Tier", value: "Gold", detail: "Next mint: Swain Shooter" },
];

export const kingQuickActions = [
  "Review my weekly shot balance",
  "Recommend a Swain footwork drill",
  "How close am I to my next NIL badge?",
];
