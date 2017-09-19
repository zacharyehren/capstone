(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {

        this.listSubjects = ZenFactory;
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
