(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.userSignedIn  = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        return false;
      } else {
        return true;
      }
    }
    
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
