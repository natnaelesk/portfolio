import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import BentoGrid from "./BentoGrid.jsx";
import Beams from "./Beams.jsx";
import NavHint from "./NavHint.jsx";
import { useIsMobile } from "../hooks.js";
import { useSectionNav } from "../useSectionNav.js";

export const SECTIONS = ["Home", "About", "Projects", "Skills", "Contact"];

export default function Scene() {
  const isMobile = useIsMobile();
  const { section, jumpTo } = useSectionNav(SECTIONS.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      style={{ height: "100%", position: "relative" }}
    >
      <Beams />

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
          onClick={() => jumpTo(0)}
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

      <nav className="side-nav" aria-label="Sections">
        {SECTIONS.map((name, i) => (
          <button
            key={name}
            onClick={() => jumpTo(i)}
            title={name}
            aria-label={name}
            className={section === i ? "active" : ""}
          >
            <span className="pip" />
          </button>
        ))}
      </nav>

      <BentoGrid section={section} goTo={jumpTo} />

      <NavHint />
    </motion.div>
  );
}
