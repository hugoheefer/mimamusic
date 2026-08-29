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

  /* homepage block photos (one per block, from articles 21/16/15) */
  .home-figure--dir { float: left; width: 249px; height: 275px; margin: 4px 26px 8px 0; }
  .home-figure--ond { width: 321px; height: 180px; margin: 12px 0 6px; }
  .home-figure--dwf { width: 222px; height: 290px; margin: 6px 0 4px; }
  @media (max-width: 620px) {
    .home-figure--dir { float: none; }
    .home-figure--dir, .home-figure--ond, .home-figure--dwf { width: 100%; max-width: 321px; height: auto; aspect-ratio: 4 / 3; }
  }

  .badge-img { width: 84px; height: 84px; margin-top: 22px; display: block; }
  @media (max-width: 760px) { .ph-lead { float: none; width: 100%; max-width: 340px; margin: 0 0 16px; } }
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

    # koren landing lead image
    h = h.replace('<section class="page" id="page-koren" data-owner="koren" hidden>',
                  '<section class="page clearfix" id="page-koren" data-owner="koren" hidden>', 1)
    h = h.replace(
        '  <section class="page clearfix" id="page-koren" data-owner="koren" hidden>\n    <h2 class="page-title is-dim">Koren</h2>\n    <div class="prose">\n',
        '  <section class="page clearfix" id="page-koren" data-owner="koren" hidden>\n    <h2 class="page-title is-dim">Koren</h2>\n    <div class="prose">\n      '
        + ph("2010-kerst__dirigent_wilma_in_de_sneeuw.jpg", "Wilma dirigeert", "ph-lead") + "\n", 1)

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

    # Onderwijs
    h = h.replace(
        '      <div class="photo-row">\n        <div class="ph">foto &rarr; origineel van Wilma</div>\n        <div class="ph">foto &rarr; origineel van Wilma</div>\n        <div class="ph">foto &rarr; origineel van Wilma</div>\n      </div>',
        '      <div class="photo-row">\n        ' + ph("2014-10-08_Bieb_Heyhoef3.jpg", "Muziekworkshop in de bibliotheek")
        + '\n        ' + ph("2012-11-06__De_Bron_leslokaal.jpg", "Leslokaal met keyboards")
        + '\n        ' + ph("djembe_60.jpg", "Djembeworkshop op het schoolplein") + '\n      </div>', 1)

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
