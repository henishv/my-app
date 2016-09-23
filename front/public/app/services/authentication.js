(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = [ '$localStorage', '$http', '$q'];

    /* @ngInject */
    function authService($localStorage, $http, $q) {

        this.authenticateUser = authenticateUser;
        this.isAuthenticated = isAuthenticated;

        function authenticateUser(authInfo) {
            return $http.post('http://' + window.location.hostname + ':9000/api/auth', authInfo)
                .then(function (res) {

                    let userDetails = {
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        isLoggedIn: true,
                        userId: res.data.userId
                    };

                    $localStorage.loginObj = userDetails;

                    return userDetails;
                },function(err) {
                    if(err.data.status === 401) {
                        return $q.reject(false);
                    }
                });
        }

        function isAuthenticated() {
            if($localStorage.loginObj && $localStorage.loginObj.isloggedIn === true) {
                return true;
            } else {
                return false;
            }
        }
    }
})();





