'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var inputName = userDialog.querySelector('.setup-user-name');

  var userDialogStartCoords = {
    X: '50%',
    Y: '86px'
  };

  var resetUserDialogCoords = function () {
    userDialog.style.left = userDialogStartCoords.X;
    userDialog.style.top = userDialogStartCoords.Y;
  };

  var setupOpenClickHandler = function () {
    openSetupWindow();
  };

  var setupCloseClickHandler = function () {
    closeSetupWindow();
  };

  var setupCloseEscPressHandler = function (evt) {
    if (evt.target !== inputName) {
      window.util.isEscEvent(evt, setupCloseClickHandler);
    }
  };

  var setupOpenEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, openSetupWindow);
  };

  var setupCloseEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, setupCloseClickHandler);
  };

  var openSetupWindow = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', setupCloseEscPressHandler);
    setupClose.addEventListener('click', setupCloseClickHandler);
    setupClose.addEventListener('keydown', setupCloseEnterPressHandler);

    window.setup.initialize();

  };

  var closeSetupWindow = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', setupCloseEscPressHandler);
    setupClose.removeEventListener('click', setupCloseClickHandler);
    setupClose.removeEventListener('keydown', setupCloseEnterPressHandler);

    resetUserDialogCoords();

    window.setup.unload();
  };

  setupOpen.addEventListener('click', setupOpenClickHandler);

  setupOpen.addEventListener('keydown', setupOpenEnterPressHandler);
})();
