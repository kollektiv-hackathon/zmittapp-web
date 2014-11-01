/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.factory('apiMock', function(){

    var data = {
        days: [
            {
                date: new Date(),
                dishes: [
                    {
                        price: 20,
                        main: "Ross",
                        dessert: "Pflüümli"
                    }
                ]
            },
            {
                date: new Date(),
                dishes: [
                    {
                        price: 25,
                        main: "Chalb",
                        dessert: "Arsch"
                    }
                ]
            }
        ]
    };

    return function apiMock(entity){
        return data[entity];
    }

});