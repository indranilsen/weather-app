var app = angular.module('weatherApp', []);

app.run(function() {
  console.log("App started ...");
});

app.controller('mainController', function($scope, utils) {
  console.log("Hello from mainController");

  $scope.query;

  $scope.getLocation = function(){
    utils.location(function(location) {
    console.log(location.latitude, location.longitude);
  });
};


});
