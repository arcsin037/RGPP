/**
 * Global Object of RGPP
 * 
 * @module RGPP
 * @namespace RGPP
 */
(function(global) {
	/* global RGPP */
	"use strict";

	/**
	 * Constant Properties
	 * 
	 * @class Const
	 * @author arcsin
	 */
	var Const = Const || {
		/**
		 * Browser type
		 * 
		 * 	BROWSER_TYPE = {
		 *		IE: 0,
		 *		OPERA: 1,
		 *		SAFARI: 2,
		 *		GOOGLE_CHROME: 3,
		 *		FIRE_FOX: 4,
		 *		OTHER: -1
		 * 	}
		 * * IE : 0
		 * * Opera : 1
		 * * Safari : 2
		 * * Google chrome : 3
		 * * Firefox : 4
		 * * Other : -1
		 * 
		 * @property BROWSER_TYPE
		 * @type {Object}
		 * @final
		 */
		BROWSER_TYPE: {
			IE: 0,
			OPERA: 1,
			SAFARI: 2,
			GOOGLE_CHROME: 3,
			FIRE_FOX: 4,
			OTHER: -1,
		},

	};

	RGPP.Const = Const;

})((this || 0).self || global);