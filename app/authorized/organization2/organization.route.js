(function() {
  angular
    .module('organization2')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
      .state('authorized.organization2', {
        url: "/organizacion2",
        templateUrl: "authorized/organization2/organization.html",
        controller: 'organizationController',
        controllerAs: 'org'
      });
    }
}());