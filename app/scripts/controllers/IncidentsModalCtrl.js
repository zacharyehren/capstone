(function(){
  function IncidentsModalCtrl($uibModal) {

    this.openModal = function(ticketId, ZenFactoryObject) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/incidentsModal.html',
        controller: 'IncidentsModalInstanceCtrl',
        controllerAs: 'incidentsModal',
        resolve: {
          selectedTicketId: ticketId,
          ZenFactoryObject: ZenFactoryObject
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('IncidentsModalCtrl', ['$uibModal', IncidentsModalCtrl]);
})();
