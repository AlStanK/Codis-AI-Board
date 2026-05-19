# SITAM — Product brief

> **SITAM** = Реєстр інформаційних активів ОГТСУ.
> Canonical product name in contract, UI, API, DB, logs and tech docs.
> *AIR* is a future marketing alias only — never used as the system name.

CodisLab is the implementer. ОГТСУ (Operator of Ukraine's Gas Transmission System) is the customer — a critical-infrastructure operator. SITAM is an **on‑premises, air-gap-ready** registry of information assets with built-in IAM, risk management, append-only audit, scope-based data visibility (RLS), and integrations.

---

## What it is, in one paragraph
A high-assurance asset registry where every information asset (hardware, OT/ICS, software, data store, identity, AI system, etc.) is tracked through an 8-state lifecycle, scored for risk via a sacred invariant, classified for CIA, and surrounded by an append-only audit trail. Access is layered: **RBAC says what you can do, Scope says which data you can do it on, PostgreSQL RLS enforces it.**

---

## Modules (M01–M12)

| Code | Module | Purpose |
|---|---|---|
| **M01** | Asset Registry | Asset passport, FSM, DQS, dependencies, evidence |
| **M02** | IAM & Access | RBAC, access requests, approvals, sessions, MFA |
| **M03** | Risk Management | RiskScenario, treatment plans, acceptance, residual risk |
| **M04** | Audit & Compliance | Append-only AuditLog, RLS, evidence packages, exports |
| **M05** | Platform Admin | Config, backup/restore, monitoring, air-gapped updates |
| **M06** | Reporting & Analytics | CISO dashboards, KPIs, scheduled reports, PDF/XLSX |
| **M07** | Users & Org | Users, roles, org tree, delegation, break-glass |
| **M08** | Settings & Dictionaries | Taxonomy, CIA/BIA scales, threat/vuln catalogs, policies |
| **M09** | Locations & OT zoning | Location hierarchy + Purdue zones (L0–L5, L3.5, OT-DMZ) |
| **M10** | Scope Engine | ORG / LOCATION / OWNER / OT / RISK / DOMAIN / FIELD / EMERGENCY |
| **M11** | Integrations | AD/LDAP + CSV/XLSX (Phase 1); ITop read-only (Phase 2) |
| **M12** | Notifications & Escalation | Templates, channels, SLA/DQS/OT triggers, delivery audit |

Phase 1 ships M01–M05, M07–M10 + minimal M06/M12. Integrations limited to AD/LDAP and CSV/XLSX. ITop is Phase 2.

---

## Sacred invariants (do not violate in any UI mockup)

| ID | Rule |
|---|---|
| **INV-01** | On‑prem / air‑gapped-ready. No cloud SaaS dependencies. |
| **INV-02** | `risk_score = probability × max(C, I, A) × 5` |
| **INV-03** | `probability ∈ [0.0, 1.0]`, `C/I/A ∈ {1..5}`, `risk_score ∈ [0, 25]` |
| **INV-04** | `risk_score` is **never** edited manually — DB triggers compute it |
| **INV-05** | AuditLog is append-only — UPDATE/DELETE forbidden, even for SYSADMIN |
| **INV-06** | FSM has exactly **8 states**; transitions are logged |
| **INV-07** | RBAC = actions, Scope = data, RLS enforces at the DB |
| **INV-08** | One asset = one primary `location_id`; multi-environment via attrs/relations |
| **INV-09** | Every asset has Global Dimensions + `specific_attributes` JSONB + DQS |

---

## FSM — 8 states of an asset

```
IDENTIFICATION → CLASSIFICATION → OWNER_ASSIGNMENT → RISK_ASSESSMENT
   → RISK_MANAGEMENT → ACTIVE_MAINTENANCE ⇄ ANNUAL_REVIEW → ARCHIVED
```

Each transition emits an `ASSET_STATE_CHANGED` audit event with `actor_id`, before/after, timestamps. Illegal transitions are blocked AND logged as `ASSET_STATE_CHANGE_DENIED`.

---

## Asset identity

- Technical PK: `id UUID` (internal FKs)
- Business ID: `asset_id VARCHAR(30)`, **UNIQUE, immutable**, regex `^ASSET-\d{8}-\d{5}$`
- Example: `ASSET-20260420-00001`

The business ID is what users read, copy, search and quote in tickets. The UUID is invisible.

---

## Roles (canonical set)

`SYSADMIN` · `SECURITY_ADMIN` · `CISO` · `DATA_OWNER` · `SYSTEM_OWNER` · `RISK_MANAGER` · `AUDITOR` · `ANALYST` · `INTEGRATION_ADMIN` · `LOCATION_ADMIN` · `DICTIONARY_ADMIN` · `USER_ADMIN` · `VIEWER`

**Critical SoD rule:** SYSADMIN has *no* business-data access by default; only break-glass (dual-approved, time-boxed, fully audited) grants temporary visibility.

---

## Scope Engine (M10) — the visibility model

Eight scope axes, AND-combined per request:

| Scope | Constrains visibility by… |
|---|---|
| **ORG_SCOPE** | Org tree node (e.g. dept and below) |
| **LOCATION_SCOPE** | Location subtree (DC, region, site) |
| **OWNER_SCOPE** | Assets where user is `owner_id` |
| **OT_SCOPE** | OT/ICS assets (default-deny) |
| **RISK_SCOPE** | Risk details (threat/vuln/probability) |
| **DOMAIN_SCOPE** | Asset domain (EQUIPMENT, DATABASE, etc.) |
| **FIELD_SCOPE** | Sensitive technical fields (IP, VLAN, serial, OT zone) |
| **EMERGENCY_SCOPE** | Break-glass — temporary, dual-approved, audited |

**Field masking rule:** IP / network_segment / VLAN / serial / OT zone / risk details / raw_payload / audit `diff_json` are masked unless the role has the matching FIELD/RISK scope. Owner contacts (name, position, corporate email/phone) are **never masked**, but only visible if the asset itself is visible.

---

## Risk model (M03)

```
risk_score = probability × max(C, I, A) × 5
            ↑              ↑
     0.0..1.0         each ∈ {1..5}
```

Always 0…25. Zones: **Low** (0–4), **Medium** (5–9), **High** (10–14), **Critical** (15–25).

`RiskTreatmentPlan` types: `MITIGATE` · `AVOID` · `TRANSFER` · `ACCEPT`. `ACCEPT` for HIGH/CRITICAL/OT requires CISO or SECURITY_ADMIN approval; without it, ACCEPT is unavailable.

---

## DQS — Data Quality Score

`DQS = filled_mandatory_fields / total_mandatory_fields × 100%`

| Criticality | Min DQS | Action on breach |
|---|---|---|
| Critical | ≥ 95% | **Block** transition into ACTIVE_MAINTENANCE |
| OT/ICS | ≥ 95% | Treated as Critical |
| High | ≥ 85% | Warning + DataQualityIssue task |
| Medium / Low | ≥ 70% | Weekly report |

---

## Asset taxonomy (domains)

`EQUIPMENT` · `INFRASTRUCTURE` · `CYBER_PHYSICAL` · `DATABASE` · `SOFTWARE` · `IT_SERVICE` · `STORAGE` · `IDENTITY` · `AI_SYSTEMS` · `ORGANIZATION` · `LOCATION`

Domain-specific fields live in `specific_attributes JSONB`, validated by JSON schemas managed in M08.

---

## Audit catalogue (sample event codes)

`ASSET_CREATED` · `ASSET_UPDATED` · `ASSET_STATE_CHANGED` · `ASSET_STATE_CHANGE_DENIED` · `ASSET_OWNER_ASSIGNED` · `ASSET_RELATIONSHIP_UPDATED` · `RISK_CREATED` · `RISK_SCORE_CALCULATED` · `RISK_ACCEPTED` · `LOGIN_SUCCESS` · `LOGIN_FAILED` · `ACCESS_REQUESTED` · `ACCESS_APPROVED` · `ACCESS_REVOKED` · `BREAK_GLASS_STARTED` · `BREAK_GLASS_ENDED` · `RLS_POLICY_APPLIED` · `SCOPE_BYPASS_ATTEMPT` · `REPORT_EXPORTED` · `EVIDENCE_PACKAGE_CREATED` · `IMPORT_STARTED` · `IMPORT_COMPLETED` · `IMPORT_FAILED` · `BACKUP_COMPLETED` · `RESTORE_DRILL_COMPLETED` · `OFFLINE_UPDATE_APPLIED` · `OT_SCOPE_GRANTED` · `OT_SCOPE_REVOKED` · `MFA_POLICY_UPDATED` · `SOD_POLICY_VIOLATION` …

Every event carries: `actor_id`, `action_code`, `entity_type`, `entity_id`, `before/after/diff_json`, `ip`, `user_agent`, `correlation_id`, `source_system_id`.

---

## NFR targets (for any responsiveness mockups)

p50 ≤ 200ms · p95 ≤ 500ms · p99 ≤ 1000ms · dashboard initial load ≤ 2s · search 10k ≤ 500ms · search 100k ≤ 1s · export 10k XLSX ≤ 60s · MVP availability ≥ 99% · RTO ≤ 4h · RPO ≤ 24h · TLS 1.2+.

---

## Source documents

Full Ukrainian-language sources live in `docs/`:
- `00_SITAM_Index.md` — package index + traceability
- `01_SITAM_Technical_Requirements.md` — v2.4 Final, full FR/KPI/acceptance
- `02_SITAM_Appendix_Business_Processes.md` — L1–L2 BP + Taxonomy
- `03_SITAM_SOW_Microservices.md` — SOW v1.3
- `04_SITAM_Solution_Design.md` — microservices architecture
- `05_SITAM_Sprint_Plan.md` — 15-day Solution Design Sprint plan
