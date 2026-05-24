Medisprudence static 53-page build
===================================

Generated from the latest SEO-fixed index.html.

What changed:
- Converted the JavaScript-routed SPA into physical static pages.
- Each URL now has its own index.html.
- Each URL has one visible H1 from its own page section.
- Shared CSS moved to assets/css/styles.css.
- Shared JavaScript moved to assets/js/main.js.
- Fonts included under assets/fonts/.
- Sitemap regenerated for indexable pages only.
- Utility/legal pages exist but use noindex,follow.

Counts:
- Physical route pages: 53
- Indexable pages in sitemap: 46
- Noindex utility/legal pages: 7

Upload instructions:
1. Unzip this folder on your computer.
2. In GitHub Desktop, replace/update your repository contents with this folder's contents.
3. Keep any existing image files you already have in the repository root if GitHub asks about conflicts:
   favicon.ico, favicon.png, favicon-32.png, logo-mark.svg, og-image.png
4. Commit to main.
5. Test https://medisprudence.com/?v=static1 and the key route pages.

Important:
- The root file must be named index.html, lowercase.
- Do not upload only index.html. Upload all folders, especially assets/ and every route folder.
- Existing legacy URLs without trailing slash should normally resolve to the folder URL on GitHub Pages.
