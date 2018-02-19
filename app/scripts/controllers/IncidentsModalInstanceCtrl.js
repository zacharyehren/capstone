(function() {
  function IncidentsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies, selectedTicketId, ZenFactoryObject) {

    this.sortClass = "";
    this.selected = "";

    this.selectedTicket = selectedTicketId;
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

    var buildLinkedTicketArray = function() {
        this.linkedTicketArray = [];
        var tickets = this.ZenFactoryObject.tickets;
        var incidents = this.ZenFactoryObject.incidents;
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

    buildLinkedTicketArray();

    this.ZenFactory = ZenFactory;

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
    .controller('IncidentsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'selectedTicketId', 'ZenFactoryObject', IncidentsModalInstanceCtrl]);
})();
