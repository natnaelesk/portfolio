import { useEffect } from "react";
import { motion } from "framer-motion";
import profile from "../data/profile.json";

const letters = profile.shortName.split("");

export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        zIndex: 100,
      }}
    >
      <div style={{ overflow: "hidden", display: "flex" }}>
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.15 + i * 0.045,
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              whiteSpace: "pre",
              color: ch === "." ? "var(--accent)" : "var(--text)",
            }}
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            fontWeight: 600,
            color: "var(--accent)",
          }}
        >
          .
        </motion.span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          width: "min(320px, 60vw)",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
          transformOrigin: "left",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {profile.title} — {profile.location.split(",")[0]}
      </motion.p>
    </motion.div>
  );
}
