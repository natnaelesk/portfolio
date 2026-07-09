import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";
import { GitHubIcon, LinkedInIcon, UpworkIcon, ArrowIcon } from "../icons.jsx";

/* B — big intro */
export function B({ goTo }) {
  return (
    <Pad style={{ justifyContent: "space-between" }}>
      <Label>Full-stack engineer — {profile.location}</Label>
      <div>
        <h1
          style={{
            fontSize: "clamp(2.1rem, 4.6vw, 4.4rem)",
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
            marginTop: "clamp(12px, 1.6vw, 22px)",
            maxWidth: "46ch",
            fontSize: "clamp(0.9rem, 1.25vw, 1.12rem)",
            lineHeight: 1.55,
            color: "var(--muted)",
            fontWeight: 450,
          }}
        >
          {profile.intro}
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() => goTo(2)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--accent)",
            color: "#fff",
            padding: "11px 20px",
            borderRadius: "999px",
            fontSize: "0.88rem",
            fontWeight: 600,
          }}
        >
          See the work <ArrowIcon size={15} />
        </button>
        <button
          onClick={() => goTo(4)}
          style={{
            padding: "11px 20px",
            borderRadius: "999px",
            fontSize: "0.88rem",
            fontWeight: 600,
            border: "1px solid var(--line)",
            background: "var(--panel-solid)",
            color: "var(--text)",
          }}
        >
          Get in touch
        </button>
      </div>
    </Pad>
  );
}

/* A — portrait */
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

/* D — availability strip (horizontal) */
export function D({ goTo }) {
  return (
    <button onClick={() => goTo(4)} style={{ width: "100%", height: "100%", textAlign: "left" }}>
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "14px",
          justifyContent: "flex-start",
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
        <div>
          <div style={{ fontWeight: 650, fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}>
            Available for work
          </div>
          <div style={{ fontSize: "0.74rem", color: "var(--muted)", marginTop: "2px" }}>
            Remote · worldwide
          </div>
        </div>
        <span style={{ marginLeft: "auto", color: "var(--muted)" }}>
          <ArrowIcon size={16} />
        </span>
      </Pad>
    </button>
  );
}

/* Social link boxes — each one a full box, filled with the brand mark. */
function SocialBox({ href, icon, name, tint }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.02 }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        color: tint,
      }}
    >
      <span style={{ transform: "scale(1.9)" }}>{icon}</span>
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {name}
      </span>
    </motion.a>
  );
}

export function F() {
  return (
    <SocialBox
      href={profile.socials.github}
      icon={<GitHubIcon size={26} />}
      name="GitHub"
      tint="#1d1d1f"
    />
  );
}

export function G() {
  return (
    <SocialBox
      href={profile.socials.linkedin}
      icon={<LinkedInIcon size={26} />}
      name="LinkedIn"
      tint="#0a66c2"
    />
  );
}

export function H() {
  return (
    <SocialBox
      href={profile.socials.upwork}
      icon={<UpworkIcon size={26} />}
      name="Upwork"
      tint="#14a800"
    />
  );
}
