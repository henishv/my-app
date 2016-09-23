
angular.module('app').controller('ModifyReportController', ['$scope','$rootScope','$http','$state', function($scope, $rootScope, $http, $state) {
    if(!$rootScope.hasOwnProperty('user')) $state.go('login');
    if($rootScope.user.isloggedIn===false) {
        $state.go('login');
    } else {
        $scope.back = function () {
            $state.go('dashboard');
        };
        $scope.submit = function () {
            $http.post('http://' + window.location.hostname + ':9000/api/saveReport', $scope.editReport)
                .then(function (res) {
                    if (res.status === 200) {
                        $state.go('dashboard');
                    }
                }, function (err) {
                    console.log(err);
                });
        };
        $scope.delete = function () {
            $scope.editReport.reportId = $scope.editReport._id;
            console.log("===",JSON.stringify($scope.editReport));
            let params = $.param({
                reportId : $scope.editReport._id
            });
            $http.delete('http://' + window.location.hostname + ':9000/api/deleteReport?' + params)
                .then(function (res) {
                    if (res.status === 200) {
                        $state.go('dashboard');
                    }
                }, function (err) {
                    console.log(err);
                });
        };
    }
}]);