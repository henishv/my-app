'use strict';

let userModel = require('../models/users');
let reportModel = require('../models/report');

function registerHandler(request, response) {
    let params = request.body;

    if(params.firstName && params.lastName && params.email && params.passcode) {
        let user = {
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            passcode: params.passcode,
            date: new Date()
        };
        userModel.getUser(params.email, function(err, result) {
            if(err) {
                let error = {
                    status: httpCodes.internalError,
                    message: errorMessages.internalError
                };
                response.send(httpCodes.internalError,error);
            } else {
                if(result.length === 0) {
                    userModel.saveUser(user, function(err, newUser) {
                        if(err) {
                            let error = {
                                status : httpCodes.internalError,
                                message: errorMessages.internalError
                            };
                            response.send(httpCodes.internalError, error);

                        } else {
                            let result = {
                                status: httpCodes.ok,
                                message: 'User Registered Successfully'
                            };
                            response.send(httpCodes.ok, result);
                        }
                    });
                } else {
                    let error = {
                        status : httpCodes.conflict,
                        message: 'User Already Registered'
                    };
                    response.send(httpCodes.conflict, error);
                }
            }
        });

    } else {
        let error = {
            status: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        response.send(httpCodes.invalidParams, error);
    }

};

function authenticationHandler(request, response) {
    let params = request.body;
    if(params.email && params.passcode) {
        userModel.authenticateUser(params, function(err, user) {
            if(err) {
                let result = {
                    status: httpCodes.unauthorized,
                    message: errorMessages.invalidCredentials
                };
                response.send(httpCodes.unauthorized, result);
            } else {
                user.status = httpCodes.ok;
                response.send(httpCodes.ok, user);
            }

        });
    } else {
        let error = {
            status: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        response.send(httpCodes.invalidParams, error);
    }
};
function getReportHandler (request, response) {
    let params = request.body;
    if(params.userId) {
        reportModel.getReport(params.userId, function(err, rows) {
            if(err) {
                let error = {
                    status : httpCodes.internalError,
                    message: errorMessages.internalError
                };
                response.send(httpCodes.internalError, error);
            } else {
                let result = {
                    status: httpCodes.ok,
                    rows: rows
                };
                response.send(httpCodes.ok, result);
            }
        })
    } else {
        let error = {
            status: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        response.send(httpCodes.invalidParams, error);
    }
}

function saveReportHandler (request, response) {
    let params = request.body;

    if(params.userId && params.date && params.time && params.notes) {
        reportModel.saveReport(params, function(err, result) {
            if(err) {
                let error = {
                    status : httpCodes.internalError,
                    message: errorMessages.internalError
                };
                response.send(httpCodes.internalError, error);
            } else {
                result.status = httpCodes.ok;
                response.send(httpCodes.ok, result);
            }
        })
    } else {
        let error = {
            status: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        response.send(httpCodes.invalidParams, error);
    }
}

function deleteReportHandler (request, response) {
    let params = request.params;
    if(params.reportId) {
        reportModel.deleteReport(params, function(err, result) {
            if(err) {
                let error = {
                    status : httpCodes.internalError,
                    message: errorMessages.internalError
                };
                response.send(httpCodes.internalError, error);
            } else {
                result.status = httpCodes.ok;
                response.send(httpCodes.ok, result);
            }
        })
    } else {
        let error = {
            status: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        response.send(httpCodes.invalidParams, error);
    }
}

function searchHandler (request, response) {
    let params = request.body;

    if(params.userId && params.fromDt && params.toDt) {
        reportModel.searchReport(params, function(err, rows) {
            if(err) {
                let error = {
                    status : httpCodes.internalError,
                    message: errorMessages.internalError
                };
                response.send(httpCodes.internalError, error);
            } else {
                let result = {
                    rows: rows,
                    status: httpCodes.ok
                }
                response.send(httpCodes.ok, result);
            }
        })
    } else {
        let error = {
            status: httpCodes.invalidParams,
            message: errorMessages.invalidParams
        };
        response.send(httpCodes.invalidParams, error);
    }
}

let errorMessages = {
    invalidParams: 'Invalid Parameters',
    internalError : "Internal Error",
    invalidCredentials: "Invalid username or password",
};

let httpCodes = {
    createSuccess: 201,
    partialSuccess: 207,
    ok: 200,
    internalError: 500,
    invalidParams: 422,
    conflict: 409,
    unauthorized: 401
};
exports.registerHandler = registerHandler;
exports.authenticationHandler = authenticationHandler;
exports.getReportHandler = getReportHandler;
exports.saveReportHandler = saveReportHandler;
exports.deleteReportHandler = deleteReportHandler;
exports.searchHandler = searchHandler;