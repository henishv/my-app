
angular.module('app').controller('AddNewController', ['$scope','$rootScope','$http','$state', function($scope, $rootScope, $http, $state) {
    if(!$rootScope.hasOwnProperty('user')) $state.go('login');
    if($rootScope.user.isloggedIn===false) {
        $state.go('login');
    } else {
        $scope.details = {
            date: "",
            time: "",
            notes: "",
            userId: $rootScope.user.userId
        };
        $scope.back = function () {
            $state.go('dashboard');
        };
        $scope.submit = function () {
            $http.post('http://' + window.location.hostname + ':9000/api/saveReport', $scope.details)
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

