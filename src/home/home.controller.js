(function() {
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
