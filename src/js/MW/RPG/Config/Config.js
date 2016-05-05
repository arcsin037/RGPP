(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "RPG";
	var RPG = RPG || {
		CHARA_CHIP_OBJ_ID: 0,
	};

	module = module || undefined;

	RGPP.MW.exports({
		name: objName,
		constructorFunc: RPG,
		module: global.module
	});

})((this || 0).self || global);
