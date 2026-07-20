# Medisprudence Field Guide Build — Correction Log

Correction date: 10 June 2026

## Fixed in this package

- Deleted `functions/_middleware.js` and removed the now-empty `functions/` directory.
- Removed the seven noindex pages from `sitemap.xml`: `/ai-use-policy/`, `/conflict-policy/`, `/contact/`, `/intake/`, `/privacy/`, `/security/`, and `/terms/`.
- Refreshed remaining sitemap `lastmod` values to `2026-06-10`.
- Added the missing Formspree `_gotcha` honeypot to `/intake/`.
- Changed the intake placeholder from “organisation” to “organization”.
- Versioned all site `main.js` references to `/assets/js/main.js?v=20260610a`.
- Added the missing no-trailing-slash redirect for `/medical-review-signal-check`.
- Removed the conflicting canonical and `og:url` tags from `404.html`.
- Tightened the meta descriptions for `/medical-evidence-in-litigation/` and `/medical-review-signal-check/`.
- Removed external Google Fonts from all specimen pages and consolidated specimens onto `specimens/specimen.css`.
- Added the compliance-only `.grade*` and `.tbl-scroll` helper styles to the shared specimen stylesheet so DPA/MHPAEA specimens retain their styling.
- Added self-hosted font-face rules to `specimens/specimen.css`.
- Converted specimen document titles to `h1` elements.
- Added keyboard “Skip to main content” links and targets across full pages/specimens.
- Added full “Last updated: 10 June 2026” notices to Privacy, Terms, AI Use Disclosure, Conflict Policy, and Security pages.
- Rewrote `README_UPLOAD.txt` to describe full-tree deployment and to warn against preserving the old `functions/` directory.

## Remaining dashboard-only item

Cloudflare Web Analytics still must be enabled in the Cloudflare dashboard, unless a manual analytics token is supplied and inserted into the HTML. No fake token was added to this build.


## Service-page comparison audit implementation

- Kept the ChatGPT service-guide build as the base.
- Restored the **Founder's Advantage** label only where the generic **Reviewer perspective** label had replaced it; retained service-specific labels where they communicate more accurately.
- Added concise, non-disparaging comparisons with common review options on seven pages where buyers are likely to confuse scope.
- Added a DVA vs Defense Medical Lens vs CMIP comparison.
- Reduced MCNR duplication by retaining its original methodology and converting the added guide into a compact engagement section.
- Reworked Bellwether and White-Label workflows from forced five-step sequences into four-stage models.
- Added targeted scope callouts and expanded only FAQs that were materially under-answered.
- Did not add unsupported market prices, outcome claims, or universal fee-recoverability statements.
