var app = angular.module('weatherApp', ['ngMaterial', 'ngMessages']);

app.run(function() {
  console.log("App started ...");
});

app.controller('mainController', function($scope, utils) {
  console.log("Hello from mainController");

  $scope.query;

  $scope.getLocationCoordinates = function(){
    utils.location(function(location) {
    console.log(location.latitude, location.longitude);
  });
  };

  $scope.getLocation = function() {
    console.log("Starting ...", $scope.query);
  }

});