'use strict';

let restify = require('restify');
let app = restify.createServer();
let config = require('api/config');
let serviceHandler = require('api/handlers');


app.pre(restify.CORS({
    origins: config.client.allowedOrigins
}));

app.pre(restify.fullResponse());

app.opts(/\.*/, function (request, response, next) {
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.send(200);
    next();
});

app.use(restify.queryParser());
app.use(restify.bodyParser({ mapParams: true }));

function authenticationHandler(request, response) {
    serviceHandler.authenticationHandler(request, response);
};
function registerHandler(request, response) {
    serviceHandler.registerHandler(request, response);
};
function getReportHandler(request, response) {
    serviceHandler.getReportHandler(request, response);
}
function saveReportHandler(request, response) {
    serviceHandler.saveReportHandler(request, response);
}
function deleteReportHandler(request, response) {
    serviceHandler.deleteReportHandler(request, response);
}
function searchHandler(request, response) {
    serviceHandler.searchHandler(request, response);
}
app.post(config.app.routes.authenticate, authenticationHandler);
app.post(config.app.routes.register, registerHandler);
app.post(config.app.routes.getReport, getReportHandler);
app.post(config.app.routes.saveReport, saveReportHandler);
app.del(config.app.routes.deleteReport, deleteReportHandler);
app.post(config.app.routes.search, searchHandler);

app.listen(config.app.port, function () {
    console.log(' The api app is up on port: ', config.app.port);
});
exports.app = app;
