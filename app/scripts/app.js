(function() {
  function config($locationProvider, $stateProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html'
      })
      .state('ticket', {
        url: '/ticket',
        controller: 'TicketCtrl as ticket',
        templateUrl: '/templates/ticket.html'
      });
  }

  angular
    .module('capstone', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngRoute'])
    .config(config);
})();
