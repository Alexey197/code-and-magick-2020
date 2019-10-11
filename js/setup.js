'use strict';

(function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var setup = document.querySelector('.setup');

  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');


  var WIZARDS_QUANTITY = 4;
  var wizardParams = {
    NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };


  // Создание существа

  var getCreature = function () {
    return {
      name: window.getRandomArrElement(wizardParams.NAME) + ' ' + window.getRandomArrElement(wizardParams.SURNAME),
      coatColor: window.getRandomArrElement(wizardParams.COAT),
      eyesColor: window.getRandomArrElement(wizardParams.EYES)
    };
  };

  // Создание массива существ

  var getCreatures = function (arrLength) {
    var creatures = [];
    for (var i = 0; i < arrLength; i++) {
      creatures.push(getCreature());
    }
    return creatures;
  };

  // Клонирование 1-го элемента волшебника

  var getWizard = function (creatures) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = creatures.name;
    wizardElement.querySelector('.wizard-coat').style.fill = creatures.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = creatures.eyesColor;
    return wizardElement;
  };

  // Армия клонов())

  var getWizards = function (creatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < creatures.length; i++) {
      fragment.appendChild(getWizard(creatures[i]));
    }
    return fragment;
  };

  window.colorize(wizardCoat, wizardParams.COAT);
  window.colorize(wizardEyes, wizardParams.EYES);
  window.colorize(wizardFireball, wizardParams.FIREBALL);

  // Инициализация

  var initApp = function () {
    similarListElement.appendChild(getWizards(getCreatures(WIZARDS_QUANTITY)));
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  initApp();
})();

