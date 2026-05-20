# Codis Design System

A reusable design system for **Codis Platform** — an asset / property management software ecosystem built by **CodisLab** ([codislab.com](https://codislab.com)).

> **Mission (translated from Ukrainian):** *"We boost the efficiency of those who improve people's lives."*
> **Tagline / motto:** Підвищуємо ефективність тих, хто покращує життя людей!
> **Contact:** welcome@codislab.com

---

## What Codis is

Codis Platform is **B2B asset-management software** used by communities, telecom operators, utilities, and organizations to digitize and track physical assets — base stations, communal property, equipment, vehicles. Built as **autonomous modules combined into one information ecosystem** (M01–M12), so customers can choose their scope of implementation.

The canonical reference build in this design system is **SITAM — System of Information-Technological Asset Management**, a regulated-industry deployment that pairs the asset registry with risk, audit, and scope-policy modules. Modules represented:

- **M01** Asset registry · digital passports with FSM lifecycle
- **M02** Access requests · time-bound, dual-approved
- **M03** Risk register · CIA × probability scoring, treatment workflows
- **M04** Audit log · append-only, hash-chained
- **M05** Platform admin
- **M06** Reports / dashboards
- **M07** Users & org
- **M08** Dictionaries · Data Quality Score (DQS)
- **M09** Locations · OT/Purdue zoning
- **M10** Scope engine · 8-axis RBAC enforced at row level
- **M11** Integrations · AD/LDAP, SCADA, EDS/КЕП
- **M12** Emergency / break-glass access

The product is **utilitarian, data-dense and operations-focused** — closer to a CMMS/EAM with GRC bolted on than to a consumer SaaS app. The brand cuts that seriousness with a confident orange palette and a playful logo "eye" detail.

## Sources

This design system was built from the following materials provided by the user:

- `uploads/BRANDBOOK.md` — official brand guide (Ukrainian, v1.0). Mirrored at `assets/BRANDBOOK-original.md`.
- `uploads/logo - codis - light theme.svg` — wordmark for light backgrounds.
- `uploads/logo - codis - dark theme.svg` — wordmark for dark backgrounds.
- `uploads/logo - codis - white.svg` — white wordmark for orange/photo backgrounds.
- `uploads/Maskot_Codis.svg` — **⚠ file is an empty SVG shell** (only references a missing `<image id="img1">`). The actual mascot art was not provided. See *Caveats*.
- `uploads/ficon 180.png`, `ficon - 32.png`, `ficon - 16.png` — favicons (the orange "two-eyes" icon).
- `uploads/Frame 15.png`, `Frame 18.png` — exported social-card / wordmark presentations on dark and light fields.
- Public website: [codislab.com](https://codislab.com) (used to extract product copy, English version).

No codebase, Figma, or production screenshots were provided, so UI-kit designs in `ui_kits/` are **plausible reconstructions** of a Codis-branded asset-management interface, not 1:1 recreations of the live product. Treat them as a brand-faithful starting point.

---

## CONTENT FUNDAMENTALS

The brand operates in **two languages — Ukrainian (primary) and English** — and the voice should feel consistent in both.

### Voice
- **Confident and operational.** Codis sells to operators, dispatchers, asset managers — people who run things. Copy should respect their time.
- **Outcome-led, not feature-led.** Lead with the time saved, the visibility gained, the work order generated. Numbers help.
- **Warm without being playful.** The orange and the rounded eye make the brand approachable; the words stay grounded.
- **Practical, lightly aspirational.** The motto "We boost the efficiency of those who improve people's lives" sets the ceiling — don't go higher than that. Avoid corporate-bombast, hype, exclamation marks.

### Person & address
- **English:** "you" — direct, neutral B2B.
- **Ukrainian:** Ви (formal/polite plural), as in BRANDBOOK and website.
- **First-person plural ("we") sparingly**, when speaking from Codis as a company.

### Tone examples (lifted verbatim from codislab.com)

- "Asset management software helps organizations maximize asset utilization while minimizing the cost of owning and using assets."
- "Your business is unique, and so is your stuff. That's why we've made our technology highly flexible to cater to your specific items and use cases — no need to change the way you work."
- "It took Vicky 7 minutes to prepare, although it took three workers about a week to implement such a sampling system."

Notice: short clauses, customer-named case studies, concrete time savings, no buzzwords.

### Casing
- **Sentence case** for body, headlines, navigation, buttons. (`Add asset`, not `Add Asset`.)
- **UPPERCASE with letter-spacing** is reserved for tiny eyebrow labels (section taglines, status pills).
- Product / module names use **Title Case**: *Asset Passport*, *Service Desk*, *Inventory*, *Work Orders*.

### Numbers & units
- Use digits even for small numbers when about quantities (`7 minutes`, `10 towers`, `3 workers`). Spell out only in narrative prose.
- Prefer concrete metrics over adjectives ("72% faster" beats "much faster").

### Punctuation & symbols
- Use real em-dashes ( — ) and curly quotes ( "" '' ).
- The middle-dot ( · ) appears as a soft separator on the website — fine to reuse.
- Bullets use a regular `•` or `–`. No emoji bullets.

### Emoji
- **Not part of the brand.** None on the website, none in BRANDBOOK except as a "❌ don't" marker. Don't introduce them.

### What to avoid
- AI-saas tropes: "Supercharge", "Unleash", "Effortless", "Game-changer".
- Long superlative chains. The brand is matter-of-fact.
- Stacking metaphors. One image per sentence.
- Exclamation points outside of the motto.

---

## VISUAL FOUNDATIONS

### Palette
The palette is **strict and small**: orange + black + white, with grey for structure and a single purple accent reserved for highlights. Per BRANDBOOK there is an explicit hierarchy — *orange first, purple last*. See `colors_and_type.css` for tokens.

| Role | Token | Hex |
|---|---|---|
| Primary | `--codis-orange` | `#E76033` |
| Neutral dark | `--codis-black` | `#1A1A1A` |
| Background | `--codis-white` | `#FFFFFF` |
| Secondary / dividers | `--codis-grey-500` | `#71717A` |
| Accent (rare) | `--codis-purple` | `#7828C8` |

The neutral grey is **warm-leaning** (zinc family, not slate) so it sits well next to the orange.

### Typography
- Brand face: **e-Ukraine** (free Ukrainian government typeface by ITC). Two families ship in `fonts/`:
  - `e-Ukraine` — body / UI text (Thin → Bold).
  - `e-Ukraine Head` — display / headlines (Thin → Bold) plus a `LOGO` cut for wordmark contexts.
- Token mapping: `--font-sans` → e-Ukraine, `--font-display` → e-Ukraine Head, `--font-logo` → e-Ukraine Logo.
- Headings are tight (line-height 1.15–1.3, slightly negative tracking). Body is a comfortable 1.5.
- All-caps appears only in micro-labels with `+0.08em` tracking.

### Spacing & rhythm
- 4-point grid (`--space-1` … `--space-20`). Page sections breathe at 64–80 px on desktop.
- Card padding is generous (24–32 px) so the dense data tables don't feel claustrophobic.

### Backgrounds & surfaces
- **Default surface is white**, with a tinted `--bg-muted` (#FAFAFA) for grouping cards and an `--bg-subtle` for inset chrome.
- **Hero blocks** use either solid `--codis-orange` or a flat black field; **never gradients**. The brandbook is explicit: brand colours stay flat.
- **No photographic backgrounds** are used in the supplied materials. If imagery is introduced it should be **warm-toned, slightly desaturated, and editorial** — utility/asset photography (cell towers, buildings, equipment) — never stocky tech-glow.
- **No textures, no patterns, no halftones.** The favicon's geometric eye-glyph is the closest thing to a "motif" — repeat it as a graphic device sparingly (oversized, single-colour).

### Iconography
- See `ICONOGRAPHY` section below.

### Borders & strokes
- 1 px borders in `--border` (`#E4E4E7`).
- Buttons & inputs use **2 px** outline focus rings via `--ring` (orange at 20% alpha).
- No double borders, no inset highlights.

### Corner radius
- The favicon uses a **squircle (≈30 % of side)**. Cards and primary buttons settle at `--radius-md` (10 px) → `--radius-lg` (14 px) — confidently rounded but not pill-soft.
- Pills (status, eyebrow tags) use `--radius-full`.
- Inputs: `--radius-md`.

### Shadows / elevation
- Three steps only: `--shadow-sm` (resting cards), `--shadow-md` (hovered/floating), `--shadow-lg` (modals, popovers).
- A signature `--shadow-orange` exists for primary CTAs — a soft 8/24 orange glow at 25 % alpha. Use on hover of the primary button only.
- No inner shadows. No neumorphism.

### Animation
- Default: 200 ms `ease-out` (`cubic-bezier(.2,.7,.2,1)`). Slow: 320 ms. Fast: 120 ms.
- Micro-interactions are **subtle** — colour fades, 1 px translate on press, never bounce / spring physics. The brand is operational; don't make it springy.
- No looping ambient animations. The favicon-eye is static.

### States
- **Hover:** background fill steps one shade darker (`--accent-hover` for orange surfaces, `--surface-hover` for neutrals), or 4 % overlay on transparent items.
- **Press:** `transform: translateY(1px)` and the next shade darker.
- **Focus-visible:** 3 px orange ring (`--ring`) — never browser-default outline.
- **Disabled:** `opacity: 0.5`, no pointer events.

### Transparency & blur
- Reserved for **overlays only** — modal scrims (`rgba(20,20,20,.45)`), popover backdrops on mobile.
- No `backdrop-filter: blur()` over content. The brand prefers solid surfaces.

### Layout rules
- **Container max-width 1280 px** for marketing; 1440 px for app shell.
- **Sticky top app-bar** (64 px), optional left sidebar (256 px).
- Logo lives in the **top-left**, per brandbook rule.
- **Data tables** are the most common layout primitive. They use zebra-free rows, 1 px dividers, and right-aligned numerics.

### Cards
- White surface, 1 px border (`--border`), 14 px radius, `--shadow-sm` resting → `--shadow-md` hover.
- Padding 24 px. Header row: title (h4) + actions on the right.
- **No coloured left-border accent stripes.** The brand uses category dots or pills inside the card, not edge-stripes.

---

## ICONOGRAPHY

### What the brand uses
The brandbook does not specify an icon set. The product is utilitarian (asset records, work orders, maps, filters), so it needs a comprehensive system.

### Our choice — Lucide (CDN)
We adopt **[Lucide](https://lucide.dev)** as the default icon set because:
- 1.5 px stroke, rounded line caps — visually consistent with the rounded-but-grounded logo.
- Free, MIT-licensed, ~1500 icons covering everything an asset-management UI needs (map-pin, building, wrench, qr-code, calendar, filter, package).
- CDN-available so no asset bundling needed for prototypes: `https://unpkg.com/lucide@latest`.

**This is a substitution flag.** If Codis has its own icon library, drop the SVGs into `assets/icons/` and document the names here.

### Usage rules
- Default size: **20 px** in app chrome, **16 px** inline with body text, **24 px** on touch targets.
- Stroke width stays at the Lucide default (1.5 px) — don't mix weights.
- Icon colour follows text: `currentColor`. Active / selected uses `--accent`.
- **Don't fill icons** unless there's a state distinction (e.g. star vs. starred). The brand reads as line-icons.

### Logo as icon
- The orange-square favicon (`assets/favicon-180.png` or its SVG sibling) is the only "iconified logo" — use it as the app icon on tabs, Slack unfurls, mobile home screens, and at small sizes (≤ 32 px) where the wordmark is illegible.
- Never re-draw the favicon glyph at non-standard angles or recolour it.

### Emoji
- **Do not** use emoji as icons in product UI or marketing copy. The brandbook explicitly excludes them. The only emoji in source materials is the ❌ glyph used to mark "don't do this" in the brandbook itself.

### Unicode characters as icons
- Acceptable in tables / dense lists for arrows (← → ↑ ↓), check (✓), em-dash for "no value" (—), bullet (•). Anything more decorative goes through Lucide.

---

## Index — what's in this design system

Root files:
- `README.md` — this document.
- `colors_and_type.css` — all CSS variables (colors, type, spacing, radii, shadows, motion). Single import for any prototype.
- `SKILL.md` — Agent-Skill manifest so this directory can be dropped into Claude Code.

Folders:
- `assets/` — logos (`logo-light.svg`, `logo-dark.svg`, `logo-white.svg`), favicons (16/32/180), original brandbook (`BRANDBOOK-original.md`), marketing frames (`frame-15.png`, `frame-18.png`), and `mascot.svg` (⚠ empty file — see Caveats).
- `preview/` — 17 design-system cards: colour palettes, type specimens, spacing/radii/shadow tokens, button/form/badge/card/table/logo/favicon/icon previews.
- `ui_kits/sitam/` — JSX recreation of the SITAM asset-management workspace: Sidebar, TopBar, Dashboard, AssetList, AssetPassport (with FSM stepper, CIA risk score, scope chips, audit log, evidence), RiskRegister, ScopeMatrix (8-axis RBAC), WorkOrders + Atoms.

### Caveats up-front
- The mascot SVG provided is empty (it references a missing embedded image), so no mascot is shown in this system. **Please re-upload `Maskot_Codis.svg` with the actual artwork.**
- ~~e-Ukraine font files were not supplied~~ ✓ now installed in `fonts/` (both *e-Ukraine* and *e-Ukraine Head* families).
- No production codebase or Figma was provided, so the UI kit is a brand-faithful reconstruction. **A codebase or screenshots of the live Codis app would let us tighten this to pixel-perfect.**
