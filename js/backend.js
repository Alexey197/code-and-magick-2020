'use strict';

(function () {

  var urlParams = {
    URL_LOAD: 'https://js.dump.academy/code-and-magick/data',
    URL_SAVE: 'https://js.dump.academy/code-and-magick'
  };

  var TIMEOUT = 10000;

  var getBackendXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getBackendXhr(onLoad, onError);
      xhr.open('GET', urlParams.URL_LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = getBackendXhr(onLoad, onError);
      xhr.open('POST', urlParams.URL_SAVE);
      xhr.send(data);
    }
  };
})();
