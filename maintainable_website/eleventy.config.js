import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";
import MarkdownIt from "markdown-it";
import { load as loadYaml } from "js-yaml";

/*
 * Where the site is served from:
 *   - local dev / a custom domain (mimamusic.nl at the root):  "/"
 *   - GitHub Pages project site (hugoheefer.github.io/mimamusic/):  "/mimamusic/"
 * The deploy workflow sets PATH_PREFIX=/mimamusic/. EleventyHtmlBasePlugin
 * rewrites every root-relative href/src/srcset in the output HTML to match.
 *
 * RELATIVE_URLS=1 (npm run build:portable) instead rewrites every link to be
 * document-relative (../assets/…). That copy runs from any location: opened as
 * a file:// page, or dropped into any web server's webroot or a subfolder.
 */
const RELATIVE_URLS = process.env.RELATIVE_URLS === "1";
const PATH_PREFIX = RELATIVE_URLS ? "/" : process.env.PATH_PREFIX || "/";

/*
 * MiMaMusic site build.
 *
 *   src/content/*.md        -> pages (front matter = the CMS-editable fields)
 *   src/_data/*             -> site config, agenda entries, redirect map
 *   src/_includes/          -> base layout + partials (one header/footer, not eight)
 *   src/assets/css/*.css    -> concatenated to _site/assets/styles.css (order below)
 *   src/assets/images/*     -> real photos, emitted as responsive <picture> by {% image %}
 *
 * No client-side JS, no data-URI baking, no build_images.py.
 */

const CSS_ORDER = ["tokens", "base", "layout", "nav", "content", "agenda"];
const IMAGE_WIDTHS = [320, 640, 960, null]; // null = keep original (never upscales)

// html:true — a few bodies carry inline <span style> / <br> from the old site (Contact).
const md = new MarkdownIt({ html: true, breaks: false, linkify: false });

const nlLong = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" });
const nlWeekdayLong = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IMAGE_DIR = "src/assets/images";

async function imageShortcode(src, alt, opts = {}) {
  // A CMS editor can clear an image field and leave the object behind
  // ({ alt, layout } with no src). Skip that element rather than fail the
  // whole build (a failed build = the live site frozen out of sync with the
  // CMS). Warn so the gap is visible in the deploy log.
  if (!src) {
    console.warn(`[image] skipped: empty src${alt ? ` (alt: "${alt}")` : ""}`);
    return "";
  }

  const {
    className = "",
    sizes = "(max-width: 760px) 100vw, 700px",
    widths = IMAGE_WIDTHS,
    loading = "lazy",
  } = opts;

  // Accept a bare filename ("foo.jpg") or a CMS-written public path
  // ("/assets/images/foo.jpg") — resolve both to the source file.
  const file = path.join(IMAGE_DIR, String(src).replace(/^.*[/\\]/, ""));

  const metadata = await Image(file, {
    widths,
    formats: ["webp", "auto"],
    outputDir: "_site/assets/images/",
    urlPath: "/assets/images/",
    sharpOptions: { animated: false },
  });

  return Image.generateHTML(metadata, {
    alt: alt ?? "",
    sizes,
    loading,
    decoding: "async",
    ...(className ? { class: className } : {}),
  });
}

const htmlEsc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// A CMS "Link" value counts only if it parses as an absolute http(s) URL —
// anything else (blank, "n.v.t.", a bare word) leaves the location as plain text.
function validHttpUrl(raw) {
  if (!raw) return null;
  try {
    const u = new URL(String(raw).trim());
    return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
  } catch {
    return null;
  }
}

/* Upcoming entries from _data/agenda.yaml: parse dates, drop the unparseable and
 * the past, sort ascending. */
function upcomingAgenda(entries = []) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return (entries || [])
    .map((e) => ({ ...e, d: new Date(e.date) }))
    .filter((e) => !Number.isNaN(e.d.getTime()) && e.d >= startOfToday)
    .sort((a, b) => a.d - b.d);
}

/* The "Aankomende optredens" list (or the empty-state line). Data comes from
 * _data/agenda.yaml, which the owner maintains in Pages CMS. When an entry
 * carries a valid http(s) "Link", its location renders as an <a> — the
 * build-time externalLinksBreakOutOfIframe transform then makes it open in a
 * new tab. No "Link", or an invalid one: plain-text location, as before. */
function agendaListShortcode(entries = []) {
  const future = upcomingAgenda(entries);
  if (!future.length) {
    return `<p class="cal-empty">Op dit moment staan er geen activiteiten gepland &mdash; kom hier binnenkort terug voor nieuwe data.</p>`;
  }
  return `<ul class="cal-upcoming">${future
    .map((e) => {
      const loc = e.location ? htmlEsc(e.location) : "";
      const href = validHttpUrl(e.url);
      const locHtml = loc
        ? `<span class="cal-loc">${href ? `<a href="${htmlEsc(href)}">${loc}</a>` : loc}</span>`
        : "";
      return (
        `<li>` +
        `<time datetime="${e.d.toISOString().slice(0, 10)}">${capFirst(nlWeekdayLong.format(e.d))}</time>` +
        `<span class="cal-up-title">${htmlEsc(e.title)}</span>` +
        locHtml +
        `</li>`
      );
    })
    .join("")}</ul>`;
}

/*
 * ── TEMPORARY SHIM: send off-site links out of the iframe wrapper ────────────
 *
 * Until mimamusic.nl is pointed straight at GitHub Pages, the domain is kept in
 * the visitor's address bar by a wrapper the DNS host serves at mimamusic.nl:
 *
 *     visitor → mimamusic.nl            (dds.nl hosting)
 *               └─ public_html/joomla/index.php   ← a full-window <iframe>
 *                  └─ src = https://hugoheefer.github.io/mimamusic/   (THIS site)
 *
 * That wrapper lives in ../temp-redirect/ (index.php + a hand-synced index.html)
 * and must not be edited. Inside the iframe a normal <a> click loads in the
 * frame, so the bar keeps showing mimamusic.nl — correct for OUR pages, wrong
 * for links to other sites (the visitor should see the real destination URL).
 *
 * This transform bakes  target="_blank" rel="noopener"  into every <a> whose
 * href points off-site, at BUILD TIME — no client-side JS (see README). Net effect:
 *   • internal link → stays in the frame, address bar stays mimamusic.nl
 *   • external link → opens in a new tab showing the real URL; wrapper untouched
 *
 * "Off-site" = an http(s) href whose host is not in SITE_HOSTS. mailto:, tel:,
 * root-relative (/koren/), relative and #fragment hrefs are left alone, as is
 * any <a> that already carries an explicit target= (e.g. a `sections[]` block
 * with `external: true` in _includes/layouts/page.njk).
 *
 * ▓▓ WHEN BUILDING THE DEFINITIVE SITE — REMOVE THIS ▓▓
 * Once mimamusic.nl serves this site directly there is no iframe to break out
 * of. Delete SITE_HOSTS + the "externalLinksBreakOutOfIframe" transform below,
 * retire ../temp-redirect/, and drop the matching notes in README.md and
 * docs/developer-manual.md (§5.1, §7). If you still want off-site links to open
 * in a new tab, re-add it then as a deliberate UX choice — not an iframe patch.
 *
 * Tweaks: swap "_blank" for "_top" to leave the visitor in the SAME tab; add
 * "noreferrer" to rel to also strip the Referer header sent to the external site.
 * Limitation: a deliberately naive regex — assumes well-formed <a …> tags with
 * no ">" inside an attribute value (holds for this site's Markdown + templates).
 */
const SITE_HOSTS = new Set([
  "mimamusic.nl",
  "www.mimamusic.nl",
  "hugoheefer.github.io", // GitHub Pages project host = the current iframe target
  // keep in sync with src/_data/site.js `domain`
]);

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // portable build: rewrite every root-relative /… link to a document-relative
  // path, and point directory links (…/ ) at the real …/index.html file. The
  // result runs from anywhere — opened as file://, or served from any web
  // server's root or a subfolder (URLs just show the explicit index.html).
  if (RELATIVE_URLS) {
    eleventyConfig.addTransform("relativeUrls", function (content) {
      if (!String(this.page.outputPath || "").endsWith(".html")) return content;
      const url = this.page.url || "/";
      const segs = url.split("/").filter(Boolean);
      const depth = url.endsWith("/") ? segs.length : Math.max(segs.length - 1, 0);
      const up = depth === 0 ? "./" : "../".repeat(depth);
      const fix = (rootRel) => {
        let p = up + rootRel.replace(/^\//, "");
        if (p.endsWith("/")) p += "index.html"; // file:// has no directory index
        return p;
      };
      return content
        .replace(/\b(href|src)=("|')(\/(?!\/)[^"']*)\2/g, (_m, a, q, v) => `${a}=${q}${fix(v)}${q}`)
        .replace(
          /\bsrcset=("|')([^"']*)\1/g,
          (_m, q, v) =>
            `srcset=${q}${v.replace(/(^|,\s*)(\/(?!\/)[^\s,]*)/g, (_x, sep, u) => sep + fix(u))}${q}`
        );
    });
  }

  // TEMPORARY SHIM (see the SITE_HOSTS comment above): rewrite off-site <a> tags
  // so they open OUTSIDE the mimamusic.nl iframe wrapper — in a new tab, showing
  // the real destination URL. Build-time only, no client JS. Remove once the
  // domain is pointed straight at GitHub Pages.
  eleventyConfig.addTransform("externalLinksBreakOutOfIframe", function (content) {
    if (!String(this.page.outputPath || "").endsWith(".html")) return content;

    return content.replace(/<a\b([^>]*)>/gi, (whole, attrs) => {
      const href = attrs.match(/\shref=("|')(https?:\/\/[^"']+)\1/i);
      if (!href) return whole; // no absolute http(s) href — internal/relative/mailto:/tel:
      if (/\btarget\s*=/i.test(attrs)) return whole; // author set a target — respect it
      let host;
      try {
        host = new URL(href[2]).hostname.toLowerCase();
      } catch {
        return whole;
      }
      if (SITE_HOSTS.has(host)) return whole; // our own site — leave it in the frame

      let out = attrs;
      const rel = out.match(/\srel=("|')([^"']*)\1/i);
      if (rel) {
        const tokens = new Set(rel[2].split(/\s+/).filter(Boolean));
        tokens.add("noopener");
        out = out.replace(rel[0], ` rel="${[...tokens].join(" ")}"`);
      } else {
        out += ' rel="noopener"';
      }
      return `<a${out} target="_blank">`;
    });
  });

  // Eleventy has no built-in YAML data loader — register one so
  // src/_data/agenda.yaml (Pages CMS-editable) is actually read.
  eleventyConfig.addDataExtension("yaml,yml", (contents) => loadYaml(contents) ?? []);

  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdInline", (s) => (s ? md.renderInline(String(s)) : ""));
  eleventyConfig.addFilter("nldate", (d) => nlLong.format(d instanceof Date ? d : new Date(d)));
  eleventyConfig.addFilter("startsWith", (s, prefix) => String(s).startsWith(prefix));
  eleventyConfig.addFilter("pageSlug", (url) =>
    url === "/" ? "home" : url.replace(/\.html$/, "").replace(/^\/|\/$/g, "").replace(/\//g, "-")
  );

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addShortcode("agendaList", agendaListShortcode);

  // stylesheet bundle — six files, fixed cascade order, one request
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.on("eleventy.before", async () => {
    const parts = await Promise.all(
      CSS_ORDER.map((name) => readFile(`src/assets/css/${name}.css`, "utf8"))
    );
    await mkdir("_site/assets", { recursive: true });
    await writeFile(
      "_site/assets/styles.css",
      parts.map((p, i) => `/* ${CSS_ORDER[i]}.css */\n${p.trim()}\n`).join("\n"),
      "utf8"
    );
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: PATH_PREFIX,
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: false, // content bodies are plain Markdown — never run template syntax on them
    htmlTemplateEngine: "njk",
  };
}
