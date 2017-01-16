var app = angular.module('weatherApp', ['ngMaterial', 'ngMessages']);

app.run(function() {
  console.log("App started ...");
});

app.controller('mainController', function($scope, $http, utils) {
  console.log("Hello from mainController");

  $scope.query;

  $scope.getLocationCoordinates = function(){
      utils.location(function(location) {
          let reqParam = {
              latitude: location.latitude,
              longitude: location.longitude
          };
          utils.getCurrentWeather("coords", reqParam)
              .then(function(res){
                  console.log(res);
              }, function(err){
                  console.log(err);
              });
    });
  };

  $scope.getLocation = function() {
      let reqParam = {
          city: $scope.query,
          countryCode: "CAN"
      };
    utils.getCurrentWeather("location", reqParam)
        .then(function(res){
            console.log(res);
        }, function(err){
            console.log(err);
        });
  }

});

app.directive('validLocation', function(utils) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.validLocation = function(modelValue, viewValue) {
                if(viewValue) {
                    return utils.isValidLocationInput(viewValue);
                }
            };
        }
    };
});
