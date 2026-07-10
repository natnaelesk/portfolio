import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_TRANSITION_MS, WHEEL_THRESHOLD } from "./motion.js";
import {
  isNavPaused,
  touchConsumedByScrollArea,
  wheelConsumedByScrollArea,
} from "./scrollBoundaries.js";

const HINT_COOLDOWN_MS = 2200;
const TOUCH_SWIPE_THRESHOLD = 52;

function isEditableTarget(target) {
  if (!(target instanceof Element)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}

function isVerticalNavKey(key) {
  return (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "PageUp" ||
    key === "PageDown"
  );
}

/**
 * App-owned section navigation.
 *
 * Desktop: ArrowUp / ArrowDown change sections. Wheel / touch show a hint.
 * Mobile:  swipe / wheel change sections (no keyboard). Card interiors still
 *          scroll with touch/wheel until they hit their edge.
 */
export function useSectionNav(
  sectionCount,
  { onMainScrollAttempt, enabled = true, scrollNavigates = false } = {}
) {
  const [section, setSection] = useState(0);
  const sectionRef = useRef(0);
  const navLocked = useRef(false);
  const lockTimer = useRef(null);
  const wheelAccum = useRef(0);
  const lastHintAt = useRef(0);
  const touchStartY = useRef(null);
  const touchTarget = useRef(null);
  const scrollNavigatesRef = useRef(scrollNavigates);
  scrollNavigatesRef.current = scrollNavigates;
  // Keep latest callback in a ref so the key/wheel effect never rebinds
  // (rebinding was clearing the unlock timer and permanently locking nav).
  const onMainScrollAttemptRef = useRef(onMainScrollAttempt);
  onMainScrollAttemptRef.current = onMainScrollAttempt;

  const lockNav = useCallback(() => {
    navLocked.current = true;
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      navLocked.current = false;
      wheelAccum.current = 0;
    }, NAV_TRANSITION_MS);
  }, []);

  const step = useCallback(
    (dir) => {
      if (isNavPaused() || navLocked.current) return false;
      const next = Math.min(
        sectionCount - 1,
        Math.max(0, sectionRef.current + dir)
      );
      if (next === sectionRef.current) return false;
      sectionRef.current = next;
      lockNav();
      setSection(next);
      return true;
    },
    [sectionCount, lockNav]
  );

  const jumpTo = useCallback(
    (index) => {
      if (isNavPaused() || navLocked.current) return;
      const target = Math.min(sectionCount - 1, Math.max(0, index));
      if (target === sectionRef.current) return;
      sectionRef.current = target;
      lockNav();
      setSection(target);
    },
    [sectionCount, lockNav]
  );

  useEffect(() => {
    if (!enabled) return undefined;

    const fireScrollHint = () => {
      const now = performance.now();
      if (now - lastHintAt.current < HINT_COOLDOWN_MS) return;
      lastHintAt.current = now;
      onMainScrollAttemptRef.current?.();
    };

    const onWheel = (e) => {
      if (isNavPaused()) return;
      if (wheelConsumedByScrollArea(e.target, e.deltaX, e.deltaY)) return;

      if (scrollNavigatesRef.current) {
        wheelAccum.current += e.deltaY;
        if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
          const dir = wheelAccum.current > 0 ? 1 : -1;
          wheelAccum.current = 0;
          step(dir);
        }
        return;
      }

      // Desktop: scroll is a hint only — use arrow keys to navigate.
      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        fireScrollHint();
        wheelAccum.current = 0;
      }
    };

    /**
     * Capture-phase on window: runs before any card / scrollable / React handler.
     * Blocks default browser arrow-scroll inside overflow panels.
     */
    const onKey = (e) => {
      if (!isVerticalNavKey(e.key)) return;
      // Forms keep caret / value editing; everything else is section nav only.
      if (isEditableTarget(e.target)) return;

      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }

      if (isNavPaused() || e.repeat) return;

      const down = e.key === "ArrowDown" || e.key === "PageDown";
      step(down ? 1 : -1);
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchTarget.current = e.target;
    };

    const onTouchMove = (e) => {
      if (touchStartY.current === null || isNavPaused()) return;

      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dy) < 10) return;

      // Let nested cards keep scrolling while they still have room.
      if (touchConsumedByScrollArea(touchTarget.current, dy)) return;

      if (scrollNavigatesRef.current) {
        if (Math.abs(dy) > TOUCH_SWIPE_THRESHOLD) {
          step(dy > 0 ? 1 : -1);
          touchStartY.current = e.touches[0].clientY;
        }
        return;
      }

      // Desktop: swipe shows the arrow-key hint.
      if (Math.abs(dy) > TOUCH_SWIPE_THRESHOLD) {
        fireScrollHint();
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
      touchTarget.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey, { capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      // Do NOT clear lockTimer here — section changes re-render App and would
      // leave navLocked=true forever if the unlock timeout is cancelled.
    };
  }, [enabled, step]);

  // Unlock + clear timer only when the hook unmounts for real.
  useEffect(() => {
    return () => {
      clearTimeout(lockTimer.current);
      navLocked.current = false;
    };
  }, []);

  return { section, step, jumpTo };
}
