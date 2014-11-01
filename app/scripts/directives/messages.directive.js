/**
 * Created by remo on 01/11/14.
 */

zmittapp.directive('zMessages', function($rootScope){

  function controller($scope){

    $scope.removeMessage = function(id){
       $rootScope.messages.splice(id, 1);
    }

  }

  function link(scope, element, attrs){

    $rootScope.$watch('messages', function(newValue){
      scope.messages = newValue;
    }, true);
  }

  return {
    controller: controller,
    link: link,
    templateUrl: 'views/messages.html'
  };

});
