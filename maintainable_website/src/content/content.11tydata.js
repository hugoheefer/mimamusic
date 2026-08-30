/* Directory data for every page in content/:
 *  - default layout (per-file .11tydata.json overrides for home/section/agenda)
 *  - permalink: drop the "content/" segment so files map to clean URLs
 *      content/index.md               -> /
 *      content/koren.md               -> /koren/
 *      content/koren/singin-gestel.md -> /koren/singin-gestel/
 */
export default {
  layout: "layouts/page.njk",
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      const stem = data.page.filePathStem.replace(/^\/content/, "");
      return stem === "/index" ? "/" : `${stem}/`;
    },
  },
};
