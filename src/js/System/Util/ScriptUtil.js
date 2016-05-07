/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ScriptUtil";

	/**
	 * Script Utility Functions
	 * @class Script Utility Functions
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// For memolization function
		that.memolizer = memolizer;

		// Terminate process in debug boot mode
		that.terminate = terminate;

		// Assertion in debug boot mode
		that.assert = assert;

		// Break by debugger
		that.debugBreak = debugBreak;

		// Get Superior Function
		that.superiorFunc = superiorFunc;

		// output message to console in debug boot mode
		that.outputMsgToConsole = outputMsgToConsole;

		// output error message to console in debug boot mode
		that.outputErrMsgToConsole = outputErrMsgToConsole;
		
		// alert
		that.alert = alertFunction;

		/**
		 * For memolization function
		 * @method memolizer
		 * @param memo result stack
		 * @param {Function} fundamental fundamental function
		 */
		function memolizer(memo, fundamental) {
			var shell = function(n) {

				var result = memo[n];
				if (typeof result !== "number") {
					result = fundamental(shell, n);
					memo[n] = result;
				}
				return result;
			};

			return shell;
		}

		/**
		 * Terminate process in debug boot mode
		 * 
		 * @method terminate
		 * @param {string} errorMsg error message when the process is terminated
		 */
		function terminate(errorMsg) {
			// Console error message
			if (RGPP.Config.DEBUG_BOOT_MODE) {
				console.error("!!!Terminated!!!");
				console.error(errorMsg);
				console.trace();
				console.error("!!!!!!!!!!!!!!!!");
				debugBreak();
			}
		}

		/**
		 * Assertion in debug boot mode
		 * 
		 * @method assert
		 * @param {Boolean} booleanValue bool value to check
		 * @param {string} errorMsg error message to show when the boolean value is false
		 */
		function assert(booleanValue, errorMsg) {
			if (RGPP.Config.DEBUG_BOOT_MODE) {
				console.assert(booleanValue, errorMsg);
				if (!booleanValue) {
					debugBreak();
				}
			}
		}

		/**
		 * Break by debugger
		 * @method debugBreak
		 */
		function debugBreak() {
			debugger;
		}

		/**
		 * Get superior function
		 * @method superiorFunc
		 * @param parent parent object
		 * @param {string} functionName function name
		 */
		function superiorFunc(parent, functionName) {
			var func = parent[functionName];
			return function() {
				return func.apply(parent, arguments);
			};
		}

		/**
		 * Output message to console in debug boot mode
		 * @method outputMsgToConsole
		 * @param msg message
		 */
		function outputMsgToConsole(msg) {
			if (RGPP.Config.DEBUG_BOOT_MODE) {
				console.log(msg);
			}
		}

		/**
		 * Output error message to console in debug boot mode
		 * @method outputErrMsgToConsole
		 * @param errorMsg error message
		 */
		function outputErrMsgToConsole(errorMsg) {
			if (RGPP.Config.DEBUG_BOOT_MODE) {
				console.error(errorMsg);
				debugBreak();
			}
		}
		
		/**
		 * Alert message
		 * @method alert
		 */ 
		function alertFunction(msg) {
			if (RGPP.Config.DEBUG_BOOT_MODE) {
				if (alert) {
					alert(msg);
				}
			}
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
