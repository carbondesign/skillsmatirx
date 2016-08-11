'use strict';

/**
 * @ngdoc function
 * @name skillsMatrixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsMatrixApp
 */
angular.module('skillsMatrixApp')
    .controller('MainCtrl', function($scope, $firebaseObject, PositionsServ, ImportCSV) {
        var ref = firebase.database().ref().child("data");
        $scope.positArray = $firebaseArray(ref);

        // var syncObject = $firebaseObject(ref);
        // syncObject.$bindTo($scope, "data");
        $scope.positions = ImportCSV.data;
        // if (ImportCSV.getPositions) {
        //     ImportCSV.getPositions.map(function(posit) {
        //     	console.log(posit)
        //         $scope.positions.$add({
        //             position: posit
        //         });
        //     })
        // }
        console.log(ImportCSV.data)
    $scope.$watch('positions', function (newval) { console.log(newval)})

        // $scope.positions.$loaded(function() {
        //     if ($scope.positions.length === 0) {
        //         console.log('fail!!!', ImportCSV.data.json)
        //     }
        // });

    });
