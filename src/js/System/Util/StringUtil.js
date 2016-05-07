/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "StringUtil";

	/**
	 * String Utility Functions
	 * 
	 * @class StringUtil
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// Whether the string is empty string
		that.isEmptyString = isEmptyString;

		// Substitute replacement string for search string
		that.substitute = substitute;

		// Extract file name except for extension
		that.extractFileNameExceptForExtension = extractFileNameExceptForExtension;

		// Extract extension from file name
		that.extractExtension = extractExtension;

		/**
		 * Whether the string is empty string
		 * 
		 * @method isEmptyString
		 * @param str check string
		 * @return {Boolean} whether the string is empty string
		 */
		function isEmptyString(str) {
			if (str === "") {
				return true;
			}
			return false;
		}

		/**
		 * Substitute replacement string for search string
		 * 
		 * @method substitute
		 * @param {string} originalStr original string
		 * @param {string} searchStr seach string
		 * @param {string} replacementStr replacement string
		 * @return {string} string after substitution
		 */
		function substitute(originalStr, searchStr, replacementStr) {
			return originalStr.split(searchStr).join(replacementStr);
		}

		/**
		 * Extract file name except for extension
		 * @method extractFileNameExceptForExtension
		 * @param {string} fileName file name
		 * @return {string] file name except for extension
		 */
		function extractFileNameExceptForExtension(fileName) {
			var separator = '.';
			var arrayOfStrings = fileName.split(separator);
			var baseFileName = arrayOfStrings[0];
			for (var i = 1; i < arrayOfStrings.length - 1; i += 1) {
				baseFileName += '.';
				baseFileName += arrayOfStrings[i];
			}
			return baseFileName;
		}

		/**
		 * Extract extension from file name
		 * @method extractExtension
		 * @param {string} fileName file name
		 * @return {string] extension
		 */
		function extractExtension(fileName) {
			var separator = '.';
			var arrayOfStrings = fileName.split(separator);
			var lastIndex = arrayOfStrings.length - 1;
			if (lastIndex === 0) {
				return '';
			}
			var extension = arrayOfStrings[lastIndex];
			return extension;
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
