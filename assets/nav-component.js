/* ═══════════════════════════════════════════════════════
   MEDISPRUDENCE — Nav Component Injector
   Call: writeNav('') from root, writeNav('../') from subdirs
   ═══════════════════════════════════════════════════════ */

function writeNav(root) {
  root = root || '';
  function inject() {
    var el = document.getElementById('site-nav');
    if (!el) return;
    el.innerHTML =
      '<nav id="nav">' +
      '<a class="brand" href="' + root + 'index.html">' +
      '<svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true" style="color:var(--teal)">' +
      '<line x1="16" y1="4" x2="16" y2="29" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
      '<line x1="10" y1="29" x2="22" y2="29" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
      '<line x1="5" y1="11" x2="27" y2="11" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
      '<circle cx="16" cy="11" r="2.4" fill="currentColor"/>' +
      '<line x1="5" y1="11" x2="5" y2="19" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M1.5 19 Q5 24.5 8.5 19" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<line x1="27" y1="11" x2="27" y2="19" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M23.5 19 Q27 24.5 30.5 19" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '</svg>' +
      '<span class="brand-wordmark">Medisprudence</span>' +
      '</a>' +
      '<ul class="nav-center">' +
      '<li class="nav-item"><button>Services <span class="chevron">\u25be</span></button>' +
      '<div class="dropdown">' +
      '<div class="dd-section-label">Core Services</div>' +
      '<a href="' + root + 'services/ime-deconstruction.html">IME Report Deconstruction</a>' +
      '<a href="' + root + 'services/case-viability-screening.html">Case Viability Screening</a>' +
      '<a href="' + root + 'services/full-intelligence-report.html">Full Intelligence Report (CMIP\u2122)</a>' +
      '<a href="' + root + 'services/defense-medical-lens.html">Defense Medical Lens\u2122</a>' +
      '<div class="dd-section-label">Supporting Services</div>' +
      '<a href="' + root + 'services/defense-vulnerability-analysis.html">Defense Vulnerability Analysis</a>' +
      '<a href="' + root + 'services/expert-readiness-brief.html">Expert Readiness Brief</a>' +
      '<a href="' + root + 'services/preexisting-condition-dossier.html">Pre-existing Condition Dossier</a>' +
      '<a href="' + root + 'services/treatment-gap-analysis.html">Treatment Gap Analysis</a>' +
      '<div class="dd-section-label">Partnership</div>' +
      '<a href="' + root + 'services/white-label.html">White-Label for LNC Firms</a>' +
      '</div></li>' +
      '<li class="nav-item"><button>Practice Areas <span class="chevron">\u25be</span></button>' +
      '<div class="dropdown">' +
      '<a href="' + root + 'practice-areas/personal-injury.html">Personal Injury \u2014 Auto &amp; Trucking</a>' +
      '<a href="' + root + 'practice-areas/medical-malpractice.html">Medical Malpractice</a>' +
      '<a href="' + root + 'practice-areas/bad-faith-insurance.html">Bad Faith Insurance Litigation</a>' +
      '<a href="' + root + 'practice-areas/workers-compensation.html">Workers Compensation Defense</a>' +
      '<a href="' + root + 'practice-areas/mass-tort.html">Mass Tort / MDL</a>' +
      '</div></li>' +
      '<li class="nav-item"><a href="' + root + 'why-us.html">Why Us</a></li>' +
      '<li class="nav-item"><a href="' + root + 'results.html">Results</a></li>' +
      '<li class="nav-item"><a href="' + root + 'about.html">About</a></li>' +
      '<li class="nav-item"><a href="' + root + 'faq.html">FAQ</a></li>' +
      '</ul>' +
      '<div class="nav-right">' +
      '<a class="nav-cta" href="' + root + 'intake.html">Request Case Review</a>' +
      '<button class="mobile-toggle" onclick="toggleDrawer()" aria-label="Open menu">&#9776;</button>' +
      '</div></nav>' +
      '<div id="mobile-drawer" class="mobile-drawer" style="display:none">' +
      '<div class="mobile-drawer-panel">' +
      '<div class="drawer-header"><span class="drawer-wordmark">Medisprudence</span>' +
      '<button class="drawer-close" onclick="closeDrawer()">\u2715</button></div>' +
      '<div class="drawer-nav-list">' +
      '<a class="drawer-nav primary" href="' + root + 'index.html">Home</a>' +
      '<div class="drawer-section-label">Services</div>' +
      '<a class="drawer-nav" href="' + root + 'services/ime-deconstruction.html">IME Report Deconstruction</a>' +
      '<a class="drawer-nav" href="' + root + 'services/case-viability-screening.html">Case Viability Screening</a>' +
      '<a class="drawer-nav" href="' + root + 'services/full-intelligence-report.html">Full Intelligence Report</a>' +
      '<a class="drawer-nav" href="' + root + 'services/defense-medical-lens.html">Defense Medical Lens\u2122</a>' +
      '<a class="drawer-nav" href="' + root + 'services/defense-vulnerability-analysis.html">Defense Vulnerability Analysis</a>' +
      '<a class="drawer-nav" href="' + root + 'services/expert-readiness-brief.html">Expert Readiness Brief</a>' +
      '<a class="drawer-nav" href="' + root + 'services/preexisting-condition-dossier.html">Pre-existing Condition Dossier</a>' +
      '<a class="drawer-nav" href="' + root + 'services/treatment-gap-analysis.html">Treatment Gap Analysis</a>' +
      '<a class="drawer-nav" href="' + root + 'services/white-label.html">White-Label for LNC Firms</a>' +
      '<div class="drawer-section-label">Practice Areas</div>' +
      '<a class="drawer-nav" href="' + root + 'practice-areas/personal-injury.html">Personal Injury</a>' +
      '<a class="drawer-nav" href="' + root + 'practice-areas/medical-malpractice.html">Medical Malpractice</a>' +
      '<a class="drawer-nav" href="' + root + 'practice-areas/bad-faith-insurance.html">Bad Faith Litigation</a>' +
      '<a class="drawer-nav" href="' + root + 'practice-areas/workers-compensation.html">Workers Compensation Defense</a>' +
      '<a class="drawer-nav" href="' + root + 'practice-areas/mass-tort.html">Mass Tort / MDL</a>' +
      '<div class="drawer-section-label">Firm</div>' +
      '<a class="drawer-nav" href="' + root + 'why-us.html">Why Us</a>' +
      '<a class="drawer-nav" href="' + root + 'results.html">Results</a>' +
      '<a class="drawer-nav" href="' + root + 'about.html">About</a>' +
      '<a class="drawer-nav" href="' + root + 'faq.html">FAQ</a>' +
      '<a class="drawer-nav" href="' + root + 'contact.html">Contact</a>' +
      '</div>' +
      '<a class="drawer-cta" href="' + root + 'intake.html">Request Case Review</a>' +
      '</div></div>';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
}
