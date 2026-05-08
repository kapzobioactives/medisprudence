/* ═══════════════════════════════════════════════════════
   MEDISPRUDENCE — Shared Navigation JS
   ═══════════════════════════════════════════════════════ */

(function () {
  // ── Scroll shadow on nav ──
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ── Mobile drawer ──
  window.toggleDrawer = function () {
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;
    drawer.style.display = 'block';
    requestAnimationFrame(() => drawer.classList.add('open'));
  };

  window.closeDrawer = function () {
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;
    drawer.classList.remove('open');
    setTimeout(() => { drawer.style.display = 'none'; }, 350);
  };

  // Close drawer if clicking backdrop
  document.addEventListener('click', function (e) {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer && drawer.classList.contains('open') && e.target === drawer) {
      closeDrawer();
    }
  });

  // ── FAQ accordion ──
  document.addEventListener('click', function (e) {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });

  // ── Active nav highlight ──
  (function markActive() {
    const path = window.location.pathname;
    document.querySelectorAll('#nav a, #nav .nav-item > a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = new URL(href, window.location.href).pathname;
      if (path === linkPath || (path.endsWith('/') && linkPath === path + 'index.html')) {
        link.classList.add('active');
      }
    });
  })();
})();
