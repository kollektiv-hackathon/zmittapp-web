
zmittapp.controller('profileController', function($scope, $rootScope, api, osmApi, $timeout, auth, messages){


    osmApi().query('Schiffbaustrasse 10 Zürich').then(function(data){
      console.log(data);
    });

    return;

    $scope.saveProfile = function(){

      api('restaurant').update($scope.profile).then(function(){
         messages.success('Ihr Profil wurde gespeichert!');
      });
    }

    api('restaurant').get(auth.getId()).then(function(data){

      $timeout(function(){
        $scope.profile = data;
      }, 1000);

    });

});
