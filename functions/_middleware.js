export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  const meta = {
    '/samples': {
      title: 'Sample Deliverables — Medisprudence',
      description: 'Full-format physician-authored specimen deliverables for every service. Fictional clinical data. Real methodology. See the work before you engage.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/ime-deconstruction': {
      title: 'IME Report Deconstruction — Medisprudence',
      description: 'Physician-authored IME analysis — unsupported assertions, omitted facts, internal contradictions, and 20+ deposition questions. From $500 · 3–5 days.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/case-viability-screening': {
      title: 'Case Viability Screening (CVA™) — Medisprudence',
      description: 'Pre-expert physician intelligence — does the record support your case theory before you commit the expert budget? From $350 · 72 hours.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/defense-medical-lens': {
      title: 'Defense Medical Lens™ — Medisprudence',
      description: 'Pre-mediation reconstruction of how a defense reviewer evaluates your record — built by a physician who performed that role inside a US commercial payer. From $400 · 48 hours.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/full-intelligence-report': {
      title: 'Full Case Intelligence Report (CMIP™) — Medisprudence',
      description: 'Seven-component physician analysis. One engagement. One invoice. From $1,500 · 5–10 days.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/intake': {
      title: 'Request Case Review — Medisprudence',
      description: 'No PHI required to confirm scope, pricing, and conflict status. Start your case review here.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/why': {
      title: 'Why Medisprudence — The Payer Reviewer Advantage',
      description: 'Our physician reviewed 3,000+ cases from inside a US commercial payer — making denial decisions on the defense side. No competitor has that background.',
      image: 'https://medisprudence.com/og-image.png',
    },
    '/about': {
      title: 'About — Medisprudence',
      description: 'Founded by a physician who reviewed 3,000+ cases inside a US commercial payer. Physician-authored. Payer-informed. Defense-calibrated.',
      image: 'https://medisprudence.com/og-image.png',
    },
  };

  const page = meta[path];
  if (!page) return context.next();

  const response = await context.next();
  let html = await response.text();

  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${page.description}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="https://medisprudence.com${path}"`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${page.image}"`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${page.description}"`
  );

  return new Response(html, {
    headers: response.headers,
    status: response.status,
  });
}
