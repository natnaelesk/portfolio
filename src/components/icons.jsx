/* Inline brand + UI icons (currentColor). */

export function GitHubIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function UpworkIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.56 13.98c-1.13 0-2.19-.48-3.15-1.26l.24-1.1v-.02c.21-1.17.87-3.14 2.91-3.14a2.76 2.76 0 0 1 0 5.52zm0-8.32c-2.6 0-4.61 1.69-5.43 4.47-1.25-1.88-2.2-4.13-2.75-6.03H7.54v7.28a2.55 2.55 0 1 1-5.1 0V4.1H-.36v7.28a5.35 5.35 0 0 0 10.7.05c.6 1.05 1.34 2.11 2.23 3.05l-1.9 8.93h2.87l1.37-6.47c1.2.77 2.58 1.26 4.16 1.26a5.56 5.56 0 0 0 5.56-5.6 5.54 5.54 0 0 0-5.55-5.53z" transform="translate(1.3 0)" />
    </svg>
  );
}

export function GlobeIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="9.3" />
      <path d="M2.7 12h18.6M12 2.7c2.6 2.6 3.9 5.8 3.9 9.3s-1.3 6.7-3.9 9.3c-2.6-2.6-3.9-5.8-3.9-9.3s1.3-6.7 3.9-9.3z" />
    </svg>
  );
}

export function AppleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.49.96 1.39 2.1 2.94 3.6 2.88 1.45-.06 1.99-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.54-1.41 3.49-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3.06-4.59z" />
      <path d="M14.16 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.73-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.62z" />
    </svg>
  );
}

export function PlayStoreIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.6 1.8c-.36.2-.6.58-.6 1.06v18.28c0 .48.24.87.6 1.06l10.06-10.2L3.6 1.8zM15.3 10.36 5.28 1.2l12.53 7.2-2.51 1.96zM17.81 15.6 5.28 22.8l10.02-9.16 2.51 1.96zM20.7 10.5l-2.2-1.27-2.8 2.77 2.8 2.77 2.2-1.27c1.07-.62 1.07-2.38 0-3z" />
    </svg>
  );
}

export function ArrowIcon({ size = 18, dir = "right" }) {
  const rotate = { right: 0, left: 180, up: -90, down: 90 }[dir];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function MailIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </svg>
  );
}
