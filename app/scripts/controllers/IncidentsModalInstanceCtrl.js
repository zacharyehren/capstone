(function() {
  function IncidentsModalInstanceCtrl($uibModalInstance, ZenFactory, $cookies) {

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

    // create function that loops through all incidents and creates array of incidents whose problem_id matches the ticketId cookie
    // display tickets from the new array


    this.ZenFactory = ZenFactory;

    this.ticketSubject = $cookies.get('zendeskTicketSubject')

  }

  angular
    .module('capstone')
    .controller('IncidentsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', '$cookies', IncidentsModalInstanceCtrl]);
})();
