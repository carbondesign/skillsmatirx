'use strict';

/**
 * @ngdoc function
 * @name skillsMatrixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsMatrixApp
 */
angular.module('skillsMatrixApp')
    .controller('MainCtrl', function($scope, ImportCSV) {
    	console.log(ImportCSV.data);
    	$scope.data = ImportCSV.data;
    	// $scope.$watch('data', function(newval){
    	// 	console.log(newval)
    	// })


    });
//
