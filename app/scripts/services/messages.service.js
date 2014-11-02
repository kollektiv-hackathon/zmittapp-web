/**
 * Created by remo on 01/11/14.
 */


zmittapp.factory('messages', function($rootScope, $timeout){

  $rootScope.messages = [];
  var removeAfter = 2000; // default: remove messages after 2s

  var removeMessage = function(id, sticky){

    // don't remove message if sticky
    if(sticky===true){
      return;
    }

    var ms = (sticky !== undefined && sticky !== false) ? sticky : removeAfter;

    $timeout(function(){
      $rootScope.messages.splice(id-1, 1);
      console.log('removing message');
    }, ms);
  };

  return {
    error: function(msg, sticky){
      var id = $rootScope.messages.push({
        text: msg,
        type: 'error',
        class: 'alert-danger'
      }).length;

      removeMessage(id, sticky);
    },
    info: function(msg, sticky){
      var id = $rootScope.messages.push({
        text: msg,
        type: 'info',
        class: 'alert-info'
      }).length;

      removeMessage(id, sticky);
    },
    success: function(msg, sticky){
      var id = $rootScope.messages.push({
        text: msg,
        type: 'success',
        class: 'alert-success'
      }).length;

      removeMessage(id, sticky);
    }
  };

});
