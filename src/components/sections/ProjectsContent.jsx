import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/projects.json";
import images from "../../data/images.json";
import { Pad, Label, BrowserMockup, PhoneMockup } from "../ui.jsx";
import {
  GitHubIcon,
  GlobeIcon,
  AppStoreBadge,
  GooglePlayBadge,
  ArrowIcon,
} from "../icons.jsx";
import { useIsMobile } from "../../hooks.js";
import { canScrollX } from "../../scrollBoundaries.js";
import { EASE, SLIDE_SPRING } from "../../motion.js";

/* ---- tiny shared store so the filter boxes (D/F/G/H) and the
   carousel (C): separate bento boxes: stay in sync ---- */
let filter = { type: "all", stack: null };
const listeners = new Set();
function setFilter(patch) {
  filter = { ...filter, ...patch };
  listeners.forEach((l) => l());
}
function useFilter() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => filter
  );
}

const STACKS = ["Full Stack", "Web", "Mobile", "AI", "Backend", "Frontend", "Automation"];

const stackPillContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.18,
    },
  },
};

const stackPillItem = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { duration: 0.28, ease: EASE },
      x: SLIDE_SPRING,
    },
  },
};

const projectsTitleMotion = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { duration: 0.28, ease: EASE },
      x: { ...SLIDE_SPRING, delay: 0.12 },
    },
  },
};

const carouselTrackMotion = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.28, delay: 0.16 },
  },
};

const projectCardVariants = {
  hidden: (i) => ({ opacity: 0, x: -48 - i * 8 }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      opacity: { duration: 0.32, ease: EASE, delay: 0.2 + i * 0.045 },
      x: { ...SLIDE_SPRING, delay: 0.2 + i * 0.045 },
    },
  }),
};

const TYPES = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal" },
  { value: "production", label: "Production" },
];

function TypePills() {
  const f = useFilter();
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px",
        borderRadius: "999px",
        background: "var(--panel-2)",
        border: "1px solid var(--line)",
        flexShrink: 0,
      }}
    >
      {TYPES.map((t) => {
        const active = f.type === t.value;
        const count =
          t.value === "all"
            ? data.projects.length
            : data.projects.filter((p) => p.type === t.value).length;
        return (
          <button
            key={t.value}
            onClick={() => setFilter({ type: t.value, stack: null })}
            className="chip"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: 650,
              background: active ? "#fff" : "transparent",
              color: active ? "var(--text)" : "var(--muted)",
              border: active ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
            }}
          >
            {t.label}
            <span
              style={{
                fontSize: "0.64rem",
                fontWeight: 600,
                color: active ? "var(--accent)" : "var(--muted)",
                opacity: 0.9,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* B: title + type segment */
export function B() {
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={projectsTitleMotion}
      initial="hidden"
      animate="show"
      style={{ height: "100%", minHeight: 0 }}
    >
      <Pad
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "8px" : "12px",
          padding: isMobile ? "8px 12px" : "10px 18px",
        }}
      >
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", minWidth: 0, flexShrink: 0 }}>
        <h2
          style={{
            fontSize: isMobile ? "1.15rem" : "clamp(1.3rem, 2vw, 1.85rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
          }}
        >
          Projects<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
        {!isMobile && (
          <Label style={{ fontSize: "0.58rem" }}>{data.projects.length} builds</Label>
        )}
      </div>
      <div style={{ minWidth: 0, overflow: "auto" }} className={isMobile ? "no-scrollbar" : undefined}>
        <TypePills />
      </div>
    </Pad>
    </motion.div>
  );
}

export function D() {
  return null;
}
export function F() {
  return null;
}
export function G() {
  return null;
}

/* H: 7 equal stack bento boxes, selected gets accent */
export function H() {
  const f = useFilter();
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={stackPillContainer}
      initial="hidden"
      animate="show"
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: isMobile
          ? "repeat(7, minmax(72px, 1fr))"
          : "repeat(7, 1fr)",
        gap: "var(--bento-gap)",
        overflowX: isMobile ? "auto" : "visible",
        minWidth: 0,
        padding: 0,
      }}
      className={isMobile ? "no-scrollbar" : undefined}
      onWheel={
        isMobile
          ? (e) => {
              const el = e.currentTarget;
              if (canScrollX(el, e.deltaY)) {
                e.preventDefault();
                e.stopPropagation();
                el.scrollLeft += e.deltaY;
              }
            }
          : undefined
      }
    >
      {STACKS.map((s) => {
        const active = f.stack === s;
        return (
          <motion.button
            key={s}
            variants={stackPillItem}
            onClick={() => setFilter({ stack: active ? null : s })}
            className="chip"
            whileHover={{ scale: active ? 1 : 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            style={{
              minWidth: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "0 8px" : "0 6px",
              borderRadius: "calc(var(--radius) - 4px)",
              background: active ? "var(--accent)" : "var(--panel)",
              border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
              boxShadow: active
                ? "0 6px 16px rgba(0, 113, 227, 0.28)"
                : "var(--shadow)",
              color: active ? "#fff" : "var(--text)",
              fontSize: isMobile ? "0.68rem" : "clamp(0.68rem, 0.9vw, 0.8rem)",
              fontWeight: 650,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              backdropFilter: active ? "none" : "blur(24px)",
              WebkitBackdropFilter: active ? "none" : "blur(24px)",
            }}
          >
            {s}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ---- carousel pieces ---- */

function Toggle({ on }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "34px",
          height: "20px",
          borderRadius: "999px",
          background: on ? "var(--green)" : "rgba(0,0,0,0.12)",
          position: "relative",
          transition: "background 0.25s ease",
          flexShrink: 0,
        }}
      >
        <motion.span
          animate={{ x: on ? 15 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            position: "absolute",
            top: "2px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.68rem",
          fontWeight: 650,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: on ? "var(--green)" : "var(--muted)",
        }}
      >
        {on ? "Production" : "Personal"}
      </span>
    </div>
  );
}

function LinkBtn({ href, icon, label, soon, onSoon }) {
  const base = {
    padding: "9px 16px",
    fontSize: "0.78rem",
    whiteSpace: "nowrap",
  };
  if (soon) {
    return (
      <button className="btn-ghost" onClick={onSoon} style={{ ...base, color: "var(--muted)" }}>
        {icon} {label}
      </button>
    );
  }
  return (
    <a className="btn-ghost" href={href} target="_blank" rel="noreferrer" style={base}>
      {icon} {label}
    </a>
  );
}

function StoreBadge({ kind, href, onSoon }) {
  const badge =
    kind === "appstore" ? (
      <AppStoreBadge height={30} />
    ) : (
      <GooglePlayBadge height={30} />
    );

  if (!href) {
    return (
      <button onClick={onSoon} style={{ padding: 0, lineHeight: 0, opacity: 0.92 }}>
        {badge}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ lineHeight: 0, display: "block" }}>
      {badge}
    </a>
  );
}

function ProjectMockStage({ p, shot, onSoon, compact = false, phoneWidth }) {
  const hasMobile = p.categories.includes("Mobile");
  const showApp = p.links.appstore !== null && p.links.appstore !== undefined;
  const showPlay = p.links.playstore !== null && p.links.playstore !== undefined;
  const phoneW = phoneWidth || (compact ? "clamp(88px, 24vw, 118px)" : undefined);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: compact ? "auto" : "100%",
        minHeight: compact ? 0 : 0,
        flex: compact ? "none" : 1,
        display: "flex",
        flexDirection: "column",
        gap: compact && hasMobile ? "10px" : 0,
      }}
    >
      <div
        style={{
          flex: compact ? "none" : 1,
          minHeight: compact ? 0 : 0,
          width: "100%",
          aspectRatio: compact ? "16 / 9" : undefined,
          maxHeight: compact ? "220px" : undefined,
        }}
      >
        <BrowserMockup src={shot} alt={p.title} />
      </div>

      {hasMobile && !compact && (
        <>
          <div
            style={{
              position: "absolute",
              left: "clamp(12px, 1.4vw, 20px)",
              bottom: "clamp(8px, 1.5vh, 18px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              zIndex: 4,
            }}
          >
            {showApp && (
              <StoreBadge kind="appstore" href={p.links.appstore || null} onSoon={onSoon} />
            )}
            <PhoneMockup kind="iphone" src={shot} alt={`${p.title} iOS`} />
          </div>
          <div
            style={{
              position: "absolute",
              right: "clamp(12px, 1.4vw, 20px)",
              bottom: "clamp(8px, 1.5vh, 18px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              zIndex: 4,
            }}
          >
            {showPlay && (
              <StoreBadge kind="playstore" href={p.links.playstore || null} onSoon={onSoon} />
            )}
            <PhoneMockup kind="android" src={shot} alt={`${p.title} Android`} />
          </div>
        </>
      )}

      {hasMobile && compact && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
            {showApp && (
              <StoreBadge kind="appstore" href={p.links.appstore || null} onSoon={onSoon} />
            )}
            <PhoneMockup
              kind="iphone"
              src={shot}
              alt={`${p.title} iOS`}
              width={phoneW}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
            {showPlay && (
              <StoreBadge kind="playstore" href={p.links.playstore || null} onSoon={onSoon} />
            )}
            <PhoneMockup
              kind="android"
              src={shot}
              alt={`${p.title} Android`}
              width={phoneW}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDetailModal({ p, onClose, onSoon }) {
  const shot = images.projects[p.id];
  const isMobile = useIsMobile();
  const hasMobile = p.categories.includes("Mobile");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.classList.add("nav-paused");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.classList.remove("nav-paused");
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      data-scroll-trap
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 20, 22, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : "clamp(16px, 3vw, 32px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 40 : 24, scale: isMobile ? 1 : 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isMobile ? 24 : 16, scale: isMobile ? 1 : 0.98 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="thin-scroll"
        style={{
          width: isMobile ? "100%" : "min(960px, 100%)",
          height: isMobile ? "100%" : "auto",
          maxHeight: isMobile ? "100%" : "min(94vh, 940px)",
          overflowY: "auto",
          overscrollBehavior: "contain",
          background: "#fff",
          border: isMobile ? "none" : "1px solid var(--line)",
          borderRadius: isMobile ? 0 : "24px",
          boxShadow: isMobile ? "none" : "0 24px 64px rgba(0,0,0,0.22)",
          padding: isMobile
            ? "56px 16px 40px"
            : "clamp(18px, 2.5vw, 28px)",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "16px" : "18px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
              <Toggle on={p.type === "production"} />
              <span style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 550 }}>
                {p.year} · {p.role}
              </span>
            </div>
            <h3
              style={{
                fontSize: "clamp(1.3rem, 2.6vw, 1.85rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              {p.title}
            </h3>
            <p style={{ marginTop: "4px", color: "var(--muted)", fontSize: "0.9rem" }}>
              {p.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="chip"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid var(--line)",
              background: "var(--panel-2)",
              fontSize: "1.25rem",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </header>

        <div
          style={{
            flexShrink: 0,
            minHeight: isMobile ? undefined : hasMobile ? 320 : 260,
            height: isMobile ? "auto" : hasMobile ? "min(42vh, 380px)" : "min(38vh, 320px)",
          }}
        >
          <ProjectMockStage
            p={p}
            shot={shot}
            onSoon={onSoon}
            compact={isMobile}
            phoneWidth={isMobile && hasMobile ? "clamp(96px, 26vw, 130px)" : undefined}
          />
        </div>

        <div>
          <Label style={{ display: "block", marginBottom: "8px" }}>What I did</Label>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.08rem)",
              lineHeight: 1.7,
              color: "#3a3a3f",
              maxWidth: "62ch",
            }}
          >
            {p.description}
          </p>
        </div>

        {p.tech?.length > 0 && (
          <div>
            <Label style={{ display: "block", marginBottom: "8px" }}>Stack</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 11px",
                    borderRadius: 999,
                    background: "var(--panel-2)",
                    border: "1px solid var(--line)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <footer style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
          {p.links.github && (
            <LinkBtn href={p.links.github} icon={<GitHubIcon size={15} />} label="GitHub" />
          )}
          {p.links.web !== null &&
            (p.links.web ? (
              <LinkBtn href={p.links.web} icon={<GlobeIcon size={15} />} label="Live" />
            ) : (
              <LinkBtn soon onSoon={onSoon} icon={<GlobeIcon size={15} />} label="Live" />
            ))}
          {p.links.appstore !== null && p.links.appstore !== undefined && (
            <StoreBadge kind="appstore" href={p.links.appstore || null} onSoon={onSoon} />
          )}
          {p.links.playstore !== null && p.links.playstore !== undefined && (
            <StoreBadge kind="playstore" href={p.links.playstore || null} onSoon={onSoon} />
          )}
        </footer>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function CardActions({ p, onSoon, onDetails, vertical = false, hasMobile = false }) {
  return (
    <footer
      style={{
        display: "flex",
        gap: "6px",
        flexShrink: 0,
        alignItems: "center",
        flexWrap: "wrap",
        paddingBottom: !vertical && hasMobile ? "4px" : 0,
      }}
    >
      <button
        className="btn-cta"
        onClick={() => onDetails(p)}
        style={{ padding: "5px 5px 5px 12px", fontSize: "0.76rem", gap: "8px" }}
      >
        Details
        <span className="btn-cta-arrow" style={{ width: 26, height: 26, borderRadius: 7 }}>
          <ArrowIcon size={12} dir="up-right" />
        </span>
      </button>
      {p.links.github && (
        <LinkBtn href={p.links.github} icon={<GitHubIcon size={15} />} label="GitHub" />
      )}
      {p.links.web !== null &&
        (p.links.web ? (
          <LinkBtn href={p.links.web} icon={<GlobeIcon size={15} />} label="Live" />
        ) : (
          <LinkBtn soon onSoon={onSoon} icon={<GlobeIcon size={15} />} label="Live" />
        ))}
      {!vertical && (
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.7rem",
            color: "var(--muted)",
            fontWeight: 550,
          }}
        >
          {p.year} · {p.role}
        </span>
      )}
    </footer>
  );
}

function ProjectCard({ p, onSoon, onDetails, vertical = false }) {
  const shot = images.projects[p.id];
  const hasMobile = p.categories.includes("Mobile");

  return (
    <article
      style={{
        width: "100%",
        height: vertical ? "auto" : "100%",
        scrollSnapAlign: vertical ? "start" : "center",
        display: "flex",
        flexDirection: "column",
        gap: vertical ? "10px" : "10px",
        background: "var(--panel-solid)",
        border: "1px solid var(--line)",
        borderRadius: vertical ? "16px" : "18px",
        padding: vertical ? "12px" : "clamp(12px, 1.4vw, 20px)",
        position: "relative",
        boxShadow: "var(--shadow)",
        overflow: vertical ? "visible" : "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: vertical ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            style={{
              fontSize: vertical ? "1.02rem" : "clamp(1rem, 1.5vw, 1.3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              whiteSpace: vertical ? "normal" : "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {p.title}
            {!vertical && (
              <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: "0.78em" }}>
                {" "}
                · {p.tagline}
              </span>
            )}
          </h3>
          {vertical && (
            <p
              style={{
                marginTop: "2px",
                fontSize: "0.74rem",
                color: "var(--muted)",
                lineHeight: 1.35,
              }}
            >
              {p.tagline}
            </p>
          )}
        </div>
        <Toggle on={p.type === "production"} />
      </header>

      {vertical ? (
        <>
          {/* Mobile list: big web shot + actions. Phones live in the Details modal. */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              maxHeight: 240,
            }}
          >
            <BrowserMockup src={shot} alt={p.title} />
          </div>
          {hasMobile &&
            (p.links.appstore !== null || p.links.playstore !== null) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {p.links.appstore !== null && p.links.appstore !== undefined && (
                  <StoreBadge kind="appstore" href={p.links.appstore || null} onSoon={onSoon} />
                )}
                {p.links.playstore !== null && p.links.playstore !== undefined && (
                  <StoreBadge kind="playstore" href={p.links.playstore || null} onSoon={onSoon} />
                )}
              </div>
            )}
          <CardActions
            p={p}
            onSoon={onSoon}
            onDetails={onDetails}
            vertical
            hasMobile={hasMobile}
          />
        </>
      ) : (
        <>
          <ProjectMockStage p={p} shot={shot} onSoon={onSoon} />
          <CardActions
            p={p}
            onSoon={onSoon}
            onDetails={onDetails}
            hasMobile={hasMobile}
          />
        </>
      )}
    </article>
  );
}

/* C: horizontal carousel on desktop, vertical list on mobile */
export function C() {
  const f = useFilter();
  const isMobile = useIsMobile();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [soon, setSoon] = useState(false);
  const [detail, setDetail] = useState(null);
  const [introDone, setIntroDone] = useState(false);
  const soonTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 720);
    return () => clearTimeout(t);
  }, []);

  const projects = data.projects.filter((p) => {
    if (f.type !== "all" && p.type !== f.type) return false;
    if (f.stack && !p.categories.includes(f.stack)) return false;
    return true;
  });

  const showSoon = () => {
    setSoon(true);
    clearTimeout(soonTimer.current);
    soonTimer.current = setTimeout(() => setSoon(false), 1800);
  };

  const jump = (dir) => {
    const el = trackRef.current;
    if (!el || isMobile) return;
    const card = el.querySelector("article");
    const step = card ? card.offsetWidth + 14 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // ←/→ only — ↑/↓ are owned by App section nav and must never scroll cards.
  useEffect(() => {
    if (isMobile) return undefined;
    const onKey = (e) => {
      if (detail) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        jump(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        jump(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, detail]);

  const onScroll = () => {
    if (isMobile) return;
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.offsetWidth + 14 : 1;
    setIndex(Math.min(projects.length - 1, Math.round(el.scrollLeft / step)));
  };

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, top: 0 });
    setIndex(0);
  }, [f.type, f.stack, isMobile]);

  useEffect(() => {
    if (isMobile) return undefined;
    const el = trackRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (!canScrollX(el, e.deltaY)) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile, projects.length]);

  return (
    <div style={{ height: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      <motion.div
        ref={trackRef}
        variants={carouselTrackMotion}
        initial="hidden"
        animate="show"
        className={isMobile ? "thin-scroll" : "no-scrollbar"}
        onScroll={onScroll}
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "10px" : "14px",
          overflowX: isMobile ? "hidden" : "auto",
          overflowY: isMobile ? "auto" : "hidden",
          scrollSnapType: isMobile ? "y proximity" : "x mandatory",
          padding: isMobile ? "10px" : "clamp(12px, 1.4vw, 20px)",
          scrollBehavior: "smooth",
        }}
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            custom={i}
            variants={projectCardVariants}
            initial={introDone ? false : "hidden"}
            animate="show"
            style={{
              flexShrink: 0,
              width: isMobile ? "100%" : "min(78%, 880px)",
              height: isMobile ? "auto" : "100%",
              scrollSnapAlign: isMobile ? "start" : "center",
            }}
          >
            <ProjectCard
              p={p}
              onSoon={showSoon}
              onDetails={setDetail}
              vertical={isMobile}
            />
          </motion.div>
        ))}
        {projects.length === 0 && (
          <div
            style={{
              margin: "auto",
              color: "var(--muted)",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            Nothing matches this filter yet.
          </div>
        )}
      </motion.div>

      {!isMobile &&
        [-1, 1].map((dir) => (
          <button
            key={dir}
            className="icon-btn"
            aria-label={dir === 1 ? "Next project" : "Previous project"}
            onClick={() => jump(dir)}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              ...(dir === 1 ? { right: "10px" } : { left: "10px" }),
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              zIndex: 5,
            }}
          >
            <ArrowIcon size={15} dir={dir === 1 ? "right" : "left"} />
          </button>
        ))}

      {!isMobile && (
        <span
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.68rem",
            color: "var(--muted)",
            fontWeight: 600,
            background: "rgba(255,255,255,0.9)",
            border: "1px solid var(--line)",
            borderRadius: "999px",
            padding: "4px 12px",
            zIndex: 5,
            letterSpacing: "0.08em",
          }}
        >
          {projects.length === 0 ? 0 : index + 1} / {projects.length}
        </span>
      )}

      <AnimatePresence>
        {soon && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              x: "-50%",
              background: "#1d1d1f",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              zIndex: 10,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            Launching soon, stay tuned
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detail && (
          <ProjectDetailModal
            p={detail}
            onClose={() => setDetail(null)}
            onSoon={showSoon}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
