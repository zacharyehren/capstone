(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, SortData, $cookies) {
    this.loading = true;

    this.sortClass = "";

    this.sortData = function(sortType) {
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.myTicketSort(sortType);
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.myTicketSort(sortType);
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
    .controller('MyTicketCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', MyTicketCtrl]);
})();
