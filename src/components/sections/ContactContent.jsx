import { useState } from "react";
import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import { Pad, Label, AppIconBox } from "../ui.jsx";
import { MailIcon } from "../icons.jsx";

/* B — big CTA */
export function B() {
  return (
    <Pad style={{ justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <motion.span
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--green)",
            boxShadow: "0 0 0 5px rgba(48,209,88,0.15)",
          }}
        />
        <Label style={{ color: "var(--text)" }}>Open to opportunities</Label>
      </div>
      <div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3.8vw, 3.6rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          Let&rsquo;s build
          <br />
          <span style={{ color: "var(--muted)" }}>something real.</span>
        </h2>
        <p
          style={{
            marginTop: "14px",
            maxWidth: "44ch",
            color: "var(--muted)",
            fontSize: "clamp(0.85rem, 1.15vw, 1.02rem)",
            lineHeight: 1.55,
            fontWeight: 450,
          }}
        >
          {profile.availabilityNote}
        </p>
      </div>
      <Label>{profile.location} · Remote worldwide</Label>
    </Pad>
  );
}

/* A — message form -> mailto */
export function A() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${name || "hello"}`);
    const body = encodeURIComponent(
      `${msg}\n\n—\n${name}${email ? `\n${email}` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field = {
    background: "var(--panel-2)",
    border: "1px solid var(--line)",
    borderRadius: "14px",
    padding: "13px 16px",
    fontSize: "0.88rem",
    width: "100%",
    color: "var(--text)",
  };

  return (
    <Pad>
      <form
        onSubmit={send}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Label>Send a message</Label>
        <input
          style={field}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={field}
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          style={{ ...field, flex: 1, resize: "none", minHeight: 0 }}
          placeholder="What are we building?"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className="btn-primary"
          type="submit"
          style={{ width: "100%", padding: "14px", fontSize: "0.92rem" }}
        >
          Send it →
        </button>
      </form>
    </Pad>
  );
}

/* C — email in its own horizontal strip */
export function C() {
  return (
    <a href={`mailto:${profile.email}`} style={{ display: "block", height: "100%" }}>
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "14px",
          justifyContent: "flex-start",
        }}
      >
        <span
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "var(--accent-dim)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <MailIcon size={19} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 650,
              fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {profile.email}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "2px" }}>
            Fastest way to reach me
          </div>
        </div>
      </Pad>
    </a>
  );
}

/* F / G / H — social links as small iOS-style app icons */
export function F() {
  return <AppIconBox name="github" url={profile.socials.github} />;
}
export function G() {
  return <AppIconBox name="linkedin" url={profile.socials.linkedin} />;
}
export function H() {
  return <AppIconBox name="upwork" url={profile.socials.upwork} />;
}
