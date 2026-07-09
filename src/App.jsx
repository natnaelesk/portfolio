import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader.jsx";
import Scene from "./components/Scene.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <AnimatePresence mode="wait">
        {!loaded ? (
          <Loader key="loader" onDone={() => setLoaded(true)} />
        ) : (
          <Scene key="scene" />
        )}
      </AnimatePresence>
    </div>
  );
}
