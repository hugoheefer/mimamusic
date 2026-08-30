# Developer manual — MiMaMusic site

Everything needed to run, change, deploy and hand over the site. Companion to
[`../README.md`](../README.md) (which explains the code layout) — this file is the
step-by-step operational guide.

| | |
|---|---|
| Repo | `https://github.com/hugoheefer/mimamusic` |
| Site code | `maintainable_website/` (Eleventy project) |
| Live (preview) | `https://hugoheefer.github.io/mimamusic/` |
| Working branch | `feature/build-mainainable-site` |
| Editor for the owner | Pages CMS — `https://app.pagescms.org` |
| Stack | Eleventy 3 · Nunjucks · `@11ty/eleventy-img` · `markdown-it` · `js-yaml` · GitHub Actions → GitHub Pages |

---

## 1. Prerequisites

- **Node.js 18+** (built on 24; CI uses 22) and **npm**
- **git**
- A **GitHub account with admin on the repo** (for the one-time Pages/Actions setup)

---

## 2. Local development

```sh
git clone https://github.com/hugoheefer/mimamusic.git
cd mimamusic
git checkout feature/build-mainainable-site
cd maintainable_website
npm install
npm start
```

Open the URL it prints — **http://localhost:8080/** (it bumps to 8081/8082 if busy).
Live-reload: edit any file under `src/`, the browser refreshes. `Ctrl+C` stops it.

```sh
npm run build     # one-off build into _site/
npm run clean     # delete _site/
```

`node_modules/` and `_site/` are git-ignored. Never commit them.

> There is also a `docs/index.html` at the **repo root** — that is the *old
> single-file prototype's* GitHub Pages output, unrelated to this project. Don't
> confuse the two.

### 2.1 Where things live

| Task | File(s) |
|---|---|
| Page text / photos / structured fields | `src/content/*.md` front matter (and body) |
| Navigation order, brand, contact details | `src/_data/site.js` |
| Agenda entries | `src/_data/agenda.yaml` |
| Old→new redirect table | `src/_data/redirects.json` |
| Header / footer / `<head>` | `src/_includes/layouts/base.njk` |
| Page layouts | `src/_includes/layouts/{page,section,home,agenda}.njk` |
| Nav markup | `src/_includes/partials/nav.njk` |
| Styles | `src/assets/css/*.css` (6 files, bundled in `eleventy.config.js`) |
| Images | `src/assets/images/` (real files; `{% image %}` makes responsive `<picture>`) |
| Filters, shortcodes, CSS bundle, path prefix | `eleventy.config.js` |
| CMS field schema | `.pages.yml` **at the repo root** |
| Deploy | `.github/workflows/deploy.yml` **at the repo root** |

### 2.2 Common changes

**Edit text/photo of an existing page** — edit the `.md` in `src/content/`. Front
matter carries the fixed fields (`title`, `band`, `blocks`, `photos`, …); the body
below `---` is the prose.

**Add a page** — e.g. a new choir sub-page:
1. `src/content/koren/new-choir.md` with `title`, `body`, `photos`, `photoLayout`.
2. Add it to the dropdown in `src/_data/site.js` → `navigation` → Koren `children`.
3. It's already covered by the `koor_subpaginas` collection in `.pages.yml`, so the
   owner can edit it too (and could have created it from the CMS).

**Add a whole new section type** — new layout in `src/_includes/layouts/`, wire a
`*.11tydata.json` for the layout, add a collection/file entry to `.pages.yml`.

**Change styles** — edit the relevant `src/assets/css/*.css`. Colours, type scale,
spacing and layout constants are all tokens in `tokens.css`.

---

## 3. How deployment works

`.github/workflows/deploy.yml` runs on every push to `master`, `main`, or
`feature/build-mainainable-site` that touches `maintainable_website/**` (or the
workflow file). It:

1. `npm ci` + `npm run build` inside `maintainable_website/`, with
   `PATH_PREFIX=/mimamusic/` (see §5).
2. Uploads `maintainable_website/_site` as the Pages artifact.
3. Deploys it to the `github-pages` environment → `https://hugoheefer.github.io/mimamusic/`.

A Pages CMS "Save" is just a commit on the branch, so it triggers the same run.
Watch runs at **repo → Actions → "Deploy site to GitHub Pages"**.

`_site/` is git-ignored — the built site is never committed. Each run keeps two
90-day downloadable artifacts (`actions/upload-artifact`), plus the transient
`github-pages` artifact the deploy step consumes:

- **`site`** — the deployed build (`PATH_PREFIX=/mimamusic/`, absolute links).
- **`site-portable`** — a `npm run build:portable` rebuild with relative links;
  runs from `file://`, any webroot, or any subfolder (§5).

Get them from **Actions → a run → Artifacts**.

---

## 4. First-time GitHub setup (what was done)

Do these once, in order.

1. **Push the branch**
   ```sh
   git push -u origin feature/build-mainainable-site
   ```
2. **Workflow location** — the deploy file must be at `/.github/workflows/deploy.yml`
   (repo root), not inside `maintainable_website/`. (Already there; a reference copy
   of the original is in `maintainable_website/deploy/`.)
3. **Repo → Settings → Pages → Build and deployment → Source = "GitHub Actions".**
   Without this the deploy step fails with *"Get Pages site failed / Not Found"*.
4. **Repo → Settings → Environments → `github-pages` → Deployment branches and tags.**
   By default only the repo's **default branch** may deploy. To preview from
   `feature/build-mainainable-site`, either add it as an allowed branch or set the
   dropdown to **No restriction**. Without this the deploy fails with *"Branch … is
   not allowed to deploy to github-pages due to environment protection rules."*
5. **Repo visibility.** GitHub Pages serves **public** repos free. A **private**
   repo needs **GitHub Pro (~€4/mo)**. (This is what paused an earlier Pages test.)
6. **Trigger + watch.** Push, or Actions → Run workflow. When both jobs are green,
   the run shows the live URL (also under repo → right sidebar → *Deployments*).

---

## 5. The path prefix

A GitHub Pages **project site** is served from `…github.io/<repo>/`, not the domain
root. Without handling this, every root-relative URL (`/assets/styles.css`,
`/koren/`, image `src`) 404s and the site loads unstyled with dead links.

- `eleventy.config.js` reads **`PATH_PREFIX`** (default `/`) and loads
  `EleventyHtmlBasePlugin`, which rewrites every `href`/`src`/`srcset` in the output
  HTML to match.
- The deploy workflow sets `PATH_PREFIX: /mimamusic/` on the `npm run build` step.
- **Local dev** and the **eventual custom domain** both use the `/` default.
- When `mimamusic.nl` is attached (served at root), set `PATH_PREFIX` back to `/`
  in the workflow (or delete that `env:` block) and let it redeploy.

To reproduce the deployed build locally (Linux/macOS):
```sh
PATH_PREFIX=/mimamusic/ npm run build
```
(On Windows Git Bash use `MSYS_NO_PATHCONV=1 PATH_PREFIX=/mimamusic/ npm run build`
— otherwise the shell mangles the value into a Windows path.)

**Portable copy** — `npm run build:portable` (`RELATIVE_URLS=1`, cross-platform via
`cross-env`). A `relativeUrls` transform rewrites every root-relative `href` /
`src` / `srcset` to `../…` based on the page's depth. The resulting `_site/` runs
from any location: `file://`, any web server's webroot, or any subfolder. Hand
this to anyone who wants a self-contained copy of the site.

---

## 6. Pages CMS setup

1. **`.pages.yml` must be at the repo root.** It is. Its `path:` / `input:` values
   point into `maintainable_website/` because the project is still a subfolder.
2. Go to **https://app.pagescms.org**, "Sign in with GitHub", authorise the app,
   grant it access to the **`hugoheefer/mimamusic`** repo.
3. Open the project. **Select the branch** that has the content
   (`feature/build-mainainable-site`) — Pages CMS defaults to the repo's default
   branch, which may not have `.pages.yml` yet.
4. **Add the content owner** as a repo collaborator: repo → Settings →
   Collaborators → Add people. They also need their own free GitHub account.
5. In Pages CMS, the **Collaborators** and **Configuration** items (left nav, under
   *Admin*) manage CMS access and show the parsed schema.

### 6.1 Editing the schema

`.pages.yml` `content:` is a list of collections. Each `file` = one page; each
`collection` = a folder of same-shaped pages the owner can add to. Field types
used: `string`, `text`, `rich-text`, `image`, `boolean`, `number`, `select`,
`object` (+ `list: true` or `list: { min, max }` for repeatables).

- Home `blocks` is pinned to exactly 3 (`list: { min: 3, max: 3 }`) — the homepage
  CSS is a fixed 3-column grid keyed on `variant: dir|ond|dwf`. Loosening it means
  reworking `#page-home` CSS in `content.css`.
- After the owner's first Save, **check the file still has the front-matter keys
  the CMS doesn't manage** (e.g. `titleClass` on sub-pages). If Pages CMS strips
  them, move those keys into a `*.11tydata.json` directory-data file so they're not
  in the `.md` at all.

---

## 7. Going to production (adoption)

1. **Merge to `master`:**
   ```sh
   git checkout master
   git merge feature/build-mainainable-site
   git push
   ```
2. **Revert the preview-only bits** in `.github/workflows/deploy.yml`:
   remove `feature/build-mainainable-site` from the `on: push: branches:` list.
   Then re-tighten repo → Settings → Environments → `github-pages` deployment
   branches back to the default branch only.
3. **Point Pages CMS at `master`** (branch selector).
4. **(Optional but cleaner) promote the project to the repo root.** Move everything
   in `maintainable_website/` up one level, then:
   - drop `working-directory: maintainable_website`, the `maintainable_website/`
     prefixes and the `paths:` filter from the workflow;
   - drop the `maintainable_website/` prefix from every `path:` / `input:` in
     `.pages.yml`.
5. **Custom domain** (`mimamusic.nl`):
   - Repo → Settings → Pages → Custom domain = `mimamusic.nl` (writes `CNAME`;
     `maintainable_website/deploy/CNAME` is a reference copy).
   - At the DNS host — apex `A` records to GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (verify against GitHub's current docs); `CNAME` `www` → `hugoheefer.github.io`.
   - **Leave the `MX` records untouched** — `@mimamusic.nl` email is separate.
   - Set `PATH_PREFIX` to `/` in the workflow (§5); redeploy.
   - Enable "Enforce HTTPS" in Settings → Pages once the cert is issued.
6. **Finish the open content** (see `../README.md` "Open items"): Privacy statement,
   Koor Voluum body, contact form vs `mailto:`, owner proofread of all copy,
   confirm the Agenda model, finalise the redirect table against a crawl of the
   old site.

---

## 8. Troubleshooting (issues hit during the build)

| Symptom | Cause / fix |
|---|---|
| Site loads with **no styling, broken images, dead links** | Project-path prefix missing. Ensure the deploy sets `PATH_PREFIX=/mimamusic/` and `EleventyHtmlBasePlugin` is loaded (§5). |
| Deploy fails: **"Branch … is not allowed to deploy to github-pages"** | Settings → Environments → `github-pages` → allow the branch, or "No restriction" (§4.4). |
| Deploy fails: **"Get Pages site failed" / "Not Found"** | Settings → Pages → Source not set to "GitHub Actions" (§4.3). |
| **Menu bar disappears on desktop** | Don't wrap the nav in `<details>` — current Chrome hides closed `<details>` content in a way CSS can't override. The nav is a plain `<ul class="menu">`. |
| Page URLs contain **`/content/`** | `src/content/content.11tydata.js` sets a computed `permalink` that strips the `content/` segment — keep it. |
| **Images missing** when added inside a Nunjucks **macro** | The `{% image %}` shortcode is async and can't run inside `{% macro %}`. Inline the loop into the template instead (see `layouts/section.njk`). |
| `<title>` shows **"MimaMusic — MimaMusic"** on home | Home is detected with `page.url == "/"`, not `fileSlug` — keep that check in `base.njk`. |
| **Agenda entries don't show** on the site | Eleventy has no built-in `.yaml` data loader. `eleventy.config.js` registers one via `addDataExtension("yaml,yml", …)` with `js-yaml` — keep it, or `src/_data/agenda.yaml` is silently ignored. |
| Env var mangled to a `C:/Program Files/Git/...` path in local builds | Windows Git Bash MSYS path conversion — prefix with `MSYS_NO_PATHCONV=1` (§5). |
| `sharp` install-script warning during `npm install` | Harmless — sharp ships prebuilt binaries; the image pipeline still works. CI installs the Linux binary automatically. |

---

## 9. Command reference

```sh
# local
cd maintainable_website
npm install                 # once, and after dependency changes
npm start                   # dev server, live reload, http://localhost:8080
npm run build               # build to _site/ (absolute links)
npm run build:portable      # build to _site/ with relative links (runs anywhere)
npm run clean               # remove _site/

# reproduce the deployed build locally (Linux/macOS)
PATH_PREFIX=/mimamusic/ npm run build

# git
git checkout feature/build-mainainable-site
git add -A && git commit -m "..."
git push

# see what the owner's CMS saves changed
git fetch origin && git log --stat origin/feature/build-mainainable-site
```
