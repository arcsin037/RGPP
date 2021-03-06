/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ImageDataBaseModal";
	/**
	 * Image Data Base Modal
	 * @class ImageDataBaseModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.ImageDataBase.getInstance();
		var that = system.DBModal({
			dbName: "Image",
			db: mDB,
			updateFunc: spec.updateFunc,
		});

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
