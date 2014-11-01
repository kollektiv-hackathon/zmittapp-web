
zmittapp.controller('profileController', function($scope, $rootScope, api, $timeout){

    $rootScope.loading = true;

    api('profile').get().then(function(data){

      $timeout(function(){
        $scope.profile = data;
        $rootScope.loading = false;
      }, 1000);


    });

});
