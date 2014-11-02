
zmittapp.factory('osmApi', function($rootScope, $q, $http){

    var requestUri = {
        search: 'http://nominatim.openstreetmap.org/search/',
        reverse: 'http://nominatim.openstreetmap.org/reverse/'
    };

    var requestQuery = function(request, filters){
        return requestUri[request] + filters + '?format=json';
    };

    function Api(request) {
        if(!(this instanceof Api)){
            return new Api(request);
        }

        this.request = request || 'search';

    }

    Api.prototype = {

        query: function(filters){
            var d = $q.defer();
            $rootScope.loading += 1;

            var url = requestQuery(this.request, filters);

            $http.get(url).
              success(function(data, status, headers, config) {
                d.resolve(data);
                $rootScope.loading -= 1;
              }).
              error(function(data, status, headers, config) {
                d.reject(data);
                $rootScope.loading -= 1;
              });

            return d.promise;
        }
    };


    return Api;
});
