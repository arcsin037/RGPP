/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "KDTree";

	/**
	 * KD Tree
	 * @class KDTree
	 * @author arcsin
	 * @constructor
	 * @param spec {Object}
	 * @param spec.elements {Array} element array
	 * @param spec.recursiveLevel {Number} recursive level
	 * @param spec.elementNum {Number} Number of element
	 * @param spec.maxX {Number} max x
	 * @param spec.minX {Number} min x
	 * @param spec.maxY {Number} max y
	 * @param spec.minY {Number} min y
	 */
	var constructor = function(spec) {

		var that = {};


		var mHit = [];
		var mHitPairs = [];
		var mHitPairsSize = [];
		var mHitPairsVec = [];

		var mElements = spec.elements;
		var mRootNode = null;

		// Interface
		that.processCollision = processCollision; // Collision
		that.drawAllDivLines = drawAllDivLines;
		that.isHit = isHit;
		that.hitPairsSize = hitPairsSize;

		function processCollision() {

			// initialize parameter
			var elementNum = spec.elementNum;
			var recursiveLevel = spec.recursiveLevel;

			var minX = spec.minX;
			var maxX = spec.maxX;
			var minY = spec.minY;
			var maxY = spec.maxY;

			var elementIndecies = [];

			for (var elementIndex = 0; elementIndex < elementNum; ++elementIndex) {
				elementIndecies[elementIndex] = elementIndex;
			}

			mRootNode = Node({
				elementNum: elementNum,
				elementIndecies: elementIndecies,
			});

			mRootNode.buildKDTree(minX, maxX, minY, maxY, elementNum, recursiveLevel);

			mHit = [];
			mHitPairs = [];
			mHitPairsSize = [];
			mHitPairsVec = [];
			mRootNode.collision();
			return mHitPairsVec;
		}

		function drawAllDivLines(ctx) {
			mRootNode.drawDivLine(ctx);
		}

		function isHit(index) {
			var hit = mHit[index];
			if (hit === undefined) {
				return false;
			}
			return hit;
		}

		function hitPairsSize(index) {
			if (mHitPairsSize[index] === undefined) {
				return 0;
			}
			return mHitPairsSize[index];
		}

		function Node(spec) {
			var that = {};

			that.buildKDTree = buildKDTree;
			that.collision = collision;
			that.drawDivLine = drawDivLine;

			var mLeftChild = null;
			var mRightChild = null;
			var mElementNum = spec.elementNum;
			var mElementIndecies = spec.elementIndecies;

			var DIR = {
				none: 0,
				x: 1,
				y: 2,
			};
			var mDirection = DIR.none;
			var mDiv = 0;
			var mMinX = 0;
			var mMinY = 0;
			var mMaxX = 0;
			var mMaxY = 0;

			// Space sharing
			// x0 < x1, y0 < y1
			function buildKDTree(
				minX, maxX,
				minY, maxY,
				elementNum,
				recursiveLevel) {
				mMinX = minX;
				mMinY = minY;
				mMaxX = maxX;
				mMaxY = maxY;
				// decide the division direction
				if ((maxX - minX) > (maxY - minY)) {
					// x
					mDiv = (minX + maxX) * 0.5;
					mDirection = DIR.x;
				}
				else {
					// y
					mDiv = (minY + maxY) * 0.5;
					mDirection = DIR.y;
				}

				var counterLeftNode = 0;
				var counterRightNode = 0;
				var element = null;
				var elementPos = null;
				var elementIndex = 0;
				var leftNodeElementIndecies = [];
				var rightNodeElementIndecies = [];
				if (mDirection === DIR.x) {
					// For divided x direction
					for (var i = 0; i < mElementNum; ++i) {
						// Distribution
						elementIndex = mElementIndecies[i];
						element = mElements[elementIndex];

						elementPos = element.pos();
						var halfWidth = element.width() * 0.5;

						if (elementPos.x - halfWidth <= mDiv) { // regist left side node
							leftNodeElementIndecies[counterLeftNode] = elementIndex;
							counterLeftNode = counterLeftNode + 1;
						}

						if (elementPos.x + halfWidth >= mDiv) { // regist right side node
							rightNodeElementIndecies[counterRightNode] = elementIndex;
							counterRightNode = counterRightNode + 1;
						}
					}

					if (recursiveLevel > 1) {
						// recursive
						if (counterLeftNode > 1) {
							// create child node
							mLeftChild = Node({
								elementNum: counterLeftNode,
								elementIndecies: leftNodeElementIndecies,
							});
							if (counterLeftNode > 2) {
								mLeftChild.buildKDTree(
									minX, mDiv,
									minY, maxY,
									counterLeftNode,
									recursiveLevel - 1);
							}
						}

						if (counterRightNode > 1) {
							mRightChild = Node({
								elementNum: counterRightNode,
								elementIndecies: rightNodeElementIndecies,
							});
							if (counterRightNode > 2) {

								mRightChild.buildKDTree(
									mDiv, maxX,
									minY, maxY,
									counterRightNode,
									recursiveLevel - 1);
							}
						}
					}
				}
				else if (mDirection === DIR.y) {
					// For divided y direction
					for (var i = 0; i < mElementNum; ++i) {
						// Distribution
						elementIndex = mElementIndecies[i];
						element = mElements[elementIndex];
						elementPos = element.pos();

						var halfHeight = element.height() * 0.5;

						if (elementPos.y - halfHeight <= mDiv) { // regist left side node
							leftNodeElementIndecies[counterLeftNode] = elementIndex;
							counterLeftNode = counterLeftNode + 1;
						}
						if (elementPos.y + halfHeight >= mDiv) { // regist right side node
							rightNodeElementIndecies[counterRightNode] = elementIndex;
							counterRightNode = counterRightNode + 1;
						}

					}

					if (recursiveLevel > 1) {
						// recursive
						if (counterLeftNode > 1) {
							mLeftChild = Node({
								elementNum: counterLeftNode,
								elementIndecies: leftNodeElementIndecies,
							});

							if (counterLeftNode > 2) {
								mLeftChild.buildKDTree(
									minX, maxX,
									minY, mDiv,
									counterLeftNode,
									recursiveLevel - 1);
							}

						}

						if (counterRightNode > 1) {
							mRightChild = Node({
								elementNum: counterRightNode,
								elementIndecies: rightNodeElementIndecies,
							});
							if (counterRightNode > 2) {
								mRightChild.buildKDTree(
									minX, maxX,
									mDiv, maxY,
									counterRightNode,
									recursiveLevel - 1);
							}
						}
					}
				}

			}


			function collision() {
				var finalFlag = false;
				if (mLeftChild !== null) {
					mLeftChild.collision();
				}
				else {
					finalFlag = true;
				}
				if (mRightChild !== null) {
					mRightChild.collision();
				}
				else {
					finalFlag = true;
				}

				if (finalFlag) {
					// Get collison pair
					for (var i = 0; i < mElementNum; i += 1) {
						var idx0 = mElementIndecies[i];
						var element0 = mElements[idx0];
						for (var j = i + 1; j < mElementNum; j += 1) {
							var idx1 = mElementIndecies[j];
							var element1 = mElements[idx1];
							// Collision detection
							var collisionFunc = RGPP.System.CollisionFunction.getInstance();
							var hit = collisionFunc.checkCollision(element0, element1);
							if (hit) {
								if (idx0 > idx1) {
									var tmp = idx0;
									idx0 = idx1;
									idx1 = tmp;
								}
								if (mHitPairs[idx0] === undefined) {
									mHitPairs[idx0] = [];
									mHitPairsSize[idx0] = 0;
									mHitPairsVec[idx0] = [];
								}
								if (mHitPairs[idx0][idx1] !== true) {
									mHitPairs[idx0][idx1] = true;
									mHitPairsSize[idx0] += 1;
									mHitPairsVec[idx0].push(idx1);
									mHit[idx0] = true;
									mHit[idx1] = true;
								}
							}
						}
					}
				}
			}

			function drawDivLine(ctx) {
				if (mDirection === DIR.x) {
					ctx.beginPath();
					ctx.moveTo(mDiv, mMinY);
					ctx.lineTo(mDiv, mMaxY);
					ctx.stroke();
				}
				else if (mDirection === DIR.y) {
					ctx.beginPath();
					ctx.moveTo(mMinX, mDiv);
					ctx.lineTo(mMaxX, mDiv);
					ctx.stroke();
				}
				if (mDirection !== DIR.none) {
					if (mLeftChild !== null) {
						mLeftChild.drawDivLine(ctx);
					}
					if (mRightChild !== null) {
						mRightChild.drawDivLine(ctx);
					}
				}
			}

			return that;
		}


		return that;

	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
