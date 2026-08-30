# MiMaMusic — Squarespace paste‑ready content pack

Everything needed to fill the Squarespace site without opening the prototype or
the spec. Copy runs top‑to‑bottom in nav order. Pairs with `build-runbook.md`
(global setup, Phases 1–4) and `assets/README.md` (image sources).

- **Look reference:** `look-reference.html` (in this folder — open in a browser)
- **All copy below is verbatim from the prototype.** Original quirks are kept on
  purpose and flagged `⚠ quirk` — do **not** silently correct them; they are for
  Wilma's proofreading pass.
- Images are in `assets/images/` in this folder — see "Image upload list" at the end.

---

## How to use this pack (the time‑savers)

The rebuild is manual — there is no HTML importer for this site. These four moves
cut most of the tedium:

1. **Bulk‑upload every image once.** Before building any page:
   Squarespace → any image block → *Upload* → multi‑select the whole
   "Image upload list" (bottom of this doc) into the asset library. Then each
   page just *picks* from the library — no per‑page uploading.

2. **Paste rich text, don't retype.** Paste each copy block below straight into a
   Squarespace text block. Headings, paragraphs, links and bold survive the
   paste. Only the inline colour/size quirks (Arrangeren heading, Contact) are
   set by hand afterwards — they're spelled out per page.

3. **Build each page *type* once, then Save Section + duplicate.** There are only
   five shapes. Perfect one of each, then *Save Section* / *Duplicate Page* and
   swap text + images:

   | Template | Build once on | Duplicate for |
   |---|---|---|
   | **T1** text + mailto | Arrangeren | workshop/les landing · Muzikale ondersteuning |
   | **T2** heading + paragraph + photo band | Onderwijs | Koren landing |
   | **T3** sub‑page: grey heading + text + photos | Spirit | Singin'Gestel · Popkoor MIKS · (Koor Voluum) |
   | **T4** stacked article sections | Dwarsfluit (build section 1, duplicate ×3) | — |
   | **T5** 3‑column band | Home | — |

   Contact, Agenda and Privacy are one‑offs (Phase 7 / below).

4. **Realistic effort:** global styles ≈ 1–1.5 h (Phases 2–4), then ≈ 15–25 min
   per page for the first of each type, ≈ 5–10 min per duplicate. Whole site in
   roughly a focused half‑day. It is a one‑time cost — the owner never touches
   any of this afterwards.

---

## Heading colour convention (set once in Design, then per‑block)

- **Category‑landing titles** (Home columns, Koordirigent, Onderwijs, Arrangeren,
  workshop/les landing) = **red `#cb4752`**, font Gabriela. In the prototype this
  is `.page-title.is-red`.
- **Sub‑page titles** (Spirit, Singin'Gestel, MIKS, Koor Voluum, Muzikale
  ondersteuning, Workshopmogelijkheden, Privacy) = **grey `#6f6f6f`**, font
  Gabriela. Prototype `.page-title.is-dim`.
- Two exceptions carry inline quirks — **Arrangeren** and **Contact** — detailed
  on those pages.

Easiest mapping in Squarespace: make **Heading 2 = red** globally (style editor),
type sub‑page titles as **Heading 3** and give H3 the grey in the style editor.

---

# GLOBAL — header & footer (build first, they're site‑wide)

### Logo (SQ3)
- **Site Title = text** `MiMaMusic` → style in Custom CSS block 3 (Henny Penny
  `@import`, white, ~60px).
- Fallback if Henny Penny is flaky: upload a white "MiMaMusic" PNG as the logo
  image (none exists yet — would need making). Links to Home (default).

### Primary nav (Pages panel, this exact order)
```
Home
Koren            ← Folder  (children: Gospelpopkoor Spirit, Singin'Gestel, Popkoor MIKS, Koor Voluum (archief))
Onderwijs
Dwarsfluit
Arrangeren
Workshop/les     ← Folder  (children: Muzikale ondersteuning, Workshopmogelijkheden)
Agenda
Contact
```
- **Privacy** → footer nav only, never the main menu.
- Folder titles aren't links in Squarespace. Chosen approach: option 2 —
  folder‑title‑as‑link JS in `code-injection.html` (closest to the prototype,
  which drops the repeated parent link). No‑code fallback: make the first child
  the "overzicht" landing.
- "Koor Voluum (archief)" child only if the owner keeps it (open item).

### Footer (Phase 4)
- One dark section, left‑aligned to the 1200px column.
- **Badge:** image block `MIMAmusic_LOGO2-4.png`, circular, on the column's left
  edge.
- **Copyright line**, directly below the badge:
  ```
  Copyright © 2026 MimaMusic. All Rights Reserved.
  ```
  Prototype shows this on the **home page only**; Squarespace footers are global
  — recommend accepting it site‑wide (minor deviation, spec Phase 4 option 1).
  Update the year manually each January, or a tiny Code Injection snippet.
- **Privacy** link goes here once the Privacy page exists. No Joomla line, ever.

---

# T5 · HOME  (`/`)

Three **equal columns**, side by side, stacking on mobile. One section, a
3‑column layout (or three inline blocks). Each column: **red heading → one short
paragraph → one photo below**. Photos aim for equal height (~240px) so they line
up. **No carousel** (the old Swiper was a discarded design — do not add one).
Home headings may be a touch larger than other pages (prototype eases to ~22–27px
on Home only).

### Column 1 — heading `Dirigeren`
```
Een intensieve verbinding aangaan met je musici en samen hoorbaar maken wat er in je hoofd klinkt.
```
- Photo: **`2017-12b.jpg`** — slight crop to fill is fine.

### Column 2 — heading `Onderwijs`
```
Leerlingen meenemen in jouw liefde voor muziek en mogelijkheden aanbieden om hier aan mee te doen.
```
- Photo: **`2012-11-06__De_Bron_leslokaal_4.jpg`** — keep **native 16:9,
  uncropped** (`object-fit: contain` in the prototype).

### Column 3 — heading `Dwarsfluit`
```
Muziek zonder woorden. Het instrument als spreekbuis.
```
- Photo: **`Wilma_fluitist_1986.jpg`** — crop to fill, **keep the face** (focal
  point top).

---

# FOLDER: KOREN

## T2 · Koren landing  (`/koren`)

Red heading `Koordirigent` + one paragraph + a **4‑photo band** below. **No choir
teasers** (locked decision — per‑choir content lives on the sub‑pages).

```
Wat is er nou heerlijker dan het dirigeren van een koor. Ik hou ervan om flink te werken tijdens de repetities en na afloop zijn we dan ook allemaal voldaan. Je wordt uitgedaagd het beste in jezelf naar boven te halen. Daarnaast is het mijn uitgangspunt om de repetitie een vreugdevolle beleving te laten zijn waarbij naar het hoogst haalbare niveau gestreefd wordt. Ik werk graag doelgericht gewerkt naar concerten. Is het eenmaal zover dan geeft iedereen ook het uiterste van zichzelf. Elk concert wordt daardoor een vreugdevolle uiting van positieve energie.
```
⚠ quirk: "Ik werk graag doelgericht gewerkt naar concerten." (double verb) — keep.

**4‑photo band**, left→right, roughly equal height, ratios preserved, no cropping:
1. `2010-kerst__dirigent_wilma_in_de_sneeuw.jpg`
2. `2015-09-23_GGK_40.png`
3. `Wilma_vleermuis_2022.jpg`
4. `Wilma_2024.jpg`

Squarespace: a Gallery Section (grid, 1 row) or a 4‑up image row.

---

## T3 · Koren → Gospelpopkoor Spirit  (`/koren/gospelpopkoor-spirit`)

Grey heading `gospelpopkoor Spirit` + text + 2 stacked photos.

```
In 2002 heb ik Gospelpopkoor Spirit opgericht. Het is een zeer enthousiast koor. De energie spat ervan af als dit 60 koppige koor staat te zingen. Het koor wordt altijd begeleid door hun vaste band. Zoals de naam aangeeft zingt het koor zowel pop- als gospelsongs. Een gospeloptreden verzorgden ze in het verleden vaak in gospeljurk wat een prachtige uitstraling heeft. Dat gebeurt nu niet meer, maar op verzoek kan het altijd geregeld worden. Er is nog ruimte voor mannen in dit koor. Voor meer info over dit koor ga naar hun website: www.spiritgospelpop.nl
```
- Link `www.spiritgospelpop.nl` → `https://www.spiritgospelpop.nl`
- Photos (stacked): `_DSC8853.jpg`, `spirit_3.jpg`

---

## T3 · Koren → Singin'Gestel  (`/koren/singin-gestel`)

Grey heading `Singin'Gestel` + text + 2 photos side by side.

```
Het GGK heeft haar naam veranderd: het koor heet voortaan Singin'Gestel. Elke woensdagavond wordt er gerepeteerd in de 'Blaula' van Beekvliet in Sint-Michielsgestel. Sind 2014 ben ik daar dirigent. Het koor heeft de overstap naar moderner repertoire gemaakt, én naar moderne kleding. Ze komen tegenwoordig met een frisgroene uitstraling. Het repertoire gaat van 'Dancing Queen' van ABBA tot 'Tonight' van Son Mieux. In augustus gaat er o.a. gestart worden met 'Mijn houten Hart' van De Poema's en 'All I want for Christmas' van Mariah Carey.

Voor meer informatie kun je naar hun website: www.singingestel.nl
```
- ⚠ quirk: "Singin'Gestel" is shown **bold + red** inline in the prototype
  (`t-red-strong`) at first mention — optional; plain is fine.
- ⚠ quirk: "Sind 2014" (missing "s") — keep.
- Link `www.singingestel.nl` → `https://www.singingestel.nl`
- Photos: `2024-05_met_kinderen.jpg`, `2024-03-20.jpg`

---

## T3 · Koren → Popkoor MIKS  (`/koren/popkoor-miks`)

Grey heading `Popkoor MIKS` + text + address + logo.

```
Per 1 januari 2025 ga ik popkoor MIKS dirigeren. Het koor bestaat nog niet zo lang en ik heb er veel zin in om met hen aan de slag te gaan. Er worden voornamelijk popsongs gezongen. De leden zijn van alle leeftijden.
De repetities zijn op maandagochtend van 10.00 tot 12.00. Het koor is gesitueerd in Sint.Michielsgestel.
```
Address block (own lines):
```
Meander
Meanderplein 3
5271 GC, Sint Michielsgestel
```
- ⚠ quirk: "Sint.Michielsgestel" (full stop, no space) — keep.
- Image: `MIKS_logo.png` (small, ~175px wide).

---

## T3 · Koren → Koor Voluum (archief)  (`/koren/koor-voluum`) — only if kept

Grey heading `Koor Voluum`. **Body still to be supplied** (see "Still needed from
the owner"). Placeholder until the owner supplies it or decides to drop the page.
Dirigent 2018–jul 2024.
Photos, if kept: `WhatsApp_Image_2019-01-26_at_191543.jpeg`, `koororkest2.png`,
`kerst2.png` (not in the upload list yet).

---

# T2 · ONDERWIJS  (`/onderwijs`)

Red heading `Onderwijs` + one paragraph + a **3‑photo band** + the **Bs Emmaus
teaser** below (kept pending owner review).

```
De studie Docent Muziek heb ik aan de Fontys in Tilburg gedaan. Sindsdien geef ik op allerlei scholen les. Momenteel werk ik via Muzelinck in Oss op bs. De Emmaus in Heesch. Een belangrijkste doel is de kinderen plezier in muziek maken mee te geven. Als je dat plezier kunt ervaren dan brengt dat je veel rijkdom.
```
⚠ quirk: "Een belangrijkste doel" — keep.

**3‑photo band**, left‑aligned, roughly equal height:
1. `2014-10-08_Bieb_Heyhoef3.jpg`
2. `2012-11-06__De_Bron_leslokaal.jpg`
3. `djembe_60.jpg`

**Bs Emmaus teaser** — sub‑heading `Bs Emmaus`, then:
```
Sinds enkele jaren werk ik op basisschool Emmaus in Heesch. Ik verzorg er de lessen van de groepen 3 t/m 8. Het is een fijne, hartelijke school en ik werk er met veel plezier. Zo hebben we het afgelopen jaar met heel de school Europapa gezongen om Joost een goede start te geven. Het heeft niet mogen baten, maar we hebben samen wel veel plezier gehad.
Voor informatie kunt u terecht bij: basisschool Emmaus
```
- Link "basisschool Emmaus" → `https://sites.google.com/filiosscholengroep.nl/bsemmaus/startpagina` (open in new tab)
- Image: `Emmaus1.jpg` (float left / left of the text).

---

# T4 · DWARSFLUIT  (`/dwarsfluit`)

**One page, four stacked sections**, in this order. Each: red heading `Gabriela` +
body. Build section 1, then *Save Section* / duplicate ×3 and swap.

### Section 1 — heading `Geschiedenis`
```
Ik ben begonnen met dwarsfluit spelen toen ik 10 jaar was. Al vrij snel ben ik met veel plezier gaan spelen bij plaatselijke symphonie- en harmonieorkesten. Daarna heeft heb ik dwarsfluit gestudeerd aan het Sweelinck Conservatorium Amsterdam bij Koos Verheul en Harrie Starreveld. Na het conservatorium volgden nog enkele jaren studie bij Raymond Delnoye.

Naast het spelen in diverse samenstellingen heb ik lange tijd dwarsfluitles gegeven aan muziekscholen. Uiteindelijk besloot ik om zelfstandig verder te gaan. Dat betekende dat ik vooral thuis les ben gaan geven en veel andere dingen erbij gaan doen.
```
⚠ quirk: "Daarna heeft heb ik dwarsfluit gestudeerd" (double verb) — keep.

### Section 2 — heading `fluitist`  (floated photo)
Photo **`Wilma_fluitist_1986.jpg`** floated right, text beside it (text column
~50% width so it runs taller; full width on mobile).
```
Van jongs af aan heb ik podiumervaring opgedaan, als solist, als begeleider van koren, in ensembles en in orkesten, zowel symfonieorkesten als harmonieorkesten. Hoewel mijn focus meer en meer op dirigeren is komen te liggen speel ik nog steeds met veel plezier regelmatig bij allerlei gelegenheden. Heb je een fluitist nodig neem dan gerust contact op.
```

### Section 3 — heading `Dwarsfluitles`
```
Er zijn veel mogelijkheden als het over dwarsfluitles gaat. Het is maar net waar je zelf de voorkeur aan geeft. Hier wat voorbeelden:
- alleen les
- samen les
- ensemble les
- les gericht op de techniek van het fluitspelen
- les gericht op dat leuke stuk of die song
en wat je verder nog kunt bedenken.

De lessen vinden in Rosmalen plaats.
```
Note: original renders the list as `<br>` lines with a leading "- ", not a real
bullet list. Either is fine — flag to owner whether to make it a proper list.

### Section 4 — heading `Blokfluitles`
```
je hebt grote en kleine blokfluiten, je hebt ze in allerlei soorten en maten. In blokfluitensembles wordt graag met verschillende maten van blokfluiten samen gespeeld. De klank reikt dan van zeer laag door de (contra) basblokfluit tot zeer hoog door de (kleine) sopranino.Ben je geïnteresseerd dan kun je bij me aankloppen.
```
⚠ quirks: lowercase sentence start "je hebt…"; missing space "sopranino.Ben je…" — keep both.

---

# T1 · ARRANGEREN  (`/arrangeren`)

Single dark section: **heading + 2 paragraphs + a mailto link.**

⚠ **Heading quirk — set this by hand:** the heading `Arrangeren` carries an
inline style `color:#ff0000; font-size:14pt` — i.e. **bright red, ~19px**, *not*
the Gabriela `#cb4752` treatment used elsewhere. Set it on that one heading
block only. (Flag to Wilma: normalise long‑term or keep the quirk.)

```
Soms zou je een lied of een muziekstuk wel eens willen gebruiken voor een koor, of voor andere instrumenten dan waarvoor het geschreven is. Denk maar eens aan dat huwelijksfeest waar je met je vrienden een speciaal muziekstuk wil spelen. Het is echter een stuk voor trompet en jij speelt toevallig tuba. Dan is het handig als iemand het stuk geschikt maakt voor tuba. Of je wil met je koor een lied zingen dat eigenlijk door een enkele zangeres gezongen wordt. Dan moet er heel wat bij bedacht worden om het door een hele koor te laten zingen.

De arrangementen voor mijn koren en ensembles maak ik meestal zelf. Mocht je een vraag hebben, hulp willen hierbij dan neem even contact op via info@mimamusic.nl
```
- `info@mimamusic.nl` → `mailto:info@mimamusic.nl`
- The 2019 "Arrangementen" examples article is **not** on the live page — omit.

---

# FOLDER: WORKSHOP/LES

## T1 · workshop/les landing  (`/workshop-les`)

Red heading `Muzikale ondersteuning` + one paragraph + mailto. **No photo, no
teasers** (locked decision).

```
Sinds 1988 ben ik al bezig met muziekonderwijs, in allerlei vormen, zowel aan muziekscholen als thuis als op locatie. Muzikale ondersteuning kan dan over alles gaan: dwarsfluitles, blokfluitles, spelen in een ensemble, AMV, ademtechniek, noten opschrijven, instrumentkeuze, een liedje schrijven noem het maar op. Tegenwoordig, kan het ook gaan over werken met jamulus en zoom. Heb je een vraag? neem even contact op met info@mimamusic.nl
```
- `info@mimamusic.nl` → `mailto:info@mimamusic.nl`

## T1 · Workshop/les → Muzikale ondersteuning  (`/workshop-les/muzikale-ondersteuning`)

**Same text as the landing**, but heading is **grey** (sub‑page style). Straight
duplicate of the landing with the heading colour swapped.

## T3‑ish · Workshop/les → Workshopmogelijkheden  (`/workshop-les/workshopmogelijkheden`)

Grey heading `Workshopmogelijkheden`. Side image `boomwhackers_1c.jpg` (float
right). Body **is** in the prototype (fuller than the spec's "not yet pulled"
note — use this):

```
Wil je iets leuks organiseren als bedrijfsactiviteit of als familieworkshop dan is er van alles mogelijk.

Bijvoorbeeld op het gebied van zang:
- workshop samen zingen. Dat kan in allerlei genres zoals 'popsongs uit the 80's', gospelsongs, klassieke liederen
- de posongs van vandaag zingen voor tieners
- workshop ontspanning dmv zang . kom thuis bij jezelf door op een rustige manier je stem te gebruiken
- vraag me om mee te helpen bij het organiseren van een sing-a-long event

of op instrumentaal gebied:
- workshop djembé spelen. Jullie zorgen voor de djembé's, ik zorg voor de swingende ritmische uurtjes
- workshop boomwhackers, je weet wel, die gekleurde buizen waar je mee kunt muziek maken
- kennis maken met instrumenten. Leuk voor kinderen in de basisschool leeftijd
- een muzikaal uurtje tijdens een kinderfeestje

Er is vanalles mogelijk. Vraag het maar gewoon.
```
⚠ quirks: "de posongs" (→ popsongs), "zang ." / "vanalles" — keep, flag to owner.

---

# AGENDA  (`/agenda`)

**Squarespace Events collection page.** Live calendar is empty → start empty with
this reader line above it:
```
In de agenda staan de komende concerten, kerkdiensten en optredens van MiMaMusic en de koren. Op dit moment staan er geen activiteiten gepland — kom hier binnenkort terug voor nieuwe data.
```
Owner decision pending: Events collection vs embedded Google Calendar vs a
hand‑kept list vs drop the page.

---

# CONTACT  (`/contact`)

Dark section: portrait + about text (with inline styling) + **Form block** +
**Map block**.

- **Portrait:** `2020-06-28_Wilma.jpg`, float right (~240px wide).

**Copy, with the inline styling called out line by line:**

| Line | Text | Styling |
|---|---|---|
| 1 | `MiMaMusic is mijn bedrijfsnaam sinds 2017 .` | "MiMa" **white**, "Music" **red `#ce3939` italic**, both **18pt bold**; rest normal body. ⚠ keep the space before the full stop. |
| 2 | `Mijn naam is Wilma van der Schoot` | "Wilma van der Schoot" **bold, `#9a2d2d`** |
| 3 | bio paragraph (below) | normal body |
| 4 | `Voor contact kun je mailen:` | normal |
| 5 | email | see below — replace with the form; keep as text link for now |
| 6 | `of bellen` | **white, 10pt** |
| 7 | `06-27418262` | **`#ce3939`, 14pt**, link `tel:+31627418262`, no underline |

Bio paragraph (line 3):
```
In de basisschoolleeftijd ben ik begonnen met muziek maken. Dat  was toen een jaar blokfluitles in de tweede klas en natuurlijk zingen in het schoolkoor. Ik ben al vrij snel begonnen met dwarsfluit spelen. Met die dwarsfluit kwam ik in het plaatselijk jongerenkoor terecht, en toen ik 17 was ging ik dat jongerenkoor zelf maar dirigeren.
Tijdens mijn studie dwarsfluit  aan het Sweelinck Conservatorium in Amsterdam ben ik een tijdje gestopt met dirigeren. Ik ben dwarsfluitles gaan geven en heb dat 20 jaar bij verschillende muziekscholen gedaan. Het langst aan de muziekschool in Dongen.
Maar het jongerenkoor kwam weer om de hoek kijken, en toen is mijn liefde voor dirigeren ontstaan.  In 2002 heb ik gospelpopkoor Spirit opgericht. Dat koor bestaat nog steeds, zie mijn korenpagina.
Nu dirigeer ik meerdere koren. En altijd met enorm veel plezier.
```
⚠ quirks: double spaces ("Dat  was", "dwarsfluit  aan", "ontstaan.  In") — keep.

- **Email:** real address `wilmavanderschoot@mimamusic.nl` (prototype shows it
  cloaked as `wilmavanderschoot/at/mimamusic.nl`). Replace with a **Form block**;
  recipient address = **confirm with owner**.
- **Map block:** needs the **real postal address** — open item, get from owner.

---

# PRIVACY  (`/privacy`, footer link only)

Grey heading `Privacy`. **Body not yet written** — needs accurate current NL/GDPR
text from the owner (see "Still needed from the owner"). Create the page + footer
link; leave a placeholder until the text arrives.

---

# Image upload list  (multi‑select all, upload once to the asset library)

From `assets/images/` in this folder (full‑res originals; let Squarespace resize).

| # | File | Used on |
|---|---|---|
| 1 | `MIMAmusic_LOGO2-4.png` | Footer badge (every page) |
| 2 | `2017-12b.jpg` | Home — Dirigeren |
| 3 | `2012-11-06__De_Bron_leslokaal_4.jpg` | Home — Onderwijs (native 16:9, uncropped) |
| 4 | `Wilma_fluitist_1986.jpg` | Home — Dwarsfluit **and** Dwarsfluit page — "fluitist" |
| 5 | `2010-kerst__dirigent_wilma_in_de_sneeuw.jpg` | Koren landing band 1/4 |
| 6 | `2015-09-23_GGK_40.png` | Koren landing band 2/4 |
| 7 | `Wilma_vleermuis_2022.jpg` | Koren landing band 3/4 |
| 8 | `Wilma_2024.jpg` | Koren landing band 4/4 |
| 9 | `2014-10-08_Bieb_Heyhoef3.jpg` | Onderwijs band 1/3 |
| 10 | `2012-11-06__De_Bron_leslokaal.jpg` | Onderwijs band 2/3 |
| 11 | `djembe_60.jpg` | Onderwijs band 3/3 |
| 12 | `Emmaus1.jpg` | Onderwijs — Bs Emmaus teaser |
| 13 | `_DSC8853.jpg` | Koren → Spirit |
| 14 | `spirit_3.jpg` | Koren → Spirit |
| 15 | `2024-05_met_kinderen.jpg` | Koren → Singin'Gestel |
| 16 | `2024-03-20.jpg` | Koren → Singin'Gestel |
| 17 | `MIKS_logo.png` | Koren → Popkoor MIKS |
| 18 | `boomwhackers_1c.jpg` | Workshop/les → Workshopmogelijkheden |
| 19 | `2020-06-28_Wilma.jpg` | Contact — portrait |

Not in hand: Koor Voluum photos (only if that page is kept); any gallery photos.

---

# Still needed from the owner (blocks go‑live, not the build)

- [ ] **Proofread** every page — the `⚠ quirk` items above are deliberate
      transcriptions of the old site; owner decides keep vs fix.
- [ ] **Privacy** page body — accurate current NL/GDPR text.
- [ ] **Workshopmogelijkheden** — confirm the transcribed body (typos flagged).
- [ ] **Koor Voluum** — keep the page? If yes: body text + photos.
- [ ] **Contact** — real postal address (for the Map block) + the email address
      the contact Form should deliver to.
- [ ] **Big review questions** (Phase 8): keep all‑black or lighten; keep Henny
      Penny wordmark or go fully clean; nav acceptable; keep the Agenda page;
      want photo galleries.
- [ ] **Owner decisions**: live chat (drop / Squarespace chat), comments
      (drop / native), newsletter (only if wanted).

---

# Build order checklist

- [ ] Phase 1–2 — trial started, global styles set (colours, fonts, 1200px width) — `build-runbook.md`
- [ ] Phase 3 — logo, nav (order above), Custom CSS pasted + selectors verified
- [ ] Phase 4 — footer (badge + copyright)
- [ ] Upload all 19 images to the asset library
- [ ] **T5** Home
- [ ] **T2** Onderwijs → duplicate → Koren landing
- [ ] **T1** Arrangeren → duplicate → workshop/les landing → Muzikale ondersteuning
- [ ] **T3** Spirit → duplicate → Singin'Gestel → Popkoor MIKS → (Koor Voluum)
- [ ] Workshopmogelijkheden
- [ ] **T4** Dwarsfluit (build section 1, duplicate ×3)
- [ ] Contact (form recipient + map address from owner)
- [ ] Agenda (Events collection, empty + reader line)
- [ ] Privacy (placeholder + footer link) — real text from owner
- [ ] Phase 8 — owner review, URL Mappings (`url-mappings.txt`), domain, SEO, decommission Joomla
