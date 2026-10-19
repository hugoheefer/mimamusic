# Spam-guarded contact form — plan

Status: **plan only, nothing built.** Decisions marked *open* need the owner's answer before building.

## Why

Since the move from Joomla to the static site (GitHub Pages) the owner gets much more spam.

- **Joomla** hid the address with its email-cloak plugin: the HTML held only a placeholder ("This email address is being protected from spambots…") and a script built the `mailto:` link in the browser. Original page: `scratch_index.php_contact.html` in the first commit (lines 226–232).
- **The rebuild** wrote `<a href="mailto:wilmavanderschoot@mimamusic.nl">` in plain HTML. Scrapers that don't run scripts could now read it. This is the cause.
- The prototype notes and `rebuild_data/mimamusic-rebuild-spec.md` (line ~447) already say the `/at/` email should be replaced by a form later.

## Done so far

- Commit `8329987` (deployed from `feature/build-mainainable-site`): `maintainable_website/lib/obfuscate-emails.js` rewrites every address and `mailto:` in the built HTML to numeric character references. Stops simple scrapers only; a bot that decodes references, or renders the page, still reads the address (hovering the link also shows it).
- Visible text `wilmavanderschoot/at/mimamusic.nl` on the contact page is the owner's own wording, unchanged since the first rebuild commit. It stays.
- Deploys only run from `feature/build-mainainable-site` (the `github-pages` environment allows only that branch). Master deploys are rejected by environment protection; that is a setting, not a bug.

**Watch the spam for a few weeks.** If it drops enough, the form can wait.

## Target design

GitHub Pages only serves static files, so a small server-side piece runs elsewhere: a **Cloudflare Worker**. The site stays on GitHub Pages; DNS does not move; MX records stay untouched.

```
Visitor's browser                 Cloudflare Worker                 Mail provider
┌──────────────────┐   POST      ┌───────────────────────┐        ┌──────────┐
│ contact form     │ ──────────► │ 1. honeypot           │        │ owner's  │
│ + Turnstile      │             │ 2. verify Turnstile   │ ─────► │ inbox    │
│                  │ ◄────────── │ 3. validate + limit   │        └──────────┘
└──────────────────┘  ok / error │ 4. send the email     │
                                 └───────────────────────┘
                                 secrets: owner address, Turnstile secret, mail key
```

The owner's address exists only in the Worker's secrets: not in the HTML, the repo, or the page.

### Layers of protection (each catches what the others miss)

1. Hidden **honeypot** field: filled in → discard silently.
2. **Cloudflare Turnstile** (free, mostly invisible, no tracking cookies).
3. **Validation**: length limits, valid email shape, no line breaks in name/email (header injection).
4. **Rate limit** per IP and per address.

### Success only when the provider accepted the mail

- The page shows the success text only after the mail provider's API says "accepted". Rejection, timeout or a bad key → an error message, and the visitor keeps what they typed.
- "Accepted" is not "delivered": the owner's mailbox can still filter it. Wording must not claim more. *Open:* the Dutch text, e.g. "Bedankt, uw bericht is succesvol verstuurd" (accurate) — not "bezorgd/ontvangen".
- Bounce tracking via a provider webhook: not in the first version.

### Visitor confirmation mail — not in the first version

Possible (the Worker mails the visitor a copy), but it lets a bot use the site to mail strangers, bounces can get the provider account suspended, it needs SPF/DKIM DNS records on `mimamusic.nl`, and it doubles mail volume. Start with an on-screen success message. Add the confirmation only if visitors ask whether their message arrived; then with Turnstile + rate limit already in place.

## Impact

- **Owner:** mail arrives from a system address; Reply-To must be the visitor's address; first messages may land in spam (test and mark "not spam"). If the Worker, key or provider breaks, messages stop → test after each deploy.
- **Visitors:** a form instead of a click; no attachments, no sent copy, no address to save. With JavaScript blocked Turnstile fails → keep a phone number as fallback.
- **Site:** contact page gets the form. The `info@` lines on `arrangeren`, `workshop-les` and `workshop-les/muzikale-ondersteuning` can point to the form (*open*) or keep the encoded address. The encoding fix stays for any address left.
- **Privacy:** names, emails and messages pass through Cloudflare and the mail provider → one sentence in the privacy text.
- **Cost:** probably zero at this volume. **Unverified** — check free-plan limits first.

## Open questions (need an answer before building)

1. Does the owner accept a Cloudflare account and a mail provider (and the privacy sentence)? If not, fall back to a script-built link (the Joomla way: address split in pieces, joined by a script; needs a build step so Pages CMS editing stays simple).
2. Which mail provider? Cloudflare's free plan has no outbound email of its own. **Check what is available and free now** (e.g. Resend, MailChannels) before committing.
3. Dutch texts: labels, success, error, privacy sentence.
4. Do the `info@` pages point to the form or keep the encoded address?
5. Port naming for the Worker's mail interface (CLAUDE.md asks for a per-project choice; none is recorded yet).

## Build steps (TDD, small steps, review after each)

1. **Check** free-plan limits (Cloudflare Worker, Turnstile, chosen mail provider). Write findings into this file.
2. **Red:** tests for the pure validation function with synthetic input: valid message, empty fields, too long, bad email, line breaks in name/email, honeypot filled.
3. **Green:** `validate(form)`; then the Worker handler with fakes for Turnstile and the mail provider: honeypot → silent ok; bad Turnstile → 400; invalid → 400; provider accepts → ok; provider rejects/times out → error. Rate limit tests.
4. One **contract check** with a real provider call (owner's account) so the fake can't hide payload errors.
5. **Form** in the contact template + small script (Turnstile, submit, show success/error), Dutch texts. Screenshot for the owner to review the look.
6. **Docs** in the same step: `README.md`, developer manual, `CLAUDE.md` (the reason for the design and the incident above), `todo.md`, user manual if it covers the contact page.
7. **Deploy** and a real test submission end to end.

## Cannot be tested here (owner checks)

- Real mail delivery, spam-folder placement, the Turnstile widget on the real site, the look of the form, and secrets (the owner pastes them into Cloudflare; Claude never handles them).

## Limits to remember

- No captcha is perfect (click-farms, AI solvers); Turnstile + honeypot + rate limit stops most of it.
- Turnstile needs JavaScript.
- Any visible address (even `/at/` with a `mailto:` behind it) is readable by a bot that renders the page.
