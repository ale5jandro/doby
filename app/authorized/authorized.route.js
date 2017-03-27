(function() {
  angular
    .module('authorized')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
      .state('authorized', {
        url: "/autorizado",
        templateUrl: "authorized/authorized.html",
        controller: 'authorizedController',
        controllerAs: 'au'
      });
    }
}());