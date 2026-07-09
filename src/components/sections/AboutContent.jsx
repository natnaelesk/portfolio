import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";

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
        About<span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label>The person behind the commits</Label>
    </Pad>
  );
}

function A() {
  return <ImageOrPlaceholder src={images.about || images.portrait} alt={profile.name} label="about image" />;
}

function C() {
  return (
    <Pad className="thin-scroll" style={{ overflowY: "auto", gap: "14px", justifyContent: "center" }}>
      {profile.about.map((p, i) => (
        <p
          key={i}
          style={{
            color: i === 0 ? "var(--text)" : "var(--muted)",
            fontSize: "clamp(0.85rem, 1.25vw, 1.05rem)",
            lineHeight: 1.7,
            maxWidth: "68ch",
          }}
        >
          {p}
        </p>
      ))}
    </Pad>
  );
}

function D() {
  return (
    <Pad
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        alignItems: "center",
        gap: "clamp(8px, 1.5vw, 20px)",
      }}
    >
      {profile.stats.map((s) => (
        <div key={s.label} style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(1.2rem, 2.3vw, 2rem)",
              color: "var(--accent)",
              lineHeight: 1,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "6px",
              lineHeight: 1.5,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </Pad>
  );
}

function E() {
  return (
    <Pad style={{ justifyContent: "center", gap: "10px" }} className="thin-scroll">
      {profile.experience.map((e) => (
        <div key={e.role} style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{e.role}</span>
          <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
            {e.org} — {e.period}
          </span>
        </div>
      ))}
    </Pad>
  );
}

export default { A, B, C, D, E };
