
zmittapp.directive('zMap', function($rootScope){

  function controller($scope){


  }

  function link($scope, element, attrs){
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(element[0], mapOptions);

    console.log('test');

  }

  return {
    controller: controller,
    link: link,
    templateUrl: 'views/map.html'
  };

});
