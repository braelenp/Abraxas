import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef, useCallback } from 'react';
import { ClipCard } from '../components/ClipCard';
import { GlitchTitle } from '../components/GlitchTitle';
import { mockClips } from '../data/mockData';
import { TrendingUp } from 'lucide-react';
export function TrendingPage() {
    const [displayedClips, setDisplayedClips] = useState(() => {
        // Sort clips with thumbnails first
        return [...mockClips].sort((a, b) => {
            const aHasImage = a.thumbnail?.startsWith('http') ? 0 : 1;
            const bHasImage = b.thumbnail?.startsWith('http') ? 0 : 1;
            return aHasImage - bHasImage;
        });
    });
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoading) {
                loadMoreClips();
            }
        }, { threshold: 0.1 });
        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        return () => observer.disconnect();
    }, [isLoading]);
    const loadMoreClips = useCallback(() => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setDisplayedClips(prev => [...prev, ...mockClips]);
            setIsLoading(false);
        }, 800);
    }, []);
    return (_jsxs("div", { className: "pt-20 pb-28 px-4 max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(TrendingUp, { className: "w-6 h-6 text-purple-400" }), _jsx(GlitchTitle, { text: "Trending Now", className: "text-4xl md:text-5xl" })] }), _jsx("p", { className: "text-slate-400 text-sm font-mono mt-2", children: "Watch the most popular clips being forged as La Casa NFTs" })] }), _jsx("div", { className: "mb-12 p-6 bg-gradient-to-br from-purple-950/60 to-slate-950/40 border border-purple-700/40 rounded-lg backdrop-blur", children: _jsxs("div", { className: "max-w-4xl", children: [_jsx("p", { className: "text-xs font-mono text-purple-400 uppercase tracking-wide mb-2", children: "Why Trending Matters" }), _jsx("h3", { className: "text-lg font-bold text-purple-200 mb-2 font-mono", children: "The Pulse of Gaming Culture" }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: "Every clip below represents a tokenized moment \u2014 a cinematic memory preserved on-chain. These aren't just views; they're ownership opportunities. When a moment trends, its value compounds. Follow the pulse. Own the culture." })] }) }), _jsxs("div", { className: "mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg", children: [_jsx("p", { className: "text-xs font-mono text-purple-400 uppercase mb-1", children: "Top Clips" }), _jsxs("p", { className: "text-lg font-bold text-purple-300", children: [displayedClips.length, "+"] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Most-viewed moments" })] }), _jsxs("div", { className: "p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg", children: [_jsx("p", { className: "text-xs font-mono text-purple-400 uppercase mb-1", children: "Categories" }), _jsx("p", { className: "text-lg font-bold text-purple-300", children: "3" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Gaming \u2022 Sports \u2022 DeFi" })] }), _jsxs("div", { className: "p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg", children: [_jsx("p", { className: "text-xs font-mono text-purple-400 uppercase mb-1", children: "Updates" }), _jsx("p", { className: "text-lg font-bold text-purple-300", children: "Live" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Scroll for more moments" })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12", children: displayedClips.map((clip, idx) => (_jsx(ClipCard, { id: clip.id, title: clip.title, creator: clip.creator, creatorAvatar: clip.creatorAvatar, thumbnail: clip.thumbnail, views: clip.views, likes: clip.likes, duration: clip.duration, timestamp: clip.timestamp }, `${clip.id}-${idx}`))) }), _jsx("div", { ref: observerTarget, className: "flex items-center justify-center py-8", children: isLoading ? (_jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsxs("div", { className: "relative w-10 h-10", children: [_jsx("div", { className: "absolute inset-0 rounded-full border-2 border-purple-700/30" }), _jsx("div", { className: "absolute inset-0 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" })] }), _jsx("p", { className: "text-sm text-slate-400 font-mono", children: "Loading more moments..." })] })) : (_jsx("p", { className: "text-xs text-slate-500 font-mono", children: "Scroll down to load more" })) }), _jsx("div", { className: "mt-20 pt-12 border-t border-purple-700/30", children: _jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-mono text-purple-400 uppercase mb-2", children: "Discover More" }), _jsx("h3", { className: "text-2xl md:text-3xl font-bold text-purple-300 font-mono mb-2", children: "Explore Abraxas" }), _jsx("p", { className: "text-slate-400 text-sm font-mono", children: "The complete gaming & DeFi entertainment platform" })] }), _jsx("a", { href: "https://abraxas.io", target: "_blank", rel: "noopener noreferrer", className: "inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(153,69,255,0.4)]", children: "Return to Abraxas" })] }) })] }));
}
