Medisprudence corrected full-site build
Generated correction date: 10 June 2026

Upload/deploy instructions:
1. Replace the entire Cloudflare Pages deployment tree with the contents of this zip.
2. Do not preserve any old `functions/` directory from the previous repository state. The stale `functions/_middleware.js` file was intentionally removed because it intercepted /samples and /analysis before redirects could run.
3. Keep `_redirects` as included here. Do not add a wildcard SPA rewrite such as `/* /index.html 200`.
4. After deploy, enable Cloudflare Web Analytics from the Cloudflare Pages dashboard for medisprudence.com. This is intentionally a dashboard action unless you have a manual analytics token.
5. Then test these shared URLs directly: /samples, /samples/, /analysis, /analysis/, /medical-review-signal-check, and /medical-review-signal-check/.

Key corrections included:
- Removed stale Cloudflare Functions middleware.
- Removed noindex URLs from sitemap and refreshed lastmod dates.
- Added Formspree `_gotcha` honeypot to the intake form.
- Versioned main.js as ?v=20260610a.
- Added explicit /medical-review-signal-check redirect.
- Fixed 404 canonical/og:url mismatch.
- Consolidated specimen styling and removed external Google Fonts dependency.
- Added keyboard skip links and h1 targets.
- Added dated legal/trust page notices.
- Tightened long meta descriptions and fixed US spelling in the intake placeholder.


CONTENT REVISION — 2026-06-10
This package also applies the content-review corrections from medisprudence-content-review-20260610.md: Budapest Criteria corrected, illustrative scenarios relabeled, MHPAEA CAA year corrected, Illinois venue corrected, payer-side credential claims tightened, response-time promises standardized, package pricing reconciled, bylines made physician-specific, and named TPA prospect references removed.
