'use strict';

/**
 * @ngdoc overview
 * @name skillsMatrixApp
 * @description
 * # skillsMatrixApp
 *
 * Main module of the application.
 */
angular
    .module('skillsMatrixApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'iso',
        'firebase'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('navbar', function($firebaseObject, $firebaseAuth) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBCXL3qvcK_DbpeDGfebgpKy2iDWRjkWKQ",
            authDomain: "skillsmatrix-4f8b9.firebaseapp.com",
            databaseURL: "https://skillsmatrix-4f8b9.firebaseio.com",
            storageBucket: "",
        };
        firebase.initializeApp(config);

        var auth = $firebaseAuth();

        auth.$signInWithEmailAndPassword("leigh765@me.com", "paint123").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });

    })
