export default function TechTerm({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit underline decoration-muted underline-offset-4 transition hover:decoration-fg"
    >
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg px-2 py-1 text-[10px] font-mono text-muted opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        Click to see more
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-border" />
      </span>
    </button>
  );
}
