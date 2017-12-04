(function() {
  function GoogleOauth(ZenFactory) {

    var GoogleOauth = {};
    var userObject;
    var profile;

    function onSignIn(googleUser) {
      profile = googleUser.getBasicProfile();
      domain = googleUser.getHostedDomain();
      if (domain == "sharethrough.com") {
        userObject = {
          name: profile.getName(),
          email: profile.getEmail()
        };
        GoogleOauth.userObject = userObject;
        ZenFactory.listTickets();
      } else {
        alert("You don't have access!");
      };
    };


    GoogleOauth.signOut = function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log('User signed out.');
      });
    }


    window.onSignIn = onSignIn;

    return GoogleOauth;
    };

    angular
      .module('capstone')
      .factory('GoogleOauth', ['ZenFactory', GoogleOauth]);
  })();
