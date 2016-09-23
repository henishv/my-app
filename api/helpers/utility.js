'use strict';

var crypto = require('crypto');

function hash(value) {
        return crypto.createHash('sha1').update(value).digest('base64');
};

exports.hash = hash;