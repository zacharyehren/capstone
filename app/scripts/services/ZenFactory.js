(function() {
  function ZenFactory($http, $cookies) {

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


// Comments are the responses within the ticket 
      ZenFactory.returnComments = function() {
        var commentInfo = {
          method: 'GET',
          url: 'https://travelingyeti.zendesk.com/api/v2/tickets/' + $cookies.get('zendeskTicketId') + '/comments',
          headers: {
            'Authorization': 'Basic ' + window.btoa(client.username + '/token:' + client.token)
          }
        }
        $http(commentInfo).then(function successCallback(response) {
          ZenFactory.comment = response.data;
          console.log(ZenFactory.comment);
        });
      }


    ZenFactory.returnTicket = function() {
      var ticketInfo = {
        method: 'GET',
        url: 'https://travelingyeti.zendesk.com/api/v2/tickets/' + $cookies.get('zendeskTicketId'),
        headers: {
          'Authorization': 'Basic ' + window.btoa(client.username + '/token:' + client.token)
        }
      }
      $http(ticketInfo).then(function successCallback(response) {
        ZenFactory.ticket = response.data;
        console.log(ZenFactory.ticket);
        ZenFactory.returnComments();
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
