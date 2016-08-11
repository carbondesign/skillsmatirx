angular.module('skillsMatrixApp')
.factory('Auth', ['$firebaseAuth', function($firebaseAuth ){

	var login = function(loginModel){
		var user;
		var auth = $firebaseAuth("https://skillsmatrix-4f8b9.firebaseio.com");

		auth.$signInWithEmailAndPassword(loginModel.user, loginModel.password).then(function(firebaseUser) {
		    console.log("Signed in as:", firebaseUser);
		    user = firebaseUser
		    return user
		}).catch(function(error) {
		    console.error("Authentication failed:", error);
		});
	}



	return {
		login : login,
		user: user
	};
}])
