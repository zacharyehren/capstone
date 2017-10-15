(function() {
  function TicketCtrl(ZenFactory) {

    this.ZenFactory = ZenFactory;
    console.log(this.ZenFactory);

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', TicketCtrl]);
})();
