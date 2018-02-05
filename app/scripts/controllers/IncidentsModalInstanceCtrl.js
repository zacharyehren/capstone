(function() {
  function IncidentsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies) {

    this.sortClass = "";
    this.selected = "";

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.ticketSort(sortType, "unsolvedTickets");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "unsolvedTickets");
      }
    }

    var returnIncidents = function(){
      this.incidentsArray = [];
      var incidents = ZenFactory.unsolvedTickets.incidents;
      for (var i = 0; i < incidents.length; i++){
        if ($cookies.get('ticketId') == incidents[i].problem_id) {
          this.incidentsArray.push(incidents[i]);
        }
      }
      console.log(this.incidentsArray);
      console.log($cookies.get('ticketId'))
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
    .controller('IncidentsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', IncidentsModalInstanceCtrl]);
})();
