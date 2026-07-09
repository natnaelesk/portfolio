import { useState } from "react";
import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import { Pad, Label } from "../ui.jsx";

function B() {
  return (
    <Pad style={{ justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
          }}
        />
        <Label>{profile.availabilityNote}</Label>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(2rem, 4.6vw, 4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        Let&apos;s build
        <br />
        <span style={{ color: "var(--muted)" }}>something great</span>
        <span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label>Usually replies within a day</Label>
    </Pad>
  );
}

function A() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Opportunity — from ${state.name || "your portfolio"}`);
    const body = encodeURIComponent(`${state.message}\n\n— ${state.name} (${state.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = {
    background: "var(--panel-2)",
    border: "1px solid var(--line)",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "0.88rem",
    width: "100%",
  };

  return (
    <Pad style={{ justifyContent: "center", gap: "12px" }}>
      <Label>Send a message</Label>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          style={field}
          placeholder="Your name"
          value={state.name}
          required
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <input
          style={field}
          type="email"
          placeholder="Your email"
          value={state.email}
          required
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <textarea
          style={{ ...field, resize: "none", minHeight: "110px" }}
          placeholder="What are we building?"
          value={state.message}
          required
          onChange={(e) => setState({ ...state, message: e.target.value })}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          style={{
            padding: "13px",
            borderRadius: "12px",
            background: "var(--accent)",
            color: "#0a0a0c",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          {sent ? "Opening your mail app…" : "Send it →"}
        </motion.button>
      </form>
    </Pad>
  );
}

function C() {
  return (
    <Pad style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
      <div>
        <Label>Email</Label>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)", marginTop: "4px" }}>
          {profile.email}
        </div>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        {Object.entries(profile.socials).map(([name, url]) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {name} ↗
          </a>
        ))}
      </div>
    </Pad>
  );
}

function D() { return null; }
function E() { return null; }

export default { A, B, C, D, E };
