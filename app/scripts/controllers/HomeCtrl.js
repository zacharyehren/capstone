(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {
      
        ZenFactory.zendeskTicketSubjects().then(function() {
          this.listSubjects = ZenFactory.tickets;
        }.bind(this)
      );
        console.log(this.listSubjects);
        console.log(this.listSubjects.tickets);


        this.user = GoogleOauth;

        this.signOut = function() {
          GoogleOauth.signOut();
        };

    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
