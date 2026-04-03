import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Link as LinkIcon, Heart } from 'lucide-react';
import { GlitchTitle } from '../components/GlitchTitle';
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder';
const mockProfiles = {
    streamer_xyz: {
        name: 'streamer_xyz',
        handle: '@streamer_xyz',
        bio: 'Gaming clutches & NFT moments. Streaming competitive FPS titles. Building the metaverse one clip at a time.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=streamer_xyz',
        cover: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=400&fit=crop',
        followers: 2450,
        following: 186,
        posts: 342,
    },
    esports_pro: {
        name: 'esports_pro',
        handle: '@esports_pro',
        bio: 'Professional esports player. Competing in international tournaments. Creator economy advocate.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=esports_pro',
        cover: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=400&fit=crop',
        followers: 5621,
        following: 234,
        posts: 856,
    },
    defi_trader: {
        name: 'defi_trader',
        handle: '@defi_trader',
        bio: 'DeFi trader & blockchain enthusiast. Building wealth through strategy & timing.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=defi_trader',
        cover: 'https://images.unsplash.com/photo-1611974789882-a6c03bf63ecb?w=1200&h=400&fit=crop',
        followers: 3241,
        following: 412,
        posts: 1205,
    },
};
export function ProfileViewPage() {
    const { handle } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showFollowModal, setShowFollowModal] = useState(false);
    useEffect(() => {
        if (handle) {
            const cleanHandle = handle.replace('@', '');
            const userProfile = mockProfiles[cleanHandle];
            if (userProfile) {
                setProfile(userProfile);
            }
            else {
                navigate('/app/social');
            }
        }
    }, [handle, navigate]);
    if (!profile)
        return null;
    return (_jsxs("div", { className: "pb-28 pt-16", children: [_jsx("div", { className: "sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-3", children: _jsxs("div", { className: "max-w-4xl mx-auto flex items-center gap-4", children: [_jsx("button", { onClick: () => navigate('/app/social'), className: "p-2 hover:bg-purple-600/20 rounded-full transition", children: _jsx(ArrowLeft, { size: 20, className: "text-purple-300" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-lg font-bold text-purple-300 font-mono", children: profile.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [profile.posts, " posts"] })] })] }) }), _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("div", { className: "h-48 overflow-hidden border-b border-purple-900/30", children: _jsx("img", { src: profile.cover, alt: "Cover", className: "w-full h-full object-cover", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }) }), _jsxs("div", { className: "px-4 py-6 border-b border-purple-900/30 bg-purple-950/10", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-6", children: [_jsx("img", { src: profile.avatar, alt: profile.name, className: "w-24 h-24 rounded-full border-4 border-slate-950 object-cover -mt-12 sm:-mt-16", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { className: "flex-1", children: [_jsx(GlitchTitle, { text: profile.name, className: "text-2xl" }), _jsx("p", { className: "text-purple-400 font-mono", children: profile.handle })] }), _jsx("button", { onClick: () => setShowFollowModal(true), className: `px-6 py-2 rounded-full font-mono font-bold text-sm uppercase tracking-wider transition ${isFollowing
                                            ? 'bg-slate-800 border border-purple-600 text-purple-300 hover:bg-slate-900'
                                            : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'}`, children: isFollowing ? 'Following' : 'Follow' })] }), _jsx("p", { className: "text-slate-300 mb-6 leading-relaxed", children: profile.bio }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-slate-900/50 border border-purple-700/30 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-2xl font-bold text-purple-300", children: profile.posts }), _jsx("p", { className: "text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest", children: "Posts" })] }), _jsxs("div", { className: "bg-slate-900/50 border border-purple-700/30 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-2xl font-bold text-purple-300", children: profile.followers }), _jsx("p", { className: "text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest", children: "Followers" })] }), _jsxs("div", { className: "bg-slate-900/50 border border-purple-700/30 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-2xl font-bold text-purple-300", children: profile.following }), _jsx("p", { className: "text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest", children: "Following" })] })] })] }), _jsxs("div", { className: "px-4 py-8 border-b border-purple-900/30", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 mb-6 font-mono uppercase tracking-wider", children: "Latest Moments" }), _jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "border border-purple-700/30 rounded-lg p-4 bg-purple-950/10 hover:border-purple-600/50 transition cursor-pointer", children: _jsxs("div", { className: "flex gap-3", children: [_jsx("img", { src: profile.avatar, alt: profile.name, className: "w-10 h-10 rounded-full", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-bold text-purple-300 text-sm", children: profile.name }), _jsx("span", { className: "text-slate-500 text-xs", children: "\u00B7" }), _jsxs("span", { className: "text-slate-500 text-xs", children: [Math.floor(Math.random() * 24) + 1, "h ago"] })] }), _jsxs("p", { className: "text-sm text-slate-300 mt-2", children: ["Amazing moment from ", profile.name, " - check it out on the feed!"] }), _jsx("div", { className: "flex gap-6 mt-3 text-slate-500 text-xs", children: _jsxs("button", { className: "hover:text-red-400 transition flex items-center gap-1", children: [_jsx(Heart, { size: 14 }), Math.floor(Math.random() * 500) + 10] }) })] })] }) }, i))) })] }), _jsxs("div", { className: "px-4 py-8 space-y-4", children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 font-mono uppercase tracking-wider mb-6", children: "About" }), _jsxs("div", { className: "space-y-4 text-slate-400 text-sm", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(MapPin, { size: 18, className: "text-purple-400" }), _jsx("span", { children: "Creator on Pulse" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(LinkIcon, { size: 18, className: "text-purple-400" }), _jsx("span", { children: "Joined March 2026" })] })] })] })] }), showFollowModal && (_jsx("div", { className: "fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-slate-900 border border-purple-700/50 rounded-lg p-8 max-w-sm shadow-2xl text-center", children: [_jsxs("h2", { className: "text-xl font-bold text-purple-300 mb-2 font-mono", children: [isFollowing ? 'Unfollow' : 'Follow', " ", profile.name, "?"] }), _jsx("p", { className: "text-slate-400 mb-6 text-sm", children: isFollowing
                                ? "You won't see their posts on your timeline anymore."
                                : 'You will see their posts on your timeline.' }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setShowFollowModal(false), className: "flex-1 px-4 py-2 rounded-lg border border-purple-400/50 text-purple-300 font-mono font-bold text-sm uppercase tracking-wider hover:bg-purple-500/10 transition", children: "Cancel" }), _jsx("button", { onClick: () => {
                                        setIsFollowing(!isFollowing);
                                        setShowFollowModal(false);
                                        alert(`✓ ${isFollowing ? 'Unfollowed' : 'Following'} ${profile.name}!`);
                                    }, className: `flex-1 px-4 py-2 rounded-lg font-mono font-bold text-sm uppercase tracking-wider transition ${isFollowing
                                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                                        : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'}`, children: isFollowing ? 'Unfollow' : 'Follow' })] })] }) }))] }));
}
