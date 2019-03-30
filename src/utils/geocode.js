const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic29raGVuZ2NoZW4iLCJhIjoiY2p0M2kxcG5iMmtxMzQ0b2QwMXBtcTB0NSJ9.WuRP4GBUS1iJyifwtsFH-A`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the service', undefined);
        } else if (response.body.features.length == 0) {
            callback("Can not find the location", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longtitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;