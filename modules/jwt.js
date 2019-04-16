const jwt = require('jsonwebtoken');

const jwtSecret = '54f2df06f5c09916d4eedcaf6ebe3b8a9f5c0cd303b67484182a3725d2341315722bdfec229e3d843820b41672b9b452cac498732384897b5391e204bf3b9ce5';

const signingOptions = {
    expiresIn: '1d',
}

function sign(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, jwtSecret, signingOptions, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

function decode(token) {
    return new Promise((resolve, reject) => {
        jwt.decode(token, {
            json: true
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}


function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, {
            maxAge: signingOptions.expiresIn,
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

module.exports = {
    sign,
    verify,
    decode
}