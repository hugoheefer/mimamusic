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
 */
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

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
const nlMonth = new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" });

const IMAGE_DIR = "src/assets/images";

async function imageShortcode(src, alt, opts = {}) {
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

/* Month grid for the Agenda page: current month, Monday-first, prev/next spill
 * greyed, today marked, entries dotted on their day. Auto-updates — nothing to
 * hand-maintain. Reuses the prototype's .cal* styles (assets/css/agenda.css). */
function calendarShortcode(entries = []) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const todayDate = now.getDate();

  const events = (entries || [])
    .map((e) => ({ ...e, d: new Date(e.date) }))
    .filter((e) => !Number.isNaN(e.d.getTime()))
    .sort((a, b) => a.d - b.d);

  const future = events.filter((e) => e.d >= new Date(year, month, todayDate));
  const inMonth = new Map();
  for (const e of events) {
    if (e.d.getFullYear() === year && e.d.getMonth() === month) {
      const list = inMonth.get(e.d.getDate()) || [];
      list.push(e);
      inMonth.set(e.d.getDate(), list);
    }
  }

  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0
  const daysThis = new Date(year, month + 1, 0).getDate();
  const daysPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push({ n: daysPrev - firstDow + 1 + i, mute: true });
  for (let d = 1; d <= daysThis; d++) cells.push({ n: d, mute: false });
  while (cells.length % 7 !== 0) cells.push({ n: cells.length - (firstDow + daysThis) + 1, mute: true });

  const typeColour = { concert: "#4a77b5", dienst: "#5aa469", evenement: "#d98b3a" };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  let rows = "";
  for (let i = 0; i < cells.length; i += 7) {
    rows += "<tr>";
    for (const cell of cells.slice(i, i + 7)) {
      const evs = !cell.mute ? inMonth.get(cell.n) || [] : [];
      const isToday = !cell.mute && cell.n === todayDate;
      const dayLabel = isToday ? `<span class="today">${cell.n}</span>` : `${cell.n}`;
      const dots = evs
        .map(
          (e) =>
            `<span class="cal-ev" style="border-left-color:${typeColour[e.type] || "#bbbbbb"}">${esc(e.title)}</span>`
        )
        .join("");
      rows += `<td class="${cell.mute ? "mute" : ""}">${dayLabel}${dots}</td>`;
    }
    rows += "</tr>";
  }

  const emptyLine = future.length
    ? ""
    : `<p class="cal-empty">Op dit moment staan er geen activiteiten gepland &mdash; kom hier binnenkort terug voor nieuwe data.</p>`;

  const upcoming = future.length
    ? `<ul class="cal-upcoming">${future
        .map(
          (e) =>
            `<li><time datetime="${e.d.toISOString().slice(0, 10)}">${nlLong.format(e.d)}</time> &mdash; ${esc(
              e.title
            )}${e.location ? ` <span class="cal-loc">(${esc(e.location)})</span>` : ""}</li>`
        )
        .join("")}</ul>`
    : "";

  return `${emptyLine}${upcoming}
  <div class="cal-scroll">
    <div class="cal">
      <div class="cal-top"><div class="cal-month">${nlMonth.format(now)}</div></div>
      <table class="cal-grid">
        <thead><tr><th>ma</th><th>di</th><th>wo</th><th>do</th><th>vr</th><th class="we">za</th><th class="we">zo</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="cal-legend">
        <span><i style="background:#4a77b5;"></i>concert</span>
        <span><i style="background:#5aa469;"></i>dienst</span>
        <span><i style="background:#d98b3a;"></i>evenement</span>
      </div>
    </div>
  </div>`;
}

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

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
  eleventyConfig.addShortcode("calendar", calendarShortcode);

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
