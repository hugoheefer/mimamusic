# From prototype to a production‑ready situation

How the MiMaMusic rebuild gets from the current single‑file prototype to a
codebase the site owner can maintain. Covers the three maintenance models, a
detailed look at the recommended one (Path A), and what the real codebase looks
like.

---

## Three realistic paths

| Path | Her day-to-day | Cost | Who maintains structure |
|---|---|---|---|
| **A. Static site + Git-backed CMS** (Decap/Sveltia/Pages CMS on top of Astro/Eleventy) | Logs into a web admin, edits text in normal fields, uploads photos with a picker, clicks Publish. **Never sees Git.** Auto-deploys. | Free (Cloudflare/Netlify Pages) | You, in VS Code + Claude |
| **B. Squarespace** (the spec's fallback) | WYSIWYG, drag photos, done. Handles hosting, SSL, forms, backups, security. | ~€18–25/mo forever | Her, mostly alone; you for the initial build |
| **C. VS Code + Git + GitHub + Claude** (as proposed) | Describe change to Claude, review a diff, commit, push, verify deploy, recover when it breaks. | Free | Her + Claude, **you as escalation** |

**Recommendation:** Path A if she wants independence with no monthly fee — she
gets a friendly editor, you keep a clean codebase and Claude for the occasional
layout change or new page. Path B if she'd rather pay to never think about it (a
solo musician who touches the site 3–4×/year is a textbook Squarespace user).
Path C is an excellent *secondary* tool — for her more ambitious changes done
together with you — but a rough primary content workflow.

Whichever way: the single-file prototype is a **design target**, not the
maintainable production codebase. Before handoff it needs content split from
layout, the build step removed or made one-click, and a hosting decision
(Cloudflare Pages works with a private repo and auto-deploys).

Two things decide A vs B vs C:

1. **How often will content actually change, and does she *want* to learn?**
   (The old DB shows articles edited maybe once every year or two.)
2. **Will you commit to being her backup for years?** Path C only works if yes.

---

## Path A in detail: static site + Git-backed CMS

It's four layers. Only one of them is a real decision; the rest are defaults.

| Layer | What it does | Recommendation |
|---|---|---|
| **Code host** | Holds the repo (templates + content + history) | **GitHub** — already there, keep the repo private |
| **Build + hosting** | Rebuilds the site on every change, serves it worldwide with SSL | **Cloudflare Pages** |
| **Site generator** | Turns templates + Markdown into the static HTML | **Eleventy (11ty)** |
| **CMS** | The web UI the owner logs into to edit | **Sveltia CMS** (or Pages CMS) |

### "The provider" — direct answer

There isn't one single provider; the point of Path A is that no single vendor
owns your site. But the one that matters — **who builds and serves the site** —
is **Cloudflare Pages**:

- Free tier: unlimited bandwidth, 500 builds/month, unlimited sites. Not a
  trial, not a teaser.
- **Works with a private repo** — this fixes the exact problem that stopped
  GitHub Pages.
- Auto-deploys: push to `main` (or the CMS commits) → rebuild → live in
  ~30–60 seconds.
- Free SSL, global CDN, custom domain (`mimamusic.nl`), free DNS if you move it
  to Cloudflare.
- Static files only — no PHP, no database, no admin login on the server. This is
  the security win over Joomla: there is nothing running to hack.

Netlify is the equivalent alternative (its free tier has a 100 GB/month
bandwidth cap and stricter build minutes). Cloudflare is the better default here.

### The CMS — the actual choice

**Sveltia CMS.** It's a single `<script>` in a `/admin/index.html` file you drop
on the site, plus a config file listing the editable pages and fields.
Open-source, free, actively developed, modern editor, good image handling. The
owner goes to `mimamusic.nl/admin`, and it commits her edits to GitHub for her.

Runner-up: **Pages CMS** (`pagescms.org`) — you don't host any admin file; she
goes to `app.pagescms.org`, it reads a `.pages.yml` from the repo. Slightly
simpler to set up, slightly less control over the editor.

Both are just editing Markdown files in Git. **If the CMS project ever dies, your
content is untouched plain-text files** — you point a different editor at the
same repo, or she edits via GitHub's web UI. That's the structural advantage
over Squarespace: no lock-in, nothing to migrate.

### The one unavoidable friction

**The owner needs a free GitHub account** (5-minute signup + 2FA app). Git-backed
CMSs authenticate against GitHub and attribute commits to her. There's no way
around this in Path A. If that single signup is a dealbreaker, that's the
strongest argument for Path B (Squarespace) instead.

### How each person works

**Owner (Wilma):**

1. Browser → `mimamusic.nl/admin` → "Sign in with GitHub".
2. Sees a list: *Home, Koren, Onderwijs, Dwarsfluit, Arrangeren, Workshop/les,
   Agenda, Contact*.
3. Clicks one → edits text in a normal rich-text box, swaps a photo with an
   upload button, edits the agenda as a list of entries.
4. Clicks **Publish**.
5. Cloudflare rebuilds; the change is live in under a minute.

No terminal, no Git commands, no VS Code, no Python. She cannot break the build
by editing content, because the CMS only writes fixed-shape fields into content
files.

**You (H. Heefer):** VS Code + Claude for templates, CSS, new page types, the
11ty config, and the CMS field schema. You push to `main`; same auto-deploy.
You're still the person she calls to *add a new kind of section* — but not to
*change words in an existing one*.

**Rollback:** every edit is a Git commit. Bad change → GitHub's "Revert" button
on the commit, or you fix it in seconds. A site that got hacked before now has a
full, restorable history.

### The two non-static bits

- **Agenda:** one `agenda.yml` (or a folder of short Markdown files) that the CMS
  shows as an editable list; 11ty renders it into the month view. No JEvents, no
  plugin. Empty list → the "geen activiteiten gepland" line you already have.
- **Contact form:** Cloudflare Pages has no form handler. Use **Web3Forms** or
  **Formspree** free tier (a form `action` URL, no server code), or keep the
  current `info@mimamusic.nl` mailto links.

### Cost

| Item | Cost |
|---|---|
| GitHub (private repo) | €0 |
| Cloudflare Pages | €0 |
| Sveltia / Pages CMS / Eleventy | €0 (open-source) |
| Contact form (Web3Forms free tier) | €0 |
| Domain `mimamusic.nl` renewal | ~€10–15/yr (she already owns it) |
| **Total ongoing** | **~€10–15/yr** |

Compare Squarespace at roughly €220–300/yr, indefinitely.

### What it costs in effort

- **One-time, you:** port the prototype to 11ty (the single HTML file maps almost
  1:1 to one layout + ~8 content files), write the CMS schema, connect Cloudflare
  + domain + form. A few focused sessions with Claude.
- **One-time, her:** GitHub account, a one-page runbook ("go here, log in, edit,
  publish"), one walkthrough with you.
- **Ongoing, you:** occasional template/schema changes. Nothing routine.

### Risks, honestly

- **Small-team CMS projects can go dormant** (Decap CMS did). Mitigation: content
  is plain Markdown in Git — switching CMS is a config change, not a migration.
  Real, but low-stakes.
- **It's still a developer-owned system.** If you become unavailable for years
  and she needs a structural change, she needs to find another developer — but
  the stack (11ty + Markdown + Cloudflare) is common and cheap to hand off.
  Squarespace needs no developer at all; that's its one genuine edge.

---

## The production codebase (not the prototype)

The prototype is a **design reference and a requirements artifact**, not a
starting point for production code. Nobody edits `mimamusic-reference.src.html`
into the real site.

### What carries forward vs. what's discarded

**Keeps its value:**

- The **visual design** — every resolved CSS value, the type scale, spacing,
  colour tokens, the layout decisions. That's the hard-won part.
- The **spec** (`mimamusic-rebuild-spec.md`) — it *is* the requirements doc; it
  drives the rebuild.
- The **content** — text already transcribed from the DB, the photo set.

**Thrown away:**

- Single-file structure, the JS show/hide "page" nav, data-URI image baking,
  `build_images.py`, the specs panel, all `pending` placeholders, the inline
  `<style>` blob.

### Target shape (11ty example)

```
mimamusic/
├── src/
│   ├── _data/
│   │   ├── site.json            # nav order, contact details
│   │   └── agenda.yml           # events list (CMS-editable)
│   ├── _includes/
│   │   ├── base.njk             # <head>, header, footer
│   │   └── partials/            # nav, photo-band, teaser…
│   ├── content/
│   │   ├── home.md              # front-matter + body per page
│   │   ├── koren.md  · onderwijs.md  · dwarsfluit.md …
│   │   └── koren/spirit.md …    # sub-pages
│   ├── assets/
│   │   ├── css/                 # real stylesheets, split by concern
│   │   └── images/              # real files (11ty-img for responsive)
│   └── admin/index.html         # Sveltia CMS (one script + config)
├── .pages.yml / sveltia config  # which fields the owner can edit
├── eleventy.config.js
├── package.json
└── README.md                    # dev + deploy + "how the owner edits"
```

Clean = content separated from markup, templates DRY (one header/footer, not
eight copies), stylesheets real and organised, images real files, one config, a
README, and a CMS schema that constrains what the owner can touch so she can't
break the build.

### Sequence

1. **Finish requirements** — owner reviews the prototype, tweaks to her wishes,
   we lock the spec (including the Agenda mechanism and contact form).
2. **Pick the path** (A vs B) — decides whether step 3 even happens.
3. **Scaffold the clean repo** — new structure, port design + content, no
   prototype cruft.
4. **Wire CMS + Cloudflare + domain + form.**
5. **Owner acceptance pass** on the real thing.
6. **Handoff** — GitHub account, runbook, walkthrough.

The prototype stays in the repo (or an archive branch) purely as the "this is the
look we're matching" record.
