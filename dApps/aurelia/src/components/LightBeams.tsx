export default function LightBeams() {
  return (
    <>
      {/* Primary gold beam — 135deg (matches Abraxas cyan beam angle) */}
      <div className="pointer-events-none fixed inset-0 z-0 mix-blend-screen opacity-35 [background:linear-gradient(135deg,transparent_10%,rgba(245,158,11,0.22)_40%,transparent_68%)]" />
      {/* Purple cross-beam — 225deg */}
      <div className="pointer-events-none fixed inset-0 z-0 mix-blend-screen opacity-25 [background:linear-gradient(225deg,transparent_10%,rgba(153,69,255,0.28)_45%,transparent_72%)]" />
      {/* Orange floor wash — upward */}
      <div className="pointer-events-none fixed inset-0 z-0 mix-blend-screen opacity-20 [background:linear-gradient(to_top,rgba(234,88,12,0.18)_0%,transparent_50%)]" />
      {/* Radial center core */}
      <div className="pointer-events-none fixed inset-0 z-0 [background:radial-gradient(ellipse_at_50%_38%,rgba(245,158,11,0.10)_0%,transparent_64%)]" />
      {/* Cyan accent — bottom right */}
      <div className="pointer-events-none fixed inset-0 z-0 mix-blend-screen opacity-15 [background:linear-gradient(315deg,transparent_20%,rgba(34,211,238,0.18)_55%,transparent_75%)]" />
      {/* Tech-pulse overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25 mix-blend-screen"
        style={{
          background: 'linear-gradient(105deg,transparent 20%,rgba(245,158,11,0.12) 50%,transparent 78%)',
          animation: 'tech-pulse 8s ease-in-out infinite',
        }}
      />
    </>
  )
}
