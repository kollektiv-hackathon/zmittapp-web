/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.controller('loginController', function($scope, $rootScope, api, $timeout, auth, $location){
    $scope.login = function(){

        //this is a promise
        auth.login($scope.username, $scope.password)
        .then(function(data){
            $rootScope.oauth = data;
            $location.path('/');
        }, function (httpError) {
            $scope.error_description = httpError.data.error_description;
        });


    };
});