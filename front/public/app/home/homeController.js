
angular.module('app').controller('HeaderController', ['$scope', 'userinfo', function($scope, userinfo) {
    $scope.userinfo = userinfo;

    $scope.toDisplay = function() {
        if($scope.userinfo.isloggedIn === true) {
            return true;
        }else {
            return false;
        }
    };
    $scope.logout = function() {
        $scope.userinfo.isLoggedIn = false;
    }
}]);