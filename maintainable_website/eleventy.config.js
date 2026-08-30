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
const nlWeekdayLong = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const nlMonth = new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" });
const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

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

const CAL_TYPE_COLOUR = { concert: "#4a77b5", dienst: "#5aa469", evenement: "#d98b3a" };
const CAL_MAX_MONTHS = 6; // this month .. furthest upcoming event, capped
const htmlEsc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Shared: parse entries, keep the future ones, decide how many months to draw. */
function agendaData(entries = []) {
  const now = new Date();
  const today = { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  const startOfToday = new Date(today.y, today.m, today.d);

  const events = (entries || [])
    .map((e) => ({ ...e, d: new Date(e.date) }))
    .filter((e) => !Number.isNaN(e.d.getTime()))
    .sort((a, b) => a.d - b.d);
  const future = events.filter((e) => e.d >= startOfToday);

  let monthCount = 1;
  if (future.length) {
    const last = future[future.length - 1].d;
    monthCount = (last.getFullYear() - today.y) * 12 + (last.getMonth() - today.m) + 1;
    monthCount = Math.min(Math.max(monthCount, 1), CAL_MAX_MONTHS);
  }
  return { events, future, today, monthCount };
}

/* One month grid: Monday-first, prev/next spill greyed, today marked (only in the
 * real current month), events chipped on their day. prev/next are <label>s that
 * flip a hidden radio — no navigation, so the page never scrolls. */
function renderMonthGrid(year, month, byDay, today, prevInputId, nextInputId) {
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0
  const daysThis = new Date(year, month + 1, 0).getDate();
  const daysPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push({ n: daysPrev - firstDow + 1 + i, mute: true });
  for (let d = 1; d <= daysThis; d++) cells.push({ n: d, mute: false });
  while (cells.length % 7 !== 0) cells.push({ n: cells.length - (firstDow + daysThis) + 1, mute: true });

  const isCurrentMonth = year === today.y && month === today.m;
  let rows = "";
  for (let i = 0; i < cells.length; i += 7) {
    rows += "<tr>";
    for (const cell of cells.slice(i, i + 7)) {
      const evs = cell.mute ? [] : byDay.get(cell.n) || [];
      const isToday = isCurrentMonth && !cell.mute && cell.n === today.d;
      const label = isToday ? `<span class="today">${cell.n}</span>` : `${cell.n}`;
      const chips = evs
        .map(
          (e) =>
            `<span class="cal-ev" style="border-left-color:${
              CAL_TYPE_COLOUR[e.type] || "#bbbbbb"
            }">${htmlEsc(e.title)}</span>`
        )
        .join("");
      rows += `<td class="${cell.mute ? "mute" : ""}">${label}${chips}</td>`;
    }
    rows += "</tr>";
  }

  const nav =
    prevInputId || nextInputId
      ? `<div class="cal-nav">
        ${prevInputId ? `<label for="${prevInputId}">&#8249; vorige</label>` : `<span></span>`}
        ${nextInputId ? `<label for="${nextInputId}">volgende &#8250;</label>` : `<span></span>`}
      </div>`
      : "";

  return `
    <div class="cal">
      <div class="cal-top"><div class="cal-month">${nlMonth.format(new Date(year, month, 1))}</div></div>
      ${nav}
      <table class="cal-grid">
        <thead><tr><th>ma</th><th>di</th><th>wo</th><th>do</th><th>vr</th><th class="we">za</th><th class="we">zo</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="cal-legend">
        <span><i style="background:#4a77b5;"></i>concert</span>
        <span><i style="background:#5aa469;"></i>dienst</span>
        <span><i style="background:#d98b3a;"></i>evenement</span>
      </div>
    </div>`;
}

/* Left column: the "Aankomende optredens" list (or the empty-state line). */
function agendaListShortcode(entries = []) {
  const { future } = agendaData(entries);
  if (!future.length) {
    return `<p class="cal-empty">Op dit moment staan er geen activiteiten gepland &mdash; kom hier binnenkort terug voor nieuwe data.</p>`;
  }
  return `<ul class="cal-upcoming">${future
    .map(
      (e) =>
        `<li>` +
        `<time datetime="${e.d.toISOString().slice(0, 10)}">${capFirst(nlWeekdayLong.format(e.d))}</time>` +
        `<span class="cal-up-title">${htmlEsc(e.title)}</span>` +
        (e.location ? `<span class="cal-loc">${htmlEsc(e.location)}</span>` : "") +
        `</li>`
    )
    .join("")}</ul>`;
}

/* Right column: current month through the furthest upcoming event (cap 6). Only
 * the chosen month shows (hidden radios + CSS); prev/next flip the radio, so the
 * page does not move. Fully static — no client JS. */
function agendaCalendarShortcode(entries = []) {
  const { events, today, monthCount } = agendaData(entries);
  const inputId = (i) => `agenda-month-${i}`;

  let inputs = "";
  let grids = "";
  for (let i = 0; i < monthCount; i++) {
    const dt = new Date(today.y, today.m + i, 1);
    const y = dt.getFullYear();
    const m = dt.getMonth();
    const byDay = new Map();
    for (const e of events) {
      if (e.d.getFullYear() === y && e.d.getMonth() === m) {
        byDay.set(e.d.getDate(), [...(byDay.get(e.d.getDate()) || []), e]);
      }
    }
    inputs += `<input class="cal-pick" type="radio" name="agenda-month" id="${inputId(i)}"${
      i === 0 ? " checked" : ""
    } hidden>`;
    grids += renderMonthGrid(
      y,
      m,
      byDay,
      today,
      i > 0 ? inputId(i - 1) : null,
      i < monthCount - 1 ? inputId(i + 1) : null
    );
  }
  return `<div class="cal-pager">${inputs}${grids}
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
  eleventyConfig.addShortcode("agendaList", agendaListShortcode);
  eleventyConfig.addShortcode("agendaCalendar", agendaCalendarShortcode);

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
