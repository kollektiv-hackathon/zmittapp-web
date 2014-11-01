
zmittapp.controller('profileController', function($scope, api){

    api('profile').get().then(function(data){
        console.log(data);
    });

});
