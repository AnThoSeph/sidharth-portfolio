/**
 * Compress project stills to WebP for faster page loads.
 * Run: npm run optimize-images
 * Originals are moved to assets/projects/{slug}/_originals/ (gitignored).
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS_DIR = path.join(ROOT, "assets", "projects");

const SKIP_DIRS = new Set(["_shared", "_originals"]);
const SKIP_EXT = new Set([".glb", ".svg", ".webp", ".mp4", ".md"]);

function maxWidthForFile(name) {
  const base = path.basename(name, path.extname(name)).toLowerCase();
  if (base === "thumb") return 1280;
  if (base === "beauty" || base === "hero" || base === "wireframe") return 1920;
  if (/^gallery-\d+$/i.test(base) || /^\d+$/.test(base)) return 1920;
  if (/^process-\d+$/i.test(base)) return 1600;
  return 1920;
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const outPath = path.join(dir, `${base}.webp`);
  const originalsDir = path.join(dir, "_originals");
  const archivedPath = path.join(originalsDir, path.basename(filePath));

  const before = fs.statSync(filePath).size;
  const maxWidth = maxWidthForFile(filePath);

  await sharp(filePath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);

  const after = fs.statSync(outPath).size;

  if (!fs.existsSync(originalsDir)) {
    fs.mkdirSync(originalsDir, { recursive: true });
  }
  if (!fs.existsSync(archivedPath)) {
    fs.renameSync(filePath, archivedPath);
  } else {
    fs.unlinkSync(filePath);
  }

  const rel = path.relative(ROOT, outPath).replace(/\\/g, "/");
  return { rel, before, after, maxWidth };
}

async function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full, results);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (SKIP_EXT.has(ext)) continue;
    results.push(full);
  }
  return results;
}

function formatBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}

async function main() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error("No assets/projects folder found.");
    process.exit(1);
  }

  const files = await walk(PROJECTS_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  const done = [];

  for (const file of files) {
    const result = await optimizeFile(file);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    done.push(result);
    console.log(
      `✓ ${result.rel}  ${formatBytes(result.before)} → ${formatBytes(result.after)}  (max ${result.maxWidth}px)`
    );
  }

  console.log("");
  console.log(`Optimized ${done.length} file(s).`);
  console.log(`Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}`);
  console.log("Update content/projects/*.json paths from .png/.jpeg to .webp if needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
