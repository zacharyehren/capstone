(function() {
    function HomeCtrl(GoogleOauth, ZenFactory) {
        this.ticketSubject = ZenFactory.zendeskTicketSubjects();

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
