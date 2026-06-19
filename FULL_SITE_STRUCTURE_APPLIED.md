# Medisprudence — Full-Site Structure Application

This build applies the approved homepage structure and visual language across the rest of the site.

## What changed

- Added page-family classes for service pages, practice-area pages, analysis articles, overview pages, and utility/legal pages.
- Added a shared service-page meta strip under each service hero: audience, pricing/scope, and turnaround/scope note.
- Added consistent “Pairs with this review” sections to service pages where they were missing.
- Added missing no-PHI mini-CTA blocks to service pages that did not already have one.
- Added a standard Founder’s Advantage bar where a service page did not already have one.
- Unified card, panel, hero, article, practice-area, overview, and utility-page spacing/radius through one final CSS structure pass.
- Removed remaining non-protected inline styles outside specimen documents and the intake form.
- Preserved the approved homepage Service Map, restored pricing, 1320px desktop width, and the Medical Record & IME Report H1.

## Intentionally protected

- Intake form internals were not structurally rewritten, to avoid breaking conversion/form behavior.
- Specimen document interiors were not normalized, because they intentionally mimic legal/medical work-product documents.
- URLs, nav/footer, SEO files, samples/specimens, articles, Tawk.to, and Formspree logic were preserved.

## Suggested next visual QA

1. Home page at desktop and mobile widths.
2. A plaintiff service page: `/ime-deconstruction/`
3. A defense service page: `/medical-reserve-analysis/`
4. A compliance page: `/mhpaea-parity-review/`
5. A practice-area page: `/personal-injury/`
6. An article page under `/analysis/`
7. The intake page, only to confirm form behavior still works.
