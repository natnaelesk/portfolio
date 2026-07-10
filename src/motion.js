/** Shared motion tokens — keep bento morph, content, and pills in sync. */

/** Symmetric ease-in-out for consistent morph in and out. */
export const EASE = [0.42, 0, 0.58, 1];

/** Primary layout morph — snappy tween, not a slow spring. */
export const BENTO_LAYOUT = {
  type: "tween",
  duration: 0.48,
  ease: EASE,
};

/** Inner content crossfade — slightly shorter than the morph. */
export const CONTENT_TRANSITION = {
  duration: 0.28,
  ease: EASE,
};

/** Slide intro for projects section panels. */
export const SLIDE_SPRING = {
  type: "tween",
  duration: 0.4,
  ease: EASE,
};

/** Lock section changes until the bento morph settles. */
export const NAV_TRANSITION_MS = 520;

/** Wheel must pass this threshold once per gesture to show the hint. */
export const WHEEL_THRESHOLD = 38;
