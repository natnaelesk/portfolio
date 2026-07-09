# natnaelesk.com: v3

Scroll-locked bento portfolio. One full-screen grid of glass boxes that
morph shape and order as you scroll; scroll speed controls the pace.

Built with React + Vite + Framer Motion. Light, Apple-style theme with
drifting light beams in the background.

## Run it

```bash
npm install
npm run dev
```

## Content lives in JSON

- `src/data/profile.json`: name, intro, about, stats, skills, services, socials
- `src/data/projects.json`: the projects list. Link rules:
  - `web: null` hides the Live button; `web: ""` shows it with a "Soon" popup
  - `appstore` / `playstore`: `null` hides the badge, `""` shows it with a "Soon" popup
- `src/data/images.json`: image addresses (public paths like `/images/x.png`
  or full https URLs). `null` shows a styled placeholder.

## Sections

Home, About, Projects (filterable carousel with device mockups),
Skills & Services, Contact.
