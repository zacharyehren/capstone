(function() {
  function TicketCtrl(ZenFactory, $cookies) {

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

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', '$cookies', TicketCtrl]);
})();
