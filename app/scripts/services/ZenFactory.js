(function() {
  function ZenFactory($http, $cookies) {

    var ZenFactory = {};

    ZenFactory.listTickets = function() {
      var displayTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets'
      };

      $http(displayTickets).then(function successCallback(response) {
        console.log(response);
        ZenFactory.tickets = response.data;
        console.log(ZenFactory.tickets);
      });


    ZenFactory.returnTicket = function() {
      var ticketInfo = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets/' + $cookies.get('zendeskTicketId'),
      }
      $http(ticketInfo).then(function successCallback(response) {
        ZenFactory.ticket = response.data;
        console.log(ZenFactory.ticket);
        return ZenFactory.ticket;
      });
    }

    ZenFactory.ticketRefresh = function() {
      if ($cookies.get('zendeskTicketId') != undefined) {
        ZenFactory.returnTicket();
      }
    }

  }

  return ZenFactory;
};
  angular
    .module('capstone')
    .factory('ZenFactory', ['$http', '$cookies', ZenFactory]);
})();
