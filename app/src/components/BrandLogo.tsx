import { useEffect, useState } from 'react';

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showWordmark?: boolean;
  className?: string;
};

const sizeClasses: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'h-8 w-8 rounded-lg',
  md: 'h-12 w-12 rounded-xl',
  lg: 'h-24 w-24 rounded-2xl',
  xl: 'h-28 w-28 rounded-2xl',
  '2xl': 'h-36 w-36 rounded-2xl',
  '3xl': 'h-52 w-52 rounded-2xl',
};

const primaryLogoCandidates = [
  '/assets/abraxas-logo-graphic.jpg',
  '/assets/abraxas-logo-graphic.jpeg',
  '/assets/abraxas-logo-graphic.png',
  '/assets/abraxas-logo-graphic.webp',
];
const fallbackLogoPath = '/assets/abraxas-wordmark.svg';

export function BrandLogo({ size = 'sm', showWordmark = true, className = '' }: BrandLogoProps) {
  const [logoSrc, setLogoSrc] = useState(fallbackLogoPath);

  useEffect(() => {
    let isActive = true;

    const resolveLogo = async () => {
      try {
        for (const candidatePath of primaryLogoCandidates) {
          const response = await fetch(candidatePath, { cache: 'no-store' });
          if (!response.ok) {
            continue;
          }
          const blob = await response.blob();
          if (isActive && blob.size > 0) {
            setLogoSrc(candidatePath);
            return;
          }
        }
        if (isActive) {
          setLogoSrc(fallbackLogoPath);
        }
      } catch {
        if (isActive) {
          setLogoSrc(fallbackLogoPath);
        }
      }
    };

    resolveLogo();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <div className={`overflow-hidden border border-cyan-300/35 bg-slate-950/70 ${sizeClasses[size]}`}>
        <img
          src={logoSrc}
          alt="Abraxas logo"
          className="h-full w-full object-cover object-center"
          onError={() => setLogoSrc(fallbackLogoPath)}
        />
      </div>
      {showWordmark ? <span className="gold-accent-text text-lg font-semibold tracking-wide">ABRAXAS</span> : null}
    </div>
  );
}
