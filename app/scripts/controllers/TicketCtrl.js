(function() {
  function TicketCtrl(ZenFactory, $cookies) {

    ZenFactory.ticketRefresh();
    this.loading = true;

    this.ZenFactory = ZenFactory;

    this.ticketSubject = $cookies.get('zendeskTicketSubject')

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
