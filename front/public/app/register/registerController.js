
angular.module('app').controller('RegisterController', ['$scope','$http','$window', function($scope, $http, $window) {
    $scope.submit = function() {
        return $http
            .post('http://' + window.location.hostname + ':9000/api/register', $scope.user)
            .then(function (res) {
                if(res.data.status === 200) {
                    $window.location.href = '#/registrationSuccess';
                }
            },function(err) {
                console.log(err);
            });
    };
}]);