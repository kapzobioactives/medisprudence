const META = {
  '/samples': {
    title: 'Sample Deliverables — Medisprudence',
    description: 'Full-format specimen deliverables for every service — IME deconstruction, case viability screening, Defense Medical Lens, and Full Intelligence Reports for PI and med-mal. Fictional clinical data. Real methodology.',
    image: 'https://medisprudence.com/og-image-samples.png'
  },
  '/analysis': {
    title: 'Analysis — Medisprudence',
    description: 'Written from inside the reviewer\'s chair. Six articles on IME defects, causation standards, pre-existing conditions, case economics, and what a payer reviewer actually looks for in a medical record.',
    image: 'https://medisprudence.com/og-image-analysis.png'
  }
}

const DEFAULT = {
  title: 'Medisprudence — Medical Case Intelligence for Litigation',
  description: 'Physician-authored IME deconstruction, case viability screening, and defense vulnerability analysis — calibrated to how defense reviewers actually evaluate records. From a physician inside a US commercial payer.',
  image: 'https://medisprudence.com/og-image.png'
}

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const meta = META[url.pathname] || DEFAULT

  const response = await context.next()
  const html = await response.text()

  const injected = html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/og:title" content=".*?"/, `og:title" content="${meta.title}"`)
    .replace(/og:description" content=".*?"/, `og:description" content="${meta.description}"`)
    .replace(/og:image" content=".*?"/, `og:image" content="${meta.image}"`)
    .replace(/twitter:title" content=".*?"/, `twitter:title" content="${meta.title}"`)
    .replace(/twitter:description" content=".*?"/, `twitter:description" content="${meta.description}"`)

  return new Response(injected, {
    headers: response.headers
  })
}
