import profile from "../../data/profile.json";
import { Pad, Label } from "../ui.jsx";
import { useIsMobile } from "../../hooks.js";

const TINTS = ["#0071e3", "#af52de", "#ff9500", "#30d158"];

/* B: heading strip */
export function B() {
  const isMobile = useIsMobile();

  return (
    <Pad
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        padding: isMobile ? "10px 14px" : "clamp(14px, 1.8vw, 22px)",
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? "1.15rem" : "clamp(1.5rem, 2.6vw, 2.4rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          whiteSpace: "nowrap",
        }}
      >
        Skills<span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label style={{ fontSize: isMobile ? "0.56rem" : undefined }}>
        {isMobile ? "Stack & services" : "What I build with, and what I build for you"}
      </Label>
    </Pad>
  );
}

function SkillChips({ items, compact = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: compact ? "5px" : "6px",
        alignContent: compact ? "flex-start" : undefined,
        flex: compact ? 1 : undefined,
      }}
    >
      {items.map((item) => (
        <span
          key={item}
          style={{
            padding: compact ? "5px 9px" : "6px 12px",
            borderRadius: "999px",
            fontSize: compact ? "0.68rem" : "0.74rem",
            fontWeight: 550,
            background: "var(--panel-2)",
            color: "var(--text)",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function SkillGroup({ index }) {
  const isMobile = useIsMobile();
  const g = profile.skills[index];
  if (!g) return null;

  return (
    <Pad
      className={isMobile ? undefined : "thin-scroll"}
      style={{
        overflowY: isMobile ? "hidden" : "auto",
        gap: isMobile ? "8px" : "10px",
        padding: isMobile ? "12px" : "clamp(14px, 1.6vw, 20px)",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "3px",
            background: TINTS[index % TINTS.length],
            flexShrink: 0,
          }}
        />
        <Label style={{ color: "var(--text)", fontSize: isMobile ? "0.58rem" : undefined }}>
          {g.group}
        </Label>
      </div>
      <SkillChips items={g.items} compact={isMobile} />
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

/* E: services */
export function E() {
  const isMobile = useIsMobile();

  return (
    <Pad
      style={{
        gap: isMobile ? "6px" : "10px",
        padding: isMobile ? "12px" : "clamp(14px, 1.6vw, 20px)",
        justifyContent: "flex-start",
      }}
    >
      <Label>Services</Label>
      <div
        className={isMobile ? "thin-scroll" : undefined}
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "6px" : "10px",
          overflowY: isMobile ? "auto" : "hidden",
          alignContent: isMobile ? "stretch" : undefined,
        }}
      >
        {profile.services.map((s) => (
          <div
            key={s.name}
            style={{
              borderRadius: isMobile ? "11px" : "14px",
              background: "var(--panel-2)",
              padding: isMobile ? "10px 12px" : "clamp(12px, 1.2vw, 16px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "3px",
              minHeight: 0,
            }}
          >
            <div
              style={{
                fontWeight: 650,
                fontSize: isMobile ? "0.82rem" : "clamp(0.8rem, 1vw, 0.95rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontSize: isMobile ? "0.72rem" : "clamp(0.68rem, 0.85vw, 0.78rem)",
                color: "var(--muted)",
                lineHeight: 1.4,
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

/* H: how I ship (desktop only) */
export function H() {
  return (
    <Pad style={{ justifyContent: "center", gap: "10px", padding: "clamp(14px, 1.6vw, 20px)" }}>
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
