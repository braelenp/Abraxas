import { Info, Sparkles } from "lucide-react";

const OPEN_OVERVIEW_EVENT = "oym:open-overview";

export default function OverviewWidget() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_OVERVIEW_EVENT))}
      className="fixed bottom-[4.55rem] right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(20,13,12,0.9),rgba(11,10,10,0.9))] px-3 py-1 text-[0.56rem] uppercase tracking-[0.18em] text-white/70 shadow-[0_0_16px_rgba(235,28,36,0.2)] backdrop-blur-xl transition hover:border-[#f2c230]/45 hover:text-[#f7d86d] sm:bottom-3 sm:right-6"
      aria-label="Reopen overview"
    >
      <Info className="h-3.5 w-3.5 text-[#f2c230]" />
      Overview
      <Sparkles className="h-3 w-3 text-[#eb1c24]" />
    </button>
  );
}
