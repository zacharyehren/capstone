(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {

        this.listSubjects = ZenFactory;
        console.log(this.listSubjects);

        this.signOut = function() {
          GoogleOauth.signOut();
        };

    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
