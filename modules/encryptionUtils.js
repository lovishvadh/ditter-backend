'use strict';
const crypto = require("crypto");

const commonIvs = {
    email: '0e8e33c1aab738a8b3db79d06f0c57f76aca62a08dead21ab776499dafd89c5d13c07c56b0fc0e474cd09de09b39a23d11f1060b638868ba2ec6c5b8caedf40d',
    userName: '9cc807f0606baf2963f253e7d11b4e5440f6e4ff6fd775d512763df124b48a6da52afabc7f715b760e71a78855d13b439c4a4f41aebcd0420949e82c242ef365',
    password: '0c2ec8ad6f8f814f6ddf8a54dcad9e7a6350e640231951113ca5fa180e6141ffbe9424bb7fcde6fab848b01c56f6e0fb429105d5f92627d7a85d39d10562daa6',
}

const algorithm = "aes-256-gcm";

const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';

const seperator = '__';

function encryptEmail(email) {
    email = email.toLowerCase();
    var cipher = crypto.createCipheriv(algorithm, password, commonIvs.email);
    var encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return `${encrypted}${seperator}${tag.toString('hex')}`
}

function decryptEmail(encrypted) {
    const content = encrypted.split(seperator)[0];
    const tag = Buffer.from(encrypted.split(seperator)[1], 'hex');
    var decipher = crypto.createDecipheriv(algorithm, password, commonIvs.email);
    decipher.setAuthTag(tag);
    var dec = decipher.update(content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function encryptUsername(userName) {
    userName = userName.toLowerCase();
    var cipher = crypto.createCipheriv(algorithm, password, commonIvs.userName);
    var encrypted = cipher.update(userName, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return `${encrypted}${seperator}${tag.toString('hex')}`
}

function decryptUsername(encrypted) {
    const content = encrypted.split(seperator)[0];
    const tag = Buffer.from(encrypted.split(seperator)[1], 'hex');
    var decipher = crypto.createDecipheriv(algorithm, password, commonIvs.userName);
    decipher.setAuthTag(tag);
    var dec = decipher.update(content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function encryptPassword(passwordText) {
    var cipher = crypto.createCipheriv(algorithm, password, commonIvs.password);
    var encrypted = cipher.update(passwordText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${encrypted}`;
}

module.exports = {
    encryptUsername,
    decryptUsername,
    encryptEmail,
    decryptEmail,
    encryptPassword,
};