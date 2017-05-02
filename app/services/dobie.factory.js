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
      deleteOrganization : deleteOrganization,
      getPersons  : getPersons,
      postPerson  : postPerson,
      putPerson   : putPerson,
      deletePerson : deletePerson
    };

    return service;

    //organizavcion
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


    //person
    function getPersons(id) {
      return $http.get(URL.DOBIE + 'organization/' + id);
    }

    function postPerson(name, card, org) {
      var newPer = {
        name: name,
        cardNumber: card,
        orgId: org,
        visitedOrgId: org
      }
      return $http.post(URL.DOBIE + 'person', newPer);
    }

    function putPerson(name, card, id, orgId) {
      var newOrg = {
        name: name,
        cardNumber: card,
        orgId: orgId,
        visitedOrgId: orgId
      }
      return $http.put(URL.DOBIE + 'person/' + id, newOrg);
    }

    function deletePerson(id) {
      return $http.delete(URL.DOBIE + 'person/' + id);
    }


   }
})();