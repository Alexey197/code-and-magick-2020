'use strict';

(function () {

  var setupStartPosition = {
    X: '50%',
    Y: '80px'
  };

  var setup = document.querySelector('.setup');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var dialogHandler = setup.querySelector('.upload');
  var openIcon = document.querySelector('.setup-open-icon');
  var userNameInput = setup.querySelector('.setup-user-name');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var setupReset = function () {
    setup.style.top = setupStartPosition.Y;
    setup.style.left = setupStartPosition.X;
  };

  var getPopupVisible = function () {
    setup.classList.remove('hidden');
  };

  var getPopupInvisible = function () {
    setup.classList.add('hidden');
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
    setupReset();
  };

  var onPopupEnterPressOpen = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var onPopupEnterPressClose = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var openPopup = function () {
    getPopupVisible();
    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', function () {
      setupReset();
      closePopup();
    });
    setupClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
      setupReset();
    });

    setupOpen.removeEventListener('click', openPopup);
    setupOpen.removeEventListener('keydown', onPopupEnterPressOpen);

    window.colorize.addColorStyle(wizardCoat, window.data.COAT);
    window.colorize.addColorStyle(wizardEyes, window.data.EYES);
    window.colorize.addColorStyle(wizardFireball, window.data.FIREBALL);

    userNameInput.addEventListener('invalid', function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    });
  };

  var closePopup = function () {
    getPopupInvisible();
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('click', function () {
      setupReset();
      closePopup();
    });
    setupClose.removeEventListener('keydown', onPopupEnterPressClose);

    setupOpen.addEventListener('click', openPopup);
    setupOpen.addEventListener('keydown', onPopupEnterPressOpen);
  };

  // Перемещение диалогового окна

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var showPopup = function () {
    openIcon.setAttribute('tabindex', '0');
    setupClose.setAttribute('tabindex', '0');
    userNameInput.setAttribute('minlength', '2');
    setupForm.setAttribute('action', 'https://js.dump.academy/code-and-magick');

    window.colorize.addColorStyle(wizardCoat, window.data.COAT);
    window.colorize.addColorStyle(wizardEyes, window.data.EYES);
    window.colorize.addColorStyle(wizardFireball, window.data.FIREBALL);

    setupOpen.addEventListener('click', openPopup);
    setupOpen.addEventListener('keydown', onPopupEnterPressOpen);
  };

  showPopup();

})();

