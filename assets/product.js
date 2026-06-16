/* Product page behaviors: purchase options, quantity, gallery, tabs */

(function () {
  'use strict';

  /* purchase option radios */
  document.querySelectorAll('[data-purchase-option]').forEach(function (option) {
    var input = option.querySelector('input');
    if (!input) return;
    input.addEventListener('change', function () {
      document.querySelectorAll('[data-purchase-option]').forEach(function (o) {
        o.classList.toggle('is-selected', o.querySelector('input').checked);
      });
      var label = document.querySelector('[data-atc-label]');
      if (label && input.dataset.label) {
        label.textContent = input.dataset.label + ' - ' + (input.dataset.price || '');
      }
    });
  });

  /* quantity stepper */
  document.querySelectorAll('[data-product-qty]').forEach(function (qty) {
    var input = qty.querySelector('input');
    var minus = qty.querySelector('[data-qty-minus]');
    var plus = qty.querySelector('[data-qty-plus]');
    if (minus) minus.addEventListener('click', function () {
      input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
    });
    if (plus) plus.addEventListener('click', function () {
      input.value = parseInt(input.value || '1', 10) + 1;
    });
  });

  /* gallery thumbs */
  var mainImg = document.querySelector('[data-gallery-image]');
  document.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (mainImg) mainImg.src = thumb.getAttribute('data-gallery-thumb');
      document.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
        t.classList.toggle('is-active', t === thumb);
      });
    });
  });

  /* tabs */
  document.querySelectorAll('[data-product-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-product-tab');
      document.querySelectorAll('[data-product-tab]').forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
      });
      document.querySelectorAll('.product-tab-panel').forEach(function (p) {
        p.classList.toggle('is-active', p.id === target);
      });
    });
  });
})();
