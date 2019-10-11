'use strict';

(function () {
  window.getRandomArrElement = function (arr) {
    var arrElement = Math.floor(Math.random() * arr.length);
    return arr[arrElement];
  };

  window.colorize = function (element, arr) {
    element.addEventListener('click', function () {
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = window.getRandomArrElement(arr);
      } else {
        element.style.fill = element.value;
      }
    });
  };
})();
