
zmittapp.controller('menuController', function($scope, messages, api, apiMock){

    $scope.days = [
        'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'
    ];

    $scope.dayDishes = apiMock('days');

});