(function() {
  function TicketCtrl(ZenFactory, $cookies, $location, $anchorScroll, $scope, $stateParams) {

    this.loading = true;

    var listTicketHandler = function(){
      this.loading = false;
    }

    listTicketHandler = listTicketHandler.bind(this);
    ZenFactory.returnTicket().then(listTicketHandler);

    this.ZenFactory = ZenFactory;

    this.ticketSubject = $cookies.get('zendeskTicketSubject')

    ZenFactory.ticketRefresh();

    this.createComment = function() {
      this.submitted = true;
      ZenFactory.createComment(this.commentBody);
      location.reload();
    };

    // Moves view to the top of the page when selecting different tickets
    $scope.$watchCollection('$stateParams', function() {
      $anchorScroll();
   });

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', TicketCtrl]);
})();
