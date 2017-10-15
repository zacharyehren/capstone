(function() {
  function HomeCtrl(GoogleOauth, ZenFactory) {

    this.ZenFactory = ZenFactory;

    this.passTicketId = function(ticketId) {
      ZenFactory.returnTicket(ticketId);
      console.log(ticketId);
    }

    this.user = GoogleOauth;

    this.signOut = function() {
      GoogleOauth.signOut();
    };

  }

  angular
    .module('capstone')
    .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
