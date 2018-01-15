(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.userSignedIn  = function() {
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

    ZenFactory.listTickets().then(listTicketsHandler);

    this.ZenFactory = ZenFactory;

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject)
    }

  }

  angular
    .module('capstone')
    .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', HomeCtrl]);
})();
