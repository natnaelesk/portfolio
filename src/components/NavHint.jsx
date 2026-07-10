import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../motion.js";

const STORAGE_KEY = "portfolio-nav-hint-seen";

function KeyCap({ label, active, delay = 0 }) {
  return (
    <motion.div
      className="nav-hint-key"
      animate={{
        y: active ? -4 : 0,
        boxShadow: active
          ? "0 8px 20px rgba(0, 113, 227, 0.35), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
        borderColor: active ? "rgba(0, 113, 227, 0.45)" : "var(--line)",
        color: active ? "var(--accent)" : "var(--text)",
      }}
      transition={{
        duration: 0.35,
        ease: EASE,
        delay,
      }}
    >
      {label}
    </motion.div>
  );
}

export default function NavHint({ onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("down");

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    onDismiss?.();
  }, [onDismiss]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }

    const showTimer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const pulse = setInterval(() => {
      setActiveKey((k) => (k === "down" ? "up" : "down"));
    }, 1400);

    const autoHide = setTimeout(dismiss, 12000);

    const onInteract = () => dismiss();
    window.addEventListener("wheel", onInteract, { passive: true, once: true });
    window.addEventListener("keydown", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { passive: true, once: true });

    return () => {
      clearInterval(pulse);
      clearTimeout(autoHide);
      window.removeEventListener("wheel", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="nav-hint"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="nav-hint-body">
            <div className="nav-hint-keys" aria-hidden="true">
              <div className="nav-hint-keyboard">
                <KeyCap label="↑" active={activeKey === "up"} />
                <KeyCap label="↓" active={activeKey === "down"} delay={0.05} />
              </div>
              <motion.div
                className="nav-hint-key-glow"
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="nav-hint-copy">
              <p className="nav-hint-title">Navigate smoothly</p>
              <p className="nav-hint-text">
                Use the <strong>arrow keys</strong> up and down to move between
                sections one at a time.
              </p>
            </div>

            <button type="button" className="nav-hint-dismiss" onClick={dismiss}>
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
