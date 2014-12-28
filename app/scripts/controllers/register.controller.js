
zmittapp.controller('registerController', function($scope, $rootScope, api, $timeout, auth, messages){

    $scope.hstep = 1;
    $scope.mstep = 30;

    $scope.createProfile = function(){

        $scope.profile.email = $scope.profile.owner.username;

        //dummy data
        $scope.profile.lon = '42';
        $scope.profile.lat = '42';
        $scope.profile.country = 'CH';
        $scope.profile.zip = '8001';
        $scope.profile.city = 'Zürich';
        $scope.profile.address = 'Rennweg 4';

        console.log('create clicked');
      api('profile').create($scope.profile)
          .success(function(){
            messages.success('Ihr Profil wurde erstellt!');
          })
          .error(function(){
              messages.error('Profil konnte nicht erstellt werden!');
          })
      ;
    }

    // dummy data
    $scope.tmpProfile = {};

    $scope.tmpProfile.menustart = moment({hour: 11, minute: 30});
    $scope.tmpProfile.menuend = moment({hour: 14});

});
