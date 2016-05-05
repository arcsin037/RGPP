/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "Random";

	/**
	 * Random utility functions
	 * @class Random
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// create random float value
		that.createRandFloat = createRandFloat;

		// create random integer value
		that.createRandInt = createRandInt;

		// create -1 or 1
		that.createRandSign = createRandSign;

		var typeUtil = RGPP;

		/**
		 * Create random float value.
		 * @method createRandFloat
		 * @param arg {Object}
		 * @param arg.from {Number} Minimum (or maximum) value of random value
		 * @param arg.to {Number} Maximum (or minimum) value of random value
		 * @return {Number} Float value from &lt;arg.from&gt; to &lt;arg.to&gt;
		 */
		function createRandFloat(arg) {
			var from = arg.from;
			var to = arg.to;

			if (typeUtil.isUndefined(from)) {
				//create random real number from 0 to 'to'
				return Math.random() * to;
			}
			else {
				//create random real number from 'from' to 'to'
				return Math.random() * (to - from) + from;
			}
		}

		/**
		 * Create random integer value.
		 * @method createRandInt
		 * @param arg {Object}
		 * @param arg.from {Number} Minimum (or maximum) value of random value
		 * @param arg.to {Number} Maximum (or minimum) value of random value
		 * @return {Number} Integer value from &lt;arg.from&gt; to &lt;arg.to&gt;
		 */
		function createRandInt(arg) {
			if (typeUtil.isUndefined(arg.from)) {
				arg.from = 0;
			}
			arg.from = parseInt(arg.from, 10);
			arg.to = parseInt(arg.to, 10);

			return Math.round(createRandFloat(arg));
		}

		/**
		 * Create -1 or 1
		 * @method createRandSign
		 * @return {Number} Random value which is -1 or 1.
		 */
		function createRandSign() {
			return createRandInt({
				to: 1
			}) * 2 - 1;
		}
		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
