angular.module('weatherApp')
  .service('utils', function($q, $http) {

    var server = {
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

    var success = function(res) {
      return($q.resolve(res.data));
    };

    var error = function(res) {
      if(res.data!=='object' || !res.data.message || res.data === null) {
        return($q.reject("Unknown error occurred."));
      }

      return ($q.reject(res.data.message));
    };

    this.location = function(callback) {
      navigator.geolocation.getCurrentPosition(function(position){
        callback(position.coords);
      },function(err){
        console.log(err.code + ": " + err.message);
      }, geoOptions);
    };

    this.getCurrentWeather = function(type, data) {
      if (type==="coords") {
        var parameters = {
          latitude: data.latitude,
          longitude: data.longitude
        };
        var routeTarget = server.routes.coords;
      } else if (type==="location") {
        var parameters = {
          city: data.city,
          countryCode: data.countryCode
        };
        var routeTarget = server.routes.location;
      }

      var req = {
        method: 'GET',
        url: server.URL+routeTarget,
        params: parameters
      };

      return $http(req).then(success, error);

    };

    this.isValidLocationInput = function(location) {
        var commaCount = 0;
        for(var i = 0; i<location.length-1; i++) {
            if(location.charCodeAt(i) === 44)
                commaCount++;
        }
        if (commaCount > 2) {
            return false;
        } else {
            return true;
        }
    };
  });
