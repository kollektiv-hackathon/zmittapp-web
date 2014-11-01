
zmittapp.controller('profileController', function($scope, $rootScope, api, $timeout){

    $rootScope.loading = true;

    var save = function(){
      $rootScope.loading = true;

      api('profile').update($scope.profile).then(function(){
         $rootScope.loading = false;
      });
    }

    api('profile').get().then(function(data){

      $timeout(function(){

        $scope.profile = data;
        $scope.profile.save = save;

        $rootScope.loading = false;

      }, 1000);


    });

});
