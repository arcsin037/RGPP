"use strict";
describe('StringUtil', function() {
	var assert = assert || require('assert');
	var expect = expect || require('chai').expect;
	var RGPP = require("./StringUtil");

	var stringUtil = RGPP.System.StringUtil.getInstance();

	describe('#isEmptyString', function() {
		var testCases = [{
			data: '',
			expectedValue: true,
		}, {
			data: "",
			expectedValue: true,
		}, {
			data: " ",
			expectedValue: false,
		}, {
			data: 'test',
			expectedValue: false,
		}, {
			data: false,
			expectedValue: false,
		}, {
			data: true,
			expectedValue: false,
		}, {
			data: 0,
			expectedValue: false,
		}, {
			data: 1,
			expectedValue: false,
		}, {
			data: -1,
			expectedValue: false,
		}, {
			data: undefined,
			expectedValue: false,
		}, {
			data: null,
			expectedValue: false,
		}, {
			data: String(),
			expectedValue: true,
		}, {
			data: String("test"),
			expectedValue: false,
		}, {
			data: {},
			expectedValue: false,
		}, {
			data: [],
			expectedValue: false,
		}, ];

		testCases.forEach(function(test) {
			var notString = test.expectedValue === false ? "not " : "";
			it(test.data + "<" + typeof test.data + "> is " + notString + "Empty String", function() {
				var result = stringUtil.isEmptyString(test.data);
				expect(result).to.equal(test.expectedValue);
			});
		});
	});

	describe('#substitute', function() {
		var originalStr = 'hellohellohello';

		var testCases = [{
			searchStr: 'll',
			replacementStr: 'mm',
			expectedValue: 'hemmohemmohemmo',
		}, {
			searchStr: 'hello',
			replacementStr: 'hellohello',
			expectedValue: 'hellohellohellohellohellohello',
		}, {
			searchStr: 'll',
			replacementStr: 'll',
			expectedValue: 'hellohellohello',
		}, {
			searchStr: 'll',
			replacementStr: '',
			expectedValue: 'heoheoheo',
		}, {
			searchStr: '',
			replacementStr: '',
			expectedValue: 'hellohellohello',
		}, {
			searchStr: 'hellohellohello',
			replacementStr: '',
			expectedValue: '',
		}, ];

		testCases.forEach(function(test) {
			it('substitue ' + test.searchStr + ' -> ' + test.replacementStr, function() {
				var result = stringUtil.substitute(originalStr, test.searchStr, test.replacementStr);
				expect(result).to.equal(test.expectedValue);
			});
		});
	});

	describe('#extractFileNameExceptForExtension', function() {

		var testCases = [{
			fileName: "test.js",
			expectedValue: "test",
		}, {
			fileName: "test",
			expectedValue: "test",
		}, {
			fileName: "test.test.js",
			expectedValue: "test.test",
		}, {
			fileName: "test.test.test.js",
			expectedValue: "test.test.test",
		}, {
			fileName: ".js",
			expectedValue: "",
		}, {
			fileName: "",
			expectedValue: "",
		}, ];

		testCases.forEach(function(test) {
			it('extract ' + test.expectedValue + ' from ' + test.fileName, function() {
				var result = stringUtil.extractFileNameExceptForExtension(test.fileName);
				expect(result).to.equal(test.expectedValue);
			});
		});

		var assertTestCases = [{
			fileName: 0,
		}, {
			fileName: null,
		}, {
			fileName: undefined,
		}, {
			fileName: {},
		}, ];

		assertTestCases.forEach(function(test) {
			var objectType = test.fileName === null ? null : typeof test.fileName;
			it('Error file name ' + objectType, function() {
				assert.throws(function() {
						stringUtil.extractFileNameExceptForExtension(test.fileName);
					},
					"can not input " + objectType);
			});
		});
	});

	describe('#extractExtension', function() {
		var testCases = [{
			fileName: "test.js",
			expectedValue: "js",
		}, {
			fileName: "test",
			expectedValue: "",
		}, {
			fileName: "test.test.js",
			expectedValue: "js",
		}, {
			fileName: "test.test.test.js",
			expectedValue: "js",
		}, {
			fileName: ".js",
			expectedValue: "js",
		}, {
			fileName: "",
			expectedValue: "",
		}, ];

		testCases.forEach(function(test) {
			it('extract ' + test.expectedValue + ' from ' + test.fileName, function() {
				var result = stringUtil.extractExtension(test.fileName);
				expect(result).to.equal(test.expectedValue);
			});
		});

		var assertTestCases = [{
			fileName: 0,
		}, {
			fileName: null,
		}, {
			fileName: undefined,
		}, {
			fileName: {},
		}, ];

		assertTestCases.forEach(function(test) {
			var objectType = test.fileName === null ? null : typeof test.fileName;
			it('Error file name is ' + objectType, function() {
				assert.throws(function() {
						stringUtil.extractExtension(test.fileName);
					},
					"can not input " + objectType);
			});
		});

	});

});
