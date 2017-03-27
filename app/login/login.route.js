(function() {
  angular
    .module('app.login')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
      .state('login', {
        url: "/ingresar",
        templateUrl: "login/login.html",
        controller: 'LoginController',
        controllerAs: 'lg'
      });
    }
}());