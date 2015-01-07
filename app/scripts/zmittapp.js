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
      .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController'
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

zmittapp.factory('myHttpResponseInterceptor',['$q','$location', '$rootScope', function($q,$location, $rootScope){
    return {
        'request': function(config) {
            if(undefined !== $rootScope.oauth && null !== $rootScope.oauth){
                var token = $rootScope.oauth.access_token;
                config.headers =  {
                    'Authorization': 'Bearer ' + token
                }
            }
            return config;
        },
        responseError: function (rejection) {
            console.log('Failed with', rejection.status, 'status');
            if (rejection.status == 401 || rejection.status == 403) {
                $location.url('/login');
            }

            return $q.reject(rejection);
        }
    }
}]);
zmittapp.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);



zmittapp.controller('rootController', function($scope, $rootScope, auth, $window, $location){

  // reset loading
  $rootScope.loading = 0;

    $scope.isLoggedIn = auth.isLoggedIn;


  // todo: not working correctly
  // watch for change in loading and set showLoading
  //$rootScope.$watch('loading', function(newValue){
  //  $rootScope.showLoading = newValue >= 1;
  //});

});
