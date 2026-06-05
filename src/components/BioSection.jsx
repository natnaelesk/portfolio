import { useState } from "react";
import techStacks from "../data/techStack.json";
import TechTerm from "./TechTerm";
import TechStackModal from "./TechStackModal";

export default function BioSection() {
  const [activeStack, setActiveStack] = useState(null);

  const open = (key) => setActiveStack(techStacks[key]);
  const close = () => setActiveStack(null);

  return (
    <>
      <section className="relative flex flex-col gap-4 text-sm leading-relaxed text-fg/90 sm:text-base">
        <p>
          I build software and specialize in turning ideas into production-ready products.
          My experience spans{" "}
          <TechTerm onClick={() => open("frontend")}>Frontend</TechTerm>,{" "}
          <TechTerm onClick={() => open("backend")}>Backend</TechTerm>,{" "}
          <TechTerm onClick={() => open("database")}>Database systems</TechTerm>, and{" "}
          <TechTerm onClick={() => open("ai")}>AI-powered solutions</TechTerm>, allowing me
          to build scalable applications from concept to launch.
        </p>
        <p>
          I hold a Computer Science degree and have developed much of my experience through
          self-driven learning and hands-on development. I am continuously exploring AI and
          automation while growing toward becoming an AI Engineer.
        </p>
      </section>

      <TechStackModal stack={activeStack} onClose={close} />
    </>
  );
}
