(function() {
  function ClosedTicketCtrl(GoogleOauth, ZenFactory, $cookies) {

    ZenFactory.listClosedTickets();
    // this.ZenFactory = ZenFactory;

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject)
    }

  }

  angular
    .module('capstone')
    .controller('ClosedTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', ClosedTicketCtrl]);
})();
