# SPARSHA

NGO website — Next.js (App Router) with Tailwind CSS 4, hosted as a static site on Cloudflare Pages.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

## Production build

```bash
npm run build   # Static HTML/CSS/JS export generated into `out/`
```

To preview the exported static build locally:

```bash
npx serve out
# or with Wrangler:
npx wrangler pages dev out
```

## Deploying to Cloudflare Pages

The site is configured for **Next.js Static HTML Export** (`output: "export"` in `next.config.mjs`), which generates static assets into `out/` and serves them from Cloudflare's global edge network.

### Option 1: Cloudflare Dashboard (Recommended — Git integration)

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select your repository (`sparsha-ngo/SPARSH`) and branch (`main`).
3. Set the build configuration:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`
4. Under **Environment variables**, set:
   - `NODE_VERSION`: `22` (also provided via [.node-version](.node-version))
5. Click **Save and Deploy**. Cloudflare will automatically build and deploy new pushes to `main`.

### Option 2: Wrangler CLI

You can deploy directly using Wrangler (or Cloudflare's build system running `wrangler deploy`):

```bash
# Build the static export
npm run build

# Deploy to Cloudflare
npm run deploy
# or: npx wrangler deploy
```

The repository includes [wrangler.toml](wrangler.toml) configured with `[assets] directory = "./out"`.

### HTTP Headers & Security

Custom HTTP headers for Cloudflare Pages are configured in [public/_headers](public/_headers) (copied into `out/_headers` at build time):
- Long-term caching for immutable assets (`/_next/static/*`)
- 7-day browser caching for PDFs and images
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)

### GitHub Pages note

If GitHub Pages was previously enabled on the repository (**Settings → Pages**), set **Source: None** to ensure traffic exclusively routes to Cloudflare.

### Annual reports & asset limits

Cloudflare Pages enforces a **25 MiB maximum limit per individual asset file**.
The three annual-report PDFs in `public/reports/` are image-heavy and were compressed with MuPDF's `mutool clean`:
- `annual-report-2022-23.pdf`: ~12.2 MiB
- `annual-report-2023-24.pdf`: ~10.8 MiB
- `annual-report-2024-25.pdf`: ~18.2 MiB

All files are well within Cloudflare's 25 MiB limit. If you add a new annual report that exceeds 25 MiB, compress it using `mutool clean`:

```bash
mutool clean -gggg -z -Z \
  --color-lossy-image-subsample-method bicubic --color-lossy-image-subsample-dpi 150 \
  --color-lossy-image-recompress-method jpeg:80 \
  --gray-lossy-image-subsample-method bicubic --gray-lossy-image-subsample-dpi 150 \
  --gray-lossy-image-recompress-method jpeg:80 \
  in.pdf out.pdf && mv out.pdf in.pdf
```

`mutool` comes from <https://mupdf.com/releases>.

## Checks

The available checks are:
- `npm run build` — compiles and exports the app into `out/`
- GitHub Actions CI in [.github/workflows/ci.yml](.github/workflows/ci.yml) — runs build and guards the Cloudflare Pages 25 MiB file size limit
