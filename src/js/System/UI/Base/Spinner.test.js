describe('Spinner', function() {
	"use strict";
	var jsdom = require('mocha-jsdom'),
		expect = expect || require('chai').expect,
		assert = assert || require('assert');

	var $;
	jsdom();

	require("./UIBase");
	var RGPP = require("./Spinner");


	before(function() {
		$ = require('jquery');
	});

	describe('#element', function() {
		var testCases = [{
			name: "arg is undefined",
			expectedValue: "input",
		}, {
			name: "arg is {}",
			arg: {},
			expectedValue: "input",
		}, {
			name: 'arg.key = "<input>"',
			arg: {
				key: "<input>"
			},
			expectedValue: "input",
		}];

		var isEqual = function($element, expectedValue) {
			if (typeof expectedValue === "undefined") {
				return $element === expectedValue;
			}
			return $element.is(expectedValue);
		};

		testCases.forEach(function(test) {

			it("Spinner test", function() {
				var spinner = RGPP.System.Spinner(test.arg, $);
				expect(spinner.getValue()).to.be.undefined;

				spinner.setValue(2);

				expect(spinner.getValue()).to.be.undefined;
			});

			it(test.name + " arg.key ver.", function() {
				var spinner = RGPP.System.Spinner(test.arg, $);
				var $element = spinner.element();
				expect(isEqual($element, test.expectedValue)).to.be.true;
			});

			it(test.name + ' $element is $("<input>")', function() {
				var $element = $("<input>");
				test.arg = test.arg || {};
				var uiBase = RGPP.System.Spinner({
					$element: $element,
					key: test.arg.key
				}, $);

				expect(uiBase.element()).to.equal($element);
			});
		});

	});
});