/* =============================================
   SURYA ANISH K — script.js
   Features: multi-page, filter, blog reader,
             blog tabs, hamburger, contact form
============================================= */

const PAGES = ['home','projects','education','achievements','blog','contact'];

/* ── PAGE NAVIGATION ── */
function showPage(id) {
  if (!PAGES.includes(id)) id = 'home';
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) { el.classList.remove('active'); el.scrollTop = 0; }
  });
  const t = document.getElementById('page-' + id);
  if (t) t.classList.add('active');
  document.querySelectorAll('nav a[data-page]').forEach(a =>
    a.classList.toggle('nav-active', a.dataset.page === id)
  );
  closeMobileMenu();
  try { history.replaceState(null, '', '#' + id); } catch (_) {}
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#','').toLowerCase();
  showPage(PAGES.includes(hash) ? hash : 'home');
  matchUnderlines();
  initHomeAnimations();
  initProjectFilter();
  initBlogTabs();
  initHamburger();
  initContactForm();
  window.addEventListener('resize', matchUnderlines);
});

/* ── UNDERLINE: handled by CSS (section-header uses display:table-caption trick) ── */
function matchUnderlines() {}

/* ── HOME ANIMATIONS ── */
function initHomeAnimations() {
  const content = document.querySelector('.content');
  const hero    = document.getElementById('heroImg');
  const right   = document.querySelector('.right-section');
  if (content) { content.style.opacity='0'; setTimeout(() => { content.style.transition='opacity .9s'; content.style.opacity='1'; }, 100); }
  if (hero)    { hero.style.opacity='0';    setTimeout(() => { hero.style.transition='opacity .9s';    hero.style.opacity='1';    }, 280); }
  if (right && hero) {
    right.addEventListener('mousemove', e => {
      const r = right.getBoundingClientRect();
      const rx = (e.clientY - r.top - r.height/2) / 50;
      const ry = (r.width/2 - (e.clientX - r.left)) / 50;
      hero.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    right.addEventListener('mouseleave', () => {
      hero.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });
  }
}

/* ── PROJECT FILTER + PAGINATION ── */
const PROJECTS_PER_PAGE = 9;

function initProjectFilter() {
  const btns       = document.querySelectorAll('.filter-btn');
  const cards       = Array.from(document.querySelectorAll('.project-card'));
  const paginationEl = document.getElementById('projectsPagination');
  if (!btns.length || !cards.length) return;

  let currentFilter = 'all';
  let currentPage    = 1;

  function getFilteredCards() {
    return cards.filter(c => currentFilter === 'all' || c.dataset.category === currentFilter);
  }

  function renderPage() {
    const filtered   = getFilteredCards();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PROJECTS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    const end   = start + PROJECTS_PER_PAGE;
    const pageCards = filtered.slice(start, end);

    cards.forEach(c => {
      const show = pageCards.includes(c);
      c.classList.toggle('hide', !show);
      if (show) c.style.animation = 'fadeIn .4s ease forwards';
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    const makeBtn = (label, page, opts = {}) => {
      const b = document.createElement('button');
      b.className = 'page-btn' + (opts.active ? ' active' : '');
      b.textContent = label;
      b.disabled = !!opts.disabled;
      b.addEventListener('click', () => {
        currentPage = page;
        renderPage();
        document.querySelector('.portfolio-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return b;
    };

    paginationEl.appendChild(makeBtn('‹ Prev', currentPage - 1, { disabled: currentPage === 1 }));
    for (let p = 1; p <= totalPages; p++) {
      paginationEl.appendChild(makeBtn(String(p), p, { active: p === currentPage }));
    }
    paginationEl.appendChild(makeBtn('Next ›', currentPage + 1, { disabled: currentPage === totalPages }));
  }

  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    currentPage    = 1;
    renderPage();
  }));

  renderPage();
}

/* ── BLOG TABS ── */
function initBlogTabs() {
  document.querySelectorAll('.blog-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.blog-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.blog-posts').forEach(p => p.classList.add('hidden'));
      const target = document.getElementById(tab.dataset.blog + '-posts');
      if (target) target.classList.remove('hidden');
    });
  });
}

/* ── HAMBURGER ── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('mobile-open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) closeMobileMenu();
  });
}
function closeMobileMenu() {
  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('hamburger');
  nav?.classList.remove('mobile-open');
  if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
}

/* ── BLOG READER MODAL ──
   Called from each blog card's onclick attribute.
   Args: title, tag, date, heroImg, externalUrl, bodyText  */
function openBlogReader(title, tag, date, heroImg, externalUrl, bodyText) {
  document.getElementById('readerTag').textContent   = tag;
  document.getElementById('readerTitle').textContent = title;
  document.getElementById('readerDate').textContent  = date;
  document.getElementById('readerExternal').href     = externalUrl;

  // Build reader body
  const body = document.getElementById('readerBody');
  body.innerHTML = `
    <img src="${heroImg}" alt="${title}" class="reader-hero-img" onerror="this.style.display='none'">
    <div class="reader-content">${formatBlogText(bodyText)}</div>
  `;

  const overlay = document.getElementById('blogReaderOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Close on backdrop click
  overlay.onclick = e => { if (e.target === overlay) closeBlogReader(); };
}

function closeBlogReader() {
  document.getElementById('blogReaderOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Convert plain text content to simple HTML paragraphs
function formatBlogText(text) {
  return text
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => `<p>${line}</p>`)
    .join('');
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBlogReader();
});

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Label highlight on focus
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('focus', function() {
      this.closest('.form-group')?.querySelector('label')?.style.setProperty('color','#00d4ff');
    });
    el.addEventListener('blur', function() {
      this.closest('.form-group')?.querySelector('label')?.style.setProperty('color','#fff');
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = form.querySelector('.submit-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await res.json();
      if (data.success) {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#00ff88,#00d4ff)';
        form.reset();
      } else throw new Error(data.message);
    } catch {
      btn.innerHTML = '<i class="fas fa-times"></i> Failed — Try Again';
      btn.style.background = 'linear-gradient(135deg,#ff4757,#ff6348)';
    }
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3500);
  });
}
