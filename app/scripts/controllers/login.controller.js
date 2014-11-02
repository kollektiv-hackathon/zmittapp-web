/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.controller('loginController', function($scope, $http){
    $scope.login = function(){

        window.location.pathname = '/';

        /*$http({
            method: 'POST',
            url: 'http://localhost:2000/' + 'oauth/token',
            data: $.param({username: $scope.username, password: $scope.password, grant_type: 'password'}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('REMO_ID:REMO_SECRET')
            }
        })*/
    };
});