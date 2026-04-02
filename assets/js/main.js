/* ===== LANGUAGE SAVE ===== */
document.addEventListener('click', function (e) {
const lang = e.target.closest('[data-lang]');
if (lang) {
localStorage.setItem('dt_lang', lang.dataset.lang);
}
});

/* ===== FB PIXEL (7 sec on library) ===== */
document.addEventListener('DOMContentLoaded', function () {
if (typeof fbq !== 'function') return;

if (window.location.pathname.includes('library')) {
setTimeout(function () {
fbq('trackCustom', 'ContentView_7s_Library');
}, 7000);
}
});

/* ===== CHECKOUT TRACKING ===== */
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

/* ===== FRAGMENT TOGGLE (ВСЕГДА РАБОТАЕТ) ===== */
document.addEventListener('click', function (e) {

const button = e.target.closest('.fragment-toggle');
if (!button) return;

const content = button.nextElementSibling;
if (!content) return;

const isOpen = content.style.display === 'block';

content.style.display = isOpen ? 'none' : 'block';

});
