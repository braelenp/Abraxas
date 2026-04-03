import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ClipCard } from './ClipCard';
const MOCK_CLIPS = [
    {
        id: '0x1a2b3c4d',
        title: 'Insane 1v5 Clutch - Valorant Ranked',
        creator: 'ProGamer_X',
        thumbnail: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=225&fit=crop',
        duration: '2:45',
        views: 24500,
        likes: 3240,
        category: 'gaming',
    },
    {
        id: '0x4e5f6g7h',
        title: 'LeBron James Full Court Alley-Oop',
        creator: 'SportsHighlight',
        thumbnail: 'https://images.unsplash.com/photo-1546519227-7a8ca3246f35?w=400&h=225&fit=crop',
        duration: '0:28',
        views: 187300,
        likes: 45600,
        category: 'sports',
    },
    {
        id: '0x8i9j0k1l',
        title: 'Live DeFi Trading Session - Made 3x Gains',
        creator: 'CryptoStreamer',
        thumbnail: 'https://images.unsplash.com/photo-1618788675349-c9fb0e7e3c97?w=400&h=225&fit=crop',
        duration: '15:32',
        views: 52100,
        likes: 8950,
        category: 'streaming',
    },
    {
        id: '0x2m3n4o5p',
        title: 'Perfect CS:GO Spray Control - Spray Pattern Guide',
        creator: 'FPS_Coach',
        thumbnail: 'https://images.unsplash.com/photo-1538481199705-19a900ed11d0?w=400&h=225&fit=crop',
        duration: '3:12',
        views: 18900,
        likes: 2340,
        category: 'gaming',
    },
    {
        id: '0x6q7r8s9t',
        title: 'NFL Top 10 Plays of the Week',
        creator: 'SportsMoments',
        thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=225&fit=crop',
        duration: '8:45',
        views: 234500,
        likes: 67800,
        category: 'sports',
    },
    {
        id: '0xau9v0w1x',
        title: 'Elden Ring Speedrun World Record - 47 Minutes',
        creator: 'SpeedRunner_Pro',
        thumbnail: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=225&fit=crop',
        duration: '47:00',
        views: 156200,
        likes: 34500,
        category: 'gaming',
    },
    {
        id: '0x2y3z4a5b',
        title: 'Tennis Grand Slam Championship - Match Point',
        creator: 'TennisWorld',
        thumbnail: 'https://images.unsplash.com/photo-1554254633-c9e8c862524a?w=400&h=225&fit=crop',
        duration: '0:15',
        views: 89300,
        likes: 19200,
        category: 'sports',
    },
    {
        id: '0x6c7d8e9f',
        title: 'Twitch Streamer Reacts to Viral Gaming Moments',
        creator: 'ReactMaster',
        thumbnail: 'https://images.unsplash.com/photo-1493437314652-dd9a0ad33c22?w=400&h=225&fit=crop',
        duration: '22:15',
        views: 73400,
        likes: 11600,
        category: 'streaming',
    },
    {
        id: '0xag0h1i2j',
        title: 'Valorant Tournament Finals - Triple ACE Moment',
        creator: 'EsportsTV',
        thumbnail: 'https://images.unsplash.com/photo-1535278635325-e9e4b8ed3e7c?w=400&h=225&fit=crop',
        duration: '1:23',
        views: 412300,
        likes: 92500,
        category: 'gaming',
    },
    {
        id: '0x3k4l5m6n',
        title: 'Golf Hole-in-One at the Masters - Slow Motion',
        creator: 'GolfClips',
        thumbnail: 'https://images.unsplash.com/photo-1471879832106-c7ab9019e8de?w=400&h=225&fit=crop',
        duration: '2:10',
        views: 98700,
        likes: 24300,
        category: 'sports',
    },
];
export function ClipFeed() {
    const clips = useMemo(() => {
        // Sort clips with valid thumbnails first (those starting with http)
        const sorted = [...MOCK_CLIPS].sort((a, b) => {
            const aHasImage = a.thumbnail?.startsWith('http') ? 0 : 1;
            const bHasImage = b.thumbnail?.startsWith('http') ? 0 : 1;
            return aHasImage - bHasImage;
        });
        return sorted;
    }, []);
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: clips.map((clip) => (_jsx(ClipCard, { id: clip.id, title: clip.title, creator: clip.creator, creatorAvatar: "https://i.pravatar.cc/32", thumbnail: clip.thumbnail, views: clip.views.toLocaleString(), likes: clip.likes.toLocaleString(), duration: clip.duration, timestamp: "2h ago" }, clip.id))) }));
}
