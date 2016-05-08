/**
 * User module
 * @module User
 * @namespace RGPP.User
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "NpcController";

	/**
	 * Npc Controller
	 * @class NpcController
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that;
		var mDstX = 0;

		var mCategoryID = 0;
		var mSoundID = 0;

		var mHitSquare = [];
		var system = RGPP.System;

		that = system.Script();
		// Inteface
		that.debugDraw = debugDraw;
		that.onLoadMap = onLoadMap;
		that.reaction = reaction;
		that.debugUpdate = debugUpdate;

		function initialize(event) {
			var aImageName = "hinagata.png";
			sprite.setOffsetXY(5, 15, 5, 5);
			sprite.setDivideXY(6, 4);
			sprite.setAnimImage(aImageName, [0, 1, 2, 1]);
			sprite.setCollisionFlag(true);
		}

		function onLoadMap(event) {
			mDstX = 0;
			mSoundID = 0;
			initialize(event);
		}

		function reaction(event) {
			console.log("Talk");
			//alert("Talk");
			var imageObj = system.ImageDataManager.getInstance().createObj({
				categoryID: 0,
				dataID: 0,
			}, event);
			imageObj.setXY(mDstX, 0);
			imageObj.startRotate(2);
			mDstX = mDstX + 100;

			var soundDB = system.SoundDataBase.getInstance();
			soundDB.createObj(mCategoryID, mSoundID);
			soundDB.play(mCategoryID, mSoundID);
			mSoundID = 1 - mSoundID;
		}



		function debugUpdate(event) {
			mHitSquare[0] = sprite.hitSquareLeftX();
			mHitSquare[1] = sprite.hitSquareTopY();
			mHitSquare[2] = sprite.getHitSquareWidth();
			mHitSquare[3] = sprite.getHitSquareHeight();
		}


		function debugDraw(ctx) {
			// Draw Hit Square
			var fundDrawing = system.FundamentalDrawing.getInstance();
			fundDrawing.setColor(ctx, 0, 255, 0, 1);
			fundDrawing.drawRect(ctx, mHitSquare[0], mHitSquare[1], mHitSquare[2], mHitSquare[3], 2);
		}

		return that;
	};

	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
