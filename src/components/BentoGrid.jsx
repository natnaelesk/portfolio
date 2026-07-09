import { motion, AnimatePresence } from "framer-motion";
import * as Hero from "./sections/HeroContent.jsx";
import * as About from "./sections/AboutContent.jsx";
import * as Projects from "./sections/ProjectsContent.jsx";
import * as Skills from "./sections/SkillsContent.jsx";
import * as Contact from "./sections/ContactContent.jsx";

/*
 * Eight persistent boxes (A-H) morph between sections: same DOM nodes,
 * new grid placement each section, framer-motion `layout` animates the move.
 *
 * Placement format: [colStart, colEnd, rowStart, rowEnd] on a 12x8 grid.
 * null = box hidden in that section.
 */
const LAYOUTS = [
  // 0 — Hero
  {
    B: [1, 8, 1, 6], // big intro
    A: [8, 13, 1, 7], // portrait
    D: [8, 13, 7, 9], // availability strip
    F: [1, 3, 6, 9], // GitHub
    G: [3, 5, 6, 9], // LinkedIn
    H: [5, 8, 6, 9], // Upwork
    C: null,
    E: null,
  },
  // 1 — About
  {
    B: [1, 13, 1, 3], // heading strip
    A: [1, 4, 3, 9], // portrait
    C: [4, 9, 3, 7], // story
    E: [9, 13, 3, 7], // experience
    D: [4, 7, 7, 9], // stat 1
    F: [7, 10, 7, 9], // stat 2
    G: [10, 13, 7, 9], // stat 3
    H: null,
  },
  // 2 — Projects
  {
    B: [1, 4, 1, 3], // heading
    D: [4, 6, 1, 3], // filter: all
    F: [6, 8, 1, 3], // filter: personal
    G: [8, 10, 1, 3], // filter: production
    H: [10, 13, 1, 3], // filter: stacks
    C: [1, 13, 3, 9], // carousel wrapper
    A: null,
    E: null,
  },
  // 3 — Skills & Services
  {
    B: [1, 13, 1, 3], // heading strip
    C: [1, 4, 3, 6], // frontend
    D: [4, 7, 3, 6], // backend
    F: [7, 10, 3, 6], // ai/ml
    G: [10, 13, 3, 6], // data & infra
    E: [1, 8, 6, 9], // services
    H: [8, 13, 6, 9], // note / how I ship
    A: null,
  },
  // 4 — Contact
  {
    B: [1, 8, 1, 6], // big CTA
    A: [8, 13, 1, 9], // form
    C: [1, 8, 6, 7], // email strip
    F: [1, 3, 7, 9], // GitHub
    G: [3, 5, 7, 9], // LinkedIn
    H: [5, 8, 7, 9], // Upwork
    D: null,
    E: null,
  },
];

// Softer, heavier spring = calmer, smoother morphs.
const SPRING = { type: "spring", stiffness: 120, damping: 26, mass: 1 };

function Box({ id, section, children }) {
  const place = LAYOUTS[section][id];
  const visible = !!place;

  return (
    <motion.div
      layout
      transition={SPRING}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.95,
      }}
      style={{
        gridColumn: place ? `${place[0]} / ${place[1]}` : "1 / 2",
        gridRow: place ? `${place[2]} / ${place[3]}` : "1 / 2",
        background: "var(--panel)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        position: "relative",
        pointerEvents: visible ? "auto" : "none",
        zIndex: visible ? 1 : 0,
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{ height: "100%", minHeight: 0 }}
        >
          {visible ? children : null}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const BOX_IDS = ["B", "A", "C", "D", "E", "F", "G", "H"];

export default function BentoGrid({ section, goTo }) {
  const C = [Hero, About, Projects, Skills, Contact][section];

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        gap: "12px",
        padding: "62px 52px 34px 26px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {BOX_IDS.map((id) => {
        const Content = C[id];
        return (
          <Box key={id} id={id} section={section}>
            {Content ? <Content goTo={goTo} /> : null}
          </Box>
        );
      })}
    </div>
  );
}
