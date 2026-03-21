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

const primaryLogoPath = '/assets/abraxas-logo-graphic.jpg';
const fallbackLogoPath = '/assets/abraxas-wordmark.svg';

export function BrandLogo({ size = 'sm', showWordmark = true, className = '' }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <div className={`overflow-hidden border border-cyan-300/35 bg-slate-950/70 ${sizeClasses[size]}`}>
        <img
          src={primaryLogoPath}
          alt="Abraxas logo"
          className="h-full w-full object-cover object-center"
          onError={(event) => {
            event.currentTarget.src = fallbackLogoPath;
          }}
        />
      </div>
      {showWordmark ? <span className="gold-accent-text text-lg font-semibold tracking-wide">ABRAXAS</span> : null}
    </div>
  );
}
