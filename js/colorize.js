'use strict';

(function () {
  window.colorize = function (element, arr) {
    element.addEventListener('click', function () {
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = window.util.getRandomArrElement(arr);
      } else {
        element.style.fill = window.util.getRandomArrElement(arr);
      }
    });
  };
})();
