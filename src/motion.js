/** Shared motion tokens — keep bento morph, content, and pills in sync. */

export const EASE = [0.32, 0.72, 0, 1];

/** Primary layout morph — soft, no bounce. */
export const BENTO_SPRING = {
  type: "spring",
  stiffness: 78,
  damping: 22,
  mass: 0.92,
};

/** Inner content crossfade. */
export const CONTENT_TRANSITION = {
  duration: 0.26,
  ease: EASE,
};

/** Lock wheel / touch until the bento morph settles. */
export const NAV_TRANSITION_MS = 820;

/** Wheel must pass this threshold once per gesture to advance a section. */
export const WHEEL_THRESHOLD = 38;

/** Idle gap before a new scroll gesture can advance again. */
export const WHEEL_GESTURE_IDLE_MS = 160;
