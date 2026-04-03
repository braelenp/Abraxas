/** Abraxas-style multi-layer light beams — adapted for Echo's cyan/purple/amber palette */
export default function LightBeams() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(34,231,242,0.25)_30%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(153,69,255,0.2)_40%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen [background:linear-gradient(to_top,rgba(255,159,28,0.15)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(153,69,255,0.1)_0%,transparent_70%)]" />
    </>
  )
}
