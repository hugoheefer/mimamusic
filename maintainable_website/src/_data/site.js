/* Site-wide config: brand, contact details, and the primary navigation.
 * Navigation order is fixed by the spec (§3). Parent items with `children`
 * are real links to their own landing page AND open a dropdown. */
export default {
  brand: "MimaMusic",
  domain: "mimamusic.nl",
  description:
    "MiMaMusic — Wilma van der Schoot: koordirigent, dwarsfluit- en blokfluitles, arrangeren, workshops en muzikale ondersteuning in de regio Eindhoven.",
  email: "info@mimamusic.nl",
  contactEmail: "wilmavanderschoot@mimamusic.nl",
  phone: "06-27418262",
  phoneHref: "+31627418262",
  buildYear: new Date().getFullYear(),

  navigation: [
    { text: "Home", url: "/" },
    {
      text: "Koren",
      url: "/koren/",
      children: [
        { text: "Gospelpopkoor Spirit", url: "/koren/gospelpopkoor-spirit/" },
        { text: "Singin'Gestel", url: "/koren/singin-gestel/" },
        { text: "Popkoor MIKS", url: "/koren/popkoor-miks/" },
        { text: "Koor Voluum (archief)", url: "/koren/koor-voluum/", muted: true },
      ],
    },
    { text: "Onderwijs", url: "/onderwijs/" },
    { text: "Dwarsfluit", url: "/dwarsfluit/" },
    { text: "Arrangeren", url: "/arrangeren/" },
    {
      text: "Workshop/les",
      url: "/workshop-les/",
      children: [
        { text: "Muzikale ondersteuning", url: "/workshop-les/muzikale-ondersteuning/" },
        { text: "Workshopmogelijkheden", url: "/workshop-les/workshopmogelijkheden/" },
      ],
    },
    { text: "Agenda", url: "/agenda/" },
    { text: "Contact", url: "/contact/" },
  ],
};
