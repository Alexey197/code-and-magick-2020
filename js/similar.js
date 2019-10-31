'use strict';

(function () {
  var coatColorNew;
  var eyesColorNew;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColorNew) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColorNew) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.message.getError);

  window.similar = {
    onEyesChange: window.debounce(function (color) {
      eyesColorNew = color;
      updateWizards();
    }),
    onCoatChange: window.debounce(function (color) {
      coatColorNew = color;
      updateWizards();
    })
  };
})();
