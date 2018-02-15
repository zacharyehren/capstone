(function() {
  function config($locationProvider, $stateProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html'
      })
      .state('ticket', {
        url: '/ticket',
        controller: 'TicketCtrl as ticket',
        templateUrl: '/templates/ticket.html'
      })
      .state('closedTickets', {
        url: '/closed-tickets',
        controller: 'ClosedTicketCtrl as closedTickets',
        templateUrl: '/templates/closedTickets.html'
      })
      .state('newTicket', {
        url: '/new-ticket',
        controller: 'NewTicketCtrl as newTicket',
        templateUrl: '/templates/newTicket.html'
      })
      .state('myTickets', {
        url: '/my-tickets',
        controller: 'MyTicketCtrl as myTickets',
        templateUrl: '/templates/myTicket.html'
      });
  }

  angular
    .module('capstone', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngRoute'])
    .config(config);
})();

(function() {
  function GoogleOauth(ZenFactory, $cookies) {

    var GoogleOauth = {};
    var userObject;
    var profile;

    function onSignIn(googleUser) {
      profile = googleUser.getBasicProfile();
      domain = googleUser.getHostedDomain();
      if (domain == "sharethrough.com")  {
        if ($cookies.get('zendeskUserEmail') == undefined) {
        userObject = {
          name: profile.getName(),
          email: profile.getEmail()
        };

        GoogleOauth.userObject = userObject;
        $cookies.put('zendeskUserEmail', userObject.email);
        $cookies.put('zendeskUserName', userObject.name);
        location.reload();
      }
      } else {
        alert("Only Sharethrough emails have access.");
        GoogleOauth.signOut();
      };
    };


    GoogleOauth.signOut = function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log('User signed out.');
      });
    }


    window.onSignIn = onSignIn;

    return GoogleOauth;
    };

    angular
      .module('capstone')
      .factory('GoogleOauth', ['ZenFactory', '$cookies', GoogleOauth]);
  })();

(function() {
  function SortData(ZenFactory, $cookies) {
    var sort = "";
    var selected = "";

    SortData.ticketSort = function(sortType, ZenFactoryObject) {
      if (sort == "" || sort == "desc" || selected != sortType) {
        sort = "asc";
        selected = sortType;
        // Ex: ZenFactory[myTicketData][subject].sort...
        ZenFactory[ZenFactoryObject]['ticket'].sort(function(a, b) {
          return a[sortType].localeCompare(b[sortType]);
        });
      } else if (sort == "asc"){
        sort = "desc";
        ZenFactory[ZenFactoryObject]['ticket'].sort(function(a, b) {
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

(function() {
  function ZenFactory($http, $cookies) {

    var ZenFactory = {};

    var findIncidents = function(ZenFactoryObject){
      var tickets = ZenFactoryObject['ticket'];
      var incidents = ZenFactoryObject['incidents'];
      for (var i = 0; i < tickets.length; i++) {
        for (var p = 0; p < incidents.length; p++)
        if(tickets[i].id == incidents[p].problem_id) {
          tickets[i].hasIncident = true;
        }
      }
    }

    ZenFactory.listTickets = function() {
      var displayTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets'
      };

      return $http(displayTickets).then(function successCallback(response) {
        ZenFactory.unsolvedTickets = response.data;
        findIncidents(ZenFactory.unsolvedTickets);
      });
    };

    ZenFactory.listClosedTickets = function() {
      var displayClosedTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/closed_tickets'
      };

      return $http(displayClosedTickets).then(function successCallback(response) {
        ZenFactory.closedTickets = response.data;
        findIncidents(ZenFactory.closedTickets);
      });
    };

    ZenFactory.listMyTickets = function() {
      var displayMyTickets = {
        method: 'GET',
        url: 'http://localhost:3000/api/my_tickets',
        params: {
          user_email: $cookies.get('zendeskUserEmail')
        }
      };
      return $http(displayMyTickets).then(function successCallback(response) {
        ZenFactory.myTicketData = response.data;
        // var myTickets = ZenFactory.myTicketData;
        // for (var i = 0; i < myTickets.length; i++) {
        //   if (myTickets[i].problem_id != null) {
        //     myTickets[i].hasLinkedTicket = true;
        //   }
        // }
        console.log(ZenFactory.myTicketData);
      });
    };

      ZenFactory.createTicket = function(subject, comment) {
        var createTicket = {
          method: 'POST',
          url: 'http://localhost:3000/api/tickets',
          data: {
            subject: subject,
            comment_body: comment,
            submitter_email: $cookies.get('zendeskUserEmail'),
            submitter_name: $cookies.get('zendeskUserName')
          }
        };


        $http(createTicket).then(function successCallback(response) {
          ZenFactory.newTicket = response.data;
        });
      };

    ZenFactory.returnTicket = function() {
      var ticketInfo = {
        method: 'GET',
        url: 'http://localhost:3000/api/tickets/' + $cookies.get('zendeskTicketId'),
      }
      return $http(ticketInfo).then(function successCallback(response) {
        ZenFactory.ticket = response.data;
      });
    }

    ZenFactory.createComment = function(commentBody) {
      var createComment = {
        method: 'POST',
        url: 'http://localhost:3000/api/tickets/new_comment',
        data: {
          user_email: $cookies.get('zendeskUserEmail'),
          comment_body: commentBody,
          id: $cookies.get('zendeskTicketId')
        }
      };

      $http(createComment).then(function successCallback(response) {
        ZenFactory.newComment = response.data;
      });
    }

    return ZenFactory;

  };


  angular
    .module('capstone')
    .factory('ZenFactory', ['$http', '$cookies', ZenFactory]);
})();

(function() {
  function ClosedTicketCtrl(GoogleOauth, ZenFactory, SortData, $cookies, $location, $anchorScroll, $scope, $stateParams) {
    this.sortClass = "";
    this.selected = "";

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.ticketSort(sortType, "closedTickets");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "closedTickets");
      }
    }

    this.loading = true;

    var closedTicketsHandler = function(){
      this.loading = false;
    }

    closedTicketsHandler = closedTicketsHandler.bind(this);

    ZenFactory.listClosedTickets().then(closedTicketsHandler);

    this.ZenFactory = ZenFactory;

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject)
    }

    // Moves view to the top of the page when selecting different tickets
    $scope.$watchCollection('$stateParams', function() {
      $anchorScroll();
    });

  }

  angular
    .module('capstone')
    .controller('ClosedTicketCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', ClosedTicketCtrl]);
})();

(function() {
  function HomeCtrl(GoogleOauth, ZenFactory, SortData, $cookies, $location, $anchorScroll, $scope, $stateParams) {
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

    this.userSignedOut  = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        return false;
      } else {
        return true;
      }
    }

    this.loading = true;

    var listTicketsHandler = function(){
      this.loading = false;
    }

    listTicketsHandler = listTicketsHandler.bind(this);

    var signedInTicketReturn = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        ZenFactory.listTickets().then(listTicketsHandler);
      } else {
        listTicketsHandler();
      }
    };

    signedInTicketReturn();

    this.ZenFactory = ZenFactory;

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject)
    }

    // Moves view to the top of the page when selecting different tickets
    $scope.$watchCollection('$stateParams', function() {
      $anchorScroll();
    });


  }

  angular
    .module('capstone')
    .controller('HomeCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', HomeCtrl]);
})();

(function(){
  function IncidentsModalCtrl($uibModal) {

    this.openModal = function(ticketId, ZenFactoryObject) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/incidentsModal.html',
        controller: 'IncidentsModalInstanceCtrl',
        controllerAs: 'incidentsModal',
        resolve: {
          selectedTicketId: ticketId,
          ZenFactoryObject: ZenFactoryObject
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('IncidentsModalCtrl', ['$uibModal', IncidentsModalCtrl]);
})();

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
      var incidents = this.ZenFactoryObject["incidents"];
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

    this.closeModal = function() {
      $uibModalInstance.dismiss();
    };

  }

  angular
    .module('capstone')
    .controller('IncidentsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'selectedTicketId', 'ZenFactoryObject', IncidentsModalInstanceCtrl]);
})();

(function() {
  function IndexCtrl(GoogleOauth, ZenFactory, $cookies) {

    this.userSignedIn  = function() {
      if ($cookies.get('zendeskUserEmail') != undefined) {
        return true;
      } else {
        return false;
      }
    }

    this.ZenFactory = ZenFactory;

    this.user = $cookies.get('zendeskUserName');

    this.signOut = function() {
      GoogleOauth.signOut();
      var cookies = $cookies.getAll();
        angular.forEach(cookies, function (value, key) {
          $cookies.remove(key);
        });
        window.location = '/';
    };

  }

  angular
    .module('capstone')
    .controller('IndexCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', IndexCtrl]);
})();

(function() {
  function MyTicketCtrl(GoogleOauth, ZenFactory, SortData, $cookies, $location, $anchorScroll, $scope, $stateParams) {
    this.sortClass = "";
    this.selected = "";

    this.sortData = function(sortType) {
      if (this.selected != sortType) {
        this.sortClass = "";
      }
      this.selected = sortType;
      if (this.sortClass == "" || this.sortClass == "down-carat") {
        this.sortClass = "up-carat";
        SortData.ticketSort(sortType, "myTicketData");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "myTicketData");
      }
    }

    this.loading = true;

    var myTicketsHandler = function() {
      this.loading = false;
    }

    myTicketsHandler = myTicketsHandler.bind(this);

    ZenFactory.listMyTickets().then(myTicketsHandler);

    this.ZenFactory = ZenFactory;

    this.passTicketInfo = function(ticketId, ticketSubject) {
      $cookies.put('zendeskTicketId', ticketId);
      $cookies.put('zendeskTicketSubject', ticketSubject)
    }

    // Moves view to the top of the page when selecting different tickets
    $scope.$watchCollection('$stateParams', function() {
      $anchorScroll();
    });


  }

  angular
    .module('capstone')
    .controller('MyTicketCtrl', ['GoogleOauth', 'ZenFactory', 'SortData', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', MyTicketCtrl]);
})();

(function() {
  function NewTicketCtrl(GoogleOauth, ZenFactory, $cookies, $location) {

    this.ZenFactory = ZenFactory;

    this.submitter = $cookies.get('zendeskUserEmail');

    this.createTicket = function() {
      ZenFactory.createTicket(this.subject, this.comment);
       $location.path('/');
    };

  }

  angular
    .module('capstone')
    .controller('NewTicketCtrl', ['GoogleOauth', 'ZenFactory', '$cookies', '$location', NewTicketCtrl]);
})();

(function() {
  function TicketCtrl(ZenFactory, $cookies, $location, $anchorScroll, $scope, $stateParams) {

    this.loading = true;

    var listTicketHandler = function(){
      this.loading = false;
    }

    listTicketHandler = listTicketHandler.bind(this);
    ZenFactory.returnTicket().then(listTicketHandler);

    this.ZenFactory = ZenFactory;

    this.ticketSubject = $cookies.get('zendeskTicketSubject')

    this.createComment = function() {
      this.submitted = true;
      ZenFactory.createComment(this.commentBody);
      location.reload();
    };

    // Moves view to the top of the page when selecting different tickets
    $scope.$watchCollection('$stateParams', function() {
      $anchorScroll();
   });

  }

  angular
    .module('capstone')
    .controller('TicketCtrl', ['ZenFactory', '$cookies', '$location', '$anchorScroll', '$scope', '$stateParams', TicketCtrl]);
})();

//# sourceMappingURL=projectJsFiles.js.map
