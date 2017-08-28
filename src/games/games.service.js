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
