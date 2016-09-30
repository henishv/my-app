(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$localStorage', 'userinfo', 'authService'];

    /* @ngInject */
    function HeaderController($localStorage, userinfo, authService) {
        var vm = this;
        vm.userinfo = userinfo;
        vm.toDisplay = toDisplay;
        vm.logout = logout;

        activate();

        function activate() {
            if(authService.isAuthenticated()) {
                authService.setUserInfo();
            }
        }
        function toDisplay() {
            if(vm.userinfo.isLoggedIn === true) {
                return true;
            }else {
                return false;
            }
        }

        function logout() {
            vm.userinfo.isLoggedIn = false;
            vm.userinfo.firstName = '';
            vm.userinfo.lastName = '';
            vm.userinfo.userId = '';
            delete $localStorage.loginObj;
        }
    }

})();