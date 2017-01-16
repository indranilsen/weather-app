angular.module('weatherApp')
  .service('utils', function($q, $http) {

    this.server = {
      URL: "http://localhost:3000",
      routes: {
        base: "/",
        coords: "/api/coords",
        location: "/api/location"
      }
    };

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

    this.getCurrentWeather = function(type, data, callback, err) {
      if (type==="coords") {
        var parameters = {
          latitude: data.latitude,
          longitude: data.longitude
        };
        var route = this.server.routes.coords;
      } else if (type==="location") {
        var parameters = {
          city: data.city,
          countryCode: data.countryCode
        };
        var route = this.server.routes.location;
      }

      var req = {
        method: 'GET',
        url: this.server.URL+route,
        params: parameters
      };

      $http(req).then(callback, err);

    };

  });
