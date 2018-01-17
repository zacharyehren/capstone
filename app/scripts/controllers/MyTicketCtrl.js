(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, $cookies) {
    this.loading = true;

    this.sortByTitle = function() {
      function ticketSubjectSort(a, b) {
        return a.subject.localeCompare(b.subject);
      }
      this.ZenFactory.myTicketData.ticket.sort(ticketSubjectSort);
    }

    var myTicketsHandler = function() {
      this.loading = false;
    }
    myTicketsHandler = myTicketsHandler.bind(this);

    ZenFactory.listMyTickets().then(myTicketsHandler);

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
