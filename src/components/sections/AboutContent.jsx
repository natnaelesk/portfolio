import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";
import { useIsMobile } from "../../hooks.js";

/* ==text== yellow marker, __text__ hand-drawn pen underline */
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

/* B: heading strip. Compact on mobile, roomy on desktop. */
export function B() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "12px 14px" : "clamp(14px, 2vw, 26px)";
  const stats = isMobile ? profile.stats.slice(0, 2) : profile.stats;

  if (isMobile) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: pad,
          minHeight: 0,
        }}
      >
        <h2
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            flexShrink: 0,
          }}
        >
          About<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            minWidth: 0,
          }}
        >
          {stats.map((s) => (
            <span
              key={s.label}
              style={{
                padding: "5px 9px",
                borderRadius: "8px",
                background: "var(--panel-2)",
                border: "1px solid var(--line)",
                color: "var(--muted)",
                fontSize: "0.62rem",
                fontWeight: 550,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "var(--text)", fontWeight: 650 }}>{s.value}</span>{" "}
              {s.label.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    );
  }

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

/* C: personality story */
export function C() {
  const isMobile = useIsMobile();
  const sections = profile.aboutSections || [];
  const mobileStats = profile.stats.slice(0, 2);

  return (
    <Pad
      className="thin-scroll"
      style={{
        overflowY: "auto",
        gap: isMobile ? "12px" : "clamp(12px, 1.8vh, 18px)",
        justifyContent: "flex-start",
        padding: isMobile ? "14px 16px" : "clamp(14px, 1.8vw, 22px)",
      }}
    >
      {isMobile ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              flexShrink: 0,
            }}
          >
            About<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {mobileStats.map((s) => (
              <span
                key={s.label}
                style={{
                  padding: "5px 9px",
                  borderRadius: "8px",
                  background: "var(--panel-2)",
                  border: "1px solid var(--line)",
                  color: "var(--muted)",
                  fontSize: "0.62rem",
                  fontWeight: 550,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "var(--text)", fontWeight: 650 }}>{s.value}</span>{" "}
                {s.label.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <Label>Who I am</Label>
      )}

      <p
        style={{
          fontSize: isMobile ? "1.05rem" : "clamp(1.05rem, 1.55vw, 1.4rem)",
          lineHeight: 1.4,
          fontWeight: 650,
          letterSpacing: "-0.015em",
          color: "var(--text)",
          maxWidth: isMobile ? "100%" : "34ch",
        }}
      >
        <Highlight text={profile.aboutLead} />
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "12px" : "clamp(12px, 1.6vh, 18px)",
        }}
      >
        {sections.map((s) => (
          <div key={s.label}>
            <Label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: isMobile ? "0.55rem" : "0.58rem",
              }}
            >
              {s.label}
            </Label>
            <p
              style={{
                fontSize: isMobile ? "0.88rem" : "clamp(0.84rem, 1.02vw, 0.96rem)",
                lineHeight: 1.55,
                color: "#4a4a4f",
                fontWeight: 450,
                maxWidth: isMobile ? "100%" : "52ch",
              }}
            >
              <Highlight text={s.text} />
            </p>
          </div>
        ))}
      </div>
    </Pad>
  );
}

/* E: experience */
export function E() {
  const isMobile = useIsMobile();

  return (
    <Pad
      className="thin-scroll"
      style={{
        overflowY: "auto",
        gap: "2px",
        background: "var(--panel-2)",
        padding: isMobile ? "12px 14px" : "clamp(14px, 1.8vw, 22px)",
      }}
    >
      <Label style={{ marginBottom: isMobile ? "8px" : "12px" }}>Experience</Label>
      {profile.experience.map((e, i) => (
        <div
          key={e.role}
          style={{
            padding: isMobile ? "10px 0" : "14px 0",
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
            <div
              style={{
                fontWeight: 650,
                fontSize: isMobile ? "0.8rem" : "0.88rem",
                lineHeight: 1.35,
              }}
            >
              {e.role}
            </div>
            <span
              style={{
                fontSize: "0.62rem",
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
              fontSize: isMobile ? "0.7rem" : "0.74rem",
              color: "var(--muted)",
              marginTop: "4px",
              lineHeight: 1.4,
            }}
          >
            {e.org}
          </div>
        </div>
      ))}
    </Pad>
  );
}
