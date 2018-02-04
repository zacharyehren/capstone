(function(){
  function IncidentsModalCtrl($uibModal) {

    this.openModal = function() {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/incidentsModal.html',
        controller: 'IncidentsModalInstanceCtrl',
        controllerAs: 'incidentsModal'
      });

    };
  }
  angular
    .module('capstone')
    .controller('IncidentsModalCtrl', ['$uibModal', IncidentsModalCtrl]);
})();
