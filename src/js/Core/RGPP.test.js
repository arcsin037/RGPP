"use strict";
describe('RGPP', function() {
	var assert = require('assert');
	var expect = expect || require('chai').expect;
	var RGPP = require('./RGPP');

	describe('Type Utility Functions', function() {
		var typeUtil = RGPP;

		var testCases = [{
			data: '',
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: "",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: " ",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: 'test',
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: false,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: true,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: NaN,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: "30.0",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "20.80",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "-20.85",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "-1",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "-1.5",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "0",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: ".42",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "99,999",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: "1.2.3",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: "0x89f",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: true,
		}, {
			data: "#abcdef",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: "\t\t",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: "\n\r",
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: 8e5,
			isDefined: true,
			isString: false,
			isInteger: true,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: Infinity,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: -Infinity,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: 0.0,
			isDefined: true,
			isString: false,
			isInteger: true,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: 0,
			isDefined: true,
			isString: false,
			isInteger: true,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: 1,
			isDefined: true,
			isString: false,
			isInteger: true,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: -1,
			isDefined: true,
			isString: false,
			isInteger: true,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: 0.1,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: -0.1,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: 0x8ef,
			isDefined: true,
			isString: false,
			isInteger: true,
			isFiniteNumber: true,
			isNumeric: true,
		}, {
			data: undefined,
			isDefined: false,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: null,
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: String(),
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: String("test"),
			isDefined: true,
			isString: true,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: {},
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, {
			data: [],
			isDefined: true,
			isString: false,
			isInteger: false,
			isFiniteNumber: false,
			isNumeric: false,
		}, ];

		describe('#isDefined / #isUnDefined', function() {

			testCases.forEach(function(test) {
				var notString = test.isDefined === false ? "un" : "";
				it(test.data + "<" + typeof test.data + "> is " + notString + "defined", function() {
					// is defined
					var resultIsDefined = typeUtil.isDefined(test.data);
					expect(resultIsDefined).to.equal(test.isDefined);
					// is undefined
					var resultIsUndefined = typeUtil.isUndefined(test.data);
					expect(resultIsUndefined).to.equal(!test.isDefined);
				});
			});
		});

		describe('#isString', function() {

			testCases.forEach(function(test) {
				var notString = test.isString === false ? "not " : "";
				it(test.data + "<" + typeof test.data + "> is " + notString + "String", function() {
					var result = typeUtil.isString(test.data);
					expect(result).to.equal(test.isString);
				});
			});
		});

		describe('#isIntegerType', function() {
			testCases.forEach(function(test) {
				var notString = test.isInteger === false ? "not " : "";
				it(test.data + "<" + typeof test.data + "> is " + notString + "integer value", function() {
					var result = typeUtil.isIntegerType(test.data);
					expect(result).to.equal(test.isInteger);
				});
			});
		});

		describe('#isFiniteNumber', function() {
			testCases.forEach(function(test) {
				var notString = test.isFiniteNumber === false ? "not " : "";
				it(test.data + "<" + typeof test.data + "> is " + notString + "finite number", function() {
					var result = typeUtil.isFiniteNumber(test.data);
					expect(result).to.equal(test.isFiniteNumber);
				});
			});
		});

		describe('#isNumeric', function() {
			testCases.forEach(function(test) {
				var notString = test.isNumeric === false ? "not " : "";
				it(test.data + "<" + typeof test.data + "> is " + notString + "numric", function() {
					var result = typeUtil.isNumeric(test.data);
					expect(result).to.equal(test.isNumeric);
				});
			});
		});


	});


	describe('#System.exportsAsSingleton', function() {

		before(function(done) {
			var Test = function() {
				var that = {};
				that.id = 1;
				return that;
			};
			var Test2 = function() {
				var that = {};
				that.id = 1;
				return that;
			};

			RGPP.System.exportsAsSingleton({
				name: "Test",
				constructorFunc: Test,
			});
			RGPP.System.exportsAsSingleton({
				name: "Test2",
				constructorFunc: Test2,
			});

			done();
		});

		it('same singleton test', function() {
			var test1 = RGPP.System.Test.getInstance();
			var test2 = RGPP.System.Test.getInstance();
			expect(test1).to.equal(test2);
		});

		it('another singleton test 2', function() {
			var test1 = RGPP.System.Test.getInstance();
			var test2 = RGPP.System.Test2.getInstance();
			assert.strictEqual(test1 === test2, false, "test1 & test2 are same object");
		});
	});

	describe("#setConfigParam / #getConfigParam", function() {
		var testCases = [{
				configName: 'GAME_NAME',
				configValue: "Test Game",
				expectedValue: "Test Game",
			}, {
				configName: 'RESOLUTION_X',
				configValue: 1280,
				expectedValue: 1280,
			}, {
				configName: 'RESOLUTION_Y',
				configValue: 960,
				expectedValue: 960,
			}, {
				configName: 'DEBUG_BOOT_MODE',
				configValue: false,
				expectedValue: false,
			}, {
				configName: 'foo',
				configValue: false,
				expectedValue: false,
			}, {
				configName: '',
				configValue: '',
				expectedValue: '',
			}, {
				configName: 'DEFAULT_FONT',
				configValue: "2.5em serif",
				expectedValue: "2.5em serif",
			}, {
				configName: 0,
				configValue: 9,
				expectedValue: undefined,
			}, {
				configName: 1,
				configValue: 10,
				expectedValue: undefined,
			}, {
				configName: -1,
				configValue: -10,
				expectedValue: undefined,
			}, {
				configName: {},
				configValue: {
					test: "test"
				},
				expectedValue: undefined,
			}, {
				configName: [],
				configValue: "array",
				expectedValue: undefined,
			}, {
				configName: undefined,
				configValue: "undefined",
				expectedValue: undefined,
			}, {
				configName: null,
				configValue: null,
				expectedValue: undefined,
			}, {
				configName: 'setConfigParam',
				configValue: function() {},
				expectedValue: undefined,
			}, {
				configName: 'getConfigParam',
				configValue: function() {},
				expectedValue: undefined,
			}, {
				configName: 'getConfigParam2',
				configValue: 2,
				expectedValue: 2,
			}

		];

		testCases.forEach(function(test) {
			it('set ' + test.configValue +
				' <' + typeof test.configValue + '>' +
				' to "' + test.configName +
				'" <' + typeof test.configName + '> => ' +
				test.expectedValue,
				function() {
					RGPP.setConfigParam(test.configName, test.configValue);
					expect(RGPP.getConfigParam(test.configName)).to.equal(test.expectedValue);
				});
		});
	});

});