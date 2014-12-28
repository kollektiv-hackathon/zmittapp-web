/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.controller('loginController', function($scope, $http){
    $scope.login = function(){

        //window.location.pathname = '/';

        $http({
            method: 'GET',
            url: 'http://api.zmittapp.ch/app_dev.php/' + 'oauth/v2/token',
            data: $.param({
                client_id: '3_6ac1k938alssk8co4kks40wcccsc40444ksk08gwgww0gkwc8w', // will change by calling pull.php on api server
                client_secret: '6cao6iappo8w0ss88wgoo0s0kcwcwk4k40cgksc44wwwksskko', // same
                username: $scope.username,
                password: $scope.password,
                grant_type: 'password'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                //'Authorization': 'Basic ' + btoa('REMO_ID:REMO_SECRET')
            }
        })
    };
});