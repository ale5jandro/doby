(function() {
    'use strict';

    angular
        .module('authorized')
        .controller('authorizedController', AuthorizedController);

    AuthorizedController.$inject = ['$mdSidenav'];

    /* @ngInject */
    function AuthorizedController($mdSidenav ) {
        var au = this;

        au.pages = [
            {
                name: 'Organizations',
                link: 'authorized.organization2'
            },
            {
                name: 'Persons',
                link: 'authorized.person'
            }];

        activate();

        function activate() {

        }

        au.showMenu = function(){
            $mdSidenav('left')
                .toggle()
                .then(function () {
            });
        }


    }
})();