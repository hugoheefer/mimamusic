# MiMaMusic on Squarespace — build runbook

Step-by-step build of the mimamusic.nl rebuild on Squarespace 7.1, Business plan.
Follow the phases in order. Log every finding and decision in `trial-log.md`.

- **Look reference:** `../website/mimamusic-reference.html`
  (Artifact: https://claude.ai/code/artifact/bea26d35-ff4c-45c7-bad8-65419f9e0835)
- **Content + IA + redirects:** `../rebuild_data/mimamusic-rebuild-spec.md`
  (referred to below as "spec §N")
- **Paste-in config:** `custom-css.css`, `code-injection.html`, `url-mappings.txt`

Squarespace menu paths below are 7.1 as of 2026; if a label has moved, the intent
still holds — note the new path in `trial-log.md`.

---

## Locked decisions (2026-08-30)

| # | Decision |
|---|---|
| SQ1 | Platform = **Squarespace Business** (Custom CSS needs Business+). Chosen over the `../maintainable_website/` 11ty build for a simpler owner-maintenance model. |
| SQ2 | **All-black** ground, per the prototype. A lightened variant is shown to Wilma at review, not built now. |
| SQ3 | **Logo = "MiMaMusic" wordmark in Henny Penny** — live text via a Custom CSS `@import`, with an uploaded PNG wordmark as the clean fallback if the font is flaky. |
| SQ4 | **Headings = Gabriela** (clean serif, native in the Squarespace font picker). Fredericka the Great is dropped. Set in the style editor, not CSS. |
| SQ5 | **Body = Arial / system sans, 14px / line-height 20px** — matches the real `template.css` (spec D2). Body is *not* a serif. |
| SQ6 | Nav dropdowns = **Squarespace Folders** for Koren and workshop/les. |

---

## Six maintainability ground rules

1. **Style editor first, Custom CSS last.** Any colour, font, or size settable in
   the **Design** panel is set there — never hardcoded in CSS. Squarespace
   updates and the owner both respect the style editor; neither respects CSS.
2. **All Custom CSS in one block, every rule commented** with target + date
   (`custom-css.css` is that block). After a Squarespace version bump it can be
   audited in one place.
3. **Native sections and blocks for all content.** No CSS that positions or lays
   out content. The owner must be able to click any text/image and edit it
   without the page breaking.
4. **Folders for the two dropdown sections.**
5. **One page, one job.** Use the section model instead of cramming.
6. **Redirects + DNS written down before go-live** — `url-mappings.txt` and spec
   §12.

---

## Phase 1 — Trial + base template

1. squarespace.com → **Get Started**. No payment now; trial is 14 days
   (extendable once via support). All Business features — incl. **Custom CSS** —
   are active during the trial. **Do not upgrade yet.**
2. Site-type prompt: answer freely ("Music / Portfolio"); it only seeds starter
   content you will delete.
3. Pick the **plainest template** (e.g. *Paloma*, *Bedford*, or any minimal one).
   In 7.1 every template is the same engine — choice only affects starter content
   and defaults, all overridden in Phase 2. Don't agonise.
4. Record the trial expiry date in `trial-log.md`.

**Gate:** you're in the editor. → Phase 2.

---

## Phase 2 — Global styles

All under **Design** (paintbrush, or **Pages → Design**). Set in this order.

### a. Colours — Design → Colours
- Palette so the darkest theme is: background `#000000`, text `#989898`,
  headings `#cb4752` (red), links `#cb4752`. Keep `#7e7e7e` available as a
  secondary heading grey.
- Apply the **dark / black section theme** as the default for new sections — the
  whole site is then black with no CSS.
- Body `<strong>` should read `#cb4752` (spec D3). If the theme can't do it
  natively, it's one CSS rule later — note it, don't fix it now.

### b. Fonts — Design → Fonts → *Assign styles*
- **Paragraph / body:** `Arial` (or system sans). Base size **14px**,
  line-height ~**1.43** (= 20px). (SQ5)
- **Headings:** `Gabriela`, weight 400. Covers the red section titles. (SQ4)
- **Site title:** leave default — Phase 3.

### c. Page width — Design → Spacing (a.k.a. "Site width")
- Max content width ~**1200px** (prototype `.container`). Centred is the default.

### d. Buttons / other
- Leave defaults. Revisit only if a page needs it.

**Do not open Custom CSS yet** — added in Phase 3 as one block.

**Gate (answers 2 of the 3 trial-gate questions early):** does Gabriela load and
look right? does the black theme apply cleanly to a test section? Log it.

---

## Phase 3 — Header + navigation

### a. Logo
- Try **Design → Site title & tagline** as text "MiMaMusic", then style it in
  `custom-css.css` block 3 (Henny Penny `@import` + 60px white). (SQ3)
- If Henny Penny renders unreliably: upload `assets/` wordmark PNG via
  **Edit header → Site title → Add a logo image** and skip the font for the logo.
- Logo links to Home (default).

### b. Menu structure — Pages panel
Build top-level nav in spec §3 order:

```
Home
Koren            ← Folder  (children: gospelpopkoor Spirit, Singin'Gestel, Popkoor MIKS)
Onderwijs
Dwarsfluit
Arrangeren
workshop/les     ← Folder  (children: Muzikale ondersteuning, Workshopmogelijkheden)
Agenda
Contact
```
- **Privacy** goes in the **footer** nav only, never the main menu.
- Folder titles are **not links** in Squarespace. Pick one (log the choice):
  1. First child named "Koren" / "workshop/les overzicht" that is the landing.
  2. `code-injection.html` folder-title-as-link JS (footer injection).
  3. Dropdown-only, landing reached from the first child.
  The prototype removed the repeated-parent link (spec D6), so option 2 is the
  closest match; option 1 is the no-code fallback.

### c. Custom CSS — first paste
- **Design → Custom CSS.** Paste the whole of `custom-css.css`.
- Then, with the browser inspector on the trial site, **verify every selector**
  (7.1 class names drift by version) and correct in place. Blocks: font
  `@import`, grey gradient nav bar, the two full-width divider rules, body-bold
  colour safety net, background safety net.

**Gate (3rd trial-gate question):** can the nav bar be made acceptable? Log it.

---

## Phase 4 — Footer

- **Edit footer:** one section, dark theme, left-aligned to the 1200px column.
- **Badge:** image block with `MIMAmusic_LOGO2-4.png` (`assets/README.md`),
  circular, centred on the column's left edge like the prototype.
- **Copyright line** `Copyright © <year> MimaMusic. All Rights Reserved.` —
  prototype shows this **on the home page only, below the badge** (spec D11).
  Squarespace footers are global. Options (log the choice):
  1. Accept it site-wide (simplest, minor deviation).
  2. Home-only via a small Code Injection snippet keyed off the homepage
     collection id.
  Recommend option 1 unless Wilma objects.
- No Privacy link here yet if you haven't built the Privacy page; add it when you
  do. No Joomla line, ever (spec D9).

---

## Phase 5 — TRIAL GATE (build only these three pages)

Per `trial-log.md` "First test — scope". Build **Home, Arrangeren, and one photo
page (Onderwijs)** — nothing else — then judge:

1. Do the fonts load and look right?
2. Can the nav bar be made acceptable?
3. Does the overall feel hold at ~90%+?

**If yes:** continue to Phase 6. **If no:** stop, log why, reconsider
`../maintainable_website/`.

### Home (spec §4 "Home", D7/D12/D13)
- Dark section, three **equal columns** side by side, stacking on mobile.
  Squarespace: one section, a 3-column layout (or three inline blocks).
- Each column: **heading → one short paragraph → one photo below**.
  - Dirigeren — `2017-12b.jpg`, text "Een intensieve verbinding aangaan met je
    musici en samen hoorbaar maken wat er in je hoofd klinkt."
  - Onderwijs — `2012-11-06__De_Bron_leslokaal_4.jpg` (keep native 16:9,
    uncropped), text "Leerlingen meenemen in jouw liefde voor muziek en
    mogelijkheden aanbieden om hier aan mee te doen."
  - Dwarsfluit — `Wilma_fluitist_1986.jpg` (crop, keep the face — focal point
    top), text "Muziek zonder woorden. Het instrument als spreekbuis."
- Photos aim for equal height (~240px) so they line up. No carousel (spec is
  explicit — the old Swiper was a trashed design).
- Home headings a touch larger than other pages is fine (prototype eases to
  ~22–27px on Home only).

### Arrangeren (spec §4 "Arrangeren", D15)
- Single dark section: heading + **2 paragraphs** + a mailto link. Text = spec
  §4 (synced to live 2026-08-29).
- Heading keeps the live inline quirk **`color:#ff0000; font-size:14pt`** — set
  it on that one heading block, not globally. Flag to Wilma whether to normalise
  it to the Gabriela `#cb4752` treatment long-term.

### Onderwijs (spec §4 "Onderwijs", D14)
- Heading (red) + one paragraph (spec §4 leading body) + a **3-photo band**:
  `2014-10-08_Bieb_Heyhoef3.jpg`, `2012-11-06__De_Bron_leslokaal.jpg`,
  `djembe_60.jpg`.
- **Bs Emmaus teaser** kept for now (text + `Emmaus1.jpg`, link to the school
  site) — pending owner review.

---

## Phase 6 — Remaining pages

Build from spec §4 / §3. All dark sections, 1200px column, headings Gabriela red
(`is-red` in the prototype) for category-landing titles, grey for sub-page
titles.

| Page | Shape (spec ref) |
|---|---|
| **Koren** (folder landing) | Koordirigent heading + paragraph + **4-photo band** only. No choir teasers (spec D14). |
| Koren → Spirit | Sub-page. Body from spec §7 query (h) text — currently placeholder; fill it. `_DSC8853.jpg`, `spirit_3.jpg`; link spiritgospelpop.nl. |
| Koren → Singin'Gestel | Sub-page. `2024-05_met_kinderen.jpg`, `2024-03-20.jpg`; link singingestel.nl. |
| Koren → Popkoor MIKS | Sub-page. `MIKS_logo.png`; address Meander / Meanderplein 3 / 5271 GC. |
| **Dwarsfluit** | One page, **4 stacked sections** in DB order: Geschiedenis, fluitist, Dwarsfluitles, Blokfluitles. Bodies = spec §4 (synced from DB, D16). "fluitist" has a floated photo `Wilma_fluitist_1986.jpg` with the text beside it. Keep the copy quirks. |
| **workshop/les** (folder landing) | *Muzikale ondersteuning* article only — heading + one paragraph + mailto. No photo, no teasers (spec D14). |
| workshop/les → Muzikale ondersteuning | Same text as the landing, grey (sub-page) title. |
| workshop/les → Workshopmogelijkheden | Body not yet pulled (spec §11). `boomwhackers_1c.jpg` side image. Placeholder until then. |
| **Contact** | See Phase 7. |
| **Privacy** | Body not yet written (spec §11 — needs accurate NL/GDPR text). Page + footer link. |

Sub-page bodies still marked placeholder in spec §0: Spirit, Singin'Gestel,
Popkoor MIKS, (Koor Voluum if kept). Pull from spec §7 query (h) before building.

---

## Phase 7 — Functional sections

### Contact (spec §4 "Contact")
- Dark section: portrait `2020-06-28_Wilma.jpg` (prototype keeps its own
  `ph-portrait` sizing — owner prefers it) + the "over mij," text with inline
  styling: "MiMa" white / "Music" red italic 18pt; name **Wilma van der Schoot**
  bold `#9a2d2d`; bio; "of bellen" white 10pt; "06-27418262" `#ce3939` 14pt.
- **Form block** — recipient = the owner's address (confirm which). Replaces the
  cloaked `/at/` email.
- **Map block** — needs the real postal address (spec §11 open item).

### Agenda (spec §6)
- **Squarespace Events** collection page. Live JEvents grid is empty, so start
  empty with the reader line: "In de agenda staan de komende concerten,
  kerkdiensten en optredens… Op dit moment staan er geen activiteiten
  gepland — kom hier binnenkort terug voor nieuwe data."
- Decide with owner what maintains it long-term (Events collection vs embedded
  Google Calendar vs a hand-kept list vs drop the page).

### Cookie banner
- **Settings → Cookies & Visitor Data** → enable the banner. No custom work.

### Chat / comments / newsletter (spec §5, §11)
- Olark chat, Komento comments, AcyMailing newsletter — all **owner decisions**.
  Default: drop chat and comments (low volume), no newsletter unless asked.

---

## Phase 8 — Review, redirects, go-live (spec §12)

1. **Owner review** on the trial URL. Big questions (spec §15 step 2): keep
   black or lighten; keep Henny Penny or go fully clean; nav OK; keep Agenda;
   keep archived choirs; want galleries. Wilma proofreads **every** page and
   supplies the missing bodies (Privacy, Workshopmogelijkheden, sub-pages) and
   the contact address + form recipient.
2. **Upgrade** to the Business plan when the trial passes.
3. **URL Mappings** — Settings → Advanced → URL Mappings. Paste `url-mappings.txt`.
4. **Domain** — connect `mimamusic.nl`. Point web DNS to Squarespace. **Leave MX
   records untouched** so `@mimamusic.nl` mail keeps working.
5. Pick canonical host (www or non-www); Squarespace 301s the other automatically.
6. **SEO** — carry over the good old page titles + meta descriptions; submit the
   new `sitemap.xml` in Google Search Console; watch coverage + 404s for weeks.
7. **Archive** the Joomla site (files + DB dump), then decommission it — do not
   leave the compromised install running. Rotate remaining shared passwords.

---

## Maintenance model (hand this part to the owner)

- **Editing content:** log in → the page → click any text or image → type / swap.
  No code, no publish step beyond "Save". This is the whole reason for choosing
  Squarespace.
- **Adding an event:** Agenda page → add an Event.
- **What the owner should not touch:** Design → Custom CSS, Settings → Code
  Injection, URL Mappings, DNS. Those are in this folder for whoever maintains
  the build.
- **After a Squarespace update looks off:** open `custom-css.css`, re-check each
  commented selector against the live inspector, fix the drifted class names.
  That's the only recurring technical task.
- **Keep `trial-log.md` current** — every change to the live site's structure or
  CSS gets a dated line, same discipline as the prototype's spec.
