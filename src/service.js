var service = function() {
    var weatherApi = {
        endpoints: {
            currentWeather: 'https://api.openweathermap.org/data/2.5/weather',
            fiveDayForecast: 'https://api.openweathermap.org/data/2.5/forecast'
        },
        parameters: {
            location: '?q=',
            id: '?id=',
            coordsLatitue: '?lat=',
            coordsLongitude: '&lon='
        },
        apiKey: '&APPID='
    }

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
    };

    var getFiveDayForecast = function (type, data) {
        console.log(type, data);
    };

    return {
      getWeather: getWeather
    };
};

module.exports = service;
