import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

/* B: heading */
export function B() {
  return (
    <Pad style={{ justifyContent: "center", gap: "4px" }}>
      <h2
        style={{
          fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        Projects<span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label>{data.projects.length} builds</Label>
    </Pad>
  );
}

/* ---- filter boxes (wide + short, rectangular) ---- */
function TypeFilterBox({ value, label, sub }) {
  const f = useFilter();
  const active = f.type === value;
  return (
    <button
      onClick={() => setFilter({ type: value, stack: null })}
      style={{ width: "100%", height: "100%" }}
    >
      <motion.div
        animate={{
          backgroundColor: active ? "rgba(0,113,227,0.09)" : "rgba(0,0,0,0)",
        }}
        whileHover={{ backgroundColor: active ? "rgba(0,113,227,0.13)" : "rgba(0,0,0,0.04)" }}
        whileTap={{ scale: 0.98 }}
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "9px",
          padding: "0 14px",
        }}
      >
        <span
          style={{
            fontWeight: 650,
            fontSize: "clamp(0.82rem, 1.05vw, 1rem)",
            color: active ? "var(--accent)" : "var(--text)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "0.66rem",
            color: "var(--muted)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {sub}
        </span>
      </motion.div>
    </button>
  );
}

export function D() {
  return <TypeFilterBox value="all" label="All" sub="everything" />;
}
export function F() {
  const n = data.projects.filter((p) => p.type === "personal").length;
  return <TypeFilterBox value="personal" label="Personal" sub={`${n} projects`} />;
}
export function G() {
  const n = data.projects.filter((p) => p.type === "production").length;
  return <TypeFilterBox value="production" label="Production" sub={`${n} shipped`} />;
}

/* H: stack sub-filters, their own row below the type filters */
export function H() {
  const f = useFilter();
  return (
    <Pad
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: "14px",
        padding: "8px 16px",
      }}
    >
      <Label style={{ fontSize: "0.6rem", flexShrink: 0 }}>Stack</Label>
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          overflowX: "auto",
          flex: 1,
          minWidth: 0,
        }}
        onWheel={(e) => {
          e.stopPropagation();
          e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        {STACKS.map((s) => {
          const active = f.stack === s;
          return (
            <button
              key={s}
              className="chip"
              onClick={() => setFilter({ stack: active ? null : s })}
              style={{
                flexShrink: 0,
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 600,
                border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
                background: active ? "var(--accent)" : "var(--panel-solid)",
                color: active ? "#fff" : "var(--muted)",
              }}
            >
              {s}
            </button>
          );
        })}
      </div>
    </Pad>
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

function ProjectCard({ p, onSoon }) {
  const shot = images.projects[p.id];
  const isMobile = p.categories.includes("Mobile");
  const showApp = p.links.appstore !== null && p.links.appstore !== undefined;
  const showPlay = p.links.playstore !== null && p.links.playstore !== undefined;

  return (
    <article
      style={{
        flexShrink: 0,
        width: "min(78%, 880px)",
        height: "100%",
        scrollSnapAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "var(--panel-solid)",
        border: "1px solid var(--line)",
        borderRadius: "18px",
        padding: "clamp(12px, 1.4vw, 20px)",
        position: "relative",
        boxShadow: "var(--shadow)",
      }}
    >
      {/* top: toggle + title */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {p.title}
            <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: "0.78em" }}>
              {" "}
              · {p.tagline}
            </span>
          </h3>
        </div>
        <Toggle on={p.type === "production"} />
      </header>

      {/* mockup: always full width, phones overlay on top of it */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <BrowserMockup src={shot} alt={p.title} />
      </div>

      {/* bottom: links */}
      <footer style={{ display: "flex", gap: "8px", flexShrink: 0, alignItems: "center" }}>
        {p.links.github && (
          <LinkBtn href={p.links.github} icon={<GitHubIcon size={15} />} label="GitHub" />
        )}
        {p.links.web !== null &&
          (p.links.web ? (
            <LinkBtn href={p.links.web} icon={<GlobeIcon size={15} />} label="Live" />
          ) : (
            <LinkBtn soon onSoon={onSoon} icon={<GlobeIcon size={15} />} label="Live" />
          ))}
        <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "var(--muted)", fontWeight: 550 }}>
          {p.year} · {p.role}
        </span>
      </footer>

      {/* phone mockups overlay on top: iPhone left border, Android right border */}
      {isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              left: "clamp(10px, 1.2vw, 18px)",
              bottom: "clamp(56px, 8vh, 76px)",
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
              right: "clamp(10px, 1.2vw, 18px)",
              bottom: "clamp(56px, 8vh, 76px)",
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
    </article>
  );
}

/* C: the carousel wrapper */
export function C() {
  const f = useFilter();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [soon, setSoon] = useState(false);
  const soonTimer = useRef(null);

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
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.offsetWidth + 14 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // arrow keys navigate the carousel while Projects is on screen
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") jump(1);
      if (e.key === "ArrowLeft") jump(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // track which card is centered
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.offsetWidth + 14 : 1;
    setIndex(Math.min(projects.length - 1, Math.round(el.scrollLeft / step)));
  };

  // reset scroll when the filter changes
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    setIndex(0);
  }, [f.type, f.stack]);

  return (
    <div style={{ height: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      <div
        ref={trackRef}
        className="no-scrollbar"
        onScroll={onScroll}
        onWheel={(e) => {
          // scroll inside the box moves the carousel, not the sections
          e.stopPropagation();
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "clamp(12px, 1.4vw, 20px)",
          scrollBehavior: "smooth",
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} onSoon={showSoon} />
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
      </div>

      {/* prev / next controls, vertically centered on the edges */}
      {[-1, 1].map((dir) => (
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

      {/* counter pill */}
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

      {/* Soon popup */}
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
    </div>
  );
}
