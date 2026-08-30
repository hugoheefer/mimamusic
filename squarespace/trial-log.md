# Squarespace trial — feasibility & working notes

Living doc for the Squarespace rebuild of MiMaMusic. Part of the self-contained
`squarespace/` folder (see `README.md`). Pairs with `build-runbook.md` (the
steps) and `content-pack.md` (all page copy). **Update this on every trial
finding or decision.**

Visual target: `look-reference.html` in this folder.

---

## Verdict (2026‑08‑29, pre‑trial — still stands)

The look is **reproducible** on Squarespace — black ground, centred column,
custom fonts, simple photos are all within its wheelhouse. It will **not be
pixel‑identical without Custom CSS**, and a few things need workarounds.

- Style editor alone: **~85–90%** visual match.
- Style editor + modest Custom CSS: **~95%+**. Residual gap = nav chrome + a few
  px of section spacing — invisible to the owner and visitors.
- **No automated importer exists** (Joomla → Squarespace, or HTML → Squarespace).
  The build is manual, section by section. `content-pack.md` is the shortcut:
  all copy pre‑formatted, five page templates, build‑once‑then‑duplicate.

**Plan needed: Business or higher** — Custom CSS / Code Injection is not on the
Personal plan. Trial is 14 days (extendable once via support).

---

## Locked decisions (2026‑08‑30)

| # | Decision |
|---|---|
| SQ1 | Platform = **Squarespace Business**, chosen over the `../maintainable_website/` 11ty build for a simpler owner‑maintenance model. |
| SQ2 | **All‑black** ground, per the prototype. A lightened variant is shown to Wilma at review, not built now. |
| SQ3 | **Logo = "MiMaMusic" wordmark in Henny Penny** — live text via a Custom CSS `@import`, with an uploaded PNG wordmark as the fallback if the font is flaky. |
| SQ4 | **Headings = Gabriela** — a clean serif already in the Squarespace font picker. Set in the style editor, not CSS. **Fredericka the Great is dropped.** |
| SQ5 | **Body = Arial / system sans, 14px / line‑height 20px** — matches the real `template.css`. Body is *not* a serif. |
| SQ6 | Nav dropdowns = **Squarespace Folders** for Koren and Workshop/les. |

---

## What maps cleanly (style editor only)

| Element | Squarespace |
|---|---|
| All‑black background | Site‑wide background colour + dark section theme |
| 1200px centred column | "Max content width" site style (centred by default) |
| Colours `#000` / `#989898` body / `#cb4752` red / `#7e7e7e` grey | Colour palette / theme |
| Headings = **Gabriela** | Font picker (standard Google font) → Headings |
| Body = **Arial / system sans**, 14 / 20 | Font picker → Paragraph |
| Inline photos, photo bands | Image blocks / Gallery sections |
| Footer: badge image + copyright line, left‑aligned | Footer section |
| Contact form + map | Native blocks |
| 301 redirects | Settings → URL Mappings — paste `url-mappings.txt` |

## What needs Custom CSS (→ Business plan)

All of it is in `custom-css.css`, one commented block. In summary:

- **Henny Penny** for the wordmark — older Google font, `@import` in Custom CSS
  (only if the wordmark stays as live text; a PNG logo removes this need).
- **Grey gradient mega‑menu bar** — native nav is opinionated; Folders give the
  dropdowns, but the grey bar / borders / uppercase tracking / hover states need
  CSS.
- The two **full‑width divider rules** (above the menu, above the footer).
- Body‑bold colour (`#cb4752`) and a background safety net, if the theme can't do
  them natively.

> Note: headings are now **Gabriela via the style editor** (SQ4) — no
> per‑heading‑role font CSS. The only inline heading quirks are on **Arrangeren**
> (`#ff0000` / 14pt) and **Contact** (see `content-pack.md`), set per block.

## Genuine gaps / friction

- **"Click Koren → Koren landing" + a dropdown.** Squarespace **Folders** are the
  dropdown mechanism, but a folder *title is not a link* — clicking it only opens
  the dropdown. Options:
  1. First dropdown item is a "Koren / overzicht" link that is the landing
     (no‑code fallback).
  2. Small JS in Code Injection (footer) makes folder titles navigate — snippet
     in `code-injection.html`. **Chosen** (closest to the prototype, which drops
     the repeated parent link).
  3. Accept folder‑opens‑only; landing reached from the first child.
- **Agenda** — Squarespace Events is a real calendar/list but Squarespace‑styled,
  not the old JEvents month grid. Live grid is empty, so start empty.
- **Micro‑spacing** — Squarespace imposes its own section rhythm; a few px off is
  accepted.
- **Footer is global** — the prototype's home‑only copyright line will show
  site‑wide (accepted, minor deviation).

---

## Trial log

| date | finding |
|---|---|
| 2026‑08‑30 | Guided build set up. Decisions SQ1–SQ6 locked (above). Content pack written — all page copy paste‑ready, five templates, image originals copied into `assets/images/`. Folder made self‑contained. Next: start Business trial → global styles (runbook Phase 2). |

_(add a dated line for every trial finding or structural/CSS change to the live site)_

---

## Open questions for the owner

- [ ] Business plan cost (~€23/mo billed yearly) acceptable for the Custom CSS we need?
- [ ] Folder‑title behaviour: confirm the JS‑link approach (option 2) vs an
      "overzicht" first item.
- [x] **Fonts (2026‑08‑30):** Henny Penny wordmark kept; red section headings
      move off Fredericka the Great to **Gabriela** (native picker). Fredericka
      dropped. Only font `@import` still needed is Henny Penny, and only if the
      wordmark stays as live text.
- [x] **Look (2026‑08‑30):** keep the **all‑black** ground for the build; present
      a lightened option to Wilma at review.
- [ ] The full owner to‑do list (proofread, Privacy text, Contact address + form
      recipient, review questions) is in `content-pack.md` → "Still needed from
      the owner".
