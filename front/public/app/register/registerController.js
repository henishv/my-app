(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$window','registerService', '$state', 'authService'];

    /* @ngInject */
    function RegisterController($window, registerService, $state, authService) {
        var vm = this;
        vm.user = {};
        vm.submit = submit;

        if(authService.isAuthenticated()) {
            if(authService.isAuthenticated()) {
                $state.go('dashboard');
            }
        }
        function submit() {
            registerService.registerUser(vm.user)
                .then(success)
                .catch(failure);
        }

        function success(result) {
            if(result === true) {
                $window.location.href = '#/registrationSuccess';
            }
        }

        function failure(error) {
            console.log("error:", error);
        }
    }

})();