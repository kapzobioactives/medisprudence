function iv(id, show){
  var el = document.getElementById(id);
  if(el) el.style.display = show ? 'block' : 'none';
}
function updateIntakeForm(){
  var svcEl = document.getElementById('f_service');
  if(!svcEl) return;
  var svc = svcEl.value;
  var medEl = document.getElementById('f_dml_mediation');
  var med = medEl ? medEl.value : '';
  var isCompliance = svc === 'mhpaea' || svc === 'cdpa';
  iv('ib-case-context', svc !== 'white-label' && !isCompliance);
  iv('ib-ime', svc === 'ime' || svc === 'pkg-ime');
  iv('ib-dml', svc === 'dml');
  iv('ib-dml-date', svc === 'dml' && med !== '' && med !== 'No — pre-mediation planning');
  iv('ib-cva', svc === 'cva' || svc === 'pkg-full');
  iv('ib-cmip', svc === 'cmip');
  iv('ib-wl', svc === 'white-label');
  iv('ib-notsure', svc === 'not-sure');
  iv('ib-compliance', isCompliance);
  // Show denial sample size field only for Clinical Denial Pattern Audit
  var sampleEl = document.getElementById('ib-comp-sample-size');
  if(sampleEl) sampleEl.style.display = svc === 'cdpa' ? 'block' : 'none';
}
function submitIntakeForm(e){
  e.preventDefault();
  if(window._intakeSubmitting) return;
  window._intakeSubmitting = true;
  var btn = document.getElementById('intake-submit-btn');
  var err = document.getElementById('intake-error');
  var form = document.getElementById('intake-form-el');
  if(!form) return;
  if(btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
  if(err) err.style.display = 'none';
  var data = new FormData(form);
  fetch('https://formspree.io/f/xnjwkapj', {
    method: 'POST', body: data, headers: { 'Accept': 'application/json' }
  }).then(function(r){
    if(r.ok){
      form.style.display = 'none';
      var success = document.getElementById('intake-success');
      if(success) success.style.display = 'block';
      window.scrollTo({top:0,behavior:'smooth'});
    }else{ throw new Error('Submission failed'); }
  }).catch(function(){
    if(err) err.style.display = 'block';
    window._intakeSubmitting = false;
  }).finally(function(){
    if(btn){ btn.disabled = false; btn.textContent = 'Submit no-PHI inquiry'; }
  });
}
function openDrawer(){
  var d=document.getElementById('mobile-drawer');
  if(!d)return;
  d.style.display='block';
  requestAnimationFrame(function(){d.classList.add('open');});
  window._drawerScrollY = window.scrollY;
  document.body.style.overflow='hidden';
  document.body.style.position='fixed';
  document.body.style.width='100%';
  document.body.style.top='-'+window._drawerScrollY+'px';
}
function closeDrawer(){
  var d=document.getElementById('mobile-drawer');
  if(!d)return;
  d.classList.remove('open');
  document.body.style.overflow='';
  document.body.style.position='';
  document.body.style.width='';
  document.body.style.top='';
  window.scrollTo(0, window._drawerScrollY||0);
  setTimeout(function(){d.style.display='none';},350);
}
function toggleDrawer(){
  var d=document.getElementById('mobile-drawer');
  if(d && d.classList.contains('open')){ closeDrawer(); } else { openDrawer(); }
}
function filterArticles(audience){
  var cards=document.querySelectorAll('#p-analysis .an-card');
  var visible=0;
  cards.forEach(function(c){
    var a=c.getAttribute('data-audience')||'both';
    var show=(audience==='all'||a===audience||a==='both');
    c.style.display=show?'':'none';
    if(show)visible++;
  });
  document.querySelectorAll('#analysis-filters .pill').forEach(function(p){
    p.classList.toggle('active',p.getAttribute('data-aud')===audience);
  });
  var empty=document.getElementById('an-empty');
  if(empty)empty.style.display=visible===0?'block':'none';
}
function sortArticles(order){
  var grid=document.getElementById('analysis-grid');
  if(!grid)return;
  var cards=Array.from(grid.querySelectorAll('.an-card'));
  cards.sort(function(a,b){
    var da=a.getAttribute('data-date')||'';
    var db=b.getAttribute('data-date')||'';
    return order==='old'?da.localeCompare(db):db.localeCompare(da);
  });
  var empty=document.getElementById('an-empty');
  cards.forEach(function(c){ grid.insertBefore(c, empty); });
}
document.addEventListener('DOMContentLoaded', function(){
  var nav=document.getElementById('nav');
  function onScroll(){ if(nav) nav.classList.toggle('scrolled', window.scrollY>10); }
  window.addEventListener('scroll', onScroll); onScroll();
  document.querySelectorAll('.drawer-nav,.drawer-cta').forEach(function(el){
    el.addEventListener('click', function(){ setTimeout(closeDrawer,80); });
  });
  var service=document.getElementById('f_service');
  if(service) service.addEventListener('change', updateIntakeForm);
  var med=document.getElementById('f_dml_mediation');
  if(med) med.addEventListener('change', updateIntakeForm);
  updateIntakeForm();
});
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeDrawer(); });
document.addEventListener('click', function(e){
  var q=e.target.closest('.faq-q');
  if(q){
    var item=q.closest('.faq-item');
    if(item) item.classList.toggle('open');
    return;
  }
  var btn=e.target.closest('.tab-btn');
  if(!btn) return;
  var bar=btn.closest('.tab-bar');
  if(!bar) return;
  var target=btn.getAttribute('data-tab');
  if(!target) return;
  bar.querySelectorAll('.tab-btn').forEach(function(b){
    b.classList.remove('active');
    b.setAttribute('aria-selected','false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected','true');
  var scope=bar.closest('.sec,.sec-tight,.page')||document;
  scope.querySelectorAll('.tab-panel').forEach(function(p){
    var match=bar.querySelector('[data-tab="'+p.id+'"]');
    if(match) p.classList.remove('active');
  });
  var panel=document.getElementById(target);
  if(panel) panel.classList.add('active');
});
