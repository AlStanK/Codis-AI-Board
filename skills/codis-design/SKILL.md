---
name: codis-design
description: Use this skill to generate well-branded interfaces and assets for Codis (the asset/property-management platform by CodisLab, codislab.com), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the BRANDBOOK.md file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/sitam/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key guardrails for Codis:
- Orange (#E76033) is the primary, used sparingly for emphasis. Purple (#7828C8) is reserved for rare accents.
- Typography is **e-Ukraine** (body/UI) and **e-Ukraine Head** (display), shipped in `fonts/`. Use `--font-sans`, `--font-display`, `--font-logo` from `colors_and_type.css`.
- No emoji in UI or marketing copy.
- No gradients on brand colours; surfaces stay flat.
- Sentence case everywhere except short uppercase eyebrow labels.
- Iconography defaults to **Lucide** at 1.5 px stroke (substituted — no native Codis icon set was provided).
