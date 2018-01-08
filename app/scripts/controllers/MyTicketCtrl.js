(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, $cookies) {

    ZenFactory.listMyTickets();

    this.ZenFactory = ZenFactory;

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject)
    }

  }

  angular
    .module('capstone')
    .controller('MyTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', MyTicketCtrl]);
})();
