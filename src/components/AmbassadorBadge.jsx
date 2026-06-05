import badgeGif from "../assets/CursorAmbassador_Graphics_1920x1082_Motion_Dark-ezgif.com-crop.gif";

export default function AmbassadorBadge({ visible, replayKey }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 right-0 z-20 transition-opacity duration-500 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        key={replayKey}
        src={badgeGif}
        alt=""
        className="h-24 w-24 sm:h-32 sm:w-32 select-none"
      />
    </div>
  );
}
