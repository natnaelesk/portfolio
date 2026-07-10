export const SCROLLABLE_SELECTOR = ".thin-scroll, .no-scrollbar";

const TOLERANCE = 2;

export function canScrollY(el, deltaY) {
  if (!el || deltaY === 0) return false;
  if (el.scrollHeight <= el.clientHeight + TOLERANCE) return false;
  if (deltaY > 0) {
    return el.scrollTop + el.clientHeight < el.scrollHeight - TOLERANCE;
  }
  return el.scrollTop > TOLERANCE;
}

export function canScrollX(el, deltaX) {
  if (!el || deltaX === 0) return false;
  if (el.scrollWidth <= el.clientWidth + TOLERANCE) return false;
  if (deltaX > 0) {
    return el.scrollLeft + el.clientWidth < el.scrollWidth - TOLERANCE;
  }
  return el.scrollLeft > TOLERANCE;
}

function isScrollableElement(el) {
  if (!el || el === document.documentElement) return false;
  if (el.matches?.(SCROLLABLE_SELECTOR)) return true;

  const { overflowX, overflowY } = getComputedStyle(el);
  const scrollsY =
    ["auto", "scroll", "overlay"].includes(overflowY) &&
    el.scrollHeight > el.clientHeight + TOLERANCE;
  const scrollsX =
    ["auto", "scroll", "overlay"].includes(overflowX) &&
    el.scrollWidth > el.clientWidth + TOLERANCE;

  return scrollsY || scrollsX;
}

/** Innermost scroll containers first, walking up from the event target. */
export function getScrollableChain(target) {
  const chain = [];
  let el = target instanceof Element ? target : null;

  while (el && el !== document.documentElement) {
    if (isScrollableElement(el)) chain.push(el);
    el = el.parentElement;
  }

  return chain;
}

/**
 * True when a nested area still has room to scroll in the wheel direction.
 * When false, section navigation should take over.
 */
export function wheelConsumedByScrollArea(target, deltaX, deltaY) {
  const chain = getScrollableChain(target);
  const vertical = Math.abs(deltaY) >= Math.abs(deltaX);

  for (const el of chain) {
    if (vertical) {
      if (canScrollY(el, deltaY)) return true;
      // Vertical wheel on a horizontal track (projects carousel).
      if (canScrollX(el, deltaY)) return true;
    } else if (canScrollX(el, deltaX)) {
      return true;
    }
  }

  return false;
}

export function touchConsumedByScrollArea(target, deltaY) {
  if (deltaY === 0) return false;
  const chain = getScrollableChain(target);
  const dir = deltaY > 0 ? 1 : -1;

  for (const el of chain) {
    if (canScrollY(el, dir)) return true;
    if (canScrollX(el, dir)) return true;
  }

  return false;
}
