import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BentoGrid from "./BentoGrid.jsx";
import Beams from "./Beams.jsx";
import { useIsMobile } from "../hooks.js";

export const SECTIONS = ["Home", "About", "Projects", "Skills", "Contact"];

// Scroll faster -> shorter cooldown -> sections change faster.
const BASE_COOLDOWN = 650;
const MIN_COOLDOWN = 220;

export default function Scene() {
  const [section, setSection] = useState(0);
  const lastMove = useRef(0);
  const wheelAccum = useRef(0);
  const touchStartY = useRef(null);
  const isMobile = useIsMobile();

  const go = useCallback((dir, intensity = 1) => {
    const now = performance.now();
    const cooldown = Math.max(MIN_COOLDOWN, BASE_COOLDOWN / intensity);
    if (now - lastMove.current < cooldown) return;
    setSection((s) => {
      const next = Math.min(SECTIONS.length - 1, Math.max(0, s + dir));
      if (next !== s) lastMove.current = now;
      return next;
    });
  }, []);

  useEffect(() => {
    const insideScrollable = (target) =>
      target?.closest?.(".thin-scroll") || target?.closest?.(".no-scrollbar");

    const onWheel = (e) => {
      wheelAccum.current += e.deltaY;
      const intensity = Math.min(3, Math.abs(e.deltaY) / 60);
      if (Math.abs(wheelAccum.current) > 60) {
        go(wheelAccum.current > 0 ? 1 : -1, intensity);
        wheelAccum.current = 0;
      }
    };
    const onKey = (e) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) go(1, 2);
      if (["ArrowUp", "PageUp"].includes(e.key)) go(-1, 2);
    };
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchStartY.current === null) return;
      if (insideScrollable(e.target)) return;
      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dy) > 55) {
        go(dy > 0 ? 1 : -1, 2);
        touchStartY.current = e.touches[0].clientY;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [go]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      style={{ height: "100%", position: "relative" }}
    >
      <Beams />

      {/* top chrome */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "14px 16px" : "18px 26px",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <button
          onClick={() => setSection(0)}
          style={{
            fontWeight: 700,
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
            pointerEvents: "auto",
          }}
        >
          N<span style={{ color: "var(--accent)" }}>.</span>
        </button>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "var(--muted)",
          }}
        >
          {String(section + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </div>
      </header>

      {/* side navigator */}
      <nav className="side-nav" aria-label="Sections">
        {SECTIONS.map((name, i) => (
          <button
            key={name}
            onClick={() => setSection(i)}
            title={name}
            aria-label={name}
            className={section === i ? "active" : ""}
          >
            <span className="pip" />
          </button>
        ))}
      </nav>

      <BentoGrid section={section} goTo={setSection} />

      {/* scroll hint (desktop only, bottom nav lives there on mobile) */}
      {!isMobile && (
        <motion.div
          animate={{ opacity: section === 0 ? 1 : 0 }}
          style={{
            position: "fixed",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 600,
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--muted)",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{ display: "inline-block" }}
          >
            scroll ↓
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}
