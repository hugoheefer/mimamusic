# mimamusic.nl — Rebuild Specification (1:1 reference)

Compiled 2026‑08‑29 from a live database recon of the existing Joomla site plus
browser‑console evidence. Purpose: give a complete, source‑independent blueprint
for rebuilding the site 1:1 in another system (static HTML prototype now →
final platform TBD, see §14/§15), without needing access to the compromised Joomla install.

> The original site is a **compromised, end‑of‑life Joomla 3.9+ install** (see
> `Out of scope / do not copy`). Rebuild content and structure from this doc;
> rebuild all markup/JS clean. **Do not copy any JS, `jquery.min.js`, or inline
> `<script>` from the live pages** — they carry the injection.

---

## 0. Prototype status  (living — update on every prototype change)

**Prototype:** `website/` in this repo — edit `mimamusic-reference.src.html`,
run `build_images.py` → `mimamusic-reference.html` (+ repo `docs/index.html`).
Published Artifact: **https://claude.ai/code/artifact/bea26d35-ff4c-45c7-bad8-65419f9e0835**
(kept in sync via a scratch mirror). Reference inputs (this spec +
`screenshots old site/`) live in `rebuild_data/`.

### Done — visual shell
- All‑black GK5 "Theatre" look from the live `template.css`: **1200px centred
  container** (logo / menu / page titles / footer all align to its left inner
  edge), grey mega‑menu bar, **two full‑width divider rules** (above the menu,
  above the footer), circular MiMaMusic footer badge (real logo image).
- **Fonts** (from `template.css` + a pasted live DOM):
  - logo wordmark = **Henny Penny** (styled text, not an image)
  - section titles (`.page-title`, `.teaser-title`) = **Gabriela serif, 20px /
    1.5, weight 400** — `#cb4752` for linked/category titles (`.is-red`),
    `#6f6f6f` for sub‑page titles (`.is-dim`; live is `#333`, near‑invisible —
    flag for owner). (D4)
  - body = **Arial, Helvetica, sans‑serif — 14px / line‑height 20px**, colour
    `#989898`; `<strong>` in body copy = `#cb4752`. (D2)
  - Fredericka the Great and the old "Berkshire Swash" stand‑in are gone.
- **Vertical rhythm** matched to live: `.page` padding‑bottom 69px, footer
  `.foot-inner` padding‑top 49px, `.badge-img` margin‑top 0, **no
  `main { min-height }`**, paragraph spacing `.prose p` / `.teaser p`
  margin‑bottom 20px. (D13)
- **Footer** = the badge on every page; **on the home page only**, a
  `Copyright © <year> MimaMusic. All Rights Reserved.` line **below** the badge
  (year auto‑set by a 1‑line script). No Privacy link, no Joomla line.
  `#page-privacy` still in the markup but unlinked. (D11)
- Nav: parent items (Koren, workshop/les) link to their landing; dropdowns list
  **only** the children, no bullets. (D6)

### Done — content (page by page, from live fetch + DB query (h))
- **Home** — 3 columns (`space-between`) Dirigeren / Onderwijs / Dwarsfluit,
  each: heading → one flowing paragraph (capped to its photo's width) → one
  photo (240px tall; Onderwijs kept native 16:9). No carousel. Text from
  `mm_content` 21/16/15 — the minimal tagline version **is** the live design;
  the fuller 2017 copy is an abandoned older design. (§4 Home, D7/D12)
- **Koren landing** — *Koordirigent* heading + paragraph + 4‑photo band **only**.
  No choir teasers (live rendered page shows none — D14). Choir content is on
  the sub‑pages via the KOREN dropdown.
- **Onderwijs landing** — heading + paragraph + 3‑photo band + **Bs Emmaus
  teaser** (kept, pending owner review). Category = 5 articles, 3 trashed.
- **workshop/les landing** — the *Muzikale ondersteuning* leading article only
  (heading + one paragraph + mailto). No teasers.
- **Contact** — the live *"over mij,"* article; inline styling matched
  (MiMaMusic 18pt white + red‑italic, name `#9a2d2d`, "of bellen" white 10pt,
  phone `#ce3939` 14pt). Portrait kept as the prototype's `.ph-portrait`
  (244×264 — owner prefers it to the original). (§4 Contact)
- **Agenda** — static repro of the JEvents month grid + a reader‑facing line
  ("…op dit moment geen activiteiten gepland…"). Live grid is empty.
- **Dwarsfluit / Arrangeren / Privacy** — sections built; bodies still
  placeholder (see pending).
- **Sub‑pages** `page-spirit / -singin / -miks / -voluum` — real bodies are in
  hand from query (h) but **not yet pasted in** (still placeholder).
- **Photos:** all 20 files from `mimamusic.nl/images/` in `website/images/`
  (full‑res) + `images/web/` (shrunk ≤1000px q72). Baked as data‑URIs by
  `build_images.py`. Inventory below.

### Hosting
- **GitHub Pages** (`master` `/docs`) tried 2026‑08‑29, then repo set back to
  private → paused. `docs/index.html` + `.nojekyll` stay in the repo,
  `build_images.py` keeps regenerating them. Platform choice open — §14 / §15.

### Still pending
- **Sub‑page bodies** (text already pulled via query (h) — just needs pasting):
  Spirit, Singin'Gestel, Popkoor MIKS, Koor Voluum.
- **Bodies still to pull** (query (h) per category): **Dwarsfluit**
  (Dwarsfluitles id 33, Blokfluitles id 10, de fluitist id 11, Geschiedenis),
  **Arrangeren** (Arrangeren + Arrangementen), **Workshopmogelijkheden** full
  body, **Privacy**.
- **SQL 7f** events — grid confirmed empty; agenda mechanism = open owner
  decision. **SQL 7g** gallery images (JoomGallery) — not exported.
- Module `92` (`{loadmoduleid 92}` in each home heading) — what is it? (query d)
- Owner review items: black look vs lighter; `#6f6f6f` vs live `#333` sub‑page
  titles; Bs Emmaus teaser; proofread transcribed copy.

### Image inventory  (`website/images/` — filename → current use; sizes = display)
| file | used on |
|---|---|
| `MIMAmusic_LOGO2-4.png` | footer badge |
| `2017-12b.jpg` | home "Dirigeren" (270px band) |
| `2012-11-06__De_Bron_leslokaal_4.jpg` | home "Onderwijs" (427px, native 16:9) |
| `Wilma_fluitist_1986.jpg` | home "Dwarsfluit" (270px) + Dwarsfluit "de fluitist" |
| `2010-kerst__dirigent_wilma_in_de_sneeuw.jpg` | Koordirigent band (1/4) |
| `2015-09-23_GGK_40.png` | Koordirigent band (2/4) |
| `Wilma_vleermuis_2022.jpg` | Koordirigent band (3/4) |
| `Wilma_2024.jpg` | Koordirigent band (4/4) |
| `2014-10-08_Bieb_Heyhoef3.jpg` | Onderwijs band (1/3) |
| `2012-11-06__De_Bron_leslokaal.jpg` | Onderwijs band (2/3) |
| `djembe_60.jpg` | Onderwijs band (3/3) |
| `Emmaus1.jpg` | Onderwijs — Bs Emmaus teaser |
| `2020-06-28_Wilma.jpg` | Contact — portrait |
| `boomwhackers_1c.jpg` | Workshopmogelijkheden sub‑page — side image |
| `_DSC8853.jpg`, `spirit_3.jpg` | reserved — Spirit sub‑page (teasers off Koren landing) |
| `2024-05_met_kinderen.jpg`, `2024-03-20.jpg` | reserved — Singin'Gestel sub‑page |
| `MIKS_logo.png` | reserved — Popkoor MIKS sub‑page |
| `2020-12-jamulus.png` | *unused* (was workshop landing, now stripped) |

---

## 1. Site identity

| | |
|---|---|
| Domain | mimamusic.nl |
| Brand | **MiMaMusic** (stylised; logo delivered as an article/module, text “MiMaMusic”) |
| Language | Dutch (NL) — rebuild entirely in Dutch |
| Who | One musician operating as a small business: **choir conductor (koordirigent), flute/recorder teacher (dwarsfluit/blokfluit), music arranger (arrangeren)**, plus workshops and musical accompaniment |
| Region hint | Eindhoven area (“Singin’Gestel” → Gestel; choirs are local) |
| Tone | Personal, warm, community/education focused. Not corporate. |

### Services / themes (from nav + categories + articles)
- **Koren** — directing / involvement with local choirs
- **Onderwijs** — music education generally
- **Dwarsfluit** — flute & recorder (blokfluit) lessons, incl. history / “the flutist”
- **Arrangeren** — music arranging service (example work: “Sound of silence”, “Arrangementen”)
- **Workshop / les** — workshops + “muzikale ondersteuning” (musical support/accompaniment)
- **Agenda** — public performance/event calendar
- **Contact** — “over mij” (about) + contact

---

## 2. Original tech stack (for visual reference only)

- Joomla 3.9+ (EOL). CMS content in DB is clean of injection.
- Front‑end template: **Gavick / GavernWebEngine (GK5)** template.
  - Active style: `theme3339 - Default` (id 9). Sibling working copy: `kopie-theatre` (id 10) → base template is Gavick **“Theatre”**.
  - Real template folder + assets: `templates/theme3339/…` (`css/`, `images/`).
  - Layout params (partial): `top_layout=normal`, `header_layout=normal`, `nav_…` — standard GK5 layout.
- Libraries: **jQuery + Bootstrap 3 + FontAwesome 4.7** era.

### Live CSS facts (from `templates/theme3339/css/template.css`, fetched 2026‑08‑29)
- Layout container: `.container { width:100%; max-width:1200px; margin:0 auto; padding:0 15px }`
  — the whole site is a **1200px centred column**; nav, page titles, footer all
  align to its left edge (this is why the menu looks "centred").
- Body background `#000000`.
- **Fonts** (Google, loaded in `<head>`): `Henny Penny`, `Fredericka the Great`,
  `Gabriela` (+ `Open Sans` via the mega‑menu module).
  - Logo: `#logo a { font: 60px/100px 'Henny Penny', cursive; color:#fff }`
  - Red page headings: `h*.title { font-family:'Fredericka the Great',cursive; color:#cb4752 }`
  - Grey page headings: `h*.heading-style-1 { font-family:'Henny Penny',cursive; color:#7e7e7e }`
  - Base headings + body + `.copyright`: `'Gabriela', serif` (base heading color `#333`)
- Two horizontal rules: `#header { border-top:1px solid #1c1c1c }` (above the menu)
  and `#footer-wrapper .footer-wrapper-inner { border-top:1px solid #1c1c1c;
  padding:49px 0 25px }` (above the footer). `.copyright { color:#2b2b2b }`.
- Still to fetch for full fidelity: mega‑menu skin
  `modules/mod_jux_easy_megamenu/assets/css/style/custom-124.css` (menu bar
  gradient/colours), and heading font‑sizes.
- Navigation: **mega menu**. Historic churn across `mod_jux_easy_megamenu`, IceMegaMenu, and **DJ‑MegaMenu** (`mod_djmegamenu_button` mobile toggle is the live one). Treat nav as a multi‑column mega menu with a mobile hamburger.
- Editor: JCE.
- Known harmless bug on the old site: `www` vs non‑`www` CORS errors on FontAwesome fonts — disappears on rebuild.

---

## 3. Information architecture / sitemap

Top navigation (published `mainmenu`, in order). All section pages are Joomla
category views (list/blog of that category); rebuild as a landing page per
section.

```
Home                     → category "home"        (3 blocks, 1 photo each; no slider)
Koren                    → category "Koren"
  ├─ gospelpopkoor Spirit → article id 1
  ├─ Singin'Gestel        → article id 2
  └─ Popkoor MIKS         → article id 43
Onderwijs                → category "Onderwijs"
Dwarsfluit               → category "dwarsfluit"
Arrangeren               → category "Arrangeren"
workshop/les             → category "Workshops"
  ├─ Muzikale ondersteuning → article id 9
  └─ Workshopmogelijkheden  → article id 32
Agenda                   → JEvents month calendar
Contact                  → category "Contact"
```

Footer‑level / utility page:
- **Privacy** — category “Privacy” (privacy statement; linked from footer, not main nav)

### Active content categories (com_content)
| id | path | title | in nav |
|---|---|---|---|
| 16 | home | Home | Home |
| 2 | koren | Koren | Koren |
| 8 | onderwijs | Onderwijs | Onderwijs |
| 10 | dwarsfluit | dwarsfluit | Dwarsfluit |
| 13 | arrangeren | Arrangeren | Arrangeren |
| 11 | workshops | Workshops | workshop/les |
| 15 | agenda | Agenda | Agenda |
| 12 | contact | Contact | Contact |
| 14 | privacy | Privacy | footer |

Trashed/legacy categories (do **not** rebuild): `levenswijs`, `slider`,
`banner-footer`, `spirit-agenda`, `koor-voluum-agenda`, `ggk-agenda`,
`vmk-agenda`, `levenswijs-koor-agenda`, `agenda koor events`, `contact/contact`.

---

## 4. Page‑by‑page content inventory

State: `1`=published, `2`=archived, `0`=unpublished, `-2`=trashed.
**Rebuild state 1 and 2. Skip 0 and -2** unless noted.

### Home  (category `home`)
| id | title | alias | state | note |
|---|---|---|---|---|
| 15 | Homepage 3 | home-artikel | 1 | **primary home content** (hits 152 — highest on site) |
| 16 | Homepage 2 | homepage-foto-1 | 1 | secondary home block / photo |
| 21 | Homepage 1 | home | 1 | home block |
| 24/25/26 | swiper homepage | swiper-homepage(-2/-3) | -2 | **image‑slider slides** — recover imagery from Wayback |
| 23 | Home 3 | home-3 | -2 | skip |
| 34 | Privacy | privacy | -2 | see Privacy category instead |

Home layout = section landing built from the three “Homepage 1/2/3” blocks, each
with its own inline photo (details below). An older design had a `mod_swiper`
carousel (articles 24/25/26, now trashed, state −2) — **do not rebuild it**; the
current published homepage has no carousel.

**Content status — DONE (2026‑08‑29), SQL 7b run + reconciled with live site & Wayback.**

Query `SELECT ... FROM mm_content WHERE id IN (15,16,21)` returned the full
`introtext` of each block; **`fulltext` is empty** for all three — nothing hidden,
nothing to "restore". The homepage is genuinely just three short blocks, each
**heading + 2 lines + one still photo** (NOT a carousel — the Swiper was an old,
trashed design; ids 24/25/26).

| id | block (heading) | text | photo (per `introtext`) | size | original placement |
|---|---|---|---|---|---|
| 21 | **Dirigeren** | “Een intensieve verbinding aangaan met je musici en samen hoorbaar maken wat er in je hoofd klinkt.” | `images/home/2017-12b.jpg` (alt “homepage 1”, title “dirigeren”) | 249×275 | `class="pull-left"` — float left, text wrapped |
| 16 | **Onderwijs** | “Leerlingen meenemen in jouw liefde voor muziek en mogelijkheden aanbieden om hier aan mee te doen.” | `images/2012-11-06__De_Bron_leslokaal_4.jpg` | 321×180 | block, below text (wrapped in its own `<h1>`) |
| 15 | **Dwarsfluit** | “Muziek zonder woorden. / Het instrument als spreekbuis.” | `images/home/Wilma_fluitist_1986.jpg` (alt “home 3”, title “fluitist”) | 222×290 | block, below text |

**Prototype layout (owner decision 2026‑08‑29): reproduce the original.**
The live homepage is a Joomla category blog in **3 equal columns** (`items-row
cols-3`, each `col-sm-4`), confirmed identical in the live site *and* the
April 2025 Wayback capture. Prototype now matches:
- 3 columns side by side (`#page-home .home-cols` flex, 33.333% each), **stack
  below 768 px**.
- Each column: title → **one `<p>`** of body copy → photo **below**. (The original
  splits each line into its own `<p>`, which gave paragraph‑sized gaps between
  lines; collapsed to one naturally‑wrapping paragraph so line spacing = the
  20px `line-height` used everywhere else.)
- **UX polish pass (2026‑08‑29):**
  - All 3 photos share **height 240 px** and their text blocks reserve an equal
    height, so the photos line up on one top *and* bottom shelf.
  - **Dirigeren / Dwarsfluit**: 270 px wide (slight `object-fit: cover` crop;
    Dwarsfluit portrait pinned `object-position: center top` to keep the face).
  - **Onderwijs**: kept at its **native 16:9** → `427 = 240 × 16/9` wide, shown
    **uncropped** (`object-fit: contain`).
  - Row laid out `justify-content: space-between` across the 1170 px measure
    (= the grey menu‑bar width): `270 + 427 + 270 + two equal 101 px gaps`.
    Left edge of Dirigeren = menu‑bar left edge; right edge of Dwarsfluit =
    menu‑bar right edge; the two inter‑photo gaps are equal. Fits with room to
    spare, so no shrink needed.
  - Display heading eased to `clamp(22–27px)` on the homepage only.
  - Stacks to one column below 1040 px (the middle photo is wide).
  - Original per‑photo sizes (249×275 / 321×180 / 222×290) recorded above if
    ever wanted back. Photos are plain left‑aligned blocks (dropped `pull-left`).
- All columns left‑aligned; column 1's left edge = container left edge = menu‑bar
  left edge (same `.container` / `--pad` as `.site-header`, `.nav-inner`, `.page`,
  `.foot-inner` — true on every page).

Not a final design choice — owner may modernise later (the vertical stack we'd
briefly built is the obvious alternative). Fake carousel + its CSS/JS were
removed from `build_images.py`; `.home-cols` / `.home-col` / `.home-figure--*`
classes added.

Open points still to resolve:
- **`{loadmoduleid 92}`** sits inside every home `<h1>`, before the coloured word.
  Unknown module — run **SQL 7d** (`mm_modules` id 92) to see if it's a divider,
  an icon, or empty. Prototype ignores it for now.
- **Heading colour**: these `<h1>`s use an **inline** `color:#9a2d2d` (muted brick
  red), vs the prototype's `--title-red #cb4752` (guessed) / the brighter
  `#e8342a` seen on other pages. Confirm the real template `--red` via SQL 7a and
  reconcile site‑wide.
- Original markup is 3× `<h1>` on one page — prototype uses `<h2 class="page-title">`
  (kept intentionally; better structure, same look).

### Koren  (category `Koren`)
**Full list confirmed via §7 query (h), 2026‑08‑29** — 8 articles, ordered:
| ord | id | title | alias | state | on landing? |
|---|---|---|---|---|---|
| 1 | 19 | Koordirigent | koordirigent | 1 (featured) | **leading** |
| 2 | 41 | project- mannenkoor | project-mannenkoor | −2 trashed | no — skip |
| 3 | 1 | gospelpopkoor Spirit | gospelpopkoor-spirit | 1 | **teaser + sub‑page** |
| 4 | 2 | Singin'Gestel | singin-gestel | 1 | **teaser + sub‑page** |
| 5 | 3 | Vughts Mannenkoor – VMK | vughts-mannenkoor-vmk | **0 unpublished** | no — paused (was live incl. Apr‑2025 Wayback); has body + `VMK_2022_.jpg` 274×121 · `VMK__projectkoor2_2022.jpg` 198×119 if she re‑enables |
| 6 | 43 | Popkoor MIKS | popkoor-miks | 1 | **teaser + sub‑page** |
| 7 | 4 | Koor Voluum | koor-voluum | **2 archived** | no on blog — keep as standalone historical page (dirigent 2018–jul 2024); `WhatsApp_Image_2019-01-26_at_191543.jpeg` 216×144 · `koororkest2.png` 250×140 · `kerst2.png` 506×223 |
| 8 | 5 | LevensWijs Koor | levenswijs-koor | −2 trashed | no — skip |

All rows: `images` JSON empty → every photo is an inline `<img>` in the body.
Articles are **introtext‑only** (no `fulltext`), so each teaser text == its
sub‑page text.

**Koren landing = Joomla category blog** (live `/index.php/koren`): **leading**
article (id 19 *Koordirigent* — paragraph + 4‑photo row) then a **cols‑2** teaser
grid, live display order **Spirit → MIKS → Singin'Gestel**, each: title (links to
sub‑page) + intro text + photos:
- **Spirit** — `_DSC8853.jpg` 408×230 + `spirit_3.jpg` 407×228; link `www.spiritgospelpop.nl`
- **MIKS** — `MIKS_logo.png` 175×52; address block Meander / Meanderplein 3 / 5271 GC
- **Singin'Gestel** — `2024-05_met_kinderen.jpg` + `2024-03-20.jpg` (both 216×162); link `www.singingestel.nl`

*Koordirigent body:* "Wat is er nou heerlijker dan het dirigeren van een koor…
Elk concert wordt daardoor een vreugdevolle uiting van positieve energie."

*Koordirigent 4‑photo row* — original: native ratios, all ≈158 px tall,
left‑aligned, small gaps, empty space to the right. **Prototype (owner decision
2026‑08‑29):** same equal‑height treatment as the homepage band — flex‑grow ∝
each photo's aspect ratio so the row spans the full menu‑bar width (~252 px tall,
ratios preserved, no cropping). Photos:
`2010-kerst__dirigent_wilma_in_de_sneeuw.jpg` (105×158) ·
`2015-09-23_GGK_40.png` (236×157) · `Wilma_vleermuis_2022.jpg` (160×158) ·
`Wilma_2024.jpg` (212×159).

**Prototype (2026‑08‑29):** Koren landing = **only** *Koordirigent* heading
(`is-red`) + paragraph + shared `.photo-band` 4‑photo row. **No choir teasers.**
Owner checked the live rendered `/index.php/koren` (screenshot) — it shows just
the Koordirigent block; the per‑choir content appears only on each choir's own
page, reached via the KOREN dropdown. (Earlier the `cols-2` teaser articles were
*in the served HTML* but don't paint on the live broken‑JS site — same as the
Onderwijs/Bs Emmaus case. The rendered page + owner's call win.) See D14.

*History:* teasers were briefly added (D12 made them full‑width) then removed
per the owner. Sub‑pages `page-spirit/-singin/-miks/-voluum` keep placeholder
bodies — fill from the query‑(h) text (saved) when building those pages.
**Onderwijs/Bs Emmaus teaser is kept for now** — to be decided with the owner.

### Onderwijs  (category `Onderwijs`)
Category blog. **Full list confirmed via §7 query (h), 2026‑08‑29** — 5 articles,
only 2 live:
| id | title | alias | state | role |
|---|---|---|---|---|
| 17 | Onderwijs | onderwijs | 1 (featured) | **leading** — intro + 3‑photo row |
| 7 | Bs Emmaus | bs-emmaus | 1 | cols‑2 teaser (text + `Emmaus1.jpg` float‑left, link to school site) |
| 6 | KC Het Bossche Broek | kc-het-bossche-broek | −2 | trashed stub — skip |
| 13 | Bs De Fonkeling | basisschool-de-fonkeling | −2 | trashed (has body + `Fonkeling.jpg`) — skip |
| 8 | informatie | info | −2 | trashed stub — skip |

All rows: `images` JSON empty → every photo is an inline `<img>` in the body.

*Leading body:* "De studie Docent Muziek heb ik aan de Fontys in Tilburg gedaan…
Als je dat plezier kunt ervaren dan brengt dat je veel rijkdom."

*3‑photo row* (live dims): `2014-10-08_Bieb_Heyhoef3.jpg` (203×154) ·
`2012-11-06__De_Bron_leslokaal.jpg` (274×155) · `djembe_60.jpg` (233×156 native).

*Bs Emmaus body:* "Sinds enkele jaren werk ik op basisschool Emmaus in Heesch…
we hebben samen wel veel plezier gehad." + link to
`sites.google.com/filiosscholengroep.nl/bsemmaus` + `Emmaus1.jpg` (275×183).

**Prototype (2026‑08‑29):** landing = `Onderwijs` heading (`is-red`) + paragraph
+ shared `.photo-band` row + **`.teaser-grid`** with the Bs Emmaus teaser
(text + `Emmaus1.jpg` 275×183, link to the school site). Matches the original.

### Dwarsfluit  (category `dwarsfluit`)
| id | title | alias | state |
|---|---|---|---|
| 10 | Blokfluitles | blokfluitles | 1 |
| 33 | Dwarsfluitles | dwarsfluitles-categorie | 1 |
| 11 | fluitist | dwarsfluitist | 1 |
| 18 | Geschiedenis | dwarsfluit-geschiedenis | 1 |
| 12 | informatie | informatie | -2 (skip) |

### Arrangeren  (category `Arrangeren`)
| id | title | alias | state | note |
|---|---|---|---|---|
| 36 | Arrangeren | arrangeren | 1 | main section text |
| 14 | Arrangementen | arrangementen | 1 | portfolio/examples (2019) |
| 42 | Sound of silence | sound-of-silence | 0 | unpublished example — include only if content is complete |
| 20 | Arrangeren | arrangeren-2 | -2 (skip) |

### Workshops  (category `Workshops`, nav “workshop/les”)
From live `/index.php/workshops-en-les` 2026‑08‑29 — category blog:
| id | title | alias | role |
|---|---|---|---|
| 9 | Muzikale ondersteuning | muzikale-ondersteuning | **leading** — heading + one paragraph, no photo; nav child |
| 40 | Jamulus | 40-jamulus | teaser only (no menu item); `2020-12-jamulus.png` 274×234 |
| 32 | Workshopmogelijkheden | workshopmogelijkheden | teaser + nav child; `boomwhackers_1c.jpg` 303×225 |
| 31 | *(third teaser — body not yet pulled)* | | teaser |

*Leading body:* "Sinds 1988 ben ik al bezig met muziekonderwijs… Heb je een vraag?
neem even contact op met info@mimamusic.nl" (email cloaked in the live HTML).

**Prototype (2026‑08‑29):** the `workshop/les` **landing** (`#page-workshop`) =
the *Muzikale ondersteuning* leading article only — heading (`is-red`) + the one
paragraph, mailto link, **no photo, no teasers** (per D14, matches the rendered
live page in the owner's screenshot). Was a placeholder + choir‑list + a
jamulus photo; all removed. `2020-12-jamulus.png` now unused.
Sub‑pages `#page-ondersteuning` (same text, `is-dim` title) and
`#page-workshopmog` unchanged.

### Contact  (category `Contact`)
| id | title | alias | state | note |
|---|---|---|---|---|
| 38 | over mij, | over-mij | 1 | **the whole Contact page** — about + contact details |
| 39 | contact-foto | contact-foto | -2 | photo asset only |

Live `/index.php/contact` (fetched 2026‑08‑29) is now just the **"over mij,"**
leading article (the old Bootstrap‑tabs module is gone). Content, in order:
- `2020-06-28_Wilma.jpg` (214×231) float right
- **`MiMaMusic`** first line — `<strong 18pt>`: "MiMa" `#ffffff` + "Music"
  `#ce3939` `<em>` italic; then " is mijn bedrijfsnaam sinds 2017 ." normal
- "Mijn naam is **Wilma van der Schoot**" — bold `#9a2d2d`
- bio paragraph (4 lines, `<br>`)
- "Voor contact kun je mailen:" → cloaked email (`wilmavanderschoot@mimamusic.nl`)
- "of bellen" — white 10pt · "06-27418262" — `#ce3939` 14pt

**Prototype (2026‑08‑29):** text + inline styling synced to the above
(`#ce3939`, `#9a2d2d`, 18pt/14pt/10pt). **Photo kept as the prototype's
`ph-portrait`** (owner: its placing/size is better than the original). Old
"Bootstrap‑tabs / build a form + map" placeholder removed. A real **contact
form** (replacing the `/at/` email) is still a later step.

### Privacy  (category `Privacy`)
- Privacy statement. Fetch body (rows beyond first 25). Link from footer.

---

## 5. Global / shared elements

### Header
- **Logo**: “MiMaMusic” wordmark, served via `mod_articles_single` modules
  (“Logo”, “aside right - logo MiMaMusic”). Extract the image from live site /
  `templates/theme3339/images/` / Wayback. Rebuild as a normal `<img>` logo
  linking to Home.
- **Mega menu** (`mod_menu` id 1 + DJ‑MegaMenu). Desktop: horizontal bar with
  dropdown panels for **Koren** (3 items) and **workshop/les** (2 items).
  Mobile: hamburger (`mod_djmegamenu_button`).

### Footer
- Previously held **choir banner images** (category `banner-footer`, module
  “spirit en voluum Banners” — both trashed). Rebuild footer with: short
  MiMaMusic blurb, contact essentials, link to **Privacy**, optional social
  links. Recover any footer banner art from Wayback if still wanted.

### Site‑wide widgets
| Feature | Original | Rebuild recommendation |
|---|---|---|
| Live chat | Olark (`mod_tm_olark_chat`, published) | Re‑add Olark snippet, or Squarespace chat, or drop |
| Article comments | Komento (`mod_komento_comments` / `_activities`, published) | Squarespace native comments or Disqus; or drop (low volume) |
| Cookie banner | EU Cookie Directive Lite (currently disabled) | Squarespace cookie‑banner setting |
| Social share / login | SocialLogin + LoginRadius | Simple share buttons only; **no social login** |
| Newsletter | AcyMailing (integration plugin disabled) | Add only if the owner wants it |

---

## 6. Functional sections

### Agenda / events
- Original: **JEvents** month calendar at `index.php?option=com_jevents&view=month`.
  **Live grid is currently empty** (checked Aug 2026 — no events any day).
- **Prototype (2026‑08‑29):** the dev placeholder ("export SQL 7f") was replaced
  with a plain reader‑facing line above the mock grid: *"In de agenda staan de
  komende concerten, kerkdiensten en optredens van MiMaMusic en de koren. Op dit
  moment staan er geen activiteiten gepland — kom hier binnenkort terug voor
  nieuwe data."* The month grid stays as a static visual.
- **OPEN — decide with owner** what powers the agenda on the new site:
  Squarespace Events collection · embedded Google Calendar (keeps the grid, easy
  for a non‑dev) · a hand‑maintained "Aankomende optredens" list · or drop the
  page. Run §7 query (f) once to confirm there's no hidden past/future event
  data worth carrying (`mm_jevents_*`).

### Photo galleries
- **JoomGallery** is installed (`mm_joomgallery*` tables) — the site has one or
  more photo galleries (choirs / performances). Export gallery list + images
  (§7) and rebuild as Squarespace gallery sections/pages.

### Contact
- Rebuild: about‑the‑musician text (article 38 “over mij”), contact details,
  a contact **form**, and a **map** (Google Maps plugin was present but
  disabled — add a map block with the real address).

---

## 7. Data still to extract (run in phpMyAdmin, prefix `mm_`)

Paste results back into the cleanup thread or straight into the design thread.

```sql
-- (a) Full template branding params — colours, logo path, Google fonts, layout
SELECT params FROM `mm_template_styles` WHERE id IN (9,10);

-- (b) ALL article bodies (published + archived), in category order
SELECT id, catid, title, alias, state, introtext, `fulltext`, images, `fulltext`='' AS intro_only, created, modified
FROM `mm_content` WHERE state IN (1,2) ORDER BY catid, ordering;

-- (c) The article rows the first recon truncated (see everything, 43 total)
SELECT c.id, c.title, c.alias, c.state, cat.title AS category, c.created
FROM `mm_content` c LEFT JOIN `mm_categories` cat ON cat.id=c.catid
ORDER BY c.id;

-- (d) Published module content (footer text, logo markup, sidebar, tabs) + params
SELECT id, title, module, position, published, showtitle, content, params
FROM `mm_modules` WHERE client_id=0 AND published=1 ORDER BY position, ordering;

-- (e) Which menu item is the home page + per-item params/layout
SELECT id, title, link, type, home, template_style_id, params
FROM `mm_menu` WHERE client_id=0 AND published=1 ORDER BY lft;

-- (f) Agenda / events content
SELECT v.ev_id, d.summary, d.description, d.location, d.contact, d.dtstart, d.dtend, d.rrule
FROM `mm_jevents_vevent` v
JOIN `mm_jevents_vevdetail` d ON d.evdet_id = v.detail_id
ORDER BY d.dtstart DESC;

-- (g) Photo galleries + image counts, then image filenames per gallery
SELECT cid, name, description, parent_id FROM `mm_joomgallery_catg` ORDER BY parent_id, ordering;
SELECT id, catid, imgtitle, imgfilename, imgdate, published FROM `mm_joomgallery` ORDER BY catid, ordering;

-- (h) EVERY article in a category incl. trashed/unpublished, with body + images.
--     Answers "does 'Onderwijs' hold more than the 2 live articles?"
--     Swap 'Onderwijs' for any category alias (Koren, dwarsfluit, workshops-en-les, ...).
SELECT c.id, c.title, c.alias, c.state,          -- state: 1=published 0=unpublished 2=archived -2=trashed
       c.created, c.modified, c.featured, c.ordering,
       LENGTH(c.introtext) AS introtext_len, LENGTH(c.`fulltext`) AS fulltext_len,
       c.images, c.introtext, c.`fulltext`
FROM `mm_content` c
JOIN `mm_categories` cat ON cat.id = c.catid
WHERE cat.path = 'Onderwijs' OR cat.alias = 'onderwijs'
ORDER BY c.state DESC, c.ordering;
```

### Non‑DB assets to capture
- **Live site** still loads (slow): save rendered HTML + `templates/theme3339/css/*`
  for real colours, fonts, spacing, logo. Ignore/strip all `<script>`.
- **Wayback Machine**: `https://web.archive.org/web/2*/mimamusic.nl` — pull a
  recent clean snapshot for layout + imagery (slider slides, footer banners,
  gallery photos). Use an older snapshot if a recent one shows malware effects.
- **Images**: `/images/` — ✅ **done**, all 20 files pulled to `website/images/`
  (see §0 inventory). Still worth checking `/templates/theme3339/images/` for the
  header wordmark asset and any footer‑banner art.

---

## 8. Out of scope / do not copy

- **Kunena forum** — installed (`mm_kunena_*`) but **0 members / unused**. Do not rebuild a forum. `mod_menu` id 105 “Kunena Menu” — ignore.
- **Malware** — the live site has a file‑level injection (redirect malware to `*.whitellllshop.icu`, loader functions `htg`/`gtg`, tampered `jquery.min.js` + inline scripts). Being handled separately. **Never paste live‑site JS into the rebuild.**
- Rogue account `admin2` (Joomla id 43) — cleanup‑thread concern only, not relevant to the rebuild.
- All `state = -2` / trashed categories and articles listed above.
- Legacy/disabled extensions: Balbooa BA Forms/Gallery, IceMegaMenu, old Swiper module config, banner modules.

---

## 9. Squarespace mapping (target build)

| Original | Squarespace |
|---|---|
| Home (3 blocks, 1 photo each) | Home page: three text sections, each a short heading + 2 lines + one image block (no slideshow) |
| Koren (+ 3 choir articles) | **Folder** “Koren” with a landing page + 3 sub‑pages (Spirit, Singin’Gestel, Popkoor MIKS). Keep archived “Koor Voluum” as a 4th sub‑page if wanted |
| Onderwijs | Single page |
| Dwarsfluit | Single page (sections: lessen, blokfluit, de fluitist, geschiedenis) |
| Arrangeren | Single page + examples/portfolio section |
| workshop/les (+ 2 articles) | Folder with landing + “Muzikale ondersteuning” + “Workshopmogelijkheden” |
| Agenda (JEvents) | **Events** collection page |
| Contact (bootstrap tabs) | Contact page: about text + details + **Form block** + **Map block** |
| Privacy | Page, linked in footer only |
| Comments (Komento) | Native comments / Disqus / omit |
| Chat (Olark) | Re‑add Olark or use Squarespace chat |
| Forum (Kunena) | **Drop** |

### Still‑unknown for pixel fidelity (fill from §7 + live CSS)
- Brand colours, heading/body typefaces (GK5 templates often load a Google font — see param `googleFont`).
- Exact logo lockup.
- Footer composition.

---

## 10. Design decisions log  (prototype — keep or revisit)

| # | Decision | Why | Revisit? |
|---|---|---|---|
| D1 | All‑black ground | It's the GK5 "Theatre" template default, not a chosen identity | Ask owner if she wants it lighter |
| D2 | **Content text = `Arial, Helvetica, sans-serif`, 14px / line-height 20px** — from the real `body {}` rule in `template.css` (fetched 2026‑08‑29). The Google fonts (Henny Penny, Fredericka the Great, Gabriela) load, but **Gabriela is only applied to bare `h1..h6`**, never body copy — the earlier "body = Gabriela serif" was wrong and is now corrected in the prototype. `--font-body` was Gabriela serif → now Arial. | `template.css` `body { font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:20px }` | Keep (it's the real thing); modernise later with owner |
| D3 | Content text colour **`#989898`** (was `#f4f4f4`); red `#cb4752`, grey heading `#7e7e7e`. Bold inside content = red `#cb4752` (`.item_introtext strong`). | All from `template.css`: `body { color:#989898 }` | Keep; still revisit near‑invisible `.copyright #2b2b2b` |
| D4 | **RESOLVED 2026‑08‑29 — section titles = Gabriela serif.** Prototype `.page-title` was Henny Penny / Fredericka the Great, `clamp(26–34px)`; owner asked to match the live site. Confirmed against `template.css` + a pasted live DOM of a sub‑page: section titles are bare `<h3 class="item_title">` → template base `h1..h6 { font-family:'Gabriela',serif; font-weight:400; line-height:1.5 }`, Bootstrap `h3` = **24px**; colour `#cb4752` when the title is a link (category‑landing titles), `#333` when not (sub‑pages). Prototype now: `.page-title { font: 400 20px/1.5 "Gabriela", Georgia, serif }`; `.is-red` `#cb4752`, `.is-dim` `#6f6f6f` (live is `#333`, near‑invisible on black — kept readable, flag for owner). `Fredericka the Great` dropped from the font load (unused). The per‑page inline heading quirks in article bodies (home `#9a2d2d`, Arrangeren `#ff0000` 14pt) are still transcribed as‑is where they occur. | Owner: match the original | Owner: OK the `#6f6f6f` vs live `#333` for sub‑page titles |
| D5 | **1200px centred container** (`margin: 0 auto`); ~1170px text column | Matches live `template.css` `.container` | Keep |
| D6 | Nav = single‑column dropdowns; **parent items (Koren, workshop/les) are links** → click = go to landing page, hover/focus = open dropdown; dropdown lists **only the children** (no repeated parent) | Standard mega‑menu behaviour; simplifies the original DJ‑MegaMenu; menus are tiny | Fine → Squarespace Folders (folder landing page + child pages) |
| D7 | ~~Home slider~~ → **removed**. Home reproduces the original: **3 columns** (`col-sm-4`), each title → 2 `<p>` lines → photo below (`2017-12b.jpg` 249×275 `pull-left` / `De_Bron_leslokaal_4.jpg` 321×180 / `Wilma_fluitist_1986.jpg` 222×290) per `mm_content` 21/16/15; stacks <768px | SQL 7b: no carousel. Owner: reproduce original now, modernise later with her | Revisit with owner |
| D8 | Footer badge = real `MIMAmusic_LOGO2-4.png` | Actual asset | Keep |
| D9 | Dropped the "Joomla!" footer line | No Joomla cruft on the rebuild | — |
| D10 | Transcribed copy keeps original quirks ("2017 .", "Dat  was", "Sind 2014") | Faithful until owner proofreads | Owner proofread pass |
| D11 | **Footer** (owner, 2026‑08‑29, evolved): first stripped to just the circular MiMaMusic badge (dropped the "Privacy" link and the "Joomla! is Free Software…" line for good). Then the owner asked for `Copyright © <year> MimaMusic. All Rights Reserved.` back — **home page only**, **below** the badge — with the year auto‑set (`document.getElementById('cur-year').textContent = new Date().getFullYear()`, toggled by `show()`). `.foot-nav` CSS gone; `.copyright` re‑added (`12px #8f8f8f`). `#page-privacy` still in the markup but unlinked. | Owner iterated on it | Owner: confirm home‑only + below‑badge placement; decide if other pages need any footer link |
| D12 | **One text measure everywhere.** The original renders the same article at two widths — full (`col-sm-12`) on its own page, half (`cols-2`/`col-sm-6`) as a category‑blog teaser. Prototype drops that split: all content text (leading, teaser, sub‑page) flows at the shared `--measure` (~1170px, menu‑bar width); teaser blocks are full‑width stacked, not `cols-2`. | Owner pointed at the full‑width version; also serves "all pages breathe the same look" | Keep |
| D14 | **Section landings = leading article only** (owner, 2026‑08‑29, from the live rendered Koren page). Koren landing shows just Koordirigent + text + 4 photos; the choir teasers were removed. Per‑choir content lives on its own sub‑page via the dropdown. Onderwijs/Bs Emmaus teaser kept pending owner review. Supersedes the earlier "match the original cols‑2 teasers". | Live rendered page shows no teasers; broken‑JS site isn't a reliable visual ref, owner's call is | Confirm Bs Emmaus with owner |
| D13 | **Vertical rhythm matched to live `template.css`, via the shared rules** (so every page moves together): `.page { padding-bottom: 69px }` (= live `#content { padding-bottom:69px }`, was 96); `.foot-inner { padding: 49px … 40px }` + `.badge-img { margin-top:0 }` (= live `.footer-wrapper-inner { padding-top:49px }`, was 40+22); **removed `main { min-height: 76vh }`** — that was stretching `<main>` on short pages (Singin'Gestel, MIKS, Spirit, Voluum) so the footer divider sat far below the content. Live site has no such rule; footer now sits directly under the content, black fills the rest of the viewport. **Paragraph spacing** `.prose p` / `.teaser p` `margin-bottom` 10 → **20px** (= live `p { margin:0; padding:0 0 20px }`) — site‑wide, one knob. | Owner: match the original's spacing | Keep |

## 11. Open items to resolve before the Squarespace build

**Data — phpMyAdmin, prefix `mm_` (full queries in §7):**
- [x] 7a template branding — **have `template.css`** (saved 2026‑08‑29). Confirmed:
  `body { font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:20px;
  color:#989898; background:#000 }`; bare `h*` = Gabriela serif `#333` / `h1` 2em;
  `h*.heading-style-1` = Henny Penny `#7e7e7e` **48px**; `h*.title` = Fredericka the
  Great `#cb4752` (no explicit size). Fonts via `//fonts.googleapis.com` (Fredericka
  the Great, Gabriela, Henny Penny, + Open Sans for the megamenu).
  Still want: mega‑menu skin `custom-124.css`; module 92 (SQL 7d).
- [ ] **Heading system decision** (see D4) — the real site's per‑page inline heading
  styles vs the prototype's single `.page-title`.
- [ ] 7b / 7c all article bodies (every block still marked *"nog op te halen"*)
      — **Home (21/16/15) DONE 2026‑08‑29**, see §4 Home
- [ ] 7d published module content (footer text, logo markup, sidebar) — **incl. module 92**
      (`{loadmoduleid 92}` appears inside every homepage heading)
- [ ] 7e Home menu item + per‑item params
- [ ] 7f events (JEvents) → Agenda
- [ ] 7g JoomGallery categories + image filenames

**Assets:**
- [ ] Header wordmark asset (`/templates/theme3339/images/`) or confirm font‑only
- [x] Homepage photos — 3 stills, all already in `website/images/` (see §4 Home)
- [ ] Footer‑banner art if wanted (`banner-footer` category; Wayback)
- [ ] Koor Voluum photo (or accept none)
- [ ] Gallery photos per 7g
- [ ] Any higher‑res originals the owner still has

**Content / copy:**
- [ ] Owner proofreads all transcribed text
- [ ] Home blocks 1/2/3 final text + which image pairs with block 2
- [ ] Privacy statement — accurate current NL/GDPR text
- [ ] Contact — real postal address (map) + form recipient address

**Owner decisions:**
- [ ] Keep the dark look or lighten it?
- [ ] Live chat (Olark) — re‑add / Squarespace chat / drop?
- [ ] Comments (Komento) — native / Disqus / drop?
- [ ] Newsletter (AcyMailing) — want it?
- [ ] Keep archived pages (Koor Voluum) visible?
- [ ] Galleries — how many / which / pages or sections?

## 12. Go‑live / cutover checklist

- [ ] Build on the Squarespace trial URL; owner reviews.
- [ ] **Domain**: keep `mimamusic.nl`; point web DNS (A/CNAME or nameservers) to Squarespace.
- [ ] **Email**: leave **MX records untouched** — do not break `@mimamusic.nl` mail.
- [ ] Pick canonical host (www or non‑www); 301 the other (also fixes the old FontAwesome CORS bug).
- [ ] **301 redirect map** old → new (finalise from a Screaming Frog crawl of the live site):

  | old | new |
  |---|---|
  | `/`, `/index.php` | `/` |
  | `/index.php/koren` | `/koren` |
  | `/index.php/koren/gospelpopkoor-spirit` | `/koren/gospelpopkoor-spirit` |
  | `/index.php/koren/singin-gestel` | `/koren/singin-gestel` |
  | `/index.php/koren/popkoor-miks` | `/koren/popkoor-miks` |
  | `/index.php/onderwijs` | `/onderwijs` |
  | `/index.php/dwarsfluit` | `/dwarsfluit` |
  | `/index.php/arrangeren-menu` | `/arrangeren` |
  | `/index.php/workshops-en-les` | `/workshop-les` |
  | `/index.php/workshops-en-les/muzikale-ondersteuning` | `/workshop-les/muzikale-ondersteuning` |
  | `/index.php/workshops-en-les/workshopmogelijkheden` | `/workshop-les/workshopmogelijkheden` |
  | `/index.php/agenda` | `/agenda` |
  | `/index.php/contact` | `/contact` |
  | JEvents event URLs (`?option=com_jevents…`) | `/agenda` |

- [ ] Recreate/submit `sitemap.xml` in Google Search Console; keep good old page titles + meta descriptions.
- [ ] After go‑live: watch Search Console coverage + 404s for a few weeks.
- [ ] **Archive** the Joomla site (files + DB dump), then fully decommission it — don't leave the compromised install running.
- [ ] Rotate all remaining shared passwords once Joomla is gone.

## 13. Squarespace build notes

> Full feasibility matrix, plan choice, Custom CSS starting points and the trial
> log live in **`squarespace-trial.md`** (same folder). Summary below.

- **Plan**: **Business** or higher — Custom CSS / Code Injection is *not* on Personal.
- **Fonts**: Gabriela (body) is a standard Google font; Henny Penny + Fredericka the
  Great may need a Custom CSS `@import` or Adobe Fonts.
- **Nav**: two Folders (Koren, workshop/les) — but a folder *title is not a link* in
  Squarespace. Resolve: "overzicht" first child, or a JS injection (snippet in
  `squarespace-trial.md`), or dropdown‑only. Privacy in footer nav only.
- **Expectation**: ~85–90% with the style editor, ~95%+ with modest Custom CSS.
- **Home**: Slideshow section + three text sections (Homepage 1/2/3).
- **Dwarsfluit**: one page, four stacked sections (Dwarsfluitles, Blokfluitles, de fluitist, Geschiedenis).
- **Arrangeren**: one page + "Arrangementen" examples section.
- **Agenda**: Squarespace Events collection; import from 7f.
- **Galleries**: Gallery sections/pages from 7g.
- **Contact**: text + Form block (recipient = owner) + Map block (real address).
- **Cookie banner**: Squarespace setting. Chat / comments / newsletter per §11.
- Enter the §12 redirect table in Squarespace URL mappings.

## 14. Hosting / deploy  (platform NOT locked)

The prototype is static HTML, so the leading option is **static hosting we control**
rather than a closed builder. Squarespace stays the "least technical, monthly fee,
no code access" fallback (see `squarespace-trial.md`).

### Deploy artifact
`build_images.py` writes the self‑contained build to **two** places:
`website/mimamusic-reference.html` and repo‑root **`docs/index.html`** (+ `docs/.nojekyll`).
`docs/` is the publish directory for both GitHub Pages and Cloudflare Pages — no
build step needed on the host (images are data URIs, fonts from Google CDN).

### First test — GitHub Pages  (tried 2026‑08‑29, now PAUSED)
- Ran briefly at **https://hugoheefer.github.io/mimamusic/** from `master` `/docs`.
- Repo set **back to private** 2026‑08‑29 → Pages stops building on the free plan,
  so the URL is now down. This is a deliberate pause, not a rollback:
  `docs/index.html` + `docs/.nojekyll` stay in the repo, `build_images.py` keeps
  regenerating them, and the claude.ai Artifact preview still works.
- Decision deferred to §15 step 3: whether GitHub Pages (needs public repo or paid),
  Cloudflare Pages (private‑repo friendly), or another host is the right home.
- The WIP prototype (specs panel, "nog op te halen" markers, single‑page JS nav) is
  a preview only; the real public site needs real pages + a CMS.

### Real hosting (later, with a CMS for the owner)
- **Cloudflare Pages** — same repo, auto‑deploy on push; private‑repo friendly,
  built‑in redirects (`_redirects`), privacy analytics (no cookie banner), Workers
  for a form backend and for the Git‑CMS OAuth.
- **Editor for Wilma**: Decap CMS or **Sveltia CMS** in the repo → `/admin` login,
  her save = git commit = auto‑deploy. She never touches code.
- Alternative: self‑hosted WordPress (prototype → theme) on a host we manage
  (e.g. Vimexx) — familiar admin, but back to PHP‑CMS maintenance.

---

## 15. Roadmap / sequencing  (agreed plan)

Governs the order of work. The point: the technical rewrite (step 4) touches all
the markup, so don't over‑polish before it, and get the owner's input before it.

### Step 1 — "Close enough" prototype  *(essentially done)*
- Structure, real fonts/colours/layout (from `template.css`), real photos in place.
- **Do not** chase the last ~5% pixel‑fidelity to the *old* site — it's an EOL
  template with quirks worth dropping, not preserving.

### Step 2 — Owner review NOW, on the big questions  *(before deep polish)*
- [ ] Keep the black look, or lighten / modernise?
- [ ] Keep Henny Penny / Fredericka the Great, or swap for cleaner faces?
- [ ] Structure: nav right? Keep the Agenda (was empty)? Keep archived choirs?
      Want photo galleries?
- [ ] Owner proofreads every text; hands over any missing article bodies + photos.
- [ ] How hands‑on does she want to be, and how often will she update? (drives the
      CMS choice)
- Show her the GitHub Pages preview: https://hugoheefer.github.io/mimamusic/

### Step 3 — Lock the maintenance model + tooling
- Decide before the rewrite (it dictates the structure).
- Expected: static multi‑page site + Git‑based CMS (**Sveltia / Decap**) for the
  owner, hosted on **Cloudflare Pages** (or GitHub Pages + an OAuth helper).
- A CMS means content lives in editable data files (markdown / YAML), not baked
  into HTML.

### Step 4 — Technical rewrite into the real structure
- Split the single file into **real pages with real URLs** (needed for SEO and the
  §12 301 redirects — the JS page‑switching prototype can't do that).
- Real `<img>` files (drop the data‑URI baking); shared header/footer via a light
  generator (Eleventy / Astro / Hugo); wire in the CMS config.
- Move styling over. **Prep now:** extract the inline `<style>` into a real
  `styles.css` — markup changes in the rewrite, but an organised stylesheet
  carries over almost intact, so polish effort isn't wasted.

### Step 5 — Fine‑polish in the real environment (with the owner)
- Then: content migration, redirects, Search Console, go‑live, decommission
  Joomla — see §12.
