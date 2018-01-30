(function() {
  function SortData(ZenFactory, $cookies) {
    var sort = "";
    var selected = "";

    SortData.ticketSort = function(sortType, ZenFactoryObject, dataFromObject) {
      if (sort == "" || sort == "desc" || selected != sortType) {
        sort = "asc";
        selected = sortType;
        // Ex: ZenFactory[myTicketData][subject].sort...
        ZenFactory[ZenFactoryObject][dataFromObject].sort(function(a, b) {
          return a[sortType].localeCompare(b[sortType]);
        });
      } else if (sort == "asc"){
        sort = "desc";
        ZenFactory[ZenFactoryObject][dataFromObject].sort(function(a, b) {
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
