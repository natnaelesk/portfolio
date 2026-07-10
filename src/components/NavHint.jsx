import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../motion.js";

function KeyCap({ label, flash = false, delay = 0 }) {
  return (
    <motion.div
      className={`nav-hint-key ${flash ? "nav-hint-key--flash" : ""}`}
      animate={
        flash
          ? {
              boxShadow: [
                "0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
                "0 8px 22px rgba(0, 113, 227, 0.45), inset 0 1px 0 rgba(255,255,255,0.95)",
                "0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
              ],
              borderColor: [
                "var(--line)",
                "rgba(0, 113, 227, 0.65)",
                "var(--line)",
              ],
              color: ["var(--text)", "var(--accent)", "var(--text)"],
              y: [0, -3, 0],
            }
          : undefined
      }
      transition={
        flash
          ? { duration: 1.1, repeat: Infinity, ease: "easeInOut", delay }
          : undefined
      }
    >
      {label}
    </motion.div>
  );
}

function ArrowKeyboard() {
  return (
    <div className="nav-hint-keyboard nav-hint-keyboard--cross" aria-hidden="true">
      <div className="nav-hint-key-row nav-hint-key-row--top">
        <KeyCap label="↑" flash delay={0} />
      </div>
      <div className="nav-hint-key-row nav-hint-key-row--middle">
        <KeyCap label="←" />
        <KeyCap label="↓" flash delay={0.55} />
        <KeyCap label="→" />
      </div>
      <motion.div
        className="nav-hint-key-glow"
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function NavHint({ trigger = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setVisible(true);
    const hide = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(hide);
  }, [trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="nav-hint nav-hint--toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="nav-hint-body">
            <div className="nav-hint-keys">
              <ArrowKeyboard />
            </div>

            <div className="nav-hint-copy">
              <p className="nav-hint-title">Use arrow keys to navigate</p>
              <p className="nav-hint-text">
                Scrolling the main page is off. Press <strong>↑</strong> or{" "}
                <strong>↓</strong> to move between sections, or slide the navigator.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
