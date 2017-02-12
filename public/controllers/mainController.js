app.controller('mainController', function($scope, $http, utils, processData) {
  console.log("Hello from mainController");

  $scope.query;
  $scope.data;

  $scope.getLocationCoordinates = function() {
      utils.location(function (location) {
          let reqParam = {
              latitude: location.latitude,
              longitude: location.longitude
          };
          utils.getCurrentWeather("coords", reqParam)
              .then(function(res){
                  $scope.data = processData.process(res);
                  $scope.$broadcast('data-received');
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
            $scope.data = processData.process(res);
            $scope.$broadcast('data-received');
        }, function(err){
            console.log(err);
        });
  };

});
