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
        'ngTouch'
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
    .controller('navbar', function(){
    	// console.log('here')
    })

