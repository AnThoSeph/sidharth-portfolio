# Project assets — 7 flagship works

Drop your exports into each project folder using the filenames below.
The site will use them automatically once files exist (placeholders show until then).

## Standard export size (recommended)

| Use | Size | Aspect |
|-----|------|--------|
| **Compare slider** (`beauty`, blockout step) | **2560 × 1440 px** | **16∶9** |
| Hero / gallery / process steps | **2560 × 1440 px** | **16∶9** (same camera & crop when comparing) |
| Grid thumbnail (`thumb`) | **1280 × 720 px** | 16∶9 (or reuse a cropped `beauty`) |

**Format:** use **`.png`** for all still images. **`.glb`** only for optional 3D viewer (not `.obj` on the site).

Compare pair must be **identical resolution and framing**. For HIBIKI: **`process-02.png`** (blockout) vs **`beauty.png`** (final).

## Folder structure (per project)

```
assets/projects/{slug}/
  thumb.png
  hero.png
  beauty.png         → Final render (compare “Final” + Expand)
  wireframe.png
  process-01.png     → Step 1 (e.g. Concept)
  process-02.png     → Step 2 (e.g. Blockout — used in compare slider when labeled Blockout)
  process-03.png
  process-04.png
  gallery-01.png
  gallery-02.png
  gallery-03.png
  model.glb          → Optional interactive 3D
  reel.mp4           → Optional turntable clip
```

Project metadata and image paths are edited in the **admin panel** (`/admin`) or in `content/projects/{slug}.json`. See [`HOW-TO-ADD-PROJECTS.md`](../../HOW-TO-ADD-PROJECTS.md) at the repo root.

## Your 7 project slugs

| # | Slug | Display name |
|---|------|----------------|
| 1 | `hibiki` | HIBIKI — Japanese blended whisky |
| 2 | `liquid-dreams` | Liquid Dreams |
| 3 | `protocol-09` | Protocol-09 |
| 4 | `the-sanctuary` | The Sanctuary |
| 5 | `chroma-forge` | Chroma Forge |
| 6 | `aurora-drive` | Aurora Drive |
| 7 | `void-sentinel` | Void Sentinel |

## Case study URLs

`project.html?slug=hibiki` (replace slug for each project)

## Before / after slider

Automatically uses the process step named **Blockout** or **Greybox** (left) vs **`beauty.png`** (right).

HIBIKI override (explicit):

```js
compareBefore: "assets/projects/hibiki/process-02.png",
compareAfter: "assets/projects/hibiki/beauty.png",
```

## Lightbox

Gallery and process images open full-screen. Use arrow keys or on-screen controls to navigate.
