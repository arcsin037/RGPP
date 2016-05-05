/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";

	/**
	 * User Information
	 * 
	 * @class UserInfo
	 * @author arcsin
	 */
	var UserInfo = UserInfo || {
		/**
		 * Type of user's browser
		 * 
		 * * IE : 0
		 * * Opera : 1
		 * * Safari : 2
		 * * Google chrome : 3
		 * * Firefox : 4
		 * * Other : -1
		 * 
		 * @property BROWSER_TYPE
		 * @type {Number}
		 */
		BROWSER_TYPE: -1,
		/**
		 * Major version of user's browser
		 * 
		 * @property BROWSER_MAJOR_VERSION
		 * @type {Number}
		 */
		BROWSER_MAJOR_VERSION: 0,
	};

	RGPP.System.UserInfo = UserInfo;

})((this || 0).self || global);