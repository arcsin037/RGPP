/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "UIOperator";
	/**
	 * UI Operator
	 * @class UIOperator
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};
		// Regist click operator
		that.registClickFunction = registClickFunction;
		// Regist opener
		that.registOpener = registOpener;
		// Regist closer
		that.registCloser = registCloser;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		/**
		 * Regist click operator
		 * @method registClickFunction
		 * @param dom DOM object
		 * @param clickFunction click function
		 */
		function registClickFunction(dom, clickFunction) {
			scriptUtil.assert(clickFunction !== undefined, "click function is undefined");
			$(dom).click(function() {
				clickFunction();
			});
		}

		/**
		 * Regist opener
		 * @method registOpener
		 * @param opener DOM object to open by clicking
		 * @param target open target
		 */
		function registOpener(opener, target) {
			scriptUtil.assert(target !== undefined, "open target is undefined");
			scriptUtil.assert(target.openFunc !== undefined, "open target of openFunc is undefined");
			$(opener).click(function() {
				target.openFunc();
			});
		}

		/**
		 * Regist closer
		 * @method registCloser
		 * @param opener DOM object to open by clicking
		 * @param target open target
		 */
		function registCloser(closer, target) {
			scriptUtil.assert(target !== undefined, "close target is undefined");
			scriptUtil.assert(target.openFunc !== undefined, "close target of closeFunc is undefined");
			$(closer).click(function() {
				target.closeFunc();
			});
		}
		
		return that;
	};
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);