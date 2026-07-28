# CI workflow — one manual step needed

`github-actions-ci.yml` in this folder is a ready-to-use GitHub Actions
workflow. It could not be committed to `.github/workflows/` directly because
the GitHub App used for this branch does not hold the `workflows` permission,
so the push was rejected.

## Activate it

```bash
mkdir -p .github/workflows
git mv ci/github-actions-ci.yml .github/workflows/ci.yml
git commit -m "Add CI workflow"
git push
```

(You can delete this README at the same time.)

## What it runs

On every push and pull request:

1. **`npm run lint`** — ESLint. Note that lint was previously a no-op: the
   flat config matched no `.ts`/`.tsx` files, so it always reported zero
   problems. That is fixed, and lint now runs in CI rather than inside
   `next build` (see the comment in `next.config.mjs`).
2. **`npm run typecheck`** — `tsc --noEmit`.
3. **site-public drift check** — regenerates `config/site-public.ts` and
   fails if it differs from what is committed. That file is generated from
   `config/site.ts`; if someone edits the phone number, pricing or service
   list without running `npm run gen:site-public`, the client-side copy goes
   stale silently. This catches it.
4. **`npm run build`** — full static build (2,100+ pages). Runs with
   `NODE_OPTIONS=--max-old-space-size=6144`, because the default Node heap
   is not enough for this page count.
5. **`npm run verify:build`** — `scripts/verify-build.mjs`, which asserts the
   regressions this repo has actually had:
   - no oversized client chunk (guards against `config/site.ts` leaking back
     into a `"use client"` import graph — it was a 1 MB chunk on 83 routes)
   - every sitemap URL has a prerendered page
   - every page has exactly one `<h1>`
   - key installation routes still build

All five also run locally with the same commands.
