/**
 * Created by remo on 02/11/14.
 */

zmittapp.controller('dishController', function($scope, api){

    $scope.save = function(){
        var _api = api("menuItem"),
            _exec;
        if(typeof $scope.dish.id !== 'undefined'){
            _exec = _api.update;
        }else{
            _exec = _api.create;
        }

        _exec.call(_api, $scope.dish).then(function(data){
            $scope.$close();
        });
    };

    $scope.cancel = function(){
        $scope.$dismiss();
    };

});