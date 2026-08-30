# squarespace/ — the MiMaMusic Squarespace rebuild

Self-contained working folder for rebuilding **mimamusic.nl** on Squarespace
(Business plan). Everything Squarespace-specific lives here so the folder can be
moved, handed over, or dropped as one unit.

## What's here

| File | Purpose |
|---|---|
| `build-runbook.md` | **Start here.** The step-by-step build, Phases 1–8, plus the maintenance model for the owner. |
| `trial-log.md` | Living feasibility notes + the running log of trial findings and decisions. Update it every session. |
| `custom-css.css` | The single Custom CSS block to paste into **Design → Custom CSS**. Every rule is commented with what it targets and why. Keep it to a minimum. |
| `code-injection.html` | Optional snippets for **Settings → Advanced → Code Injection** (footer). Currently only the folder-title-as-link helper. |
| `url-mappings.txt` | Old → new URL redirect map in Squarespace **URL Mappings** syntax, ready to paste. Mirrors spec §12. |
| `assets/README.md` | Manifest: which image from `../website/images/` goes on which page/block, and the logo wordmark note. |

## How this folder relates to the rest of the repo

- `../website/` — the single-file **prototype**. This is the *look reference*; the
  Squarespace build must match `../website/mimamusic-reference.html`. Do not edit
  the prototype from here.
- `../rebuild_data/mimamusic-rebuild-spec.md` — the **definitive site
  definition** (content, IA, CSS facts, redirects, decisions log). The runbook
  here points into it rather than duplicating it.
- `../maintainable_website/` — an **alternative** production build (Eleventy +
  Pages CMS + GitHub Pages). Squarespace was chosen over it for a simpler
  maintenance model for a non-technical owner. That folder is left in place but
  is **not** the direction being pursued while this one is active. Revisit only
  if the Phase 5 trial gate fails.

## If you move this folder

Only two things point outside it, both by relative path:

1. `../website/images/*` — referenced by `assets/README.md` as the source of
   images to upload. If you relocate, either fix the path or copy the listed
   files into `assets/`.
2. `../rebuild_data/mimamusic-rebuild-spec.md` — referenced by `build-runbook.md`
   and `trial-log.md`.

Nothing in this folder is built or compiled. The Squarespace site itself is the
artifact; these files are its source-of-truth notes and paste-in config.
