import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useIsMobile } from "../hooks.js";

const SNAP = { type: "tween", duration: 0.32, ease: [0.42, 0, 0.58, 1] };

/** Travel-axis knob size — must match CSS. */
const KNOB_ALONG = 52;
/** Inset from track edges so the pill never kisses past the border. */
const TRACK_INSET = 3;

export default function SectionNavigator({ sections, section, onJump }) {
  const isMobile = useIsMobile();
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [labelIndex, setLabelIndex] = useState(section);

  const maxIndex = Math.max(1, sections.length - 1);
  const progress = useMotionValue(section / maxIndex);
  const [progressValue, setProgressValue] = useState(section / maxIndex);

  useEffect(() => {
    const unsub = progress.on("change", (v) => setProgressValue(v));
    return unsub;
  }, [progress]);

  useEffect(() => {
    if (draggingRef.current) return;
    animate(progress, section / maxIndex, SNAP);
  }, [section, maxIndex, progress]);

  useEffect(() => {
    if (!dragging) setLabelIndex(section);
  }, [section, dragging]);

  const ratioFromPoint = useCallback(
    (clientX, clientY) => {
      const track = trackRef.current;
      if (!track) return section / maxIndex;
      const rect = track.getBoundingClientRect();
      const along = isMobile ? rect.width : rect.height;
      const usable = Math.max(1, along - KNOB_ALONG - TRACK_INSET * 2);
      const raw = isMobile
        ? clientX - rect.left - TRACK_INSET - KNOB_ALONG / 2
        : clientY - rect.top - TRACK_INSET - KNOB_ALONG / 2;
      return Math.min(1, Math.max(0, raw / usable));
    },
    [isMobile, maxIndex, section]
  );

  const snapToSection = useCallback(
    (index, navigate = true) => {
      const clamped = Math.min(maxIndex, Math.max(0, index));
      animate(progress, clamped / maxIndex, SNAP);
      setLabelIndex(clamped);
      if (navigate && clamped !== section) onJump(clamped);
    },
    [maxIndex, onJump, progress, section]
  );

  const onPointerDown = useCallback(
    (e) => {
      if (e.button != null && e.button !== 0) return;
      e.preventDefault();
      draggingRef.current = true;
      setDragging(true);
      trackRef.current?.setPointerCapture?.(e.pointerId);

      const ratio = ratioFromPoint(e.clientX, e.clientY);
      progress.set(ratio);
      setLabelIndex(Math.round(ratio * maxIndex));
    },
    [maxIndex, progress, ratioFromPoint]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      const ratio = ratioFromPoint(e.clientX, e.clientY);
      progress.set(ratio);
      setLabelIndex(Math.round(ratio * maxIndex));
    },
    [maxIndex, progress, ratioFromPoint]
  );

  const onPointerUp = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      try {
        trackRef.current?.releasePointerCapture?.(e.pointerId);
      } catch {
        /* already released */
      }
      const ratio = ratioFromPoint(e.clientX, e.clientY);
      snapToSection(Math.round(ratio * maxIndex));
    },
    [maxIndex, ratioFromPoint, snapToSection]
  );

  const showLabel = dragging || hovering;
  const p = Math.min(1, Math.max(0, progressValue));

  // Knob top/left: inset + progress * usable travel (never outside).
  const knobOffset = `calc(${TRACK_INSET}px + ${p} * (100% - ${KNOB_ALONG + TRACK_INSET * 2}px))`;

  return (
    <nav
      className={`section-nav ${isMobile ? "section-nav--mobile" : ""}`}
      aria-label="Sections"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="section-nav-shell">
        <motion.span
          className="section-nav-label"
          aria-live="polite"
          initial={false}
          animate={{
            opacity: showLabel ? 1 : 0,
            x: showLabel ? 0 : isMobile ? 0 : 8,
            y: showLabel ? 0 : isMobile ? 8 : 0,
          }}
          transition={{ duration: 0.22, ease: [0.42, 0, 0.58, 1] }}
        >
          {sections[labelIndex]}
        </motion.span>

        <div
          ref={trackRef}
          className="section-nav-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={maxIndex}
          aria-valuenow={section}
          aria-valuetext={sections[section]}
          tabIndex={0}
        >
          {/* Ticks sit on the same centers as each knob stop */}
          <div className="section-nav-ticks" aria-hidden="true">
            {sections.map((name, i) => {
              const t = i / maxIndex;
              const center = `calc(${TRACK_INSET}px + ${t} * (100% - ${KNOB_ALONG + TRACK_INSET * 2}px) + ${KNOB_ALONG / 2}px)`;
              return (
                <span
                  key={name}
                  className={`section-nav-tick ${section === i ? "active" : ""}`}
                  style={
                    isMobile
                      ? { left: center, top: "50%" }
                      : { top: center, left: "50%" }
                  }
                />
              );
            })}
          </div>

          <div
            className={`section-nav-knob${dragging ? " is-dragging" : ""}`}
            style={
              isMobile
                ? { left: knobOffset, top: TRACK_INSET }
                : { top: knobOffset, left: TRACK_INSET }
            }
            aria-hidden="true"
          />
        </div>
      </div>
    </nav>
  );
}
