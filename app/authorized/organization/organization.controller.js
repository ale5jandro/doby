(function() {
    'use strict';

    angular
        .module('organization')
        .controller('organizationController', OrganizationController);

    OrganizationController.$inject = [];

    /* @ngInject */
    function OrganizationController() {
        var org = this;

        org.querySearch   = querySearch;
        org.selectedItemChange = selectedItemChange;

        org.organizations = [];

        activate();

        function activate() {

            org.organizations = [
                 {
                 "name": "Unknown",
                 "uri": "http://10.10.7.74:5000/api/v1.0/organization/1"
                 },
                 {
                 "name": "Building Networks",
                 "uri": "http://10.10.7.74:5000/api/v1.0/organization/2"
                 },
                 {
                 "name": "Datacenter",
                 "uri": "http://10.10.7.74:5000/api/v1.0/organization/3"
                 }
            ]



        }


        function querySearch (query) {

          function filtro(el){
            if(el.name.toLowerCase().indexOf(this)>=0){
                return el;
            }

          }

          var results = query ? org.organizations.filter(filtro, query) : org.organizations;
          // if (self.simulateQuery) {
          //   deferred = $q.defer();
          //   $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          //   return deferred.promise;
          // } else {
            return results;
          // }
        }

        function selectedItemChange(item) {
          $log.info('Item changed to ' + JSON.stringify(item));
        }


    }
})();