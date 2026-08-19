# Monthly title refresh — required setup

**Status:** ⚠️ NOT ACTIVE YET — needs one manual step (see below).

## The problem

`lib/seo-title-optimizer.ts` (`buildFreshMetaTitle`) injects the **current
month** into page titles using `new Date()`:

```
/areas/ampang/ampang-jaya  →  "Aircond Service Ampang Jaya (Ampang) August 2026 — RM 99"
/aircond-service-price-malaysia → "Aircond Service Price Malaysia August 2026 — Transparent"
```

**638 pages** carry a month stamp:

| Template | Month-stamped titles |
|---|---|
| kampung | 465 |
| area | 80 |
| brand | 60 |
| service | 25 |
| other | 8 |

Every page is statically prerendered (`next build`), there is **no `revalidate`
and no ISR anywhere in the app**, and `.github/workflows/ci.yml` only runs on
push/PR. So the month is frozen at **build time**.

Consequence: if the site goes a month without a deploy, 638 titles advertise
a stale date in the SERP — "August 2026" still showing in November 2026. That
inverts a freshness tactic into a staleness signal, costing CTR in Google and
recency confidence in AI answer engines (ChatGPT, Claude, Gemini, Perplexity).

## The fix — 2 steps

### 1. Create a Vercel deploy hook

Vercel → Project → **Settings → Git → Deploy Hooks**
- Name: `monthly-title-refresh`
- Branch: `main`
- Copy the generated URL.

### 2. Add the workflow

The workflow file is stored here as **`docs/monthly-refresh.workflow.yml`**
rather than in `.github/workflows/`, because the GitHub App used for this
audit is not granted the `workflows` permission and pushes containing new
workflow files are rejected.

A maintainer with write access should:

```bash
mkdir -p .github/workflows
cp docs/monthly-refresh.workflow.yml .github/workflows/monthly-refresh.yml
git add .github/workflows/monthly-refresh.yml
git commit -m "ci: monthly rebuild so month-stamped titles stay current"
git push
```

Then add the deploy hook URL as a repository secret:
GitHub → **Settings → Secrets and variables → Actions → New repository secret**
- Name: `VERCEL_DEPLOY_HOOK_URL`
- Value: the URL from step 1

The job runs at **00:20 UTC on the 1st of each month** (08:20 Malaysia time,
safely inside the new month in `Asia/Kuala_Lumpur`) and can also be triggered
manually via **workflow_dispatch**. Until the secret exists it exits cleanly
with a notice instead of failing every month.

## Alternative (no CI needed)

If you would rather not run a scheduled deploy, drop month-level precision and
stamp the **year only** in `buildFreshMetaTitle`. A title reading "2026" stays
accurate for twelve months instead of one. This is the lower-maintenance
option and is recommended if deploys are infrequent.
