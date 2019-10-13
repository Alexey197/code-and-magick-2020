'use strict';

(function () {

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Создание существа

  var getCreature = function () {
    return {
      name: window.util.getRandomArrElement(window.data.NAME) + ' ' + window.util.getRandomArrElement(window.data.SURNAME),
      coatColor: window.util.getRandomArrElement(window.data.COAT),
      eyesColor: window.util.getRandomArrElement(window.data.EYES)
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

  // Инициализация

  var initApp = function () {
    similarListElement.appendChild(getWizards(getCreatures(window.data.WIZARDS_QUANTITY)));
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  initApp();
})();

