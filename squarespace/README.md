# squarespace/ — the MiMaMusic Squarespace rebuild

**Self‑contained.** Everything needed to rebuild **mimamusic.nl** on Squarespace
(Business plan) is in this folder — copy, images, paste‑in config, and the visual
target. Nothing here points outside the folder.

## What's here

| File | Purpose |
|---|---|
| `build-runbook.md` | **Start here.** Step‑by‑step build, Phases 1–8, plus the owner maintenance model. |
| `content-pack.md` | **All page copy, paste‑ready**, in nav order — verbatim from the prototype, with the "build once + duplicate" strategy, per‑block image mapping, and the owner's outstanding to‑dos. |
| `custom-css.css` | The single Custom CSS block for **Design → Custom CSS**. Every rule commented. Keep it minimal. |
| `code-injection.html` | Optional **Settings → Advanced → Code Injection** snippets (currently just folder‑title‑as‑link). |
| `url-mappings.txt` | Old → new 301 redirect map in Squarespace **URL Mappings** syntax, ready to paste. |
| `trial-log.md` | Feasibility notes + the running log of trial findings and decisions. Update it every session. |
| `look-reference.html` | The prototype, self‑contained — open in a browser. **This is the visual target**; the Squarespace build must match it. |
| `assets/images/` | The 19 image originals to upload to Squarespace. |
| `assets/README.md` | Which image goes on which block. |

## Working order

1. `build-runbook.md` Phases 1–4 — trial, global styles, header/nav, footer.
2. `content-pack.md` — build the pages (five templates, then duplicate).
3. `build-runbook.md` Phases 5–8 — trial gate, remaining pages, functional
   sections, review + redirects + go‑live.

## Context (not needed for the build)

- `../website/` — the original single‑file prototype this folder was built from.
  `look-reference.html` here is a copy of its built output.
- `../rebuild_data/mimamusic-rebuild-spec.md` — the original full site‑recon
  document (Joomla DB, SQL, history). Everything from it that the Squarespace
  build needs has been folded into `content-pack.md` and `build-runbook.md`.
- `../maintainable_website/` — the abandoned 11ty alternative. Revisit only if
  the Phase 5 trial gate fails.

Nothing in this folder is built or compiled — the Squarespace site itself is the
artifact; these files are its source‑of‑truth notes and paste‑in config.
