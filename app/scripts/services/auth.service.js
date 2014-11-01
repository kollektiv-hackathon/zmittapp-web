/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.factory('auth', function(){

	return {
    	getAccessToken: function(){
      		return true;
    	},

		getId: function(){
			var id = localStorage.getItem("restaurantId");
			if(id == null){
				localStorage.setItem("restaurantId", 1);
			}

			return id || 1;
		},

    	login: function(username, password){

    	}
  	};
});
