(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, SortData, $cookies, $location, $anchorScroll, $scope, $stateParams) {
    this.sortClass = "";
    this.selected = "";

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.myTicketSort(sortType);
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.myTicketSort(sortType);
      }
    }

    this.loading = true;

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

    // Moves view to the top of the page when selecting different tickets
    $scope.$watchCollection('$stateParams', function() {
      $anchorScroll();
    });


  }

  angular
    .module('capstone')
    .controller('MyTicketCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', MyTicketCtrl]);
})();
