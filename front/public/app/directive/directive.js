angular.module('app',[]);
var dataJson = [{
                    email:'henish@g.com',
                    name: 'Henish',
                    place: 'Paris',
                    url:'assets/images/paris.jpg'
                },
                {
                    email: 'ashok@g.com',
                    name: 'Ashok',
                    place: 'London',
                    url: 'assets/images/london.jpg'
                },
                {
                    email: 'rajesh@g.com',
                    name: 'Rajesh',
                    place: 'Dubai',
                    url: 'assets/images/dubai.jpg'
                },
                {
                    email: 'pravin@g.com',
                    name: 'Pravin',
                    place: 'New York',
                    url: 'assets/images/newyork.jpg'
                }
               ];
angular.module('app').directive('profilePicture', function() {
    return {
        restrict: 'E',
        replace: true,
        template : "<img height='300' width='300'/>",
        link: function (scope, element, attrs, controller) {
            attrs.$observe('email', function(newValue, oldValue) {
                if(newValue != oldValue) {
                    dataJson.forEach(function (item) {
                        if(newValue == item.email) {
                            attrs.$set('src',item.url);
                            scope.user.name = item.name;
                            scope.user.place = item.place;
                        }
                    })
                }
            })
        }
    };
});