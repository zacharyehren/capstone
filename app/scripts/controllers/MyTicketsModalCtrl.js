(function(){
  function MyTicketsModalCtrl($uibModal) {

    this.openModal = function(selectedTicket, ZenFactoryObject) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/myTicketsModal.html',
        controller: 'MyTicketsModalInstanceCtrl',
        controllerAs: 'myTicketsModal',
        resolve: {
          selectedTicket: selectedTicket,
          ZenFactoryObject: ZenFactoryObject
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('MyTicketsModalCtrl', ['$uibModal', MyTicketsModalCtrl]);
})();
