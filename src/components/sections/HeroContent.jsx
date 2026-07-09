import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder, AppIconBox } from "../ui.jsx";
import { ArrowIcon } from "../icons.jsx";

/* B: big intro (tall) */
export function B({ goTo }) {
  return (
    <Pad style={{ justifyContent: "space-between" }}>
      <Label style={{ fontSize: "clamp(0.68rem, 0.8vw, 0.82rem)" }}>
        Full-stack engineer · {profile.location}
      </Label>
      <div>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5.2vw, 5.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.03,
          }}
        >
          {profile.name.split(" ")[0]}
          <br />
          <span style={{ color: "var(--muted)" }}>
            {profile.name.split(" ").slice(1).join(" ")}.
          </span>
        </h1>
        <p
          style={{
            marginTop: "clamp(14px, 2vw, 28px)",
            maxWidth: "50ch",
            fontSize: "clamp(0.95rem, 1.45vw, 1.32rem)",
            lineHeight: 1.55,
            color: "var(--muted)",
            fontWeight: 450,
          }}
        >
          {profile.intro}
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn-cta" onClick={() => goTo(2)}>
          See the work
          <span className="btn-cta-arrow">
            <ArrowIcon size={15} dir="right" />
          </span>
        </button>
        <button className="btn-ghost" onClick={() => goTo(4)}>
          Get in touch
        </button>
      </div>
    </Pad>
  );
}

/* A: portrait, stretches with the screen */
export function A() {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <ImageOrPlaceholder src={images.portrait} alt={profile.name} label="portrait" />
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
    </div>
  );
}

/* D: availability strip (capped height, never stretches) */
export function D({ goTo }) {
  return (
    <button onClick={() => goTo(4)} style={{ width: "100%", height: "100%", textAlign: "left" }}>
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          justifyContent: "flex-start",
          padding: "clamp(10px, 1.2vw, 16px) clamp(14px, 1.8vw, 22px)",
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--green)",
            boxShadow: "0 0 0 5px rgba(48,209,88,0.15)",
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 650, fontSize: "clamp(0.82rem, 1vw, 0.95rem)" }}>
            Available for work
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "1px" }}>
            Remote · worldwide
          </div>
        </div>
        <span style={{ marginLeft: "auto", color: "var(--muted)", flexShrink: 0 }}>
          <ArrowIcon size={16} />
        </span>
      </Pad>
    </button>
  );
}

/* F / G / H / E: social links as small iOS-style app icons */
export function F() {
  return <AppIconBox name="github" url={profile.socials.github} />;
}
export function G() {
  return <AppIconBox name="linkedin" url={profile.socials.linkedin} />;
}
export function H() {
  return <AppIconBox name="instagram" url={profile.socials.instagram} />;
}
export function E() {
  return <AppIconBox name="telegram" url={profile.socials.telegram} />;
}
