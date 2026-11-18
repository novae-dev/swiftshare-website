# SwiftShare Official Website

React + Vite + TypeScript website for SwiftShare.

## Run locally

Requires Node.js 20.19+ or 22.12+ (Vite 7 requirement).

```powershell
npm install
npm run dev
```

Production build: `npm run build`

## Releases included

- Latest: SwiftShare V2 (`public/downloads/SwiftShare_V2.apk`) — 48.45 MB
- Stable: SwiftShare V1.0.0 (`public/downloads/SwiftShare-v1.0.0.apk`) — 47.28 MB

Both APKs are included in this project. Their SHA-256 checksums are recorded in `public/release.json`. Verify checksums before publishing a replacement.

To update a release, replace the APK file, update its version, file size, checksum, release notes and availability in `public/release.json`, then commit and push. The download cards check that the APK URLs return a file before enabling the links.

## Add real app screenshots later

Put screenshots in `public/screenshots/`. Update the `slots` array in `src/components/Screenshots.tsx` to render `<img>` elements with those paths. The current gallery contains clearly marked placeholders, not fabricated app screenshots.

## SEO

- Metadata, canonical URL, Open Graph, Twitter cards and SoftwareApplication JSON-LD are in `index.html`.
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Google Search Console verification: add the unique meta tag Google gives you inside `<head>` in `index.html`, deploy, then verify.

The site URL is currently configured as `https://swiftshareofficial.vercel.app/`. Update canonical, sitemap, robots and social URLs if you move to a custom domain. Search indexing is not guaranteed and may take time.

## Deploy to Vercel

Import the GitHub repository. Framework: Vite. Build command: `npm run build`. Output directory: `dist`. Every push to the production branch triggers a new deployment.

## Important

Privacy and Terms pages are starter content and should be reviewed before public launch. The screenshots are placeholders until you add genuine app captures.
