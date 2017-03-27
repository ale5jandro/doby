(function() {
  angular
    .module('organization')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
      .state('authorized.organization', {
        url: "/organizacion",
        templateUrl: "authorized/organization/organization.html",
        controller: 'organizationController',
        controllerAs: 'org'
      });
    }
}());