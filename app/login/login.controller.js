(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['dobieFactory', '$mdToast', '$state'];

    /* @ngInject */
    function LoginController(dobieFactory, $mdToast, $state) {
        var lg = this;

        activate();

        function activate() {

        }

        lg.login = function(){
            console.log("mando")
            dobieFactory.login(lg.username, lg.password).then(
                function(response){
                    $state.go('authorized.organization2');
                },
                function(response){
                    console.log("ERROR: ", response);
                    $mdToast.show(
                    $mdToast.simple()
                        .textContent("Error al ingresar, revise sus datos")
                        .hideDelay(3000)
                    );
                }
            );
        }


    }
})();