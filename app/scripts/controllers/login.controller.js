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
                client_id: '1_461rd8pbtmaskow8w8o8k40gkwoo8gsskw44000wc4ocwogkww', // will change by calling pull.php on api server
                client_secret: '2fhwmedl1hlwwo80s8cs0oko8ggokwc8oc4ccokgc8w4sw0cgw', // same
                username: $scope.username,
                password: $scope.password,
                grant_type: 'password'
            }
        }).success(function(data, status, headers, config) {
            console.log(data.access_token);
            $rootScope.oauth = new Object();
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