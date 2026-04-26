import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Heart, MessageCircle, Share2, Zap } from 'lucide-react';
import { GlitchTitle } from '../components/GlitchTitle';
export function GamingPage() {
    const [posts] = useState([
        {
            id: '1',
            title: 'Apex Legends Integration',
            content: 'Apex Legends integration is now in motion inside the Abraxas gaming layer.\nPulse will host the tokenized gaming experience.\nTournaments, leaderboards, $ABRA rewards, and BlackBox NFT drops for top performers.\nThe battlefield is being prepared.\nThe Abraxas team rises.',
            icon: '⚔️',
            timestamp: 'Mar 28, 2026',
            likes: 2847,
            comments: 342,
            shares: 584,
            liked: false
        },
        {
            id: '2',
            title: 'The Apex Realm',
            content: 'The Apex Realm is coming.\nRanked cups, seasonal finals, and community tournaments — all inside Pulse / Cadabra.\nEarn $ABRA, mint tournament moments as NFTs, climb the Abraxas leaderboard.\nThe first installment of the tokenized gaming layer is being built.\nMore soon.',
            icon: '🎮',
            timestamp: 'Mar 27, 2026',
            likes: 1923,
            comments: 287,
            shares: 456,
            liked: false
        }
    ]);
    const [likeCounts, setLikeCounts] = useState({
        '1': 2847,
        '2': 1923
    });
    const [likedPosts, setLikedPosts] = useState({
        '1': false,
        '2': false
    });
    const toggleLike = (postId) => {
        const isLiked = likedPosts[postId];
        setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
        setLikeCounts(prev => ({
            ...prev,
            [postId]: isLiked ? (prev[postId] || 0) - 1 : (prev[postId] || 0) + 1
        }));
    };
    return (_jsxs("div", { className: "pb-28 pt-20", children: [_jsx("div", { className: "sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx(GlitchTitle, { text: "Apex Gaming Layer", className: "text-2xl md:text-3xl mb-0" }), _jsx("p", { className: "text-slate-400 text-sm font-mono mt-1", children: "Tournaments \u2022 Leaderboards \u2022 NFT Rewards \u2022 $ABRA" })] }) }), _jsx("div", { className: "max-w-2xl mx-auto px-4 mt-6", children: _jsxs("div", { className: "mb-8 p-6 bg-gradient-to-br from-orange-950/60 to-slate-950/40 border border-orange-700/40 rounded-lg backdrop-blur", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Zap, { className: "w-5 h-5 text-orange-400" }), _jsx("p", { className: "text-xs font-mono text-orange-400 uppercase tracking-wide", children: "Gaming Innovation" })] }), _jsx("h2", { className: "text-xl md:text-2xl font-bold text-orange-200 mb-2 font-mono", children: "Apex Integration" }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: "Tokenized gaming experiences built inside Pulse. Earn $ABRA, mint NFTs of your greatest moments, climb the leaderboards, and own your glory." })] }) }), _jsx("div", { className: "max-w-2xl mx-auto px-4 space-y-6 mb-12", children: posts.map((post) => (_jsxs("div", { className: "p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-purple-700/30 rounded-lg hover:border-purple-600/50 transition-all", children: [_jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsx("div", { className: "text-3xl", children: post.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 font-mono mb-1", children: post.title }), _jsx("p", { className: "text-xs text-slate-400 font-mono", children: post.timestamp })] })] }), _jsx("div", { className: "mb-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap", children: post.content }), _jsxs("div", { className: "flex items-center gap-6 text-xs text-slate-400 font-mono border-t border-purple-700/20 pt-4", children: [_jsxs("button", { onClick: () => toggleLike(post.id), className: "flex items-center gap-2 hover:text-purple-300 transition-colors group", children: [_jsx("div", { className: `p-2 rounded-lg ${likedPosts[post.id] ? 'bg-red-500/20 text-red-400' : 'group-hover:bg-purple-600/20 text-slate-400'} transition-colors`, children: _jsx(Heart, { size: 16, fill: likedPosts[post.id] ? 'currentColor' : 'none' }) }), _jsx("span", { className: likedPosts[post.id] ? 'text-red-400' : 'text-slate-400', children: likeCounts[post.id] })] }), _jsxs("div", { className: "flex items-center gap-2 hover:text-purple-300 transition-colors cursor-pointer group", children: [_jsx("div", { className: "p-2 rounded-lg group-hover:bg-purple-600/20 text-slate-400", children: _jsx(MessageCircle, { size: 16 }) }), _jsx("span", { children: post.comments })] }), _jsxs("div", { className: "flex items-center gap-2 hover:text-purple-300 transition-colors cursor-pointer group", children: [_jsx("div", { className: "p-2 rounded-lg group-hover:bg-purple-600/20 text-slate-400", children: _jsx(Share2, { size: 16 }) }), _jsx("span", { children: post.shares })] })] })] }, post.id))) }), _jsx("div", { className: "max-w-2xl mx-auto px-4 mt-16 pt-12 border-t border-purple-700/30", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide", children: "\uD83C\uDFC6 Tournaments" }), _jsx("p", { className: "text-slate-400/80 text-sm", children: "Ranked cups, seasonal finals, and community brackets" })] }), _jsxs("div", { className: "p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide", children: "\uD83D\uDCCA Leaderboards" }), _jsx("p", { className: "text-slate-400/80 text-sm", children: "Climb the ranks and earn $ABRA rewards" })] }), _jsxs("div", { className: "p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide", children: "\uD83C\uDF81 NFT Drops" }), _jsx("p", { className: "text-slate-400/80 text-sm", children: "La Casa NFTs for top performers and tournaments" })] }), _jsxs("div", { className: "p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide", children: "\uD83D\uDCB0 $ABRA Rewards" }), _jsx("p", { className: "text-slate-400/80 text-sm", children: "Earn tokenized rewards for your achievements" })] })] }) })] }));
}
