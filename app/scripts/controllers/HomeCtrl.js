(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {
        ZenFactory.zendeskTickets();

        // this.listSubjects = ZenFactory.subjects;
        //
        // console.log(this.listSubjects);

        this.signOut = function() {
          GoogleOauth.signOut();
        };

    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', HomeCtrl]);
})();
