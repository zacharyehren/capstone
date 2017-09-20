(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {

        ZenFactory.zendeskTicketSubjects().then(function() {
          this.listSubjects = ZenFactory.tickets;
          console.log(this.listSubjects);
        }.bind(this)
      );
        console.log(this.listSubjects);


        this.user = GoogleOauth;

        this.signOut = function() {
          GoogleOauth.signOut();
        };

    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
