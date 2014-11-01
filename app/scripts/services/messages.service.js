/**
 * Created by remo on 01/11/14.
 */


zmittapp.factory('messages', function($rootScope){

  $rootScope.messages = [];

  return {
    error: function(msg){
      //$rootScope.messages = $rootScope.messages || [];
      $rootScope.messages.push({
        text: msg,
        type: "error"
      });
    }
  };

});
