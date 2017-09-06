(function() {
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
            obj.time = new Date(obj.time);
            console.log('$firebaseObject', obj);
            return obj;
          });
      }

      function editEventObject(eventId, editedEvent) {
        var gameObj = firebase.database().ref().child("games/" + eventId);
        editedEvent.adjTime = new Date(editedEvent.adjTime).getTime();
        console.log('editedEvent', editedEvent);
        return gameObj.update(
          {
            name: editedEvent.name,
            location: editedEvent.location,
            hour: editedEvent.hour,
            adjHour: editedEvent.adjHour,
            minute: editedEvent.minute,
            adjMinute: editedEvent.adjMinute,
            day: editedEvent.day,
            month: editedEvent.month,
            year: editedEvent.year,
            ampm: editedEvent.ampm,
            time: editedEvent.adjTime,
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
