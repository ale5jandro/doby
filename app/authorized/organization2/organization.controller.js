(function() {
    'use strict';

    angular
        .module('organization2')
        .controller('organizationController', OrganizationController);

    OrganizationController.$inject = ['dobieFactory', '$mdDialog', '$mdToast'];

    /* @ngInject */
    function OrganizationController(dobieFactory, $mdDialog, $mdToast) {
        var org = this;

        org.busqueda = "";

        activate();

        function activate() {

          cleanController();




        }

        org.selectOrg = function(item){
          org.selectedItem = item;
        }

        org.createOrg = function(){
          dobieFactory.postOrganization(org.newOrg.name).then(
            function (response) {
              // console.log("RESPONSE", response.data);
              cleanController();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Organizacion creada')
                  .hideDelay(3000)
              );
            },
            function(response){
              //vm.srcProfilePhoto = 'app/images/no-profile-img.jpg';
              console.log("ERROR: ", response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Error al crear la organizacion')
                  .hideDelay(3000)
              );
            }
          );
        }

        org.updateOrg = function(){
          //averiguo el id de lo q tengo q editar en base a la uri
          var aux = [];
          aux = org.selectedItem.uri.split("/")
          dobieFactory.putOrganization(org.selectedItem.name, aux[aux.length-1]).then(
            function (response) {
              // console.log("RESPONSE", response.data);
              cleanController();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Organizacion actualizada')
                  .hideDelay(3000)
              );
            },
            function(response){
              //vm.srcProfilePhoto = 'app/images/no-profile-img.jpg';
              console.log("ERROR: ", response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Error al actualizar la organizacion')
                  .hideDelay(3000)
              );
            }
          );
        }

        org.deleteOrg = function(){

          var confirm = $mdDialog.confirm()
            .title('Borrar esta organización borrara a todas laspersonas en ella')
            .textContent('¿Esta seguro?')
            .ariaLabel('Delete organization')
            .ok('Si')
            .cancel('No');

          $mdDialog.show(confirm).then(function() {
            //se congirma el borrado
            var aux = [];
            aux = org.selectedItem.uri.split("/")
            dobieFactory.deleteOrganization(aux[aux.length-1]).then(
              function (response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Organizacion Borrada')
                    .hideDelay(3000)
                );
                cleanController();
              },
              function(response){
                //vm.srcProfilePhoto = 'app/images/no-profile-img.jpg';
                console.log("ERROR: ", response);
                $mdToast.show(
                $mdToast.simple()
                  .textContent('Error al borrar la organizacion')
                  .hideDelay(3000)
                );
              }
            );
          }, function() {
            //se cancela el borrado
          });
        }

        function cleanController(){
          org.selectedItem = null;
          org.organizations = [];
          org.newOrg = {};

          dobieFactory.getOrganizations().then(
            function (response) {
              org.organizations = response.data;
            },
            function(response){
              console.log("ERROR: ", response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Error obteniendo organizaciones')
                  .hideDelay(3000)
              );
            }
          );
        }


    }
})();