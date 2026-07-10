/* Shared pieces: padding wrapper, labels, image placeholder, device mockups,
   app-icon social boxes. */
import { useState } from "react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon, GmailIcon } from "./icons.jsx";
import profile from "../data/profile.json";

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

/* ---- social link squares: light bg, brand-colored logo ---- */

const BRANDS = {
  github: { Icon: GitHubIcon, color: "#1d1d1f" },
  linkedin: { Icon: LinkedInIcon, color: "#0a66c2" },
  whatsapp: { Icon: WhatsAppIcon, color: "#25D366" },
  gmail: { Icon: GmailIcon, color: "#EA4335" },
};

const SOCIAL_LINKS = [
  { name: "github", url: profile.socials.github },
  { name: "linkedin", url: profile.socials.linkedin },
  { name: "whatsapp", url: profile.socials.whatsapp },
  { name: "gmail", url: profile.socials.gmail },
];

const SOCIAL_SIZE = "clamp(44px, 5.2vw, 58px)";

export function SocialStrip({ justify = "flex-start", pad = true }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        height: "100%",
        alignItems: "center",
        justifyContent: justify,
        padding: pad ? "0 2px" : 0,
        minWidth: 0,
        background: "transparent",
      }}
    >
      {SOCIAL_LINKS.map(({ name, url }) => (
        <div
          key={name}
          style={{
            width: SOCIAL_SIZE,
            height: SOCIAL_SIZE,
            flexShrink: 0,
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <AppIconBox name={name} url={url} />
        </div>
      ))}
    </div>
  );
}

export function AppIconBox({ name, url, bare = false }) {
  const { Icon, color } = BRANDS[name] || BRANDS.github;
  const [hover, setHover] = useState(false);

  if (!bare) {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noreferrer"
        title={name}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          border: "1px solid var(--line)",
          color,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Icon size="44%" />
      </motion.a>
    );
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={name}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        color: hover ? "#fff" : color,
      }}
    >
      {/* brand color blooms from center dot to fill the whole cell */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          scale: hover ? 4.2 : 0.2,
          opacity: hover ? 1 : 0.12,
        }}
        transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "absolute",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: color,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
        }}
      />
      <motion.span
        initial={false}
        animate={{ scale: hover ? 1.12 : 1, y: hover ? -1 : 0 }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        style={{ position: "relative", zIndex: 1, display: "flex", color: "inherit" }}
      >
        <Icon size={30} />
      </motion.span>
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

/* Realistic phone frames: iPhone (notch) + Android (punch-hole). */
export function PhoneMockup({ kind = "iphone", src, alt, width }) {
  const iphone = kind === "iphone";
  const w = width || "clamp(78px, 9vw, 128px)";

  return (
    <div
      style={{
        width: w,
        aspectRatio: iphone ? "390 / 844" : "360 / 780",
        borderRadius: iphone ? "22px" : "20px",
        background: iphone
          ? "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 45%, #0a0a0a 100%)"
          : "linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 50%, #111 100%)",
        padding: iphone ? "7px" : "6px",
        position: "relative",
        flexShrink: 0,
        boxShadow:
          "0 14px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      {/* side buttons */}
      {iphone && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: -2,
              top: "18%",
              width: 2,
              height: "6%",
              borderRadius: 2,
              background: "#2a2a2c",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: -2,
              top: "28%",
              width: 2,
              height: "10%",
              borderRadius: 2,
              background: "#2a2a2c",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              right: -2,
              top: "30%",
              width: 2,
              height: "12%",
              borderRadius: 2,
              background: "#2a2a2c",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: iphone ? "16px" : "15px",
          overflow: "hidden",
          background: "#f5f5f7",
        }}
      >
        <ImageOrPlaceholder src={src} alt={alt} label="" objectFit="cover" />

        {iphone ? (
          /* classic notch */
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "38%",
              height: "4.6%",
              minHeight: 12,
              background: "#0a0a0a",
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              zIndex: 3,
              boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.06)",
            }}
          />
        ) : (
          /* Android punch-hole camera */
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "1.6%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #3a3a40, #0a0a0a 70%)",
              zIndex: 3,
              boxShadow: "0 0 0 1.5px #111",
            }}
          />
        )}

        {/* home indicator */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "1.4%",
            left: "50%",
            transform: "translateX(-50%)",
            width: iphone ? "34%" : "28%",
            height: 3,
            borderRadius: 999,
            background: "rgba(0,0,0,0.28)",
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
}
