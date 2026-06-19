# Photography assets

Photos are managed in the **admin panel** (`/admin` → **Photography**).

Each photo gets its own folder:

```
assets/photography/{slug}/
  your-photo.jpg   → run npm run optimize-images → your-photo.webp
```

Metadata and display order live in:

- `content/photography/{slug}.json` — title, category, caption, image path
- `content/photo-order.json` — gallery order on the Photos page

**Categories:** `portrait`, `culture`, `travel`, `street`, `product`

After uploading in admin, run `npm run optimize-images` locally (or ask your developer to push) so large JPEGs/PNGs become fast WebP files.
