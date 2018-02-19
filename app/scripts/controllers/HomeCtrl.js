(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, SortData, $cookies, $location, $anchorScroll, $scope, $stateParams) {
    this.sortClass = "";
    this.selected = "";

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.ticketSort(sortType, "unsolvedTickets", "tickets");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "unsolvedTickets", "tickets");
      }
    }

    this.userSignedOut  = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        return false;
      } else {
        return true;
      }
    }

    this.loading = true;

    var listTicketsHandler = function(){
      this.loading = false;
    }

    listTicketsHandler = listTicketsHandler.bind(this);

    var signedInTicketReturn = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        ZenFactory.listTickets().then(listTicketsHandler);
      } else {
        listTicketsHandler();
      }
    };

    signedInTicketReturn();

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
    .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', HomeCtrl]);
})();
