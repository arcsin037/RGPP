"use strict";
describe('Timer', function() {
	var expect = expect || require('chai').expect;
	var RGPP = require("./Timer");
	var timer = RGPP.System.Timer();

	describe('#measureFPS', function() {
		/**
		 * Measuring FPS (Test code)
		 */
		function measureFPS(expected_fps, done) {
			var interval = parseInt(1000 / expected_fps + 0.5, 10);
			timer.measureFPS();
			setTimeout(function() {
				var fps = timer.measureFPS();
				expect(parseInt(fps + 0.5, 10)).to.equal(expected_fps);
				done();
			}, interval);
		}

		var testCases = [{
			fps: 1
		}, {
			fps: 5
		}, {
			fps: 10
		}, {
			fps: 20
		}, ];

		testCases.forEach(function(test) {
			it('Test of measuring ' + test.fps + ' FPS', function(done) {
				measureFPS(test.fps, done);
			});
		});
	});

	describe('#getCurrentTime', function() {
		/**
		 * Get current time test (Test code)
		 */
		function getCurrentTimeTest(expected_time, done) {
			var prev;

			setTimeout(function() {
				var current = timer.getCurrentTime();
				expect(parseInt((current - prev) + 0.5, 10)).to.equal(expected_time);
				done();
			}, expected_time);
			prev = timer.getCurrentTime();
		}
		var testCases = [{
			elapsedTime: 100
		}, {
			elapsedTime: 200
		}, {
			elapsedTime: 300
		}, {
			elapsedTime: 600
		}, ];

		testCases.forEach(function(test) {
			it('Elapsed Time ' + test.elapsedTime + ' (ms)', function(done) {
				getCurrentTimeTest(test.elapsedTime, done);
			});
		});
	});

});
