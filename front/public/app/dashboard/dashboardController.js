(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['authService', '$state', 'userinfo', 'editreport', 'reportService'];

    /* @ngInject */
    function DashboardController(authService, $state, userinfo, editreport, reportService) {

        var vm = this;
        vm.searchData = {};
        vm.search = search;
        vm.addNew = addNew;
        vm.setCurrentRow = setCurrentRow;

        activate();

        function activate() {
            if(authService.isAuthenticated()) {
                if(userinfo.userId != authService.getUserInfo().userId) {
                    authService.setUserInfo();
                }
                reportService.getReport(userinfo)
                    .then(success)
                    .catch(failure);
            } else {
                $state.go('login');
            }
            function success(result) {
                vm.rows = result.rows;
            };

            function failure(error) {
                console.log("error:", error);
            };
        };

        function search() {
            if(vm.hasOwnProperty("searchData")) {
                if(vm.searchData.hasOwnProperty("fromDt") && vm.searchData.hasOwnProperty("toDt")) {
                    vm.searchData.userId = userinfo.userId;
                    reportService.searchReport(vm.searchData)
                        .then(success)
                        .catch(failure);
                }
            }
            function success(result) {
                vm.rows = result.rows;
            }

            function failure(error) {
                console.log("error:", error);
            }
        };

        function addNew() {
            $state.go('addNew');
        };

        function setCurrentRow(index) {
            editreport.editReport = vm.rows[index];
            editreport.editReport._id = Object(editreport.editReport._id);
            editreport.editReport.date = new Date(editreport.editReport.date);
            $state.go('modifyReport');
        };

    }

})();