'use strict';

(function () {
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState === 4 && this.status === 200) {
  //     myFunction(this.responseText);
  //   }
  // };
  // xhttp.open('GET', 'https://javascript.pages.academy/code-and-magick/data', true);
  // xhttp.send();
  // function myFunction(data) {
  //   console.log(data);
  // }
  // var URL = 'https://javascript.pages.academy/code-and-magick/data';
  // window.load = function (onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';
  //
  //   xhr.open('GET', URL);
  //
  //   xhr.addEventListener('load', function () {
  //     onSuccess(xhr.response);
  //   });
  //   xhr.send();
  // };
  var URL = 'https://javascript.pages.academy/code-and-magick/data';

  var getBackendXhr = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad) {
      var xhr = getBackendXhr(onLoad);
      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
