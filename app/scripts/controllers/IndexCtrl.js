(function() {
  function IndexCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.ZenFactory = ZenFactory;

    this.user = GoogleOauth;

    this.signOut = function() {
      GoogleOauth.signOut();
      this.signedOut = true;
    };

  }

  angular
    .module('capstone')
    .controller('IndexCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', IndexCtrl]);
})();
