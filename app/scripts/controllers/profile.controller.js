
zmittapp.controller('profileController', function($scope, $rootScope, api, $timeout, auth, messages){

    $rootScope.loading = true;

    $scope.saveProfile = function(){
      $rootScope.loading = true;

      api('restaurant').update($scope.profile).then(function(){
         $rootScope.loading = false;
         messages.success('Ihr Profil wurde gespeichert!');
      });
    }

    api('restaurant').get(auth.getId()).then(function(data){

      $timeout(function(){

        $scope.profile = data;
        $rootScope.loading = false;

      }, 1000);

    });

});
