# How to add or edit projects (no coding)

Your portfolio has a browser admin panel powered by **Decap CMS** (formerly Netlify CMS). You fill in forms and upload images; saving publishes changes to GitHub and Netlify rebuilds the live site in about a minute.

**Admin URL:** [https://sidharth-kv.netlify.app/admin](https://sidharth-kv.netlify.app/admin)

---

## One-time setup (Netlify dashboard)

Do this once after the admin files are deployed to GitHub/Netlify.

1. Open [Netlify](https://app.netlify.com) and select your site (**sidharth-kv**).
2. Go to **Site configuration** → **Identity** → click **Enable Identity**.
3. Under **Identity** → **Invite users**, invite both authorized emails:
   - `sidhu500sidhu@gmail.com`
   - `anshual005@gmail.com`
   Accept each invite from your inbox (or use **Login with Google** after invite-only is enabled).
4. Go to **Identity** → **Identity settings** → scroll to **Services** → click **Enable Git Gateway**.
5. Under **Registration preferences**, set registration to **Invite only**.
6. Under **External providers**, enable **Google** (optional but recommended for Google login).
7. After deploy, confirm **Registration triggered functions** shows `identity-signup` (blocks any email not on the allowlist).

Only **sidhu500sidhu@gmail.com** and **anshual005@gmail.com** can access `/admin`. Any other Google or email login is rejected.

---

## Add a new project

1. Go to [https://sidharth-kv.netlify.app/admin](https://sidharth-kv.netlify.app/admin) and log in.
2. Click **Projects** → **New Project**.
3. Fill in the form:
   - **Slug** — lowercase URL name with hyphens (e.g. `neon-garden`). This becomes `project.html?slug=neon-garden`.
   - **Title, category, year, role**, etc. — case study copy and metadata chips.
   - **Tools** — click **Add** for each tool (Blender, Maya, …).
   - **Images** — upload thumbnail, hero, beauty, gallery, and process step images. They are stored under `assets/projects/`.
   - **3D model** — optional `.glb` file if the case study should show an interactive viewer.
4. Click **Publish** (top right). Wait ~1 minute for Netlify to redeploy.

### Show the new project on the site

Publishing creates `content/projects/your-slug.json` but does **not** automatically add it to lists. After publishing:

1. In admin, open **Site settings** → **Project order (all projects page)**.
2. **Add** your new slug to the list (order = display order on the Projects page and prev/next links).
3. **Publish**.

Optional — homepage featured grid (4 projects):

1. Open **Site settings** → **Featured projects (homepage)**.
2. Add or reorder slugs (max 4 recommended for the current layout).
3. **Publish**.

---

## Edit an existing project (e.g. HIBIKI)

1. Log in at `/admin`.
2. **Projects** → click the project (e.g. HIBIKI).
3. Change text or replace images → **Publish**.

---

## Image tips (outside the admin)

Recommended sizes and filenames are in [`assets/projects/README.md`](assets/projects/README.md).

- Hero / compare images: **2560×1440** when possible.
- Compress very large PNGs before upload (keeps the site fast).
- Use consistent names in each project folder: `thumb.png`, `hero.png`, `beauty.png`, `gallery-01.png`, `process-01.png`, etc.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| `/admin` shows login but save fails | Confirm **Git Gateway** is enabled under Identity settings. |
| Project page 404 / empty | Check the slug in the URL matches the **Slug** field and that the slug is listed in **Project order**. |
| New project not on homepage | Add its slug under **Featured projects** in Site settings. |
| Images broken after upload | Re-open the project in admin and confirm image fields show paths under `assets/projects/...`. |

---

## What still requires a developer (optional)

- **Menu preview images** (`js/menu-data.js`) — separate from project CMS; can be added later.
- **Photography section** — not in CMS yet (planned phase 2).
- **Local preview** — run `npx serve .` in the project folder if you want to test before deploy.

For questions about the site itself: **sidhu500sidhu@gmail.com**.
