/**
 * User module
 * @module User
 * @namespace RGPP.User
 */
(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "Template";
	/**
	 * constructor (normal)
	 * 
	 * @class Template
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = RGPP.System.Script();

		return that;
	};
	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);