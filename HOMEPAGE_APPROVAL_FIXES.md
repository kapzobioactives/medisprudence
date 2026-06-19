# Homepage Approval Fixes — Medisprudence

This build is a tight correction pass on top of `medisprudence-redesign-implemented.zip`.

## Scope
Only homepage-facing approval issues were changed. Intake, specimens, deeper service-page templates, articles, sitemap, redirects, Tawk.to, and Formspree logic were left intact.

## Fixes applied

1. Restored the homepage H1 to include IME:
   - `Physician Medical Record & IME Report Review for Litigation.`

2. Restored subtle pricing on the homepage Service Map:
   - IME Report Deconstruction — From $500
   - Case Viability Screening — From $350
   - Full Intelligence Report / CMIP™ — From $1,500
   - Defense Medical Lens™ — From $400
   - IME Quality Review — From $400
   - Plaintiff Expert Report Analysis — From $500
   - Medical Reserve Analysis — From $750
   - UR Process Audit — From $600
   - Medical Charge & Necessity Review — From $450
   - MHPAEA Behavioral Health Parity Review — $3,000–8,000
   - Clinical Denial Pattern Audit — $4,000–10,000

3. Reduced the large-desktop content cap:
   - `--wrap` in the desktop override changed from `1760px` to `1320px`.
   - Redesigned nav max width changed from `1440px` to `1320px`.

4. Reduced homepage corner-radius inconsistency:
   - Added `--r-card: 8px`, `--r-panel: 10px`, `--r-soft: 12px`.
   - Service cards, lanes, sample cards, trust strip, steps, nav, dropdowns, and shared cards now use these smaller tokens instead of the previous 16–28px soft SaaS corners.

5. Preserved the homepage Service Map structure:
   - Plaintiff lane
   - Defense / TPA / Carrier lane
   - Both-sides MCNR band
   - ERISA / MHPAEA / Compliance lane

## Not included in this pass

- No full 76-page structural refactor.
- No intake form cleanup.
- No specimen CSS cleanup.
- No complete removal of `!important` from the stylesheet.

Those are intentionally deferred until the homepage visual direction is approved.
