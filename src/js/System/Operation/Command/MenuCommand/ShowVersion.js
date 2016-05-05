/**
 * Command of Show Version
 * 
 * @namespace RGPP.System
 * @class ShowVersion
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ShowVersion";
	/**
	 * constructor of ShowVersion
	 *
	 * @method constructor
	 * @param receiver Receiver object
	 * @constructor
	 */
	var constructor = function(receiver) {
		var that = {};
		/**
		 * Receiver object
		 * @property mReceiver
		 * @type Object
		 * @private
		 */
		var mReceiver = receiver;

		/**
		 * invoke show version command of receiver 
		 * 
		 * @method invoke
		 */
		that.invoke = invoke;

		function invoke() {
			mReceiver.showVersion();
		}

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);