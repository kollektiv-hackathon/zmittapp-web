/**
 * Created by remo on 01/11/14.
 */

zmittapp.directive('zMessages', function($rootScope){

  function link(scope, element, attrs){
    $rootScope.$watch('messages', function(newValue){
      scope.messages = newValue;
    }, true);
  }

  return {
    link: link,
    templateUrl: 'views/messages.html'
  };

});
