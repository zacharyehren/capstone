(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {
        ZenFactory.zendeskTickets();


        this.signOut = function() {
          GoogleOauth.signOut();
        };

    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
