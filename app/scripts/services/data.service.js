/**
 * Created by remo on 12/11/14.
 */

'use strict';

zmittapp.factory('data', function(api){

    function get(_api, param){
        if(typeof param === "object" || typeof param === "undefined"){
            return _api.query(param);
        }else{
            return _api.get(param);
        }
    }

    function Layer(entity){
        this.api = api(entity);
    }
    Layer.prototype = {

        /**
         * Returns a single menu item or a collection of items.
         * @param {any} param An id as a string or number or a filter as object.
         */
        get: function(param){
            return get(this.api, param);
        },

        create: function(model){
            return this.api.create(model);
        },

        update: function(model){
            return this.api.update(model);
        },

        remove: function(model){
            return this.api.remove(model);
        }
    };

    /**
     * Object which is accessible from this service.
     * Usage ex: data.menuItem.get(ID).then(...)
     */
    return {
        menuItem: (function(){
            return new Layer("menuItem");
        })(),

        restaurant: (function(){
            return new Layer("restaurant");
        })()
    };

});