'use strict';
angular.module('skillsMatrixApp')
    .factory("PositionsServ", ["$firebaseArray",
        function($firebaseArray, ImportCSV) {
            // create a reference to the database location where we will store our data
            var ref = firebase.database().ref();
            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        }
    ]);
