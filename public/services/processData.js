angular.module('weatherApp')
    .service('processData', function () {

        processedData = {};

        const _C = {
            CELCIUS: 273.15,
            FAHRENHEIT: 459.67,
            FAHRENHEIT_MULT: 1.8,
            KPH: 3.6,
            MPH: 2.23694,
            UTC_SECONDS: 1000
        };

        this.process = function (rawData) {
            // rawData.weather[0]
            console.log(processString('this is a function'));
            console.log(processTemperature('282.438', 'c'));
            console.log(processDegrees('10'));
            console.log(processUTC('1486610189'));
        };

        String.prototype.capitalizeFirstLetter = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var enforceNumber = function (val) {
            let error = new Error('Cannot convert value to number');

            if (typeof val === 'string') {
                val = Number(val);
                if (val !== val) {
                    throw error;
                }
                return val;
            } else if (typeof val === 'number' ) {
                return val;
            } else {
                throw error;
            }
        };

        var processString = function (str) {
            let tokens = str.trim().split(' ');

            for (let i = 0; i<tokens.length; i++) {
                tokens[i] = tokens[i].capitalizeFirstLetter();
            }

            return tokens.join(' ');
        };

        var processTemperature = function (temperature, scale) {
            try {
                temperature = enforceNumber(temperature);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            if (scale === 'c') {
                return Math.round(temperature - _C.CELCIUS);
            } else if (scale === 'f') {
                return Math.round(
                    (temperature * _C.FAHRENHEIT_MULT) - _C.FAHRENHEIT
                );
            }
        };

        var processSpeed = function (speed, system) {
            try {
                speed = enforceNumber(speed);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            if (system === 'kph') {
                return Math.round(speed * _C.KPH);
            } else if (system === 'mph') {
                return Math.round(speed * _C.MPH);
            }
        };

        var processUTC = function (utc) {
            try {
                utc = enforceNumber(utc);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            return new Date(utc * _C.UTC_SECONDS);
        };

        var processDegrees = function (deg) {
            try {
                deg = enforceNumber(deg);
            } catch (e) {
                console.log(e.message);
                return 'N/A';
            }

            switch (true) {
                case (deg >=  348.75 && deg <= 360 ||
                    deg >=  0 && deg < 11.25):
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

    });
