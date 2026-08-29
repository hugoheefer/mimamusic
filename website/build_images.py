#!/usr/bin/env python3
"""
Bake the downloaded MiMaMusic photos into the reference prototype as data URIs.

Pipeline:
    mimamusic-reference.src.html   (edit this — images are labelled placeholders)
        + images/web/*.{jpg,png}   (shrunk copies, produced by resize step below)
        -> mimamusic-reference.html (self-contained; this is what gets published)

Run from anywhere:  python build_images.py
Re-shrink originals: python build_images.py --resize
"""
import base64
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC_FILE = os.path.join(HERE, "mimamusic-reference.src.html")
OUT_FILE = os.path.join(HERE, "mimamusic-reference.html")
DOCS_FILE = os.path.join(REPO, "docs", "index.html")   # served by GitHub Pages (master:/docs)
IMG_ORIG = os.path.join(HERE, "images")
IMG_WEB = os.path.join(HERE, "images", "web")
MAXW = 1000
JPEG_Q = 72


def resize_all():
    from PIL import Image, ImageOps
    os.makedirs(IMG_WEB, exist_ok=True)
    for fn in sorted(os.listdir(IMG_ORIG)):
        p = os.path.join(IMG_ORIG, fn)
        if not os.path.isfile(p):
            continue
        try:
            im = ImageOps.exif_transpose(Image.open(p))
        except Exception as e:
            print("skip", fn, e)
            continue
        w, h = im.size
        scale = min(1.0, MAXW / w)
        if scale < 1:
            im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
        if fn.lower().endswith(".png"):
            im.save(os.path.join(IMG_WEB, fn), optimize=True)
        else:
            out = os.path.splitext(fn)[0] + ".jpg"
            im.convert("RGB").save(os.path.join(IMG_WEB, out), quality=JPEG_Q,
                                   optimize=True, progressive=True)
    print("resized ->", IMG_WEB)


def datauri(fname):
    base, ext = os.path.splitext(fname)
    if ext.lower() in (".jpg", ".jpeg"):
        path, mime = os.path.join(IMG_WEB, base + ".jpg"), "image/jpeg"
    else:
        path, mime = os.path.join(IMG_WEB, fname), "image/png"
    with open(path, "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode("ascii"))


def ph(fname, alt, extra=""):
    cls = ("ph " + extra).strip()
    return ('<div class="%s has-img"><img src="%s" alt="%s" loading="lazy" /></div>'
            % (cls, datauri(fname), alt))


def band(items):
    """Shared photo-row used on every section landing (Koren, Onderwijs, ...).
    items: (filename, alt, native_w, native_h). Each photo's flex-grow is its
    aspect ratio and aspect-ratio is locked, so the whole row spans the menu-bar
    width at one common height, native proportions, no cropping."""
    rows = ['<div class="photo-band">']
    for fn, alt, w, h in items:
        rows.append(
            '        <div class="ph band-photo has-img" style="flex: %.3f 1 0; aspect-ratio: %d / %d;">'
            '<img src="%s" alt="%s" loading="lazy" /></div>' % (w / h, w, h, datauri(fn), alt))
    rows.append('      </div>')
    return "\n".join(rows)


def build():
    with open(SRC_FILE, "r", encoding="utf-8") as f:
        h = f.read()
    orig = h

    css = """
  /* --- baked photos --- */
  .ph.has-img { overflow: hidden; padding: 0; border-style: solid; border-color: #1c1c1c; background: #111; }
  .ph.has-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ph.contain.has-img { background: #f2f2f2; }
  .ph.contain.has-img img { object-fit: contain; }
  .ph-lead { float: right; width: 340px; height: 232px; margin: 2px 0 16px 44px; }

  /* homepage — original Joomla 3-column category layout, lightly tuned:
     - all 3 columns use ONE content width, so the gaps between photos are equal
       and the text measure is consistent
     - text block reserves an equal height -> the 3 photos start on one line
     - photos share one height -> bottoms line up too (modest object-fit crop;
       the portrait keeps its top so the face is safe)
     - display heading eased a step for a calmer ratio to the narrow column
     Stacks below 768px. */
  #page-home .home-cols { display: flex; flex-wrap: wrap; justify-content: space-between; }
  #page-home .home-col { flex: 0 0 auto; }
  #page-home .home-col > .page-title:first-child { font-size: clamp(22px, 2.4vw, 27px); margin: 0 0 14px; }
  #page-home .home-col p { margin: 0 0 16px; min-height: 80px; }
  #page-home .home-figure { height: 240px; }
  /* per-column width shared by text + photo. Onderwijs keeps its native 16:9
     (427 = 240 x 16/9) and shows uncropped; the band still fits the menu-bar
     width: 270 + 427 + 270 + two equal gaps = the 1170px measure. */
  #page-home .hc-dir p, #page-home .hc-dir .home-figure { width: 270px; max-width: 100%; }
  #page-home .hc-ond p, #page-home .hc-ond .home-figure { width: 427px; max-width: 100%; }
  #page-home .hc-dwf p, #page-home .hc-dwf .home-figure { width: 270px; max-width: 100%; }
  #page-home .hc-ond .home-figure img { object-fit: contain; }
  #page-home .hc-dwf .home-figure img { object-position: center top; }
  @media (max-width: 1040px) {
    #page-home .home-cols { flex-direction: column; flex-wrap: nowrap; }
    #page-home .home-col { margin-bottom: 34px; }
    #page-home .home-col p { min-height: 0; }
    #page-home .home-col > .page-title:first-child { font-size: clamp(22px, 5.5vw, 27px); }
    #page-home .hc-dir p, #page-home .hc-ond p, #page-home .hc-dwf p,
    #page-home .hc-dir .home-figure, #page-home .hc-ond .home-figure, #page-home .hc-dwf .home-figure { width: 100%; max-width: 440px; }
    #page-home .home-figure { height: auto; }
    #page-home .hc-dir .home-figure, #page-home .hc-dwf .home-figure { aspect-ratio: 9 / 8; }
    #page-home .hc-ond .home-figure { aspect-ratio: 16 / 9; }
  }

  .badge-img { width: 84px; height: 84px; margin-top: 0; display: block; }
  @media (max-width: 760px) { .ph-lead { float: none; width: 100%; max-width: 340px; margin: 0 0 16px; } }

  /* shared section-landing photo row (Koren, Onderwijs, ...): native ratios,
     one common height, whole row spans the menu-bar width. flex-grow ∝ each
     photo's aspect ratio (set inline), aspect-ratio locked → equal heights,
     no cropping, full width. Same treatment as the homepage band. */
  .photo-band { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 10px; margin: 24px 0 4px; width: 100%; }
  .photo-band .band-photo { min-width: 0; padding: 0; border: 0; background: none; overflow: hidden; }
  .photo-band .band-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 620px) {
    .photo-band .band-photo { flex: 1 1 calc(50% - 5px) !important; }
  }

  /* section-landing teasers — full-width stacked blocks below the leading article
     (text spans the menu-bar measure, same as every other page) */
  .teaser-grid { display: flex; flex-direction: column; gap: 54px; margin-top: 54px; }
  .teaser { min-width: 0; }
  .teaser-title { font-family: var(--font-title); color: var(--title-red); font-size: 19px; font-weight: 400; line-height: 1.3; margin: 0 0 12px; }
  .teaser-title a { color: inherit; text-decoration: none; }
  .teaser-title a:hover { text-decoration: underline; }
  .teaser p { margin: 0 0 10px; }
  .teaser .photo-band { margin-top: 16px; }
  .teaser-logo.has-img { width: 175px; height: 52px; padding: 0; border: 0; margin-top: 14px; }
  .teaser-logo.contain.has-img { background: #fff; }
  .teaser-img.has-img { width: 100%; max-width: 380px; margin-top: 14px; aspect-ratio: 275 / 183; border: 0; }   /* ~253px tall = same height as the top .photo-band */
"""
    h = h.replace(
        "\n  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }",
        css + "\n  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }", 1)

    # homepage block photos — one still per block (articles 21 / 16 / 15), no carousel
    h = h.replace('<div class="ph home-fig-dir">[home-foto: dirigeren]</div>',
                  ph("2017-12b.jpg", "Wilma dirigeert, 2017", "home-figure home-figure--dir"), 1)
    h = h.replace('<div class="ph home-fig-ond">[home-foto: onderwijs]</div>',
                  ph("2012-11-06__De_Bron_leslokaal_4.jpg", "Muzieklokaal De Bron, 2012", "home-figure home-figure--ond"), 1)
    h = h.replace('<div class="ph home-fig-dwf">[home-foto: dwarsfluit]</div>',
                  ph("Wilma_fluitist_1986.jpg", "Wilma als fluitiste, 1986", "home-figure home-figure--dwf"), 1)

    # koren landing — "Koordirigent" intro + 4-photo band only. The per-choir
    # blocks live on their own sub-pages (KOREN dropdown), not on the landing.
    h = h.replace('<!--BAND:koren-->', band([
        ("2010-kerst__dirigent_wilma_in_de_sneeuw.jpg", "Wilma dirigeert in de sneeuw, kerst 2010", 105, 158),
        ("2015-09-23_GGK_40.png", "Gestels Gemengd Koor, 2015", 236, 157),
        ("Wilma_vleermuis_2022.jpg", "Wilma dirigeert, 2022", 160, 158),
        ("Wilma_2024.jpg", "Wilma, 2024", 212, 159),
    ]), 1)

    # Spirit
    h = h.replace(
        '      <div class="photo-stack">\n        <div class="ph">concertfoto &rarr; origineel van Wilma</div>\n        <div class="ph">concertfoto &rarr; origineel van Wilma</div>\n      </div>',
        '      <div class="photo-stack">\n        ' + ph("_DSC8853.jpg", "Gospelpopkoor Spirit in concert")
        + '\n        ' + ph("spirit_3.jpg", "Gospelpopkoor Spirit in concert") + '\n      </div>', 1)

    # Singin'Gestel
    h = h.replace(
        '      <div class="photo-pair">\n        <div class="ph">koorfoto &rarr; origineel van Wilma</div>\n        <div class="ph">koorfoto &rarr; origineel van Wilma</div>\n      </div>',
        '      <div class="photo-pair">\n        ' + ph("2024-05_met_kinderen.jpg", "Singin'Gestel in de kerk")
        + '\n        ' + ph("2024-03-20.jpg", "Singin'Gestel") + '\n      </div>', 1)

    # MIKS logo
    h = h.replace('<div class="ph ph-logo">logo Popkoor MIKS &rarr; origineel</div>',
                  ph("MIKS_logo.png", "Popkoor MIKS", "ph-logo contain"), 1)

    # Onderwijs landing — intro + 3-photo band (live dims 203x154 / 274x155; djembe native 233x156)
    h = h.replace('<!--BAND:onderwijs-->', band([
        ("2014-10-08_Bieb_Heyhoef3.jpg", "Muziekworkshop in de bibliotheek, 2014", 203, 154),
        ("2012-11-06__De_Bron_leslokaal.jpg", "Leslokaal met keyboards, De Bron", 274, 155),
        ("djembe_60.jpg", "Djembeworkshop op het schoolplein", 233, 156),
    ]), 1)
    h = h.replace('<!--IMG:emmaus-->',
                  ph("Emmaus1.jpg", "Basisschool Emmaus", "teaser-img"), 1)

    # Dwarsfluit / de fluitist
    h = h.replace(
        '    <article class="art">\n      <h2 class="page-title is-red">fluitist</h2>\n      <p class="pending">Artikel-id&nbsp;11 (&ldquo;de fluitist&rdquo;). Tekst nog op te halen.</p>\n    </article>',
        '    <article class="art clearfix">\n      <h2 class="page-title is-red">fluitist</h2>\n      '
        + ph("Wilma_fluitist_1986.jpg", "Wilma als fluitiste, 1986", "ph-side")
        + '\n      <p class="pending">Artikel-id&nbsp;11 (&ldquo;de fluitist&rdquo;). Tekst nog op te halen.</p>\n    </article>', 1)

    # workshop/les landing
    h = h.replace('<section class="page" id="page-workshop" data-owner="workshop" hidden>',
                  '<section class="page clearfix" id="page-workshop" data-owner="workshop" hidden>', 1)
    h = h.replace(
        '    <h2 class="page-title is-dim">workshop/les</h2>\n    <div class="prose">\n      <p class="pending">Sectie-intro.',
        '    <h2 class="page-title is-dim">workshop/les</h2>\n    <div class="prose">\n      '
        + ph("2020-12-jamulus.png", "Online lesgeven via Jamulus en Zoom", "ph-side")
        + '\n      <p class="pending">Sectie-intro.', 1)

    # Workshopmogelijkheden
    h = h.replace('<div class="ph ph-side">foto (gekleurde stiften) &rarr; origineel van Wilma</div>',
                  ph("boomwhackers_1c.jpg", "Boomwhackers", "ph-side"), 1)

    # Contact portrait
    h = h.replace('<div class="ph ph-portrait">portretfoto &rarr; origineel van Wilma</div>',
                  ph("2020-06-28_Wilma.jpg", "Wilma van der Schoot", "ph-portrait"), 1)

    # Footer badge
    h = h.replace('<div class="badge" aria-hidden="true"><b>MIMA</b><span>Music</span></div>',
                  '<img class="badge-img" src="%s" alt="MiMaMusic" />' % datauri("MIMAmusic_LOGO2-4.png"), 1)

    if h == orig:
        sys.exit("NO CHANGES MADE - marker strings out of sync with the .src.html")

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(h)

    # deploy artifact for Cloudflare Pages / GitHub Pages (output dir: docs/)
    os.makedirs(os.path.dirname(DOCS_FILE), exist_ok=True)
    with open(DOCS_FILE, "w", encoding="utf-8") as f:
        f.write(h)

    print("built %s + docs/index.html  (%.2f MB, %d images)"
          % (os.path.basename(OUT_FILE), len(h) / 1024 / 1024, h.count("<img ")))


if __name__ == "__main__":
    if "--resize" in sys.argv:
        resize_all()
    build()
