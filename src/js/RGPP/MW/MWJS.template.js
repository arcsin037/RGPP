/**
 * Middle-ware module
 * @module MW
 * @namespace RGPP.MW
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "TemplateMW";
	/**
	 * constructor (normal)
	 * 
	 * @class TemplateMW
	 * @author arcsin
	 * @constructor
	 */
	 var constructor = function(spec) {
		var that = {};

		return that;
	};

	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);


/**
 * Middle-ware module
 * @module MW
 * @namespace RGPP.MW
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "TemplateMWSingleton";
	/**
	 * constructor (singleton)
	 * 
	 * @class TemplateMW
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		return that;
	};

	RGPP.MW.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);