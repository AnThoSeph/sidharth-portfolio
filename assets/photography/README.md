# Photography assets

Photos are managed in **/admin → Photography**.

Upload images to **`assets/photography/`** (flat folder — one file per photo).

```
assets/photography/
  theyyam-cultural.jpg
  portrait.jpg
  ...
```

Metadata lives in `content/photography/{slug}.json`. Image paths use a leading slash, e.g. `/assets/photography/portrait.jpg`.

**Site settings → Photo order** controls gallery order on the Photos page.

After uploading large JPEGs, run `npm run optimize-images` locally and push for faster loading.
