'use strict';

(function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


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
    similarListElement.appendChild(getWizards(window.data.getCreatures(window.data.WIZARDS_QUANTITY)));
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  initApp();
})();

