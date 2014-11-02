
zmittapp.controller('profileController', function($scope, $rootScope, api, osmApi, $timeout, auth, messages){


    osmApi().query('Schiffbaustrasse 10 Zürich').then(function(data){
      console.log(data);
    });

    $scope.saveProfile = function(){

      api('restaurant').update($scope.profile).then(function(){
         messages.success('Ihr Profil wurde gespeichert!');
      });
    }

    api('restaurant').get(auth.getId()).then(function(data){

      $scope.profile = data;

    });

});
