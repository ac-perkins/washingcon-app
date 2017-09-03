(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('HomeController', HomeController);

      HomeController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', 'EventsService'];
      function HomeController($scope, $firebaseArray, $firebaseObject, EventsService) {

        // var that = this;
        this.upcomingEvents = null;
        this.errorMessage = '';
        this.ref = EventsService.currentGamesRef;
        this.games = $firebaseArray(this.ref);
        console.log(this.games);


      }

})();
