/**
 * Save Map
 * 
 * @namespace RGPP.System
 * @class SaveMap
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "SaveMap";

	var constructor = function(receiver) {
		var that = {};
		/**
		 * Receiver object
		 * @property mReceiver
		 * @type Object
		 * @private
		 */
		var mReceiver = receiver;

		that.invoke = invoke;

		/**
		 * invoke save map command of receiver 
		 * 
		 * @method invoke
		 */
		function invoke() {
			mReceiver.saveMap();
		}

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);