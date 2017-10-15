(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.ZenFactory = ZenFactory;

    this.passTicketId = function(ticketId) {
      $cookies.put('zendeskTicketId', ticketId);
      ZenFactory.returnTicket();
    }

    this.user = GoogleOauth;

    this.signOut = function() {
      GoogleOauth.signOut();
    };

  }

  angular
    .module('capstone')
    .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', HomeCtrl]);
})();
