'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


  // Клонирование 1-го элемента волшебника

  var renderWizard = function (creatures) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = creatures.name;
    wizardElement.querySelector('.wizard-coat').style.fill = creatures.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = creatures.colorEyes;
    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > WIZARDS_QUANTITY ? WIZARDS_QUANTITY : data.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(data[i]));
    }

    similar.classList.remove('hidden');
  };
})();
