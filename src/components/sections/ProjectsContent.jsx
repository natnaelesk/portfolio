import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/projects.json";
import images from "../../data/images.json";
import { Pad, Label, ImageOrPlaceholder } from "../ui.jsx";

const ALL = "All";

/* Module-level filter state so it survives the box content remounting
   between section transitions. */
let savedFilter = ALL;
let savedType = "all";

function B() {
  return (
    <Pad style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Projects<span style={{ color: "var(--accent)" }}>.</span>
      </h2>
      <Label>
        {data.projects.length} builds — web · mobile · AI
      </Label>
    </Pad>
  );
}

function SoonPopup({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        backdropFilter: "blur(4px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "34px 44px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🚀</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600 }}>
          Soon<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "6px" }}>
          This link goes live very soon.
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "18px",
            padding: "8px 22px",
            borderRadius: "999px",
            background: "var(--accent)",
            color: "#0a0a0c",
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}

function LinkPill({ label, href, onSoon }) {
  const style = {
    padding: "6px 14px",
    borderRadius: "999px",
    border: "1px solid var(--line)",
    fontSize: "0.72rem",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    transition: "border-color 0.2s, color 0.2s",
  };
  if (href === "") {
    return (
      <button style={{ ...style, color: "var(--muted)" }} onClick={onSoon}>
        {label} · soon
      </button>
    );
  }
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" style={style}>
      {label} ↗
    </a>
  );
}

function ProjectRow({ p, onSoon }) {
  const img = images.projects[p.id];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(120px, 200px) 1fr",
        gap: "18px",
        background: "var(--panel-2)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        flexShrink: 0,
      }}
    >
      <div style={{ minHeight: "150px", borderRadius: "16px 0 0 16px", overflow: "hidden" }}>
        <ImageOrPlaceholder src={img} alt={p.title} label="screenshot" />
      </div>
      <div style={{ padding: "16px 18px 16px 0", display: "flex", flexDirection: "column", gap: "9px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600 }}>
            {p.title}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: "999px",
              background: p.type === "production" ? "var(--accent-dim)" : "rgba(255,255,255,0.06)",
              color: p.type === "production" ? "var(--accent)" : "var(--muted)",
            }}
          >
            {p.type}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)" }}>
            {p.year} — {p.role}
          </span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.83rem", lineHeight: 1.55, maxWidth: "75ch" }}>
          {p.description}
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {p.tech.map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingBottom: "2px" }}>
          <LinkPill label="web" href={p.links.web} onSoon={onSoon} />
          <LinkPill label="github" href={p.links.github} onSoon={onSoon} />
          <LinkPill label="app store" href={p.links.appstore} onSoon={onSoon} />
          <LinkPill label="play store" href={p.links.playstore} onSoon={onSoon} />
        </div>
      </div>
    </motion.article>
  );
}

function C() {
  const [filter, setFilter] = useState(savedFilter);
  const [type, setType] = useState(savedType);
  const [soon, setSoon] = useState(false);
  const listRef = useRef(null);

  const categories = useMemo(() => {
    const set = new Set();
    data.projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return [ALL, ...set];
  }, []);

  const filtered = data.projects.filter(
    (p) =>
      (filter === ALL || p.categories.includes(filter)) &&
      (type === "all" || p.type === type)
  );

  const pick = (f) => { savedFilter = f; setFilter(f); };
  const pickType = (t) => { savedType = t; setType(t); };

  /* Keep wheel events inside the list unless we're at an edge. */
  const onWheel = (e) => {
    const el = listRef.current;
    if (!el) return;
    const atTop = el.scrollTop <= 0 && e.deltaY < 0;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 2 && e.deltaY > 0;
    if (!atTop && !atBottom) e.stopPropagation();
  };

  return (
    <Pad style={{ gap: "14px" }}>
      {/* filter bar */}
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => pick(c)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                border: "1px solid",
                borderColor: filter === c ? "var(--accent)" : "var(--line)",
                color: filter === c ? "var(--accent)" : "var(--muted)",
                background: filter === c ? "var(--accent-dim)" : "transparent",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        {/* personal / production toggle */}
        <div
          style={{
            display: "flex",
            borderRadius: "999px",
            border: "1px solid var(--line)",
            overflow: "hidden",
          }}
        >
          {["all", "personal", "production"].map((t) => (
            <button
              key={t}
              onClick={() => pickType(t)}
              style={{
                padding: "6px 14px",
                fontSize: "0.68rem",
                fontFamily: "var(--font-mono)",
                textTransform: "capitalize",
                background: type === t ? "var(--accent)" : "transparent",
                color: type === t ? "#0a0a0c" : "var(--muted)",
                fontWeight: type === t ? 600 : 400,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* scrollable list */}
      <div
        ref={listRef}
        className="thin-scroll"
        onWheel={onWheel}
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          paddingRight: "6px",
          flex: 1,
          minHeight: 0,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectRow key={p.id} p={p} onSoon={() => setSoon(true)} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
            No projects match this filter (yet).
          </p>
        )}
      </div>

      <AnimatePresence>{soon && <SoonPopup onClose={() => setSoon(false)} />}</AnimatePresence>
    </Pad>
  );
}

function A() { return null; }
function D() { return null; }
function E() { return null; }

export default { A, B, C, D, E };
