import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";

/* ==text== renders as a yellow marker sweep, __text__ as a hand-drawn pen line */
function Highlight({ text }) {
  return text.split(/(==[^=]+==|__[^_]+__)/g).map((part, i) => {
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <mark className="marker" key={i}>
          {part.slice(2, -2)}
        </mark>
      );
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <span className="sketch" key={i}>
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* B: heading strip. Title centered left, subtitle top right, stat chips bottom right. */
export function B() {
  const pad = "clamp(14px, 2vw, 26px)";

  return (
    <div style={{ height: "100%", position: "relative", minHeight: 0 }}>
      <Label
        style={{
          position: "absolute",
          top: pad,
          right: pad,
          fontSize: "clamp(0.6rem, 0.75vw, 0.72rem)",
        }}
      >
        Builder · Engineer · Cursor Ambassador
      </Label>

      <h2
        style={{
          position: "absolute",
          left: pad,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        About<span style={{ color: "var(--accent)" }}>.</span>
      </h2>

      <div
        style={{
          position: "absolute",
          bottom: pad,
          right: pad,
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          maxWidth: "72%",
        }}
      >
        {profile.stats.map((s) => (
          <span
            key={s.label}
            className="chip"
            style={{
              padding: "7px 13px",
              borderRadius: "10px",
              background: "var(--panel-2)",
              border: "1px solid var(--line)",
              color: "var(--muted)",
              fontSize: "clamp(0.66rem, 0.85vw, 0.78rem)",
              fontWeight: 550,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--text)", fontWeight: 650 }}>{s.value}</span>{" "}
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* A: portrait */
export function A() {
  return (
    <ImageOrPlaceholder
      src={images.about || images.portrait}
      alt={profile.name}
      label="photo"
    />
  );
}

/* C: the story with clear hierarchy. Lead, body, then what sets me apart. */
export function C() {
  return (
    <Pad
      className="thin-scroll"
      style={{ overflowY: "auto", gap: "clamp(12px, 1.8vh, 20px)" }}
      onWheel={(e) => {
        const el = e.currentTarget;
        if (el.scrollHeight > el.clientHeight) e.stopPropagation();
      }}
    >
      <Label>Who I am</Label>

      <p
        style={{
          fontSize: "clamp(1.05rem, 1.6vw, 1.5rem)",
          lineHeight: 1.4,
          fontWeight: 650,
          letterSpacing: "-0.015em",
          color: "var(--text)",
          maxWidth: "30ch",
        }}
      >
        {profile.aboutLead}
      </p>

      {profile.about.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: "clamp(0.85rem, 1.05vw, 1rem)",
            lineHeight: 1.65,
            color: "#4a4a4f",
            fontWeight: 450,
            maxWidth: "58ch",
          }}
        >
          {p}
        </p>
      ))}

      <div style={{ marginTop: "clamp(2px, 0.6vh, 8px)" }}>
        <Label style={{ display: "block", marginBottom: "10px" }}>
          What sets me apart
        </Label>
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {profile.differentiators.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                fontSize: "clamp(0.85rem, 1.05vw, 1rem)",
                lineHeight: 1.6,
                fontWeight: 500,
                color: "var(--text)",
                maxWidth: "58ch",
              }}
            >
              <span style={{ color: "var(--accent)", flexShrink: 0, fontWeight: 700 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <Highlight text={d} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Pad>
  );
}

/* E: experience, clean minimal panel */
export function E() {
  return (
    <Pad
      className="thin-scroll"
      style={{
        overflowY: "auto",
        gap: "2px",
        background: "var(--panel-2)",
      }}
      onWheel={(e) => {
        const el = e.currentTarget;
        if (el.scrollHeight > el.clientHeight) e.stopPropagation();
      }}
    >
      <Label style={{ marginBottom: "12px" }}>Experience</Label>
      {profile.experience.map((e, i) => (
        <div
          key={e.role}
          style={{
            padding: "14px 0",
            borderBottom:
              i < profile.experience.length - 1 ? "1px solid var(--line)" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div style={{ fontWeight: 650, fontSize: "0.88rem", lineHeight: 1.35 }}>
              {e.role}
            </div>
            <span
              style={{
                fontSize: "0.66rem",
                fontWeight: 550,
                color: "var(--muted)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {e.period}
            </span>
          </div>
          <div
            style={{
              fontSize: "0.74rem",
              color: "var(--muted)",
              marginTop: "5px",
              lineHeight: 1.45,
            }}
          >
            {e.org}
          </div>
        </div>
      ))}
    </Pad>
  );
}
