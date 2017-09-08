(function() {
    'use strict';

  angular
    .module('washingcon-app',['firebase', 'ui.router', 'ngMaterial', 'ngMessages'])
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
  }

})();
