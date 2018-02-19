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

    SortData.ticketSort = function(sortType, ZenFactoryObject, zendeskData) {
      if (sort == "" || sort == "desc" || selected != sortType) {
        sort = "asc";
        selected = sortType;
        // Ex: ZenFactory[unsolvedTickets][subject].sort...
        ZenFactory[ZenFactoryObject][zendeskData].sort(function(a, b) {
          return a[sortType].localeCompare(b[sortType]);
        });
      } else if (sort == "asc"){
        sort = "desc";
        ZenFactory[ZenFactoryObject][zendeskData].sort(function(a, b) {
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

      var findIncidentTickets = function(ZenFactoryObject) {
        var tickets = ZenFactoryObject['tickets'];
        var incidents = ZenFactoryObject['incidents'];
        for (var i = 0; i < tickets.length; i++) {
          for (var p = 0; p < incidents.length; p++) {
            if (tickets[i].id == incidents[p].problem_id) {
              tickets[i].hasIncident = true;
            }
          }
        }
      }

        ZenFactory.listTickets = function() {
          var displayTickets = {
            method: 'GET',
            url: 'http://localhost:3000/api/tickets',
            params: {
              username: $cookies.get('zendeskUserName')
            }
          };

          return $http(displayTickets).then(function successCallback(response) {
            ZenFactory.unsolvedTickets = response.data;
            findIncidentTickets(ZenFactory.unsolvedTickets);
          });
        };

        ZenFactory.listClosedTickets = function() {
          var displayClosedTickets = {
            method: 'GET',
            url: 'http://localhost:3000/api/closed_tickets'
          };

          return $http(displayClosedTickets).then(function successCallback(response) {
            ZenFactory.closedTickets = response.data;
            findIncidentTickets(ZenFactory.closedTickets);
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
        SortData.ticketSort(sortType, "closedTickets", "tickets");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "closedTickets", "tickets");
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
        SortData.ticketSort(sortType, "unsolvedTickets", "tickets");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "unsolvedTickets", "tickets");
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

(function(){
  function LinkedTicketsModalCtrl($uibModal) {

    this.openModal = function(ticketId, ZenFactoryObject) {
      var modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: '/templates/linkedTicketsModal.html',
        controller: 'LinkedTicketsModalInstanceCtrl',
        controllerAs: 'linkedTicketsModal',
        resolve: {
          selectedTicketId: ticketId,
          ZenFactoryObject: ZenFactoryObject
        }
      });
    };

  }
  angular
    .module('capstone')
    .controller('LinkedTicketsModalCtrl', ['$uibModal', LinkedTicketsModalCtrl]);
})();

(function() {
  function LinkedTicketsModalInstanceCtrl($uibModalInstance, ZenFactory, SortData, $cookies, selectedTicketId, ZenFactoryObject) {

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
    .controller('LinkedTicketsModalInstanceCtrl', ['$uibModalInstance', 'ZenFactory', 'SortData', '$cookies', 'selectedTicketId', 'ZenFactoryObject', LinkedTicketsModalInstanceCtrl]);
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
        SortData.ticketSort(sortType, "unsolvedTickets", "my_tickets");
      } else if (this.sortClass == "up-carat") {
        this.sortClass = "down-carat";
        SortData.ticketSort(sortType, "unsolvedTickets", "my_tickets");
      }
    }

    this.loading = true;

    var myTicketsHandler = function() {
      this.loading = false;
    }

    myTicketsHandler = myTicketsHandler.bind(this);

    ZenFactory.listTickets().then(myTicketsHandler);

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
