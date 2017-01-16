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
      utils.getCurrentWeather("coords", location);
    });
  };

  $scope.getLocation = function() {
    console.log($scope.query);
    console.log(utils.server.URL+utils.server.routes.location);
    var currentWeather = utils.getCurrentWeather("location", {city: $scope.query, countryCode: "CAN"}, function(data){
      console.log(data);
    }, function(err){
      console.log(err);
    });

  }

});
