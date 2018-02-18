(function() {
  function MyTicketsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies, selectedTicket, ZenFactoryObject) {

    this.sortClass = "";
    this.selected = "";
    this.ZenFactory = ZenFactory;

    this.selectedTicket = selectedTicket;
    this.ZenFactoryObject = ZenFactoryObject;

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        this.linkedTicketArray.sort(function(a, b) {
          return a[sortType].localeCompare(b[sortType]);
        });
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        this.linkedTicketArray.sort(function(a, b) {
          return b[sortType].localeCompare(a[sortType]);
        });
      }
    }

    var returnLinkedTickets = function() {
      this.linkedTicketArray = [];
      var tickets = this.ZenFactoryObject.ticket;
      for (var i = 0; i < tickets.length; i++) {
        if (this.selectedTicket.type == "incident") {
          if (this.selectedTicket.problem_id == tickets[i].id) {
            this.linkedTicketArray.push(tickets[i]);
          }
        } else {
          if (this.selectedTicket.id == tickets[i].problem_id) {
            this.linkedTicketArray.push(tickets[i]);
          }
        }
      }
    }

    returnLinkedTickets = returnLinkedTickets.bind(this);

    returnLinkedTickets();

    this.ticketSubject = $cookies.get('zendeskTicketSubject');

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject);
      $uibModalInstance.close();
    }

    this.closeModal = function() {
      $uibModalInstance.dismiss();
    };

  }

  angular
    .module('capstone')
    .controller('MyTicketsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'selectedTicket', 'ZenFactoryObject', MyTicketsModalInstanceCtrl]);
})();
