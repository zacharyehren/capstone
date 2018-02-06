(function() {
  function IncidentsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies, selectedTicketId) {

    this.sortClass = "";
    this.selected = "";

    this.selectedTicket = selectedTicketId;

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        this.incidentsArray.sort(function(a, b) {
          return a[sortType].localeCompare(b[sortType]);
        });
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        this.incidentsArray.sort(function(a, b) {
          return b[sortType].localeCompare(a[sortType]);
        });
      }
    }

    var returnIncidents = function() {
      this.incidentsArray = [];
      var incidents = ZenFactory.unsolvedTickets.incidents;
      for (var i = 0; i < incidents.length; i++){
        if (this.selectedTicket == incidents[i].problem_id) {
          this.incidentsArray.push(incidents[i]);
        }
      }
    }

    returnIncidents = returnIncidents.bind(this);

    returnIncidents();

    this.ZenFactory = ZenFactory;

    this.ticketSubject = $cookies.get('zendeskTicketSubject');

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject);
      $uibModalInstance.close();
    }

  }

  angular
    .module('capstone')
    .controller('IncidentsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'selectedTicketId', IncidentsModalInstanceCtrl]);
})();
