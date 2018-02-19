(function(){
  function LinkedTicketsModalCtrl($uibModal) {

    this.openModal = function(ticketId, ZenFactoryObject) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/linkedTicketsModal.html',
        controller: 'LinkedTicketsModalInstanceCtrl',
        controllerAs: 'linkedTicketsModal',
        resolve: {
          selectedTicketId: ticketId,
          ZenFactoryObject: ZenFactoryObject
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('LinkedTicketsModalCtrl', ['$uibModal', LinkedTicketsModalCtrl]);
})();
