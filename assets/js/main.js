// ===== SET LANG FROM URL =====
(function () {

  const path = window.location.pathname;

  if (path.startsWith('/ru/')) {
    localStorage.setItem('dt_lang', 'ru');
  }

  if (path.startsWith('/en/')) {
    localStorage.setItem('dt_lang', 'en');
  }

  if (path.startsWith('/vn/')) {
    localStorage.setItem('dt_lang', 'vn');
  }

})();


// ===== CHECKOUT TRACKING =====
document.addEventListener('click', function (e) {

  if (typeof fbq !== 'function') return;

  const btn = e.target.closest('[data-checkout]');
  if (!btn) return;

  const product = btn.dataset.checkout;

  // ===== CUSTOM EVENTS =====
  fbq('trackCustom', `Checkout_${product.charAt(0).toUpperCase() + product.slice(1)}`);

  // ===== STANDARD EVENT =====
  fbq('track', 'InitiateCheckout', {
    content_name: product
  });

});


// ===== FRAGMENT TOGGLE =====
document.addEventListener('click', function (e) {

  const button = e.target.closest('.fragment-toggle');
  if (!button) return;

  const content = button.nextElementSibling;
  if (!content) return;

  content.style.display = (content.style.display === 'block') ? 'none' : 'block';

});


// ===== LIBRARY 7s VIEW TRACK =====
(function () {

  if (typeof fbq !== 'function') return;

  const path = window.location.pathname;

  if (!path.includes('library')) return;

  setTimeout(function () {
    fbq('trackCustom', 'ContentView_7s_Library');
    console.log('ContentView_7s_Library fired');
  }, 7000);

  // ===== VN 7s TRACK =====
(function () {

  if (typeof fbq !== 'function') return;

  const path = window.location.pathname;

  // только VN страницы
  if (!path.includes('/vn/')) return;

  setTimeout(function () {
    fbq('trackCustom', 'ContentView_7s_VNBook');
    console.log('ContentView_7s_VNBook fired');
  }, 7000);

})();

})();


// ===== LANGUAGE SAVE (click) =====
document.addEventListener('click', function (e) {

  const link = e.target.closest('[data-lang]');
  if (!link) return;

  const lang = link.dataset.lang;
  if (!lang) return;

  localStorage.setItem('dt_lang', lang);

});