# Deploy to Netlify

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sidharth-portfolio.git
git push -u origin main
```

## 2. Connect Netlify

1. Sign in at [netlify.com](https://www.netlify.com)
2. **Add new site** → **Import an existing project** → **GitHub**
3. Select your repo
4. Build settings (should auto-detect from `netlify.toml`):
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (root)
5. Click **Deploy**

## 3. Contact form

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). After deploy:

1. Netlify dashboard → **Forms** → confirm `contact` appears
2. **Site settings** → **Forms** → **Form notifications** → add your email

Submissions also appear in the Netlify dashboard.

## 4. Custom domain (optional)

Netlify → **Domain management** → add your domain and follow DNS steps.

## Local preview

```bash
npx --yes serve .
```

Open `http://localhost:3000` — required for 3D viewer (`model-viewer` + `.glb` files).
