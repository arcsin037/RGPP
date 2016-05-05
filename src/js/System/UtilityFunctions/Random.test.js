"use strict";
describe('Random', function() {
	var assert = assert || require('assert');
	var expect = expect || require('chai').expect;

	var RGPP = require("./Random");

	var random = RGPP.System.Random.getInstance();

	var MAX_LOOP_NUM = 100;

	var testCases = [{
			from: 0,
			to: 1
		}, {
			from: -1,
			to: 1
		}, {
			from: -1.5,
			to: 1.5
		}, {
			from: 0,
			to: 0
		}, {
			from: -100,
			to: 200
		}, {
			from: -5000,
			to: 4000
		}, {
			from: 0.5,
			to: -20.5
		}, {
			from: -0.2,
			to: -0.3
		}, {
			from: -5,
			to: -7,
		}, {
			from: 5,
			to: 7,
		}, {
			from: 0.5,
			to: 0.2,
		}, {
			from: 0.7,
			to: -0.4,
		}, {
			from: 10000,
			to: 0
		}, {
			from: 20.5,
			to: -10.5
		}, {
			from: 0,
			to: -1
		}, {
			from: 1.5,
			to: -1.5
		},

	];

	describe("#createRandFloat", function() {

		testCases.forEach(function(test) {
			it(test.from + " ~ " + test.to, function() {

				for (var i = 0; i < MAX_LOOP_NUM; i += 1) {
					var result = random.createRandFloat({
						from: test.from,
						to: test.to
					});

					var range = Math.abs(test.to - test.from) / 2;
					var base = (test.from + test.to) / 2;
					expect(result).to.be.closeTo(base, range);

				}
			});

		});
	});

	describe("#createRandInt", function() {
		testCases.forEach(function(test) {
			it(test.from + " ~ " + test.to, function() {

				for (var i = 0; i < MAX_LOOP_NUM; i += 1) {
					var result = random.createRandInt({
						from: test.from,
						to: test.to
					});
					var fromInteger = parseInt(test.from, 10);
					var toInteger = parseInt(test.to, 10);
					var range = Math.abs(toInteger - fromInteger) / 2;
					var base = (fromInteger + toInteger) / 2;
					expect(result).to.be.closeTo(base, range);
					expect(result).to.be.equal(parseInt(result, 10));
				}
			});

		});

	});

	describe("#createRandSign", function() {
		it("-1 or 1", function() {
			for (var i = 0; i < MAX_LOOP_NUM; i += 1) {
				var value = random.createRandSign();
				var result = value === -1 || value === 1;
				expect(result).to.be.ok;
			}
		});
	});

});