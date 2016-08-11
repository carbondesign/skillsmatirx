/*! angular-csv-import - v0.0.31 - 2016-07-07
* Copyright (c) 2016 ; Licensed  */
'use strict';

angular.module('skillsMatrixApp')
	.directive('ngCsvImport',  function(FileReader, ImportCSV) {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {},
		template: '<div>'+
		  '<div ng-show="headerVisible"><div class="label">Header</div><input type="checkbox" ng-model="header"></div>'+
			'<div ng-show="encoding && encodingVisible"><div class="label">Encoding</div><span>{{encoding}}</span></div>'+
			'<div ng-show="separator && separatorVisible">'+
			'<div class="label">Seperator</div>'+
			'<span><input class="separator-input" type="text" ng-change="changeSeparator" ng-model="separator"><span>'+
			'</div>'+
			'<div><input class="btn cta gray" type="file" multiple accept="{{accept}}"/></div>'+
			'</div>',
		link: function(scope, element) {
			// scope.separatorVisible = scope.separatorVisible || false;
			// scope.headerVisible = scope.headerVisible || false;
			element.on('change', function(onChangeEvent) {
				// console.log(onChangeEvent.target.files)
			    var files = onChangeEvent.target.files;
			    ImportCSV.loadFile(files, 'ISO-8859-1', scope)
			})

		}
	};
});
