(function() {
  function SortData(ZenFactory, $cookies) {

    var sort = null;

    SortData.myTicketSort = function(sortType) {
      if (sort == null || sort == "desc") {
        sort = "asc";
        ZenFactory.myTicketData.ticket.sort(function(a, b) {
          return a[sortType].localeCompare(b[sortType]);
        });
      } else if (sort == "asc"){
        sort = "desc";
        ZenFactory.myTicketData.ticket.sort(function(a, b) {
          return b[sortType].localeCompare(a[sortType]);
        });
      }
    }

    return SortData;

  };


  angular
    .module('capstone')
    .factory('SortData', ['ZenFactory', '$cookies', SortData]);
})();
