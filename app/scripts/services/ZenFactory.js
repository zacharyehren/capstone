(function() {
  function ZenFactory($http, $cookies) {

    var ZenFactory = {};

    ZenFactory.listTickets = function() {
      var displayTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets'
      };

      return $http(displayTickets).then(function successCallback(response) {
        ZenFactory.unsolvedTickets = response.data;
        var tickets = ZenFactory.unsolvedTickets.ticket;
        var incidents = ZenFactory.unsolvedTickets.incidents;
        for (var i = 0; i < tickets.length; i++) {
          for (var p = 0; p < incidents.length; p++)
          if(tickets[i].id == incidents[p].problem_id) {
            tickets[i].hasIncident = true;
          }
        }
        console.log(ZenFactory.unsolvedTickets);
      });
    };

    ZenFactory.listClosedTickets = function() {
      var displayClosedTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/closed_tickets'
      };

      return $http(displayClosedTickets).then(function successCallback(response) {
        ZenFactory.closedTickets = response.data;
      });
    };

    ZenFactory.listMyTickets = function() {
      var displayMyTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/my_tickets',
        data: {
          submitter_email: $cookies.get('zendeskUserEmail')
        }
      };

      return $http(displayMyTickets).then(function successCallback(response) {
        ZenFactory.myTicketData = response.data;
        console.log(ZenFactory.myTicketData);
      });
    };

      ZenFactory.createTicket = function(subject, comment) {
        var createTicket = {
          method: 'POST',
          url: 'http://localhost:3000/api/tickets',
          data: {
            subject: subject,
            comment_body: comment,
            submitter_email: $cookies.get('zendeskUserEmail'),
            submitter_name: $cookies.get('zendeskUserName')
          }
        };

        $http(createTicket).then(function successCallback(response) {
          ZenFactory.newTicket = response.data;
        });
      };

    ZenFactory.returnTicket = function() {
      var ticketInfo = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets/' + $cookies.get('zendeskTicketId'),
      }
      return $http(ticketInfo).then(function successCallback(response) {
        ZenFactory.ticket = response.data;
      });
    }

    ZenFactory.createComment = function(commentBody) {
      var createComment = {
        method: 'POST',
        url: 'http://localhost:3000/api/tickets/new_comment',
        data: {
          user_email: $cookies.get('zendeskUserEmail'),
          comment_body: commentBody,
          id: $cookies.get('zendeskTicketId')
        }
      };

      $http(createComment).then(function successCallback(response) {
        ZenFactory.newComment = response.data;
      });
    }

    return ZenFactory;

  };


  angular
    .module('capstone')
    .factory('ZenFactory', ['$http', '$cookies', ZenFactory]);
})();
