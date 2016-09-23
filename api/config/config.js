'use strict';

module.exports = {
	app: {
		app_host: "localhost",
		port: 9000,
		logging: {
			console: false
		},
		routes: {
			authenticate: '/api/auth',
			register: '/api/register',
			getReport: '/api/getReport',
			saveReport: '/api/saveReport',
			deleteReport: '/api/deleteReport',
			search: '/api/search'
		}
	},
	client: {
		allowedOrigins: ["*"]
	},
	dbUrl: 'mongodb://localhost/pocApp'
};