/** Echo's resonating sigil — three wave rings + "E" glyph + spinning amber orbit */
export default function EchoSigil() {
  return (
    <div className="sigil-shell" aria-hidden="true">
      <div className="sigil-core">
        <div className="wave-ring ring-1" />
        <div className="wave-ring ring-2" />
        <div className="wave-ring ring-3" />
        <div className="sigil-note">E</div>
      </div>
    </div>
  )
}
