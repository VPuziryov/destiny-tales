(function () {
  const reader = document.querySelector('[data-book-reader]');
  if (!reader) return;

  const img = reader.querySelector('[data-book-page]');
  const prev = reader.querySelector('[data-book-prev]');
  const next = reader.querySelector('[data-book-next]');
  const currentEl = reader.querySelector('[data-book-current]');
  const totalEl = reader.querySelector('[data-book-total]');
  const endBlock = document.querySelector('[data-book-end]');

  const base = reader.dataset.bookBase;
  const total = Number(reader.dataset.bookTotal || 1);
  const slug = reader.dataset.bookSlug || 'book';
  let current = 1;
  let touchStartX = null;
  const milestones = new Set();

  const srcFor = (n) => `${base}/page-${String(n).padStart(2, '0')}.webp`;

  function track(eventName, params) {
    if (typeof fbq === 'function') fbq('trackCustom', eventName, params || {});
  }

  function preload(n) {
    if (n < 1 || n > total) return;
    const preloadImg = new Image();
    preloadImg.src = srcFor(n);
  }

  function fireMilestone(percent, eventName) {
    if (milestones.has(percent)) return;
    const threshold = Math.ceil(total * percent / 100);
    if (current >= threshold) {
      milestones.add(percent);
      track(eventName, { book: slug, page: current, total: total });
    }
  }

  function render() {
    img.src = srcFor(current);
    img.alt = `Trang ${current} / ${total}`;
    currentEl.textContent = current;
    totalEl.textContent = total;
    prev.disabled = current === 1;
    next.disabled = current === total;

    preload(current + 1);
    preload(current - 1);

    fireMilestone(25, 'Book_VN_25');
    fireMilestone(50, 'Book_VN_50');
    fireMilestone(75, 'Book_VN_75');

    if (current === total) {
      if (endBlock) endBlock.classList.add('is-visible');
      if (!milestones.has(100)) {
        milestones.add(100);
        track('Book_VN_Finished', { book: slug, page: current, total: total });
      }
    } else if (endBlock) {
      endBlock.classList.remove('is-visible');
    }
  }

  function go(delta) {
    const nextPage = Math.max(1, Math.min(total, current + delta));
    if (nextPage === current) return;
    current = nextPage;
    render();
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  reader.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  reader.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) < 45) return;
    if (dx < 0) go(1);
    else go(-1);
  }, { passive: true });

  img.addEventListener('click', (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.32) go(-1);
    if (x > rect.width * 0.68) go(1);
  });

  track('Book_VN_Open', { book: slug, total: total });
  render();
})();
