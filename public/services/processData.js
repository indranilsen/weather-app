angular.module('weatherApp')
    .service('processData', function(iconData) {

        processedData = {};

        const _C = {
            CELCIUS: 273.15,
            FAHRENHEIT: 459.67,
            FAHRENHEIT_MULT: 1.8,
            KPH: 3.6,
            MPH: 2.23694,
            UTC_SECONDS: 1000
        };

        this.process = function(rawData) {
            const time = processTime(rawData.weather.dt);

            processedData.time = time;

            processedData.city = processString(
                rawData.weather.name
            );

            processedData.country = processString(
                rawData.weather.sys.country
            );

            processedData.weatherMain = processString(
                rawData.weather.weather[0].main
            );

            processedData.weatherDescription = processString(
                rawData.weather.weather[0].description
            );

            processedData.temperature = processTemperature(
                rawData.weather.main.temp,
                'c'
            );

            processedData.pressure = processPressure(
                rawData.weather.main.pressure,
                'mb'
            );

            processedData.windSpeed = processSpeed(
                rawData.weather.wind.speed,
                'kph'
            );

            processedData.windDirection = processDegrees(
                rawData.weather.wind.deg
            );

            processedData.sunrise = processTime(
                rawData.weather.sys.sunrise
            );

            processedData.sunset = processTime(
                rawData.weather.sys.sunset
            );

            processedData.weatherIcon = processIcons.weather(
                rawData.weather.weather[0].id,
                time.hours
            );

            processedData.mainFeaturesIcon = processIcons.mainFeatures(
                rawData.weather.wind.deg
            );

            processedData.otherFeaturesIcon = processIcons.otherFeatures();

            processedData.humidity = appendSuffix(
                rawData.weather.main.humidity,
                '%'
            );

            processedData.percentCloud = appendSuffix(
                rawData.weather.clouds.all,
                '%'
            );

            return processedData;
        };

        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var enforceNumber = function(val) {
            let error = new Error('Cannot convert value to number');

            if (typeof val === 'string') {
                val = Number(val);
                if (val !== val) {
                    throw error;
                }
                return val;
            } else if (typeof val === 'number') {
                return val;
            } else {
                throw error;
            }
        };

        var getMonth = function(val, length) {
            const months = {
                long: ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'],
                short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            };

            if (length === 'long') {
                return months.long[val];
            } else if (length === 'short') {
                return months.short[val];
            }
        };

        var getDay = function(val, length) {
            const days = {
                long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday', 'Sunday'],
                short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            };

            if (length === 'long') {
                return days.long[val];
            } else if (length === 'short') {
                return days.short[val];
            }
        };

        var getFormattedTime = function(hrs, min, type) {
            let h = hrs;
            let m = min;
            let meridian = '';

            if(type === '12-hour') {
                if(Math.floor(h/12) > 0) {
                    meridian = 'PM';
                } else {
                    meridian = 'AM';
                }
                h = h % 12;
            }

            if (h < 10) {h = "0"+h;}
            if (m < 10) {m = "0"+m;}

            return (meridian == null) ? (h+':'+m) : (h+':'+m+' '+meridian);
        };

        var processString = function(str) {
            let tokens = str.trim().split(' ');

            for (let i = 0; i < tokens.length; i++) {
                tokens[i] = tokens[i].capitalizeFirstLetter();
            }

            return tokens.join(' ');
        };

        var processTemperature = function(temperature, scale) {
            try {
                temperature = enforceNumber(temperature);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            if (scale === 'c') {
                return {
                    val: Math.round(temperature - _C.CELCIUS),
                    unit: 'C'
                };
            } else if (scale === 'f') {
                return {
                    val: Math.round(
                        (temperature * _C.FAHRENHEIT_MULT) - _C.FAHRENHEIT
                    ),
                    unit: 'F'
                };
            }
        };

        var processPressure = function(pressure, scale) {
            try {
                pressure = enforceNumber(pressure);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            if (scale === 'mb') {
                return {
                    val: pressure,
                    unit: 'mb'
                };
            } else if (scale === 'f') {
                return {
                    val: pressure,
                    unit: 'hPa'
                };
            }
        };

        var processSpeed = function(speed, system) {
            try {
                speed = enforceNumber(speed);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            if (system === 'kph') {
                return {
                    val: Math.round(speed * _C.KPH),
                    unit: 'km/h'
                };
            } else if (system === 'mph') {
                return {
                    val: Math.round(speed * _C.MPH),
                    unit: 'mi/h'
                };
            }
        };

        var processTime = function(utc) {
            try {
                utc = enforceNumber(utc);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            let date = new Date(utc * _C.UTC_SECONDS);
            let format = 'long';

            return {
                date: date.getDate(),
                year: date.getFullYear(),
                hours: date.getHours(),
                minutes: date.getMinutes(),
                day: getDay(date.getDay(), format),
                month: getMonth(date.getMonth(), format),
                formattedTime: getFormattedTime(
                    date.getHours(),
                    date.getMinutes(),
                    '12-hour'
                )
            };
        };

        var processDegrees = function(deg) {
            try {
                deg = enforceNumber(deg);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            switch (true) {
                case (deg >= 348.75 && deg <= 360 ||
                    deg >= 0 && deg < 11.25):
                    return 'N';
                    break;
                case (deg >= 11.25 && deg < 33.75):
                    return 'NNE';
                    break;
                case (deg >= 33.75 && deg < 56.25):
                    return 'NE';
                    break;
                case (deg >= 56.25 && deg < 78.75):
                    return 'ENE'
                    break;
                case (deg >= 78.75 && deg < 101.25):
                    return 'E';
                    break;
                case (deg >= 101.25 && deg < 123.75):
                    return 'ESE';
                    break;
                case (deg >= 123.75 && deg < 146.25):
                    return 'SE';
                    break;
                case (deg >= 146.25 && deg < 168.75):
                    return 'SSE';
                    break;
                case (deg >= 168.75 && deg < 191.25):
                    return 'S';
                    break;
                case (deg >= 191.25 && deg < 213.75):
                    return 'SSW';
                    break;
                case (deg >= 213.75 && deg < 236.25):
                    return 'SW';
                    break;
                case (deg >= 236.25 && deg < 258.75):
                    return 'WSW';
                    break;
                case (deg >= 258.75 && deg < 281.25):
                    return 'W';
                    break;
                case (deg >= 281.25 && deg < 303.75):
                    return 'WNW';
                    break;
                case (deg >= 303.75 && deg < 326.25):
                    return 'NW';
                    break;
                case (deg >= 326.25 && deg < 348.75):
                    return 'NNW';
                    break;
                default:
                    return 'N/A';
            }
        }

        var processIcons = {
            weather: function(code, hrs) {
                let time;
                let icon = iconData.data[code].icon;

                if (hrs >= 6 && hrs < 20) {
                    time = 'day';
                } else {
                    time = 'night';
                    if (code == 800) {
                        return 'wi wi-night-clear';
                    }
                }

                if (!(code >= 700 && code < 800) &&
                    !(code >= 900 && code < 1000)) {
                    if (time === 'day') {
                        icon = 'day-' + icon;
                    } else if (time === 'night') {
                        icon = 'night-' + icon;
                    }
                }
                return 'wi wi-' + icon;
            },
            mainFeatures: function(deg) {
                let direction = 'wi wi-wind wi-towards-' +
                    processDegrees(deg).toLowerCase();

                return {
                    thermometer: 'wi wi-thermometer',
                    rain: 'wi wi-raindrops',
                    wind: direction
                };
            },
            otherFeatures: function () {
                return {
                    sunrise: 'wi wi-sunrise',
                    sunset: 'wi wi-sunset',
                    humidity: 'wi wi-humidity',
                    pressure: 'wi wi-barometer',
                    percentCloud: 'wi wi-cloudy'
                };
            }
        };

        var appendSuffix = function(value, suffix) {
            try {
                value = enforceNumber(value);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            return {
                val: value,
                unit: suffix
            };
        };
    });
