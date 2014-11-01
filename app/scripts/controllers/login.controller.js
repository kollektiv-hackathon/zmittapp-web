/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.controller('loginController', function($scope, $location){
    $scope.login = function(){
        $location.path( "/" ).replace();
    };
});