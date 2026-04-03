import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, ArrowLeft, Check } from 'lucide-react'
import { GlitchTitle } from '../components/GlitchTitle'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface UserProfile {
  name: string
  handle: string
  bio: string
  avatar: string
  cover: string
  followers: number
  following: number
  posts: number
}

export function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    handle: '',
    bio: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
    cover: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=1200&h=400&fit=crop',
    followers: 0,
    following: 0,
    posts: 0,
  })
  const [isSaved, setIsSaved] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    // Load existing profile from localStorage
    const savedProfile = localStorage.getItem('pulseUserProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const validateProfile = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!profile.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!profile.handle.trim()) {
      newErrors.handle = 'Handle is required'
    } else if (!profile.handle.startsWith('@')) {
      newErrors.handle = 'Handle must start with @'
    }
    if (profile.bio.length > 160) {
      newErrors.bio = 'Bio must be 160 characters or less'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateProfile()) {
      localStorage.setItem('pulseUserProfile', JSON.stringify(profile))
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
        navigate('/app/social')
      }, 1500)
    }
  }

  return (
    <div className="pb-28 pt-20">
      {/* Header */}
      <div className="sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/app/social')}
            className="p-2 hover:bg-purple-600/20 rounded-full transition"
          >
            <ArrowLeft size={20} className="text-purple-300" />
          </button>
          <GlitchTitle 
            text="Create Profile" 
            className="text-xl"
          />
        </div>
      </div>

      {/* Profile Setup Form */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="mb-8">
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-700/30 group cursor-pointer">
            <img
              src={profile.cover}
              alt="Cover"
              className="w-full h-full object-cover group-hover:opacity-75 transition"
              onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <Upload size={32} className="text-white" />
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="border border-purple-700/30 rounded-lg p-8 bg-purple-950/10 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-600 object-cover"
                onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
              />
              <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 rounded-full p-2 transition">
                <Upload size={16} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Avatar</p>
              <p className="text-sm text-slate-300">Click to upload or change your avatar</p>
            </div>
          </div>

          <div className="border-t border-purple-900/20" />

          {/* Name */}
          <div>
            <label className="block text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">Display Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Your name or creator name"
              className="w-full bg-slate-900/50 border border-purple-700/30 rounded-lg px-4 py-3 text-purple-300 placeholder-slate-500 font-mono focus:border-purple-600/50 outline-none transition"
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Handle */}
          <div>
            <label className="block text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">Handle</label>
            <input
              type="text"
              value={profile.handle}
              onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
              placeholder="@yourhandle"
              className="w-full bg-slate-900/50 border border-purple-700/30 rounded-lg px-4 py-3 text-purple-300 placeholder-slate-500 font-mono focus:border-purple-600/50 outline-none transition"
            />
            {errors.handle && <p className="text-xs text-red-400 mt-1">{errors.handle}</p>}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell the Pulse community about yourself..."
              rows={4}
              className="w-full bg-slate-900/50 border border-purple-700/30 rounded-lg px-4 py-3 text-purple-300 placeholder-slate-500 font-mono focus:border-purple-600/50 outline-none transition resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">{profile.bio.length}/160 characters</p>
            {errors.bio && <p className="text-xs text-red-400 mt-1">{errors.bio}</p>}
          </div>

          {/* Stats Preview */}
          <div className="border-t border-purple-900/20 pt-6">
            <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4">Profile Stats</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-950/20 border border-purple-700/30 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-purple-300">{profile.posts}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Posts</p>
              </div>
              <div className="bg-purple-950/20 border border-purple-700/30 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-purple-300">{profile.followers}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Followers</p>
              </div>
              <div className="bg-purple-950/20 border border-purple-700/30 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-purple-300">{profile.following}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/app/social')}
            className="flex-1 px-6 py-3 rounded-lg border border-purple-400/50 text-purple-300 font-mono font-bold uppercase tracking-wider hover:bg-purple-500/10 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex-1 px-6 py-3 rounded-lg font-mono font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-green-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'
            }`}
          >
            {isSaved ? (
              <>
                <Check size={20} />
                Saved!
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
