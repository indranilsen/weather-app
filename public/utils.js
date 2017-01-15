angular.module('weatherApp')
  .service('utils', function() {

    var geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    };

    this.location = function(callback) {
      navigator.geolocation.getCurrentPosition(function(position){
        callback(position.coords);
      },function(err){
        console.log(err.code + ": " + err.message);
      }, geoOptions);
    };

  });
