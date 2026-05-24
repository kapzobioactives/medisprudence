function updateIntakeForm(){
          var svc = document.getElementById('f_service').value;
          var med = document.getElementById('f_dml_mediation') ? document.getElementById('f_dml_mediation').value : '';

          // Block 2 — hide for White-Label Partnership only
          iv('ib-case-context', svc !== 'white-label');

          // Block 3 — IME only (including IME response package)
          iv('ib-ime', svc === 'ime' || svc === 'pkg-ime');

          // Block 4 — DML only
          iv('ib-dml', svc === 'dml');
          iv('ib-dml-date', svc === 'dml' && med !== '' && med !== 'No \u2014 pre-mediation planning');

          // Block 5 — CVA only (including full package)
          iv('ib-cva', svc === 'cva' || svc === 'pkg-full');

          // Block 6 — CMIP only
          iv('ib-cmip', svc === 'cmip');

          // Block 7 — White-Label only
          iv('ib-wl', svc === 'white-label');

          // Block 8 — Not sure only
          iv('ib-notsure', svc === 'not-sure');
        }

        function iv(id, show){
          var el = document.getElementById(id);
          if(el) el.style.display = show ? 'block' : 'none';
        }

        function submitIntakeForm(e){
          e.preventDefault();
          if(window._intakeSubmitting) return;
          window._intakeSubmitting = true;
          var btn = document.getElementById('intake-submit-btn');
          var err = document.getElementById('intake-error');
          btn.disabled = true;
          btn.textContent = 'Sending\u2026';
          err.style.display = 'none';

          var form = document.getElementById('intake-form-el');
          var data = new FormData(form);

          fetch('https://formspree.io/f/xnjwkapj', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          })
          .then(function(r){
            if(r.ok){
              form.style.display = 'none';
              document.getElementById('intake-success').style.display = 'block';
            } else {
              r.json().then(function(d){
                err.textContent = (d.errors && d.errors.map(function(x){return x.message}).join(', ')) || 'Submission failed. Please email contact@medisprudence.com directly.';
                err.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Submit Case Review Request \u2192';
                window._intakeSubmitting = false;
              });
            }
          })
          .catch(function(){
            err.textContent = 'Network error. Please email contact@medisprudence.com directly.';
            err.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Submit Case Review Request \u2192';
            window._intakeSubmitting = false;
          });
        }

        // Initialise on page load
        document.addEventListener('DOMContentLoaded', updateIntakeForm);
        if(document.readyState!=='loading'){updateIntakeForm();}

/* ---- split from original template ---- */

var T={
  home:'Medisprudence — Medical Case Intelligence for Litigation',
  why:'Why Medisprudence — The Payer Reviewer Advantage',
  results:'Sample Deliverables — Medisprudence',
  about:'About — Medisprudence',faq:'FAQ — Medisprudence',
  contact:'Contact — Medisprudence',intake:'Request Case Review — Medisprudence',
  security:'Data Security — Medisprudence',privacy:'Privacy Policy — Medisprudence',
  terms:'Terms of Use — Medisprudence','ai-use':'AI Use Disclosure — Medisprudence',
  packages:'Case Packages &amp; Bundles — Medisprudence',
  'svc-cva':'Case Viability Screening — Medisprudence',
  'svc-dml':'Defense Medical Lens™ — Medisprudence',
  'svc-cmip':'Full Intelligence Report — Medisprudence',
  'svc-dva':'Defense Vulnerability Analysis — Medisprudence',
  'svc-erb':'Expert Readiness Brief — Medisprudence',
  'svc-pec':'Pre-existing Condition Dossier — Medisprudence',
  'svc-tga':'Treatment Gap Analysis — Medisprudence',
  'svc-wl':'White-Label for LNC Firms — Medisprudence',
  'pa-pi':'Personal Injury — Medisprudence',
  'pa-mm':'Medical Malpractice — Medisprudence',
  'pa-bf':'Bad Faith Insurance Litigation — Medisprudence',
  'pa-wc':'Workers Compensation — Medisprudence',
  'pa-mt':'Mass Tort / MDL — Medisprudence',
  'analysis':'Analysis — Medisprudence',
  'blog-1':'What a Payer Reviewer Actually Looks For in a Medical Record — Medisprudence',
  'blog-2':'Seven Defects We Find in Almost Every Defense IME Report — Medisprudence',
  'blog-3':'More Likely Than Not: What the Medical Evidence Actually Has to Show — Medisprudence',
  'blog-4':'Why Case Viability Screening Before You Retain an Expert Saves $5,000+ — Medisprudence',
  'blog-5':'Physician Case Intelligence vs. Legal Nurse Consulting — Medisprudence',
  'blog-6':'Pre-existing Conditions in PI Cases — Medisprudence',
  'pa-ltderisa':'Long-Term Disability & ERISA — Medisprudence',
  'conflict-policy':'How We Handle Both Sides — Medisprudence',
  'plaintiff-teams':'Plaintiff Teams — Medisprudence',
  'defense-carriers':'Defense & Carriers — Medisprudence',
  'svc-imeqr':'IME Quality Review — Medisprudence',
  'svc-pea':'Plaintiff Expert Report Analysis — Medisprudence',
  'svc-mra':'Medical Reserve Analysis — Medisprudence',
  'svc-urpa':'UR Process Audit — Medisprudence',
  'svc-bds':'Bellwether Defense Screening — Medisprudence',
  'blog-7':'Before Your IME Goes Out — Medisprudence',
  'blog-8':'Reserve-Setting with Medical Evidence — Medisprudence',
  'blog-9':'Plaintiff Expert Report Daubert Defects — Medisprudence',
  'blog-10':'Criteria Application in Bad Faith Defense — Medisprudence',
  'blog-11':'The UR Record: What Plaintiff Will Subpoena — Medisprudence',
  'svc-mhpaea':'MHPAEA Behavioral Health Parity Review — Medisprudence',
  'svc-dpa':'Clinical Denial Pattern Audit — Medisprudence',
  'compliance':'Compliance Consulting — Medisprudence'
};
/* ── PUSHSTATE ROUTER ── */
var ROUTES={
  '/':'home','/why':'why','/ime-deconstruction':'svc-ime','/samples':'results',
  '/about':'about','/faq':'faq','/contact':'contact',
  '/intake':'intake','/security':'security',
  '/privacy':'privacy','/terms':'terms',
  '/ai-use-policy':'ai-use',
  '/packages':'packages',
  '/case-viability-screening':'svc-cva',
  '/defense-medical-lens':'svc-dml',
  '/full-intelligence-report':'svc-cmip',
  '/defense-vulnerability-analysis':'svc-dva',
  '/expert-readiness-brief':'svc-erb',
  '/pre-existing-condition-dossier':'svc-pec',
  '/treatment-gap-analysis':'svc-tga',
  '/white-label':'svc-wl',
  '/personal-injury':'pa-pi',
  '/medical-malpractice':'pa-mm',
  '/bad-faith-insurance':'pa-bf',
  '/workers-compensation':'pa-wc',
  '/mass-tort-mdl':'pa-mt',
  '/analysis':'analysis',
  '/analysis/payer-reviewer-perspective':'blog-1',
  '/analysis/defense-ime-defects':'blog-2',
  '/analysis/more-likely-than-not':'blog-3',
  '/analysis/viability-before-expert':'blog-4',
  '/analysis/physician-vs-lnc':'blog-5',
  '/analysis/pre-existing-conditions':'blog-6',
  '/ltd-erisa':'pa-ltderisa',
  '/conflict-policy':'conflict-policy',
  '/plaintiff-teams':'plaintiff-teams',
  '/defense-carriers':'defense-carriers',
  '/ime-quality-review':'svc-imeqr',
  '/plaintiff-expert-analysis':'svc-pea',
  '/medical-reserve-analysis':'svc-mra',
  '/ur-process-audit':'svc-urpa',
  '/bellwether-defense-screening':'svc-bds',
  '/analysis/ime-quality-pre-submission':'blog-7',
  '/analysis/reserve-setting-medical-evidence':'blog-8',
  '/analysis/plaintiff-expert-daubert':'blog-9',
  '/analysis/criteria-application-bad-faith':'blog-10',
  '/analysis/ur-record-subpoena':'blog-11',
  '/analysis/mhpaea-nqtl-um-practice':'blog-12',
  '/analysis/denial-clinical-defensibility':'blog-13',
  '/analysis/erisa-fiduciary-um-physician':'blog-14',
  '/mhpaea-parity-review':'svc-mhpaea',
  '/clinical-denial-pattern-audit':'svc-dpa',
  '/compliance-consulting':'compliance'
};
function showPage(id){
  if(!id)id='home';
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
  var el=document.getElementById('p-'+id);
  if(!el){el=document.getElementById('p-home');}
  el.classList.add('active');
  window.scrollTo(0,0);
  document.title=T[id]||'Medisprudence';
  var ogUrl=document.querySelector('meta[property="og:url"]');
  if(ogUrl)ogUrl.setAttribute('content','https://medisprudence.com'+window.location.pathname);
}
function route(){
  var path=window.location.pathname;
  showPage(ROUTES[path]||'home');
}
/* Intercept all internal link clicks — no page reload */
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href]');
  if(!a)return;
  var href=a.getAttribute('href');
  if(!href||!href.startsWith('/')||href.startsWith('//')
     ||a.getAttribute('target')==='_blank')return;
  e.preventDefault();
  if(href!==window.location.pathname){history.pushState({},'',href);}
  route();
});
window.addEventListener('popstate',route);
document.addEventListener('DOMContentLoaded',route);
if(document.readyState!=='loading'){route();}
window.addEventListener('scroll',function(){
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>10);
});
function openDrawer(){
  var d=document.getElementById('mobile-drawer');
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
  if(d.classList.contains('open')){closeDrawer();}else{openDrawer();}
}
/* Close drawer when any drawer nav link is tapped */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.drawer-nav,.drawer-cta').forEach(function(el){
    el.addEventListener('click',function(){setTimeout(closeDrawer,80);});
  });
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDrawer();});
document.addEventListener('click',function(e){
  var q=e.target.closest('.faq-q');
  if(!q)return;
  var item=q.closest('.faq-item');
  var wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(x){x.classList.remove('open');});
  if(!wasOpen)item.classList.add('open');
});

/* ======= Tab toggle (Services / Results) ======= */
document.addEventListener('click',function(e){
  var btn=e.target.closest('.tab-btn');
  if(!btn)return;
  var bar=btn.closest('.tab-bar');
  if(!bar)return;
  var target=btn.getAttribute('data-tab');
  if(!target)return;
  /* deactivate sibling buttons */
  bar.querySelectorAll('.tab-btn').forEach(function(b){
    b.classList.remove('active');
    b.setAttribute('aria-selected','false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected','true');
  /* find the scope where the panels live — current section */
  var scope=bar.closest('.sec,.sec-tight,.page')||document;
  scope.querySelectorAll('.tab-panel').forEach(function(p){
    /* only flip panels whose ids match one of the buttons in this bar */
    var match=bar.querySelector('[data-tab="'+p.id+'"]');
    if(match)p.classList.remove('active');
  });
  var panel=document.getElementById(target);
  if(panel)panel.classList.add('active');
});

function filterArticles(audience){
  var cards=document.querySelectorAll('#p-analysis .an-card');
  var visible=0;
  cards.forEach(function(c){
    var a=c.getAttribute('data-audience')||'both';
    var show=(audience==='all'||a===audience||a==='both');
    c.style.display=show?'':'none';
    if(show)visible++;
  });
  var pills=document.querySelectorAll('#analysis-filters .pill');
  pills.forEach(function(p){
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
  cards.forEach(function(c){grid.insertBefore(c,empty);});
}
