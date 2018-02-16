(function(){
  function MyTicketsModalCtrl($uibModal) {

    this.openModal = function(ticketProblemId, ZenFactoryObject) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/myTicketsModal.html',
        controller: 'MyTicketsModalInstanceCtrl',
        controllerAs: 'myTicketsModal',
        resolve: {
          ticketProblemId: ticketProblemId,
          ZenFactoryObject: ZenFactoryObject
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('MyTicketsModalCtrl', ['$uibModal', MyTicketsModalCtrl]);
})();
