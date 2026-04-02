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
if (path.startsWith(/${targetLang}/)) return;

// определяем страницу
let page = '';

if (path.includes('library')) {
page = 'library.html';
}

// редирект
window.location.replace(/${targetLang}/${page});

})();


/* ===== CHECKOUT TRACKING ===== */
document.addEventListener('click', function (e) {

if (typeof fbq !== 'function') return;

const btn = e.target.closest('[data-checkout]');
if (!btn) return;

const product = btn.dataset.checkout;

// ===== CUSTOM EVENTS (оставляем как есть) =====
if (product === 'oskolki') {
fbq('trackCustom', 'Checkout_Oskolki');
}

if (product === 'women') {
fbq('trackCustom', 'Checkout_Women');
}

// ===== STANDARD EVENTS (добавляем) =====
if (product === 'oskolki') {
fbq('track', 'InitiateCheckout', {
content_name: 'oskolki'
});
}

if (product === 'women') {
fbq('track', 'InitiateCheckout', {
content_name: 'women'
});
}

});

/* ===== FRAGMENT TOGGLE ===== */
document.addEventListener('click', function (e) {

const button = e.target.closest('.fragment-toggle');
if (!button) return;

const content = button.nextElementSibling;
if (!content) return;

const isOpen = content.style.display === 'block';

content.style.display = isOpen ? 'none' : 'block';

});
