(function() {
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
        // that.newEvent.time = that.newEvent.time.getTime();
        return EventsService.createEvent(that.newEvent)
          .then(function handlePromise(ref) {
            console.log(that.newEvent);
            console.log('in promise', ref);
            $state.go('home');
          })
          .catch(function handleError(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });
      };


    }

})();
