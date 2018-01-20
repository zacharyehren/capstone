(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, $cookies) {
    this.loading = true;

    this.sort = null;

    this.sortClass = "";


    this.sortByTitle = function() {
      if (this.sort == null || this.sort == "desc") {
        this.sort = "asc";
        this.sortClass = "up-carat";
        this.ZenFactory.myTicketData.ticket.sort(function(a, b) {
          return a.subject.localeCompare(b.subject);
        });
      } else if (this.sort == "asc") {
        this.sort = "desc";
        this.sortClass = "down-carat";
        this.ZenFactory.myTicketData.ticket.sort(function (a, b) {
          return b.subject.localeCompare(a.subject);
        });
      }
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
