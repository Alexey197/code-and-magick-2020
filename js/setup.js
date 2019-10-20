'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


  // Клонирование 1-го элемента волшебника

  var getWizard = function (creatures) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = creatures.name;
    wizardElement.querySelector('.wizard-coat').style.fill = creatures.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = creatures.colorEyes;
    return wizardElement;
  };

  var successHandler = function (creatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      fragment.appendChild(getWizard(window.util.getRandomArrElement(creatures)));
    }
    similarListElement.appendChild(fragment);
  };

  var showWizards = function () {
    window.backend.load(successHandler, window.message.getError);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  showWizards();
})();
