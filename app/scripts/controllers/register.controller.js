
zmittapp.controller('registerController', function($scope, $rootScope, api, $timeout, auth, messages){

    $scope.hstep = 1;
    $scope.mstep = 30;

    $scope.saveProfile = function(){

      api('restaurant').create($scope.profile).then(function(){
         messages.success('Ihr Profil wurde erstellt!');
      });
    }

    // dummy data
    $scope.tmpProfile = {};

    $scope.tmpProfile.menustart = moment({hour: 11, minute: 30});
    $scope.tmpProfile.menuend = moment({hour: 14});

});
