# Codis Design System — Implementation Design

**Date:** 2026-05-19  
**Approach:** B — CSS vars remap + e-Ukraine fonts + logo/favicon + codis-design skill  
**Target:** Codis AI Board (`ui/` package)  
**Source bundle:** `codis-design-system/` (extracted from design handoff)

---

## Goal

Apply the Codis brand design system to Codis AI Board without rewriting architecture. The app should feel like a real Codis product: Codis orange primary, e-Ukraine typography, proper border radii, Codis logos/favicons.

## Success criteria

- `--primary` renders as Codis orange (#E76033) throughout the app
- e-Ukraine font loads for all UI text; e-Ukraine Head for headings
- Codis logo appears in sidebar/header; favicon updated
- Border radii match Codis scale (not flat 0px)
- `codis-design` skill installed and usable by agents

---

## Section 1 — CSS Variables remapping

File: `ui/src/index.css`

### `:root` changes

| Variable | Before | After |
|---|---|---|
| `--primary` | `oklch(0.205 0 0)` | `#E76033` |
| `--primary-foreground` | `oklch(0.985 0 0)` | `#FFFFFF` |
| `--ring` | `oklch(0.708 0 0)` | `rgba(231,96,51,0.20)` |
| `--accent` | `oklch(0.97 0 0)` | `#FEF3EE` |
| `--accent-foreground` | `oklch(0.205 0 0)` | `#D14E22` |
| `--radius` | `0` | `0.625rem` |
| `--radius-sm` | `0.375rem` | `0.375rem` |
| `--radius-md` | `0.5rem` | `0.625rem` |
| `--radius-lg` | `0px` | `0.875rem` |
| `--radius-xl` | `0px` | `1.25rem` |
| `--sidebar-primary` | blue oklch | `#E76033` |
| `--sidebar-ring` | grey | `rgba(231,96,51,0.20)` |

### New Codis brand tokens added to `:root`

```css
--codis-orange: #E76033;
--codis-orange-600: #D14E22;
--codis-orange-100: #FCE5DA;
--codis-orange-50: #FEF3EE;
--codis-purple: #7828C8;
--codis-purple-100: #EAD6F9;
--codis-black: #1A1A1A;
--codis-white: #FFFFFF;

/* neutral scale */
--gray-50: #FAFAFA; --gray-100: #F4F4F5; --gray-200: #E4E4E7;
--gray-300: #D4D4D8; --gray-400: #A1A1AA; --gray-500: #71717A;
--gray-600: #52525B; --gray-700: #3F3F46; --gray-800: #27272A; --gray-900: #18181B;

/* semantic */
--success: #16A34A; --success-bg: #DCFCE7;
--warning: #F59E0B; --warning-bg: #FEF3C7;
--danger: #DC2626;  --danger-bg: #FEE2E2;
--info: #2563EB;    --info-bg: #DBEAFE;

/* font families */
--font-sans: "e-Ukraine", "Inter", system-ui, sans-serif;
--font-display: "e-Ukraine Head", "e-Ukraine", system-ui, sans-serif;
--font-logo: "e-Ukraine Logo", "e-Ukraine Head", sans-serif;

/* shadows */
--shadow-xs: 0 1px 2px rgba(20,20,20,.04);
--shadow-sm: 0 1px 3px rgba(20,20,20,.06), 0 1px 2px rgba(20,20,20,.04);
--shadow-md: 0 4px 12px rgba(20,20,20,.06), 0 2px 4px rgba(20,20,20,.04);
--shadow-lg: 0 12px 32px rgba(20,20,20,.10), 0 4px 8px rgba(20,20,20,.04);
--shadow-orange: 0 8px 24px rgba(231,96,51,.25);
```

### `.dark` changes

```css
--sidebar-primary: #E76033;
--sidebar-ring: rgba(231,96,51,0.20);
```

### `@layer base` addition

```css
body { font-family: var(--font-sans); }
h1, h2 { font-family: var(--font-display); }
```

---

## Section 2 — Fonts

### Font files

Copy from design bundle `fonts/` → `ui/public/fonts/`:
- `e-Ukraine-{Thin,UltraLight,Light,Regular,Medium,Bold}.otf`
- `e-UkraineHead-{Thin,UltraLight,Light,Regular,Medium,Bold,LOGO}.otf`

### @font-face declarations

Add to `ui/src/index.css` (before `:root`), identical to `colors_and_type.css` from design bundle, with path `../public/fonts/` → `/fonts/` (Vite serves public/ at root).

Do NOT touch `--font-mono` (JetBrains Mono stays for code blocks).

---

## Section 3 — Logo + Favicon

### Assets

Copy from design bundle `assets/` → `ui/public/`:
- `logo-light.svg`
- `logo-dark.svg`  
- `logo-white.svg`
- `favicon-16.png`, `favicon-32.png`, `favicon-180.png`

### `ui/index.html`

- Replace `<link rel="icon">` → Codis favicon
- Replace `<title>` → `Codis AI Board`
- Add `<link rel="apple-touch-icon">` for 180px

### Logo in UI

Search for current logo usage (sidebar, onboarding, auth pages) and replace with:
```tsx
<img src="/logo-light.svg" className="dark:hidden" alt="Codis" />
<img src="/logo-dark.svg" className="hidden dark:block" alt="Codis" />
```

---

## Section 4 — codis-design Skill

### Skill installation

Create `skills/codis-design/` with:
- `SKILL.md` — skill manifest (already exists in bundle, update paths)
- `colors_and_type.css` — full token reference
- `assets/` — logos, favicons, mascot
- `fonts/` — font files
- `ui_kits/sitam/` — SITAM React components as reference
- `preview/` — HTML preview cards
- `SITAM_PRODUCT.md` — product brief

This skill lets any AI agent generate brand-correct components and mockups without re-reading the full design doc every time.

---

## Out of scope (MVP)

- Replacing shadcn component implementations (just remapping CSS vars)
- Renaming `paperclip-*` CSS classes (unsafe per CLAUDE.md)
- SITAM-specific screens (different product)
- Tailwind `@theme` utility classes (Approach C — deferred)
- Executive agent card visual redesign (separate task)

---

## Files touched

```
ui/src/index.css              — CSS vars + font-face + base layer
ui/index.html                 — title + favicon
ui/public/fonts/              — 13 .otf files (new)
ui/public/logo-light.svg      — new
ui/public/logo-dark.svg       — new
ui/public/logo-white.svg      — new
ui/public/favicon-*.png       — 3 files (new)
skills/codis-design/          — new skill directory
+ N logo usage sites in tsx   — TBD during implementation
```
