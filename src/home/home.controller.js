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
        this.deletePin = null;
        this.ref = EventsService.currentGamesRef;


        this.games = $firebaseArray(this.ref);
        console.log(this.games);
        this.admin = $firebaseArray(EventsService.admin);
        console.log(this.admin);

        this.askEditPost = function askEditPost(postId) {
          this.deletePostID = postId;
          this.editAreYouSure = true;
        };

        this.doNotEditPost = function doNotEditPost() {
          this.editAreYouSure = false;
        };

        this.askDeletePost = function askDeletePost(postId) {
          this.deletePostID = postId;
          this.areYouSure = true;
        };

        this.doNotDeletePost = function doNotDeletePost() {
          this.areYouSure = false;
        };

        this.timeFilter = function timeFilter(time) {
          console.log('game', time);
          // if (Number(time) > (new Date - 1500000) ) {
          //   return true;
          // }
          // return false;
        };

        // EventsService.getAllEvents()
        //   .then(function(events) {
        //     console.log('events', events);
        //     that.upcomingEvents = events;
        //   })
        //   .catch(function (err) {
        //     console.log('catch error', err);
        //     that.errorMessage = "The server is not responding. Please try again shortly.";
        //   });

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
          if (that.deletePin !== pin) {
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

        $scope.$watch('gameTime', function (newValue) {
          game.time = $filter('date')(newValue, 'yyyy/MM/dd');
        });

        $scope.$watch('this.games.game.time', function (newValue) {
          $scope.gameTime = $filter('date')(newValue, 'yyyy/MM/dd');
        });

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
