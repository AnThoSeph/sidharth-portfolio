/**
 * Re-build .webp files from archived PNG/JPEG in each project's _originals/ folder.
 * Use after changing optimize settings or when grid/case-study images look too soft.
 *
 * Run: npm run reencode-images
 * Run one project: node scripts/reencode-from-originals.mjs bragus
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS_DIR = path.join(ROOT, "assets", "projects");
const filterSlug = process.argv[2] || null;

function encodeSettingsForFile(filePath) {
  const base = path.basename(filePath, path.extname(filePath)).toLowerCase();

  if (base === "card") return { maxWidth: 3840, quality: 92 };
  if (base === "thumb") return { maxWidth: 2560, quality: 90 };
  if (base === "beauty" || base === "hero" || base === "wireframe") {
    return { maxWidth: 3840, quality: 92 };
  }
  if (/^gallery-\d+$/i.test(base) || /^\d+$/.test(base)) {
    return { maxWidth: 3840, quality: 92 };
  }
  if (/^process-\d+$/i.test(base)) return { maxWidth: 2560, quality: 88 };
  return { maxWidth: 2560, quality: 88 };
}

function formatBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}

async function reencodeProject(slugDir) {
  const originalsDir = path.join(slugDir, "_originals");
  if (!fs.existsSync(originalsDir)) return [];

  const done = [];
  for (const entry of fs.readdirSync(originalsDir)) {
    const ext = path.extname(entry).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const src = path.join(originalsDir, entry);
    const base = path.basename(entry, ext);
    const outPath = path.join(slugDir, `${base}.webp`);
    const { maxWidth, quality } = encodeSettingsForFile(src);
    const before = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0;

    await sharp(src)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(outPath);

    const after = fs.statSync(outPath).size;
    const rel = path.relative(ROOT, outPath).replace(/\\/g, "/");
    done.push({ rel, before, after, maxWidth, quality });
    console.log(
      `✓ ${rel}  ${before ? `${formatBytes(before)} → ` : ""}${formatBytes(after)}  (${maxWidth}px, q${quality})`
    );
  }
  return done;
}

async function main() {
  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .map((d) => d.name)
    .filter((name) => !filterSlug || name === filterSlug);

  if (!slugs.length) {
    console.log(filterSlug ? `No project folder found for "${filterSlug}".` : "No project folders found.");
    return;
  }

  let total = 0;
  for (const slug of slugs) {
    const results = await reencodeProject(path.join(PROJECTS_DIR, slug));
    total += results.length;
  }

  console.log("");
  console.log(`Re-encoded ${total} file(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
