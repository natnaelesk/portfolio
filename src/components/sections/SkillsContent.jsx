import profile from "../../data/profile.json";
import { Pad, Label } from "../ui.jsx";

/* B: heading strip */
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
        Skills &amp; Services<span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label>What I build with, and what I build for you</Label>
    </Pad>
  );
}

/* one skill group per box */
const TINTS = ["#0071e3", "#af52de", "#ff9500", "#30d158"];

function SkillGroup({ index }) {
  const g = profile.skills[index];
  if (!g) return null;
  return (
    <Pad className="thin-scroll" style={{ overflowY: "auto", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "3px",
            background: TINTS[index % TINTS.length],
            flexShrink: 0,
          }}
        />
        <Label style={{ color: "var(--text)" }}>{g.group}</Label>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {g.items.map((item) => (
          <span
            key={item}
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "0.74rem",
              fontWeight: 550,
              background: "var(--panel-2)",
              color: "var(--text)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </Pad>
  );
}

export function C() {
  return <SkillGroup index={0} />;
}
export function D() {
  return <SkillGroup index={1} />;
}
export function F() {
  return <SkillGroup index={2} />;
}
export function G() {
  return <SkillGroup index={3} />;
}

/* E: services, 2x2 */
export function E() {
  return (
    <Pad style={{ gap: "10px" }}>
      <Label>Services</Label>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        {profile.services.map((s) => (
          <div
            key={s.name}
            style={{
              borderRadius: "14px",
              background: "var(--panel-2)",
              padding: "clamp(10px, 1.2vw, 16px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ fontWeight: 650, fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}>
              {s.name}
            </div>
            <div
              style={{
                fontSize: "clamp(0.68rem, 0.85vw, 0.78rem)",
                color: "var(--muted)",
                lineHeight: 1.45,
              }}
            >
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </Pad>
  );
}

/* H: how I ship */
export function H() {
  return (
    <Pad style={{ justifyContent: "center", gap: "10px" }}>
      <Label>How I ship</Label>
      <p
        style={{
          fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
          lineHeight: 1.6,
          color: "var(--text)",
          fontWeight: 500,
        }}
      >
        One engineer, the whole stack: frontend, backend, database, CI/CD, DNS
        and mail. Every launch SEO-optimized and{" "}
        <span style={{ color: "var(--accent)" }}>ranking first on Google</span>{" "}
        for its name.
      </p>
    </Pad>
  );
}
