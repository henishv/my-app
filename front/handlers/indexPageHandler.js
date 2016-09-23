'use strict';

function indexPage(request, response) {
    response.render('index', {parameters:"hello"});
}

function directivePage(request, response) {
    response.render('directive', {parameters:"hello"});
}
function componentPage(request, response) {
    response.render('component', {parameters:"hello"});
}

exports.indexPage = indexPage;
exports.directivePage = directivePage;
exports.componentPage = componentPage;