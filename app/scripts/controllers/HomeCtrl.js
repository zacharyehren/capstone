(function() {
    function HomeCtrl(NodeClient) {
        NodeClient.zendeskTickets();
    }

    angular
        .module('capstone')
        .controller('HomeCtrl', ['NodeClient', HomeCtrl]);
})();
