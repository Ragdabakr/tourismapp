const request = require('request');
 
_EXTERNAL_URL = 'https://documenter.getpostman.com/view/11426467/Szmk1vHo';

const callExternalApiUsingRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callExternalApiUsingRequest;