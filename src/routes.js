var express = require('express');

var service = require('./service')();
var controller = require('./controller')(service);

var router = express.Router();

router.route('/').get(function(req, res) {
    res.send("API BASE");
});

router.route('/coords').get(controller.getCurrentWeatherByCoords);

router.route('/location').get(controller.getCurrentWeatherByLocation);

module.exports = router;