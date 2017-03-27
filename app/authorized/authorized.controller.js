(function() {
    'use strict';

    angular
        .module('authorized')
        .controller('authorizedController', AuthorizedController);

    AuthorizedController.$inject = [];

    /* @ngInject */
    function AuthorizedController() {
        var au = this;

        activate();

        function activate() {

        }


    }
})();