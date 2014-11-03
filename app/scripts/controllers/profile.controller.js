
zmittapp.controller('profileController', function($scope, $rootScope, api, osmApi, $timeout, auth, messages){

    $scope.hstep = 1;
    $scope.mstep = 30;

    $scope.saveProfile = function(){

      api('restaurant').update($scope.profile).then(function(){
         messages.success('Ihr Profil wurde gespeichert!');
      });
    }

    api('restaurant').get(auth.getId()).then(function(data){

      $scope.profile = data;

      // dummy data
      var menustart = new Date();
      var menuend = new Date();

      menustart.setHours( 11 );
      menustart.setMinutes( 30 );

      menuend.setHours( 14 );
      menuend.setMinutes( 00 );

      $scope.tmpProfile = {};

      $scope.tmpProfile.menustart = menustart;
      $scope.tmpProfile.menuend = menuend;

    });

});
