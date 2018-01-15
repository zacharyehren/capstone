(function() {
  function GoogleOauth(ZenFactory, $cookies) {

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
        $cookies.put('zendeskUserEmail', userObject.email);
        $cookies.put('zendeskUserName', userObject.name);
      } else {
        alert("Only Sharethrough emails have access.");
        GoogleOauth.signOut();
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
      .factory('GoogleOauth', ['ZenFactory', '$cookies', GoogleOauth]);
  })();
