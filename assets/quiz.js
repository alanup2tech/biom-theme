/* Multi-step quiz behavior */

(function () {
  'use strict';

  var quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;

  var total = parseInt(quiz.getAttribute('data-steps'), 10) || 1;
  var progress = quiz.querySelector('[data-quiz-progress]');
  var counter = quiz.querySelector('[data-quiz-current]');
  var current = 1;

  function show(step) {
    quiz.querySelectorAll('[data-quiz-step]').forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-quiz-step') === String(step));
    });
    if (typeof step === 'number') {
      current = step;
      if (counter) counter.textContent = step;
      if (progress) progress.style.width = (step / total) * 100 + '%';
    } else if (progress) {
      if (counter) counter.textContent = total;
      progress.style.width = '100%';
    }
  }

  quiz.addEventListener('click', function (e) {
    var option = e.target.closest('.quiz__option');
    if (option) {
      var group = option.closest('.quiz__options');
      if (group.getAttribute('data-multi') !== 'true') {
        group.querySelectorAll('.quiz__option').forEach(function (o) {
          if (o !== option) o.classList.remove('is-selected');
        });
      }
      option.classList.toggle('is-selected');
      return;
    }

    if (e.target.closest('[data-quiz-next]')) {
      show(current < total ? current + 1 : 'result');
    }

    if (e.target.closest('[data-quiz-back]')) {
      show(Math.max(1, current - 1));
    }
  });
})();
