(function() {
  function ZenFactory($http) {

    var ZenFactory = {};

    var client = {
      username: 'thetravelingyeti@gmail.com',
      token: 'SJjEznBljjLwqI95HYSuhpFwPky80dDKB7y0noOl'
    }

    ZenFactory.listTickets = function() {
      var displayTickets = {
        method: 'GET',
        url: 'https://travelingyeti.zendesk.com/api/v2/tickets',
        headers: {
          'Authorization': 'Basic ' + window.btoa(client.username + '/token:' + client.token)
        }
      };

      $http(displayTickets).then(function successCallback(response) {
        ZenFactory.tickets = response.data;
        console.log(ZenFactory.tickets);
      });


    ZenFactory.returnTicket = function(ticketId) {
      var ticketInfo = {
        method: 'GET',
        url: 'https://travelingyeti.zendesk.com/api/v2/tickets/' + ticketId,
        headers: {
          'Authorization': 'Basic ' + window.btoa(client.username + '/token:' + client.token)
        }
      }
      $http(ticketInfo).then(function successCallback(response) {
        ZenFactory.ticket = response.data;
        return ZenFactory.ticket;
      });
    }
  }

  return ZenFactory;
};
  angular
    .module('capstone')
    .factory('ZenFactory', ['$http', ZenFactory]);
})();
