# Squarespace trial — feasibility & working notes

Living doc for the first Squarespace test of the MiMaMusic rebuild. Pairs with
`mimamusic-rebuild-spec.md` (the full site definition). Update this on every trial
finding or decision.

Prototype it must match: `website/mimamusic-reference.html`
(Artifact: https://claude.ai/code/artifact/fcf1a98b-ad3e-460c-9f94-3b4a51c561fd)

---

## Verdict (2026‑08‑29, pre‑trial)

The look is **reproducible** on Squarespace — black ground, centred column, custom
fonts, simple photos are all within its wheelhouse. It will **not be
pixel‑identical without Custom CSS**, and a few things need workarounds.

- Style editor alone: **~85–90%** visual match.
- Style editor + modest Custom CSS: **~95%+**. Residual gap = nav chrome + a few px
  of section spacing — invisible to the owner and visitors.
- No automated Joomla → Squarespace importer exists; the build is manual.

**Plan needed: Business or higher** (Custom CSS / Code Injection is *not* on the
Personal plan). Trial is 14 days (extendable).

---

## What maps cleanly (style editor only)

| Element | Squarespace |
|---|---|
| All‑black background | Site‑wide background colour |
| 1200px centred column | "Max content width" site style (centred by default) |
| Colours `#cb4752` / `#7e7e7e` / white | Colour palette / theme |
| Body = **Gabriela** serif | Font picker (standard Google font) → Paragraph |
| Inline photos, home slideshow | Image blocks + Slideshow section (fade + dots) |
| Footer: badge image + text, left‑aligned | Footer section |
| Contact form + map | Native blocks |
| 301 redirects | Settings → URL Mappings (use the §12 table in the spec) |

## What needs Custom CSS (→ Business plan)

- **Henny Penny / Fredericka the Great** — older Google fonts; may not be in the
  picker. Add via `@import` in Custom CSS, or via Adobe Fonts (paid‑plan add‑on).
- **Two heading fonts by role** (red Fredericka vs grey Henny Penny) — map to
  H‑levels + CSS to keep it consistent site‑wide.
- **Grey gradient mega‑menu bar** — native nav is opinionated; dropdowns work
  (Folders) but the grey bar, borders, uppercase tracking, hover states need CSS.
- The two full‑width divider rules (above menu, above footer).
- Logo as text in Henny Penny — or just upload a wordmark PNG (cleaner).

## Genuine gaps / friction

- **"Click Koren → Koren landing" + a dropdown.** Squarespace **Folders** are the
  dropdown mechanism, but a folder *title is not a link* — clicking it only opens
  the dropdown. Options:
  1. Put a "Koren / overzicht" link as the first dropdown item (this is what the
     prototype deliberately *removed* — tension to resolve with the owner).
  2. Small JS in Code Injection (footer) that makes folder titles navigate to a
     chosen page.
  3. Accept folder-opens-only; landing reached from the first child.
- **Agenda** — Squarespace Events is a real calendar/list but Squarespace‑styled,
  not the JEvents month grid.
- **Micro‑spacing** — Squarespace imposes its own section rhythm.

---

## First test — scope (keep it small)

- [ ] Start a Squarespace **trial** (Business plan features).
- [ ] Global styles: black background, max width ~1200, the 3 fonts, colour palette
      (`#cb4752`, `#7e7e7e`, `#000`, `#f4f4f4`).
- [ ] Build **4 pages only**: Home (slideshow), Arrangeren (text page),
      Spirit *or* Onderwijs (photo page), + header + footer.
- [ ] Judge three things:
      1. do the fonts load and look right?
      2. can the nav bar be made acceptable?
      3. does the overall feel hold?
- [ ] Don't build the other 11 pages for the test.

---

## Custom CSS — starting points

Class names in Squarespace 7.1 vary by version; verify each with the browser
inspector on the trial site and adjust.

```css
/* 1 — fonts that may not be in the picker */
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Henny+Penny&display=swap');

/* 2 — heading roles: red = Fredericka, grey = Henny Penny */
h1 { font-family: 'Fredericka the Great', cursive; color: #cb4752; }
h2 { font-family: 'Henny Penny', cursive; color: #7e7e7e; }

/* 3 — text site title in Henny Penny (skip if using a logo image) */
.header-title-text a { font-family: 'Henny Penny', cursive; color: #fff;
  font-size: 60px; line-height: 1; }

/* 4 — grey gradient nav bar with item dividers */
.header-nav-list { background: linear-gradient(#595959, #3a3a3a);
  border-top: 1px solid rgba(255,255,255,.16); }
.header-nav-item a { text-transform: uppercase; letter-spacing: .12em;
  font-size: 11px; font-weight: 700; color: #e8e8e8; padding: 15px 20px;
  border-left: 1px solid rgba(255,255,255,.07); }

/* 5 — full-width divider rules */
.header { border-top: 1px solid #333; }
.footer-sections { border-top: 1px solid #333; }

/* 6 — body + background safety net */
body, .sqs-block { color: #f4f4f4; }
#siteWrapper, body { background: #000; }
```

Folder‑title‑as‑link (Code Injection → Footer), if we go that route:
```html
<script>
document.querySelectorAll('.header-nav-folder-title').forEach(function(t){
  var map = { 'Koren': '/koren', 'Workshop/les': '/workshop-les' };
  var href = map[t.textContent.trim()];
  if (href) t.addEventListener('click', function(){ location.href = href; });
});
</script>
```

---

## Trial log

_(fill in as the test runs)_

| date | finding |
|---|---|
| — | — |

## Open questions for the owner

- [ ] Business plan cost (~€23/mo billed yearly) acceptable for the Custom CSS we need?
- [ ] Keep the quirky display fonts (Henny Penny / Fredericka the Great) or take the
      rebuild as a chance to pick cleaner faces?
- [ ] Folder‑title behaviour: "overzicht" first item vs. JS link vs. dropdown‑only?
