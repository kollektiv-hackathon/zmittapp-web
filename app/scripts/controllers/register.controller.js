
zmittapp.controller('registerController', function($scope, $rootScope, api, $timeout, auth, messages, $location){

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

        api('profile').create($scope.profile)
            .then(function(data){
                messages.success('Ihr Profil wurde erstellt!');
                auth.login($scope.profile.owner.username, $scope.profile.owner.password)
                    .then(function(data){
                        $rootScope.oauth = data;
                        $location.path('/');
                    }, function (httpError) {
                        messages.error('Profil wurde erstellt, jedoch konnte der Loginprozess nicht durchgeführt werden. Bitte manuell einloggen.');
                    });
            }, function (error) {
                console.log(error);
            });

    };

    // dummy data
    $scope.tmpProfile = {};

    $scope.tmpProfile.menustart = moment({hour: 11, minute: 30});
    $scope.tmpProfile.menuend = moment({hour: 14});

});
