(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .controller('CreateGameController', CreateGameController);

    CreateGameController.$inject = ['$scope', '$state', '$log', 'EventsService'];
    function CreateGameController($scope, $state, $log, EventsService) {

      this.singleGameEvents = EventsService.singleGameEvents;
      var that = this;
      this.newEvent = {daySelect: '2017, 9, 9'};
      this.now = new Date(Date.now());
      if (this.now.getHours() > 12) {
        this.newEvent.hour = JSON.stringify(this.now.getHours() - 12);
        this.newEvent.ampm = 'PM';
      } else {
        this.newEvent.hour = JSON.stringify(this.now.getHours());
        this.newEvent.ampm = 'AM';
      }
      this.newEvent.minute = JSON.stringify(Math.floor(this.now.getMinutes()/15)*15);
      this.newEvent.date = new Date(this.newEvent.daySelect);
      this.errorMessage = '';
      EventsService.getAllEvents();

      this.selectDay = function selectDay() {
        var that = this;
        that.newEvent.date = new Date(this.newEvent.daySelect);
      };

      this.addEvent = function addEvent() {
        // that.newEvent.time = that.newEvent.time.toString();
        that.newEvent.adjHour = Number(that.newEvent.hour);
        that.newEvent.adjMinute = Number(that.newEvent.minute);
        that.newEvent.day = that.newEvent.date.getDate();
        that.newEvent.month = that.newEvent.date.getMonth();
        that.newEvent.year = that.newEvent.date.getFullYear();
        if (that.newEvent.ampm === 'PM' && that.newEvent.adjHour !== 12) {
          that.newEvent.adjHour = that.newEvent.adjHour + 12;
        }
        if (that.newEvent.ampm === 'AM' && that.newEvent.adjHour === 12) {
          that.newEvent.adjHour = 0;
        }

        that.newEvent.time = new Date(that.newEvent.year, that.newEvent.month, that.newEvent.day, that.newEvent.adjHour, that.newEvent.adjMinute);
        that.newEvent.time = that.newEvent.time.toString();
        console.log('after string', that.newEvent.time);
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

      this.inputListener = function inputListener() {
        $('input').focus(function() {
          $(this).attr('datamainplaceholder', $(this).attr('placeholder'));
          $(this).attr('placeholder', $(this).attr('dataaltplaceholder'));
        })
        .blur(function() {
          $(this).attr('dataaltplaceholder', $(this).attr('placeholder'));
          $(this).attr('placeholder', $(this).attr('datamainplaceholder'));
        });
      };

      this.inputListener();

    }

})();
