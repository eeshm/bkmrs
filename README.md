# Stash

A minimal, keyboard-first bookmark manager that keeps your links private and organized.

## Features

- **Privacy First** — Bookmarks live in your browser. Nothing stored on servers.
- **Keyboard Shortcuts** — Navigate and manage entirely with your keyboard (`/` search, `A` add, `E` edit, `D` delete)
- **Minimal Design** — Clean, austere interface that gets out of your way
- **Metadata Extraction** — Auto-enriches links with titles, images, and favicons
- **Fast & Lightweight** — Built with React, Bun, and Tailwind CSS
- **No Tracking, No Ads** — Just your bookmarks, your way

## Screenshots

<div style="display: flex; gap: 20px; justify-content: center;">
  <div style="width: 50%;">
    <img src="./public/Home.png" alt="Home" style="width: 100%;" />
  </div>
  <div style="width: 50%;">
    <img src="./public/Stash.png" alt="Stash" style="width: 100%;" />
  </div>
</div>

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (v1.3+)

### Installation
```bash
git clone <repo>
cd stsh
bun install
```

### Development
```bash
bun run dev
```
Open `http://localhost:3000` in your browser.

### Build
```bash
bun run build
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` or `Cmd+K` | Search |
| `A` or `Cmd+B` | Add bookmark |
| `E` | Toggle edit mode |
| `D` | Toggle delete mode |
| `Esc` | Close/Clear |

## Tech Stack

- **Framework:** React 19
- **Styling:** Tailwind CSS
- **Runtime:** Bun
- **Animations:** Framer Motion

## Deployment

Deploy to Vercel with one click:
```bash
vercel deploy
```

Or deploy to any static host (build outputs to `/dist`).

## License

Personal project. Feel free to fork and adapt.

---

Made with minimal intent, maximal execution.
