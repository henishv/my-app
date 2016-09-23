'use strict';

let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let path = require('path');
let config = require('front/config');
let indexPageHandler = require('front/handlers/handler.js').indexPageHandler;

app.use('/', router);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public'), {maxAge : 86400000}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var indexPage = function(request, response) {
    indexPageHandler.indexPage(request, response);
};
var directivePage = function(request, response) {
    indexPageHandler.directivePage(request, response);
};
var componentPage = function(request, response) {
    indexPageHandler.componentPage(request, response);
};
router.get('/', indexPage);
router.get('/directive', directivePage);
router.get('/component', componentPage);

app.listen(config.app.port, function () {
    console.log(' The front app is up on port: ', config.app.port);
});
exports.app = app;
