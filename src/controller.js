var controller = function(service) {
    var getCurrentWeatherByCoords = function(req, res) {
        let compositeData = {};

        service.getWeather('currentWeather', 'coords', req.query).then(function (dataWeather) {
            compositeData.weather = dataWeather;
        }).then(function() {
            service.getWeather('fiveDayForecast', 'coords', req.query).then(function (dataForecast) {
                compositeData.forecast = dataForecast;
                res.send(compositeData);
            });
        });
    };

    var getCurrentWeatherByLocation = function(req, res) {
        let compositeData = {};

        service.getWeather('currentWeather', 'location', req.query).then(function (dataWeather) {
            compositeData.weather = dataWeather;
        }).then(function() {
            service.getWeather('fiveDayForecast', 'location', req.query).then(function (dataForecast) {
                compositeData.forecast = dataForecast;
                res.send(compositeData);
            });
        });
    };

    return {
        getCurrentWeatherByCoords: getCurrentWeatherByCoords,
        getCurrentWeatherByLocation: getCurrentWeatherByLocation
    }
};

module.exports = controller;
