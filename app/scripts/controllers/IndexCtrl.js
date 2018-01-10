(function() {
  function IndexCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.userSignedIn  = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        return true;
      } else {
        return false;
      }
    }

    this.ZenFactory = ZenFactory;

    this.user = GoogleOauth;

    this.signOut = function() {
      GoogleOauth.signOut();
      var cookies = $cookies.getAll();
        angular.forEach(cookies, function (value, key) {
          $cookies.remove(key);
        });
        window.location = '/';
    };

  }

  angular
    .module('capstone')
    .controller('IndexCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', IndexCtrl]);
})();
