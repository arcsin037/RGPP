import Config from './Common/Config.json'

/**
 * Node.js module
 * @module module
 */
var module = module || undefined;

/**
 * Global Object of RGPP
 *
 * @module RGPP
 *
 * @submodule System
 * @submodule MW
 * @submodule User
 * @main RGPP
 * @class RGPP
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";

	global.RGPP = {
		Config: {},
		System: {
			exports: exportsAsSystem,
			exportsAsSingleton: expotrsAsSystemSingleton,
		},
		MW: {
			exports: exportsAsMW,
			exportsAsSingleton: expotrsAsMWSingleton,
		},
		User: {
			exports: exportsAsUser,
			exportsAsSingleton: expotrsAsUserSingleton,
		},
		isDefined: isDefined,
		isUndefined: isUndefined,
		isString: isString,
		isIntegerType: isIntegerType,
		isFiniteNumber: isFiniteNumber,
		isNumeric: isNumeric,
		setConfigParam: setConfigParam,
		getConfigParam: getConfigParam,
	};

	/**
	 * String of global namespace
	 *
	 * @property GLOBAL_NAME_SPACE_STING
	 * @type {String}
	 * @private
	 * @final
	 */
	var GLOBAL_NAME_SPACE_STING = "RGPP",

		/**
		 * String of System namespace
		 *
		 * @property SYSTEM_NAME_SPACE_STRING
		 * @type {String}
		 * @private
		 * @final
		 */
		SYSTEM_NAME_SPACE_STRING = "System",

		/**
		 * String of middle-ware namespace
		 * @property MW_NAME_SPACE_STRING
		 * @type {String}
		 * @private
		 * @final
		 */
		MW_NAME_SPACE_STRING = "MW",

		/**
		 * String of user namespace
		 *
		 * @property USER_NAME_SPACE_STRING
		 * @type {String}
		 * @private
		 * @final
		 */
		USER_NAME_SPACE_STRING = "User",

		/**
		 * String of configutation namespace
		 *
		 * @property CONF_NAME_SPACE_STRING
		 * @type {String}
		 * @private
		 * @final
		 */
		CONF_NAME_SPACE_STRING = "Config",


		/**
		 * Whether using node.js or not.
		 * @property isNodeJs
		 * @type {Boolean}
		 * @private
		 */
		isNodeJs = isDefined(module);


	/**
	 * Whether a reference is defined or not.
	 * @method isDefined
	 * @param {*} value Reference to check
	 * @return {boolean} Whether a reference is defined or not.
	 */
	function isDefined(value) {
		if (typeof value === "undefined") {
			return false;
		}
		return true;
	}

	/**
	 * Whether a reference is undefined or not.
	 * @method isUndefined
	 * @param {*} value Reference to check
	 * @return {boolean} Whether a reference is undefined or not.
	 */
	function isUndefined(value) {
		if (isDefined(value)) {
			return false;
		}
		return true;
	}

	/**
	 * Whether a reference is string or not.
	 * @method isString
	 * @param {*} value Reference to check
	 * @return {Boolean} Whether a reference is string or not.
	 */
	function isString(value) {
		if (typeof value === "string") {
			return true;
		}
		return false;
	}

	/**
	 * Whether a reference is integer type or not.
	 * @method isIntegerType
	 * @param {*} value Reference to check
	 * @return {Boolean} Whether a reference is integer type or not.
	 */
	function isIntegerType(value) {
		if (value === parseInt(value, 10)) {
			return true;
		}
		return false;
	}

	/**
	 * Whether a reference is finite number or not.
	 * @method isFiniteNumber
	 * @param {*} value Reference to check
	 * @return {Boolean} Whether a reference is finite number or not.
	 */
	function isFiniteNumber(value) {
		if (typeof(value) !== 'number' && typeof(value) !== 'string') {
			return false;
		}
		else {
			return (value === parseFloat(value) && isFinite(value));
		}
	}

	/**
	 * Whether a reference is numeric or not.
	 * @method isNumeric
	 * @param {*} value Reference to check
	 * @return {Boolean} Whether a reference is numeric or not. <br/>
	 *
	 * (e.g. 0, 0.0, -1, "-1.5", "30.0", "20.80", -20.85, .42, 0x89f, "0x89f", 8e5)
	 */
	function isNumeric(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	/**
	 * Exports an object to a global object & Exports as a module of Node.js.
	 *
	 * @method exports
	 * @param nameSpaceString {String} String of namespace of name
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function exports(nameSpaceString, arg) {

		var nameSpaceObj = global.RGPP[nameSpaceString];
		var objName = arg.name;

		// check namespace is defined
		if (isUndefined(nameSpaceObj)) {
			console.error("undefined");
			return;
		}

		// check multiple definition
		var isMultDefined = isDefined(nameSpaceObj[objName]);
		if (isMultDefined) {
			console.error("RGPP." + nameSpaceString + "." + objName + " is already defined");
			return;
		}

		// export as module
		exportAsModule(nameSpaceString, arg);

		global.RGPP[nameSpaceString][objName] = arg.constructorFunc;

	}

	/**
	 * Exports an object as a module of Node.js.
	 *
	 * @method exportAsModule
	 * @param nameSpaceString {String} String of namespace
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function exportAsModule(nameSpaceString, arg) {
		if (isDefined(arg.module)) {
			arg.module.exports[nameSpaceString] =
				arg.module.exports[nameSpaceString] || {};

			arg.module.exports[nameSpaceString][arg.name] =
				arg.module.exports[nameSpaceString][arg.name] || arg.constructorFunc;

			arg.module.exports[CONF_NAME_SPACE_STRING] =
				arg.module.exports[CONF_NAME_SPACE_STRING] || {};

			arg.module.exports[CONF_NAME_SPACE_STRING].setConfigParam =
				arg.module.exports[CONF_NAME_SPACE_STRING].setConfigParam || setConfigParam;
		}
	}

	/**
	 * Exports an object to System namespace.
	 * @method exportsAsSystem
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function exportsAsSystem(arg) {
		exports(SYSTEM_NAME_SPACE_STRING, arg);
	}

	/**
	 * Exports an object to MW namespace.
	 * @method exportsAsMW
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function exportsAsMW(arg) {
		exports(MW_NAME_SPACE_STRING, arg);
	}

	/**
	 * Exports an object to User namespace.
	 * @method exportsAsUser
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function exportsAsUser(arg) {
		exports(USER_NAME_SPACE_STRING, arg);
	}

	/**
	 * Return singleton instance.
	 *
	 * @method getSingletonInstance
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @return {Object} Singleton instance of an object
	 * @private
	 */
	function getSingletonInstance(arg) {
		var instance = undefined;
		return {
			getInstance: function(spec) {
				if (isUndefined(instance)) {
					instance = arg.constructorFunc(spec);
				}
				return instance;
			}
		};

	}

	/**
	 * Exports an object to System namespace as singleton object.
	 * @method expotrsAsSystemSingleton
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function expotrsAsSystemSingleton(arg) {
		var singleton = getSingletonInstance(arg);
		exports(SYSTEM_NAME_SPACE_STRING, {
			name: arg.name,
			constructorFunc: singleton,
			module: arg.module
		});
	}

	/**
	 * Exports an object to MW namespace as singleton object.
	 * @method expotrsAsMWSingleton
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function expotrsAsMWSingleton(arg) {
		var singleton = getSingletonInstance(arg);
		exports(MW_NAME_SPACE_STRING, {
			name: arg.name,
			constructorFunc: singleton,
			module: arg.module
		});
	}

	/**
	 * Exports to User namespace as singleton object.
	 * @method expotrsAsUserSingleton
	 * @param arg {Object}
	 * @param arg.name {String} An object name
	 * @param arg.constructorFunc {Function} A constructor function of an object,
	 * @param arg.module {Object} A module of Node.js
	 * @private
	 */
	function expotrsAsUserSingleton(arg) {
		var singleton = getSingletonInstance(arg);
		exports(USER_NAME_SPACE_STRING, {
			name: arg.name,
			constructorFunc: singleton,
			module: arg.module
		});
	}

	/**
	 * Set configuration parameter.
	 *
	 * @method setConfigParam
	 * @param configName {String} Name of configuration parameter
	 * @param configValue {*} Value of configuration parameter
	 */
	function setConfigParam(configName, configValue) {
		if (isInValidConfigName(configName)) {
			return;
		}

		if (global && global.RGPP && global.RGPP[CONF_NAME_SPACE_STRING]) {
			global.RGPP[CONF_NAME_SPACE_STRING][configName] = configValue;
		}
	}

	/**
	 * Return configuration parameter.
	 *
	 * @method getConfigParam
	 * @param configName {String} Name of configuration parameter
	 * @return Configuration parameter / If the configuration name is invalid, return undefined
	 */
	function getConfigParam(configName) {
		if (isInValidConfigName(configName)) {
			return;
		}
		if (global && global.RGPP && global.RGPP[CONF_NAME_SPACE_STRING]) {
			return global.RGPP[CONF_NAME_SPACE_STRING][configName];
		}
	}

	/**
	 * Whether the configuration name is invalid or not.
	 *
	 * @method isInValidConfigName
	 * @param {string} configName Name of configuration parameter
	 * @return Whether the configuration name is invalid or not.
	 * @private
	 */
	function isInValidConfigName(configName) {
		if (!isString(configName) ||
			configName === "setConfigParam" ||
			configName === "getConfigParam") {
			return true;
		}
		return false;
	}

	if (isNodeJs) {
		// exports to module
		module.exports = global.RGPP;
	}

})((this || 0).self || global);
