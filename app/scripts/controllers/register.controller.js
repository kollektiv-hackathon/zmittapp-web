
zmittapp.controller('registerController', function($scope, $rootScope, api, $timeout, auth, messages){

    $scope.hstep = 1;
    $scope.mstep = 30;

    $scope.createProfile = function(){
        console.log('create clicked')
      api('restaurant').create($scope.profile).then(function(){
          console.log('profile saved')
         messages.success('Ihr Profil wurde erstellt!');
      });
    }

    // dummy data
    $scope.tmpProfile = {};

    $scope.tmpProfile.menustart = moment({hour: 11, minute: 30});
    $scope.tmpProfile.menuend = moment({hour: 14});

});
