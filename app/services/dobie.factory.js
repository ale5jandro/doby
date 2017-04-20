(function() {
  'use strict';

  angular
  .module('dobie.services')
  .factory('dobieFactory', dobieFactory);

  dobieFactory.$inject = ['urls', '$http'];

    /* @ngInject */
  function dobieFactory(URL, $http) {
    var service = {
    	getOrganizations	: getOrganizations,
      postOrganization  : postOrganization,
      putOrganization   : putOrganization,
      deleteOrganization : deleteOrganization
    };

    return service;


    function getOrganizations() {
      return $http.get(URL.DOBIE + 'organization');
    }

    function postOrganization(name) {
      var newOrg = {
        name: name
      }
      return $http.post(URL.DOBIE + 'organization', newOrg);
    }

    function putOrganization(name, id) {
      var newOrg = {
        name: name
      }
      return $http.put(URL.DOBIE + 'organization/' + id, newOrg);
    }

    function deleteOrganization(id) {
      return $http.delete(URL.DOBIE + 'organization/' + id);
    }

   }
})();