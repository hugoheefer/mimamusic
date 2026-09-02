<?php
/**
 * MiMaMusic – temporary domain-preserving wrapper (PHP version).
 *
 * Drop this file into the public_html/ folder where the Joomla site
 * normally lives (e.g. on the dds.nl domain). Because Joomla's own
 * front controller is also index.php, placing this file here makes the
 * web server serve THIS instead of booting Joomla.
 *
 * It keeps the visitor on the current domain while showing the real
 * site, which is hosted on GitHub Pages, inside a full-window iframe.
 *
 * The plain static version lives next to this file as index.html and is
 * kept in sync by hand – edit both if you change the markup.
 */

$target = 'https://hugoheefer.github.io/mimamusic/';

// Preserve any sub-path / query string so deep links keep working,
// e.g. /onderwijs?x=1  ->  https://hugoheefer.github.io/mimamusic/onderwijs?x=1
$requestPath = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$requestPath = ltrim(parse_url($requestPath, PHP_URL_PATH) ?: '', '/');
// Ignore a request for this script itself.
if ($requestPath === 'index.php') {
    $requestPath = '';
}
$query = isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] !== ''
    ? '?' . $_SERVER['QUERY_STRING']
    : '';

$iframeSrc = $target . $requestPath . $query;

// Keep search engines off this temporary wrapper.
header('X-Robots-Tag: noindex', true);
header('Content-Type: text/html; charset=utf-8', true);

// Helper so the URL is safe to drop into HTML attributes.
$src = htmlspecialchars($iframeSrc, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MiMaMusic</title>
  <meta name="robots" content="noindex">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      background: #faf9f7;
    }
    iframe {
      border: 0;
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    /* Shown only if the iframe fails to load / is blocked */
    .fallback {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      color: #222;
      text-align: center;
      padding: 3rem 1rem;
    }
    .fallback a { color: #0a58ca; }
  </style>
</head>
<body>
  <div class="fallback">
    <p>MiMaMusic laadt&hellip;
       Werkt het niet? <a href="<?= $src ?>">Klik hier</a>.</p>
  </div>
  <iframe
    src="<?= $src ?>"
    title="MiMaMusic"
    allow="fullscreen; autoplay; encrypted-media"
    referrerpolicy="no-referrer-when-downgrade"></iframe>
</body>
</html>
