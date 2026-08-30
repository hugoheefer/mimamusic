# maintainable_website — the production MiMaMusic site

A clean, maintainable rebuild of the single-file prototype in [`../website/`](../website/).
Static site generated with **Eleventy (11ty)**, content in Markdown/YAML, edited by
the site owner through **Pages CMS**, hosted on **GitHub Pages**.

The look is a faithful reproduction of the prototype (which itself matches the live
`mimamusic.nl` template) plus low-risk polish — see *Deviations* below. Whether to
keep the black theme / the display fonts is still an open owner decision (spec §15);
nothing here pre-empts it — the design tokens in
[`src/assets/css/tokens.css`](src/assets/css/tokens.css) are the single place to change it.

## Manuals

- **[docs/developer-manual.md](docs/developer-manual.md)** — run, change, deploy,
  set up GitHub Pages + Pages CMS, go to production, troubleshoot.
- **[docs/content-owner-manual.md](docs/content-owner-manual.md)** — for the person
  who edits text and photos through Pages CMS (no code).

This README is the reference for the code layout; the manuals are the step-by-step
procedures.

---

## Quick start

```sh
cd maintainable_website
npm install
npm start          # dev server + live reload at http://localhost:8080
npm run build      # writes the static site to _site/
```

Requires Node 18+ (built and tested on Node 24). The image pipeline uses `sharp`;
`npm install` pulls the right prebuilt binary per platform.

---

## How it is put together

```
src/
  _data/
    site.js            nav order, brand, contact details, build year
    agenda.yaml        upcoming events (CMS-editable); empty => "geen activiteiten gepland"
    redirects.json     old Joomla URL -> new path (spec §12)
  _includes/
    layouts/base.njk   <head>, header wordmark, nav, footer — the only copy of these
    layouts/{page,section,home,agenda}.njk
  content/
    *.md               one file per page; front matter = the editable fields
    koren/*.md          Koren sub-pages
    workshop-les/*.md    Workshop/les sub-pages
    404.md
    content.11tydata.js   strips the "content/" segment from URLs; default layout
    <name>.11tydata.json  per-page layout override (home/section/agenda)
  assets/
    css/*.css          six files, concatenated in cascade order to /assets/styles.css
    images/*           real photos (from ../website/images/web/)
  redirects.njk        emits a meta-refresh stub per redirects.json entry
  sitemap.njk robots.njk
eleventy.config.js     filters (md, nldate, pageSlug); the {% image %},
                       {% agendaList %} and {% agendaCalendar %} shortcodes;
                       YAML data loader; the CSS bundle step
.pages.yml             Pages CMS schema (see "Editing" below)
deploy/                staging copies of the GitHub Actions workflow + CNAME
```

### Content model

Each page's front matter carries only fixed, named fields — never layout. A page
picks a layout via a tiny `*.11tydata.json` file, and `content.11tydata.js` maps
`content/koren.md` → `/koren/`.

| Page | Layout | Key front-matter fields |
|---|---|---|
| `index.md` | home | `blocks[]` = `{ heading, text, photo{src,alt,variant} }` ×3 |
| `koren.md`, `onderwijs.md` | section | `body`, `band[]` = `{src,alt,w,h}`, `teasers[]` |
| `workshop-les.md` | section | `body` |
| `dwarsfluit.md` | page | `articles[]` = `{ heading, body, narrow?, photo? }` |
| `arrangeren.md` | page | `body` (heading colour quirk is in CSS: `.p-arrangeren`) |
| `koren/*.md`, `workshop-les/*.md` | page | `body`, `photos[]` / `photo`, `photoLayout` |
| `contact.md` | page | `photo`, `body` (raw inline HTML kept verbatim) |
| `agenda.md` | agenda | body text; the grid is built from `_data/agenda.yaml` |

Images are referenced by **filename only** (`2017-12b.jpg`). The `{% image %}`
shortcode generates responsive `<picture>` markup (WebP + fallback, `srcset`,
lazy) into `_site/assets/images/`. It also accepts a full `/assets/images/…` path,
so whatever Pages CMS writes, it resolves.

---

## Editing (the site owner)

1. Go to **https://app.pagescms.org**, "Sign in with GitHub" (a free GitHub
   account + 2FA is the one unavoidable signup).
2. Open this repository. The left panel lists: Home, Koren, Onderwijs, Dwarsfluit,
   Arrangeren, Workshop/les, Contact, the Koren/Workshop sub-pages, Agenda,
   Privacy.
3. Edit text in normal fields, swap a photo with the picker, add an agenda entry.
4. **Save** → Pages CMS commits to GitHub → the Action rebuilds → live in ~1 min.

The schema in `.pages.yml` constrains every field, so content edits cannot break
the layout or the build.

> `.pages.yml` must sit at the **repo root** of the deployed branch, and its
> `path:`/`input:` values assume this folder has been promoted to the root (see
> *Adoption*). Until then, prefix them with `maintainable_website/`.

---

## Adoption / going live (GitHub Pages)

1. **Promote** the folder: move everything in `maintainable_website/` to the repo
   root (`git mv`), so `.pages.yml` and `.github/` land where they must be.
2. Move `deploy/deploy.yml` → `.github/workflows/deploy.yml`; drop its `paths:`
   filter.
3. Repo **Settings → Pages → Source = "GitHub Actions"**.
   - GitHub Pages serves **public** repos free. A **private** repo needs GitHub
     **Pro (~€4/mo)** — this is the choice that paused the earlier test.
4. **Custom domain**: Settings → Pages → Custom domain = `mimamusic.nl` (this
   writes the `CNAME` file for you; `deploy/CNAME` is a reference copy). At the
   DNS host: 4 `A` records to GitHub's Pages IPs for the apex + a `CNAME` for
   `www`. **Leave the `MX` records alone** — `@mimamusic.nl` mail is unaffected.
   Then in the workflow set `PATH_PREFIX: /` (or delete that `env:` line) — see
   *Path prefix* below — and let it redeploy.
5. Connect the repo at **app.pagescms.org** and hand the owner the one-page
   runbook above.

### Path prefix

A GitHub Pages **project site** is served from `…github.io/<repo>/`, not the
domain root, so every root-relative URL (`/assets/…`, `/koren/`) would 404.
`eleventy.config.js` reads `PATH_PREFIX` (default `/`) and `EleventyHtmlBasePlugin`
rewrites every `href`/`src`/`srcset` in the output HTML to match. The deploy
workflow sets `PATH_PREFIX: /mimamusic/`. Once `mimamusic.nl` is attached (served
at root), set it back to `/`. Local dev and the eventual custom domain both use
the `/` default.

**Portable build:** `npm run build:portable` (`RELATIVE_URLS=1`) instead rewrites
every link to be **document-relative** (`../assets/…`) via an `addTransform`. That
`_site/` runs from anywhere with no server config — opened as `file://`, or
dropped into any web server's webroot **or** a subfolder. It's a hand-off copy,
not what the workflow deploys.

### Redirects

GitHub Pages has no `_redirects` file, so `src/redirects.njk` renders one
`<meta http-equiv="refresh">` + `<link rel="canonical">` stub per entry in
`src/_data/redirects.json` (the spec §12 table). Finalise that table against a
Screaming Frog crawl of the live site before go-live.

---

## Deviations from the prototype (all low-risk, "safe polish")

- Real multi-page site with real URLs (the prototype's JS show/hide is gone) —
  required for SEO and the §12 redirects.
- Inline `<style>` → six organised CSS files; `build_images.py` + data-URI baking
  → `{% image %}` responsive images; the dev "specs" panel is gone.
- Sub-page title colour `#6f6f6f` → `#9a9a9a` for legibility on black (spec D4,
  already flagged for the owner).
- Added: skip link, `<h1>` per page (home/dwarsfluit get a visually-hidden one),
  `@media print`, `sitemap.xml`, `robots.txt`, a `404.html`. The nav is the
  prototype's plain wrapping bar with CSS-only dropdowns (no JS, no hamburger);
  on touch the parent links reach their landing pages, which list the children.
- Agenda: the fake JEvents mode toggles are dropped. Left half = the "Agenda"
  heading + intro + "Aankomende optredens" list; right half = one month grid,
  top-aligned with the heading. Stacks < 900px. Grids run from the current month
  through the month of the furthest upcoming event (cap 6); **one shows at a
  time**, switched by `‹ vorige / volgende ›` `<label>`s that flip a hidden radio
  (`:checked` + positional `:nth-of-type` CSS) — no client JS, and no scroll jump.
  All auto-updates as dates pass.
- Dwarsfluit "Dwarsfluitles" `<br>` pseudo-list → a real Markdown bullet list
  (spec D16 open question — converted for CMS cleanliness).
- Transcribed copy keeps the original quirks verbatim ("Daarna heeft heb ik",
  "sopranino.Ben je", "Sind 2014", "posongs", "vanalles"). Owner proofread pending.

---

## Open items carried from the spec

- **Content still missing:** Koor Voluum body, Privacy statement (both marked
  `draft`, visible placeholder). Owner to supply / proofread everything.
- **Contact:** still `mailto:` + `tel:` (the "/at/" text is kept from the live
  site). A real form (Web3Forms / Formspree — GitHub Pages has no form handler)
  is a later step.
- **Agenda mechanism:** confirm this hand-maintained YAML list is the model the
  owner wants.
- **Design:** black theme vs lighter; keep Henny Penny / Gabriela or pick cleaner
  faces (spec §15 — owner decision).
- **Pages CMS check:** on the owner's first save, confirm Pages CMS preserves
  front-matter keys not in `.pages.yml` (e.g. `titleClass` on sub-pages). If it
  strips them, move those keys into a `*.11tydata.json` directory-data file.
