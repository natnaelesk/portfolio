import { motion, AnimatePresence } from "framer-motion";
import HeroContent from "./sections/HeroContent.jsx";
import AboutContent from "./sections/AboutContent.jsx";
import ProjectsContent from "./sections/ProjectsContent.jsx";
import SkillsContent from "./sections/SkillsContent.jsx";
import ContactContent from "./sections/ContactContent.jsx";

/*
 * The five persistent boxes (A-E) morph between sections: same DOM nodes,
 * new grid placement each section, framer-motion `layout` animates the move.
 *
 * Placement format: [colStart, colEnd, rowStart, rowEnd] on a 12x8 grid.
 * null = box hidden in that section.
 */
const LAYOUTS = [
  // 0 — Hero
  {
    A: [8, 13, 1, 9], // portrait
    B: [1, 8, 1, 6], // big intro
    C: [1, 5, 6, 9], // socials
    D: [5, 8, 6, 9], // availability
    E: null,
  },
  // 1 — About
  {
    A: [1, 5, 3, 9], // portrait (smaller)
    B: [1, 13, 1, 3], // heading strip
    C: [5, 13, 3, 7], // about text
    D: [5, 9, 7, 9], // stats
    E: [9, 13, 7, 9], // experience
  },
  // 2 — Projects
  {
    A: null,
    B: [1, 13, 1, 3], // heading + filters
    C: [1, 13, 3, 9], // project list
    D: null,
    E: null,
  },
  // 3 — Skills & Services
  {
    A: null,
    B: [1, 13, 1, 3], // heading strip
    C: [1, 8, 3, 9], // skills
    D: [8, 13, 3, 7], // services
    E: [8, 13, 7, 9], // note
    },
  // 4 — Contact
  {
    A: [8, 13, 1, 9], // form
    B: [1, 8, 1, 6], // big CTA
    C: [1, 8, 6, 9], // contact details
    D: null,
    E: null,
  },
];

const SPRING = { type: "spring", stiffness: 170, damping: 24, mass: 0.9 };

function Box({ id, section, children, flat }) {
  const place = LAYOUTS[section][id];
  const visible = !!place;

  return (
    <motion.div
      layout
      transition={SPRING}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.92,
      }}
      style={{
        gridColumn: place ? `${place[0]} / ${place[1]}` : "1 / 2",
        gridRow: place ? `${place[2]} / ${place[3]}` : "1 / 2",
        background: flat ? "transparent" : "var(--panel)",
        border: flat ? "none" : "1px solid var(--line)",
        borderRadius: "var(--radius)",
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          style={{ height: "100%", minHeight: 0 }}
        >
          {visible ? children : null}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function BentoGrid({ section, goTo }) {
  const content = {
    0: HeroContent,
    1: AboutContent,
    2: ProjectsContent,
    3: SkillsContent,
    4: ContactContent,
  }[section];

  const C = content;

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        gap: "13px",
        padding: "64px 56px 40px 26px",
      }}
    >
      <Box id="B" section={section}>
        <C.B goTo={goTo} />
      </Box>
      <Box id="A" section={section}>
        <C.A goTo={goTo} />
      </Box>
      <Box id="C" section={section}>
        <C.C goTo={goTo} />
      </Box>
      <Box id="D" section={section}>
        <C.D goTo={goTo} />
      </Box>
      <Box id="E" section={section}>
        <C.E goTo={goTo} />
      </Box>
    </div>
  );
}
