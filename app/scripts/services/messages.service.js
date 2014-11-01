/**
 * Created by remo on 01/11/14.
 */


zmittapp.factory('messages', function($rootScope){

  $rootScope.messages = [];

  return {
    error: function(msg){
      $rootScope.messages.push({
        text: msg,
        type: 'error',
        class: 'alert-danger'
      });
    },
    info: function(msg){
      $rootScope.messages.push({
        text: msg,
        type: 'info',
        class: 'alert-info'
      });
    },
    success: function(msg){
      $rootScope.messages.push({
        text: msg,
        type: 'success',
        class: 'alert-success'
      });
    }
  };

});
