# Content manual — the MiMaMusic website

For the person who keeps the website's text and photos up to date. You do **not**
need to know anything about code, and you cannot break the website by editing
content here — the editor only lets you fill in fixed fields.

> Written in English for review. Ask the developer for a Dutch version to keep.

| | |
|---|---|
| The website | `https://hugoheefer.github.io/mimamusic/` (later: `https://mimamusic.nl`) |
| The editor | `https://app.pagescms.org` |

---

## What you can do here

- Change any **text** on the site.
- **Replace or add photos**.
- Keep the **Agenda** (upcoming concerts / services / events) up to date.
- Add a new **choir sub-page** or **workshop sub-page**.

After you click **Save**, the website updates itself within about a minute.

## What you cannot do here (ask the developer)

- Change the page layout, the menu, the colours or the fonts.
- Add a completely new *kind* of page or section.
- Add a 4th block to the Home page (it is a fixed 3-column design).

---

## 1. One-time setup

You only do this the first time.

1. **Create a free GitHub account** at `https://github.com/signup` if you don't
   have one. Use an email you check.
2. **Turn on two-factor authentication** when GitHub asks (it will) — install an
   authenticator app on your phone and follow the prompts. Keep the recovery codes
   somewhere safe.
3. The developer will **invite you to the project**. You'll get an email from
   GitHub — open it and click **Accept invitation**.
4. The developer connects the site to the editor once. After that you just sign in.

---

## 2. Signing in to the editor

1. Go to **https://app.pagescms.org**.
2. Click **Sign in with GitHub**. Approve the access request the first time.
3. Open the **mimamusic** project.
4. **Check the branch name** shown near the top-left, under "mimamusic". It must be
   the one the developer told you to use (currently
   `feature/build-mainainable-site`; later it will be `master`). If it's wrong,
   click it and pick the right one. *This is the most common mistake — if the page
   list looks empty or wrong, the branch is wrong.*

---

## 3. The page list

Down the left side, under **Content**:

| Item | What it is |
|---|---|
| **Home** | The front page: the 3 short blocks (Dirigeren / Onderwijs / Dwarsfluit). |
| **Koren — overzicht** | The main Koren page: the "Koordirigent" text, the row of photos, and optional blocks under it. |
| **Onderwijs** | The Onderwijs page: text, photo row, and the "Bs Emmaus" block. |
| **Dwarsfluit** | The four stacked parts (Geschiedenis, fluitist, Dwarsfluitles, Blokfluitles). |
| **Arrangeren** | Single page of text. |
| **Workshop/les — overzicht** | The main Workshop/les page (the "Muzikale ondersteuning" text). |
| **Contact** | The "over mij" text, the portrait photo, e-mail and phone. |
| **Koren — subpagina's** | Spirit, Singin'Gestel, Popkoor MIKS, Koor Voluum. You can add a new one here. |
| **Workshop/les — subpagina's** | Muzikale ondersteuning, Workshopmogelijkheden. |
| **Agenda — kop en introtekst** | The "Agenda" heading and the sentence above the calendar. |
| **Agenda — optredens (kalender)** | The list of upcoming events shown on the page and marked on the calendar. |
| **Privacyverklaring** | The privacy page (currently a placeholder). |

Under **Media** is the photo library.

---

## 4. Editing text — worked example

Say you want to change the sentence under "Dirigeren" on the Home page.

1. Click **Home** in the left list.
2. You see **Titel**, **Omschrijving voor Google**, and **Blokken** with *Item #1,
   #2, #3*.
3. Click **Item #1** to expand it. Change the **Tekst** field.
4. Scroll up and click **Save** (top right).
5. Wait about a minute, then open the website and refresh the page. If you still
   see the old text, do a *hard refresh*: **Ctrl+Shift+R** (Windows) or
   **Cmd+Shift+R** (Mac).

Editing any other page works the same way: open it, change the fields, **Save**.

- **Omschrijving voor Google** is the short summary search engines show. One or two
  sentences.
- Bigger text areas (marked *Tekst*) accept simple formatting — bold, links, bullet
  lists — using the toolbar.

---

## 5. Photos

### Replace a photo

1. Open the page, find the photo field (**Afbeelding**).
2. Click it → **Choose from library** to pick an existing photo, or **Upload** a
   new one from your computer.
3. Fill in **Alt-tekst** — a short description of what's in the photo (used by
   screen readers and search engines). E.g. *"Wilma dirigeert een koor, 2024"*.
4. **Save**.

### Add a photo to a photo row (Koren / Onderwijs)

1. Open **Koren — overzicht** (or **Onderwijs**).
2. Under **Fotoreeks**, click **Add** (the + at the bottom of the list).
3. Set **Afbeelding**, **Alt-tekst**, and **Breedte in px** / **Hoogte in px** —
   the photo's real pixel size. You can read these in Windows Explorer (right-click
   the file → Properties → Details) or in the Media library. The row uses them to
   keep every photo the same height without stretching.
4. Drag the ⣿ handle to reorder. Use the trash icon to remove one.
5. **Save**.

### Best photo sizes

Upload photos **no wider than ~1600 px** and as JPEG. Very large files just make
the site slower; the build automatically makes smaller versions for phones.

---

## 6. The Agenda

The Agenda has **two** entries in the editor:

**Agenda — kop en introtekst** — the heading and the sentence above the calendar.
Edit the **Kop** and **Introtekst** fields, **Save**.

**Agenda — optredens (kalender)** — the list of events:
1. Each entry has:
   - **Datum** — the date.
   - **Titel** — e.g. *"Najaarsconcert Singin'Gestel"*.
   - **Soort** — `concert`, `dienst`, or `evenement` (sets the colour dot).
   - **Locatie** — optional, e.g. *"Sint-Michielsgestel"*.
2. **Add** a new entry, or delete a past one.
3. **Save**.

On the site, the Agenda page shows the intro text and the list of upcoming events
on the left, and one month of the calendar on the right. The calendar covers every
month up to your furthest event (up to 6 months ahead); **‹ vorige / volgende ›**
switch which month is shown, in place — so an event next month appears both in the
list and on its own calendar page. Nothing to configure.

If the list is empty, the page shows *"Op dit moment staan er geen activiteiten
gepland…"*. Past dates drop off the upcoming list on their own, but it's tidy to
delete them now and then.

---

## 7. Adding a new sub-page

For a new choir or workshop page:

1. Click **Koren — subpagina's** (or **Workshop/les — subpagina's**).
2. Click **Add** / **New**.
3. Fill in **Titel**, the **Tekst**, and photos.
4. **Save.**
5. Tell the developer the page exists — they add it to the dropdown menu (that one
   step is not in the editor).

---

## 8. Seeing your change live

Every **Save** does this automatically:

1. Your change is recorded on GitHub.
2. The site rebuilds (about a minute).
3. The new version is live at the website address.

Refresh the page (hard refresh if needed — §4). There is nothing else to "publish".

---

## 9. If something looks wrong

- **Every change is reversible.** Nothing is ever lost.
- If a save made the site look wrong, tell the developer which page and roughly
  when — they can restore the previous version in seconds (GitHub keeps a full
  history with a one-click "Revert").
- If the editor shows an empty or strange page list → you're on the wrong
  **branch** (§2, step 4).
- If a photo doesn't appear after a minute or two → check you filled **Breedte /
  Hoogte** for photo-row images, and did a hard refresh.

---

## 10. Mini glossary

| Word | Plain meaning |
|---|---|
| **Repo / repository** | The single place on GitHub that holds the whole website. |
| **Branch** | A named version line of the site. You edit the one the developer tells you. |
| **Commit** | One saved change, with a time stamp and who made it. Every **Save** is a commit. |
| **Deploy / build** | The automatic step that turns your saved text into the live web pages. |
| **Hard refresh** | Reload a page ignoring the browser's cache: Ctrl+Shift+R / Cmd+Shift+R. |
