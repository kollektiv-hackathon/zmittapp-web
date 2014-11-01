
zmittapp.controller('menuController', function($scope, messages, api){

  messages.error("FEHLER");

  api('restaurants').then(function(api){

    api.query().then(function(data){
      $scope.dishes = data;
    });
  });
});
