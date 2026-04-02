document.querySelectorAll('[data-lang]').forEach(link => {
  link.addEventListener('click', () => {
    localStorage.setItem('dt_lang', link.dataset.lang);
  });
});

document.addEventListener('DOMContentLoaded', function () {

  if (typeof fbq !== 'function') return;

  const path = window.location.pathname;

  // 7 секунд на библиотеке
  if (path.includes('library')) {
    setTimeout(function () {
      fbq('trackCustom', 'ContentView_7s_Library');
    }, 7000);
  }

});

document.addEventListener('click', function (e) {

  if (typeof fbq !== 'function') return;

  const btn = e.target.closest('[data-checkout]');
  if (!btn) return;

  const product = btn.dataset.checkout;

  if (product === 'oskolki') {
    fbq('trackCustom', 'Checkout_Oskolki');
  }

  if (product === 'women') {
    fbq('trackCustom', 'Checkout_Women');
  }

});
