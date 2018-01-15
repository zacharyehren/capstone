(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.userSignedOut  = function() {
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

    var signedInTicketReturn = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        ZenFactory.listTickets().then(listTicketsHandler);
      } else {
        listTicketsHandler();
      }
    };

    signedInTicketReturn();

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
