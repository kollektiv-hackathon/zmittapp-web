/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.controller('loginController', function($scope, $rootScope, api, $timeout, auth, messages, $http){
    $scope.login = function(){

        $http({
            method: 'GET',
            url: 'http://api.zmittapp.ch/app_dev.php/' + 'oauth/v2/token',
            params: {
                client_id: '1_3p6fcokbu204sw400sw84kwkkw40o84cog8cgc4wg0s4k0wgww', // will change by calling pull.php on api server
                client_secret: '4ih182gn1eo08cwogoogok0c4o0c4csc84k884kwsco0ww84cw', // same
                username: $scope.username,
                password: $scope.password,
                grant_type: 'password'
            }
        }).success(function(data, status, headers, config) {
            console.log(data.access_token);
            $rootScope.oauth = {};
            $rootScope.oauth = {
                access_token: data.access_token,
                expires_in: data.expires_in,
                token_type: data.token_type,
                scope: data.scope,
                refresh_token: data.refresh_token
            };
        }).error(function(data, status, headers, config) {
            if(status == 400 && data.error_description == 'Invalid username and password combination'){
                messages.error('Benutzerangaben sind falsch.');
            } else {
                messages.error('Ein Fehler ist aufgetreten.');
            }
        })
    };
});