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
      deletePerson : deletePerson,
      login        : login
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

    function login(us, pass){
      var body = {
        user:us,
        pass:pass
      }
// Create Base64 Object
      // var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

      // var encodedString = Base64.encode(us+':'+'pass');
      // return $http.get('http://192.168.163.133:5000/api/v1.0/login', {
      //   headers: {'Authorization': 'Basic '+encodedString}
      // });
      return $http.post(URL.LOGIN, body);
    }


   }
})();