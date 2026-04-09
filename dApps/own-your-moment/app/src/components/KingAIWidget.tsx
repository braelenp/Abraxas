import { Brain, ChevronRight, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kingQuickActions } from "../lib/constants";
import { kingAnswer, type KingMessage } from "../lib/kingKnowledge";

export default function KingAIWidget() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(() => (typeof window === "undefined" ? true : window.innerWidth >= 640));
  const [messages, setMessages] = useState<KingMessage[]>([
    {
      role: "king",
      text: "Kingslee here. I'm tracking your on-chain training rhythm. Ask me anything about your drills, streak, rewards, or how to navigate the app.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    const userMsg: KingMessage = { role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);
    // Simulate a brief "thinking" delay for polish
    setTimeout(() => {
      const answer = kingAnswer(q);
      setMessages((prev) => [...prev, { role: "king", text: answer }]);
      setThinking(false);
    }, 420);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[6.4rem] right-4 z-30 inline-flex items-center gap-2 rounded-full border border-[#f2c230]/55 bg-[linear-gradient(140deg,rgba(43,14,12,0.94),rgba(19,12,11,0.94))] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#f7d86d] shadow-[0_0_24px_rgba(235,28,36,0.3)] backdrop-blur-xl transition hover:border-[#eb1c24]/65 hover:text-white sm:bottom-6 sm:right-6"
      >
        <Brain className="h-4 w-4" />
        King AI
      </button>
    );
  }

  return (
    <>
      {/* Blur backdrop — dismissable */}
      <div
        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[3px] sm:hidden"
        onClick={() => setOpen(false)}
      />

      <aside className="fixed bottom-[7.8rem] right-3 z-40 flex w-[min(92vw,24rem)] flex-col overflow-hidden rounded-[28px] border border-[#f2c230]/40 bg-[linear-gradient(155deg,rgba(22,12,11,0.96),rgba(12,10,10,0.96))] shadow-[0_0_44px_rgba(235,28,36,0.32),0_0_18px_rgba(242,194,48,0.1)] backdrop-blur-xl sm:bottom-6 sm:right-6">
        {/* top gold sweep */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_10%,rgba(242,194,48,0.5)_50%,transparent_90%)]" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[#f2c230]/40 bg-[#f2c230]/12 p-2.5 text-[#f2c230]">
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#f2c230]">King AI</p>
              <p className="mt-0.5 text-[0.66rem] text-white/55">Kingslee · on-chain training adviser</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/10 p-1.5 text-white/50 transition hover:border-white/30 hover:text-white"
            aria-label="Close King AI"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick actions (shown only when just the greeting is present) */}
        {messages.length === 1 && (
          <div className="space-y-1.5 border-t border-white/[0.07] px-4 py-3">
            {kingQuickActions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => {
                  const userMsg: KingMessage = { role: "user", text: action };
                  setMessages((prev) => [...prev, userMsg]);
                  setThinking(true);
                  setTimeout(() => {
                    setMessages((prev) => [...prev, { role: "king", text: kingAnswer(action) }]);
                    setThinking(false);
                  }, 380);
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-xs text-white/68 transition hover:border-[#eb1c24]/40 hover:bg-white/[0.07] hover:text-white"
              >
                <span>{action}</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#f2c230]" />
              </button>
            ))}
          </div>
        )}

        {/* Chat messages */}
        <div className="max-h-[34vh] flex-1 overflow-y-auto border-t border-white/[0.07] px-4 py-3">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "king" && (
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f2c230]/35 bg-[#f2c230]/10 text-[#f2c230]">
                    <Brain className="h-3 w-3" />
                  </span>
                )}
                <div
                  className={`max-w-[82%] rounded-[14px] px-3 py-2 text-xs leading-6 ${
                    msg.role === "user"
                      ? "rounded-tr-[4px] bg-[#f2c230]/15 text-[#f7d86d]"
                      : "rounded-tl-[4px] border border-white/8 bg-white/[0.04] text-white/75"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-2">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f2c230]/35 bg-[#f2c230]/10 text-[#f2c230]">
                  <Brain className="h-3 w-3" />
                </span>
                <div className="flex items-center gap-1 rounded-[14px] rounded-tl-[4px] border border-white/8 bg-white/[0.04] px-3 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f2c230]/70 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f2c230]/70 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f2c230]/70 [animation-delay:240ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Chat input */}
        <div className="border-t border-white/[0.07] px-3 py-3">
          <div className="flex items-center gap-2 rounded-[14px] border border-white/10 bg-white/[0.04] px-3 py-1.5 focus-within:border-[#f2c230]/45">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask King anything..."
              className="flex-1 bg-transparent text-xs text-white/80 placeholder-white/30 outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-full border border-[#f2c230]/40 bg-[#f2c230]/10 p-1.5 text-[#f2c230] transition hover:bg-[#f2c230]/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.2em] text-white/35">
            <Sparkles className="h-3 w-3 text-[#eb1c24]" />
            {location.pathname === "/app/king-ai" ? "King AI is live on this tab" : "King AI · always available"}
          </div>
        </div>
      </aside>
    </>
  );
}

