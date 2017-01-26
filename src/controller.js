var controller = function(service) {
    var getCurrentWeatherByCoords = function(req, res) {
        res.send("COORDINATES");
    };

    var getCurrentWeatherByLocation = function(req, res) {
        res.send("LOCATION");
    };

    return {
        getCurrentWeatherByCoords: getCurrentWeatherByCoords,
        getCurrentWeatherByLocation: getCurrentWeatherByLocation
    }
};

module.exports = controller;
