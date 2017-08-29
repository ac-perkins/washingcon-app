(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('HomeController', HomeController);

      HomeController.$inject = ['$scope', '$firebaseArray', 'EventsService'];
      function HomeController($scope, $firebaseArray, EventsService) {

        var that = this;
        this.upcomingEvents = null;
        this.errorMessage = '';
        this.deletePin = null;
        this.ref = EventsService.database;
        console.log(this.games);
        this.games = $firebaseArray(this.ref);

        this.askEditPost = function askEditPost(postId) {
          this.deletePostID = postId;
          this.editAreYouSure = true;
        };

        this.doNotEditPost = function doNotDeletePost() {
          this.editAreYouSure = false;
        };

        this.askDeletePost = function askDeletePost(postId) {
          this.deletePostID = postId;
          this.areYouSure = true;
        };

        this.doNotDeletePost = function doNotDeletePost() {
          this.areYouSure = false;
        };

        EventsService.getAllEvents()
          .then(function(events) {
            that.upcomingEvents = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });

        this.wrongPin = '';

        this.editEvent = function editEvent(game) {
          console.log('edit game', game);
          return EventsService.editEventObject(game.$id, game)
            .then(function(ref) {
              console.log('in editEvent promise', ref);
              // $state.go('editAllEvents');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent(gameId, pin) {
          if (that.deletePin !== pin) {
            that.wrongPin = 'You have entered an incorrect PIN. Please try again.';
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
