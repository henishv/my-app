'use strict';
let db = require('./db');

function getReport(id, callback) {
    if(id) {
        let reportCollection = db.get().collection('report');
        reportCollection.find({userId: id}).toArray(function(err, docs) {
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

function saveReport(params, callback) {
    if(params.userId && params.date && params.time && params.notes) {
        let reportCollection = db.get().collection('report');
        if(params.hasOwnProperty('_id')) params._id = new db.ObjectID(params._id);
        reportCollection.save(params, function(err, docs) {
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
function deleteReport(params, callback) {
    if(params.reportId) {
        let reportCollection = db.get().collection('report');
        let dbParams = {
            _id : new db.ObjectID(params.reportId)
        };
        reportCollection.remove(dbParams, function(err, docs) {
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

function searchReport(params, callback) {
    if(params.userId && params.fromDt && params.toDt) {
        let reportCollection = db.get().collection('report');
        let query = {
            $and: [ { date: { $gte: params.fromDt } }, { date: { $lte: params.toDt } }, { userId:params.userId } ]
        };
        reportCollection.find(query).sort({ date: 1}).toArray(function(err, docs) {
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
exports.getReport = getReport;
exports.saveReport = saveReport;
exports.searchReport = searchReport;
exports.deleteReport = deleteReport;