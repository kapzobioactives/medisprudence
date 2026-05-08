# Medisprudence — Static Multi-Page Website

## Deployment Notes

### Structure
```
medisprudence-site/
├── index.html              ← Home (deploy root)
├── why-us.html
├── results.html
├── about.html
├── faq.html
├── contact.html
├── intake.html             ← Needs Formspree setup (see below)
├── security.html
├── privacy.html
├── terms.html
├── ai-use.html
├── services/               ← 9 service pages
├── practice-areas/         ← 5 practice area pages
├── specimens/              ← 5 specimen deliverable pages
└── assets/
    ├── style.css
    ├── nav.js
    ├── nav-component.js    ← Injects nav HTML via document.write()
    └── footer-component.js ← Injects footer HTML via document.write()
```

### Static Hosting
Pure static site. No server-side code. Works on:
- Netlify (recommended — free tier, drag-and-drop deploy)
- Vercel
- GitHub Pages
- Any Apache/Nginx static server
- AWS S3 + CloudFront

### Intake Form Setup (Formspree)
1. Go to https://formspree.io and create a free account
2. Create a new form, get the form ID (looks like: `xnqkabcd`)
3. In `intake.html`, replace `YOUR_FORM_ID` with your form ID:
   - Line: `action="https://formspree.io/f/YOUR_FORM_ID"`

### Custom Domain
If deploying to medisprudence.com, all paths are relative — no config needed.
If deploying to a subdirectory (e.g. example.com/medisprudence/), all paths still work correctly.

### nav-component.js / footer-component.js
These use `document.write()` to inject shared nav and footer HTML.
- Root pages call: `writeNav('')` and `writeFooter('')`
- Pages in `services/` or `practice-areas/` call: `writeNav('../')` and `writeFooter('../')`
- `document.write()` works correctly in all browsers for synchronous HTML injection.

### No dependencies
No npm, no bundler, no framework. Pure HTML/CSS/JS. Open any .html file directly in a browser to test locally.
