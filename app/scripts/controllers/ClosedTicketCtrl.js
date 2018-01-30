(function() {
  function ClosedTicketCtrl(GoogleOauth, ZenFactory, SortData, $cookies, $location, $anchorScroll, $scope, $stateParams) {
    this.sortClass = "";
    this.selected = "";

    var compileUsers = function(){
      var closedTickets = ZenFactory.closedTickets;
      for (var i = 0; i < closedTickets.ticket.length; i++) {
          var ticketObject = closedTickets.ticket[i];
          var username = closedTickets.users[ticketObject.submitter];
          ticketObject.username = username;

      }
    }

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.ticketSort(sortType, "closedTickets", "ticket");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "closedTickets", "ticket");
      }
    }

    this.loading = true;

    var closedTicketsHandler = function(){
      this.loading = false;
    }

    closedTicketsHandler = closedTicketsHandler.bind(this);

    ZenFactory.listClosedTickets().then(closedTicketsHandler).then(compileUsers);

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
    .controller('ClosedTicketCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', ClosedTicketCtrl]);
})();
