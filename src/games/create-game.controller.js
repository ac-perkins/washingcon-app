(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('CreateGameController', CreateGameController);

    CreateGameController.$inject = ['$scope', '$state', '$log', 'EventsService'];
    function CreateGameController($scope, $state, $log, EventsService) {

      this.singleGameEvents = EventsService.singleGameEvents;
      var that = this;
      this.newEvent = null;
      this.errorMessage = '';
      console.log('this.errorMessage');
      console.log(EventsService.database);
      EventsService.getAllEvents();


      this.addEvent = function addEvent() {
        that.newEvent.time = $scope.mytime.getTime();
        return EventsService.createEvent(that.newEvent)
          .then(function handlePromise(ref) {
            console.log(that.newEvent);
            console.log('mytime', $scope.mytime);
            console.log('in promise', ref);
            $state.go('home');
          })
          .catch(function handleError(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });
      };


      $scope.mytime = new Date();

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
