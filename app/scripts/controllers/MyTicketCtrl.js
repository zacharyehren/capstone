(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, $cookies) {
    this.loading = true;

    this.ascSort = false;
    this.descSort = false;

    var sortAscHandler = function() {
      this.ascSort = true;
      this.descSort = false;
    }

    sortAscHandler = sortAscHandler.bind(this);

    var sortDescHandler = function(){
      this.ascSort = false;
      this.descSort = true;
    }

    sortDescHandler = sortDescHandler.bind(this);


    this.sortByTitle = function() {
      if (this.ascSort == false) {
        function ticketSubjectAscSort(a, b) {
          return a.subject.localeCompare(b.subject);
        }
        this.ZenFactory.myTicketData.ticket.sort(ticketSubjectAscSort);
        sortAscHandler();
      } else if (this.ascSort == true) {
        function ticketSubjectDescSort(a, b) {
          return b.subject.localeCompare(a.subject);
        }
        this.ZenFactory.myTicketData.ticket.sort(ticketSubjectDescSort);
        sortDescHandler();
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
