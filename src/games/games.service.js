(function() {
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
        var gameObj = firebase.database().ref().child("games/" + eventId);
        return $firebaseObject(gameObj).$loaded()
          .then(function(obj) {
            console.log('$firebaseObject', obj);
            return obj;
          });
      }

      function editEventObject(eventId, editedEvent) {
        var gameObj = firebase.database().ref().child("games/" + eventId);
        console.log('editedEvent', editedEvent);
        return gameObj.update(
          {
            name: editedEvent.name,
            location: editedEvent.location,
            when: editedEvent.date,
            players: editedEvent.players,
            notes: editedEvent.notes,

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
