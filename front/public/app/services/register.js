(function () {
    'use strict';

    angular
        .module('app')
        .service('registerService', registerService);

    registerService.$inject = ['$http','$window', '$q'];

    /* @ngInject */
    function registerService($http, $window, $q) {
        this.registerUser = registerUser;

        function registerUser(userinfo) {
            return $http
                .post(`${window.location.protocol}//${window.location.hostname}:9000/api/register`, userinfo)
                .then(success)
                .catch(failure);

            function success(result) {
                if(result.data.status === 200) {
                    return true;
                }
            }

            function failure(error) {
                return $q.reject(error);
            }
        }
    }

})();

