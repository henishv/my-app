'use strict';
let db = require('./db');
let utility = require('../helpers');

function saveUser(params, callback) {
    if(params.firstName && params.lastName && params.email && params.passcode) {
        let userCollection = db.get().collection('users');
        params.password = utility.hash(params.passcode);
        userCollection.save(params, function(err, docs) {
            if(err) return callback(err);
            callback(null, docs);
        });
    } else {
        let err = {
            code: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        callback(err);
    }
}

function getUser(email, callback) {
    if(email) {
        let userCollection = db.get().collection('users');
        userCollection.find({email: email}).toArray(function(err, docs) {
            if(err) return callback(err);
            callback(null, docs);
        });
    } else {
        let err = {
            code: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        callback(err);
    }
}
function authenticateUser(params, callback) {
    let userCollection = db.get().collection('users');

    userCollection.find({email: params.email}).toArray(function(err, docs){
        if(err) return callback(err);
        if(docs.length === 0) return callback("error");

        let user = docs[0];
        if(user.password === utility.hash(params.passcode)) {
            user.userId = user._id;
            delete user._id;
            delete user.password;
            delete user.date;
            callback(null, user);
        }else{
            callback("error");
        }
    });
}
let httpCodes = {
    createSuccess: 201,
    ok: 200,
    internalError: 500,
    invalidParams: 422
};
let errorMessages = {
    invalidParams: 'Invalid Parameters',
    internalError : "Internal Error"
};
exports.saveUser = saveUser;
exports.getUser = getUser;
exports.authenticateUser = authenticateUser;