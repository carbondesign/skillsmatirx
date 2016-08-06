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
        'ngCsvImport'
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
    .controller('navbar', ['$scope', '$http', 'ImportCSV',
        function($scope, $http, ImportCSV) {

            $scope.linkedinMsg = {};
            $scope.showLinkedinLogin = true;
            $scope.showEmailForm = true;

            $scope.csv = {
                content: null,
                header: true,
                headerVisible: true,
                separator:',',
                separatorVisible: false,
                result: null,
                encoding: 'ISO-8859-1',
                encodingVisible: true,
                callback:results
            };

            function results (data){
            	ImportCSV.getData(data)
            	$scope.data = data;
            	$scope.$apply();
            	console.log(data)
    		};
    		$scope.results = results;
            var _lastGoodResult = '';
            $scope.toPrettyJSON = function(json, tabWidth) {
                var objStr = JSON.stringify(json);
                var obj = null;
                try {
                    obj = $parse(objStr)({});
                } catch (e) {
                    // eat $parse error
                    return _lastGoodResult;
                }

                var result = JSON.stringify(obj, null, Number(tabWidth));
                _lastGoodResult = result;

                return result;
            };

        }
    ]);
