/**
 * Created by remo on 01/11/14.
 */

zmittapp.factory('api', function($resource, $q, auth){

    var resourceCache = (function(){

        var _cache = {};

        var _urlMappings = {
            menuitems: 'restaurants/' + auth.getId() + '/menuitems/:id',
            profile: 'restaurants/' + auth.getId()
        };

        return function(entityType){
            var restPath = _urlMappings[entityType] || entityType + '/:id';
            if(typeof _cache[entityType] === 'undefined'){
                _cache[entityType] = $resource('http://192.168.0.30/app_dev.php/' + restPath, {id:'@id'}, {
                    'update':   {method:'PUT'},
                    'create':   {method:'POST'}
                });
            }

            return _cache[entityType];
        }

    })();

    function Api(entityType) {
        if(!(this instanceof Api)){
            return new Api(entityType);
        }

        this.res = resourceCache(entityType);
    }



    Api.prototype = {

        query: function(filters){
            var d = $q.defer();

            this.res.query(function(data){
                d.resolve(data);
            });
            return d.promise;
        },
        create: function(model){
            this.res.create(model);
        },
        update: function(model){
            var m = new this.res(model);
            m.$update();
        },
        remove: function(model){
            var m = new this.res(model);
            m.$delete();
        },
        get: function(id){
            var d = $q.defer();

            this.res.get(id, function(data){
                d.resolve(data);
            });
            return d.promise;
        }
    };


    return Api;
});
