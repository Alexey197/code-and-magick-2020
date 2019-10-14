'use strict';

(function () {

  var wizardParams = {
    NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var getCreature = function () {
    return {
      name: window.util.getRandomArrElement(wizardParams.NAME) + ' ' + window.util.getRandomArrElement(wizardParams.SURNAME),
      coatColor: window.util.getRandomArrElement(wizardParams.COAT),
      eyesColor: window.util.getRandomArrElement(wizardParams.EYES)
    };
  };

  window.data = {
    COAT: wizardParams.COAT,
    EYES: wizardParams.EYES,
    FIREBALL: wizardParams.FIREBALL,
    getCreatures: function (arrLength) {
      var creatures = [];
      for (var i = 0; i < arrLength; i++) {
        creatures.push(getCreature());
      }
      return creatures;
    }
  };
})();
