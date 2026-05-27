// Sonic Velocity Comics — script.js

// ========================
// NAVBAR MOBILE TOGGLE
// ========================
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
  });
});

// ========================
// ISSUE READER MODAL
// ========================
const issueMeta = {
  issue1: { title: 'ISSUE #01 — RUNNING START', pages: 24 },
  issue2: { title: 'ISSUE #02 — FRICTION & FIRE', pages: 30 },
  issue3: { title: 'ISSUE #03 — MILES APART', pages: 28 },
  issue4: { title: 'ISSUE #04 — EMERALD TIDE', pages: 32 },
  issue5: { title: 'ISSUE #05 — SPEED OF DARKNESS', pages: 36 },
  issueS1: { title: 'SPECIAL #1 — AMY\'S DAY OFF', pages: 18 },
};

let currentPage = 1;
let totalPages = 1;

function openReader(issueId) {
  const meta = issueMeta[issueId] || { title: 'READING', pages: 1 };
  currentPage = 1;
  totalPages = meta.pages;

  const modal = document.getElementById('readerModal');
  const titleEl = document.getElementById('readerTitle');
  const pageInfo = document.getElementById('pageInfo');

  if (modal && titleEl && pageInfo) {
    titleEl.textContent = meta.title;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  return false;
}

function closeReader() {
  const modal = document.getElementById('readerModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePageInfo();
    animatePage('right');
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageInfo();
    animatePage('left');
  }
}

function updatePageInfo() {
  const pageInfo = document.getElementById('pageInfo');
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function animatePage(dir) {
  const page = document.getElementById('mockPage');
  if (!page) return;
  page.style.transform = `translateX(${dir === 'right' ? '-20px' : '20px'})`;
  page.style.opacity = '0';
  page.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
  setTimeout(() => {
    page.style.transform = 'translateX(0)';
    page.style.opacity = '1';
  }, 160);
}

// Close modal on backdrop click
document.getElementById('readerModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeReader();
});

// Keyboard nav for reader
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('readerModal');
  if (!modal?.classList.contains('open')) return;
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
  if (e.key === 'Escape') closeReader();
});

// ========================
// ISSUE DOWNLOAD STUB
// ========================
function downloadIssue(issueId) {
  const meta = issueMeta[issueId];
  alert(`📥 Download for ${meta?.title || issueId} would start here.\n\nTo enable downloads, place PDF files in your /downloads/ folder and update the links in issues.html.`);
}

// ========================
// FILTER (ISSUES PAGE)
// ========================
function filterIssues(arc) {
  const cards = document.querySelectorAll('.full-issue-card[data-arc]');
  const btns = document.querySelectorAll('.filter-btn');

  btns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    if (arc === 'all' || card.dataset.arc === arc) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease both';
    } else {
      card.style.display = 'none';
    }
  });
}

// ========================
// FAQ ACCORDION (ABOUT)
// ========================
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(item => item.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

// ========================
// SCROLL REVEAL
// ========================
const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll(
    '.issue-card, .full-issue-card, .char-card, .char-thumb, .team-card, .contact-item'
  );

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });
});

// ========================
// NAVBAR SCROLL STYLE
// ========================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.6)';
  } else {
    nav.style.boxShadow = '0 2px 24px rgba(26,111,212,0.4)';
  }
});

// fadeIn keyframe (for filter)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
