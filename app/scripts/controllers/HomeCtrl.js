(function() {
  function HomeCtrl(GoogleOauth) {
    console.log(GoogleOauth.userObject);

    this.signOut = function() {
      GoogleOauth.signOut();
    };


  }

  angular
    .module('capstone')
    .controller('HomeCtrl', ['GoogleOauth', HomeCtrl]);
})();
