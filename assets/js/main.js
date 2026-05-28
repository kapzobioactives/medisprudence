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
  var genericServices = ['dva','erb','pec','tga','pea','mra','urpa','bds'];
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
