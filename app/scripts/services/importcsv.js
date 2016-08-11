'use strict';
angular.module('skillsMatrixApp')
    .factory('ImportCSV', function($q, FileReader) {
    	var data = {
    		json:[],
    		loading: false
    	};
    	var contentParsed = {};
        var loadFile = function(files, encode, scope) {
	        var content;
	        return FileReader.readAsText(files, encode, scope).then(function (resp) {
    	        // Do stuff
    	        resp = csvToJSON(resp);

    	        data.json = resp;
    	        console.log(data);
    	        return data;

    	    }, function (err) {
    	    	console.log(err);
    	        // Do stuff
    	    });
        }
        var getPositions = function(data){
        	console.log(data)
        	return data
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
            console.log(newheads);
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
