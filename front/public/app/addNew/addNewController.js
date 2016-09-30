(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddNewController', AddNewController);

    AddNewController.$inject = ['$state', 'authService', 'reportService', 'userinfo'];

    /* @ngInject */
    function AddNewController($state, authService, reportService, userinfo) {
        var vm = this;
        vm.back = back;
        vm.submit = submit;
        vm.details = {
            date: "",
            time: "",
            notes: "",
            userId: userinfo.userId
        };

        activate();

        function activate() {
            if(!authService.isAuthenticated()) {
                $state.go('login');
            }
        }
        function back() {
            $state.go('dashboard');
        }

        function submit() {
            if(vm.details.date && vm.details.time && vm.details.notes && vm.details.userId) {
                reportService.saveReport(vm.details)
                    .then(success)
                    .catch(failure);

                function success(result) {
                    if (result === true) {
                        $state.go('dashboard');
                    }
                }
                function failure(error) {
                    console.log("error:", error);
                }
            }
        }
    }

})();

