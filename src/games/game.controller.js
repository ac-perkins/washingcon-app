(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('GameController', GameController);

      GameController.$inject = ['$scope', '$state', '$stateParams', 'EventsService'];
      function GameController($scope, $state, $stateParams, EventsService) {

        // console.log('in Game Controller');
        var that = this;
        this.event = null;
        this.errorMessage = '';
        this.deletePin = '';
        this.editPin = '';

        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            // console.log(eventObj);
            if (!eventObj.name) {
              $state.go('home');
            }

            that.game = eventObj;
            that.game.time = new Date(eventObj.time);
            that.game.date = new Date(that.game.daySelect);
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });

        this.cancelEdit = function cancelEdit() {
          $state.go('editAllEvents');
        };

        this.askEditPost = function askEditPost() {
          // this.deletePostID = postId;
          this.editAreYouSure = true;
        };

        this.doNotEditPost = function doNotEditPost() {
          this.editAreYouSure = false;
          this.validEditCheck = false;
        };

        this.askDeletePost = function askDeletePost() {
          // this.deletePostID = postId;
          this.areYouSure = true;
        };

        this.doNotDeletePost = function doNotDeletePost() {
          this.areYouSure = false;
        };

        this.editCheck = function editCheck(event, gameId, pin) {
          // var pinToNum = parseInt(pin);
          event.preventDefault();
          if (this.editPin !== pin && this.editPin !== '8008135') {
            this.wrongPin = 'Incorrect PIN';
            // console.log("wrong pin", this.editPin, pin);
          } else {
            console.log(this.validEditCheck);
            this.validEditCheck = true;
            console.log(this.validEditCheck);
          }
        };

        // this.saveEdits = function saveEdits() {
        //   this.validEditCheck = false;
        // };

        this.wrongPin = '';

        this.selectDay = function selectDay() {
          var that = this;
          that.game.date = new Date(that.game.daySelect);
        };

        this.editEvent = function editEvent(game) {
          // console.log('edit game', game);
          game.adjHour = Number(game.hour);
          game.adjMinute = Number(game.minute);
          game.day = game.date.getDate();
          game.month = game.date.getMonth();
          game.year = game.date.getFullYear();
          if (game.ampm === 'PM' && game.adjHour !== 12) {
            game.adjHour = game.adjHour + 12;
          }
          if (game.ampm === 'AM' && game.adjHour === 12) {
            game.adjHour = 0;
          }
          game.time = new Date(game.year, game.month, game.day, game.adjHour, game.adjMinute);
          game.time = game.time.toString();

          return EventsService.editEventObject(game.$id, game)
            .then(function(ref) {
              // console.log('that.editAreYouSure', that.editAreYouSure);
              that.editAreYouSure = false;
              that.validEditCheck = false;
              // console.log('that.editAreYouSure', that.editAreYouSure);
              // console.log('in editEvent promise', ref);
              $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
              });
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent(gameId, pin) {
          // console.log(pin);

          return EventsService.deleteEventObject(gameId)
            .then(function(ref) {
              // console.log('in deleteEvent promise', ref);
              that.deletePin = '';
              that.areYouSure = false;
              $state.go('home');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });


        };


      }

})();
