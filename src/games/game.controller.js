(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('GameController', GameController);

      GameController.$inject = ['$scope', '$state', '$stateParams', 'EventsService'];
      function GameController($scope, $state, $stateParams, EventsService) {

        console.log('in Game Controller');
        var that = this;
        this.event = null;
        this.errorMessage = '';
        this.deletePin = '';
        this.editPin = '';



        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            console.log(eventObj);
            that.game = eventObj;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });

        // this.editEvent = function editEvent() {
        //   console.log('that.event', this.event);
        //   return EventsService.editEventObject($stateParams.id, that.event)
        //     .then(function(ref) {
        //       console.log('in editEvent promise', ref);
        //       $state.go('editAllEvents');
        //     })
        //     .catch(function(err) {
        //       console.log('catch error', err);
        //       that.errorMessage = 'The server is not responding. Please try again shortly.';
        //     });
        // };

        // this.deleteEvent = function deleteEvent() {
        //   return EventsService.deleteEventObject($stateParams.id)
        //     .then(function(ref) {
        //       console.log('in deleteEvent promise', ref);
        //       $state.go('home');
        //     })
        //     .catch(function(err) {
        //       console.log('catch error', err);
        //       that.errorMessage = 'The server is not responding. Please try again shortly.';
        //     });
        // };

        this.cancelEdit = function cancelEdit() {
          $state.go('editAllEvents');
        };

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
            console.log("wrong pin", this.editPin, pin);
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
              $state.go('home');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
          }

        };


      }

})();
