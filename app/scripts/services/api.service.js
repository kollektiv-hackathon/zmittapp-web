/**
 * Created by remo on 01/11/14.
 */

zmittapp.factory('api', function($rootScope, $resource, $q, auth){

    var resourceCache = (function(){

        var _cache = {};

        var _urlMappings = {
            menuItem: 'restaurants/' + auth.getId() + '/menuitems/:id',
            restaurant: 'restaurants/:id'
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

    var wrapModel = function(model, entityType){

        var modelWrapper = {};
        modelWrapper[entityType] = model;

        modelWrapper.id = model.id;

        return modelWrapper;
    };

    function Api(entityType) {
        if(!(this instanceof Api)){
            return new Api(entityType);
        }
        this.entityType = entityType;
        this.res = resourceCache(entityType);
    }



    Api.prototype = {

        query: function(filters){
            var d = $q.defer();
            $rootScope.loading = true;

            this.res.query(function(data){
                d.resolve(data);
                $rootScope.loading = false;
            });
            return d.promise;
        },
        create: function(model){
            this.res.create(model);
        },
        update: function(model){
            var d = $q.defer();
            $rootScope.loading = true;

            var m = new this.res(wrapModel(model, this.entityType));
            m.$update(function(data){
                d.resolve(data);
                $rootScope.loading = false;
            });

            return d.promise;
        },
        remove: function(model){
            var m = new this.res(model);
            m.$delete();
        },
        get: function(id){
            var d = $q.defer();
            $rootScope.loading = true;

            this.res.get({id: id}, function(data){
                d.resolve(data);
                $rootScope.loading = false;
            });
            return d.promise;
        }
    };


    return Api;
});
