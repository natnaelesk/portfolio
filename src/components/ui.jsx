/* Shared pieces: padding wrapper, labels, image placeholder, device mockups,
   app-icon social boxes. */
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, InstagramIcon, TelegramIcon } from "./icons.jsx";

export function Pad({ children, style, className, ...rest }) {
  return (
    <div
      className={className}
      {...rest}
      style={{
        height: "100%",
        padding: "clamp(14px, 2vw, 26px)",
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

export function Label({ children, style }) {
  return (
    <span
      style={{
        fontWeight: 600,
        fontSize: "0.68rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--muted)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function ImageOrPlaceholder({ src, alt, label, objectFit = "cover" }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit, display: "block" }}
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
        background: "linear-gradient(135deg, #eef1f6 0%, #e3e8f1 100%)",
      }}
    >
      {label === "" ? null : (
      <span
        style={{
          fontWeight: 600,
          fontSize: "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted)",
          border: "1px dashed rgba(0,0,0,0.15)",
          padding: "7px 13px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.6)",
          whiteSpace: "nowrap",
        }}
      >
        {label || "image soon"}
      </span>
      )}
    </div>
  );
}

/* ---- app-icon social boxes (iOS style: brand color fill, white glyph) ---- */

const BRANDS = {
  github: { Icon: GitHubIcon, bg: "#1d1d1f" },
  linkedin: { Icon: LinkedInIcon, bg: "#0a66c2" },
  instagram: {
    Icon: InstagramIcon,
    bg: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  telegram: { Icon: TelegramIcon, bg: "#229ED9" },
};

export function AppIconBox({ name, url }) {
  const { Icon, bg } = BRANDS[name] || BRANDS.github;
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={name}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        color: "#fff",
      }}
    >
      <Icon size="46%" />
    </motion.a>
  );
}

/* ---- device mockups (pure CSS) ---- */

/* Safari-style browser frame, viewport locked to 16:9 (1920x1080). */
export function BrowserMockup({ src, alt }) {
  const CHROME = 34;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid var(--line)",
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            height: CHROME,
            padding: "0 12px",
            background: "#f0f0f2",
            borderBottom: "1px solid var(--line)",
            flexShrink: 0,
          }}
        >
          <span style={{ display: "flex", gap: "5px" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span
                key={c}
                style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }}
              />
            ))}
          </span>
          <span
            style={{
              flex: 1,
              maxWidth: "320px",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "7px",
              padding: "3px 12px",
              fontSize: "0.62rem",
              fontWeight: 500,
              color: "var(--muted)",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              border: "1px solid var(--line)",
            }}
          >
            {(alt || "project").toLowerCase().replace(/\s+/g, "")}.com
          </span>
          <span style={{ width: "33px" }} />
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f7",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              aspectRatio: "16 / 9",
              margin: "auto",
              background: "#fff",
            }}
          >
            <ImageOrPlaceholder
              src={src}
              alt={alt}
              label="screenshot soon"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* iPhone 11 (414x896) or Android: same size, screenshot fills the screen. */
export function PhoneMockup({ kind = "iphone", src, alt }) {
  const iphone = kind === "iphone";
  const w = "clamp(64px, 7.5vw, 104px)";

  return (
    <div
      style={{
        width: w,
        aspectRatio: "414 / 896",
        borderRadius: iphone ? "16%" : "13%",
        border: "3px solid #1d1d1f",
        background: "#1d1d1f",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.2)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "2.5px",
          borderRadius: iphone ? "13.5%" : "10.5%",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <ImageOrPlaceholder src={src} alt={alt} label="" objectFit="cover" />
      </div>
      {iphone ? (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "44%",
            height: "3.8%",
            minHeight: "10px",
            background: "#1d1d1f",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            zIndex: 2,
          }}
        />
      ) : (
        <span
          style={{
            position: "absolute",
            top: "2.2%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "3.8%",
            minWidth: "7px",
            aspectRatio: "1",
            borderRadius: "50%",
            background: "#1d1d1f",
            zIndex: 2,
            boxShadow: "0 0 0 2px #0a0a0a",
          }}
        />
      )}
    </div>
  );
}
