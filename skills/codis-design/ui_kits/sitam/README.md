# SITAM — UI Kit

A high-fidelity visual recreation of **SITAM (System of Information-Technological Asset Management)** — Codis Platform's regulated-industry build pairing the asset registry (M01) with risk (M03), audit (M04), and scope-policy (M10) modules.

> **No production codebase or Figma was provided.** This is a brand-faithful reconstruction, not a 1:1 recreation. Replace with real components when source is available.

## What's covered

- `index.html` — interactive click-thru shell (sidebar, top bar, tabs)
- `Sidebar.jsx` — module-grouped nav (M01–M12)
- `TopBar.jsx` — search + actions + user menu
- `DashboardScreen.jsx` — phase banner, scope chips, KPIs vs targets, audit feed
- `AssetListScreen.jsx` — filterable register, immutable IDs, CIA + risk score
- `AssetPassportScreen.jsx` — passport with FSM stepper, CIA × probability, DQS, JSONB attrs, audit tab, evidence
- `RiskRegisterScreen.jsx` — M03 scenarios, treatment matrix, CISO acceptance
- `ScopeMatrixScreen.jsx` — M10 8-axis × 13-role enforcement matrix
- `WorkOrdersScreen.jsx` — kanban-style work order list
- `FsmStepper.jsx` · `RiskScore.jsx` — passport sub-components
- `Atoms.jsx` — Button, Badge, Field, IconBtn, Card, AssetIdMono, ScopeChip, Avatar, Eyebrow

## Modules represented

The kit implements **M01 (Asset registry)**, **M03 (Risk register)**, **M04 (Audit log, surfaced in the passport)**, **M06 (Dashboard / reports)**, and **M10 (Scope engine)** as fully-styled screens. Other modules (M02, M05, M07–M09, M11–M12) are stubbed in the sidebar and resolve to a placeholder.

## To extend

When real source arrives:
1. Replace `Atoms.jsx` colors with tokens from `colors_and_type.css`.
2. Drop the actual icon set into `assets/icons/` and swap Lucide.
3. Replace mock data in screens with API shapes.
