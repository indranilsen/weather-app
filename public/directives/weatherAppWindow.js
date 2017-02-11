app.directive('weatherAppWindow', function() {
    return {
        templateUrl: 'partials/window.html',
        controller: function($scope, $rootScope) {
            $scope.page = 'currentWeather';
            $scope.showData = false;

            $scope.$on('data-received', function() {
                $scope.showData = true;
            });
        }
    };
});
