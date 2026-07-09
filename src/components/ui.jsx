/* Small shared pieces used across section content. */

export function Pad({ children, style, className }) {
  return (
    <div
      className={className}
      style={{
        height: "100%",
        padding: "clamp(14px, 2.2vw, 28px)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Label({ children }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      {children}
    </span>
  );
}

export function ImageOrPlaceholder({ src, alt, label }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "repeating-linear-gradient(45deg, var(--panel-2), var(--panel-2) 12px, var(--panel) 12px, var(--panel) 24px)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          border: "1px dashed var(--line)",
          padding: "8px 14px",
          borderRadius: "8px",
        }}
      >
        {label || "image soon"}
      </span>
    </div>
  );
}
