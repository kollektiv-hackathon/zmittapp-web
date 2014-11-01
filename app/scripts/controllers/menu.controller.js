
zmittapp.controller('menuController', function($scope, messages, api, apiMock){

    $scope.days = [
        'Montag', 'Dienstag', 'Mittwoch', 'Freitag', 'Samstag', 'Sonntag'
    ];

    $scope.dayDishes = apiMock('days');

});
