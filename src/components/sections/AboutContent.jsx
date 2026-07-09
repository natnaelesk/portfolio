import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";

/* B — heading strip */
export function B() {
  return (
    <Pad
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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

/* C — the story, clear and open */
export function C() {
  return (
    <Pad
      className="thin-scroll"
      style={{ overflowY: "auto", gap: "14px" }}
      onWheel={(e) => {
        const el = e.currentTarget;
        if (el.scrollHeight > el.clientHeight) e.stopPropagation();
      }}
    >
      {profile.about.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: i === 0 ? "clamp(0.95rem, 1.35vw, 1.2rem)" : "clamp(0.85rem, 1.1vw, 1rem)",
            lineHeight: 1.6,
            color: i === 0 ? "var(--text)" : "var(--muted)",
            fontWeight: i === 0 ? 500 : 450,
            maxWidth: "58ch",
          }}
        >
          {p}
        </p>
      ))}
    </Pad>
  );
}

/* E — experience timeline */
export function E() {
  return (
    <Pad className="thin-scroll" style={{ overflowY: "auto", gap: "4px" }}>
      <Label style={{ marginBottom: "10px" }}>Experience</Label>
      {profile.experience.map((e) => (
        <div
          key={e.role}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{e.role}</div>
          <div style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: "3px" }}>
            {e.org}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--accent)", marginTop: "3px", fontWeight: 550 }}>
            {e.period}
          </div>
        </div>
      ))}
    </Pad>
  );
}

/* D, F, G — one stat per box */
function Stat({ index }) {
  const s = profile.stats[index];
  if (!s) return null;
  return (
    <Pad style={{ justifyContent: "center", gap: "4px" }}>
      <div
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--accent)",
        }}
      >
        {s.value}
      </div>
      <div style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 500 }}>
        {s.label}
      </div>
    </Pad>
  );
}

export function D() {
  return <Stat index={0} />;
}
export function F() {
  return <Stat index={2} />;
}
export function G() {
  return <Stat index={3} />;
}
