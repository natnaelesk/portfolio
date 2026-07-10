import { useCallback, useEffect, useRef, useState } from "react";
import {
  NAV_TRANSITION_MS,
  WHEEL_GESTURE_IDLE_MS,
  WHEEL_THRESHOLD,
} from "./motion.js";
import {
  isNavPaused,
  touchConsumedByScrollArea,
  wheelConsumedByScrollArea,
} from "./scrollBoundaries.js";

/**
 * One section per scroll gesture. Navigation locks during the bento morph
 * so a fast wheel flick on Hero cannot skip to Skills or Contact.
 *
 * Nested scroll areas (thin-scroll, carousels) keep wheel events until they
 * hit a scroll boundary, then section navigation takes over.
 */
export function useSectionNav(sectionCount) {
  const [section, setSection] = useState(0);
  const navLocked = useRef(false);
  const lockTimer = useRef(null);
  const wheelAccum = useRef(0);
  const gestureActive = useRef(false);
  const gestureIdleTimer = useRef(null);
  const touchStartY = useRef(null);
  const touchGestureUsed = useRef(false);
  const touchTarget = useRef(null);

  const lockNav = useCallback(() => {
    navLocked.current = true;
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      navLocked.current = false;
      wheelAccum.current = 0;
      gestureActive.current = false;
    }, NAV_TRANSITION_MS);
  }, []);

  const step = useCallback(
    (dir) => {
      if (navLocked.current) return;
      setSection((s) => {
        const next = Math.min(sectionCount - 1, Math.max(0, s + dir));
        if (next !== s) lockNav();
        return next;
      });
    },
    [sectionCount, lockNav]
  );

  const jumpTo = useCallback(
    (index) => {
      const target = Math.min(sectionCount - 1, Math.max(0, index));
      lockNav();
      setSection(target);
    },
    [sectionCount, lockNav]
  );

  const resetGesture = useCallback(() => {
    gestureActive.current = false;
    wheelAccum.current = 0;
  }, []);

  const scheduleGestureReset = useCallback(() => {
    clearTimeout(gestureIdleTimer.current);
    gestureIdleTimer.current = setTimeout(resetGesture, WHEEL_GESTURE_IDLE_MS);
  }, [resetGesture]);

  useEffect(() => {
    const onWheel = (e) => {
      if (isNavPaused() || navLocked.current) return;
      if (wheelConsumedByScrollArea(e.target, e.deltaX, e.deltaY)) return;

      wheelAccum.current += e.deltaY;
      scheduleGestureReset();

      if (gestureActive.current) return;

      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        step(dir);
        gestureActive.current = true;
        wheelAccum.current = 0;
      }
    };

    const onKey = (e) => {
      if (isNavPaused()) return;
      if (e.repeat) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        step(1);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      }
      if (e.key === " " && !e.target?.closest?.("input, textarea, button")) {
        e.preventDefault();
        step(1);
      }
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchTarget.current = e.target;
      touchGestureUsed.current = false;
    };

    const onTouchMove = (e) => {
      if (isNavPaused() || touchStartY.current === null || navLocked.current) return;
      if (touchGestureUsed.current) return;

      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dy) < 8) return;

      if (touchConsumedByScrollArea(touchTarget.current, dy)) return;

      if (Math.abs(dy) > 48) {
        step(dy > 0 ? 1 : -1);
        touchGestureUsed.current = true;
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
      touchTarget.current = null;
      touchGestureUsed.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimeout(lockTimer.current);
      clearTimeout(gestureIdleTimer.current);
    };
  }, [step, scheduleGestureReset]);

  return { section, step, jumpTo };
}
