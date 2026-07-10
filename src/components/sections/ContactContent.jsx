import { useState } from "react";
import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import { Pad, Label, AppIconBox } from "../ui.jsx";
import { MailIcon, ArrowIcon } from "../icons.jsx";
import { useIsMobile } from "../../hooks.js";

/* B: intro CTA — mobile is a slim strip; desktop keeps the big CTA */
export function B() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: "10px 12px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginBottom: "4px",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 0 3px rgba(48,209,88,0.15)",
                flexShrink: 0,
              }}
            />
            <Label style={{ color: "var(--text)", fontSize: "0.58rem", letterSpacing: "0.1em" }}>
              Open to work
            </Label>
          </div>
          <h2
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Let&rsquo;s build{" "}
            <span style={{ color: "var(--muted)" }}>something real.</span>
          </h2>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="btn-ghost"
          style={{
            flexShrink: 0,
            padding: "8px 12px",
            fontSize: "0.72rem",
            borderRadius: "12px",
          }}
        >
          Email
        </a>
      </Pad>
    );
  }

  return (
    <Pad style={{ justifyContent: "space-between", padding: "clamp(14px, 2vw, 26px)" }}>
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

function ContactForm() {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "your site"}`);
    const body = encodeURIComponent(
      `${msg}\n\n${name}${email ? `\n${email}` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field = {
    background: "var(--panel-2)",
    border: "1px solid var(--line)",
    borderRadius: isMobile ? "12px" : "14px",
    padding: isMobile ? "12px 13px" : "13px 16px",
    fontSize: isMobile ? "0.88rem" : "0.88rem",
    width: "100%",
    color: "var(--text)",
  };

  return (
    <Pad
      style={{
        padding: isMobile ? "12px" : "clamp(14px, 2vw, 26px)",
      }}
    >
      <form
        onSubmit={send}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "10px" : "12px",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <Label>Send a message</Label>
          {isMobile && (
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--muted)",
                fontWeight: 450,
                lineHeight: 1.3,
                textAlign: "right",
              }}
            >
              {profile.location}
            </span>
          )}
        </div>
        <input
          style={field}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          style={field}
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <textarea
          style={{
            ...field,
            flex: 1,
            resize: "none",
            minHeight: isMobile ? "88px" : 0,
          }}
          placeholder="What are we building?"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className="btn-cta"
          type="submit"
          style={{
            width: "100%",
            justifyContent: "space-between",
            fontSize: isMobile ? "0.88rem" : "0.92rem",
            padding: isMobile ? "7px 7px 7px 16px" : undefined,
            flexShrink: 0,
          }}
        >
          Send it
          <span
            className="btn-cta-arrow"
            style={isMobile ? { width: 32, height: 32, borderRadius: 9 } : undefined}
          >
            {isMobile ? <ArrowIcon size={14} dir="up-right" /> : "↗"}
          </span>
        </button>
      </form>
    </Pad>
  );
}

/* A: message form */
export function A() {
  return <ContactForm />;
}

/* C: email strip (desktop) */
export function C() {
  return (
    <a href={`mailto:${profile.email}`} style={{ display: "block", height: "100%" }}>
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "14px",
          justifyContent: "flex-start",
          padding: "clamp(14px, 2vw, 26px)",
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
