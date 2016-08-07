angular.module('skillsMatrixApp')
    .factory('ImportCSV', function($q, FileReader) {
    	var data = {

    		json:[],
    		loading: false
    	};
    	var contentParsed = {};
        const loadFile = function(file, encode, scope) {
	        var content;
	        return FileReader.readAsText(file, encode, scope).then(function (resp) {
    	        // Do stuff
    	        resp = csvToJSON(resp)

    	        data.json = resp;
    	        console.log(data);

    	        return data

    	    }, function (err) {
    	    	console.log(err)
    	        // Do stuff
    	    });
        }
        const csvToJSON = function(content) {

            var lines = content.split(new RegExp('\n(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
            var result = [];
            var start = 1;
            var columnCount = lines[0].split(',').length;

            var headers = lines[0].split(',');
            console.log(headers)
            for (var i = start; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(new RegExp(',' + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                if (currentline.length === columnCount) {
                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }
                    // console.log(result, obj)
                    result.push(obj);
                }
            }
            return result;
        }

        var isLoading = function (){
        	console.log('load', loading)
        	return loading
        }
        return {
	        data:data,
	        loadFile: loadFile,
	        isLoading: isLoading,
	        csvToJSON: csvToJSON
	    };

    })
