// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','ngDraggable'])

.run(function($ionicPlatform,$rootScope) {
    // Declare default avatar and title-image and username
    $rootScope.avatar="img/pixel-sitting.png";
    $rootScope.username="Gaby";
    $rootScope.navTitle='<img class="title-image" src="img/primakid-navbar-clean.png" height="65px"   width ="125px"/>';


    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider



    .state('home', {
        url: '/home',
        templateUrl: 'html/home.html',
        controller: 'HomeCtrl'
    })

    .state('weather', {
        url: '/weather',
        templateUrl: 'html/weather.html',
        controller: 'WeatherCtrl'
    })

    .state('account', {
        url: '/account',
        templateUrl: 'html/account.html',
        controller: 'AccountCtrl'
    })

    .state('avatar', {
        url: '/avatar',
        templateUrl: 'html/avatar.html',
        controller: 'AvatarCtrl'
    })

    .state('choregraphy', {
        url: '/choregraphy',
        templateUrl: 'html/choregraphy.html',
        controller: 'ChoregraphyCtrl'
    })

    .state('moves', {
        url: '/moves',
        templateUrl: 'html/moves.html',
        controller: 'MovesCtrl'
    })
    .state('calcul', {
        url: '/calcul',
        templateUrl: 'html/calcul.html',
        controller: 'CalculCtrl'
    })

    $urlRouterProvider.otherwise('/home');

});
