
zmittapp.controller('logoutController', function($scope, $location){

  // destroy session cookie

  console.log('logout');

  $location.path( "/login" ).replace();
});
