var http = require('http');

var service = function() {
    var weatherApi = {
        endpoints: {
            currentWeather: 'http://api.openweathermap.org/data/2.5/weather',
            fiveDayForecast: 'http://api.openweathermap.org/data/2.5/forecast'
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
        return new Promise(function(resolve, reject) {
            var request = http.get(url, function(res) {
                const statusCode = res.statusCode;
                const contentType = res.headers['content-type'];

                var error;
                var rawData = '';

                if (statusCode !== 200) {
                    error = new Error('Error: ', statusCode);
                } else if (!contentType.includes('application/json')) {
                    error = new Error('Invalid content-type: ', contentType);
                }

                if (error) {
                    res.resume();
                    reject(error.message)
                }

                res.setEncoding('utf8');

                res.on('data', function (rawDataChunk) {
                    rawData += rawDataChunk;
                });

                res.on('end', function() {
                    try {
                        var data = JSON.parse(rawData);
                        resolve(data);
                    } catch (exception ) {
                        reject(exception.message);
                    }
                });
            });
            request.on('error', function (err) {
                reject(exception.message);
            });
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

        return makeApiCall(url);
    };

    return {
      getWeather: getWeather
    };
};

module.exports = service;
