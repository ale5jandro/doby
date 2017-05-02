(function() {
    'use strict';

    angular
        .module('person')
        .controller('personController', PersonController);

    PersonController.$inject = ['dobieFactory', '$mdDialog', '$mdToast'];

    /* @ngInject */
    function PersonController(dobieFactory, $mdDialog, $mdToast) {
        var p = this;
        var selectedOrg = null;

        p.busqueda = "";
        p.flagNewPerson = false;
        p.flagEditPerson = false;


        activate();

        function activate() {

          cleanController();


            // org.organizations = [
            //      {
            //      "name": "Unknown",
            //      "uri": "http://10.10.7.74:5000/api/v1.0/organization/1"
            //      },
            //      {
            //      "name": "Building Networks",
            //      "uri": "http://10.10.7.74:5000/api/v1.0/organization/2"
            //      },
            //      {
            //      "name": "Datacenter",
            //      "uri": "http://10.10.7.74:5000/api/v1.0/organization/3"
            //      }
            // ]



        }

        p.selectPer = function(item){
          p.selectedItem = {};
          $.extend(p.selectedItem, item );
          p.flagEditPerson = true;
        }

        p.createPer = function(){
          dobieFactory.postPerson(p.newPer.name, p.newPer.card, selectedOrg).then(
            function (response) {
              console.log("RESPONSE", response.data);
              parcialClean();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Persona creada')
                  .hideDelay(3000)
              );
            },
            function(response){
              //vm.srcProfilePhoto = 'app/images/no-profile-img.jpg';
              console.log("ERROR: ", response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent(response.data.error)
                  .hideDelay(3000)
              );
            }
          );
        }

        p.updatePer = function(){
          //averiguo el id de lo q tengo q editar en base a la uri
          var aux = [];
          aux = p.selectedItem.uri.split("/")
          var auxOrg = [];
          auxOrg = p.selectedOrg.uri.split("/")
          var selectedOrg = auxOrg[auxOrg.length-1]


          dobieFactory.putPerson(p.selectedItem.name, p.selectedItem.cardNumber, aux[aux.length-1], selectedOrg).then(
            function (response) {
              console.log("RESPONSE", response.data);
              parcialClean();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Persona actualizada')
                  .hideDelay(3000)
              );
            },
            function(response){
              //vm.srcProfilePhoto = 'app/images/no-profile-img.jpg';
              console.log("ERROR: ", response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent(response.data.error)
                  .hideDelay(3000)
              );
            }
          );
        }

        p.deletePer = function(){

          var confirm = $mdDialog.confirm()
            .title('¿Borrar esta persona?')
            .textContent('¿Esta seguro?')
            .ariaLabel('Delete person')
            .ok('Si')
            .cancel('No');

          $mdDialog.show(confirm).then(function() {
            //se congirma el borrado
            var aux = [];
            aux = p.selectedItem.uri.split("/")
            dobieFactory.deletePerson(aux[aux.length-1]).then(
              function (response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Persona Borrada')
                    .hideDelay(3000)
                );
                parcialClean();
              },
              function(response){
                //vm.srcProfilePhoto = 'app/images/no-profile-img.jpg';
                console.log("ERROR: ", response);
                $mdToast.show(
                $mdToast.simple()
                  .textContent('Error al borrar la persona')
                  .hideDelay(3000)
                );
              }
            );
          }, function() {
            //se cancela el borrado
          });
        }

        p.toggleEditPerson = function(){
          p.flagEditPerson = !p.flagEditPerson;
        }

        p.toggleNewPerson = function(){
          p.flagNewPerson = !p.flagNewPerson;
        }

        p.selectOrg = function(){

          if(p.selectedOrg){
            selectedOrg = p.selectedOrg;
            var aux = [];
            aux = selectedOrg.uri.split("/")
            selectedOrg = aux[aux.length-1]
            dobieFactory.getPersons(selectedOrg).then(
              function (response) {
                p.persons = response.data;
              },
              function(response){
                console.log("ERROR: ", response);
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Error obteniendo personas')
                    .hideDelay(3000)
                );
              }
            );
          }
        }

        function parcialClean(){
          p.selectedItem = null;
          p.newPer = {};

          dobieFactory.getPersons(selectedOrg).then(
            function (response) {
              p.persons = response.data;
            },
            function(response){
              console.log("ERROR: ", response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Error obteniendo personas')
                  .hideDelay(3000)
              );
            }
          );         
        }

        function cleanController(){
          p.selectedItem = null;
          p.organizations = [];
          p.newPer = {};

          dobieFactory.getOrganizations().then(
            function (response) {
              p.organizations = response.data;
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