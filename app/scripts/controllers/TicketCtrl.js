(function() {
  function TicketCtrl(ZenFactory, $cookies) {

    ZenFactory.ticketRefresh();

    this.ZenFactory = ZenFactory;

    this.createComment = function() {
      ZenFactory.createComment(this.userEmail, this.commentBody);
    };

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', '$cookies', TicketCtrl]);
})();
