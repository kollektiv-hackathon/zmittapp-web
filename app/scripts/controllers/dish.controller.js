/**
 * Created by remo on 02/11/14.
 */

zmittapp.controller('dishController', function($scope, data){

    $scope.save = function(){
        var _exec;
        if(typeof $scope.dish.id !== 'undefined'){
            _exec = data.menuItem.update;
        }else{
            _exec = data.menuItem.create;
        }

        _exec.call(data.menuItem, $scope.dish).then(function(data){
            $scope.$close();
        });
    };

    $scope.cancel = function(){
        $scope.$dismiss();
    };

});