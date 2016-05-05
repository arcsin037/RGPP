/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "List";

	/**
	 * List structure
	 * @class List
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// push data
		that.push = push;

		// pop data
		that.pop = pop;

		// remove data
		that.remove = remove;

		// get size
		that.size = size;

		// insert data
		that.insert = insert;

		// display console		
		that.debugDisplay = debugDisplay;

		// get datas
		that.datas = datas;

		// get data
		that.data = data;

		// get sorted data
		that.sortedDatas = sortedDatas;

		// clear list
		that.clear = clear;

		// return whether list is empty or not
		that.isEmpty = isEmpty;

		// copy list
		that.copy = copy;

		// script util
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		var mHead = null;
		var mCount = 0;

		/**
		 * Item of List
		 * @class Item
		 * @for List
		 */
		function Item(data) {
			var that = {};
			var mData = data;
			var mNext = null;
			var mPrev = null;

			that.data = function() {
				return mData;
			};

			that.next = function() {
				return mNext;
			};

			that.prev = function() {
				return mPrev;
			};

			that.setData = function(data) {
				mData = data;
			};

			that.setNext = function(next) {
				mNext = next;
			};

			that.setPrev = function(prev) {
				mPrev = prev;
			};
			
			return that;
		}

		/**
		 * push data to list
		 * @method push
		 * @param data Data to push list.
		 */ 
		function push(data) {
			var head = mHead;
			if (mHead === null) {
				mHead = Item(data);
				head = mHead;
				head.setNext(head);
				head.setPrev(head);
			}
			else {
				var item = Item(data);
				var prev = head.prev();
				head.setPrev(item);
				prev.setNext(item);
				item.setPrev(prev);
				item.setNext(head);
			}
			++mCount;
		}

		//return data
		function pop(index) {
			index = (index === undefined) ? 0 : index;

			var n = size();
			var wp = mHead;
			for (var i = 0; i < n; ++i) {
				if (i === index) {
					var data = wp.data();
					remove(index);
					return data;
				}
				wp = wp.next();
			}
			return null;
		}

		//return true or false
		function remove(index) {
			if (index === undefined) {
				alert("please input index");
				return false;
			}
			var n = size();
			var wp = mHead;

			for (var i = 0; i < n; ++i) {
				if (i === index) {
					var prev = wp.prev();
					var next = wp.next();
					prev.setNext(next);
					next.setPrev(prev);
					wp.setNext(null);
					wp.setPrev(null);
					wp = null;
					if (i === 0) { //remove head
						mHead = next;
					}
					if (mHead.next() === null) {
						mHead = null;
					}
					mCount -= 1;
					return true;
				}
				wp = wp.next();
			}
			return false;
		}

		function size() {
			return mCount;
		}

		//return index
		function insert(index, data) {
			var prev = null;
			var next = null;
			var item = null;
			if (index === undefined) {
				return push(data);
			}
			var n = size();
			//header is null
			if (n === 0) {
				mHead = Item(data);
				var head = mHead;
				head.setNext(head);
				head.setPrev(head);
				++mCount;
				return index;
			}

			var wp = mHead;
			for (var i = 0; i < n; ++i) {
				if (wp.index() == index) {
					wp.setData(data);
					return index;
				}
				else if (wp.index() > index) {
					prev = wp.prev();
					next = wp;
					item = Item(data);
					prev.setNext(item);
					next.setPrev(item);
					item.setNext(next);
					item.setPrev(prev);
					if (i === 0) { //less than head index
						mHead = item;
					}
					++mCount;
					return index;
				}
				wp = wp.next();
			}

			//More than Tail
			prev = wp.prev();
			next = wp;
			item = Item(data);
			prev.setNext(item);
			next.setPrev(item);
			item.setNext(next);
			item.setPrev(prev);
			++mCount;
			return index;
		}

		//Debug
		function debugDisplay() {
			var n = size();

			if (n === 0) {
				scriptUtil.outputMsgToConsole("list size is 0");
				return;
			}
			var wp = mHead;

			for (var i = 0; i < n; ++i) {
				scriptUtil.outputMsgToConsole(wp.index() + ", " + wp.data());
				wp = wp.next();
			}
		}

		//return array
		function datas() {
			var n = size();
			var array = [];
			var wp = mHead;
			for (var i = 0; i < n; ++i) {
				array[i] = wp.data();
				wp = wp.next();
			}
			return array;
		}

		//return data
		function data(index) {
			if (index >= size() || index < 0) {
				scriptUtil.outputErrMsgToConsole("[List.js] return null --- over list size");
				return null;
			}
			var wp = mHead;
			for (var i = 0; i < index; ++i) {
				wp = wp.next();
			}
			return wp.data();
		}

		function clear() {
			mHead = null;
			mCount = 0;
		}

		function isEmpty() {
			if (mCount === 0) {
				return true;
			}
			return false;
		}

		function copy() {
			var ret = RGPP.System.List();
			var wp = mHead;
			for (var i = 0, n = size(); i < n; ++i) {
				ret.push(wp.data());
				wp = wp.next();
			}
			return ret;
		}

		function sortedDatas(sortFunction) {
			var sortedDataArray = datas();
			sortedDataArray.sort(sortFunction);
			return sortedDataArray;
		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
