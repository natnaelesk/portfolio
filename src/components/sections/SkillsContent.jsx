import profile from "../../data/profile.json";
import { Pad, Label } from "../ui.jsx";

function B() {
  return (
    <Pad style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Skills &amp; Services<span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label>What I work with — and what I can do for you</Label>
    </Pad>
  );
}

function C() {
  return (
    <Pad className="thin-scroll" style={{ overflowY: "auto", gap: "18px", justifyContent: "center" }}>
      {profile.skills.map((g) => (
        <div key={g.group}>
          <Label>{g.group}</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            {g.items.map((s) => (
              <span
                key={s}
                style={{
                  padding: "7px 16px",
                  borderRadius: "10px",
                  background: "var(--panel-2)",
                  border: "1px solid var(--line)",
                  fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Pad>
  );
}

function D() {
  return (
    <Pad className="thin-scroll" style={{ overflowY: "auto", gap: "12px", justifyContent: "center" }}>
      {profile.services.map((s, i) => (
        <div key={s.name} style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--accent)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.95rem" }}>
              {s.name}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.5 }}>
              {s.desc}
            </div>
          </div>
        </div>
      ))}
    </Pad>
  );
}

function E() {
  return (
    <Pad style={{ justifyContent: "center", background: "var(--accent-dim)" }}>
      <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
        Everything I ship is <strong>SEO-optimized</strong> — my products rank{" "}
        <span style={{ color: "var(--accent)" }}>first on Google</span> for their names.
      </p>
    </Pad>
  );
}

function A() { return null; }

export default { A, B, C, D, E };
