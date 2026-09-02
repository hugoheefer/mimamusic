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
- Change the **menu bar** — rename an item, reorder it, or add/remove a
  dropdown entry (see §7a).

After you click **Save**, the website updates itself within about a minute.

## What you cannot do here (ask the developer)

- Change the page layout, the colours or the fonts (the menu bar *is* editable — §7a).
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
| **Koren — overzicht** | The main Koren page: the "Koordirigent" text, the **Fotoreeks** photo row, and **Onderdelen** — optional blocks under the text (§6a). |
| **Onderwijs** | The Onderwijs page: text, **Fotoreeks** photo row, and **Onderdelen** — here one block, "Bs Emmaus" (§6a). |
| **Dwarsfluit** | Title + **Onderdelen** — the stacked parts (Geschiedenis, fluitist, Dwarsfluitles, Blokfluitles). Same block editor as the others (§6a). |
| **Arrangeren** | Single page of text. |
| **Workshop/les — overzicht** | The main Workshop/les page (the "Muzikale ondersteuning" text). |
| **Contact** | The "over mij" text, the portrait photo, e-mail and phone. |
| **Koren — subpagina's** | Spirit, Singin'Gestel, Popkoor MIKS, Koor Voluum. You can add a new one here. |
| **Workshop/les — Muzikale ondersteuning** | That sub-page: title, text, optional photo. |
| **Workshop/les — Workshopmogelijkheden** | That sub-page: the title, plus **Onderdelen** — a list of blocks you can add to (§6a). |
| **Agenda — kop en introtekst** | The "Agenda" heading and the sentence above the list. |
| **Agenda — optredens** | The list of upcoming events shown on the page. |
| **Privacyverklaring** | The privacy page (currently a placeholder). |
| **Menubalk (hoofdmenu)** | The menu bar at the top of every page: which items appear, their order, and the dropdown entries under Koren and Workshop/les (§7a). |

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

**Agenda — kop en introtekst** — the heading and the sentence above the list.
Edit the **Kop** and **Introtekst** fields, **Save**.

**Agenda — optredens** — the list of events:
1. Each entry has:
   - **Datum** — the date.
   - **Titel** — e.g. *"Najaarsconcert Singin'Gestel"*.
   - **Locatie** — optional, e.g. *"Sint-Michielsgestel"*.
   - **Link bij de locatie** — optional. Paste a full web address
     (`https://…`). When it's a valid address the **Locatie** text becomes a
     clickable link that opens in a new tab. Anything that isn't a proper web
     address is ignored — the location just stays plain text.
2. **Add** a new entry, or delete a past one.
3. **Save**.

On the site, the Agenda page shows the intro text and the list of upcoming
events. Nothing to configure.

If the list is empty, the page shows *"Op dit moment staan er geen activiteiten
gepland…"*. Past dates drop off the upcoming list on their own, but it's tidy to
delete them now and then.

---

## 6a. Onderdelen — the block lists

**Every content page** has an **Onderdelen** section (all except Home and the
Agenda). It works the same way everywhere — a list of blocks you can add to,
reorder and remove — so you can give any page extra structured content without
asking the developer. On **Dwarsfluit** the whole page is already built from these
blocks; on the others it starts empty (except **Onderwijs**, which has the "Bs
Emmaus" block).

Each block has the same fields:
- **Kop** — a short sub-heading for the block. Optional on Koren, Onderwijs and
  Workshopmogelijkheden; on Dwarsfluit each part has one (Geschiedenis, fluitist…).
- **Tekst** — the block's text, with the formatting toolbar (bold, lists, links…).
- **Link (optioneel)** — a web address. If you fill it in, the **Kop** becomes a
  clickable link to that address. Leave it empty for a plain heading. A link
  *inside* a sentence goes in **Tekst** with the toolbar's link button instead —
  you only need this field to make the heading itself a link.
- **Opent in nieuw tabblad** — turn on if the **Link** goes to another website.
- **Smalle tekstkolom** — turn on when the block has a photo beside it and you want
  the text to sit in a narrower column next to it (used on Dwarsfluit's "fluitist").
- **Foto (optioneel)** — a photo for the block. On Koren/Onderwijs it appears
  under the block's text; on Dwarsfluit/Workshopmogelijkheden it floats to the
  right of the text.

Click **Add** under *Onderdelen* for another block, drag the ⣿ handle to reorder,
trash icon to remove. **Save**.

How the blocks *look* (spacing, heading colour, photo placement) is set per page by
the developer and isn't something you choose here — you just fill in the fields.

---

## 7. Adding a new sub-page

For a new **choir** page (Koren):

1. Click **Koren — subpagina's**.
2. Click **Add** / **New**.
3. Fill in **Titel**, the **Tekst**, and photos.
4. **Save.**
5. Add the new page to the menu so visitors can reach it — see §7a. (Its web
   address is the site address + `/koren/` + a simplified version of the title,
   e.g. *Nieuw Koor* → `/koren/nieuw-koor/`. If unsure, open the new page from
   its list first and copy the address from your browser.)

The two **Workshop/les** sub-pages are fixed entries, not a list — to add another
one, ask the developer.

---

## 7a. The menu bar

Open **Menubalk (hoofdmenu)** in the left list. It is the list of items in the
bar at the top of every page, in order.

Each item has:

- **Menu-item** — the wording shown in the bar, e.g. *Koren*.
- **Link** — where it goes, written as a path with slashes: `/koren/` for the
  Koren page, `/` for Home, `/contact/` for Contact. Always start and end with a
  slash.
- **Submenu** — leave empty for a normal item. Fill it in to make the item open a
  dropdown (as *Koren* and *Workshop/les* do). Each submenu entry has its own
  **Submenu-item**, **Link**, and a **Gedimd weergeven** switch (turn on to grey
  a link out, used for archived pages like *Koor Voluum*).

To **reorder** items, drag the ⣿ handle. To **add** one, click **Add** at the
bottom; to **remove** one, use the trash icon. Then **Save**.

Watch out:

- A menu item still needs a page behind it. Adding *"Nieuws"* with link
  `/nieuws/` only works once a `/nieuws/` page actually exists.
- An item that has a **Submenu** is *also* a clickable link to its own **Link** —
  it does both, like *Koren* today. If you want a pure dropdown with no landing
  page, that is a layout change — ask the developer.
- Don't rename or re-link **Home** away from `/`.

---

## 8. Seeing your change live

Every **Save** does this automatically:

1. Your change is recorded on GitHub.
2. The site rebuilds (about a minute).
3. The new version is live at the website address.

Refresh the page (hard refresh if needed — §4). There is nothing else to "publish".

---

## 8a. Getting a copy of the finished website files

The editor holds the *source*; the finished, ready-to-host pages are rebuilt
automatically after every save. To download that built version:

1. **Open the repository on GitHub** — sign in and go to
   `https://github.com/hugoheefer/mimamusic`.
2. **Click "Actions" in the row of tabs across the top of the repository** — the
   strip that reads *Code · Issues · Pull requests · Actions · … · Settings*, just
   under the repository name.
   *Watch out:* there is a second link also called "Actions" inside **Settings**,
   in the grey menu down the left-hand side. That one is for configuration and is
   **not** what you want. Use the tab in the top row.
3. In the list of runs, **click the most recent one with a green check mark**,
   titled *Deploy site to GitHub Pages*.
4. On that run's page, **scroll to the bottom to the "Artifacts" box**. There are
   two:
   - **site-portable** — the one to take. Its internal links are relative, so this
     copy **works wherever you put it**: opened straight from a folder on your
     computer, dropped into any web server, or in a subfolder of one.
   - **site** — the exact copy of what is currently live. Its links assume the
     `hugoheefer.github.io/mimamusic/` path, so it's for reference, not for moving
     elsewhere.
5. Click **site-portable**, a `site-portable.zip` downloads. **Unzip it** — inside
   is the complete website as plain HTML, CSS and image files. Double-click
   `index.html` to open it; every menu link and page works from there, no server
   needed.

Each run keeps both copies for **90 days**. If you'd rather not use GitHub at all,
a free tool such as **HTTrack** (Windows) aimed at the live web address downloads
exactly what is online at that moment.

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
