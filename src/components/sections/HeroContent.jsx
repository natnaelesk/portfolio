import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";

function A() {
  return <ImageOrPlaceholder src={images.portrait} alt={profile.name} label="portrait" />;
}

function B() {
  return (
    <Pad style={{ justifyContent: "space-between" }}>
      <Label>{profile.title}</Label>
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(2.2rem, 5.2vw, 4.6rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
          }}
        >
          {profile.name.split(" ")[0]}
          <br />
          <span style={{ color: "var(--muted)" }}>{profile.name.split(" ")[1]}</span>
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            marginTop: "18px",
            maxWidth: "42ch",
            color: "var(--muted)",
            fontSize: "clamp(0.85rem, 1.2vw, 1.02rem)",
            lineHeight: 1.65,
          }}
        >
          {profile.intro}
        </p>
      </div>
      <Label>{profile.location}</Label>
    </Pad>
  );
}

function C() {
  const links = [
    ["GitHub", profile.socials.github],
    ["LinkedIn", profile.socials.linkedin],
    ["Upwork", profile.socials.upwork],
  ];
  return (
    <Pad style={{ justifyContent: "space-between" }}>
      <Label>Find me</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {links.map(([name, url]) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "var(--accent)", fontSize: "0.8em" }}>↗</span>
            {name}
          </a>
        ))}
      </div>
    </Pad>
  );
}

function D({ goTo }) {
  return (
    <Pad style={{ justifyContent: "space-between", background: "var(--accent-dim)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
          }}
        />
        <Label>Available for work</Label>
      </div>
      <button
        onClick={() => goTo(4)}
        style={{
          textAlign: "left",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
          fontWeight: 500,
          color: "var(--text)",
        }}
      >
        Let&apos;s build something
        <span style={{ color: "var(--accent)" }}> →</span>
      </button>
    </Pad>
  );
}

function E() {
  return null;
}

export default { A, B, C, D, E };
