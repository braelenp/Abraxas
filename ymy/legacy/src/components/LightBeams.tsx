export function LightBeams() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Primary crimson beam */}
      <div
        className="absolute left-1/2 top-0 w-96 h-screen"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(220, 38, 38, 0.22) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
          animation: 'dapp-bg-drift 12s ease-in-out infinite',
        }}
      />

      {/* Orange floor wash accent */}
      <div
        className="absolute left-0 bottom-0 w-full h-1/3"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.18) 0%, transparent 70%)',
          animation: 'dapp-bg-drift 15s ease-in-out infinite',
        }}
      />

      {/* Purple cross-beam */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96"
        style={{
          background: 'radial-gradient(ellipse at right center, rgba(153, 69, 255, 0.28) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
          animation: 'dapp-bg-drift 18s ease-in-out infinite reverse',
        }}
      />

      {/* Cyan accent beam */}
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.18) 0%, transparent 70%)',
          animation: 'dapp-bg-drift 20s ease-in-out infinite',
        }}
      />

      {/* Radial core */}
      <div
        className="absolute top-1/3 left-1/2 w-screen h-screen"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.10) 0%, transparent 60%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Tech pulse overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.12) 0%, transparent 80%)',
          animation: 'tech-pulse 4s ease-in-out infinite',
        }}
      />
    </div>
  )
}
