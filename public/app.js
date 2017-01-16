var app = angular.module('weatherApp', ['ngMaterial', 'ngMessages']);

app.run(function() {
  console.log("App started ...");
});

app.controller('mainController', function($scope, $http, utils) {
  console.log("Hello from mainController");

  $scope.query;

  $scope.getLocationCoordinates = function(){
      utils.location(function(location) {
      console.log(location.latitude, location.longitude);
      console.log(utils.server.URL+utils.server.routes.coords);
      utils.getCurrentWeather("coords", {latitude: location.latitude, longitude: location.longitude})
          .then(function(res){
              console.log(res);
          }, function(err){
              console.log(err);
          });
    });
  };

  $scope.getLocation = function() {
    console.log($scope.query);
    console.log(utils.server.URL+utils.server.routes.location);
    utils.getCurrentWeather("location", {city: $scope.query, countryCode: "CAN"})
        .then(function(res){
            console.log(res);
        }, function(err){
            console.log(err);
        });
  }

});
