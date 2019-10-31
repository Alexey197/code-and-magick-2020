'use strict';

(function () {
  var wizardParams = {
    COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  wizardCoat.addEventListener('click', function () {
    var randColor = window.util.getRandomArrElement(wizardParams.COAT);
    wizardCoat.style.fill = randColor;
    window.similar.onCoatChange(randColor);
  });

  wizardEyes.addEventListener('click', function () {
    var randColor = window.util.getRandomArrElement(wizardParams.EYES);
    wizardEyes.style.fill = randColor;
    window.similar.onEyesChange(randColor);
  });

  wizardFireball.addEventListener('click', function () {
    var randColor = window.util.getRandomArrElement(wizardParams.FIREBALL);
    wizardFireball.style.background = randColor;
  });

})();
