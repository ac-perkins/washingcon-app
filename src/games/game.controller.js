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
