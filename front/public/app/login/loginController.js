(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$state', 'userinfo'];

    /* @ngInject */
    function LoginController(authService, $state, userinfo) {

        let vm = this;
        vm.userinfo = userinfo;
        vm.submit = authenticate;
        vm.email = "justtest@yopmail.com";
        vm.passcode = "password";

        if(authService.isAuthenticated()) {
            $state.go('dashboard');
        }

        function authenticate() {
            let user = {
                email: vm.email,
                passcode: vm.passcode
            };
            authService.authenticateUser(user)
                .then(success)
                .catch(failure);

            function success(userDetails) {
                $state.go('dashboard');
            };

            function failure(error) {
                console.log("error:", error);
            };
        };
    }
})();

