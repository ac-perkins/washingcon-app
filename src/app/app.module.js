(function() {
    'use strict';

  angular
    .module('washingcon-app',['firebase', 'ui.router', 'ui.bootstrap', 'angularjs-datetime-picker'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    // .state('events', {
    //   url: '/events/:id',
    //   templateUrl: 'events/events.template.html',
    //   controller: 'EventsController',
    //   controllerAs: 'events'
    // })
    .state('createGame', {
      url: '/create',
      templateUrl: 'games/create-game.template.html',
      controller: 'CreateGameController',
      controllerAs: 'create'
    })
    .state('viewGame', {
      url: '/game/:id',
      templateUrl: 'games/game.template.html',
      controller: 'GameController',
      controllerAs: 'gc'
    });
    // .state('editAllEvents', {
    //   url: '/event/edit',
    //   templateUrl: 'events/edit-all-events.template.html',
    //   controller: 'EditEventController',
    //   controllerAs: 'edit'
    // });

  }

})();
