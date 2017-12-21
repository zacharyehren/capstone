(function() {
  function NewTicketCtrl(GoogleOauth, ZenFactory, $cookies, $location) {

    this.ZenFactory = ZenFactory;
    this.user = GoogleOauth;

    this.createTicket = function() {
      ZenFactory.createTicket(this.subject, this.comment);
       $location.path('/');
    };

  }

  angular
    .module('capstone')
    .controller('NewTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', '$location', NewTicketCtrl]);
})();
