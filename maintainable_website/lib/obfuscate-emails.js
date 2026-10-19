/*
 * Hide e-mail addresses from address-harvesting bots.
 *
 * Every address in the HTML (visible text and `mailto:` hrefs alike) is
 * rewritten to numeric character references. Browsers decode them, so visitors
 * still see and can click the address — with no client-side JS and no change to
 * how the owner writes it in Pages CMS. Bots that grep the raw HTML for
 * "name@domain" or "mailto:" find nothing.
 *
 * Limits: this only stops simple scrapers, and it works on the built HTML, so
 * the addresses stay readable in the repository source.
 */

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/;
const MAILTO_OR_EMAIL = new RegExp(`(?:mailto:)?${EMAIL.source}`, "g");

const toCharacterReferences = (text) =>
  Array.from(text, (char) => `&#${char.codePointAt(0)};`).join("");

export function obfuscateEmails(html) {
  return html.replace(MAILTO_OR_EMAIL, toCharacterReferences);
}
