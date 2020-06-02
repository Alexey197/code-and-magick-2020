'use strict';

(function () {
  var similarListElement = document
    .querySelector('.setup-similar-list');
  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setup = document.querySelector('.setup');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var inputName = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');

  var WIZARDS_QUANTITY = 4;
  var wizardParams = {
    NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var invalidMessages = {
    TOO_SHORT: 'Имя должно состоять не менее чем из 2-х символов',
    TOO_LONG: 'Имя не должно превышать 25-ть символов',
    VALUE_MISSING: 'Поле обязательное для заполнения'
  };

  // var getCreature = function () {
  //   return {
  //     name: window.util.getRandomArrElement(wizardParams.NAME) + ' ' + window.util.getRandomArrElement(wizardParams.SURNAME),
  //     coatColor: window.util.getRandomArrElement(wizardParams.COAT_COLOR),
  //     eyesColor: window.util.getRandomArrElement(wizardParams.EYES_COLOR)
  //   };
  // };
  //
  // var getCreatures = function (amount) {
  //   var creatures = [];
  //   for (var i = 0; i < amount; i++) {
  //     creatures.push(getCreature());
  //   }
  //   return creatures;
  // };

  var getWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // var getWizards = function (creatures) {
  //   var fragment = document.createDocumentFragment();
  //   creatures.forEach(function (item) {
  //     fragment.appendChild(getWizard(item));
  //   });
  //   return fragment;
  // };
  // var wizards = getCreatures(WIZARDS_QUANTITY);
  // var fragment = document.createDocumentFragment();
  // for (var i = 0; i < wizards.length; i++) {
  //   fragment.appendChild(getWizard(wizards[i]));
  // }
  // similarListElement.appendChild(fragment);
  // setup.querySelector('.setup-similar').classList.remove('hidden');
  // window.backend.load

  window.backend.load(function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      var arrElement = Math.floor(Math.random() * wizards.length);
      fragment.appendChild(getWizard(wizards.splice(arrElement, 1)[0]));
    }
    similarListElement.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  });

  var changeCoatColor = function () {
    var coatColor = window.util.getRandomArrElement(wizardParams.COAT_COLOR);
    setupWizardCoat.style.fill = coatColor;
    setup.querySelector('[name="coat-color"]').value = coatColor;
  };

  var changeEyesColor = function () {
    var eyesColor = window.util.getRandomArrElement(wizardParams.EYES_COLOR);
    setupWizardEyes.style.fill = eyesColor;
    setup.querySelector('[name="eyes-color"]').value = eyesColor;
  };

  var changeFireballColor = function () {
    var fireballColor = window.util.getRandomArrElement(wizardParams.FIREBALL_COLOR);
    setupWizardFireball.style.background = fireballColor;
    setup.querySelector('[name="fireball-color"]').value = fireballColor;
  };

  var wizardCoatClickHandler = function () {
    changeCoatColor();
  };

  var wizardEyesClickHandler = function () {
    changeEyesColor();
  };

  var wizardFireballClickHandler = function () {
    changeFireballColor();
  };

  var inputInputHandler = function (evt) {
    var target = evt.target;
    target.setCustomValidity('');
  };

  var inputInvalidHandler = function (evt) {
    var target = evt.target;
    if (target.validity.tooShort) {
      target.setCustomValidity(invalidMessages.TOO_SHORT);
    } else if (target.validity.tooLong) {
      target.setCustomValidity(invalidMessages.TOO_LONG);
    } else if (target.validity.valueMissing) {
      target.setCustomValidity(invalidMessages.VALUE_MISSING);
    } else {
      target.setCustomValidity('');
    }
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
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
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var initializeSetup = function () {
    setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
    setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
    setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
    inputName.addEventListener('invalid', inputInvalidHandler);
    inputName.addEventListener('input', inputInputHandler);
  };

  var unloadSetup = function () {
    setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
    setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
    setupWizardFireball.removeEventListener('click', wizardFireballClickHandler);
    inputName.removeEventListener('invalid', inputInvalidHandler);
    inputName.removeEventListener('input', inputInputHandler);
  };

  // showSetupSimilarList();

  window.setup = {
    initialize: initializeSetup,
    unload: unloadSetup
  };
})();
