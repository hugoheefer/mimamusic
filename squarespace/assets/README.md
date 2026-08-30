# assets/ — images to upload to Squarespace

`images/` holds the **19 full‑res originals** the build needs, copied from the
prototype. Upload them all to the Squarespace asset library in one go, then pick
per block. Let Squarespace resize — don't pre‑shrink.

The per‑page mapping (which file goes on which block) is the **"Image upload
list"** table in `../content-pack.md`. Quick version:

| File | Page / block |
|---|---|
| `MIMAmusic_LOGO2-4.png` | Footer badge (every page) |
| `2017-12b.jpg` | Home — "Dirigeren" |
| `2012-11-06__De_Bron_leslokaal_4.jpg` | Home — "Onderwijs" (keep native 16:9, uncropped) |
| `Wilma_fluitist_1986.jpg` | Home — "Dwarsfluit" **and** Dwarsfluit page — "fluitist" (floated) |
| `2010-kerst__dirigent_wilma_in_de_sneeuw.jpg` | Koren landing — 4‑photo band (1/4) |
| `2015-09-23_GGK_40.png` | Koren landing — band (2/4) |
| `Wilma_vleermuis_2022.jpg` | Koren landing — band (3/4) |
| `Wilma_2024.jpg` | Koren landing — band (4/4) |
| `2014-10-08_Bieb_Heyhoef3.jpg` | Onderwijs — 3‑photo band (1/3) |
| `2012-11-06__De_Bron_leslokaal.jpg` | Onderwijs — 3‑photo band (2/3) |
| `djembe_60.jpg` | Onderwijs — 3‑photo band (3/3) |
| `Emmaus1.jpg` | Onderwijs — Bs Emmaus teaser |
| `2020-06-28_Wilma.jpg` | Contact — portrait |
| `boomwhackers_1c.jpg` | Workshop/les → Workshopmogelijkheden — side image |
| `_DSC8853.jpg`, `spirit_3.jpg` | Koren → Spirit sub‑page |
| `2024-05_met_kinderen.jpg`, `2024-03-20.jpg` | Koren → Singin'Gestel sub‑page |
| `MIKS_logo.png` | Koren → Popkoor MIKS sub‑page |

## Logo wordmark

Decision SQ3: render "MiMaMusic" as **live text in Henny Penny** (Custom CSS
`@import`, see `../custom-css.css`). Only if that font renders unreliably: make a
white "MiMaMusic" PNG on transparent and upload it as the header logo image. No
such asset exists on the old site.

## Not in hand

- Koor Voluum photos — only if the owner keeps that archived page.
- Gallery photos — the old JoomGallery was never exported.
- Any higher‑res originals the owner still has on disk.
