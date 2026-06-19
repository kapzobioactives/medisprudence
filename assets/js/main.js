function iv(id, show){
  var el = document.getElementById(id);
  if(el) el.style.display = show ? 'block' : 'none';
}
function setNavToggleState(item, open){
  if(!item) return;
  item.classList.toggle('open', !!open);
  var btn = item.querySelector(':scope > button.nav-dd-toggle');
  if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function closeDesktopDropdowns(except){
  document.querySelectorAll('#nav .nav-item.open').forEach(function(item){
    if(item !== except) setNavToggleState(item, false);
  });
}
function updateIntakeForm(){
  var svcEl = document.getElementById('f_service');
  if(!svcEl) return;
  var svc = svcEl.value;
  var medEl = document.getElementById('f_dml_mediation');
  var med = medEl ? medEl.value : '';
  var complianceServices = ['mhpaea','cdpa','compliance'];
  var imeServices = ['ime','pkg-ime','pkg-full','imeqr'];
  var dmlServices = ['dml','dml-def','pkg-ime','pkg-full'];
  var cvaServices = ['cva','cva-def','pkg-full'];
  var cmipServices = ['cmip','pkg-full'];
  var genericServices = ['dva','erb','pec','tga','pea','mra','urpa','bds','mcnr','mcnr-def'];
  var isCompliance = complianceServices.indexOf(svc) !== -1;
  iv('ib-case-context', svc !== 'white-label' && !isCompliance);
  iv('ib-ime', imeServices.indexOf(svc) !== -1);
  iv('ib-dml', dmlServices.indexOf(svc) !== -1);
  iv('ib-dml-date', dmlServices.indexOf(svc) !== -1 && med !== '' && med !== 'No — pre-mediation planning');
  iv('ib-cva', cvaServices.indexOf(svc) !== -1);
  iv('ib-cmip', cmipServices.indexOf(svc) !== -1);
  iv('ib-service-specific', genericServices.indexOf(svc) !== -1);
  iv('ib-wl', svc === 'white-label');
  iv('ib-notsure', svc === 'not-sure' || svc === '');
  iv('ib-compliance', isCompliance);
  var sampleEl = document.getElementById('ib-comp-sample-size');
  if(sampleEl) sampleEl.style.display = svc === 'cdpa' ? 'block' : 'none';
}
function submitIntakeForm(e){
  if(!window.fetch) return true;
  e.preventDefault();
  if(window._intakeSubmitting) return false;
  window._intakeSubmitting = true;
  var btn = document.getElementById('intake-submit-btn');
  var err = document.getElementById('intake-error');
  var form = document.getElementById('intake-form-el');
  if(!form){ window._intakeSubmitting = false; return false; }
  var originalText = btn ? (btn.getAttribute('data-original-text') || btn.textContent) : '';
  if(btn){ btn.setAttribute('data-original-text', originalText); btn.disabled = true; btn.textContent = 'Sending…'; }
  if(err){ err.textContent = 'Submission failed. Please try again, or email contact@medisprudence.com without PHI.'; err.style.display = 'none'; }
  var data = new FormData(form);
  fetch(form.getAttribute('action') || 'https://formspree.io/f/xnjwkapj', {
    method: form.getAttribute('method') || 'POST', body: data, headers: { 'Accept': 'application/json' }
  }).then(function(r){
    if(r.ok){
      form.style.display = 'none';
      var success = document.getElementById('intake-success');
      if(success) success.style.display = 'block';
      window._intakeSubmitting = false;
      window.scrollTo({top:0,behavior:'smooth'});
    }else{ throw new Error('Submission failed'); }
  }).catch(function(){
    if(err){
      err.textContent = 'Submission failed. Please try again, or email contact@medisprudence.com without PHI.';
      err.style.display = 'block';
    }
    window._intakeSubmitting = false;
  }).finally(function(){
    if(btn){ btn.disabled = false; btn.textContent = originalText || 'Submit Case Review Request →'; }
  });
  return false;
}
function openDrawer(){
  var d=document.getElementById('mobile-drawer');
  if(!d)return;
  clearTimeout(window._drawerCloseTimer);
  d.style.display='block';
  requestAnimationFrame(function(){d.classList.add('open');});
  window._drawerScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.style.overflow='hidden';
  document.body.style.position='fixed';
  document.body.style.width='100%';
  document.body.style.top='-'+window._drawerScrollY+'px';
  document.querySelectorAll('.mobile-toggle').forEach(function(b){b.setAttribute('aria-expanded','true');});
}
function closeDrawer(){
  var d=document.getElementById('mobile-drawer');
  if(!d || !d.classList.contains('open')) return;
  d.classList.remove('open');
  document.body.style.overflow='';
  document.body.style.position='';
  document.body.style.width='';
  document.body.style.top='';
  var y = Number.isFinite(window._drawerScrollY) ? window._drawerScrollY : 0;
  window.scrollTo(0, y);
  document.querySelectorAll('.mobile-toggle').forEach(function(b){b.setAttribute('aria-expanded','false');});
  clearTimeout(window._drawerCloseTimer);
  window._drawerCloseTimer = setTimeout(function(){
    if(!d.classList.contains('open')) d.style.display='none';
  },350);
}
function toggleDrawer(){
  var d=document.getElementById('mobile-drawer');
  if(d && d.classList.contains('open')){ closeDrawer(); } else { openDrawer(); }
}
function filterArticles(audience){
  var scope=document.getElementById('p-analysis');
  if(!scope) return;
  var cards=scope.querySelectorAll('.an-card');
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

  document.querySelectorAll('#nav .nav-dd-toggle').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var item=btn.closest('.nav-item');
      var willOpen = item && !item.classList.contains('open');
      closeDesktopDropdowns(item);
      setNavToggleState(item, willOpen);
    });
    btn.addEventListener('keydown', function(e){
      if(e.key==='ArrowDown' || e.key==='Enter' || e.key===' '){
        e.preventDefault();
        var item=btn.closest('.nav-item');
        closeDesktopDropdowns(item);
        setNavToggleState(item, true);
        var first=item ? item.querySelector('.dropdown a,.mega-dropdown a') : null;
        if(first) first.focus();
      }
    });
  });
  document.querySelectorAll('#nav .dropdown a,#nav .mega-dropdown a').forEach(function(a){
    a.addEventListener('click', function(){ closeDesktopDropdowns(); });
  });

  document.querySelectorAll('.drawer-nav,.drawer-cta').forEach(function(el){
    el.addEventListener('click', function(){ setTimeout(closeDrawer,80); });
  });
  var service=document.getElementById('f_service');
  if(service){
    service.addEventListener('change', updateIntakeForm);
    var params = new URLSearchParams(window.location.search || '');
    var serviceParam = params.get('service');
    if(serviceParam){
      var option = null;
      for(var i=0; i<service.options.length; i++){
        if(service.options[i].value === serviceParam){
          option = service.options[i];
          break;
        }
      }
      if(option) service.value = serviceParam;
    }
  }
  var med=document.getElementById('f_dml_mediation');
  if(med) med.addEventListener('change', updateIntakeForm);
  updateIntakeForm();
});
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){
    closeDesktopDropdowns();
    closeDrawer();
  }
});
document.addEventListener('click', function(e){
  if(!e.target.closest('#nav')) closeDesktopDropdowns();
  var q=e.target.closest('.faq-q');
  if(q){
    var item=q.closest('.faq-item');
    if(item){
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
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


function buildSignalCheckResult(issue, role, flags, score){
  var maps = {
    ime: {title:'IME / defense medical report pathway', service:'IME Report Deconstruction', href:'/ime-deconstruction/', intake:'ime', summary:'The strongest fit is physician-authored IME or opposing medical report analysis. The review should focus on unsupported assertions, omitted medical facts, internal contradictions, and deposition-ready medical questions.'},
    viability: {title:'Case viability and causation pathway', service:'Case Viability Screening (CVA™)', href:'/case-viability-screening/', intake:'cva', summary:'The strongest fit is pre-expert physician review of whether the medical record supports the case theory, causation pathway, and documentation threshold before expert spend or mediation strategy.'},
    payer: {title:'Payer criteria / medical necessity pathway', service:'UR Process Audit or denial logic review', href:'/ur-process-audit/', intake:'urpa', summary:'The strongest fit is payer-style criteria analysis: whether InterQual, MCG, plan language, or medical necessity thresholds were applied in a documentarily defensible and individualized way.'},
    defense: {title:'Defense-side medical exposure pathway', service:'Defense Medical Lens™ / Medical Reserve Analysis', href:'/defense-carriers/', intake:'dml-def', summary:'The strongest fit is defense-side physician review of medical exposure, reserve implications, plaintiff expert vulnerabilities, and the likely pressure points in the record.'},
    charges: {title:'Medical charges / special damages pathway', service:'Medical Charge & Necessity Review', href:'/medical-charge-necessity-review/', intake:'mcnr', summary:'The strongest fit is physician review of whether the claimed medical specials are clinically necessary, related to the injury, coded consistently, and reasonable in amount — producing a defensible reasonable-value range for demand, reserve, or settlement.'},
    compliance: {title:'Compliance and review-process pathway', service:'MHPAEA or Clinical Denial Pattern Audit', href:'/compliance-consulting/', intake:'compliance', summary:'The strongest fit is pattern-level review of criteria design, denial consistency, medical necessity standards, or parity/compliance exposure rather than single-case IME analysis.'},
    'not-sure': {title:'Mixed medical-review routing pathway', service:'Scope call / no-PHI inquiry', href:'/intake/', intake:'not-sure', summary:'The issue appears mixed. A no-PHI scope inquiry is appropriate so Medisprudence can route it to IME analysis, CVA™, payer criteria review, defense exposure, or compliance review.'}
  };
  var r = maps[issue] || maps['not-sure'];
  if(issue === 'charges' && role === 'defense'){ r = {title:'Billed-charge exposure pathway', service:'Medical Charge & Necessity Review — Billed-Charge Exposure', href:'/medical-charge-necessity-review/', intake:'mcnr-def', summary:'The strongest fit is a defense-side billed-charge exposure review: identifying unnecessary, unrelated, inflated, miscoded, or duplicative charges and a documented reasonable-value range before reserve and settlement posture is set.'}; }
  var priority = score >= 6 ? 'High-priority review signal' : (score >= 3 ? 'Moderate review signal' : 'Low-to-moderate review signal');
  var why = [];
  if(flags.indexOf('contradiction') !== -1) why.push('<strong>Contradiction signal</strong> Report language may conflict with treating findings or source records.');
  if(flags.indexOf('omission') !== -1) why.push('<strong>Omission signal</strong> Material imaging, exam findings, labs, or chronology may need line-by-line physician review.');
  if(flags.indexOf('criteria') !== -1) why.push('<strong>Criteria signal</strong> Medical necessity standards or payer criteria may be central to the analysis.');
  if(flags.indexOf('causation') !== -1) why.push('<strong>Causation signal</strong> Pre-existing disease, gaps, or alternative explanations may affect record defensibility.');
  if(flags.indexOf('expert') !== -1) why.push('<strong>Strategy-timing signal</strong> Expert selection, demand, mediation, or disclosure decisions may depend on medical support.');
  if(flags.indexOf('reserve') !== -1) why.push('<strong>Exposure signal</strong> Reserve or settlement posture may require physician-level medical interpretation.');
  if(flags.indexOf('pattern') !== -1) why.push('<strong>Pattern signal</strong> Multiple denials or reviews may require systems-level defensibility analysis.');
  if(flags.indexOf('deadline') !== -1) why.push('<strong>Deadline signal</strong> Near-term litigation timing may justify accelerated scoping.');
  if(flags.indexOf('charges-major') !== -1) why.push('<strong>Special-damages signal</strong> The value of the claimed medical bills may be central to demand, reserve, or settlement posture.');
  if(flags.indexOf('charges-inflated') !== -1) why.push('<strong>Charge-reasonableness signal</strong> Billed amounts may warrant necessity, coding, and reasonableness review against available benchmark references.');
  if(flags.indexOf('lien') !== -1) why.push('<strong>Provider-billing signal</strong> Lien or high-volume provider billing may require line-item necessity and coding scrutiny.');
  if(!why.length) why.push('<strong>Initial routing only</strong> Few high-risk flags were selected, but a no-PHI inquiry can still clarify whether review is warranted.');
  var intakeHref = '/intake/?service=' + encodeURIComponent(r.intake);
  return '<div class="signal-priority">' + priority + '</div>' +
    '<h2>' + r.title + '</h2>' +
    '<p>' + r.summary + '</p>' +
    '<ul class="signal-route-list">' +
    '<li><strong>Recommended service</strong>' + r.service + '</li>' +
    why.slice(0,4).map(function(item){ return '<li>' + item + '</li>'; }).join('') +
    '</ul>' +
    '<div class="signal-result-actions"><a class="btn btn-primary" href="' + intakeHref + '">Submit No-PHI Inquiry →</a><a class="btn btn-ghost" href="' + r.href + '">View Relevant Service</a></div>' +
    '<div class="signal-caution">Preliminary routing only. Not legal advice, medical advice, expert testimony, or a record review.</div>';
}

document.addEventListener('submit', function(e){
  var form = e.target && e.target.closest ? e.target.closest('#signal-check-form') : null;
  if(!form) return;
  e.preventDefault();
  var issue = (document.getElementById('signal-issue') || {}).value || 'not-sure';
  var role = (document.getElementById('signal-role') || {}).value || '';
  var phi = document.getElementById('signal-phi');
  if(!role || !issue || !phi || !phi.checked){ form.reportValidity && form.reportValidity(); return; }
  var boxes = Array.from(form.querySelectorAll('input[type="checkbox"][data-weight]:checked'));
  var flags = boxes.map(function(b){ return b.value; });
  var score = boxes.reduce(function(sum,b){ return sum + (parseInt(b.getAttribute('data-weight') || '0',10) || 0); }, 0);
  if(issue === 'not-sure') score += 1;
  if(role === 'defense' && (issue === 'defense' || flags.indexOf('reserve') !== -1)) score += 1;
  if(role === 'erisa' && (issue === 'payer' || issue === 'compliance' || flags.indexOf('criteria') !== -1 || flags.indexOf('pattern') !== -1)) score += 1;
  var result = document.getElementById('signal-result');
  if(result){ result.innerHTML = buildSignalCheckResult(issue, role, flags, score); }
});

/* Field Guide — PDF request form (matches intake Formspree pattern) */
function fgHandlePdf(e){
  if(!window.fetch) return true;
  e.preventDefault();
  if(window._fgPdfSubmitting) return false;
  var form = document.getElementById('fgPdfForm');
  var msg = document.getElementById('fgFormMsg');
  var btn = form ? form.querySelector('.fg-pdf-submit') : null;
  if(!form){ return false; }
  if(form.reportValidity && !form.reportValidity()) return false;
  window._fgPdfSubmitting = true;
  var original = btn ? btn.textContent : '';
  if(btn){ btn.disabled = true; btn.textContent = 'Submitting…'; }
  if(msg){ msg.textContent = ''; msg.className = 'fg-form-msg'; }
  var data = new FormData(form);
  fetch(form.getAttribute('action') || 'https://formspree.io/f/xnjwkapj', {
    method: form.getAttribute('method') || 'POST', body: data, headers: { 'Accept': 'application/json' }
  }).then(function(r){
    if(r.ok){
      form.reset();
      if(msg){ msg.textContent = 'Thank you — your PDF request was received. We manually review requests and will send the field guide by email. If you need it urgently, email contact@medisprudence.com.'; msg.className = 'fg-form-msg ok'; }
    }else{ throw new Error('failed'); }
  }).catch(function(){
    if(msg){ msg.textContent = 'Submission failed. Please try again, or email contact@medisprudence.com (no PHI).'; msg.className = 'fg-form-msg err'; }
  }).finally(function(){
    window._fgPdfSubmitting = false;
    if(btn){ btn.disabled = false; btn.textContent = original || 'Request PDF version →'; }
  });
  return false;
}
