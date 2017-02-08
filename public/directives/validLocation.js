app.directive('validLocation', function(utils) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.validLocation = function(modelValue, viewValue) {
                if(viewValue) {
                    return utils.isValidLocationInput(viewValue).validity;
                }
            };
        }
    };
});
