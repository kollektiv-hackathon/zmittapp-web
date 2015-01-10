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
            $rootScope.loading += 1;
            // returns a promise that returns the oauth object or error data
            return $http({
                method: 'GET',
                url: 'http://api.zmittapp.ch/app_dev.php/' + 'oauth/v2/token',
                params: {
                    client_id: '1_32lys5v98xkwk80osss48cs0w0w8g8okcs0s88wo0gwokssgwk', // will change by calling pull.php on api server
                    client_secret: '21ax6r2vbqn4osg0s0k8sgg0c4kck4sosggwkkg4oswkg880cs', // same
                    username: username,
                    password: password,
                    grant_type: 'password'
                }
            })
            .then(
            function (response) {
                $rootScope.loading -= 1;
                return {
                    access_token: response.data.access_token,
                    expires_in: response.data.expires_in,
                    token_type: response.data.token_type,
                    scope: response.data.scope,
                    refresh_token: response.data.refresh_token
                };
            },
            function (httpError) {
                $rootScope.loading -= 1;
                throw httpError;
            });

    	},

        logout: function(){
            $rootScope.oauth = null;
        },

        isLoggedIn: function(){
            if($rootScope.oauth && $rootScope.oauth.access_token){
                return true;
            }
            return false;
        }
  	};
});
