(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, $cookies) {
    this.loading = true;

    this.sortByTitle = function() {
      // function ticketSubjectSort(a,b) {
      //   return a.subject > b.subject
      // }
      // this.ZenFactory.myTicketData.ticket.sort(ticketSubjectSort);
      var ticketArray = this.ZenFactory.myTicketData.ticket;
      for (var i = 0; i < ticketArray.length; i++) {
        if((i + 1) < ticketArray.length) {
        ticketArray[i].subject.localeCompare(ticketArray[i + 1].subject)

        }
      }
      debugger;
    }

    var myTicketsHandler = function(){
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
