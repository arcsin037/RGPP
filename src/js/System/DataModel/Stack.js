/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "Stack";

	/**
	 * Stack structure
	 * @class Stack
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};
		var mStackItems = [];

		// push object to stack
		that.push = push;

		// pop object to stack
		that.pop = pop;

		// stack size
		that.size = size;

		// clear stacl
		that.clear = clear;

		// whether the stack is empty
		that.isEmpty = isEmpty;

		/**
		 * push object to stack
		 * @method push
		 * @param {object} obj
		 */
		function push(obj) {
			mStackItems.push(obj);
		}

		/**
		 * pop object to stack
		 * @method pop
		 * @return object
		 */
		function pop() {
			if (mStackItems.length > 0) {
				return mStackItems.pop();
			}
			return null;
		}

		/**
		 * size of stack
		 * @method size
		 * @return size of stack
		 */
		function size() {
			return mStackItems.length;
		}

		/**
		 * clear stack
		 * @method clear
		 */
		function clear() {
			mStackItems = [];
		}

		/**
		 * whether the stack is empty
		 * @method isEmpty
		 */
		function isEmpty() {
			if (mStackItems.length === 0) {
				return true;
			}
			return false;
		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
