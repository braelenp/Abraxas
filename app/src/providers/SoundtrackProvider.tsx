import { createContext, useContext, useMemo, useRef, useState, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from 'react';

const audioCandidates = [
  '/assets/landing-theme.mp3',
];

type SoundtrackContextValue = {
  soundtrackRef: RefObject<HTMLAudioElement | null>;
  audioCandidateIndex: number;
  setAudioCandidateIndex: Dispatch<SetStateAction<number>>;
  hasAudioTrack: boolean;
  setHasAudioTrack: Dispatch<SetStateAction<boolean>>;
  soundtrackEnabled: boolean;
  setSoundtrackEnabled: Dispatch<SetStateAction<boolean>>;
  autoplayBlocked: boolean;
  setAutoplayBlocked: Dispatch<SetStateAction<boolean>>;
  isSoundtrackPlaying: boolean;
  setIsSoundtrackPlaying: Dispatch<SetStateAction<boolean>>;
  audioCandidates: string[];
};

const SoundtrackContext = createContext<SoundtrackContextValue | null>(null);

export function SoundtrackProvider({ children }: { children: ReactNode }) {
  const soundtrackRef = useRef<HTMLAudioElement | null>(null);
  const [audioCandidateIndex, setAudioCandidateIndex] = useState(0);
  const [hasAudioTrack, setHasAudioTrack] = useState(true);
  const [soundtrackEnabled, setSoundtrackEnabled] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isSoundtrackPlaying, setIsSoundtrackPlaying] = useState(false);

  const value = useMemo(() => ({
    soundtrackRef,
    audioCandidateIndex,
    setAudioCandidateIndex,
    hasAudioTrack,
    setHasAudioTrack,
    soundtrackEnabled,
    setSoundtrackEnabled,
    autoplayBlocked,
    setAutoplayBlocked,
    isSoundtrackPlaying,
    setIsSoundtrackPlaying,
    audioCandidates,
  }), [audioCandidateIndex, hasAudioTrack, soundtrackEnabled, autoplayBlocked, isSoundtrackPlaying]);

  return (
    <SoundtrackContext.Provider value={value}>
      {children}
      {hasAudioTrack ? (
        <audio
          ref={soundtrackRef}
          src={audioCandidates[audioCandidateIndex]}
          autoPlay
          playsInline
          preload="auto"
          loop
          style={{ display: 'none' }}
        />
      ) : null}
    </SoundtrackContext.Provider>
  );
}

export function useSoundtrack() {
  const context = useContext(SoundtrackContext);

  if (!context) {
    throw new Error('useSoundtrack must be used within a SoundtrackProvider');
  }

  return context;
}
