var http = require('http');

var service = function() {
    var weatherApi = {
        endpoints: {
            currentWeather: 'api.openweathermap.org/data/2.5/weather',
            fiveDayForecast: 'api.openweathermap.org/data/2.5/forecast'
        },
        parameters: {
            location: '?q=',
            id: '?id=',
            coordsLatitue: '?lat=',
            coordsLongitude: '&lon='
        },
        apiKey: '&APPID='
    };

    var makeApiCall = function (url) {
            var request = http.get(url, function(res) {
                const statusCode = res.statusCode;
                const contentType = res.headers['content-type'];
                var error;
                var rawData = '';

                if (statusCode !== 200) {
                    error = new Error('Error: ', statusCode);
                } else if (contentType !== 'application/json') {
                    error = new Error('Invalid content-type: ', contentType);
                }

                if (error) {
                    console.log("=========>", error.message);
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');

                res.on('data', function (rawDataChunk) {
                    rawData += rawDataChunk;
                });

                res.on('end', function() {
                    try {
                        var data = JSON.parse(rawData);
                        console.log(data);
                    } catch (exception ) {
                        console.log(exception .message);
                    }
                });
            });

            request.on('error', function (err) {
                console.log("=========>*", err);
            });
    };

    var getWeather = function(weatherType, inputType, data) {
        var url;

        switch (weatherType) {
            case 'currentWeather':
                url = weatherApi.endpoints.currentWeather;
                break;
            case 'fiveDayForecast':
                url = weatherApi.endpoints.fiveDayForecast;
                break;
            default:

        }

        if(inputType==='coords') {
            url += weatherApi.parameters.coordsLatitue + data.latitude
                    + weatherApi.parameters.coordsLongitude + data.longitude
                    + weatherApi.apiKey + process.env.KEY;
            console.log(url);
        } else if (inputType==='location') {
            url += weatherApi.parameters.location + data.city;
            if(data.countryCode) {
                url = url + ',' + data.countryCode;
            }
            url += weatherApi.apiKey + process.env.KEY;
            console.log(url);
        }

        makeApiCall('http://'+url);
    };

    return {
      getWeather: getWeather
    };
};

module.exports = service;
