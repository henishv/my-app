(function () {
    'use strict';

    angular
        .module('app')
        .service('reportService', reportService);

    reportService.$inject = ['$http', '$q'];

    /* @ngInject */
    function reportService($http, $q) {
        this.getReport = getReport;
        this.searchReport = searchReport;
        this.saveReport = saveReport;
        this.deleteReport = deleteReport;

        function success(results) {
            if(results.data.status === 200) {
                let result = {
                    rows: results.data.rows
                };
                return result;
            }
        }

        function error(error) {
            return $q.reject(error);
        }

        function getReport(params) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/getReport`, params)
                .then(success)
                .catch(error);
        };

        function searchReport(params) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/search`, params)
                .then(success)
                .catch(error);
        };

        function operationSuccess(result) {
            if (result.status === 200) {
                return true;
            }
        }

        function operationError(error) {
            return $q.reject(error);
        }
        function saveReport(params) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/saveReport`, params)
                .then(operationSuccess)
                .catch(operationError);
        }

        function deleteReport(params) {
            return $http.delete(`${window.location.protocol}//${window.location.hostname}:9000/api/deleteReport?${params}`)
                .then(operationSuccess)
                .catch(operationError);
        }
    }

})();

