'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_HEIGHT = 20;
var TEXT_GAP = 10;
var BAR_WIDTH = 40;
var GAP = 50;
var CLOUD_GAP = 10;
var TITLE_Y = 30;
var TITLE_X = 20;
var barHeight = CLOUD_HEIGHT - TEXT_GAP - TEXT_HEIGHT - TEXT_GAP - CLOUD_Y - TITLE_Y - TEXT_HEIGHT - TEXT_GAP;

var renderColorHsl = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var saturation = Math.floor(Math.random() * (max - min + 1)) + min;
  return 'hsl(240,' + saturation + '%, 50%';
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_X, CLOUD_Y + TITLE_Y);
  ctx.fillText('Список результатов:', CLOUD_X + TITLE_X, CLOUD_Y + TITLE_Y + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT + CLOUD_Y - TEXT_GAP);
    for (var j = 0; j < players.length; j++) {
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = renderColorHsl(0, 100);
      }
    }
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT + CLOUD_Y - TEXT_GAP - TEXT_HEIGHT, BAR_WIDTH, (-barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT + CLOUD_Y - TEXT_GAP - TEXT_HEIGHT - (barHeight * times[i]) / maxTime - TEXT_GAP);
  }
};
