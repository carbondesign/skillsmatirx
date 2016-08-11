'use strict';
angular.module('skillsMatrixApp')
    .factory('ImportCSV', function($q, FileReader, $firebaseArray) {
    	var data = {
    		loading: false
    	};

    	var contentParsed = {};
        var loadFile = function(files, encode, scope, $firebaseArray) {
	        	var fileJSON;
	        	var files = files;
	        	// console.log(files[0].name)
    	        for (var i = 0; i < files.length; i++) {
    	        	fileJSON = readFile(files[i], encode)
    	        	switch (files[i].name) {
    	        		case 'Positions.csv':
    	        			data.positions = fileJSON;
    	        			break;
    	        	// 	case 'Skills.csv':
    	        	// 		data.skills = resp;
    	        	// 		break;
    	        	// 	case 'Certifications.csv':
    	        	// 		data.certs = resp;
    	        	// 		break;
    	        	}
    	        }


        }

        var readFile = function(file){
        	FileReader.readAsText(file, encode).then(function (resp) {
    			resp = csvToJSON(resp);
	        	console.log(file.name);

	        	console.log(data);
        		return data;

    	    }, function (err) {
    	    	console.log(err);
    	        // Do stuff
    	    });
        }

        var csvToJSON = function(content) {

            var lines = content.split(new RegExp('\n(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
            var result = [];
            var start = 1;
            var columnCount = lines[0].split(',').length;
            var newheads =[];
            var headers = lines[0].split(',');
            headers.map(function(head){
            	newheads.push(head.split(" ").join("_"));
            });
            // console.log(newheads);
            for (var i = start; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(new RegExp(',' + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                if (currentline.length === columnCount) {
                    for (var j = 0; j < newheads.length; j++) {
                        obj[newheads[j]] = currentline[j];
                    };
                    // console.log(result, obj)
                    result.push(obj);
                }
            }
            return result;
        }

        var isLoading = function (){
        	console.log('load', loading);
        	return loading
        };
        return {
	        data:data,
	        loadFile: loadFile,
	        isLoading: isLoading,
	        csvToJSON: csvToJSON
	    };

    })
