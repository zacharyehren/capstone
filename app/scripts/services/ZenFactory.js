(function() {
  function ZenFactory($http, $cookies, Upload) {

    var ZenFactory = {};

    ZenFactory.listTickets = function() {
      var displayTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets'
      };

      $http(displayTickets).then(function successCallback(response) {
        ZenFactory.tickets = response.data;
      });
    };

      ZenFactory.createTicket = function(subject, comment, submitter) {
        var createTicket = {
          method: 'POST',
          url: 'http://localhost:3000/api/tickets',
          data: {
            subject: subject,
            comment_body: comment,
            submitter: submitter
          }
        };

        $http(createTicket).then(function successCallback(response) {
          ZenFactory.newTicket = response.data;
          console.log(ZenFactory.newTicket);
        });
      };

    ZenFactory.returnTicket = function() {
      var ticketInfo = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets/' + $cookies.get('zendeskTicketId'),
      }
      $http(ticketInfo).then(function successCallback(response) {
        ZenFactory.ticket = response.data;
        return ZenFactory.ticket;
      });
    }

    ZenFactory.createComment = function(userEmail, commentBody, file) {
      var createComment = {
        method: 'POST',
        url: 'http://localhost:3000/api/tickets/new_comment',
        data: {
          user_email: userEmail,
          comment_body: commentBody,
          id: $cookies.get('zendeskTicketId'),
          file: Upload.upload({
            file
          })
        }
      };

      $http(createComment).then(function successCallback(response) {
        ZenFactory.newComment = response.data;
        console.log(ZenFactory.newComment);
      });
    }

    ZenFactory.ticketRefresh = function() {
      if ($cookies.get('zendeskTicketId') != undefined) {
        ZenFactory.returnTicket();
      }
    }

    return ZenFactory;

  };


  angular
    .module('capstone')
    .factory('ZenFactory', ['$http', '$cookies', 'Upload', ZenFactory]);
})();
