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
 		$scope.data = ImportCSV.setData();
    });
