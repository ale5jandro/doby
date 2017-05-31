(function() {
    'use strict';

    angular
        .module('authorized')
        .controller('authorizedController', AuthorizedController);

    AuthorizedController.$inject = ['$mdSidenav', 'dobieFactory', '$state', '$mdToast'];

    /* @ngInject */
    function AuthorizedController($mdSidenav, dobieFactory, $state, $mdToast ) {
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

        au.logout = function(){
            dobieFactory.logout().then(
                function(response){
                    $state.go('login');
                },
                function(response){
                    $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.error)
                        .hideDelay(3000)
                    );
                }
            );
        }

        au.showMenu = function(){
            $mdSidenav('left')
                .toggle()
                .then(function () {
            });
        }


    }
})();