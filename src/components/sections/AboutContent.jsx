import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";

/* renders ==text== as a marker highlight */
function Highlight({ text }) {
  return text
    .split(/==([^=]+)==/g)
    .map((part, i) =>
      i % 2 ? (
        <mark className="marker" key={i}>
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
}

const CHIP_TINTS = [
  { bg: "rgba(0,113,227,0.1)", color: "#0071e3" },
  { bg: "rgba(175,82,222,0.1)", color: "#af52de" },
  { bg: "rgba(255,149,0,0.13)", color: "#b25000" },
  { bg: "rgba(48,209,88,0.13)", color: "#1d7a3a" },
];

/* B — heading strip with stat chips bottom-right */
export function B() {
  return (
    <Pad
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          About<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
        <Label>Builder · Engineer · Cursor Ambassador</Label>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {profile.stats.map((s, i) => {
          const tint = CHIP_TINTS[i % CHIP_TINTS.length];
          return (
            <span
              key={s.label}
              style={{
                padding: "8px 14px",
                borderRadius: "12px",
                background: tint.bg,
                color: tint.color,
                fontSize: "clamp(0.7rem, 0.9vw, 0.82rem)",
                fontWeight: 650,
                whiteSpace: "nowrap",
              }}
            >
              {s.value} {s.label}
            </span>
          );
        })}
      </div>
    </Pad>
  );
}

/* A — portrait */
export function A() {
  return (
    <ImageOrPlaceholder
      src={images.about || images.portrait}
      alt={profile.name}
      label="photo"
    />
  );
}

/* C — the story, free and open, with marker highlights */
export function C() {
  return (
    <Pad
      className="thin-scroll"
      style={{ overflowY: "auto", gap: "clamp(14px, 2vh, 24px)", justifyContent: "center" }}
      onWheel={(e) => {
        const el = e.currentTarget;
        if (el.scrollHeight > el.clientHeight) e.stopPropagation();
      }}
    >
      {profile.about.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize:
              i === 0
                ? "clamp(1.02rem, 1.55vw, 1.45rem)"
                : "clamp(0.9rem, 1.2vw, 1.12rem)",
            lineHeight: 1.65,
            color: i === 0 ? "var(--text)" : "#4a4a4f",
            fontWeight: i === 0 ? 550 : 450,
            maxWidth: "56ch",
          }}
        >
          <Highlight text={p} />
        </p>
      ))}
    </Pad>
  );
}

/* E — experience, its own colored panel */
export function E() {
  return (
    <Pad
      className="thin-scroll"
      style={{
        overflowY: "auto",
        gap: "4px",
        background: "linear-gradient(165deg, #0a84ff 0%, #0055b8 100%)",
        color: "#fff",
      }}
      onWheel={(e) => {
        const el = e.currentTarget;
        if (el.scrollHeight > el.clientHeight) e.stopPropagation();
      }}
    >
      <Label style={{ color: "rgba(255,255,255,0.75)", marginBottom: "10px" }}>
        Experience
      </Label>
      {profile.experience.map((e) => (
        <div
          key={e.role}
          style={{
            padding: "12px 0",
            borderBottom: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div style={{ fontWeight: 650, fontSize: "0.92rem" }}>{e.role}</div>
          <div
            style={{
              fontSize: "0.76rem",
              color: "rgba(255,255,255,0.72)",
              marginTop: "4px",
              lineHeight: 1.4,
            }}
          >
            {e.org}
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: "7px",
              padding: "3px 10px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.16)",
              fontSize: "0.66rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            {e.period}
          </span>
        </div>
      ))}
    </Pad>
  );
}
