'use strict';
let mongoDb = require('mongodb');
let mongoClient = mongoDb.MongoClient;
let config = require('../config/config.js');

let dbObject = undefined;

function connect(callback){
    if(dbObject) return callback();

    mongoClient.connect(config.dbUrl, function(err, db) {
        if(err) return callback(err);
        dbObject = db;
        callback();
    });
};
(function() {
    if(!dbObject) {
        connect(function(err, db) {
            if(err) console.log('error', 'Unable to connect to Mongo ',err);
        });
    }
})();
function get(){
    return dbObject;
};

function close(callback){
    if(dbObject){
        dbObject.close(function(err, result){
            callback(err);
        });
    }
};
exports.connect = connect;
exports.get = get;
exports.close = close;
exports.ObjectID = mongoDb.ObjectID;