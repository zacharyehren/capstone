(function() {
  function MyTicketsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies, ticketProblemId, ZenFactoryObject) {

    this.sortClass = "";
    this.selected = "";

    this.selectedTicket = ticketProblemId;
    this.ZenFactoryObject = ZenFactoryObject;

    // this.sortData = function(sortType) {
    //   if (this.selected != sortType) {
    //     this.sortClass = "";
    //   }
    //   this.selected = sortType;
    //   if (this.sortClass == "" || this.sortClass == "down-carat") {
    //     this.sortClass = "up-carat";
    //     this.incidentsArray.sort(function(a, b) {
    //       return a[sortType].localeCompare(b[sortType]);
    //     });
    //   } else if (this.sortClass == "up-carat") {
    //     this.sortClass = "down-carat";
    //     this.incidentsArray.sort(function(a, b) {
    //       return b[sortType].localeCompare(a[sortType]);
    //     });
    //   }
    // }

    var returnProblems = function() {
      this.problemsArray = [];
      ZenFactory.listTickets();
      var problems = this.ZenFactoryObject.ticket;
      for (var i = 0; i < problems.length; i++){
        if (this.selectedTicket == problems[i].id) {
          this.problemsArray.push(problems[i]);
        }
      }
      console.log(this.problemsArray);
    }

    returnProblems = returnProblems.bind(this);

    returnProblems();

    this.ZenFactory = ZenFactory;

    // this.ticketSubject = $cookies.get('zendeskTicketSubject');
    //
    // this.passTicketInfo = function(ticketId, ticketSubject) {
    //   $cookies.put('zendeskTicketId', ticketId);
    //   $cookies.put('zendeskTicketSubject', ticketSubject);
    //   $uibModalInstance.close();
    // }

    this.closeModal = function() {
      $uibModalInstance.dismiss();
    };

  }

  angular
    .module('capstone')
    .controller('MyTicketsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'ticketProblemId', 'ZenFactoryObject', MyTicketsModalInstanceCtrl]);
})();
