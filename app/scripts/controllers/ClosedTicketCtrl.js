(function() {
  function ClosedTicketCtrl(GoogleOauth, ZenFactory, $cookies, $location, $anchorScroll, $scope, $stateParams) {

    this.loading = true;

    var closedTicketsHandler = function(){
      this.loading = false;
    }

    closedTicketsHandler = closedTicketsHandler.bind(this);

    ZenFactory.listClosedTickets().then(closedTicketsHandler);

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
    .controller('ClosedTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', ClosedTicketCtrl]);
})();
