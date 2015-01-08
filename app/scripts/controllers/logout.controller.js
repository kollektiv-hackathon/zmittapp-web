
zmittapp.controller('logoutController', function($scope, $location, messages, auth){

  // destroy session cookie
    auth.logout();
    messages.info('Sie wurden erfolgreich ausgeloggt.');
    $location.path( "/login" ).replace();
});
