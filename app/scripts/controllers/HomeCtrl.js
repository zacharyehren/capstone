(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.ZenFactory = ZenFactory;

    this.passTicketId = function(ticketId) {
      $cookies.put('zendeskTicketId', ticketId);
    }

  }

  angular
    .module('capstone')
    .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', HomeCtrl]);
})();
