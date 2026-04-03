import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

type SongDifficulty = 'easy' | 'medium' | 'hard';
type DistortionLevel = 'low' | 'high';

const DIFFICULTY_STORAGE_KEY = 'rhythmforge_song_difficulty';
const DISTORTION_STORAGE_KEY = 'rhythmforge_distortion_level';

export default function SongMenuPage() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [difficulty, setDifficulty] = useState<SongDifficulty>('medium');
  const [distortionLevel, setDistortionLevel] = useState<DistortionLevel>('high');

  const songs = [
    { id: '1', name: 'Nebula Sprint', icon: '🎵', audioUrl: `${import.meta.env.BASE_URL}audio/nebula-sprint.mp3` },
    { id: '2', name: 'Phantom Pulse', icon: '🎧', audioUrl: `${import.meta.env.BASE_URL}audio/phantom-pulse.mp3` },
    { id: '3', name: 'Solflare Sync', icon: '🥁', audioUrl: `${import.meta.env.BASE_URL}audio/solflare-sync.mp3` }
  ];

  const handleImportTrack = () => {
    window.alert('Import Track coming soon — upload and mint flow will live here.');
  };

  const handleFullLibrary = () => {
    window.alert('Full Library coming soon — community and Circuit catalog will live here.');
  };

  useEffect(() => {
    const savedDifficulty = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
    if (savedDifficulty === 'easy' || savedDifficulty === 'medium' || savedDifficulty === 'hard') {
      setDifficulty(savedDifficulty);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty);
  }, [difficulty]);

  useEffect(() => {
    const savedDistortion = localStorage.getItem(DISTORTION_STORAGE_KEY);
    if (savedDistortion === 'low' || savedDistortion === 'high') {
      setDistortionLevel(savedDistortion);
      document.documentElement.setAttribute('data-distortion', savedDistortion);
      return;
    }

    document.documentElement.setAttribute('data-distortion', 'high');
  }, []);

  useEffect(() => {
    localStorage.setItem(DISTORTION_STORAGE_KEY, distortionLevel);
    document.documentElement.setAttribute('data-distortion', distortionLevel);
  }, [distortionLevel]);

  return (
    <div className="song-menu-page">
      <div className="song-menu-aura" />
      <div className="song-menu-stars" />
      <div className="song-menu-vignette" />
      <div className="song-menu-content">
        <h1 className="song-menu-title" aria-label="Your Circuit Tracks">
          <span>Your Circuit Tracks</span>
          <span aria-hidden="true">Your Circuit Tracks</span>
        </h1>

        <div className="song-menu-actions">
          {connected && (
            <button type="button" className="song-menu-action-button song-menu-action-button-wallet" onClick={() => setVisible(true)}>
              Change wallet
            </button>
          )}
          <button type="button" className="song-menu-action-button" onClick={handleImportTrack}>
            Import Track
          </button>
          <button type="button" className="song-menu-action-button" onClick={handleFullLibrary}>
            Full Library
          </button>
        </div>

        <div className="song-menu-difficulty" role="group" aria-label="Select difficulty">
          <span className="song-menu-difficulty-label">Difficulty</span>
          <div className="song-menu-difficulty-buttons">
            {(['easy', 'medium', 'hard'] as SongDifficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                className={`song-menu-difficulty-button ${difficulty === level ? 'is-active' : ''}`}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="song-menu-difficulty" role="group" aria-label="Select distortion level">
          <span className="song-menu-difficulty-label">Distortion</span>
          <div className="song-menu-difficulty-buttons">
            {(['low', 'high'] as DistortionLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                className={`song-menu-difficulty-button ${distortionLevel === level ? 'is-active' : ''}`}
                onClick={() => setDistortionLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="song-menu-grid">
          {songs.map(song => (
            <Link
              key={song.id}
              to="/play"
              state={{ songId: song.id, songName: song.name, songAudioUrl: song.audioUrl, difficulty }}
              className="song-menu-link"
            >
              <div className="song-menu-card">
                <div className="song-menu-icon" aria-hidden="true">{song.icon}</div>
                <h3 className="song-menu-name">{song.name}</h3>
                <p className="song-menu-hint">Tap to play</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}