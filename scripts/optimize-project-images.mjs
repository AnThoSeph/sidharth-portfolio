/**
 * Compress project and photography stills to WebP for faster page loads.
 * Run: npm run optimize-images
 * Originals are moved to {folder}/_originals/ (gitignored).
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSET_DIRS = [
  path.join(ROOT, "assets", "projects"),
  path.join(ROOT, "assets", "photography"),
];

const SKIP_DIRS = new Set(["_shared", "_originals"]);
const SKIP_EXT = new Set([".glb", ".svg", ".webp", ".mp4", ".md"]);

function encodeSettingsForFile(filePath) {
  const base = path.basename(filePath, path.extname(filePath)).toLowerCase();
  const inPhotography = filePath.includes(`${path.sep}photography${path.sep}`);

  if (inPhotography) return { maxWidth: 1920, quality: 82 };
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

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const outPath = path.join(dir, `${base}.webp`);
  const originalsDir = path.join(dir, "_originals");
  const archivedPath = path.join(originalsDir, path.basename(filePath));

  const before = fs.statSync(filePath).size;
  const { maxWidth, quality } = encodeSettingsForFile(filePath);

  await sharp(filePath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
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
  if (!fs.existsSync(dir)) return results;
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
  let files = [];
  for (const dir of ASSET_DIRS) {
    files = files.concat(await walk(dir));
  }

  if (!files.length) {
    console.log("No PNG/JPEG files found under assets/projects or assets/photography.");
    return;
  }

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
  console.log("Update JSON image paths to .webp if the admin still points at .png/.jpeg.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
