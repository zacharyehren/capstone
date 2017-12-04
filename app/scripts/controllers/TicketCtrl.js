(function() {
  function TicketCtrl(ZenFactory, $cookies) {

    ZenFactory.ticketRefresh();

    this.ZenFactory = ZenFactory;

    this.ticketSubject = $cookies.get('zendeskTicketSubject')

    this.createComment = function() {
      this.submitted = true;
      ZenFactory.createComment(this.userEmail, this.commentBody);
      // location.reload();
    };

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', '$cookies', TicketCtrl]);
})();
