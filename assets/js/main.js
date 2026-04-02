/* ===== LANGUAGE AUTO-DETECT ===== */

(function () {

const savedLang = localStorage.getItem('dt_lang');
if (savedLang) return;

const lang = (navigator.language || '').toLowerCase();

let targetLang = 'en';

// Вьетнам
if (lang.startsWith('vi')) {
targetLang = 'vn';
}

// бывший СССР
const ruLangs = ['ru', 'uk', 'be', 'kk', 'uz', 'ky', 'tg', 'hy', 'az'];

if (ruLangs.some(l => lang.startsWith(l))) {
targetLang = 'ru';
}

const path = window.location.pathname;

// уже на нужном языке — ничего не делаем
if (path.startsWith(`/${targetLang}/`)) return;

let page = '';

if (targetLang !== 'vn' && path.includes('library')) {
page = 'library.html';
}

window.location.replace(`/${targetLang}/${page}`);

})();


/* ===== CHECKOUT TRACKING ===== */
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


/* ===== FRAGMENT TOGGLE ===== */
document.addEventListener('click', function (e) {

const button = e.target.closest('.fragment-toggle');
if (!button) return;

const content = button.nextElementSibling;
if (!content) return;

content.style.display = (content.style.display === 'block') ? 'none' : 'block';

});
(function () {

  if (typeof fbq !== 'function') return;

  const path = window.location.pathname;

  // только библиотека
  if (!path.includes('library')) return;

  setTimeout(function () {
    fbq('trackCustom', 'ContentView_7s_Library');
    console.log('ContentView_7s_Library fired');
  }, 7000);

})();