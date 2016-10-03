(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = [ '$localStorage', '$http', '$q', 'userinfo'];

    /* @ngInject */
    function authService($localStorage, $http, $q, userinfo) {

        this.authenticateUser = authenticateUser;
        this.isAuthenticated = isAuthenticated;
        this.getUserInfo = getUserInfo;
        this.setUserInfo = setUserInfo;

        function authenticateUser(authInfo) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/auth`, authInfo)
                .then(success, error);
        }

        function success(result) {
            userinfo.userId = result.data.userId;
            userinfo.firstName = result.data.firstName;
            userinfo.lastName = result.data.lastName;
            userinfo.isLoggedIn = true;
            $localStorage.loginObj = userinfo;
            return true;
        }

        function error(error) {
            if(error.data.status === 401) {
                return $q.reject(false);
            }
        }

        function isAuthenticated() {
            if($localStorage.loginObj && $localStorage.loginObj.isLoggedIn === true) {
                return true;
            } else {
                return false;
            }
        }

        function getUserInfo() {
            if($localStorage.loginObj && $localStorage.loginObj.isLoggedIn === true) {
                return $localStorage.loginObj;
            } else {
                return false;
            }
        }
        function setUserInfo() {
            if($localStorage.loginObj && $localStorage.loginObj.isLoggedIn === true) {
                userinfo.userId = $localStorage.loginObj.userId;
                userinfo.firstName = $localStorage.loginObj.firstName;
                userinfo.lastName = $localStorage.loginObj.lastName;
                userinfo.isLoggedIn = $localStorage.loginObj.isLoggedIn;
            }
        }
    }
})();





