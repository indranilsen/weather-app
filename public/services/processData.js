angular.module('weatherApp')
    .service('processData', function () {

        processedData = {};

        this.process = function (rawData) {
            // rawData.weather[0]
            console.log(processString('this is a function'));
            console.log(processTemperature('282.438', 'c'));
        };

        String.prototype.capitalizeFirstLetter = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var processString = function (str) {
            let tokens = str.trim().split(' ');

            for (let i = 0; i<tokens.length; i++) {
                tokens[i] = tokens[i].capitalizeFirstLetter();
            }

            return tokens.join(' ');
        };

        var processTemperature = function (temperature, scale) {
            const celciusFactor = 273.15;
            const fahrenheitFactor = 459.67;
            const fahrenheitMultFactor = 1.8;

            if (typeof temperature === 'undefined') {
                return 'N/A';
            } else if (typeof temperature === 'string') {
                temperature = Number(temperature);
            }

            if (scale === 'c') {
                return Math.round(temperature - celciusFactor);
            } else if (scale === 'f') {
                return Math.round(
                    (temperature * fahrenheitMultFactor) - fahrenheitFactor
                );
            }
        };

        var processSpeed = function (speed, system) {
            const kilometerPerHour = 3.6;
            const milesPerHour = 2.23694;

            if (typeof temperature === 'undefined') {
                return 'N/A';
            } else if (typeof temperature === 'string') {
                temperature = Number(temperature);
            }

            if (system === 'kph') {
                return Math.round(speed * kilometerPerHour);
            } else if (system === 'mph') {
                return Math.round(speed * milesPerHour);
            }
        }

    });
