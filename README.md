# natnaelesk.com — v3

Scroll-locked bento portfolio. One full screen, five sections; the boxes
morph shape and order as you scroll — scroll speed controls the pace.

React + Vite + Framer Motion. No Next.js, no heavy stack.

## Run

```bash
npm install
npm run dev
```

## Edit content (no code needed)

- `src/data/profile.json` — name, intro, about, stats, skills, services, socials
- `src/data/projects.json` — the projects list. Link rules:
  - `web: null` → button hidden
  - `appstore: ""` / `playstore: ""` → button shows a "Soon" popup
  - real URL → normal link
- `src/data/images.json` — image addresses (public paths like `/images/x.png`
  or full URLs). `null` shows a styled placeholder. Project screenshots go in
  `images.projects.<project-id>`.

Static files (like images) live in `public/images/`.
