import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder, AppIconBox } from "../ui.jsx";
import { ArrowIcon } from "../icons.jsx";
import { useIsMobile } from "../../hooks.js";

/* B: big intro */
export function B({ goTo }) {
  const isMobile = useIsMobile();

  return (
    <Pad
      style={{
        justifyContent: "space-between",
        ...(isMobile ? { gap: "14px", padding: "18px 16px" } : null),
      }}
    >
      <Label style={{ fontSize: "clamp(0.62rem, 0.8vw, 0.82rem)" }}>
        Full-stack engineer · {profile.location}
      </Label>
      <div>
        <h1
          style={{
            fontSize: isMobile
              ? "clamp(1.85rem, 9vw, 2.6rem)"
              : "clamp(2.2rem, 5.2vw, 5.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          {profile.name.split(" ")[0]}
          {isMobile ? " " : <br />}
          <span style={{ color: "var(--muted)" }}>
            {profile.name.split(" ").slice(1).join(" ")}.
          </span>
        </h1>
        <p
          style={{
            marginTop: isMobile ? "10px" : "clamp(14px, 2vw, 28px)",
            maxWidth: isMobile ? "50ch" : "58ch",
            fontSize: isMobile
              ? "0.94rem"
              : "clamp(1rem, 1.55vw, 1.42rem)",
            lineHeight: 1.58,
            color: "var(--muted)",
            fontWeight: 450,
          }}
        >
          {profile.intro}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button className="btn-cta" onClick={() => goTo(2)}>
          See the work
          <span className="btn-cta-arrow">
            <ArrowIcon size={15} dir="up-right" />
          </span>
        </button>
        <button className="btn-ghost" onClick={() => goTo(4)}>
          Get in touch
        </button>
      </div>
    </Pad>
  );
}

/* A: portrait. On mobile, shows a small Available chip on the image. */
export function A({ goTo }) {
  const isMobile = useIsMobile();

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <ImageOrPlaceholder src={images.portrait} alt={profile.name} label="portrait" />

      {isMobile ? (
        <button
          onClick={() => goTo?.(4)}
          style={{
            position: "absolute",
            left: "10px",
            bottom: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            borderRadius: "999px",
            padding: "7px 12px 7px 10px",
            fontSize: "0.72rem",
            fontWeight: 650,
            border: "1px solid var(--line)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 0 3px rgba(48,209,88,0.18)",
              flexShrink: 0,
            }}
          />
          Available
        </button>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "14px",
            bottom: "14px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: "12px",
            padding: "8px 14px",
            fontSize: "0.75rem",
            fontWeight: 600,
            border: "1px solid var(--line)",
          }}
        >
          {profile.title}
        </div>
      )}
    </div>
  );
}

/* D: available bento box (desktop only; hidden on mobile) */
export function D({ goTo }) {
  return (
    <button
      onClick={() => goTo(4)}
      className="chip"
      style={{ width: "100%", height: "100%", textAlign: "left" }}
    >
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          justifyContent: "flex-start",
          padding: "clamp(12px, 1.4vw, 18px)",
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "var(--green)",
            boxShadow: "0 0 0 4px rgba(48,209,88,0.15)",
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontWeight: 650,
              fontSize: "clamp(0.8rem, 0.95vw, 0.92rem)",
              lineHeight: 1.25,
            }}
          >
            Available for work
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--muted)", marginTop: "2px" }}>
            Remote · worldwide
          </div>
        </div>
        <span style={{ color: "var(--muted)", flexShrink: 0 }}>
          <ArrowIcon size={15} />
        </span>
      </Pad>
    </button>
  );
}

/* F / G / H / E: social bento boxes */
export function F() {
  return <AppIconBox name="github" url={profile.socials.github} bare />;
}
export function G() {
  return <AppIconBox name="linkedin" url={profile.socials.linkedin} bare />;
}
export function H() {
  return <AppIconBox name="whatsapp" url={profile.socials.whatsapp} bare />;
}
export function E() {
  return <AppIconBox name="gmail" url={profile.socials.gmail} bare />;
}
