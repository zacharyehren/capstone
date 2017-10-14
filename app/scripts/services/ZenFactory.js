(function() {
  function ZenFactory($http) {

    var ZenFactory = {};

    var client = {
      username: 'thetravelingyeti@gmail.com',
      token: 'SJjEznBljjLwqI95HYSuhpFwPky80dDKB7y0noOl'
    }

    ZenFactory.zendeskTicketSubjects = function() {
      var displayTickets = {
        method: 'GET',
        url: 'https://travelingyeti.zendesk.com/api/v2/tickets',
        headers: {
          'Authorization': 'Basic' + " " + window.btoa(client.username + '/token:' + client.token)
        }
      };

      $http(displayTickets).then(function successCallback(response) {
        ZenFactory.tickets = response.data;
        console.log(ZenFactory.tickets);
      });
  }


  return ZenFactory;
};
  angular
    .module('capstone')
    .factory('ZenFactory', ['$http', ZenFactory]);
})();
