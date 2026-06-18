/**
 * Constants for project pages. Project content lives in content/projects/*.json
 * and is loaded by js/load-projects.js — edit via /admin (Netlify CMS).
 */
const PROJECT_PLACEHOLDER = "assets/projects/_shared/placeholder.svg";

const CATEGORY_LABELS = {
  product: "Product",
  character: "Character",
  asset: "Asset",
};

/** Populated async by load-projects.js before page init */
const PROJECTS_DATA = window.PROJECTS_DATA || [];
