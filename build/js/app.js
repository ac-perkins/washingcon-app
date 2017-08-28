(function() {
    'use strict';

  angular
    .module('washingcon-app',['firebase', 'ui.router'])
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
      .controller('CreateGameController', CreateGameController);

    CreateGameController.$inject = ['$scope', '$state', 'EventsService'];
    function CreateGameController($scope, $state, EventsService) {

      this.singleGameEvents = EventsService.singleGameEvents;
      // this.gameList = NavService.allGamesArray;
      var that = this;
      this.newEvent = null;
      this.errorMessage = '';
      console.log('this.errorMessage');
      console.log(EventsService.database);
      EventsService.getAllEvents();

      // $scope.$watch('create.newEvent.game', function makeIconSrc(v){
      //   v = v.replace(/[^\w]+/g, '');
      //   that.newEvent.iconSrc = v;
      //   console.log('$watch', that.newEvent.iconSrc);
      // });

      this.addEvent = function addEvent() {
        return EventsService.createEvent(that.newEvent)
          .then(function handlePromise(ref) {
            console.log('in promise', ref);
            // $state.go('editAllEvents');
          })
          .catch(function handleError(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });
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

      // var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');
      var database = firebase.database().ref().child("games");
      console.log(database);
      var allEvents = [];
      var singleGameEvents = [];

      return {
        database: database,
        createEvent: createEvent,
        getAllEvents: getAllEvents,
        getSingleGameEvents: getSingleGameEvents,
        getEventObject: getEventObject,
        editEventObject: editEventObject,
        deleteEventObject: deleteEventObject
      };

      function createEvent(newGame) {
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

      function getSingleGameEvents(game) {
        singleGameEvents = [];
        return $firebaseArray(events).$loaded()
          .then(function(x) {
            x.forEach(function findEvent(each) {
              if(each.game === game) {
                singleGameEvents.push(each);
              }
            });
            return singleGameEvents;
          });
      }

      function getEventObject(eventId) {
        var eventObj = new Firebase('https://incandescent-heat-8431.firebaseio.com/events/' + eventId);
        return $firebaseObject(eventObj).$loaded()
          .then(function(obj) {
            console.log('$firebaseObject', obj);
            return obj;
          });
      }

      function editEventObject(eventId, editedEvent) {
        var eventObj = new Firebase('https://incandescent-heat-8431.firebaseio.com/events/' + eventId);
        console.log('editedEvent', editedEvent);
        return eventObj.update(
          {
            date: editedEvent.date,
            game: editedEvent.game,
            iconSrc: editedEvent.iconSrc,
            location: editedEvent.location,
            name: editedEvent.name,
            stream: editedEvent.stream,
            twitter: editedEvent.twitter,
            website: editedEvent.website
          })
          .then(function() {
            return 'success!';
        });
      }

      function deleteEventObject(eventId) {
        var eventObj = new Firebase('https://incandescent-heat-8431.firebaseio.com/events/' + eventId);
        return $firebaseObject(eventObj).$remove()
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

      HomeController.$inject = ['$scope', '$firebaseArray', 'EventsService'];
      function HomeController($scope, $firebaseArray, EventsService) {

        var that = this;
        this.upcomingEvents = null;
        this.errorMessage = '';
        this.ref = EventsService.database;
        console.log(this.games);
        this.games = $firebaseArray(this.ref);

        EventsService.getAllEvents()
          .then(function(events) {
            that.upcomingEvents = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });


      }

})();

//# sourceMappingURL=../maps/app.js.map
