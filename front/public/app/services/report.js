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

        function getReport(params) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/getReport`, params)
                .then(function (res) {
                    if(res.data.status === 200) {
                        let result = {
                            rows: res.data.rows
                        };
                        return result;
                    }
                },function(err) {
                    return $q.reject(err);
                });
        };

        function searchReport(params) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/search`, params)
                .then(function (res) {
                    if(res.data.status === 200) {
                        let result = {
                            rows: res.data.rows
                        };
                        return result;
                    }
                }, function(err) {
                    return $q.reject(err);
                });
        };

        function saveReport(params) {
            return $http.post(`${window.location.protocol}//${window.location.hostname}:9000/api/saveReport`, $scope.details)
                .then(function (res) {
                    if (res.status === 200) {
                        return true;
                    }
                }, function (err) {
                    return $q.reject(err);
                });
        }

        function deleteReport(params) {
            return $http.delete(`${window.location.protocol}//${window.location.hostname}:9000/api/deleteReport?${params}`)
                .then(function (res) {
                    if (res.status === 200) {
                        return true;
                    }
                }, function (err) {
                    return $q.reject(err);
                });
        }
    }

})();

