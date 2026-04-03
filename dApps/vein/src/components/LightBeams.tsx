export default function LightBeams() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 animate-beam-sweep bg-[linear-gradient(140deg,transparent_8%,rgba(217,164,65,0.18)_30%,transparent_58%)] mix-blend-screen opacity-70" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(225deg,transparent_10%,rgba(153,69,255,0.26)_42%,transparent_72%)] mix-blend-screen opacity-60" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(320deg,transparent_15%,rgba(60,246,255,0.16)_52%,transparent_80%)] mix-blend-screen opacity-60" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_22%,rgba(79,191,135,0.14),transparent_42%),radial-gradient(circle_at_50%_68%,rgba(255,138,36,0.1),transparent_50%)]" />
    </>
  )
}
