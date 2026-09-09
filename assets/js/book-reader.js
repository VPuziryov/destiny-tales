
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-book-reader]');
  if (!root) return;
  const img = root.querySelector('[data-book-page]');
  const prev = root.querySelector('[data-book-prev]');
  const next = root.querySelector('[data-book-next]');
  const curEl = root.querySelector('[data-book-current]');
  const total = Number(root.dataset.bookTotal || 1);
  const base = root.dataset.bookBase;
  const slug = root.dataset.bookSlug || 'book';
  const mid = document.querySelector('[data-book-mid-actions]');
  const end = document.querySelector('[data-book-end]');
  const starts = document.querySelectorAll('[data-book-start]');
  let current = 1, sx = 0, sy = 0;
  const fired = new Set();

  const srcFor = n => `${base}/page-${String(n).padStart(2,'0')}.webp`;
  function track(name, data={}) {
    if (typeof fbq === 'function') fbq('trackCustom', name, Object.assign({book:slug}, data));
  }
  function milestone() {
    const pct = current / total;
    [['Book_VN_25',.25],['Book_VN_50',.50],['Book_VN_75',.75]].forEach(([n,t])=>{
      if (pct >= t && !fired.has(n)) { fired.add(n); track(n,{page:current,total}); }
    });
    if (current === total && !fired.has('Book_VN_Finished')) {
      fired.add('Book_VN_Finished'); track('Book_VN_Finished',{page:current,total});
    }
  }
  function render(scroll=false) {
    img.src = srcFor(current);
    img.alt = `Trang ${current} / ${total}`;
    curEl.textContent = current;
    prev.disabled = current <= 1;
    next.disabled = current >= total;
    if (mid) mid.classList.toggle('is-visible', current >= 6);
    if (end) end.classList.toggle('is-visible', current === total);
    milestone();
    [current+1,current-1].filter(n=>n>=1&&n<=total).forEach(n=>{ const p=new Image(); p.src=srcFor(n); });
    if (scroll) root.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function go(n, scroll=false){ current=Math.max(1,Math.min(total,n)); render(scroll); }
  prev.addEventListener('click',()=>go(current-1));
  next.addEventListener('click',()=>go(current+1));
  starts.forEach(b=>b.addEventListener('click',()=>go(1,true)));

  const toc = document.querySelector('[data-book-toc]');
  const tocToggle = document.querySelector('[data-book-toc-toggle]');
  const tocClose = document.querySelector('[data-book-toc-close]');
  const tocItems = document.querySelectorAll('[data-book-goto]');

  function setToc(open) {
    if (!toc) return;
    toc.hidden = !open;
    if (tocToggle) tocToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (tocToggle) tocToggle.addEventListener('click', () => setToc(toc ? toc.hidden : false));
  if (tocClose) tocClose.addEventListener('click', () => setToc(false));
  tocItems.forEach(item => item.addEventListener('click', () => {
    const page = Number(item.dataset.bookGoto || 1);
    setToc(false);
    go(page, true);
  }));

  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft') go(current-1);
    if(e.key==='ArrowRight') go(current+1);
  });
  const stage=root.querySelector('.book-stage');
  stage.addEventListener('touchstart',e=>{ const t=e.changedTouches[0]; sx=t.clientX; sy=t.clientY; },{passive:true});
  stage.addEventListener('touchend',e=>{
    const t=e.changedTouches[0], dx=t.clientX-sx, dy=t.clientY-sy;
    if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)){ dx<0?go(current+1):go(current-1); return; }
    if(Math.abs(dx)<12 && Math.abs(dy)<12){
      const r=stage.getBoundingClientRect(), x=t.clientX-r.left;
      if(x<r.width/3) go(current-1); else if(x>r.width*2/3) go(current+1);
    }
  },{passive:true});
  track('Book_VN_Open',{total});
  render();
});
