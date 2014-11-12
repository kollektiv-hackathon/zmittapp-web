/**
 * Created by remo on 12/11/14.
 */

'use strict';

zmittapp.factory('data', function($q){

    var _data = {
        "menuItem": [
            {
                id: 1,
                date: "2014-11-10T15:15:28.144Z",
                appetizer: "Vorspeise mit Vorspeise",
                main_course: "Hauptgang mit Reis und Hauptgang",
                desert: "Nachspeise und Dessert",
                price: 50.50
            },
            {
                id: 2,
                date: "2014-11-13T15:15:28.144Z",
                appetizer: "Vorspeise mit Vorspeise",
                main_course: "Hauptgang mit Reis und Hauptgang",
                desert: "Nachspeise und Dessert",
                price: 50.50
            }
        ]
    };

    function getPromise(data){
        var d = $q.defer();
        d.resolve(data);
        return d.promise;
    }

    function Layer(entity){
        this.entity = entity;
    }
    Layer.prototype = {

        data: function(){
            if(!_data[this.entity]){
                _data[this.entity] = [];
            }
            return _data[this.entity];
        },

        getIndex: function(model){
            for(var i = 0; i < this.data().length; i++){
                if(this.data()[i].id === model.id){
                    return i;
                }
            }

            return undefined;
        },

        get: function(param){
            if(typeof param === 'object' || typeof param === 'undefined'){
                return getPromise(this.data());
            }else{
                return getPromise(this.data().filter(function(i) { return i.id === param })[0]);
            }
        },

        create: function(model){
            model.id = Math.random();
            this.data().push(model);
            return getPromise(model);
        },

        update: function(model){
            var i = this.getIndex(model);
            this.data()[i] = model;
            return getPromise(model);
        },

        remove: function(model){
            var i = this.getIndex(model);
            this.data().splice(i, 1);
            return getPromise(true);
        }
    };

    return {
        menuItem: (function(){
            return new Layer("menuItem");
        })(),

        restaurant: (function(){
            return new Layer("restaurant");
        })()
    };

});