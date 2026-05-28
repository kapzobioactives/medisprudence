Upload these files into the root of the existing Cloudflare Pages/GitHub repository.

Replace:
- index.html
- assets/css/styles.css
- samples.html
- _redirects

Do not delete the existing folders such as /samples/, /analysis/, /about/, /faq/, /assets/fonts/, images, favicons, etc.

The key fix is _redirects: it removes the bad wildcard rule:
/* /index.html 200

That wildcard is suitable for a single-page app, but this is a static multi-page site. It makes LinkedIn/shared URLs resolve to the homepage instead of the actual page.

Note: samples.html is retained as a harmless static fallback; Cloudflare _redirects handles /samples.html at CDN level.
