import { useEffect } from "react";

export default function TechStackModal({ stack, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!stack) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-stack-title"
        className="relative w-full max-w-sm rounded border border-border bg-bg p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 id="tech-stack-title" className="text-sm font-semibold text-fg">
            {stack.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs text-muted transition hover:text-fg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {stack.items.map((item) => (
            <li
              key={item}
              className="border-b border-border/30 pb-2 text-sm text-muted last:border-0 last:pb-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
