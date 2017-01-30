var controller = function(service) {
    var getCurrentWeatherByCoords = function(req, res) {
        res.send("COORDINATES");
        service.getWeather('currentWeather', 'coords', req.query);
    };

    var getCurrentWeatherByLocation = function(req, res) {
        service.getWeather('currentWeather', 'location', req.query).then(function (data) {
            console.log(data);
            res.send(data);
        });
    };

    return {
        getCurrentWeatherByCoords: getCurrentWeatherByCoords,
        getCurrentWeatherByLocation: getCurrentWeatherByLocation
    }
};

module.exports = controller;
