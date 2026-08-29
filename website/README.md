# website/ — MiMaMusic rebuild prototype

Reference rebuild of **mimamusic.nl** (currently a compromised, end-of-life Joomla 3
site). This folder is the source of truth for the prototype; it is mirrored into the
Claude Code scratch directory only so the Artifact can be published from a stable path.

Published Artifact: https://claude.ai/code/artifact/fcf1a98b-ad3e-460c-9f94-3b4a51c561fd

## Files

| File | Role |
|---|---|
| `mimamusic-reference.src.html` | **Edit this.** Full prototype markup + CSS + JS. Photos appear as labelled placeholder boxes. ~36 KB. |
| `build_images.py` | Bakes `images/web/*` into the source as `data:` URIs (Artifacts can't hot-link images) and writes the built file. |
| `mimamusic-reference.html` | **Generated — do not hand-edit.** Self-contained (~1.4 MB), this is what gets published. |
| `images/` | Full-resolution originals downloaded from `mimamusic.nl/images/`. |
| `images/web/` | Shrunk/compressed copies (max 1000 px, JPEG q72) actually embedded in the build. |

## Build

```
cd website
python build_images.py            # src.html + images/web  ->  mimamusic-reference.html
python build_images.py --resize   # re-generate images/web from images/ first
```
Requires Python 3 + Pillow (only for `--resize`).

## Status / what's approximate

- **Look** reproduced from screenshots of the live site (iPad Safari): all-black
  Gavick GK5 "Theatre" template, script headings (red on top-level pages, grey on
  sub-pages), grey mega-menu bar, narrow left-indented column.
- **Display font** = `Berkshire Swash` as a stand-in; the real face is the template's
  `googleFont` param (SQL 7a in `../mimamusic-rebuild-spec.md`).
- **Colours** (`--accent #e42a1a` etc.) sampled by eye — confirm against SQL 7a.
- **Header wordmark** is styled text (the real one is template-font text, not an image).
- **Structure** (nav, pages, categories) from the database recon in
  `../mimamusic-rebuild-spec.md`.
- Blocks marked *"nog op te halen"* need article bodies from SQL 7b/7c.
- **Photos**: real images are wired in where they map cleanly to the old pages.
  Unused but downloaded: `2015-09-23_GGK_40.png`, `Wilma_2024.jpg`,
  `Wilma_vleermuis_2022.jpg`, `Emmaus1.jpg`. Koor Voluum has no image yet.

## Not in scope here

Malware cleanup of the live Joomla site is handled in a separate thread. Never copy
JS / `jquery.min.js` / inline `<script>` from the live pages.
