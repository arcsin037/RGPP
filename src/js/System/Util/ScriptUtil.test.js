"use strict";
describe('ScriptUtil', function() {
	var assert = assert || require('assert');
	var expect = expect || require('chai').expect;

	var RGPP = require("./ScriptUtil");

	var scriptUtil = RGPP.System.ScriptUtil.getInstance();

	describe('#memolizer', function() {

		describe("fibonacci", function() {
			var fibonacci = scriptUtil.memolizer([0, 1], function(shell, n) {
				return shell(n - 1) + shell(n - 2);
			});

			var testCases = [{
				n: 0,
				expectedValue: 0,
			}, {
				n: 1,
				expectedValue: 1,
			}, {
				n: 2,
				expectedValue: 1,
			}, {
				n: 3,
				expectedValue: 2,
			}, {
				n: 4,
				expectedValue: 3,
			}, {
				n: 5,
				expectedValue: 5,
			}, {
				n: 6,
				expectedValue: 8,
			}, {
				n: 7,
				expectedValue: 13,
			}, {
				n: 78,
				expectedValue: 8944394323791464,
			}, ];

			testCases.forEach(function(test) {
				it('[' + test.n + ']' + ' is ' + test.expectedValue, function() {
					expect(fibonacci(test.n)).to.equal(test.expectedValue);
				});
			});

		});

		describe("factorial", function() {
			var factorial = scriptUtil.memolizer([1, 1], function(shell, n) {
				return n * shell(n - 1);
			});

			var testCases = [{
				n: 0,
				expectedValue: 1,
			}, {
				n: 1,
				expectedValue: 1,
			}, {
				n: 2,
				expectedValue: 2,
			}, {
				n: 3,
				expectedValue: 6,
			}, {
				n: 4,
				expectedValue: 24,
			}, {
				n: 5,
				expectedValue: 120,
			}, {
				n: 6,
				expectedValue: 720,
			}, {
				n: 7,
				expectedValue: 5040,
			}, {
				n: 10,
				expectedValue: 3628800,
			}, {
				n: 18,
				expectedValue: 6402373705728000,
			}, {
				n: 19,
				expectedValue: 121645100408832000,
			}, {
				n: 56,
				expectedValue: 710998587804863451854045647463724949736497978881168458687447040000000000000,
			}, {
				n: 10,
				expectedValue: 3628800,
			}, ];

			testCases.forEach(function(test) {
				it('[' + test.n + ']' + ' is ' + test.expectedValue, function() {
					expect(factorial(test.n)).to.equal(test.expectedValue);
				});
			});
		});
	});

	describe("#terminate / #debugBreak / #outputMsgToConsole / #outputErrMsgToConsole", function() {
		var testCases = [{
			debugBootMode: false,
		}, {
			debugBootMode: true,
		}];

		var message = "test message";

		function checkNoErrorFunction(func) {
			assert.doesNotThrow(function() {
					func(message);
				},
				Error,
				"Error is occured");

		}

		testCases.forEach(function(test) {
			describe('debug boot mode = ' + test.debugBootMode, function() {
				before(function() {
					RGPP.Config.setConfigParam("DEBUG_BOOT_MODE", test.debugBootMode);
				});
				it("#terminate", function() {
					checkNoErrorFunction(scriptUtil.terminate);
				});
				it("#debugBreak", function() {
					checkNoErrorFunction(scriptUtil.debugBreak);
				});

				it("#outputMsgToConsole", function() {
					checkNoErrorFunction(scriptUtil.outputMsgToConsole);
				});

				it("#outputErrMsgToConsole", function() {
					checkNoErrorFunction(scriptUtil.outputErrMsgToConsole);
				});
			});
		});
	});

	describe("#assert", function() {
		var message = "error message";

		function assertTest(test, debugBootMode) {
			RGPP.Config.setConfigParam("DEBUG_BOOT_MODE", debugBootMode);
			if (test.assertion) {
				assert.throws(function() {
						scriptUtil.assert(test.booleanValue, message);
					},
					Error,
					"Error is not occured");

			}
			else {
				assert.doesNotThrow(function() {
						scriptUtil.assert(test.booleanValue, message);
					},
					Error,
					"Error is occured");

			}
		}

		describe("debug boot mode = false", function() {
			var testCases = [{
				booleanValue: false,
				assertion: false,
			}, {
				booleanValue: true,
				assertion: false,
			}, {
				booleanValue: undefined,
				assertion: false,
			}, {
				booleanValue: null,
				assertion: false,
			}, {
				booleanValue: 0,
				assertion: false,
			}, {
				booleanValue: -1,
				assertion: false,
			}, {
				booleanValue: 1,
				assertion: false,
			}, {
				booleanValue: NaN,
				assertion: false,
			}, {
				booleanValue: '',
				assertion: false,
			}, {
				booleanValue: 'test',
				assertion: false,
			}, {
				booleanValue: {},
				assertion: false,
			}, ];

			testCases.forEach(function(test) {
				it("value = " + test.booleanValue +
					" / assertion? " + test.assertion,
					function() {
						assertTest(test, false);
					});
			});
		});

		describe("debug boot mode = true", function() {
			var testCases = [{
				booleanValue: false,
				assertion: true,
			}, {
				booleanValue: true,
				assertion: false,
			}, {
				booleanValue: undefined,
				assertion: true,
			}, {
				booleanValue: null,
				assertion: true,
			}, {
				booleanValue: 0,
				assertion: true,
			}, {
				booleanValue: -1,
				assertion: false,
			}, {
				booleanValue: 1,
				assertion: false,
			}, {
				booleanValue: NaN,
				assertion: true,
			}, {
				booleanValue: '',
				assertion: true,
			}, {
				booleanValue: 'test',
				assertion: false,
			}, {
				booleanValue: {},
				assertion: false,
			}, {
				booleanValue: [],
				assertion: false,
			}, ];

			testCases.forEach(function(test) {
				it("value = " + test.booleanValue +
					" / assertion? " + test.assertion,
					function() {
						assertTest(test, true);
					});
			});
		});

	});


});
