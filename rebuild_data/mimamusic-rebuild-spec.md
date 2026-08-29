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

**Prototype:** `website/` in this repo — `mimamusic-reference.src.html` (edit) →
`build_images.py` → `mimamusic-reference.html` (published Artifact:
https://claude.ai/code/artifact/fcf1a98b-ad3e-460c-9f94-3b4a51c561fd).
Reference inputs (this spec + `screenshots old site/`) live in `rebuild_data/`.

### Done
- Visual shell matched to the live `template.css`: all‑black GK5 "Theatre" look,
  **1200px centred container** (menu / page titles / footer all align to its
  left edge), grey mega‑menu bar, **two full‑width divider rules** (above the
  menu, above the footer), circular MIMA footer badge (real logo image).
- **Real fonts** wired in: logo + grey headings = **Henny Penny**; red headings =
  **Fredericka the Great** (`#cb4752`); body = **Gabriela** serif. (Prototype had
  a single "Berkshire Swash" stand‑in before — now replaced.)
- Full nav + every section built, incl. **Koren** and **workshop/les** landing
  pages, **Dwarsfluit** as 4 articles, **Arrangeren** + "Arrangementen" block,
  archived **Koor Voluum**, **Privacy** page (footer‑linked only). Parent menu
  items link to their landing; dropdowns list only the children.
- **Home** = fading 3‑slide carousel (full‑frame, `object-fit: contain` on black —
  no cropping) + Homepage 1/2/3 blocks (bodies still placeholder). Real slide set
  + banner shape still unknown (trashed articles → check Wayback).
- **Agenda** = static repro of the JEvents month grid (Aug 2026).
- **Photos:** all 20 images from `mimamusic.nl/images/` downloaded to
  `website/images/` (full‑res) + `website/images/web/` (shrunk, ≤1000px q72),
  wired in where they map to the old pages — inventory below.

### Still pending
- **SQL 7a** — real brand colours + `googleFont` (prototype uses guessed
  `#e42a1a` + "Berkshire Swash" as the script face).
- **SQL 7b/7c** — bodies for every block still marked *"nog op te halen"*:
  Homepage 1/2/3, Koordirigent, Onderwijs, Dwarsfluitles, Blokfluitles, de
  fluitist, Muzikale ondersteuning, Workshopmogelijkheden intro, Arrangementen,
  Koor Voluum, Privacy.
- **SQL 7f** — events. **SQL 7g** — gallery images.
- Header wordmark is styled text (the real one is template‑font text, not an asset).
- Koor Voluum has no photo of its own.

### Image inventory  (`website/images/` — filename → use in prototype)
| file | used on |
|---|---|
| `MIMAmusic_LOGO2-4.png` | footer badge (circular MIMA·Music) |
| `2017-12b.jpg` | home slider — Wilma conducting, 2017 |
| `Wilma_fluitist_1986.jpg` | home slider + Dwarsfluit "de fluitist" (B&W, flute, 1986) |
| `2012-11-06__De_Bron_leslokaal_4.jpg` | home slider — wide music‑room |
| `2012-11-06__De_Bron_leslokaal.jpg` | Onderwijs row — keyboard classroom |
| `2014-10-08_Bieb_Heyhoef3.jpg` | Onderwijs row — library workshop |
| `djembe_60.jpg` | Onderwijs row — djembé circle |
| `2010-kerst__dirigent_wilma_in_de_sneeuw.jpg` | Koren landing — lead image |
| `_DSC8853.jpg` | Spirit — teal robes |
| `spirit_3.jpg` | Spirit — red/blue scarves |
| `2024-05_met_kinderen.jpg` | Singin'Gestel — church, green |
| `2024-03-20.jpg` | Singin'Gestel — blue steps, hands up |
| `MIKS_logo.png` | Popkoor MIKS logo |
| `boomwhackers_1c.jpg` | Workshopmogelijkheden — side image |
| `2020-12-jamulus.png` | workshop/les landing — side image (headset) |
| `2020-06-28_Wilma.jpg` | Contact — portrait |
| `2015-09-23_GGK_40.png` | *unused* — old GGK photo |
| `Wilma_2024.jpg` | *unused* |
| `Wilma_vleermuis_2022.jpg` | *unused* |
| `Emmaus1.jpg` | *unused* — school photo |

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
Home                     → category "home"        (landing + image slider)
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

Home layout = section landing built from the “Homepage 1/2/3” blocks, with a
**Swiper image carousel** at the top (module `mod_swiper`, slides were articles —
now trashed; rebuild carousel with images pulled from Wayback / live site).

### Koren  (category `Koren`)
| id | title | alias | state | note |
|---|---|---|---|---|
| 1 | gospelpopkoor Spirit | gospelpopkoor-spirit | 1 | nav child; hits 233 |
| 2 | Singin'Gestel | *(row beyond first 25 — fetch body)* | 1 | nav child |
| 43 | Popkoor MIKS | popkoor-miks | 1 | nav child; **newest content, 2024‑11‑09** |
| 19 | Koordirigent | koordirigent | 1 | conductor bio/offer |
| 4 | Koor Voluum | koor-voluum | 2 | archived — keep as historical page |
| 5 | LevensWijs Koor | levenswijs-koor | -2 | skip |
| 41 | project- mannenkoor | project-mannenkoor | -2 | skip |

### Onderwijs  (category `Onderwijs`)
- Articles are beyond the first 25 rows of the recon — **bodies still to fetch** (see §7).

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
| id | title | alias | state |
|---|---|---|---|
| 9 | Muzikale ondersteuning | *(fetch body)* | 1 (nav child) |
| 32 | Workshopmogelijkheden | *(fetch body)* | 1 (nav child) |
| *(other rows beyond first 25 — fetch)* | | | |

### Contact  (category `Contact`)
| id | title | alias | state | note |
|---|---|---|---|---|
| 38 | over mij, | over-mij | 1 | **About the musician** (2022) |
| 39 | contact-foto | contact-foto | -2 | photo asset only |

Contact page was rendered as **Bootstrap tabs of 2 articles** (module
`mod_bootstraptabs` “bootstrap contactpagina 2 artikelen”). Rebuild as a single
Contact page: about text + contact details + form + map.

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
- Rebuild: an **Events collection** (Squarespace Events page) or a simple
  chronological “Agenda” list: date, time, title, location, description.
- Event data still to export (see §7) — `mm_jevents_*` tables.

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
| Home (category + Swiper) | Home page: image **Slideshow/Gallery** section + intro blocks from Homepage 1–3 |
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
- Homepage slider image set.
- Footer composition.

---

## 10. Design decisions log  (prototype — keep or revisit)

| # | Decision | Why | Revisit? |
|---|---|---|---|
| D1 | All‑black ground | It's the GK5 "Theatre" template default, not a chosen identity | Ask owner if she wants it lighter |
| D2 | Fonts from live `template.css`: logo + grey headings **Henny Penny**, red headings **Fredericka the Great**, body **Gabriela** serif | Confirmed in CSS, not a guess | Keep; owner may dislike the quirky display faces → then pick alternatives |
| D3 | Red `#cb4752`, grey heading `#7e7e7e`, body `#f4f4f4` | `#cb4752`/`#7e7e7e` from CSS; body lightened from CSS `#f4f4f4`‑ish for legibility (real `.copyright` is `#2b2b2b`, near‑invisible) | Keep; revisit copyright colour |
| D4 | Heading colour = red on top‑level pages, grey on sub‑pages & Agenda | CSS: `.title` (red) vs `.heading-style-1` (grey) | Keep |
| D5 | **1200px centred container** (`margin: 0 auto`); ~1170px text column | Matches live `template.css` `.container` | Keep |
| D6 | Nav = single‑column dropdowns; **parent items (Koren, workshop/les) are links** → click = go to landing page, hover/focus = open dropdown; dropdown lists **only the children** (no repeated parent) | Standard mega‑menu behaviour; simplifies the original DJ‑MegaMenu; menus are tiny | Fine → Squarespace Folders (folder landing page + child pages) |
| D7 | Home slider = `object-fit: contain` on black, 16:10 box at **half column width** (~590px), 3 slides, 5 s fade | Show full frames, kept small; real slide set/shape unknown | Replace with real Wayback slides |
| D8 | Footer badge = real `MIMAmusic_LOGO2-4.png` | Actual asset | Keep |
| D9 | Dropped the "Joomla!" footer line | No Joomla cruft on the rebuild | — |
| D10 | Transcribed copy keeps original quirks ("2017 .", "Dat  was", "Sind 2014") | Faithful until owner proofreads | Owner proofread pass |

## 11. Open items to resolve before the Squarespace build

**Data — phpMyAdmin, prefix `mm_` (full queries in §7):**
- [x] 7a template branding — **got it from `template.css` instead**: 1200px centred
  container, fonts (Henny Penny / Fredericka the Great / Gabriela), red `#cb4752`,
  grey `#7e7e7e`. Still want: mega‑menu skin CSS `custom-124.css`, heading sizes.
- [ ] 7b / 7c all article bodies (every block still marked *"nog op te halen"*)
- [ ] 7d published module content (footer text, logo markup, sidebar)
- [ ] 7e Home menu item + per‑item params
- [ ] 7f events (JEvents) → Agenda
- [ ] 7g JoomGallery categories + image filenames

**Assets:**
- [ ] Header wordmark asset (`/templates/theme3339/images/`) or confirm font‑only
- [ ] Real homepage slider images + intended size (Wayback)
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
- [ ] Owner proofreads every text; hands over missing article bodies + slider photos.
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
