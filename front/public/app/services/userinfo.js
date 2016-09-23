(function () {
    'use strict';

    angular
        .module('app')
        .factory('userinfo', userinfo);

    userinfo.$inject = [];

    /* @ngInject */
    function userinfo() {
        return  {
            firstName : '',
            lastName: '',
            isLoggedIn: false
        };
    }

})();

