/**
 * System module
 * @module System
 * @namespace RGPP.System
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
		var that = {};

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);

/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "TemplateSingleton";
	/**
	 * constructor (singleton)
	 * 
	 * @class TemplateSingleton
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
