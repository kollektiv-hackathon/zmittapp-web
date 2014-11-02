
zmittapp.directive('zMap', function($rootScope){

  var map_style = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}];

  function controller($scope){


  }

  function link($scope, element, attrs){
    var mapOptions = {
        zoom: 8,
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

     // prepare marker
     $scope.marker = new google.maps.Marker({
       map: $scope.map
     });

     var unregister = $scope.$watchCollection('[profile.lat, profile.lon]', function(newValue, oldValue){

      if(newValue[0] === undefined || newValue[1] == undefined){
        return;
      }

      var pos = new google.maps.LatLng(newValue[0], newValue[1]);

      $scope.marker.setPosition(pos);
      $scope.map.setZoom(15); 
      $scope.map.setCenter(pos); 

      unregister();

     });


     google.maps.event.addListener($scope.autocomplete, 'place_changed', function() {

      var place = $scope.autocomplete.getPlace();

      $scope.marker.setVisible(false);

      if (!place.geometry) {
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        $scope.map.fitBounds(place.geometry.viewport);
      } else {
        $scope.map.setCenter(place.geometry.location);
        $scope.map.setZoom(15); 
      }

      $scope.profile.lat = place.geometry.location.lat();
      $scope.profile.lon = place.geometry.location.lng();

      console.log(place);

      console.log($scope.profile.lat);
      console.log($scope.profile.lon);

      $scope.marker.setPosition(place.geometry.location);
      $scope.marker.setVisible(true);

     });

  }

  return {
    controller: controller,
    link: link,
    templateUrl: 'views/map.html'
  };

});
