(function() {
  function ZenFactory() {
    var Zendesk = require('zendesk-node-api');

    var ZenFactory = {};

    var zendesk = new Zendesk({
      url: 'https://bloc-capstone.zendesk.com',
      email: 'zachehren@gmail.com',
      token: '09C6iAXJzohmkRJY2f9mQB2dW0y70SU3L264KVFr'
    });

    ZenFactory.zendeskTickets = function() {
      zendesk.tickets.list().then(function(tickets){
      console.log(tickets);
    });
  }

  return ZenFactory;
};
  angular
    .module('capstone')
    .factory('ZenFactory', [ZenFactory]);
})();