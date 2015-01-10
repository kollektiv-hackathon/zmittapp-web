
zmittapp.directive('zMap', function($rootScope){

  var map_style = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}];

  function controller($scope){


  }

  function link($scope, element, attrs){
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(47.368650, 8.539183),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_style,
        scrollwheel: false
    }

    var map = element.find('.map')[0];

    $scope.map = new google.maps.Map(map, mapOptions);

    var $input = $('.addressSuggestion')[0];
    var options = {
      address: true
    };

     $scope.autocomplete = new google.maps.places.Autocomplete($input, options);

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

      var geocoder = new google.maps.Geocoder();

      // set address
      geocoder.geocode({'latLng': pos}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          
          if (results[0]) {
            $input.value = results[0].formatted_address;
          }
        }
      });

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

         if(!$scope.profile){
             $scope.profile = {};
         }
         var address_components = place.address_components;

      $scope.profile.lat = place.geometry.location.lat();
      $scope.profile.lon = place.geometry.location.lng();
      $scope.profile.country = address_components[6].short_name; //CH
      $scope.profile.zip = address_components[7].short_name; //8001
      $scope.profile.city = address_components[5].long_name; //Zürich
      $scope.profile.address = address_components[1].long_name + ' ' + address_components[0].long_name; //Rennweg 4

      $scope.marker.setPosition(place.geometry.location);
      $scope.marker.setVisible(true);

     });

     // responsive
     google.maps.event.addDomListener(window, "resize", function() {
        var center = $scope.map.getCenter();
        google.maps.event.trigger(map, "resize");
        $scope.map.setCenter(center); 
     });

  }

  return {
    controller: controller,
    link: link,
    templateUrl: 'views/map.html'
  };

});
