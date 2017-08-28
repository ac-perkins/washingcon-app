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
        this.ref = EventsService.database;
        console.log(this.games);
        this.games = $firebaseArray(this.ref);

        EventsService.getAllEvents()
          .then(function(events) {
            that.upcomingEvents = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });


      }

})();
