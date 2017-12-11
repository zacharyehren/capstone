(function() {
  function NewTicketCtrl(GoogleOauth, ZenFactory, $cookies, $location) {

    this.ZenFactory = ZenFactory;
    this.user = GoogleOauth;
    this.submitter = $cookies.get('zendeskUserEmail');

    this.createTicket = function() {
      ZenFactory.createTicket(this.subject, this.comment, this.submitter);
       $location.path('/');
    };

  }

  angular
    .module('capstone')
    .controller('NewTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', '$location', NewTicketCtrl]);
})();
