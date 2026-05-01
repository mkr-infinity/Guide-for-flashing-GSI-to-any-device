# GSI Flash Guide

A beginner-friendly single-page React app that guides users through flashing Generic System Images (GSI) on Android devices.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 6
- **Styling:** Tailwind CSS v4
- **Routing:** wouter
- **Package manager:** pnpm

## Project Structure

- `src/` — React source code
  - `App.tsx` — Main layout and routing
  - `sections.ts` — Route/section definitions
  - `pages/` — Individual guide pages
  - `components/` — UI components (Sidebar, ThemeToggle, shadcn-style UI)
- `public/` — Static assets (favicon, logo, 404.html for SPA routing)
- `index.html` — App entry point (includes GitHub Pages SPA routing script)

## Development

```bash
pnpm install
pnpm run dev       # starts dev server on PORT env var (default 5173)
```

The Replit workflow runs: `PORT=5000 pnpm run dev`

## Deployment

### Netlify
Auto-detected via `netlify.toml`. Builds with `pnpm run build`, serves from `dist/public`. SPA redirects configured.

### Vercel
Auto-detected via `vercel.json`. Builds with `pnpm run build`, output dir `dist/public`. SPA rewrites configured.

### GitHub Pages
GitHub Actions workflow at `.github/workflows/deploy.yml`. Triggers on push to `main`. Auto-detects repo name for the base path (`BASE_PATH=/<repo-name>/`). Deploys to the `github-pages` environment.

**Required GitHub repo setup:**
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow will build and deploy automatically

SPA routing on GitHub Pages is handled by `public/404.html` (encodes path as query string) and a script in `index.html` (restores the path before React mounts).

## Build Output

All platforms build to `dist/public/`.
