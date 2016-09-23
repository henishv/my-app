(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$localStorage', '$scope','$rootScope','$http','$state', 'userinfo'];

    /* @ngInject */
    function DashboardController($localStorage, $scope, $rootScope, $http, $state, userinfo) {
        var vm = this;
        if($localStorage.loginObj && $localStorage.loginObj.isLoggedIn === true) {
            $http.post('http://' + window.location.hostname + ':9000/api/getReport', userinfo)
            .then(function (res) {
                if(res.data.status === 200) {
                    $scope.rows = res.data.rows;
                }
            },function(err) {
                console.log(err);
            });
        } else {
            $state.go('login');
        }
        $rootScope.editReport = "";
        $scope.setCurrentRow = function(index) {
            $rootScope.editReport = $scope.rows[index];
            $rootScope.editReport._id = Object($rootScope.editReport._id);
            $rootScope.editReport.date = new Date($rootScope.editReport.date);
            $state.go('modifyReport');
        };
        $scope.addNew = function () {
            $state.go('addNew');
        };
        $scope.search = function () {
            if($scope.hasOwnProperty("searchData")) {
                if($scope.searchData.hasOwnProperty("fromDt") && $scope.searchData.hasOwnProperty("toDt")) {
                    $scope.searchData.userId = $rootScope.user.userId;
                    $http.post('http://' + window.location.hostname + ':9000/api/search', $scope.searchData)
                        .then(function (res) {
                            if(res.data.status === 200) {
                                $scope.rows = res.data.rows;
                            }
                        }, function(err) {
                            console.log(err);
                        });
                }

            }
        }
    }

})();


//angular.module('app').controller('DashboardController', ['$scope','$rootScope','$http','$state', function($scope, $rootScope, $http, $state) {
//    if(!$rootScope.hasOwnProperty('user')) $state.go('login');
//
//    if($rootScope.user.isloggedIn === false) {
//        $state.go('login');
//    } else {
//        $http.post('http://' + window.location.hostname + ':9000/api/getReport', $rootScope.user)
//            .then(function (res) {
//                if(res.data.status === 200) {
//                    $scope.rows = res.data.rows;
//                }
//            },function(err) {
//                console.log(err);
//            });
//    }
//    $rootScope.editReport = "";
//    $scope.setCurrentRow = function(index) {
//        $rootScope.editReport = $scope.rows[index];
//        $rootScope.editReport._id = Object($rootScope.editReport._id);
//        $rootScope.editReport.date = new Date($rootScope.editReport.date);
//        $state.go('modifyReport');
//    };
//    $scope.addNew = function () {
//        $state.go('addNew');
//    };
//    $scope.search = function () {
//        if($scope.hasOwnProperty("searchData")) {
//            if($scope.searchData.hasOwnProperty("fromDt") && $scope.searchData.hasOwnProperty("toDt")) {
//                $scope.searchData.userId = $rootScope.user.userId;
//                $http.post('http://' + window.location.hostname + ':9000/api/search', $scope.searchData)
//                    .then(function (res) {
//                        if(res.data.status === 200) {
//                            $scope.rows = res.data.rows;
//                        }
//                    }, function(err) {
//                        console.log(err);
//                    });
//            }
//
//        }
//    }
//}]);