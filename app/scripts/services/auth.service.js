/**
 * Created by remo on 01/11/14.
 */

'use strict';

zmittapp.factory('auth', function($rootScope, $http){

	return {
		getId: function(){
			var id = localStorage.getItem("restaurantId");
			if(id == null){
				localStorage.setItem("restaurantId", 1);
			}

			return id || 1;
		},

    	login: function(username, password){
            // returns a promise that returns the oauth object or error data
            return $http({
                method: 'GET',
                url: 'http://api.zmittapp.ch/app_dev.php/' + 'oauth/v2/token',
                params: {
                    client_id: '1_3p6fcokbu204sw400sw84kwkkw40o84cog8cgc4wg0s4k0wgww', // will change by calling pull.php on api server
                    client_secret: '4ih182gn1eo08cwogoogok0c4o0c4csc84k884kwsco0ww84cw', // same
                    username: username,
                    password: password,
                    grant_type: 'password'
                }
            })
            .then(
            function (response) {
                return {
                    access_token: response.data.access_token,
                    expires_in: response.data.expires_in,
                    token_type: response.data.token_type,
                    scope: response.data.scope,
                    refresh_token: response.data.refresh_token
                };
            },
            function (httpError) {
                throw httpError;
            });

    	},

        logout: function(){
            $rootScope.oauth = null;
        },

        isLoggedIn: function(){
            console.log($rootScope.oauth);
            return $rootScope.oauth.access_token !== null;
        }
  	};
});
