/* ============================================================
   typewriter.js  —  Letter-by-letter reveal with keyword highlights
   ============================================================ */

window.Typewriter = (function () {
  'use strict';

  var MESSAGE =
    'Yo y Allah siempre estamos a tu lado, confiando en ti y apoyándote siempre. ' +
    'Eres una guerrera imparable, la luz que ilumina cada sueño. ' +
    'Confía en tu fuerza; el universo entero te respalda y estoy eternamente orgulloso de ti. 🌟';

  /* Words that get a pink highlight */
  var HIGHLIGHTS = ['Allah', 'confío', 'apoyo', 'guerrera', 'luz', 'confía', 'universo', 'orgulloso'];

  var container;
  var chars    = [];        // DOM <span> elements
  var idx      = 0;
  var started  = false;

  /* ============ PUBLIC ============ */

  function init(el) {
    container = el;
    buildDOM();
  }

  function start() {
    if (started) return;
    started = true;
    revealNext();
  }

  /* ============ INTERNAL ============ */

  function buildDOM() {
    var cursor = container.querySelector('.tw-cursor');

    /* Build a Set of character indices that belong to highlighted words */
    var hlSet = {};
    HIGHLIGHTS.forEach(function (word) {
      var from = 0;
      while (true) {
        var pos = MESSAGE.indexOf(word, from);
        if (pos === -1) break;
        for (var j = pos; j < pos + word.length; j++) hlSet[j] = true;
        from = pos + 1;
      }
    });

    /* Create one <span class="char"> per character */
    for (var i = 0; i < MESSAGE.length; i++) {
      var span = document.createElement('span');
      span.className = 'char' + (hlSet[i] ? ' highlight' : '');
      span.textContent = MESSAGE[i];
      chars.push(span);
      container.insertBefore(span, cursor);
    }
  }

  function revealNext() {
    if (idx >= chars.length) return;

    chars[idx].classList.add('visible');
    idx++;

    var ch    = MESSAGE[idx - 1];
    var delay = (ch === '.' || ch === ',') ? 190
              : ch === ' '                ? 52
              :                             42;

    setTimeout(revealNext, delay);
  }

  return { init: init, start: start };
})();
