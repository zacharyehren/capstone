(function() {
  function NewTicketCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.ZenFactory = ZenFactory;
    this.user = GoogleOauth;

    this.createTicket = function() {
      ZenFactory.createTicket(this.subject, this.comment, this.submitter);
    };

  }

  angular
    .module('capstone')
    .controller('NewTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', NewTicketCtrl]);
})();
