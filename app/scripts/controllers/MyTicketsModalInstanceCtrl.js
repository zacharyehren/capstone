(function() {
  function MyTicketsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies, selectedTicket) {

    this.sortClass = "";
    this.selected = "";
    this.ZenFactory = ZenFactory;

    this.selectedTicket = selectedTicket;

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

    var buildLinkedTicketArray = function() {
        this.linkedTicketArray = [];
        var tickets = ZenFactory.unsolvedTickets.ticket;
        var incidents = ZenFactory.unsolvedTickets.incidents;
        if (this.selectedTicket.type == "incident") {
          for (var i = 0; i < tickets.length; i++) {
            if (this.selectedTicket.problem_id == tickets[i].id) {
              this.linkedTicketArray.push(tickets[i]);
            }
          }
        } else {
          for (var i = 0; i < incidents.length; i++) {
            if (this.selectedTicket.id == incidents[i].problem_id) {
              this.linkedTicketArray.push(incidents[i]);
            }
          }
        }
      }

    buildLinkedTicketArray = buildLinkedTicketArray.bind(this);

    var returnLinkedTickets = function() {
      ZenFactory.listTickets().then(buildLinkedTicketArray)
    }

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
    .controller('MyTicketsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'selectedTicket', MyTicketsModalInstanceCtrl]);
})();
