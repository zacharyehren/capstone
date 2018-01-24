(function() {
  function SortData(ZenFactory, $cookies) {

    var sort = null;

    SortData.ticketSort = function(sortType, ZenFactoryObject, dataFromObject) {
      if (sort == null || sort == "desc") {
        sort = "asc";
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
