
zmittapp.controller('menuController', function($scope, messages, api){

  messages.error('Es ist ein schwuler fehler beim anmelden aufgetreten');
  messages.success('Super du hast gewonnen!');
  messages.info('This is an info message');

  api('restaurants').then(function(api){

    api.query().then(function(data){
      $scope.dishes = data;
    });
  });
});
