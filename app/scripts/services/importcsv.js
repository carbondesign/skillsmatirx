angular.module('skillsMatrixApp')
	.service('ImportCSV', function(){
		this.datapass = 'bob';
		this.getData = function (data){
			this.datapass = data;
			return data
		}
		this.setData = function (){
			return this.datapass
		}


	})
