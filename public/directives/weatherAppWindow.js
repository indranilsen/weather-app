app.directive('weatherAppWindow', function() {
    return {
        templateUrl: 'partials/window.html',
        controller: function($scope, $rootScope) {
            $scope.page = 'currentWeather';
            $scope.showData = false;
            $scope.showCurrentWeather = true;
            $scope.showFiveDayForecast = false;

            $scope.$on('data-received', function() {
                $scope.showData = true;
            });

            $scope.showTab = function(tab) {
                if(tab === 'currentWeather') {
                    $scope.showCurrentWeather = true;
                    $scope.showFiveDayForecast = false;
                } else if (tab === 'fiveDayForecast') {
                    $scope.showCurrentWeather = false;
                    $scope.showFiveDayForecast = true;
                }
            };
        }
    };
});
