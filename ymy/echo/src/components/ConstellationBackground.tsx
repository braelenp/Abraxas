/**
 * Abraxas-style SVG constellation background — adapted for Echo's cyan palette.
 * Stars twinkle; connecting lines pulse. Positioned as a fixed background layer.
 */
export default function ConstellationBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <svg
        className="h-full w-full opacity-25"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>{`
            .echo-star {
              fill: rgba(34, 231, 242, 0.55);
              animation: twinkle 3s ease-in-out infinite;
            }
            .echo-line {
              stroke: rgba(34, 231, 242, 0.14);
              stroke-width: 1;
              animation: pulse-line 4s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Lines */}
        <line x1="100" y1="100" x2="250" y2="150" className="echo-line" style={{ animationDelay: '0s' }} />
        <line x1="250" y1="150" x2="350" y2="80"  className="echo-line" style={{ animationDelay: '0.3s' }} />
        <line x1="350" y1="80"  x2="450" y2="120" className="echo-line" style={{ animationDelay: '0.6s' }} />
        <line x1="900" y1="200" x2="1000" y2="280" className="echo-line" style={{ animationDelay: '0.2s' }} />
        <line x1="1000" y1="280" x2="1100" y2="200" className="echo-line" style={{ animationDelay: '0.4s' }} />
        <line x1="200" y1="600" x2="380"  y2="550" className="echo-line" style={{ animationDelay: '0.1s' }} />
        <line x1="380" y1="550" x2="500"  y2="650" className="echo-line" style={{ animationDelay: '0.5s' }} />
        <line x1="800" y1="650" x2="950"  y2="600" className="echo-line" style={{ animationDelay: '0.3s' }} />
        <line x1="950" y1="600" x2="1050" y2="720" className="echo-line" style={{ animationDelay: '0.7s' }} />

        {/* Stars */}
        <circle cx="100"  cy="100" r="2.5" className="echo-star" style={{ animationDelay: '0s' }} />
        <circle cx="250"  cy="150" r="2"   className="echo-star" style={{ animationDelay: '0.5s' }} />
        <circle cx="350"  cy="80"  r="2.5" className="echo-star" style={{ animationDelay: '1s' }} />
        <circle cx="450"  cy="120" r="2"   className="echo-star" style={{ animationDelay: '1.5s' }} />
        <circle cx="900"  cy="200" r="2.5" className="echo-star" style={{ animationDelay: '0.3s' }} />
        <circle cx="1000" cy="280" r="2"   className="echo-star" style={{ animationDelay: '0.8s' }} />
        <circle cx="1100" cy="200" r="2.5" className="echo-star" style={{ animationDelay: '1.2s' }} />
        <circle cx="200"  cy="600" r="2"   className="echo-star" style={{ animationDelay: '0.2s' }} />
        <circle cx="380"  cy="550" r="2.5" className="echo-star" style={{ animationDelay: '0.9s' }} />
        <circle cx="500"  cy="650" r="2"   className="echo-star" style={{ animationDelay: '0.6s' }} />
        <circle cx="800"  cy="650" r="2.5" className="echo-star" style={{ animationDelay: '1.1s' }} />
        <circle cx="950"  cy="600" r="2"   className="echo-star" style={{ animationDelay: '0.4s' }} />
        <circle cx="1050" cy="720" r="2"   className="echo-star" style={{ animationDelay: '0.7s' }} />

        {/* Accent purple stars */}
        <circle cx="600"  cy="350" r="3"   fill="rgba(153,69,255,0.4)"  style={{ animation: 'twinkle 4s ease-in-out infinite' }} />
        <circle cx="720"  cy="180" r="2"   fill="rgba(255,159,28,0.35)" style={{ animation: 'twinkle 3.5s ease-in-out infinite 0.6s' }} />
        <circle cx="150"  cy="400" r="2.5" fill="rgba(153,69,255,0.35)" style={{ animation: 'twinkle 5s ease-in-out infinite 1s' }} />
      </svg>
    </div>
  )
}
