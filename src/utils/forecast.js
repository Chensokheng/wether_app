const request = require("request");

const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/3de067018e3a3f19dddc100e4db8db1a/${latitude},${longtitude}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Uneble to connect to the weather service', undefined);
        } else if (response.body.code == 400) {
            callback('Uneble to connect to find the location', undefined);
        } else {
            let temperature = Math.floor((response.body.currently.temperature - 32) * 5 / 9);
            callback(undefined, `.It's currently ${temperature} degree. There is a ${response.body.currently.precipProbability} chance of rain`);

        }
    });



}
module.exports = forecast;
