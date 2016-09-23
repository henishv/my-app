
(function () {
    'use strict';

    angular.module('app').constant('routes', getRoutes());

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', 'routes', routeConfigurator]);

    function routeConfigurator($stateProvider, $urlRouterProvider, routes) {
        routes.forEach(function (routeInfo) {
            $stateProvider.state(routeInfo.state, routeInfo.config);
        });
        $urlRouterProvider.otherwise('/login');
    }

    function getRoutes() {
        return [{
            state: 'login',
            config : {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: "LoginController",
                controllerAs: 'vm'
            }

        }, {
            state: 'register',
            config : {
                url: '/register',
                templateUrl: 'app/register/register.html',
                controller: "RegisterController",
                controllerAs : 'vm'
            }
        }, {
            state: 'dashboard',
            config : {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: "DashboardController",
                controllerAs : 'vm'
            }
        }, {
            state: 'addNew',
            config : {
                url: '/addNew',
                templateUrl: 'app/addNew/addNew.html',
                controller: "AddNewController",
                controllerAs : 'vm'
            }
        }, {
            state: 'modifyReport',
            config : {
                url: '/modifyReport',
                templateUrl: 'app/modifyReport/modifyReport.html',
                controller: "ModifyReportController",
                controllerAs : 'vm'
            }
        }, {
            state: 'registrationSuccess',
            config : {
                url: '/registrationSuccess',
                templateUrl: 'app/register/success.html'
            }
        }];
    }
})();


