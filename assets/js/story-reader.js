(function () {
  const reader = document.querySelector('[data-story-reader]');
  if (!reader) return;

  const img = reader.querySelector('[data-story-page]');
  const prev = reader.querySelector('[data-story-prev]');
  const next = reader.querySelector('[data-story-next]');
  const currentEl = reader.querySelector('[data-story-current]');
  const totalEl = reader.querySelector('[data-story-total]');
  const endBlock = document.querySelector('[data-story-end]');

  const base = reader.dataset.storyBase;
  const total = Number(reader.dataset.storyTotal || 1);
  let current = 1;
  let touchStartX = null;
  let fired50 = false;
  let firedFinished = false;

  const srcFor = (n) => `${base}/story-${String(n).padStart(2, '0')}.webp`;

  function track(eventName, params) {
    if (typeof fbq === 'function') fbq('trackCustom', eventName, params || {});
  }

  function preload(n) {
    if (n < 1 || n > total) return;
    const preloadImg = new Image();
    preloadImg.src = srcFor(n);
  }

  function render() {
    img.src = srcFor(current);
    img.alt = `Страница ${current} из ${total}`;
    currentEl.textContent = current;
    totalEl.textContent = total;
    prev.disabled = current === 1;
    next.disabled = current === total;

    preload(current + 1);
    preload(current - 1);

    if (!fired50 && current >= Math.ceil(total / 2)) {
      fired50 = true;
      track('Story_50', { story: 'samaya-prekrasnaya-skazka' });
    }

    if (current === total) {
      endBlock.classList.add('is-visible');
      if (!firedFinished) {
        firedFinished = true;
        track('Story_Finished', { story: 'samaya-prekrasnaya-skazka' });
      }
    } else {
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

  // Tap left/right third of the page.
  img.addEventListener('click', (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.32) go(-1);
    if (x > rect.width * 0.68) go(1);
  });

  document.addEventListener('click', (e) => {
    const support = e.target.closest('[data-story-support]');
    if (support) track('Story_Support_Click', { story: 'samaya-prekrasnaya-skazka' });

    const facebook = e.target.closest('[data-story-facebook]');
    if (facebook) track('Story_Facebook_Click', { story: 'samaya-prekrasnaya-skazka' });
  });

  track('Story_Open', { story: 'samaya-prekrasnaya-skazka' });
  render();
})();
