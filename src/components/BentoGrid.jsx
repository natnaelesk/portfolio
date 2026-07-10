import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import * as Hero from "./sections/HeroContent.jsx";
import * as About from "./sections/AboutContent.jsx";
import * as Projects from "./sections/ProjectsContent.jsx";
import * as Skills from "./sections/SkillsContent.jsx";
import * as Contact from "./sections/ContactContent.jsx";
import { useIsMobile } from "../hooks.js";
import { BENTO_SPRING, CONTENT_TRANSITION, EASE } from "../motion.js";

/*
 * Eight persistent boxes (A-H) morph between sections: same DOM nodes,
 * new grid placement each section, framer-motion `layout` animates the move.
 *
 * Placement format: [colStart, colEnd, rowStart, rowEnd] on a 12x8 grid,
 * or { place: [...], style: {...} } for boxes that need size overrides.
 * null = box hidden in that section.
 */

// bottom-row bento cells: stretch to fill the grid row evenly
const FOOTER = {
  alignSelf: "stretch",
  minWidth: 0,
  minHeight: 0,
};

const LAYOUTS = [
  // 0 Hero
  // intro 8 cols, portrait 4 cols; 4 equal social boxes under intro, available under portrait
  {
    B: [1, 9, 1, 8], // big intro
    A: [9, 13, 1, 8], // portrait
    F: { place: [1, 3, 8, 9], style: FOOTER }, // GitHub  (equal 2-col)
    G: { place: [3, 5, 8, 9], style: FOOTER }, // LinkedIn (equal 2-col)
    H: { place: [5, 7, 8, 9], style: FOOTER }, // WhatsApp (equal 2-col)
    E: { place: [7, 9, 8, 9], style: FOOTER }, // Gmail    (equal 2-col)
    D: { place: [9, 13, 8, 9], style: FOOTER }, // available = portrait width
    C: null,
  },
  // 1 About
  {
    B: [1, 13, 1, 3], // heading strip + stat chips
    A: [1, 4, 3, 9], // portrait
    C: [4, 9, 3, 9], // story
    E: [9, 13, 3, 9], // experience
    D: null,
    F: null,
    G: null,
    H: null,
  },
  // 2 Projects: title bar, 7 equal stack boxes, carousel
  {
    B: [1, 13, 1, 2],
    H: {
      place: [1, 13, 2, 3],
      style: {
        background: "transparent",
        border: "none",
        boxShadow: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        overflow: "visible",
      },
    },
    C: [1, 13, 3, 9],
    A: null,
    D: null,
    E: null,
    F: null,
    G: null,
  },
  // 3 Skills & Services
  {
    B: [1, 13, 1, 3], // heading strip
    C: [1, 4, 3, 6], // frontend
    D: [4, 7, 3, 6], // backend
    F: [7, 10, 3, 6], // ai/ml
    G: [10, 13, 3, 6], // data & infra
    E: [1, 8, 6, 9], // services
    H: [8, 13, 6, 9], // how I ship
    A: null,
  },
  // 4 Contact
  {
    B: [1, 9, 1, 6], // big CTA
    A: [9, 13, 1, 9], // form
    C: [1, 9, 6, 7], // email strip
    F: { place: [1, 3, 7, 9], style: FOOTER }, // GitHub
    G: { place: [3, 5, 7, 9], style: FOOTER }, // LinkedIn
    H: { place: [5, 7, 7, 9], style: FOOTER }, // WhatsApp
    E: { place: [7, 9, 7, 9], style: FOOTER }, // Gmail
    D: null,
  },
];

// Single-column flow for phones: full-width rows, natural order.
const LAYOUTS_MOBILE = [
  // 0 Hero: image top-left, vertical socials on the right, details below.
  // Available is a chip on the image (D hidden).
  {
    A: [1, 10, 1, 5], // portrait
    F: { place: [10, 13, 1, 2], style: FOOTER }, // GitHub
    G: { place: [10, 13, 2, 3], style: FOOTER }, // LinkedIn
    H: { place: [10, 13, 3, 4], style: FOOTER }, // WhatsApp
    E: { place: [10, 13, 4, 5], style: FOOTER }, // Gmail
    B: [1, 13, 5, 9], // intro details, full width
    D: null,
    C: null,
  },
  // 1 About: story fills most of the screen, short experience below
  // Title lives inside the story card on mobile (B hidden)
  {
    B: null,
    C: [1, 13, 1, 7],
    E: [1, 13, 7, 9],
    A: null,
    D: null,
    F: null,
    G: null,
    H: null,
  },
  // 2 Projects: title, stack filters, vertical list
  {
    B: [1, 13, 1, 2],
    H: [1, 13, 2, 3],
    C: [1, 13, 3, 9],
    A: null,
    D: null,
    E: null,
    F: null,
    G: null,
  },
  // 3 Skills: header + 2x2 skill grid + services
  {
    B: [1, 13, 1, 2],
    C: [1, 7, 2, 5],
    D: [7, 13, 2, 5],
    F: [1, 7, 5, 7],
    G: [7, 13, 5, 7],
    E: [1, 13, 7, 9],
    A: null,
    H: null,
  },
  // 4 Contact: intro, form, social footer
  {
    B: [1, 13, 1, 3],
    A: [1, 13, 3, 7],
    F: { place: [1, 4, 7, 9], style: FOOTER },
    G: { place: [4, 7, 7, 9], style: FOOTER },
    H: { place: [7, 10, 7, 9], style: FOOTER },
    E: { place: [10, 13, 7, 9], style: FOOTER },
    C: null,
    D: null,
  },
];

// Softer spring — smooth morph without bounce or lag.
const SPRING = BENTO_SPRING;

/* Stack filter row (Projects H): container stays put, pills pop in with stagger. */
function boxContentMotion(id, section) {
  if (id === "H" && section === 2) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, transition: { duration: 0.14, ease: EASE } },
      transition: { duration: 0.14 },
    };
  }
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4, transition: { duration: 0.14, ease: EASE } },
    transition: CONTENT_TRANSITION,
  };
}

function Box({ id, section, layouts, children }) {
  const entry = layouts[section][id];
  const place = Array.isArray(entry) ? entry : entry?.place;
  const override = Array.isArray(entry) ? undefined : entry?.style;
  const visible = !!place;

  return (
    <motion.div
      layout
      transition={SPRING}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.97,
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
        willChange: "transform, opacity",
        ...override,
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        {visible && (
          <motion.div
            key={section}
            {...boxContentMotion(id, section)}
            style={{ height: "100%", minHeight: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const BOX_IDS = ["B", "A", "C", "D", "E", "F", "G", "H"];

export default function BentoGrid({ section, goTo }) {
  const isMobile = useIsMobile();
  const layouts = isMobile ? LAYOUTS_MOBILE : LAYOUTS;
  const C = [Hero, About, Projects, Skills, Contact][section];

  return (
    <LayoutGroup id="bento">
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(8, 1fr)",
          gap: "var(--bento-gap)",
          padding: isMobile
            ? "44px 12px 48px 12px"
            : "clamp(54px, 7vh, 66px) clamp(38px, 4vw, 56px) clamp(16px, 3vh, 34px) clamp(14px, 2vw, 28px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {BOX_IDS.map((id) => {
          const Content = C[id];
          return (
            <Box key={id} id={id} section={section} layouts={layouts}>
              {Content ? <Content goTo={goTo} /> : null}
            </Box>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
