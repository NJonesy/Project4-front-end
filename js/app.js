angular
  .module('GetAGame', ['angular-jwt', 'ngResource', 'ui.router', 'uiGmapgoogle-maps'])
  .constant('API', 'http://localhost:3000/api')
  .config(GoogleMaps) 
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .config(MainRouter);

  MainRouter.$inject = ["$stateProvider", "$urlRouterProvider"];
  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "js/templates/home.html",
      })
      .state('user_type', {
        url: "/user_type",
        templateUrl: "js/templates/user_type.html",
      })
      .state('register', {
          url: "/register",
          templateUrl: "js/templates/register.html",
        })
      .state('login', {
          url: "/login",
          templateUrl: "js/templates/login.html",
        })
      .state('players', {
          url: "/players",
          templateUrl: "js/templates/players.html",
        })
      .state('create_game', {
          url: "/create_game",
          templateUrl: "js/templates/create_game.html",
        })
      .state('games', {
          url: "/games",
          templateUrl: "js/templates/games.html",
        });

    
    $urlRouterProvider.otherwise("/");
  }


  Interceptors.$inject = ['$httpProvider'];
  function Interceptors($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
  }

  GoogleMaps.$inject = ['uiGmapGoogleMapApiProvider'];
  function GoogleMaps(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCQSLJkgbNdmB-9dE1NytVPAWS2vEMIQmE',
      v: '3.20',
      libraries: 'places'
    });
  };