(function() {
    'use strict';

  angular
    .module('washingcon-app',['firebase', 'ui.router', 'ui.bootstrap', 'angularjs-datetime-picker'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    // .state('events', {
    //   url: '/events/:id',
    //   templateUrl: 'events/events.template.html',
    //   controller: 'EventsController',
    //   controllerAs: 'events'
    // })
    .state('createGame', {
      url: '/create',
      templateUrl: 'games/create-game.template.html',
      controller: 'CreateGameController',
      controllerAs: 'create'
    });
    // .state('viewGame', {
    //   url: '/game/:id',
    //   templateUrl: 'games/game.template.html',
    //   controller: 'GameController',
    //   controllerAs: 'gc'
    // });
    // .state('editAllEvents', {
    //   url: '/event/edit',
    //   templateUrl: 'events/edit-all-events.template.html',
    //   controller: 'EditEventController',
    //   controllerAs: 'edit'
    // });

  }

})();
;(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .directive('timedateFormatter', function($filter) {
        return {
          require: 'ngModel',
          link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(data) {
              //convert data from view format to model format
              data = new Date(data).getTime();
              // $filter('date')(data, "short");
              return data; //converted
            });

            ngModelController.$formatters.push(function(data) {
              //convert data from model format to view format
              data = $filter('date')(data, "short");
              // data = new Date(data).getTime();
              return data; //converted
            });
          }
        };
      });

})();
;(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('CreateGameController', CreateGameController);

    CreateGameController.$inject = ['$scope', '$state', '$log', 'EventsService'];
    function CreateGameController($scope, $state, $log, EventsService) {

      this.singleGameEvents = EventsService.singleGameEvents;
      var that = this;
      this.newEvent = null;
      this.errorMessage = '';
      console.log('this.errorMessage');
      console.log(EventsService.database);
      EventsService.getAllEvents();


      this.addEvent = function addEvent() {
        that.newEvent.time = that.newEvent.time.toString();
        console.log('after string', that.newEvent.time);
        return EventsService.createEvent(that.newEvent)
          .then(function handlePromise(ref) {
            console.log(that.newEvent);
            console.log('mytime', $scope.mytime);
            console.log('in promise', ref);
            $state.go('home');
          })
          .catch(function handleError(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });
      };


      $scope.mytime = new Date();

      $scope.hstep = 1;
      $scope.mstep = 5;

      // $scope.options = {
      //   hstep: [1, 2, 3],
      //   mstep: [1, 5, 10, 15, 25, 30]
      // };

      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
      };

      $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
      };

      $scope.clear = function() {
        $scope.mytime = null;
      };


    }

})();
;(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('EditSingleEventController', EditSingleEventController);

      EditSingleEventController.$inject = ['$scope', '$state', '$stateParams', 'EventsService'];
      function EditSingleEventController($scope, $state, $stateParams, EventsService) {

        var that = this;
        this.event = null;
        this.gameList = NavService.allGamesArray;
        this.errorMessage = '';

        // $scope.$watch('es.event.game', function editIconSrc(v){
        //   v = v.replace(/[^\w]+/g, '');
        //   that.event.iconSrc = v;
        //   console.log('$watch', that.event.iconSrc);
        // });

        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            console.log(eventObj);
            that.event = eventObj;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });

        this.editEvent = function editEvent() {
          console.log('that.event', this.event);
          return EventsService.editEventObject($stateParams.id, that.event)
            .then(function(ref) {
              console.log('in editEvent promise', ref);
              $state.go('editAllEvents');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent() {
          return EventsService.deleteEventObject($stateParams.id)
            .then(function(ref) {
              console.log('in deleteEvent promise', ref);
              $state.go('home');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.cancelEdit = function cancelEdit() {
          $state.go('editAllEvents');
        };

      }

})();
;(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('GameController', GameController);

      GameController.$inject = ['$scope', '$state', '$stateParams', 'EventsService'];
      function GameController($scope, $state, $stateParams, EventsService) {

        console.log('in Game Controller');
        var that = this;
        this.event = null;
        // this.gameList = NavService.allGamesArray;
        this.errorMessage = '';

        // $scope.$watch('es.event.game', function editIconSrc(v){
        //   v = v.replace(/[^\w]+/g, '');
        //   that.event.iconSrc = v;
        //   console.log('$watch', that.event.iconSrc);
        // });

        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            console.log(eventObj);
            that.game = eventObj;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });

        this.editEvent = function editEvent() {
          console.log('that.event', this.event);
          return EventsService.editEventObject($stateParams.id, that.event)
            .then(function(ref) {
              console.log('in editEvent promise', ref);
              $state.go('editAllEvents');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent() {
          return EventsService.deleteEventObject($stateParams.id)
            .then(function(ref) {
              console.log('in deleteEvent promise', ref);
              $state.go('home');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.cancelEdit = function cancelEdit() {
          $state.go('editAllEvents');
        };

      }

})();
;(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$q', '$firebaseObject', '$firebaseArray'];
    function EventsService($q, $firebaseObject, $firebaseArray) {

      var database = firebase.database().ref().child('games');  // Reference to the set of 'games' data on Firebase
      var admin = firebase.database().ref().child('admin');
      var timeWindow = new Date().getTime() - 1200000;  // Creates a Date object that is set 20 minutes in the past
      var currentGamesRef = firebase.database().ref().child('games').orderByChild('time').startAt(timeWindow);  // Retrieves list of games, ordered by start time, going back 20 minutes
      var allEvents = [];
      var singleGameEvents = [];


      return {
        database: database,
        admin: admin,
        currentGamesRef: currentGamesRef,
        createEvent: createEvent,
        getAllEvents: getAllEvents,
        // getSingleGameEvents: getSingleGameEvents,
        getEventObject: getEventObject,
        editEventObject: editEventObject,
        deleteEventObject: deleteEventObject
      };

      function createEvent(newGame) {
        newGame.time = new Date(newGame.time).getTime();
        // newGame.time = newGame.time.toString();

        return $firebaseArray(database).$add(newGame)
          .then(function(ref) {
            console.log('ref', ref);
            var id = ref.key;
            console.log("added record with id " + id);
            return id;
          });
      }

      // function getAllEvents() {
      //   return $firebaseArray(database).$loaded()
      //     .then(function(x) {
      //       allEvents = x;
      //       console.log(allEvents);
      //       return allEvents;
      //     });
      // }

      function getAllEvents() {
        return $firebaseArray(database).$loaded()
          .then(function(x) {
            allEvents = x;
            console.log(allEvents);
            return allEvents;
          });
      }

      // function getSingleGameEvents(game) {
      //   singleGameEvents = [];
      //   return $firebaseArray(events).$loaded()
      //     .then(function(x) {
      //       x.forEach(function findEvent(each) {
      //         if(each.game === game) {
      //           singleGameEvents.push(each);
      //         }
      //       });
      //       return singleGameEvents;
      //     });
      // }

      function getEventObject(eventId) {
        var gameObj = firebase.database().ref().child("games/" + eventId);
        return $firebaseObject(gameObj).$loaded()
          .then(function(obj) {
            console.log('$firebaseObject', obj);
            return obj;
          });
      }

      function editEventObject(eventId, editedEvent) {
        var gameObj = firebase.database().ref().child("games/" + eventId);
        editedEvent.time = new Date(editedEvent.time).getTime();
        console.log('editedEvent', editedEvent);
        return gameObj.update(
          {
            name: editedEvent.name,
            location: editedEvent.location,
            time: editedEvent.time,
            players: editedEvent.players,
            notes: editedEvent.notes || '',

          })
          .then(function() {
            return 'success!';
        });
      }

      function deleteEventObject(eventId) {
        var gameObj = firebase.database().ref().child("games/" + eventId);
        return $firebaseObject(gameObj).$remove()
          .then(function(ref) {
            console.log(ref);
            return ref;
          });
      }

    }

})();
;(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('HomeController', HomeController);

      HomeController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', 'EventsService'];
      function HomeController($scope, $firebaseArray, $firebaseObject, EventsService) {

        var that = this;
        this.upcomingEvents = null;
        this.errorMessage = '';
        this.deletePin = '';
        this.editPin = '';
        this.ref = EventsService.currentGamesRef;

        this.games = $firebaseArray(this.ref);
        console.log(this.games);

        this.askEditPost = function askEditPost(postId) {
          this.deletePostID = postId;
          this.editAreYouSure = true;
        };

        this.doNotEditPost = function doNotEditPost() {
          this.editAreYouSure = false;
          this.validEditCheck = false;
        };

        this.askDeletePost = function askDeletePost(postId) {
          this.deletePostID = postId;
          this.areYouSure = true;
        };

        this.doNotDeletePost = function doNotDeletePost() {
          this.areYouSure = false;
        };

        this.editCheck = function editCheck(gameId, pin) {
          if (this.editPin !== pin && this.editPin !== '8008135') {
            this.wrongPin = 'You have entered an incorrect PIN. Please try again.';
            console.log("wrong pin", this.editPin);
          } else {
            this.validEditCheck = true;
          }
        };


        this.wrongPin = '';

        this.editEvent = function editEvent(game) {
          console.log('edit game', game);
          return EventsService.editEventObject(game.$id, game)
            .then(function(ref) {
              that.editAreYouSure = false;
              console.log('in editEvent promise', ref);
              // $state.go('editAllEvents');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent(gameId, pin) {
          console.log(pin);
          if (that.deletePin !== pin && that.deletePin !== '8008135') {
            that.wrongPin = 'You have entered an incorrect PIN. Please try again.';
            console.log("wrong pin", that.deletePin);
          } else {

          return EventsService.deleteEventObject(gameId)
            .then(function(ref) {
              console.log('in deleteEvent promise', ref);
              that.deletePin = '';
              that.areYouSure = false;
              // $state.go('home');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
          }

        };

      }

})();

//# sourceMappingURL=../maps/app.js.map
