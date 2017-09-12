(function() {
  function NodeClient() {
    var Zendesk = require('zendesk-node-api');

    var NodeClient = {};

    var zendesk = new Zendesk({
      url: 'https://bloc-capstone.zendesk.com',
      email: 'zachehren@gmail.com',
      token: '09C6iAXJzohmkRJY2f9mQB2dW0y70SU3L264KVFr'
    });

    NodeClient.zendeskTickets = function() {
      zendesk.tickets.list().then(function(tickets){
    console.log(tickets);
    });
  }

  return NodeClient;
};
  angular
    .module('capstone')
    .factory('NodeClient', [NodeClient]);
})();
