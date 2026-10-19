import { test } from "node:test";
import assert from "node:assert/strict";
import { obfuscateEmails } from "./obfuscate-emails.js";

// What a browser does with character references.
const decodeReferences = (html) =>
  html.replace(/&#(\d+);/g, (_m, code) => String.fromCodePoint(Number(code)));

test("a mailto link no longer exposes the address or 'mailto:' to a scraper", () => {
  const out = obfuscateEmails('<a href="mailto:info@mimamusic.nl">info@mimamusic.nl</a>');

  assert.doesNotMatch(out, /@/);
  assert.doesNotMatch(out, /mailto:/);
  assert.doesNotMatch(out, /info/);
});

test("a browser still reads the original link and visible address", () => {
  const original = '<a href="mailto:info@mimamusic.nl">info@mimamusic.nl</a>';

  assert.equal(decodeReferences(obfuscateEmails(original)), original);
});

test("every address on the page is hidden", () => {
  const out = obfuscateEmails("<p>a@one.nl en <b>b.c+d@two.example.org</b></p>");

  assert.doesNotMatch(out, /@/);
  assert.equal(
    decodeReferences(out),
    "<p>a@one.nl en <b>b.c+d@two.example.org</b></p>"
  );
});

test("text without an address is left untouched", () => {
  const html =
    '<p>wilmavanderschoot/at/mimamusic.nl</p><a href="tel:+31627418262">06-27418262</a><a href="/koren/">Koren</a>';

  assert.equal(obfuscateEmails(html), html);
});

test("CSS at-rules are not mistaken for addresses", () => {
  const html = "<style>@font-face{font-family:x}@media (max-width:1px){a{color:red}}</style>";

  assert.equal(obfuscateEmails(html), html);
});
