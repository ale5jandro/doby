(function() {
  angular
    .module('person')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
      .state('authorized.person', {
        url: "/persona",
        templateUrl: "authorized/person/person.html",
        controller: 'personController',
        controllerAs: 'p'
      });
    }
}());