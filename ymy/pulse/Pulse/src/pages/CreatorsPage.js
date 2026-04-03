import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { CreatorProfile } from '../components/CreatorProfile';
import { GlitchTitle } from '../components/GlitchTitle';
import { mockCreators, mockClips } from '../data/mockData';
import { Users } from 'lucide-react';
export function CreatorsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // Map creators to their clips
    const creatorsWithClips = mockCreators.map(creator => ({
        ...creator,
        recentClips: mockClips
            .filter(clip => clip.creatorId === creator.id)
            .map(clip => ({
            id: clip.id,
            title: clip.title,
            thumbnail: clip.thumbnail,
            views: clip.views,
            likes: clip.likes,
        }))
    }));
    return (_jsxs("div", { className: "pt-20 pb-28 px-4 max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Users, { className: "w-6 h-6 text-purple-400" }), _jsx(GlitchTitle, { text: "Top Creators", className: "text-4xl md:text-5xl" })] }), _jsx("p", { className: "text-slate-400 text-sm font-mono mt-2", children: "Follow your favorite creators and support their moments" })] }), _jsx("div", { className: "mb-12 p-6 bg-gradient-to-br from-purple-950/60 to-slate-950/40 border border-purple-700/40 rounded-lg backdrop-blur", children: _jsxs("div", { className: "max-w-4xl", children: [_jsx("p", { className: "text-xs font-mono text-purple-400 uppercase tracking-wide mb-2", children: "Creator Empowerment" }), _jsx("h3", { className: "text-lg font-bold text-purple-200 mb-2 font-mono", children: "Own Your Moments. Control Your Revenue." }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: "Creators aren't content creators anymore \u2014 they're sovereign artists. Every clip, every moment becomes a tokenized asset. You set the royalties. Your community owns a piece. No algorithm. No middleman gatekeeping. Just pure creator sovereignty on the blockchain." })] }) }), _jsxs("div", { className: "mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg", children: [_jsx("p", { className: "text-xs font-mono text-purple-400 uppercase mb-1", children: "\uD83D\uDC51 Top Creators" }), _jsx("p", { className: "text-2xl font-bold text-purple-300", children: creatorsWithClips.length }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Notable creators" })] }), _jsxs("div", { className: "p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950/40 border border-cyan-700/30 rounded-lg", children: [_jsx("p", { className: "text-xs font-mono text-cyan-400 uppercase mb-1", children: "\u2713 Verified" }), _jsx("p", { className: "text-2xl font-bold text-cyan-300", children: creatorsWithClips.filter(c => c.verified).length }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Verified accounts" })] }), _jsxs("div", { className: "p-4 bg-gradient-to-br from-yellow-950/40 to-slate-950/40 border border-yellow-700/30 rounded-lg", children: [_jsx("p", { className: "text-xs font-mono text-yellow-400 uppercase mb-1", children: "\uD83D\uDD34 Live Now" }), _jsx("p", { className: "text-2xl font-bold text-yellow-300", children: creatorsWithClips.filter(c => c.isLive).length }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Streaming" })] })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider", children: "Featured Creator" }), _jsx("div", { className: "w-full", children: _jsx(CreatorProfile, { name: creatorsWithClips[1].name, avatar: creatorsWithClips[1].avatar, category: creatorsWithClips[1].category, followers: creatorsWithClips[1].followers, clips: creatorsWithClips[1].clips, isLive: creatorsWithClips[1].isLive, bio: creatorsWithClips[1].bio, verified: creatorsWithClips[1].verified, recentClips: creatorsWithClips[1].recentClips }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider", children: "All Creators" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: [...creatorsWithClips]
                            .sort((a, b) => {
                            const aHasImage = a.avatar?.startsWith('http') ? 0 : 1;
                            const bHasImage = b.avatar?.startsWith('http') ? 0 : 1;
                            return aHasImage - bHasImage;
                        })
                            .map((creator) => (_jsx(CreatorProfile, { name: creator.name, avatar: creator.avatar, category: creator.category, followers: creator.followers, clips: creator.clips, isLive: creator.isLive, bio: creator.bio, verified: creator.verified, recentClips: creator.recentClips }, creator.id))) }), _jsx("div", { className: "mt-20 pt-12 border-t border-purple-700/30", children: _jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-mono text-purple-400 uppercase mb-2", children: "Discover More" }), _jsx("h3", { className: "text-2xl md:text-3xl font-bold text-purple-300 font-mono mb-2", children: "Explore Abraxas" }), _jsx("p", { className: "text-slate-400 text-sm font-mono", children: "The complete gaming & DeFi entertainment platform" })] }), _jsx("a", { href: "https://abraxas.io", target: "_blank", rel: "noopener noreferrer", className: "inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(153,69,255,0.4)]", children: "Return to Abraxas" })] }) })] })] }));
}
