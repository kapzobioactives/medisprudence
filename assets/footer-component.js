/* ═══════════════════════════════════════════════════════
   MEDISPRUDENCE — Footer Component Injector
   Call: writeFooter('') from root, writeFooter('../') from subdirs
   ═══════════════════════════════════════════════════════ */

function writeFooter(root) {
  root = root || '';
  function inject() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML =
      '<footer>' +
      '<div class="wrap">' +
      '<div class="footer-grid">' +
      '<div>' +
      '<div class="footer-brand-name">Medisprudence</div>' +
      '<div class="footer-tagline">Medical case intelligence for litigation.<br>Physician-authored. Payer-informed. Attorney-directed.</div>' +
      '</div>' +
      '<div class="footer-col"><h6>Services</h6><ul>' +
      '<li><a href="' + root + 'services/ime-deconstruction.html">IME Deconstruction</a></li>' +
      '<li><a href="' + root + 'services/case-viability-screening.html">Case Viability</a></li>' +
      '<li><a href="' + root + 'services/full-intelligence-report.html">Full Intelligence Report</a></li>' +
      '<li><a href="' + root + 'services/defense-medical-lens.html">Defense Medical Lens\u2122</a></li>' +
      '<li><a href="' + root + 'services/white-label.html">White-Label</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h6>Practice Areas</h6><ul>' +
      '<li><a href="' + root + 'practice-areas/personal-injury.html">Personal Injury</a></li>' +
      '<li><a href="' + root + 'practice-areas/medical-malpractice.html">Medical Malpractice</a></li>' +
      '<li><a href="' + root + 'practice-areas/bad-faith-insurance.html">Bad Faith</a></li>' +
      '<li><a href="' + root + 'practice-areas/workers-compensation.html">Workers Compensation</a></li>' +
      '<li><a href="' + root + 'practice-areas/mass-tort.html">Mass Tort / MDL</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h6>Firm</h6><ul>' +
      '<li><a href="' + root + 'why-us.html">Why Us</a></li>' +
      '<li><a href="' + root + 'results.html">Results</a></li>' +
      '<li><a href="' + root + 'about.html">About</a></li>' +
      '<li><a href="' + root + 'faq.html">FAQ</a></li>' +
      '<li><a href="' + root + 'security.html">Data Security</a></li>' +
      '<li><a href="' + root + 'contact.html">Contact</a></li>' +
      '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom">' +
      '<div class="footer-legal-links">' +
      '<a href="' + root + 'privacy.html">Privacy Policy</a>' +
      '<a href="' + root + 'terms.html">Terms of Use</a>' +
      '<a href="' + root + 'ai-use.html">AI Use Disclosure</a>' +
      '</div>' +
      '<p>\u00a9 2026 Medisprudence\u2122 \u00b7 <a href="mailto:contact@medisprudence.com" style="color:inherit">contact@medisprudence.com</a> \u00b7 Operated from India \u00b7 Cross-border processing disclosed before records are accepted \u00b7 Do not send PHI by email</p>' +
      '<p>Medisprudence provides physician-directed medical case intelligence under attorney supervision. Not a patient-facing medical service. We do not provide legal advice, legal representation, or independent expert testimony.</p>' +
      '</div></div></footer>';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
}
