(function() {
  function TicketCtrl(ZenFactory, $cookies) {

    ZenFactory.ticketRefresh();

    this.ZenFactory = ZenFactory;

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', '$cookies', TicketCtrl]);
})();
