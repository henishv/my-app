(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModifyReportController', ModifyReportController);

    ModifyReportController.$inject = ['$state', 'editreport', 'authService', 'reportService'];

    /* @ngInject */
    function ModifyReportController($state, editreport, authService, reportService) {
        let vm = this;
        vm.back = back;
        vm.submit = submit;
        vm.delete = deleteReport;

        activate();

        function activate() {
            if(authService.isAuthenticated()) {
                vm.editReport = editreport.editReport;
            } else {
                $state.go('login');
            }
        }
        function back() {
            $state.go('dashboard');
        };
        function submit() {
            reportService.saveReport(vm.editReport)
                .then(success)
                .catch(error);
        }
        function deleteReport() {
            let params = $.param({reportId : vm.editReport._id});
            reportService.deleteReport(params)
                .then(success)
                .catch(error);
        }
        function success(result) {
            if (result === true) {
                $state.go('dashboard');
            }
        }

        function error(error) {
            console.log("error:", error);
        }
    }
})();