
zmittapp.controller('logoutController', function($scope, $location, messages){

  // destroy session cookie

  messages.info('Sie wurden erfolgreich ausgeloggt.');

  $location.path( "/login" ).replace();
});
