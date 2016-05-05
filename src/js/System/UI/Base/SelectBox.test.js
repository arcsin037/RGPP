describe('SelectBox', function() {
	"use strict";
	var jsdom = require('mocha-jsdom'),
		expect = expect || require('chai').expect,
		assert = assert || require('assert');

	var $;
	jsdom();

	require("./UIBase");
	var RGPP = require("./SelectBox");


	before(function() {
		$ = require('jquery');
	});

	describe('#element', function() {
		var testCases = [{
			name: "arg is undefined",
			expectedValue: "select",
		}, {
			name: "arg is {}",
			arg: {},
			expectedValue: "select",
		}, {
			name: 'arg.key = "<select>"',
			arg: {
				key: "<select>"
			},
			expectedValue: "select",
		}];

		var isEqual = function($element, expectedValue) {
			if (typeof expectedValue === "undefined") {
				return $element === expectedValue;
			}
			return $element.is(expectedValue);
		};

		testCases.forEach(function(test) {

			it("SelectBox test", function() {
				var spinner = RGPP.System.SelectBox(test.arg, $);
				expect(spinner.getValue()).to.be.undefined;

				spinner.setValue(2);

				expect(spinner.getValue()).to.be.undefined;
			});

			it(test.name + " arg.key ver.", function() {
				var spinner = RGPP.System.SelectBox(test.arg, $);
				var $element = spinner.element();
				expect(isEqual($element, test.expectedValue)).to.be.true;
			});

			it(test.name + ' $element is $("<select>")', function() {
				var $element = $("<select>");
				test.arg = test.arg || {};
				var uiBase = RGPP.System.SelectBox({
					$element: $element,
					key: test.arg.key
				}, $);

				expect(uiBase.element()).to.equal($element);
			});
		});

	});
});