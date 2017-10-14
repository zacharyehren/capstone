(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {

      ZenFactory.zendeskTicketSubjects();

        this.user = GoogleOauth;

        this.signOut = function() {
          GoogleOauth.signOut();
        };

    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
