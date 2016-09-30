(function () {
    'use strict';

    angular
        .module('app')
        .factory('editreport', editreport);

    editreport.$inject = [];

    /* @ngInject */
    function editreport() {
        return  {
            editReport: ''
        };
    }

})();