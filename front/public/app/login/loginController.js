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

        function authenticate() {
            let user = {
                email: vm.email,
                passcode: vm.passcode
            };
            authService.authenticateUser(user)
                .then(success)
                .catch(failed);

            function success(userDetails) {
                vm.userinfo.firstName = userDetails.firstName;
                vm.userinfo.lastName = userDetails.lastName;
                vm.userinfo.isLoggedIn = userDetails.isLoggedIn;
                vm.userinfo.userId = userDetails.userId;
                $state.go('dashboard');
            };

            function failed(error) {
                console.log("error:", error);
            };
        };
    }
})();


//angular.module('app').controller('LoginController', ['authService','$scope','$http', '$rootScope', '$state', function(authService, $scope, $http, $rootScope, $state) {
//    console.log("=====1");
//    $rootScope.message = {
//        show : false
//    };
//    this.user = {
//        email  : '',
//        passcode :''
//    };
//    console.log("=====2");
//    $rootScope.user = {
//        firstName:"",
//        lastName: "",
//        isloggedIn: false,
//        userId: ""
//    };
//    console.log("=====3");
//    $scope.submit = function() {
//        //$http.post('http://' + window.location.hostname + ':9000/api/auth', $scope.user)
//        //    .then(function (res) {
//        //        $rootScope.message.show = false;
//        //        $rootScope.user.firstName = res.data.firstName;
//        //        $rootScope.user.lastName = res.data.lastName;
//        //        $rootScope.user.isloggedIn = true;
//        //        $rootScope.user.userId = res.data.userId;
//        //        $state.go('dashboard');
//        //
//        //    },function(err) {
//        //        if(err.data.status === 401) {
//        //            $rootScope.message.show = true;
//        //        }
//        //    });
//        console.log("=====4");
//        authService.authenticateUser(this.user)
//            .then(success)
//            .catch(failed);
//
//        function success(userDetails) {
//            console.log("success:",userDetails);
//        }
//        function failed(error) {
//            console.log("error:", error);
//        }
//    };
//}]);

