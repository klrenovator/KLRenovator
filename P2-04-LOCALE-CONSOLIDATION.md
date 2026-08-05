# P2-04 — Locale Architecture Consolidation Design (2026-08-05)
Current state: literal mirrored trees `app/`, `app/ms/`, `app/zh/` with duplicated routes.

Proposed migration (progressive, no URL breakage):
1. Introduce `[locale]` route segment group (`app/(locale)/[locale]/...` or `app/[locale]/...`) with default `en`.
2. Move shared server components / content collections into `app/lib/i18n/` typed locale dictionary.
3. Preserve existing URLs via `next.config.mjs` rewrites/redirects during transition.
4. Phase 1: consolidate homepage + global shell (navbar/footer/html lang) to server locale.
5. Phase 2: migrate service/area/detail pages progressively.
6. Phase 3: retire `app/ms/` and `app/zh/` literal trees once all routes use `[locale]`.

Risk reduction: keep current routes intact until Phase 1 verified; use feature flags.
Next action: design typed locale-content interface (EN/MS/ZH) and test with one family (e.g., services).
