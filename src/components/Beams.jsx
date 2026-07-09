/* Ambient light beams drifting behind the panels: the whole background. */
export default function Beams() {
  return (
    <div className="beams" aria-hidden="true">
      <div className="beam beam-1" />
      <div className="beam beam-2" />
      <div className="beam beam-3" />
      <div className="beam beam-4" />
    </div>
  );
}
