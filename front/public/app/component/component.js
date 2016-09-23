(function () {
    'use strict';

    angular.module('app',[]);

    angular.module('app').controller('ParentController',function($scope) {

        $scope.login = login;

        function login(email, password) {
            console.log("email:", email);
            console.log("password:", password);
            $scope.login.error = !$scope.login.error;
        }
    });

    let componentOptions = {
        bindings: {
            title: '<',
            loginClick : '&',
            errorMsg: '=',
            showError: '='
        },
        controllerAs : 'login',
        controller: function doLogin() {
            this.submitClick = function () {
                if(this.email) {
                    this.loginClick(this.email, this.password);
                }
            }
        },
        templateUrl:'/app/component/component.html'
    };

    angular.module('app').component('loginComponent', componentOptions);
})();