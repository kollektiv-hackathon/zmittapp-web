
zmittapp.directive('zMap', function($rootScope){

  var map_style = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];

  function controller($scope){


  }

  function link($scope, element, attrs){
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(47.368650, 8.539183),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_style
    }

    var map = element.find('.map')[0];

    $scope.map = new google.maps.Map(map, mapOptions);

    var input = $('.addressSuggestion')[0];
    var options = {
      address: true
    };

     $scope.autocomplete = new google.maps.places.Autocomplete(input, options);

  }

  return {
    controller: controller,
    link: link,
    templateUrl: 'views/map.html'
  };

});
