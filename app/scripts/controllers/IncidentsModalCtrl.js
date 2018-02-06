(function(){
  function IncidentsModalCtrl($uibModal) {

    this.openModal = function(ticketId) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/incidentsModal.html',
        controller: 'IncidentsModalInstanceCtrl',
        controllerAs: 'incidentsModal',
        resolve: {
          selectedTicketId: ticketId
        }
      });

    };
  }
  angular
    .module('capstone')
    .controller('IncidentsModalCtrl', ['$uibModal', IncidentsModalCtrl]);
})();
