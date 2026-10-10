# SPARSHA

NGO website — Next.js (App Router) with Tailwind CSS 4, hosted as a Node.js app
on GoDaddy Node.js Hosting.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

## Production build

```bash
npm run build
npm start       # `next start`, listens on $PORT (falls back to 3000)
```

## Deploying to GoDaddy Node.js Hosting

The platform runs the project as a persistent Node process:
**production install → `npm run build` → `npm start`**.

What this repo provides, per GoDaddy's published deploy contract
(<https://github.com/godaddy/nodejs-hosting-agent-skill>):

| Contract rule | How it is met |
| --- | --- |
| Root `package.json` with `name`, `version`, `main` | [package.json](package.json) — `main` is `next.config.mjs`, since a Next.js app's runtime entry is `next start`, not a file in `main` |
| `build` and `start` scripts | `next build` and `next start` |
| Every package needed for build **and** start in `dependencies` | Tailwind and PostCSS are in `dependencies`, not `devDependencies`, because the platform installs with devDependencies omitted *before* it builds |
| Listen on `process.env.PORT` | `next start` reads `PORT`; it binds `0.0.0.0` |
| Project-root `.npmrc` with the public registry | [.npmrc](.npmrc) |
| Lockfile with public npm URLs only | [package-lock.json](package-lock.json) — regenerate after any dependency change so `npm ci` stays in sync |

Check the app against the contract before uploading, using GoDaddy's own validator
(from the repo above):

```bash
node validate-paas.mjs /path/to/project
```

### Uploading

Build the zip in Git Bash, with `package.json` at the top level and the build
outputs left out (the platform runs its own install and build):

```bash
cd /d/SPARSH
/c/Windows/System32/tar.exe -a -c -f deploy/sparsha-godaddy.zip \
  $(ls -A | grep -vxE 'node_modules|\.next|out|deploy|\.git|\.freebuff|Resources')
```

**Do not use Windows' `Compress-Archive`/Send-to-compressed-folder.** It writes
backslash separators inside the zip (`app\page.jsx`), which the ZIP spec does not
allow and a Linux host reads as literal filename characters — the app would
arrive as a flat pile of oddly named files instead of a working project. bsdtar
(`C:\Windows\System32\tar.exe`) writes forward slashes and is what was used here.

Then upload the zip in the Node.js Hosting dashboard, or connect the Git
repository and pull the branch. To ship an update, repeat the same step; the
production build restarts on the new deployment. `deploy/` is git-ignored, so the
current artifact (`deploy/sparsha-godaddy.zip`, 39 MB) is not committed.

### Cutover note

GitHub Pages is *still publishing* this repository's legacy hand-written pages
(`index.html`, `byelaws.html`) from the `main` branch root, and republishes them on
every push — which is why the Memorandum page had to be deleted from those files
too, not just from the Next.js app. They are kept only as a safety net while the
new host is set up. Once the GoDaddy app answers on the domain, stop the old copy
with **Settings → Pages → Source: None**.

### Annual reports

The three annual-report PDFs in `public/reports/` are image-heavy — embedded
images were 98% of their bytes, at up to 300 dpi — so they were reduced from
**121 MB to 39 MB** with MuPDF's `mutool clean`, which subsamples colour and grey
images to 150 dpi and re-encodes them as JPEG:

```bash
mutool clean -gggg -z -Z \
  --color-lossy-image-subsample-method bicubic --color-lossy-image-subsample-dpi 150 \
  --color-lossy-image-recompress-method jpeg:80 \
  --gray-lossy-image-subsample-method bicubic --gray-lossy-image-subsample-dpi 150 \
  --gray-lossy-image-recompress-method jpeg:80 \
  in.pdf out.pdf && mv out.pdf in.pdf
```

`mutool` is not a project dependency; it comes from the portable Windows zip at
<https://mupdf.com/releases>. Run the same command on any newly added report, so
the upload stays under GoDaddy's 100 MB zip limit — with the reports compressed a
zip of this project is **39 MB**. Page counts, extracted text and page layout were
verified unchanged (worst 1/16-page region differed by 7/255 at render time), and
the full-resolution originals remain in git history if print-quality copies are
ever needed.

## Checks

There is no test runner or linter in this repo. The available checks are
`npm run build` and GoDaddy's `validate-paas.mjs`.
