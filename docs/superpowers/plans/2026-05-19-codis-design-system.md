# Codis Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Codis brand design system (colors, fonts, radii, logos) to Codis AI Board and install a `codis-design` skill for AI agents.

**Architecture:** Remap existing shadcn/ui CSS variables in `ui/src/index.css` to Codis brand tokens. Copy e-Ukraine font files to `ui/public/fonts/`. Update `index.html` and visible Paperclip strings in user-facing UI. Install `skills/codis-design/` as a usable skill.

**Tech Stack:** Tailwind v4, shadcn/ui, Vite, React/TSX, CSS custom properties

---

## File map

| File | Change |
|---|---|
| `ui/src/index.css` | Remap CSS vars + add @font-face + base font layer |
| `ui/index.html` | Title + favicon links + meta |
| `ui/public/fonts/` | New — 13 .otf font files |
| `ui/public/logo-light.svg` | New — Codis logo light |
| `ui/public/logo-dark.svg` | New — Codis logo dark |
| `ui/public/logo-white.svg` | New — Codis logo white |
| `ui/public/favicon-16.png` | Replace Paperclip favicon |
| `ui/public/favicon-32.png` | Replace Paperclip favicon |
| `ui/public/favicon-180.png` | New — apple-touch-icon |
| `ui/src/context/BreadcrumbContext.tsx` | "Paperclip" → "Codis AI Board" in title |
| `ui/src/pages/InviteLanding.tsx` | "Paperclip" → "Codis AI Board" in user strings |
| `ui/src/pages/CliAuth.tsx` | "Paperclip CLI" → "Codis CLI" |
| `skills/codis-design/` | New skill directory |

Design bundle source (already extracted):
```
/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/
```

---

## Task 1: Copy font files

**Files:**
- Create: `ui/public/fonts/` (13 .otf files)

- [ ] **Step 1: Copy all .otf font files from the design bundle**

```bash
mkdir -p /Users/aleksand/Codis-AI-Board/ui/public/fonts
cp "/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/fonts/"*.otf \
   /Users/aleksand/Codis-AI-Board/ui/public/fonts/
```

- [ ] **Step 2: Verify all 13 files copied**

```bash
ls /Users/aleksand/Codis-AI-Board/ui/public/fonts/
```

Expected output (13 files):
```
e-Ukraine-Bold.otf          e-UkraineHead-Bold.otf
e-Ukraine-Light.otf         e-UkraineHead-Light.otf
e-Ukraine-Medium.otf        e-UkraineHead-LOGO.otf
e-Ukraine-Regular.otf       e-UkraineHead-Medium.otf
e-Ukraine-Thin.otf          e-UkraineHead-Regular.otf
e-Ukraine-UltraLight.otf    e-UkraineHead-Thin.otf
                            e-UkraineHead-UltraLight.otf
```

- [ ] **Step 3: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/public/fonts/
git commit -m "feat: add e-Ukraine font files to public assets"
```

---

## Task 2: Copy logo and favicon assets

**Files:**
- Create: `ui/public/logo-light.svg`, `logo-dark.svg`, `logo-white.svg`
- Create: `ui/public/favicon-16.png`, `favicon-32.png`, `favicon-180.png`

- [ ] **Step 1: Copy logo SVGs**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/assets"
cp "$BUNDLE/logo-light.svg" /Users/aleksand/Codis-AI-Board/ui/public/logo-light.svg
cp "$BUNDLE/logo-dark.svg"  /Users/aleksand/Codis-AI-Board/ui/public/logo-dark.svg
cp "$BUNDLE/logo-white.svg" /Users/aleksand/Codis-AI-Board/ui/public/logo-white.svg
```

- [ ] **Step 2: Copy favicon PNGs**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/assets"
cp "$BUNDLE/favicon-16.png"  /Users/aleksand/Codis-AI-Board/ui/public/favicon-16.png
cp "$BUNDLE/favicon-32.png"  /Users/aleksand/Codis-AI-Board/ui/public/favicon-32.png
cp "$BUNDLE/favicon-180.png" /Users/aleksand/Codis-AI-Board/ui/public/favicon-180.png
```

- [ ] **Step 3: Verify**

```bash
ls /Users/aleksand/Codis-AI-Board/ui/public/logo-*.svg
ls /Users/aleksand/Codis-AI-Board/ui/public/favicon-*.png
```

Expected: 3 SVGs, 3 PNGs.

- [ ] **Step 4: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/public/logo-light.svg ui/public/logo-dark.svg ui/public/logo-white.svg \
        ui/public/favicon-16.png ui/public/favicon-32.png ui/public/favicon-180.png
git commit -m "feat: add Codis logos and favicons to public assets"
```

---

## Task 3: Update index.html

**Files:**
- Modify: `ui/index.html`

- [ ] **Step 1: Replace title and meta branding**

In `ui/index.html`, replace:
```html
    <meta name="apple-mobile-web-app-title" content="Paperclip" />
    <title>Paperclip</title>
```
With:
```html
    <meta name="apple-mobile-web-app-title" content="Codis AI Board" />
    <title>Codis AI Board</title>
```

- [ ] **Step 2: Replace favicon links (inside the PAPERCLIP_FAVICON comment block)**

Replace the block between `<!-- PAPERCLIP_FAVICON_START -->` and `<!-- PAPERCLIP_FAVICON_END -->`:
```html
    <!-- PAPERCLIP_FAVICON_START -->
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <!-- PAPERCLIP_FAVICON_END -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```
With:
```html
    <!-- PAPERCLIP_FAVICON_START -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
    <!-- PAPERCLIP_FAVICON_END -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
```

- [ ] **Step 3: Update theme-color dark/light values in the inline script**

In the inline `<script>`, replace:
```js
        const darkThemeColor = "#18181b";
        const lightThemeColor = "#ffffff";
```
With:
```js
        const darkThemeColor = "#1A1A1A";
        const lightThemeColor = "#ffffff";
```

- [ ] **Step 4: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/index.html
git commit -m "feat: update index.html with Codis AI Board title and favicon"
```

---

## Task 4: Add @font-face declarations to index.css

**Files:**
- Modify: `ui/src/index.css` — prepend font-face declarations

- [ ] **Step 1: Add @font-face block at the top of index.css, before the @import line**

In `ui/src/index.css`, insert this block **before** the `@import "tailwindcss";` line:

```css
/* ---- Codis brand webfonts: e-Ukraine ----------------------------
   Files served from /fonts/ (Vite public directory)
------------------------------------------------------------------- */
@font-face { font-family:"e-Ukraine"; font-weight:100; font-style:normal; font-display:swap; src:url("/fonts/e-Ukraine-Thin.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine"; font-weight:200; font-style:normal; font-display:swap; src:url("/fonts/e-Ukraine-UltraLight.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine"; font-weight:300; font-style:normal; font-display:swap; src:url("/fonts/e-Ukraine-Light.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine"; font-weight:400; font-style:normal; font-display:swap; src:url("/fonts/e-Ukraine-Regular.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine"; font-weight:500; font-style:normal; font-display:swap; src:url("/fonts/e-Ukraine-Medium.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine"; font-weight:700; font-style:normal; font-display:swap; src:url("/fonts/e-Ukraine-Bold.otf") format("opentype"); }

@font-face { font-family:"e-Ukraine Head"; font-weight:100; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-Thin.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine Head"; font-weight:200; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-UltraLight.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine Head"; font-weight:300; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-Light.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine Head"; font-weight:400; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-Regular.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine Head"; font-weight:500; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-Medium.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine Head"; font-weight:700; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-Bold.otf") format("opentype"); }
@font-face { font-family:"e-Ukraine Logo"; font-weight:400; font-style:normal; font-display:swap; src:url("/fonts/e-UkraineHead-LOGO.otf") format("opentype"); }

```

- [ ] **Step 2: Verify the file starts with @font-face declarations**

```bash
head -5 /Users/aleksand/Codis-AI-Board/ui/src/index.css
```

Expected: starts with `/* ---- Codis brand webfonts`.

- [ ] **Step 3: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/src/index.css
git commit -m "feat: add e-Ukraine @font-face declarations to index.css"
```

---

## Task 5: Remap CSS variables — light theme

**Files:**
- Modify: `ui/src/index.css` — update `:root` block

- [ ] **Step 1: Add Codis brand tokens to `:root` block**

In `ui/src/index.css`, inside the `:root { ... }` block, replace the entire content with the following (preserving `color-scheme: light;` at top and the chip-match vars at bottom):

Find the `:root {` block and add these lines **after** `color-scheme: light;` and **before** `--radius:`:

```css
  /* ---- Codis brand colors ------------------------------------ */
  --codis-orange:       #E76033;
  --codis-orange-600:   #D14E22;
  --codis-orange-100:   #FCE5DA;
  --codis-orange-50:    #FEF3EE;
  --codis-purple:       #7828C8;
  --codis-purple-100:   #EAD6F9;
  --codis-black:        #1A1A1A;
  --codis-white:        #FFFFFF;

  /* ---- Neutral scale ----------------------------------------- */
  --gray-50:  #FAFAFA; --gray-100: #F4F4F5; --gray-200: #E4E4E7;
  --gray-300: #D4D4D8; --gray-400: #A1A1AA; --gray-500: #71717A;
  --gray-600: #52525B; --gray-700: #3F3F46; --gray-800: #27272A; --gray-900: #18181B;

  /* ---- Semantic ---------------------------------------------- */
  --success: #16A34A; --success-bg: #DCFCE7;
  --warning: #F59E0B; --warning-bg: #FEF3C7;
  --danger:  #DC2626; --danger-bg:  #FEE2E2;
  --info:    #2563EB; --info-bg:    #DBEAFE;

  /* ---- Font families ----------------------------------------- */
  --font-sans:    "e-Ukraine", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-display: "e-Ukraine Head", "e-Ukraine", system-ui, sans-serif;
  --font-logo:    "e-Ukraine Logo", "e-Ukraine Head", sans-serif;

  /* ---- Codis shadows ----------------------------------------- */
  --shadow-xs: 0 1px 2px rgba(20,20,20,.04);
  --shadow-sm: 0 1px 3px rgba(20,20,20,.06), 0 1px 2px rgba(20,20,20,.04);
  --shadow-md: 0 4px 12px rgba(20,20,20,.06), 0 2px 4px rgba(20,20,20,.04);
  --shadow-lg: 0 12px 32px rgba(20,20,20,.10), 0 4px 8px rgba(20,20,20,.04);
  --shadow-orange: 0 8px 24px rgba(231,96,51,.25);
```

- [ ] **Step 2: Remap shadcn primary vars**

In the same `:root` block, change:
```css
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
```
To:
```css
  --primary: #E76033;
  --primary-foreground: #FFFFFF;
```

- [ ] **Step 3: Remap ring**

Change:
```css
  --ring: oklch(0.708 0 0);
```
To:
```css
  --ring: rgba(231, 96, 51, 0.20);
```

- [ ] **Step 4: Remap accent**

Change:
```css
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
```
To:
```css
  --accent: #FEF3EE;
  --accent-foreground: #D14E22;
```

- [ ] **Step 5: Remap radii**

Change:
```css
  --radius: 0;
```
To:
```css
  --radius: 0.625rem;
```

In the `@theme inline` block at top of file, change:
```css
  --radius-lg: 0px;
  --radius-xl: 0px;
```
To:
```css
  --radius-lg: 0.875rem;
  --radius-xl: 1.25rem;
```

- [ ] **Step 6: Remap sidebar primary**

Change:
```css
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
```
To:
```css
  --sidebar-primary: #E76033;
  --sidebar-primary-foreground: #FFFFFF;
```

Change:
```css
  --sidebar-ring: oklch(0.708 0 0);
```
To:
```css
  --sidebar-ring: rgba(231, 96, 51, 0.20);
```

- [ ] **Step 7: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/src/index.css
git commit -m "feat: remap CSS variables to Codis brand tokens (light theme)"
```

---

## Task 6: Remap CSS variables — dark theme + base font

**Files:**
- Modify: `ui/src/index.css` — update `.dark` block and `@layer base`

- [ ] **Step 1: Update sidebar vars in .dark block**

In the `.dark { ... }` block, change:
```css
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
```
To:
```css
  --sidebar-primary: #E76033;
  --sidebar-primary-foreground: #FFFFFF;
```

Change:
```css
  --sidebar-ring: oklch(0.439 0 0);
```
To:
```css
  --sidebar-ring: rgba(231, 96, 51, 0.20);
```

- [ ] **Step 2: Add base font rules to @layer base**

In `ui/src/index.css`, inside the `@layer base { ... }` block, add after the `* { @apply border-border; }` rule:

```css
  body {
    font-family: var(--font-sans);
  }
  h1, h2 {
    font-family: var(--font-display);
  }
```

- [ ] **Step 3: Verify CSS compiles**

```bash
cd /Users/aleksand/Codis-AI-Board && pnpm typecheck 2>&1 | tail -5
```

Expected: no type errors (CSS changes don't affect TS).

- [ ] **Step 4: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/src/index.css
git commit -m "feat: remap dark theme vars and set e-Ukraine as base font"
```

---

## Task 7: Update visible Paperclip brand strings

**Files:**
- Modify: `ui/src/context/BreadcrumbContext.tsx`
- Modify: `ui/src/pages/InviteLanding.tsx`
- Modify: `ui/src/pages/CliAuth.tsx`

- [ ] **Step 1: Update app name in document title**

In `ui/src/context/BreadcrumbContext.tsx`, change:
```ts
  const parts = [...pageParts, ...companyPart, "Paperclip"];
```
To:
```ts
  const parts = [...pageParts, ...companyPart, "Codis AI Board"];
```

- [ ] **Step 2: Update user-facing strings in InviteLanding**

In `ui/src/pages/InviteLanding.tsx`, make these replacements:

```
"That email and password did not match an existing Paperclip account."
→ "That email and password did not match an existing Codis AI Board account."
```
(appears twice — replace both)

```
"this Paperclip company"
→ "this company"
```

```
"You've been invited to join Paperclip"
→ "You've been invited to join Codis AI Board"
```

```
"Set up Paperclip"
→ "Set up Codis AI Board"
```

```
"Create your Paperclip account first."
→ "Create your Codis AI Board account first."
```

```
"Paperclip board"
→ "Codis AI Board"
```

```
"Start with a Paperclip account."
→ "Start with a Codis AI Board account."
```

- [ ] **Step 3: Update CLI auth page**

In `ui/src/pages/CliAuth.tsx`, change:
```tsx
        <h1 className="text-xl font-semibold">Approve Paperclip CLI access</h1>
```
To:
```tsx
        <h1 className="text-xl font-semibold">Approve Codis CLI access</h1>
```

- [ ] **Step 4: Run tests to verify no regressions**

```bash
cd /Users/aleksand/Codis-AI-Board && pnpm test:run 2>&1 | tail -20
```

Expected: test suite passes. Note: `BreadcrumbContext.test.tsx` has snapshots that reference "Paperclip" — update them:

```bash
cd /Users/aleksand/Codis-AI-Board && pnpm test:run -- --update-snapshots 2>&1 | tail -10
```

- [ ] **Step 5: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add ui/src/context/BreadcrumbContext.tsx ui/src/pages/InviteLanding.tsx ui/src/pages/CliAuth.tsx
git commit -m "feat: replace visible Paperclip brand strings with Codis AI Board"
```

---

## Task 8: Install codis-design skill

**Files:**
- Create: `skills/codis-design/` directory tree

- [ ] **Step 1: Create skill directory structure**

```bash
mkdir -p /Users/aleksand/Codis-AI-Board/skills/codis-design/assets
mkdir -p /Users/aleksand/Codis-AI-Board/skills/codis-design/fonts
mkdir -p /Users/aleksand/Codis-AI-Board/skills/codis-design/ui_kits/sitam
mkdir -p /Users/aleksand/Codis-AI-Board/skills/codis-design/preview
```

- [ ] **Step 2: Copy SKILL.md and rename**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project"
cp "$BUNDLE/SKILL.md" /Users/aleksand/Codis-AI-Board/skills/codis-design/SKILL.md
```

- [ ] **Step 3: Update SKILL.md paths to point to skill-relative files**

Open `skills/codis-design/SKILL.md` and change the line:
```
Read the README.md file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/codis-app/`).
```
To:
```
Read the BRANDBOOK.md file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/sitam/`).
```

- [ ] **Step 4: Copy core design files**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project"
cp "$BUNDLE/colors_and_type.css"  /Users/aleksand/Codis-AI-Board/skills/codis-design/
cp "$BUNDLE/SITAM_PRODUCT.md"     /Users/aleksand/Codis-AI-Board/skills/codis-design/
cp "$BUNDLE/uploads/BRANDBOOK.md" /Users/aleksand/Codis-AI-Board/skills/codis-design/
```

- [ ] **Step 5: Copy assets (SVG logos, favicons)**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/assets"
cp "$BUNDLE/"*.svg /Users/aleksand/Codis-AI-Board/skills/codis-design/assets/
cp "$BUNDLE/"*.png /Users/aleksand/Codis-AI-Board/skills/codis-design/assets/
```

- [ ] **Step 6: Copy font files**

```bash
cp /Users/aleksand/Codis-AI-Board/ui/public/fonts/*.otf \
   /Users/aleksand/Codis-AI-Board/skills/codis-design/fonts/
```

- [ ] **Step 7: Copy SITAM UI kit components**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/ui_kits/sitam"
cp "$BUNDLE/"*.jsx "$BUNDLE/"*.html "$BUNDLE/README.md" \
   /Users/aleksand/Codis-AI-Board/skills/codis-design/ui_kits/sitam/
```

- [ ] **Step 8: Copy preview cards**

```bash
BUNDLE="/var/folders/x0/8kmd86g13gv3wxyw89hkyt740000gn/T/tmp.CHTOoXqE77/extracted/codis-design-system/project/preview"
cp "$BUNDLE/"*.html /Users/aleksand/Codis-AI-Board/skills/codis-design/preview/
```

- [ ] **Step 9: Commit**

```bash
cd /Users/aleksand/Codis-AI-Board
git add skills/codis-design/
git commit -m "feat: install codis-design skill with brand tokens, fonts, and SITAM UI kit"
```

---

## Task 9: Verify in browser

- [ ] **Step 1: Start dev server**

```bash
cd /Users/aleksand/Codis-AI-Board && pnpm dev
```

- [ ] **Step 2: Open the app and verify**

Check:
- [ ] Page title in browser tab shows "Codis AI Board"
- [ ] Favicon is the Codis orange favicon (not Paperclip paperclip)
- [ ] Body text renders in e-Ukraine font (inspect element → font-family)
- [ ] Primary buttons are Codis orange (#E76033), not black
- [ ] Cards have rounded corners (14px), not sharp
- [ ] Focus rings glow orange, not grey
- [ ] Dark mode: orange primary preserved

- [ ] **Step 3: Final commit if any fixes needed**

```bash
cd /Users/aleksand/Codis-AI-Board
git add -p
git commit -m "fix: design system tweaks from browser verification"
```

---

## Self-review

**Spec coverage:**
- ✅ CSS vars remapped (Tasks 5, 6)
- ✅ e-Ukraine fonts (Tasks 1, 4)
- ✅ Logo + favicon assets (Tasks 2, 3)
- ✅ Brand strings (Task 7)
- ✅ codis-design skill (Task 8)
- ✅ Dark theme (Task 6)
- ✅ Radii (Task 5 step 5)

**Out of scope (per spec):**
- `paperclip-*` CSS class names — unsafe, not touched
- Tailwind @theme utility classes — deferred (Approach C)
- SITAM screens in AI Board — different product
- shadcn component rewrites — not needed, tokens remap handles it
