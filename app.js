// Tab Navigation con nav integrata nella right-card
class TabNavigation {
  constructor() {
    this.currentTab = this.currentTabFromHash() || 'about';
    this.tabContent = document.getElementById('tab-content');
    this.navButtons = document.querySelectorAll('.tab-btn');
    this.init();
  }

  currentTabFromHash() {
    const h = (location.hash || '').replace('#', '').toLowerCase();
    return ['about','resume','projects'].includes(h) ? h : null;
  }

  waitForModules(cb) {
    const ready = !!(window.AboutContent && window.ResumeContent && window.ProjectsContent);
    if (ready) return cb();
    const iv = setInterval(() => {
      if (window.AboutContent && window.ResumeContent && window.ProjectsContent) {
        clearInterval(iv); cb();
      }
    }, 50);
    setTimeout(() => clearInterval(iv), 5000);
  }

  init() {
    // Bind nav (card tabs)
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabName = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tabName);
        history.replaceState(null, '', `#${tabName}`);
      });
    });

    // Primo render
    this.waitForModules(() => {
      this.updateActive(this.currentTab);
      this.load(this.currentTab);
    });

    // Cambi hash manuali
    window.addEventListener('hashchange', () => {
      const next = this.currentTabFromHash();
      if (next) this.switchTab(next);
    });
  }

  updateActive(tabName) {
    this.navButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === tabName;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  switchTab(tabName) {
    if (tabName === this.currentTab && this.tabContent.innerHTML.trim()) return;
    this.updateActive(tabName);
    this.load(tabName);
    this.currentTab = tabName;
    // niente scrollIntoView -> mantiene l’allineamento con la sidebar
  }

  load(tabName) {
    let html = 'Loading...';
    if (tabName === 'about' && window.AboutContent) html = window.AboutContent.render();
    if (tabName === 'resume' && window.ResumeContent) html = window.ResumeContent.render();
    if (tabName === 'projects' && window.ProjectsContent) html = window.ProjectsContent.render();
    this.tabContent.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => new TabNavigation());

/* Scrollbar auto-hide durante wheel/touch */
let hideT;
window.addEventListener('scroll', () => {
  document.body.classList.add('scrolling');
  clearTimeout(hideT);
  hideT = setTimeout(() => document.body.classList.remove('scrolling'), 400);
}, { passive: true });


// ===== Custom Cursor con scia =====
function initCustomCursor() {
  // non attivare su touch
  if (matchMedia('(hover: none), (pointer: coarse)').matches) return;

  // crea elementi
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  const trailWrap = document.createElement('div');
  trailWrap.className = 'cursor-trail';

  const TRAIL_COUNT = 12;
  const FOLLOW_BASE = 0.30;
  const FOLLOW_DECAY = 0.03;
  const MIN_FOLLOW = 0.1;
  const trailDots = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const d = document.createElement('div');
    d.className = 'trail-dot';
    trailWrap.appendChild(d);
    trailDots.push({ el: d, x: window.innerWidth/2, y: window.innerHeight/2 });
  }

  document.body.appendChild(trailWrap);
  document.body.appendChild(dot);

  // posizione target del puntatore
  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let dotX = tx;
  let dotY = ty;

  // aggiorna target sui movimenti
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;

    // evidenziazione su link e bottoni
    const t = e.target;
    const isInteractive = t.closest('a, button, [role="button"], .tab-btn, .project-card a');
    document.body.dataset.cursor = isInteractive ? 'link' : '';
  }, { passive: true });

  // animazione: lerp dolce
  const lerp = (a, b, f) => a + (b - a) * f;

  function raf() {
    dotX = lerp(dotX, tx, 0.28);
    dotY = lerp(dotY, ty, 0.28);

    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';

    // scia: ogni dot segue il precedente
    let px = dotX;
    let py = dotY;
    const trailOpacity = document.body.dataset.cursor === 'link' ? 0.65 : 0.38;
    trailDots.forEach((d, i) => {
      const follow = Math.max(MIN_FOLLOW, FOLLOW_BASE - (i * FOLLOW_DECAY));
      d.x = lerp(d.x, px, follow);
      d.y = lerp(d.y, py, follow);
      d.el.style.left = d.x + 'px';
      d.el.style.top  = d.y + 'px';
      const scale = 1 - (i / (TRAIL_COUNT + 1));
      d.el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      d.el.style.opacity = (trailOpacity * scale).toFixed(3);
      px = d.x; py = d.y;
    });

    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // nascondi/mostra su uscita finestra
  const hide = () => { dot.style.opacity = '0'; trailWrap.style.opacity = '0'; };
  const show = () => { dot.style.opacity = '1'; trailWrap.style.opacity = '1'; };
  window.addEventListener('mouseleave', hide);
  window.addEventListener('mouseenter', show);
}

// chiamata una sola volta dopo il bootstrap dell’app
initCustomCursor();
