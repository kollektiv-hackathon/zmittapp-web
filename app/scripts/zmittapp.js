'use strict';

var zmittapp = angular.module('zmittapp', ['ngRoute', 'ngResource', 'ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/menu.html',
        controller: 'menuController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      })
        .when('/logout', {
          templateUrl: 'views/login.html',
          controller: 'logoutController'
        })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileController'
      })
      .otherwise({
        templateUrl: '404.html'
        //controller: 'errorController'
      });

      $locationProvider.html5Mode(true);
  });

zmittapp.controller('rootController', function($scope, $rootScope, auth, $window, $location){

  // reset loading
  $rootScope.loading = 0;

  // watch for change in loading and set showLoading
  $rootScope.$watch('loading', function(newValue){
    $rootScope.showLoading = newValue >= 1;
  });

  $scope.$on('$locationChangeStart', function(event) {

    if (auth.getAccessToken() === false && $window.location.pathname !== '/login') {
      event.preventDefault();
      window.location.pathname = '/login';
      //$window.location.href = 'http://zmittapp.int/login';
    }
  });

  $scope.$on('$locationChangeSuccess', function(e){
    $scope.currentLocation = window.location.pathname;
  });

});
