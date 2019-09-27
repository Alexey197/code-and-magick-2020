'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
var setupForm = setup.querySelector('.setup-wizard-form');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var openIcon = document.querySelector('.setup-open-icon');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatColorInput = setup.querySelector('.setup input[name="coat-color"]');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesColorInput = setup.querySelector('.setup input[name="eyes-color"]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballColorInput = setup.querySelector('.setup input[name="fireball-color"]');

var WIZARDS_QUANTITY = 4;
var wizardParams = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var KEYCODE = {
  ESC: 27,
  ENTER: 13
};

// Случайный элемент массива

var getRandomArrElement = function (arr) {
  var arrElement = Math.floor(Math.random() * arr.length);
  return arr[arrElement];
};

// Создание существа

var getCreature = function () {
  return {
    name: getRandomArrElement(wizardParams.NAME) + ' ' + getRandomArrElement(wizardParams.SURNAME),
    coatColor: getRandomArrElement(wizardParams.COAT),
    eyesColor: getRandomArrElement(wizardParams.EYES)
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
  similarListElement.appendChild(getWizards(getCreatures(WIZARDS_QUANTITY)));

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

initApp();

// Открытие/закрытие окна настройки персонажа, отправка формы

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', onCoatClickHandler);
  wizardEyes.addEventListener('click', onEyesClickHandler);
  wizardFireball.addEventListener('click', onFireballClickHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', onCoatClickHandler);
  wizardEyes.removeEventListener('click', onEyesClickHandler);
  wizardFireball.removeEventListener('click', onFireballClickHandler);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === KEYCODE.ESC) {
    closePopup();
  }
};

openIcon.setAttribute('tabindex', '0');
setupClose.setAttribute('tabindex', '0');

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE.ENTER) {
    closePopup();
  }
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE.ENTER) {
    setupForm.submit();
  }
});

// Валидация формы
userNameInput.setAttribute('minlength', '2');

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

// Изменения внешности по нажатию

var onCoatClickHandler = function () {
  var wizardCoatColor = getRandomArrElement(wizardParams.COAT);
  wizardCoat.style.fill = wizardCoatColor;
  wizardCoatColorInput.value = wizardCoatColor;
};

var onEyesClickHandler = function () {
  var wizardEyesColor = getRandomArrElement(wizardParams.EYES);
  wizardEyes.style.fill = wizardEyesColor;
  wizardEyesColorInput.value = wizardEyesColor;
};

var onFireballClickHandler = function () {
  var wizardFireballColor = getRandomArrElement(wizardParams.FIREBALL);
  wizardFireball.style.backgroundColor = wizardFireballColor;
  wizardFireballColorInput.value = wizardFireballColor;
};

// отправка формы

setupForm.setAttribute('action', 'https://js.dump.academy/code-and-magick');

