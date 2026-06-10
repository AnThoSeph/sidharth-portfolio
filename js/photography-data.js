/**
 * Photography gallery — images in assets/photography/
 */
const PHOTOGRAPHY_DATA = [
  {
    slug: "theyyam-cultural",
    title: "Theyyam Ritual",
    category: "culture",
    year: "2024",
    location: "Kannur, Kerala",
    caption: "Traditional Theyyam performance — colour, fire, and ritual presence in a single frame.",
    src: "assets/photography/theyyam-cultural.jpg",
    gridClass: "md:col-span-8",
    aspect: "aspect-video",
  },
  {
    slug: "portrait",
    title: "Portrait Study",
    category: "portrait",
    year: "2025",
    location: "Kerala",
    caption: "Natural light portrait — focus on expression and soft background falloff.",
    src: "assets/photography/portrait.jpg",
    gridClass: "md:col-span-4 md:pt-12",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "theyyam-cultural-2",
    title: "Theyyam — Detail",
    category: "culture",
    year: "2024",
    location: "Kannur, Kerala",
    caption: "Close frame on costume, paint, and gesture during the ritual.",
    src: "assets/photography/theyyam-cultural-2.jpg",
    gridClass: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    slug: "mountain-over-clouds",
    title: "Above the Cloud Line",
    category: "travel",
    year: "2024",
    location: "Western Ghats",
    caption: "Mountain summit breaking through cloud — scale, atmosphere, and muted dawn tones.",
    src: "assets/photography/mountain-over-clouds.jpeg",
    gridClass: "md:col-span-8 md:-mt-24",
    aspect: "aspect-[16/9]",
  },
  {
    slug: "monkey-mom-feeding-baby",
    title: "Mother & Young",
    category: "travel",
    year: "2024",
    location: "Wildlife",
    caption: "Intimate wildlife moment — patience, timing, and telephoto compression.",
    src: "assets/photography/monkey-mom-feeding-baby.jpg",
    gridClass: "md:col-span-4",
    aspect: "aspect-[3/4]",
  },
];

const PHOTO_PLACEHOLDER = "assets/projects/_shared/placeholder.svg";

const PHOTO_CATEGORY_LABELS = {
  portrait: "Portrait",
  culture: "Culture",
  travel: "Travel",
  street: "Street",
  product: "Product",
};
