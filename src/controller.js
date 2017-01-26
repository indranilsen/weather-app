var controller = function(service) {
    var getCurrentWeatherByCoords = function(req, res) {
        res.send("COORDINATES");
        service.getWeather('currentWeather', 'coords', req.query);
    };

    var getCurrentWeatherByLocation = function(req, res) {
        res.send("LOCATION");
        service.getWeather('fiveDayForecast', 'location', req.query);
    };

    return {
        getCurrentWeatherByCoords: getCurrentWeatherByCoords,
        getCurrentWeatherByLocation: getCurrentWeatherByLocation
    }
};

module.exports = controller;
