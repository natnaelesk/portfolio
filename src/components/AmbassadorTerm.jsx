export default function AmbassadorTerm({ onHoverChange, children }) {
  return (
    <span
      className="cursor-default underline decoration-muted underline-offset-4 transition hover:decoration-fg"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      tabIndex={0}
      role="button"
    >
      {children}
    </span>
  );
}
