import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { Howl, Howler } from 'howler';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3, BN } from '@coral-xyz/anchor';
import { useLocation, useNavigate } from 'react-router-dom';
import idl from '../idl/rhythmforge.json';
import {
  MultiplayerSyncClient,
  type MultiplayerState,
  type MultiplayerGameplayEvent,
} from '../services/multiplayerSync';

type HighScoreEntry = {
  score: number;
  combo: number;
  multiplier: number;
  submittedAt: string;
  wallet: string;
  txSignature?: string;
};

type SongDifficulty = 'easy' | 'medium' | 'hard';
type DistortionLevel = 'low' | 'high';

const HIGH_SCORE_STORAGE_KEY = 'rhythmforge_high_scores_v1';
const LATEST_SUBMITTED_STORAGE_KEY = 'rhythmforge_latest_submitted_v1';
const HIDE_TRACKER_STORAGE_KEY = 'rhythmforge_hide_tracker_v1';
const DIFFICULTY_STORAGE_KEY = 'rhythmforge_song_difficulty';
const DISTORTION_STORAGE_KEY = 'rhythmforge_distortion_level';

const DIFFICULTY_SETTINGS: Record<SongDifficulty, { spawnDelay: number; travelDuration: number; hitWindow: number }> = {
  easy: { spawnDelay: 600, travelDuration: 4100, hitWindow: 90 },
  medium: { spawnDelay: 450, travelDuration: 3500, hitWindow: 70 },
  hard: { spawnDelay: 330, travelDuration: 2800, hitWindow: 58 },
};

export default function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [health, setHealth] = useState(100);
  const [skrStake, setSkrStake] = useState(0);
  const [stakeInput, setStakeInput] = useState('100');
  const [stakeMultiplier, setStakeMultiplier] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [trackElapsed, setTrackElapsed] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [visualizerLevels, setVisualizerLevels] = useState<number[]>(() => Array.from({ length: 24 }, () => 14));
  const [highScores, setHighScores] = useState<HighScoreEntry[]>([]);
  const [peerStates, setPeerStates] = useState<MultiplayerState[]>([]);
  const [recentPeerEvents, setRecentPeerEvents] = useState<MultiplayerGameplayEvent[]>([]);
  const [latestSubmittedScore, setLatestSubmittedScore] = useState<number | null>(null);
  const [hideHighScoreTracker, setHideHighScoreTracker] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [distortionLevel, setDistortionLevel] = useState<DistortionLevel>('high');
  const gameRef = useRef<Phaser.Game | null>(null);
  const soundRef = useRef<Howl | null>(null);
  const gameControlsRef = useRef<{
    startRun: () => void;
    pauseRun: () => void;
    resumeRun: () => void;
  } | null>(null);
  const gameplayActiveRef = useRef(false);
  const syncClientRef = useRef<MultiplayerSyncClient | null>(null);
  const sessionPlayerIdRef = useRef(`guest-${Math.random().toString(36).slice(2, 10)}`);

  const defaultAudioUrl = `${import.meta.env.BASE_URL}audio/song.mp3`;
  const selectedSongName =
    typeof (location.state as any)?.songName === 'string'
      ? (location.state as any).songName
      : 'Default Track';
  const selectedSongId =
    typeof (location.state as any)?.songId === 'string'
      ? (location.state as any).songId
      : 'default-song';
  const selectedAudioUrl =
    typeof (location.state as any)?.songAudioUrl === 'string'
      ? (location.state as any).songAudioUrl
      : defaultAudioUrl;
  const selectedDifficulty =
    ((() => {
      const routeDifficulty = (location.state as any)?.difficulty;
      if (routeDifficulty === 'easy' || routeDifficulty === 'medium' || routeDifficulty === 'hard') {
        return routeDifficulty;
      }

      const savedDifficulty = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
      if (savedDifficulty === 'easy' || savedDifficulty === 'medium' || savedDifficulty === 'hard') {
        return savedDifficulty;
      }

      return 'medium';
    })() as SongDifficulty);
  const difficultySettings = DIFFICULTY_SETTINGS[selectedDifficulty];
  const walletId = publicKey?.toBase58() ?? 'guest';
  const playerId = publicKey?.toBase58() ?? sessionPlayerIdRef.current;
  const multiplayerRoomId = `${selectedSongId}:${selectedDifficulty}`;
  const bestScore = highScores[0]?.score ?? 0;
  const topPeer = peerStates[0] ?? null;
  const localSongTimeMs = Math.round(trackElapsed * 1000);
  const topPeerDriftMs = topPeer ? Math.abs(topPeer.songTimeMs - localSongTimeMs) : 0;
  const configuredShareUrl = (import.meta.env.VITE_PUBLIC_APP_URL as string | undefined)?.trim();
  const shareBaseUrl =
    configuredShareUrl && configuredShareUrl.length > 0
      ? configuredShareUrl
      : typeof window !== 'undefined'
        ? window.location.origin
        : 'https://example.com';
  const shareTargetUrl = new URL('/', shareBaseUrl).toString();
  const xShareUrl = latestSubmittedScore === null
    ? ''
    : `https://x.com/intent/tweet?text=${encodeURIComponent(
        `I just scored ${latestSubmittedScore} on Rhythmforge (${selectedSongName} • ${selectedDifficulty.toUpperCase()}) 🔥 #Solana #Web3Gaming`
      )}&url=${encodeURIComponent(shareTargetUrl)}`;

  const formatTrackTime = (seconds: number) => {
    const normalizedSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const minutes = Math.floor(normalizedSeconds / 60);
    const remainingSeconds = normalizedSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatMsAsTime = (milliseconds: number) => {
    return formatTrackTime(milliseconds / 1000);
  };

  const handleIncomingPeerEvent = (event: MultiplayerGameplayEvent) => {
    setRecentPeerEvents((previousEvents) => [event, ...previousEvents].slice(0, 6));
  };

  const applyDistortionLevel = (level: DistortionLevel) => {
    setDistortionLevel(level);
    document.documentElement.setAttribute('data-distortion', level);
  };

  const handleCopyShareLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareTargetUrl);
      } else {
        const fallbackInput = document.createElement('textarea');
        fallbackInput.value = shareTargetUrl;
        fallbackInput.setAttribute('readonly', '');
        fallbackInput.style.position = 'absolute';
        fallbackInput.style.left = '-9999px';
        document.body.appendChild(fallbackInput);
        fallbackInput.select();
        document.execCommand('copy');
        document.body.removeChild(fallbackInput);
      }

      setCopiedShareLink(true);
      window.setTimeout(() => setCopiedShareLink(false), 1600);
    } catch {
      alert('Could not copy link automatically.');
    }
  };

  const readStoredScores = (): HighScoreEntry[] => {
    try {
      const rawScores = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
      if (!rawScores) {
        return [];
      }

      const parsedScores = JSON.parse(rawScores);
      if (!Array.isArray(parsedScores)) {
        return [];
      }

      return parsedScores as HighScoreEntry[];
    } catch {
      return [];
    }
  };

  const writeStoredScores = (scores: HighScoreEntry[]) => {
    localStorage.setItem(HIGH_SCORE_STORAGE_KEY, JSON.stringify(scores));
  };

  const readLatestSubmittedByWallet = (): Record<string, number> => {
    try {
      const rawLatest = localStorage.getItem(LATEST_SUBMITTED_STORAGE_KEY);
      if (!rawLatest) {
        return {};
      }

      const parsedLatest = JSON.parse(rawLatest);
      if (typeof parsedLatest !== 'object' || parsedLatest === null) {
        return {};
      }

      return parsedLatest as Record<string, number>;
    } catch {
      return {};
    }
  };

  const persistLatestSubmittedForWallet = (wallet: string, submittedScore: number) => {
    const byWallet = readLatestSubmittedByWallet();
    byWallet[wallet] = submittedScore;
    localStorage.setItem(LATEST_SUBMITTED_STORAGE_KEY, JSON.stringify(byWallet));
  };

  const refreshWalletHighScores = () => {
    const walletScores = readStoredScores()
      .filter((entry) => entry.wallet === walletId)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setHighScores(walletScores);
  };

  const saveLocalHighScore = (entry: HighScoreEntry) => {
    const allScores = [...readStoredScores(), entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);

    writeStoredScores(allScores);
    refreshWalletHighScores();
  };

  const getProvider = () => {
    if (!publicKey || !connection) return null;
    return new AnchorProvider(
      connection,
      {
        publicKey,
        signTransaction: async <T extends web3.Transaction | web3.VersionedTransaction>(tx: T) => tx,
        signAllTransactions: async <T extends web3.Transaction | web3.VersionedTransaction>(txs: T[]) => txs,
      },
      {}
    );
  };

  const submitScore = async (score: number): Promise<string | null> => {
    const provider = getProvider();
    if (!provider || !publicKey) {
      return null;
    }

    const program = new Program(idl as any, provider);

    if (typeof (program as any)?.methods?.submitScore !== 'function') {
      return null;
    }

    try {
      // Placeholder PDA (adjust seeds)
      const [gameScorePda] = await web3.PublicKey.findProgramAddress(
        [Buffer.from('game_score'), publicKey.toBuffer()],
        program.programId
      );
      const signature = await (program as any).methods.submitScore(new BN(score)).accounts({
        player: publicKey,
        gameScore: gameScorePda,
      }).rpc();
      return signature;
    } catch (e: any) {
      throw new Error(e?.message ?? 'Failed to submit score on-chain');
    }
  };

  const handleSubmitHighScore = async () => {
    if (score <= 0) {
      alert('Play a round first to submit a score.');
      return;
    }

    let txSignature: string | null = null;
    let chainSubmitError: string | null = null;

    try {
      txSignature = await submitScore(score);
    } catch (error: any) {
      chainSubmitError = error?.message ?? 'Unknown on-chain submit error';
    }

    saveLocalHighScore({
      score,
      combo,
      multiplier,
      wallet: walletId,
      submittedAt: new Date().toISOString(),
      txSignature: txSignature ?? undefined,
    });
    setLatestSubmittedScore(score);
    persistLatestSubmittedForWallet(walletId, score);

    syncClientRef.current?.publishGameplayEvent({
      eventType: 'submit',
      laneIndex: null,
      score,
      combo,
      health,
      songTimeMs: localSongTimeMs,
    });

    endGameplaySession();

    if (txSignature) {
      alert('High score submitted on-chain and saved to tracker.');
      return;
    }

    if (chainSubmitError && connected) {
      alert(`High score saved locally. On-chain submit failed: ${chainSubmitError}`);
      return;
    }

    alert('High score saved to tracker.');
  };

  const stakeSkr = async (amount: number) => {
    const provider = getProvider();
    if (!provider || !publicKey) {
      alert('Wallet not connected');
      return;
    }

    const program = new Program(idl as any, provider);

    try {
      await program.methods.stakeSkr(new BN(amount)).accounts({
        player: publicKey,
      }).rpc();

      const newStake = skrStake + amount;
      setSkrStake(newStake);
      setStakeMultiplier(Math.min(3, 1 + newStake / 1000));
      alert(`Staked ${amount} $SKR`);
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  const handleStake = async () => {
    const amount = Number(stakeInput);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert('Enter a valid $SKR amount.');
      return;
    }

    await stakeSkr(Math.floor(amount));
  };

  const pauseGameplay = () => {
    gameControlsRef.current?.pauseRun();
    gameplayActiveRef.current = false;
    setGamePaused(true);
    if (soundRef.current?.playing()) {
      soundRef.current.pause();
    }
  };

  const endGameplaySession = () => {
    gameControlsRef.current?.pauseRun();
    gameplayActiveRef.current = false;
    setGamePaused(true);
    setMenuOpen(false);
    setGameStarted(false);
    setTrackElapsed(0);

    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  const resumeGameplay = () => {
    if (!gameStarted) {
      return;
    }

    gameControlsRef.current?.resumeRun();
    gameplayActiveRef.current = true;
    setGamePaused(false);
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
    }
  };

  const startGameplay = () => {
    if (!isGameReady || !gameControlsRef.current) {
      return;
    }

    if (!soundRef.current) {
      const primaryTrack = selectedAudioUrl;

      soundRef.current = new Howl({
        src: [primaryTrack],
        loop: true,
        volume: volume / 100,
        mute: muted,
        html5: true,
        onloaderror: (_soundId, error) => {
          console.error('Audio failed to load:', error);

          if (primaryTrack !== defaultAudioUrl) {
            soundRef.current?.unload();
            soundRef.current = new Howl({
              src: [defaultAudioUrl],
              loop: true,
              volume: volume / 100,
              mute: muted,
              html5: true,
            });
            soundRef.current.play();
            alert(`Selected track not found. Using default audio for ${selectedSongName}.`);
            return;
          }

          alert('Could not load game audio. Please verify app/public/audio/song.mp3');
        },
        onplayerror: (_soundId, error) => {
          console.error('Audio failed to play:', error);
          const sound = soundRef.current;
          if (!sound) {
            return;
          }

          sound.once('unlock', () => {
            sound.play();
          });
        },
        onload: () => {
          setTrackDuration(soundRef.current?.duration() ?? 0);
        },
      });
    }

    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      void Howler.ctx.resume();
    }

    const sound = soundRef.current;
    if (sound.state() !== 'loaded') {
      sound.once('load', () => {
        sound.stop();
        sound.play();
      });
      sound.load();
    } else {
      sound.stop();
      sound.play();
    }
    gameControlsRef.current?.startRun();
    gameplayActiveRef.current = true;
    setTrackElapsed(0);
    setScore(0);
    setCombo(0);
    setMultiplier(1);
    setHealth(100);
    setGameStarted(true);
    setGamePaused(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    if (!gameStarted) {
      return;
    }

    setMenuOpen((prev) => {
      const nextOpen = !prev;
      if (nextOpen) {
        pauseGameplay();
      }
      return nextOpen;
    });
  };

  const quitToSongs = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
    gameplayActiveRef.current = false;
    navigate('/songs');
  };
  useEffect(() => {
    refreshWalletHighScores();
    const byWallet = readLatestSubmittedByWallet();
    setLatestSubmittedScore(byWallet[walletId] ?? null);
  }, [publicKey]);

  useEffect(() => {
    const hiddenValue = localStorage.getItem(HIDE_TRACKER_STORAGE_KEY);
    setHideHighScoreTracker(hiddenValue === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem(HIDE_TRACKER_STORAGE_KEY, hideHighScoreTracker ? 'true' : 'false');
  }, [hideHighScoreTracker]);

  useEffect(() => {
    const savedDistortion = localStorage.getItem(DISTORTION_STORAGE_KEY);
    if (savedDistortion === 'low' || savedDistortion === 'high') {
      applyDistortionLevel(savedDistortion);
      return;
    }

    applyDistortionLevel('high');
  }, []);

  useEffect(() => {
    localStorage.setItem(DISTORTION_STORAGE_KEY, distortionLevel);
    document.documentElement.setAttribute('data-distortion', distortionLevel);
  }, [distortionLevel]);

  useEffect(() => {
    syncClientRef.current?.dispose();

    const client = new MultiplayerSyncClient(
      multiplayerRoomId,
      playerId,
      setPeerStates,
      handleIncomingPeerEvent,
    );
    syncClientRef.current = client;
    client.heartbeat();

    return () => {
      client.dispose();
      if (syncClientRef.current === client) {
        syncClientRef.current = null;
      }
      setPeerStates([]);
      setRecentPeerEvents([]);
    };
  }, [multiplayerRoomId, playerId]);

  useEffect(() => {
    if (!gameStarted) {
      return;
    }

    syncClientRef.current?.publish({
      score,
      combo,
      health,
      songTimeMs: Math.round(trackElapsed * 1000),
    });
  }, [score, combo, health, trackElapsed, gameStarted]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      syncClientRef.current?.heartbeat();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!soundRef.current) {
      return;
    }

    soundRef.current.volume(volume / 100);
    soundRef.current.mute(muted);
  }, [volume, muted]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const sound = soundRef.current;
      if (!sound || sound.state() !== 'loaded') {
        return;
      }

      const duration = sound.duration() || 0;
      const seekValue = sound.seek();
      const elapsed = typeof seekValue === 'number' ? seekValue : 0;

      setTrackDuration(duration);
      setTrackElapsed(duration > 0 ? elapsed % duration : 0);
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const sound = soundRef.current;
      const isPlaying = Boolean(sound && sound.playing() && gameStarted && !gamePaused && !muted);

      setVisualizerLevels((currentLevels) => {
        const nextLevels = [...currentLevels];
        const now = Date.now();

        for (let index = 0; index < nextLevels.length; index += 1) {
          if (!isPlaying) {
            nextLevels[index] = 10 + Math.max(0, (nextLevels[index] - 10) * 0.5);
            continue;
          }

          const wave = Math.sin((now / 170) + index * 0.72);
          const variance = Math.random() * 12;
          const target = 16 + (wave + 1) * 14 + variance;
          nextLevels[index] = Math.max(10, Math.min(58, target));
        }

        return nextLevels;
      });
    }, 90);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [gameStarted, gamePaused, muted]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        toggleMenu();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (!gameRef.current) {
      const gameWidth = Math.min(window.innerWidth * 0.9, 1100);
      const gameHeight = 700;

      const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: gameWidth,
        height: gameHeight,
        backgroundColor: '#0a001f',
        scene: {
          preload: function () {
            this.load.audio('song', selectedAudioUrl);
            const graphics = this.add.graphics();
            graphics.fillStyle(0xffffff, 1);
            graphics.fillCircle(30, 30, 30);
            graphics.lineStyle(6, 0xffffff, 0.8);
            graphics.strokeCircle(30, 30, 30);
            graphics.generateTexture('note', 60, 60);
          },
          create: function () {
            const scene = this;
            const sceneWidth = this.scale.width;
            const sceneHeight = this.scale.height;
            const widthScale = sceneWidth / 750;
            const laneWidth = 140 * widthScale;
            const laneXs = [150, 300, 450, 600].map((x) => x * widthScale);
            const strikeZoneX = 375 * widthScale;
            const strikeZoneY = 550;
            const strikeZoneWidth = 520 * widthScale;
            const hitWindow = difficultySettings.hitWindow;
            const activeNotes: Phaser.GameObjects.Image[][] = [[], [], [], []];
            let currentScore = 0;
            let currentCombo = 0;
            let currentMultiplier = 1;
            let currentHealth = 100;

            const updateHud = () => {
              scoreText.setText(`SCORE: ${currentScore}`);
              comboText.setText(`COMBO: ${currentCombo}x`);
              healthText.setText(`HEALTH: ${currentHealth}%`);
              setScore(currentScore);
              setCombo(currentCombo);
              setMultiplier(currentMultiplier);
              setHealth(currentHealth);
            };

            const removeFromLane = (laneIndex: number, note: Phaser.GameObjects.Image) => {
              const laneNotes = activeNotes[laneIndex];
              const noteIndex = laneNotes.indexOf(note);
              if (noteIndex >= 0) {
                laneNotes.splice(noteIndex, 1);
              }
            };

            const currentSongTimeMs = () => {
              const sound = soundRef.current;
              if (!sound) {
                return 0;
              }

              const seekValue = sound.seek();
              return typeof seekValue === 'number' ? Math.round(seekValue * 1000) : 0;
            };

            const showHitPopup = (laneIndex: number, pointsAwarded: number, currentHitMultiplier: number) => {
              const popup = this.add.text(laneXs[laneIndex], strikeZoneY - 44, `+${pointsAwarded} · x${currentHitMultiplier.toFixed(1)}`, {
                fontSize: '22px',
                color: '#ffffff',
                fontFamily: 'Arial Black',
                stroke: '#2f0f63',
                strokeThickness: 6,
              });

              popup.setOrigin(0.5);
              popup.setDepth(10);
              popup.setAlpha(0.98);

              this.tweens.add({
                targets: popup,
                y: strikeZoneY - 118,
                alpha: 0,
                scaleX: 1.12,
                scaleY: 1.12,
                duration: 420,
                ease: 'Sine.Out',
                onComplete: () => popup.destroy(),
              });
            };

            const registerMiss = () => {
              if (!gameplayActiveRef.current) {
                return;
              }

              currentCombo = 0;
              currentMultiplier = 1;
              currentHealth = Math.max(0, currentHealth - 8);
              updateHud();

              syncClientRef.current?.publishGameplayEvent({
                eventType: 'miss',
                laneIndex: null,
                score: currentScore,
                combo: currentCombo,
                health: currentHealth,
                songTimeMs: currentSongTimeMs(),
              });
            };

            const clearActiveNotes = () => {
              activeNotes.forEach((lane) => {
                lane.forEach((note) => note.destroy());
                lane.length = 0;
              });
            };

            const resetRunState = () => {
              clearActiveNotes();
              currentScore = 0;
              currentCombo = 0;
              currentMultiplier = 1;
              currentHealth = 100;
              updateHud();
            };

            // Cosmic particles
            this.add.particles(0, 0, 'note', {
              x: { min: 0, max: sceneWidth },
              y: { min: 0, max: sceneHeight },
              speedY: { min: 10, max: 40 },
              lifespan: 9000,
              quantity: 1,
              scale: { start: 0.2, end: 0 },
              blendMode: 'ADD',
              frequency: 80
            });

            // 4 colored lanes
            const laneColors = [0xff6b35, 0xa0a0ff, 0x00ff88, 0x9945ff]; // Orange, Purple, Green, Blue

            laneXs.forEach((x, i) => {
              const laneColor = laneColors[i];
              const rail = this.add.rectangle(x, sceneHeight / 2, laneWidth, sceneHeight, 0x130028, 0.72);
              rail.setStrokeStyle(4, laneColor, 0.88);

              const laneCore = this.add.rectangle(x, sceneHeight / 2, laneWidth * 0.62, sceneHeight, laneColor, 0.08);
              laneCore.setBlendMode(Phaser.BlendModes.ADD);

              const edgeLeft = this.add.rectangle(x - laneWidth * 0.48, sceneHeight / 2, 3, sceneHeight, laneColor, 0.5);
              const edgeRight = this.add.rectangle(x + laneWidth * 0.48, sceneHeight / 2, 3, sceneHeight, laneColor, 0.5);
              edgeLeft.setBlendMode(Phaser.BlendModes.ADD);
              edgeRight.setBlendMode(Phaser.BlendModes.ADD);

              const glitchSliceA = this.add.rectangle(x, sceneHeight * 0.28, laneWidth * 0.84, 6, laneColor, 0.22);
              const glitchSliceB = this.add.rectangle(x, sceneHeight * 0.62, laneWidth * 0.76, 4, laneColor, 0.18);
              glitchSliceA.setBlendMode(Phaser.BlendModes.ADD);
              glitchSliceB.setBlendMode(Phaser.BlendModes.ADD);

              this.tweens.add({
                targets: [rail, laneCore],
                alpha: { from: 0.9, to: 0.45 },
                yoyo: true,
                duration: 1200 + i * 120,
                repeat: -1
              });

              this.tweens.add({
                targets: [edgeLeft, edgeRight],
                alpha: { from: 0.2, to: 0.75 },
                yoyo: true,
                duration: 600,
                repeat: -1,
                delay: i * 60
              });

              this.tweens.add({
                targets: rail,
                x: x + (i % 2 === 0 ? 2.5 : -2.5),
                yoyo: true,
                duration: 90,
                repeat: -1,
                repeatDelay: Phaser.Math.Between(450, 900)
              });

              this.tweens.add({
                targets: [glitchSliceA, glitchSliceB],
                alpha: { from: 0.35, to: 0.02 },
                yoyo: true,
                duration: 140,
                repeat: -1,
                repeatDelay: Phaser.Math.Between(280, 520)
              });
            });

            // Strike zone
            this.add
              .rectangle(strikeZoneX, strikeZoneY, strikeZoneWidth, 100, 0x9945ff, 0.15)
              .setStrokeStyle(4, 0xffffff, 0.8);

            // UI text
            const scoreText = this.add.text(50, 30, 'SCORE: 0', {
              fontSize: '40px',
              color: '#a0a0ff',
              fontFamily: 'Arial Black',
              stroke: '#000',
              strokeThickness: 8
            });
            const comboText = this.add.text(50, 80, 'COMBO: 0x', {
              fontSize: '36px',
              color: '#ff6b35',
              fontFamily: 'Arial Black',
              stroke: '#000',
              strokeThickness: 8
            });
            const healthText = this.add.text(50, 130, 'HEALTH: 100%', {
              fontSize: '36px',
              color: '#00ff88',
              fontFamily: 'Arial Black',
              stroke: '#000',
              strokeThickness: 8
            });

            // Falling notes
            this.time.addEvent({
              delay: difficultySettings.spawnDelay,
              callback: () => {
                if (!gameplayActiveRef.current) {
                  return;
                }

                const lane = Phaser.Math.Between(0, 3);
                const x = laneXs[lane];
                const note = this.add.image(x, -50, 'note').setScale(1);
                note.setTint(laneColors[lane]);
                note.setData('lane', lane);
                note.setData('isActive', true);
                activeNotes[lane].push(note);
                this.tweens.add({
                  targets: note,
                  y: sceneHeight - 50,
                  duration: difficultySettings.travelDuration,
                  onComplete: () => {
                    const isActive = note.getData('isActive');
                    if (isActive) {
                      removeFromLane(lane, note);
                      registerMiss();
                    }
                    note.destroy();
                  }
                });
              },
              loop: true
            });

            // Hit detection
            const hitNote = (laneIndex: number) => {
              if (!gameplayActiveRef.current) {
                return;
              }

              const laneNotes = activeNotes[laneIndex].filter((note) => note.active && note.getData('isActive'));
              if (laneNotes.length === 0) {
                registerMiss();
                return;
              }

              let closestNote: Phaser.GameObjects.Image | null = null;
              let closestDistance = Number.MAX_SAFE_INTEGER;

              laneNotes.forEach((note) => {
                const distance = Math.abs(note.y - strikeZoneY);
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestNote = note;
                }
              });

              if (!closestNote || closestDistance > hitWindow) {
                registerMiss();
                return;
              }

              closestNote.setData('isActive', false);
              removeFromLane(laneIndex, closestNote);
              closestNote.destroy();

              currentCombo += 1;
              currentMultiplier = Math.min(5, 1 + Math.floor(currentCombo / 4) * 0.5);
              const pointsAwarded = Math.round(100 * currentMultiplier);
              currentScore += pointsAwarded;
              currentHealth = Math.min(100, currentHealth + 4);
              updateHud();
              showHitPopup(laneIndex, pointsAwarded, currentMultiplier);

              syncClientRef.current?.publishGameplayEvent({
                eventType: 'hit',
                laneIndex,
                score: currentScore,
                combo: currentCombo,
                health: currentHealth,
                songTimeMs: currentSongTimeMs(),
              });

              const hitBurst = this.add.particles(laneXs[laneIndex], strikeZoneY, 'note', {
                speed: { min: 180, max: 320 },
                lifespan: { min: 180, max: 320 },
                quantity: 14,
                scale: { start: 0.9, end: 0 },
                alpha: { start: 0.85, end: 0 },
                blendMode: 'ADD',
                tint: laneColors[laneIndex]
              });

              this.time.delayedCall(350, () => {
                hitBurst.destroy();
              });
            };

            this.input.keyboard.on('keydown-A', () => hitNote(0));
            this.input.keyboard.on('keydown-S', () => hitNote(1));
            this.input.keyboard.on('keydown-D', () => hitNote(2));
            this.input.keyboard.on('keydown-F', () => hitNote(3));

            this.input.on('pointerdown', (pointer) => {
              if (!gameplayActiveRef.current) {
                return;
              }

              const x = pointer.x;
              const laneBoundary1 = (laneXs[0] + laneXs[1]) / 2;
              const laneBoundary2 = (laneXs[1] + laneXs[2]) / 2;
              const laneBoundary3 = (laneXs[2] + laneXs[3]) / 2;

              if (x < laneBoundary1) hitNote(0);
              else if (x < laneBoundary2) hitNote(1);
              else if (x < laneBoundary3) hitNote(2);
              else hitNote(3);
            });

            gameControlsRef.current = {
              startRun: () => {
                resetRunState();
                gameplayActiveRef.current = true;
                scene.time.timeScale = 1;
                scene.tweens.timeScale = 1;
              },
              pauseRun: () => {
                gameplayActiveRef.current = false;
                scene.time.timeScale = 0;
                scene.tweens.timeScale = 0;
              },
              resumeRun: () => {
                gameplayActiveRef.current = true;
                scene.time.timeScale = 1;
                scene.tweens.timeScale = 1;
              }
            };

            gameControlsRef.current.pauseRun();
            setIsGameReady(true);
          }
        }
      };

      const newGame = new Phaser.Game(config);
      gameRef.current = newGame;
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current = null;
      }
      gameControlsRef.current = null;
      setIsGameReady(false);
    };
  }, []);

  return (
    <div className="game-page">
      <div className="game-aura" />
      <div className="game-stars" />
      <div className="game-vignette" />
      <div className="game-content">
        <h1 className="game-title" aria-label="Rhythmforge – Play">
          <span>Rhythmforge – {selectedSongName}</span>
          <span aria-hidden="true">Rhythmforge – {selectedSongName}</span>
        </h1>
        <button
          type="button"
          className="game-menu-toggle game-menu-toggle-floating"
          onClick={toggleMenu}
          aria-label="Open in-game menu"
          disabled={!gameStarted}
        >
          ☰
        </button>
        <div className="game-top-actions">
          <button type="button" className="game-primary-action" onClick={startGameplay} disabled={!isGameReady}>
            Start
          </button>
        </div>
        <div className="game-controls-panel">
          <div className="game-controls-row">
            <span>SCORE: {score}</span>
            <span>COMBO: {combo}x</span>
            <span>MULTIPLIER: x{multiplier.toFixed(1)}</span>
            <span>HEALTH: {health}%</span>
            <span>DIFFICULTY: {selectedDifficulty.toUpperCase()}</span>
            {gameStarted && gamePaused && !menuOpen && <span className="game-paused-badge">PAUSED</span>}
          </div>
          <div className="game-controls-row game-distortion-row">
            <span>Distortion</span>
            <div className="game-distortion-buttons">
              {(['low', 'high'] as DistortionLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`song-menu-difficulty-button ${distortionLevel === level ? 'is-active' : ''}`}
                  onClick={() => applyDistortionLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="game-multiplayer-panel">
            <span>Room: {multiplayerRoomId}</span>
            <span>Peers Online: {peerStates.length}</span>
            <span>
              Top Peer Score: {topPeer?.score ?? 0}
            </span>
            <span>Top Peer Drift: {topPeerDriftMs}ms</span>
          </div>
          <div className="game-multiplayer-events">
            <span className="game-multiplayer-events-title">Live Event Sync</span>
            {recentPeerEvents.length === 0 ? (
              <p className="game-multiplayer-events-empty">Waiting for peer gameplay events...</p>
            ) : (
              <ul className="game-multiplayer-events-list">
                {recentPeerEvents.map((event, index) => (
                  <li key={`${event.playerId}-${event.emittedAt}-${index}`}>
                    <span>{event.eventType.toUpperCase()}</span>
                    <span>{event.score}</span>
                    <span>{formatMsAsTime(event.songTimeMs)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="game-controls-row game-controls-row-stake">
            <span>Current $SKR Stake: {skrStake}</span>
            <span>Stake Multiplier: x{stakeMultiplier.toFixed(2)}</span>
            <input
              className="game-stake-input"
              type="number"
              min="1"
              value={stakeInput}
              onChange={(event) => setStakeInput(event.target.value)}
              placeholder="Stake $SKR"
            />
            <button type="button" className="game-control-button" onClick={handleStake} disabled={!connected}>
              Stake $SKR
            </button>
            <button
              type="button"
              className="game-control-button"
              onClick={handleSubmitHighScore}
              disabled={score <= 0}
            >
              Submit High Score
            </button>
          </div>
          <div className="game-high-score-panel">
            <div className="game-high-score-header">
              <span>High Score Tracker</span>
              <div className="game-high-score-header-actions">
                <span>Best: {bestScore}</span>
                <button
                  type="button"
                  className="game-control-button game-tracker-toggle"
                  onClick={() => setHideHighScoreTracker((previous) => !previous)}
                >
                  {hideHighScoreTracker ? 'Show Tracker' : 'Hide Tracker'}
                </button>
              </div>
            </div>
            {hideHighScoreTracker ? (
              latestSubmittedScore === null ? (
                <p className="game-high-score-empty">No latest submitted score found yet.</p>
              ) : (
                <p className="game-high-score-empty">Latest submitted (saved): {latestSubmittedScore}</p>
              )
            ) : highScores.length === 0 ? (
              <p className="game-high-score-empty">No submitted scores yet for this wallet.</p>
            ) : (
              <ul className="game-high-score-list">
                {highScores.map((entry, index) => (
                  <li key={`${entry.submittedAt}-${index}`} className="game-high-score-item">
                    <span>#{index + 1} · {entry.score}</span>
                    <span>x{entry.multiplier.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            )}
            {latestSubmittedScore !== null && (
              <div className="game-share-panel">
                <span>Latest submitted: {latestSubmittedScore}</span>
                <div className="game-share-actions">
                  <button type="button" className="game-control-button" onClick={handleCopyShareLink}>
                    {copiedShareLink ? 'Copied!' : 'Copy Link'}
                  </button>
                  <a
                    className="game-control-button game-share-link"
                    href={xShareUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Share on X
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="game-stage">
          <div id="game-container" className="game-canvas-frame"></div>
          {!gameStarted && (
            <div className="game-start-overlay">
              <p>{isGameReady ? 'Press Start to begin song, notes, and scoring.' : 'Loading game engine...'}</p>
              <button type="button" className="game-primary-action" onClick={startGameplay} disabled={!isGameReady}>
                Start
              </button>
            </div>
          )}
          {menuOpen && (
            <div className="game-menu-overlay">
              <div className="game-menu-card">
                <h2>In-Game Menu</h2>
                <button
                  type="button"
                  className="game-control-button"
                  onClick={() => {
                    if (gamePaused) {
                      resumeGameplay();
                      setMenuOpen(false);
                    } else {
                      pauseGameplay();
                    }
                  }}
                >
                  {gamePaused ? 'Resume' : 'Pause'}
                </button>
                <div className="game-audio-settings">
                  <label htmlFor="volume-slider">Volume: {volume}%</label>
                  <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                  />
                  <button
                    type="button"
                    className="game-control-button"
                    onClick={() => setMuted((prev) => !prev)}
                  >
                    {muted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
                <div className="game-menu-distortion">
                  <span>Distortion</span>
                  <div className="game-distortion-buttons">
                    {(['low', 'high'] as DistortionLevel[]).map((level) => (
                      <button
                        key={`menu-${level}`}
                        type="button"
                        className={`song-menu-difficulty-button ${distortionLevel === level ? 'is-active' : ''}`}
                        onClick={() => applyDistortionLevel(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="button" className="game-control-button game-quit-button" onClick={quitToSongs}>
                  Quit to Song Menu
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="game-progress-panel">
          <div className="game-progress-labels">
            <span>Track Progress</span>
            <span>{formatTrackTime(trackElapsed)} / {formatTrackTime(trackDuration)}</span>
          </div>
          <div className="game-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={trackDuration > 0 ? Math.round((trackElapsed / trackDuration) * 100) : 0}>
            <div
              className="game-progress-fill"
              style={{ width: `${trackDuration > 0 ? Math.min(100, (trackElapsed / trackDuration) * 100) : 0}%` }}
            />
          </div>
          <div className="game-visualizer" aria-label="Audio visualizer">
            {visualizerLevels.map((level, index) => (
              <span
                key={`viz-${index}`}
                className="game-visualizer-bar"
                style={{ height: `${level}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}