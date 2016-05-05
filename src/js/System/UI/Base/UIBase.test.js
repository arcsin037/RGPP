describe('UIBase', function() {
	"use strict";
	var jsdom = require('mocha-jsdom'),
		expect = expect || require('chai').expect,
		assert = assert || require('assert');

	var $;
	jsdom();

	var RGPP = require("./UIBase");


	before(function() {
		$ = require('jquery');
	});

	describe('#element', function() {
		var testCases = [{
			name: "Test of div element",
			arg: {
				key: "<div>"
			},
			expectedValue: "div",
		}, {
			name: "Test of input element",
			arg: {
				key: "<input>"
			},
			expectedValue: "input",
		}, {
			name: "Test of input element with undefined",
			arg: {
				$element: undefined,
				key: "<input>"
			},
			expectedValue: "input",
		}, {
			name: "Test of ul element",
			arg: {
				key: "<ul>"
			},
			expectedValue: "ul",
		}, {
			name: "Test of li element",
			arg: {
				key: "<li>"
			},
			expectedValue: "li",
		}, {
			name: "Test of empty element",
			expectedValue: undefined,
		}, ];

		var isEqual = function($element, expectedValue) {
			if (typeof expectedValue === "undefined") {
				return $element === expectedValue;
			}
			return $element.is(expectedValue);
		};

		testCases.forEach(function(test) {
			it(test.name + " arg.key ver.", function() {
				var uiBase = RGPP.System.UIBase(test.arg, $);
				var $element = uiBase.element();
				expect(isEqual($element, test.expectedValue)).to.be.true;
			});

			it(test.name + " arg.$element ver.", function() {
				var arg = test.arg || {};
				var $element = (arg.key && $(arg.key));
				var uiBase = RGPP.System.UIBase({
					$element: $element,
					key: arg.key
				}, $);

				expect(uiBase.element()).to.equal($element);
			});
		});

	});
});