# SwiftShare website

Official download site for the SwiftShare Android app. Static React + Vite + TypeScript, no backend. Not a PWA: it distributes an APK, it does not install the app.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Requires Node 18 or newer.

## Publish a new APK release

All release information lives in `public/release.json`. Nothing is hardcoded in components.

1. Put the new APK in `public/downloads/` (replace the old one, keep the name in `fileName`).
2. Calculate its SHA-256:
   - macOS/Linux: `shasum -a 256 public/downloads/swiftshare.apk`
   - Windows PowerShell: `Get-FileHash public\downloads\swiftshare.apk -Algorithm SHA256`
3. Edit `public/release.json`:

| Field | Meaning |
|---|---|
| `version`, `versionCode` | Must match the APK |
| `releaseDate` | e.g. `2026-12-01` |
| `fileName` | APK file name inside `public/downloads/` |
| `downloadUrl` | `/downloads/<fileName>` |
| `fileSize` | e.g. `18.4 MB` |
| `sha256` | Checksum from step 2 |
| `minimumAndroidVersion` | e.g. `8.0` |
| `available` | `true` to enable downloads |
| `releaseNotes` | List of short strings |
| `supportedFeatures` | Feature ids the APK really supports: `apk-sharing`, `media-sharing`, `file-sharing`, `qr-connection`, `transfer-progress`, `transfer-resume`, `simple-ux` |

4. `git add . && git commit -m "Release 1.0.0" && git push`. Vercel deploys automatically.

Safeguards: the Download button stays disabled unless `available` is `true` **and** the APK URL actually responds with a non-HTML file. Features show as Planned until listed in `supportedFeatures`.

Notes:
- GitHub rejects single files over 100 MB. For larger APKs use Git LFS or host the file elsewhere and put its full HTTPS URL in `downloadUrl`.
- Sign every release with the same key, or Android will not install updates over older versions.
- No download counter is included: without a backend it cannot be counted honestly.

## Deploy to GitHub and Vercel

```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/swiftshare-website.git
git push -u origin main
```

Then in Vercel: Add New, Project, import the repository. It detects Vite (build `npm run build`, output `dist`). Every push to `main` redeploys. `vercel.json` handles page routing for `/privacy` and `/terms` and sets the APK headers.

## Before going live

- Edit `src/pages/Legal.tsx` (Privacy and Terms are placeholders), plus `LEGAL_UPDATED` and `CONTACT_EMAIL` in `src/config.ts`.
- Review `src/data/faq.ts` so the answers match your app (for example, pricing).
