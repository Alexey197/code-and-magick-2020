'use strict';

(function () {
  window.util = {
    KeyCode: {
      Esc: 27,
      Enter: 13,
      isEscEvent: function (evt, action) {
        if (evt.keyCode === window.util.KeyCode.Esc) {
          action();
        }
      },
      isEnterEvent: function (evt, action) {
        if (evt.KeyCode === window.util.KeyCode.Enter) {
          action();
        }
      }
    },
    setupStartPosition: {
      X: '50%',
      Y: '80px'
    }
  };
})();
