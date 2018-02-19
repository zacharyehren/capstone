(function(){
  function MyTicketsModalCtrl($uibModal) {

    this.openModal = function(selectedTicket) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/myTicketsModal.html',
        controller: 'MyTicketsModalInstanceCtrl',
        controllerAs: 'myTicketsModal',
        resolve: {
          selectedTicket: selectedTicket
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('MyTicketsModalCtrl', ['$uibModal', MyTicketsModalCtrl]);
})();
