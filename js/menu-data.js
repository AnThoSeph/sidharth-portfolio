/**
 * Menu column-2 preview content — keyed by data-page on <body>.
 */
const MENU_PREVIEWS = {
  index: {
    label: "02 / Featured Work",
    type: "featured",
    badge: "Latest Render",
    image: "assets/projects/bragus/card.webp",
    alt: "BRAGUS character visualization",
    title: "BRAGUS",
    subtitle: "Character / 2026",
    href: "project.html?slug=bragus",
    cta: "View Case Study",
    closeOnClick: true,
  },
  about: {
    label: "02 / About",
    type: "featured",
    badge: "Profile",
    image: "assets/Sid.jpeg",
    alt: "Sidharth KV",
    title: "Sidharth KV",
    subtitle: "3D artist in Kannur, Kerala. Character, product, and asset designing.",
    href: "about.html",
    cta: "Read Bio",
    secondaryHref: "assets/resume.pdf",
    secondaryCta: "Download CV",
    secondaryDownload: true,
  },
  projects: {
    label: "02 / Projects",
    type: "grid",
    href: "projects.html",
    cta: "View All Projects",
    closeOnClick: true,
    items: [
      {
        title: "BRAGUS",
        image: "assets/projects/bragus/card.webp",
        href: "project.html?slug=bragus",
      },
      {
        title: "AXE",
        image: "assets/projects/axe/beauty.webp",
        href: "project.html?slug=axe",
      },
      {
        title: "GARGANTOR",
        image: "assets/projects/gargantor/beauty.webp",
        href: "project.html?slug=gargantor",
      },
    ],
  },
  contact: {
    label: "02 / Contact",
    type: "contact",
    text: "Open for freelance 3D work in character designing, product designing, and asset designing. Remote worldwide from Kannur, Kerala.",
    email: "sidhu500sidhu@gmail.com",
    href: "contact.html",
    cta: "Send Inquiry",
    closeOnClick: true,
  },
};
