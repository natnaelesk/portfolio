import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader.jsx";
import Scene, { SECTIONS } from "./components/Scene.jsx";
import { useSectionNav } from "./useSectionNav.js";
import { useIsMobile } from "./hooks.js";

/**
 * App owns section navigation so ↑/↓ work site-wide regardless of cursor
 * position — including over scrollable bento cards.
 * On mobile (no keyboard), swipe / wheel advances sections instead.
 */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrollHintTrigger, setScrollHintTrigger] = useState(0);
  const isMobile = useIsMobile();
  const onMainScrollAttempt = useCallback(
    () => setScrollHintTrigger((n) => n + 1),
    []
  );
  const { section, jumpTo } = useSectionNav(SECTIONS.length, {
    enabled: loaded,
    scrollNavigates: isMobile,
    onMainScrollAttempt,
  });

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <AnimatePresence mode="wait">
        {!loaded ? (
          <Loader key="loader" onDone={() => setLoaded(true)} />
        ) : (
          <Scene
            key="scene"
            section={section}
            jumpTo={jumpTo}
            scrollHintTrigger={scrollHintTrigger}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
