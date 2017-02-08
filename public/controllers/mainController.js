app.controller('mainController', function($scope, $http, utils) {
  console.log("Hello from mainController");

  $scope.query;
  $scope.data;
  $scope.page = 'currentWeather';

  $scope.getLocationCoordinates = function() {
      utils.location(function (location) {
          let reqParam = {
              latitude: location.latitude,
              longitude: location.longitude
          };
          utils.getCurrentWeather("coords", reqParam)
              .then(function(res){
                  console.log(res);
                  $scope.data = res;
              }, function(err){
                  console.log(err);
              });
        });
  };

  $scope.getLocation = function() {
     var location = utils.destructureLocation($scope.query);
      let reqParam = {
          city: location.city,
          countryCode: location.country
      };
    utils.getCurrentWeather("location", reqParam)
        .then(function(res){
            console.log(res);
            $scope.data = res;
        }, function(err){
            console.log(err);
        });
  };

});
