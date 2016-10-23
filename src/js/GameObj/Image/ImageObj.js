/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "ImageObj";

	/**
	 * Image Obj
	 * We cannot create class named "Image".
	 * 
	 * @class ImageObj
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec, my) {
		var that = RGPP.System.GameObjBase();

		spec = spec || {};
		my = my || {};

		// Interface
		my.onLoad = onLoad;

		that.update = update;
		that.draw = draw;
		that.debugDraw = debugDraw;

		that.drawTextFrame = drawTextFrame;
		that.startRotate = startRotate;
		that.updateRotate = updateRotate;
		that.stopRotate = stopRotate;
		that.calcTextSize = calcTextSize;
		that.stepAnim = stepAnim;
		that.sortFunction = sortFunction;

		that.checkOnMouse = checkOnMouse;

		// Setter
		that.setImageDataBaseID = setImageDataBaseID;
		that.setXY = setXY;
		that.setSizeXY = setSizeXY;
		that.setCenterXY = setCenterXY;
		that.setSourceXY = setSourceXY;
		that.setDivideXY = setDivideXY;
		that.setAnimIndex = setAnimIndex;
		
		/**
		 * set scale x y
		 * @method setScaleXY
		 * handle Scale X Y
		 * scaleX:scale X(0~1)
		 * scaleY:scale Y(0~1)
		 */
		that.setScaleXY = setScaleXY;
		that.setRadian = setRadian;
		that.setDegree = setDegree;
		that.setText = setText;
		that.setFont = setFont;
		that.setFontColor = setFontColor;
		that.setAddColor = setAddColor;
		that.setStroke = setStroke;
		that.resetStroke = resetStroke;
		that.setAngularVelocity = setAngularVelocity;
		that.setGlobalAlpha = setGlobalAlpha;
		that.setAnimPatternArray = setAnimPatternArray;
		that.setAnimPatternIndex = setAnimPatternIndex;
		that.setAnimPatternArrayIndex = setAnimPatternArrayIndex;
		that.setAnimPatternArrayIndexMax = setAnimPatternArrayIndexMax;
		that.setSizeChange = setSizeChange;
		that.setOnScreen = setOnScreen;
		that.setSpriteAnimFlag = setSpriteAnimFlag;
		that.setDivideScale = setDivideScale;
		that.disableDisplay = disableDisplay;
		that.enableDisplay = enableDisplay;
		that.setUpdateInterval = setUpdateInterval;
		that.setZ = setZ;

		// Getter
		that.categoryID = getCategoryID;
		that.dataID = dataID;
		that.image = getImage;

		that.imageWidth = imageWidth;
		that.imageHeight = imageHeight;
		that.sourceX = sourceX;
		that.sourceY = sourceY;
		that.getX = getX;
		that.getY = getY;
		that.getZ = getZ;
		that.centerX = centerX;
		that.centerY = centerY;
		that.divideX = divideX;
		that.divideY = divideY;
		that.divideScaleX = divideScaleX;
		that.divideScaleY = divideScaleY;
		that.divideWidth = divideWidth;
		that.divideHeight = divideHeight;
		that.animIndex = animIndex;
		that.scaleX = scaleX;
		that.scaleY = scaleY;
		that.radian = radian;
		that.text = text;
		that.textFlag = textFlag;
		that.font = font;
		that.color = color;
		that.isStroke = isStroke;
		that.angularVelocity = getAngularVelocity;
		that.globalAlpha = globalAlpha;
		that.animPatternArray = animPatternArray;
		that.animPatternIndex = animPatternIndex;
		that.animPatternArrayIndex = animPatternArrayIndex;
		that.isLoadEnd = isLoadEnd;
		that.isSizeChange = isSizeChange;
		that.canDiplay = canDiplay;
		that.onScreen = onScreen;
		that.spriteAnimFlag = spriteAnimFlag;
		that.getAddColor = getAddColor;
		that.onMouse = onMouse;
		that.hitSquareWidth = hitSquareWidth;
		that.hitSquareHeight = hitSquareHeight;


		var mZ = 0;
		var mCategoryID = spec.imageDBcategoryID || -1;
		var mDataID = spec.imageDBdataID || -1;

		var mSourceX = 0;
		var mSourceY = 0;
		var mDstX = 0;
		var mDstY = 0;

		var mCenterX = 0;
		var mCenterY = 0;

		var mImageWidth = 0;
		var mImageHeight = 0;
		var mDivideX = 1;
		var mDivideY = 1;
		var mDividedScaleX = [];
		var mDividedScaleY = [];
		mDividedScaleX[0] = [1.0];
		mDividedScaleY[0] = [1.0];

		var mAnimIndex = 0;
		var mScaleX = 1.0;
		var mScaleY = 1.0;
		var mRadian = 0;
		var mAngularVelocityRadian = 0; // Angular velocity(radian)
		var mGlobalAlpha = 1.0;

		var mFont = RGPP.Config.DEFAULT_FONT;
		var mColor = "rgba(255, 255, 255, 1)";
		var mAddColor = {
			r: 0,
			g: 0,
			b: 0,
			a: 0,
		};

		var mStrokeFlag = false;
		var mText = null;

		var mSpriteAnimFlag = false;
		var mAnimPatternArray = [0, 1, 2, 1];
		var mAnimPatternIndex = 0;
		var mAnimPatternIndexMax = 0;
		var mAnimPatternArrayIndex = 0;
		var mAnimPatternArrayIndexMax = 0;

		var mSizeChange = false;
		var mPositionChange = false;
		var mLoadEnd = false;

		var mRotateFlag = false;

		var mDisplayFlag = true;

		var mOnScreenFlag = false;

		var mOnMouseFlag = false;

		var UPDATE_INTERVAL = 5;
		var mUpdateCount = 0;

		function onLoad() {
			if (!textFlag()) {
				if (!mLoadEnd) {
					var img = that.image();
					if (img !== null) {
						if (!mSizeChange) {
							setSizeXY(img.width, img.height);
						}

						if (mPositionChange) {
							setCenterXY(mCenterX, mCenterY);
						}
						mLoadEnd = true;
					}
				}
			}
			else {
				mLoadEnd = true;
			}

		}

		function update() {
			onLoad();
			updateRotate();

			checkOnMouse();
		}

		function debugDraw(ctx) {
			if (textFlag()) {
				drawTextFrame(ctx);
				drawAdditionalLine(ctx, mDstX, mDstY, mImageWidth);
			}
		}

		function draw(ctx) {
			if (mLoadEnd) {
				var saveFont = ctx.font;

				calcTextSize(ctx);

				if (!canDiplay()) {
					return;
				}


				ctx.globalAlpha = globalAlpha();


				if (textFlag()) {
					// Draw Text
					drawText(ctx);
				}
				else {
					// Draw Image Object
					if (mLoadEnd) {
						if (that.image() === null) {
							return;
						}

						if (mSpriteAnimFlag) {
							drawSpriteAnim(ctx);
						}
						else {
							drawDividedImage(ctx);
						}
					}
				}
				ctx.font = saveFont;


			}
		}

		var drawText = function(ctx) {

			var imagePosX = getX();
			var imagePosY = getY();

			if (onScreen()) {
				var coordinateSys = RGPP.System.CoordinateSystem.getInstance();
				imagePosX = coordinateSys.convertMapToScreenX(imagePosX);
				imagePosY = coordinateSys.convertMapToScreenY(imagePosY);
			}

			var scaleX = that.scaleX();
			var scaleY = that.scaleY();

			var imageWidth = that.imageWidth();
			var imageHeight = that.imageHeight();
			var rad = radian();
			var text = mText;

			ctx.font = that.font();
			ctx.textBaseline = "middle";
			ctx.textAlign = "start";

			ctx.save();
			ctx.translate(imagePosX, imagePosY + imageHeight / 2);
			ctx.scale(scaleX, scaleY);
			ctx.translate(imageWidth / 2, imageHeight / 2);

			ctx.rotate(rad);
			ctx.translate(-imageWidth / 2, -imageHeight / 2);

			if (isStroke()) {
				ctx.strokeStyle = color();
				ctx.strokeText(text, 0, 0);
			}
			else {
				ctx.fillStyle = color();
				ctx.fillText(text, 0, 0);
			}
			ctx.restore();


		};

		/**
		 * draw additional line
		 * @method drawAdditionalLine
		 */
		var drawAdditionalLine = function(ctx, x, y, width) {
			var fs = ctx.fillStyle;
			ctx.save();
			// additional point
			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(x, y, 3, 0, Math.PI * 2, false);
			ctx.fill();

			// additional line
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + width, y);
			ctx.stroke();
			ctx.restore();
			ctx.fillStyle = fs;
		};

		var drawSpriteAnim = function(ctx) {
			var divideWidth = that.divideWidth();
			var divideHeight = that.divideHeight();

			if (divideWidth <= 0 || divideHeight <= 0) {
				return;
			}
			var operateCanvasInstance = RGPP.System.OperateCanvas.getInstance();
			var tmpCanvasCtx = operateCanvasInstance.tmpCanvasCtx2d();

			var image = that.image();
			var imagePosX = getX();
			var imagePosY = getY();
			if (onScreen()) {
				var coordinateSys = RGPP.System.CoordinateSystem.getInstance();
				imagePosX = coordinateSys.convertMapToScreenX(imagePosX);
				imagePosY = coordinateSys.convertMapToScreenY(imagePosY);
			}

			var scaleX = that.scaleX();
			var scaleY = that.scaleY();
			var rad = radian();

			var sx = sourceX();
			var sy = sourceY();
			var addColor = getAddColor();

			if (divideWidth <= 0 || divideHeight <= 0) {
				return;
			}


			var picLength = divideWidth * divideHeight;

			// Change color //
			operateCanvasInstance.clear(tmpCanvasCtx);

			// Save BG Color
			ctx.save();
			var bgImageData = ctx.getImageData(imagePosX, imagePosY, divideWidth * scaleX, divideHeight * scaleY);
			ctx.restore();

			tmpCanvasCtx.save();
			tmpCanvasCtx.scale(scaleX, scaleY);
			tmpCanvasCtx.translate(divideWidth / 2, divideHeight / 2);
			tmpCanvasCtx.rotate(rad);
			tmpCanvasCtx.translate(-divideWidth / 2, -divideHeight / 2);

			tmpCanvasCtx.drawImage(image, sx, sy, divideWidth, divideHeight, 0, 0, divideWidth, divideHeight);

			var imageData = tmpCanvasCtx.getImageData(0, 0, divideWidth, divideHeight);
			for (var i = 0; i < picLength * 4; i += 4) {
				if (imageData.data[i + 3] !== 0) {
					imageData.data[i + 0] = imageData.data[i + 0] + addColor.r;
					imageData.data[i + 1] = imageData.data[i + 1] + addColor.g;
					imageData.data[i + 2] = imageData.data[i + 2] + addColor.b;
				}
				else {
					imageData.data[i + 0] = bgImageData.data[i + 0];
					imageData.data[i + 1] = bgImageData.data[i + 1];
					imageData.data[i + 2] = bgImageData.data[i + 2];
					imageData.data[i + 3] = bgImageData.data[i + 3];
				}
			}

			tmpCanvasCtx.restore();

			ctx.save();
			ctx.putImageData(imageData, imagePosX, imagePosY);
			ctx.restore();

		};

		var drawDividedImage = function(ctx) {

			var image = that.image();
			var imagePosX = getX();
			var imagePosY = getY();
			if (onScreen()) {
				var coordinateSys = RGPP.System.CoordinateSystem.getInstance();
				imagePosX = coordinateSys.convertMapToScreenX(imagePosX);
				imagePosY = coordinateSys.convertMapToScreenY(imagePosY);
			}

			var scaleX = that.scaleX();
			var scaleY = that.scaleY();
			var rad = radian();
			var imageWidth = that.imageWidth();
			var imageHeight = that.imageHeight();

			var divideWidth = that.divideWidth();
			var divideHeight = that.divideHeight();
			var divideX = that.divideX();
			var divideY = that.divideY();
			var sx = sourceX();
			var sy = sourceY();

			ctx.save();
			ctx.translate(imagePosX, imagePosY);
			ctx.scale(scaleX, scaleY);
			ctx.translate(imageWidth / 2, imageHeight / 2);
			ctx.rotate(rad);
			ctx.translate(-imageWidth / 2, -imageHeight / 2);

			var maxWidth = 0;

			var tmpHeight = 0;
			for (var yIndex = 0; yIndex < divideY; yIndex += 1) {
				var tmpWidth = 0;
				var maxHeight = 0;
				for (var xIndex = 0; xIndex < divideX; xIndex += 1) {
					var divideScaleX = that.divideScaleX(xIndex, yIndex);
					var divideScaleY = that.divideScaleY(xIndex, yIndex);


					ctx.drawImage(image,
						sx + divideWidth * xIndex,
						sy + divideHeight * yIndex,
						divideWidth, divideHeight,
						tmpWidth, tmpHeight,
						divideWidth * divideScaleX, divideHeight * divideScaleY);

					tmpWidth += divideWidth * divideScaleX;
					var scaledDivideHeight = divideHeight * divideScaleY;
					if (maxHeight < scaledDivideHeight) {
						maxHeight = scaledDivideHeight;
					}
				}
				tmpHeight += maxHeight;
				if (maxWidth < tmpWidth) {
					maxWidth = tmpWidth;
				}
			}
			ctx.restore();
		};

		function setImageDataBaseID(categoryID, dataID) {
			mCategoryID = categoryID;
			mDataID = dataID;
			mLoadEnd = false;
		}

		function getCategoryID() {
			return mCategoryID;
		}

		function dataID() {
			return mDataID;
		}

		function getImage() {
			return RGPP.System.ImageDataManager.getInstance().loadImage(mCategoryID, mDataID, mAddColor);
		}

		//handle Size X Y
		function setSizeXY(width, height) {
			mImageWidth = width;
			mImageHeight = height;

			mSizeChange = true;
		}

		function imageWidth() {
			return mImageWidth;
		}

		function imageHeight() {
			return mImageHeight;
		}

		function hitSquareWidth() {
			return that.divideWidth();
		}

		function hitSquareHeight() {
			return that.divideHeight();
		}

		function calcTextWidth(ctx) {
			if (textFlag()) {
				ctx.font = that.font();
				var metrics = ctx.measureText(mText);
				var width = metrics.width;
				if (width === undefined) {
					var scriptUtil = RGPP.System.ScriptUtil.getInstance();

					scriptUtil.outputMsgToConsole("width = undefined");
					var fonts = ctx.font.split("pt");
					var widthPt = null;
					for (var j = 0; j < fonts.length; ++j) {
						widthPt = fonts[j].match(/[0-9]*/);
						if (widthPt) {
							width = RGPP.System.ScreenInfo.getInstance().ptToPixel(parseInt(widthPt, 10));
							break;
						}
					}
				}
				mImageWidth = width;
			}
			return mImageWidth;
		}

		function calcTextHeight(ctx) {
			if (textFlag()) {
				var metrics = ctx.measureText(mText);
				var height = metrics.height;
				if (height === undefined) {
					var scriptUtil = RGPP.System.ScriptUtil.getInstance();
					scriptUtil.outputMsgToConsole("height = undefined");
					var fonts = ctx.font.split("pt");
					var heightPt = null;
					for (var j = 0; j < fonts.length; ++j) {
						heightPt = fonts[j].match(/[0-9]*/);
						if (heightPt) {
							height = RGPP.System.ScreenInfo.getInstance().ptToPixel(parseInt(heightPt, 10));
							break;
						}
					}
				}
				mImageHeight = height;
			}
			return mImageHeight;
		}

		function calcTextSize(ctx) {
			calcTextWidth(ctx);
			calcTextHeight(ctx);
		}

		function drawTextFrame(ctx) {
			ctx.strokeStyle = "green";

			var textWidth = calcTextWidth(ctx);
			var textHeight = calcTextHeight(ctx);
			var dstX = mDstX;
			var dstY = mDstY;
			if (mOnScreenFlag) {
				var coordinateSys = RGPP.System.CoordinateSystem.getInstance();
				dstX = coordinateSys.convertMapToScreenX(dstX);
				dstY = coordinateSys.convertMapToScreenY(dstY);
			}

			RGPP.System.FundamentalDrawing.getInstance().drawRect(ctx, dstX, dstY, textWidth, textHeight, 1);
		}

		// handle Source X Y
		function setSourceXY(ax, ay) {
			mSourceX = ax;
			mSourceY = ay;
		}

		function sourceX() {
			return mSourceX;
		}

		function sourceY() {
			return mSourceY;
		}

		function setXY(ax, ay) {
			mDstX = ax;
			mDstY = ay;
		}

		function setCenterXY(ax, ay) {
			mCenterX = ax;
			mCenterY = ay;

			var displayImageWidth = 0;
			var displayImageHeight = 0;

			for (var yIndex = 0; yIndex < mDivideY; yIndex += 1) {
				var tmpWidth = 0;
				var maxHeight = 0;
				for (var xIndex = 0; xIndex < mDivideX; xIndex += 1) {
					tmpWidth += divideWidth() * divideScaleX(xIndex, yIndex);
					var tmpHeight = divideHeight() * divideScaleY(xIndex, yIndex);

					if (maxHeight < tmpHeight) {
						maxHeight = tmpHeight;
					}
				}
				if (displayImageWidth < tmpWidth) {
					displayImageWidth = tmpWidth;
				}
				displayImageHeight += maxHeight;
			}

			mDstX = Math.round(mCenterX - displayImageWidth * mScaleX / 2);
			mDstY = Math.round(mCenterY - displayImageHeight * mScaleY / 2);
			mPositionChange = true;
		}

		function getX() {
			return mDstX;
		}

		function getY() {
			return mDstY;
		}

		function centerX() {
			return mCenterX;
		}

		function centerY() {
			return mCenterY;
		}

		//handle Divide X Y
		function setDivideXY(ax, ay) {
			mDivideX = ax;
			mDivideY = ay;

			mDividedScaleX = [];
			mDividedScaleY = [];
			for (var y = 0; y < mDivideY; y += 1) {
				mDividedScaleX[y] = [];
				mDividedScaleY[y] = [];
				for (var x = 0; x < mDivideX; x += 1) {
					mDividedScaleX[y][x] = 1.0;
					mDividedScaleY[y][x] = 1.0;
				}
			}
		}

		function setDivideScale(x, y, scaleX, scaleY) {
			mDividedScaleX[y][x] = scaleX;
			mDividedScaleY[y][x] = scaleY;
		}

		function divideWidth() {
			return mImageWidth / mDivideX;
		}

		function divideHeight() {
			return mImageHeight / mDivideY;
		}

		function divideX() {
			return mDivideX;
		}

		function divideY() {
			return mDivideY;
		}

		function divideScaleX(x, y) {
			return mDividedScaleX[y][x];
		}

		function divideScaleY(x, y) {
			return mDividedScaleY[y][x];
		}

		//handle animation Index
		function animIndex() {
			return mAnimIndex;
		}

		function setAnimIndex(index) {
			mAnimIndex = index;
		}

		function setScaleXY(scaleX, scaleY) {
			mScaleX = scaleX;
			mScaleY = scaleY;
		}

		function scaleX() {
			return mScaleX;
		}

		function scaleY() {
			return mScaleY;
		}

		//handle Radian
		function setRadian(rad) {
			mRadian = rad;
		}

		//handle Radian
		function setDegree(degree) {
			mRadian = degree * Math.PI / 180;
		}

		function radian() {
			return mRadian;
		}

		function setText(text) {
			mText = text;
		}

		function text() {
			return mText;
		}

		// Text Flag
		function textFlag() {
			return (mText !== null);
		}

		function setFont(font) {
			mFont = font;
		}

		function font() {
			return mFont;
		}

		function setFontColor(r, g, b, a) {
			if (textFlag()) {
				r = r || 0;
				g = g || 0;
				b = b || 0;
				a = (a === undefined) ? a : 1;
				mColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
			}

		}

		function setAddColor(r, g, b, a) {
			if (!textFlag()) {
				r = r || 0;
				g = g || 0;
				b = b || 0;
				a = a || 0;

				mAddColor.r = r;
				mAddColor.g = g;
				mAddColor.b = b;
				mAddColor.a = a;
			}

		}

		function color() {
			return mColor;
		}

		function isStroke() {
			return mStrokeFlag;
		}

		function setStroke() {
			mStrokeFlag = true;
		}

		function resetStroke() {
			mStrokeFlag = false;
		}

		//handle AngularVelocity
		function setAngularVelocity(angularVelocityRadian) {
			mAngularVelocityRadian = angularVelocityRadian;
		}

		function getAngularVelocity() {
			return mAngularVelocityRadian;
		}

		//handle Global Alpha
		function setGlobalAlpha(alpha) {
			mGlobalAlpha = alpha;
		}

		function globalAlpha() {
			return mGlobalAlpha;
		}

		//handle Animation Pattern Array
		function setAnimPatternArray(array) {
			mAnimPatternArray = array;
			//get Max value
			var max = 0;
			for (var i = 0; i < array.length; ++i) {
				if (max < array[i]) {
					max = array[i];
				}
			}
			mAnimPatternIndexMax = max + 1;
		}

		function animPatternArray() {
			return mAnimPatternArray;
		}

		//handle Animation Pattern Index
		function setAnimPatternIndex(index) {
			mAnimPatternIndex = index;
		}

		function animPatternIndex() {
			return mAnimPatternIndex;
		}

		//handle Animation Pattern Array Index
		function setAnimPatternArrayIndex(index) {
			mAnimPatternArrayIndex = index;
		}

		function animPatternArrayIndex() {
			return mAnimPatternArrayIndex;
		}

		function setAnimPatternArrayIndexMax(max) {
			mAnimPatternArrayIndexMax = max;
		}

		// start rotation
		function startRotate(degree) {
			var angularVelocityRadian = degree * Math.PI / 180;
			setAngularVelocity(angularVelocityRadian);
			mRotateFlag = true;
		}

		// update rotation
		function updateRotate() {
			if (mRotateFlag) {
				var angularVelocity = getAngularVelocity();
				var rad = radian() + angularVelocity;
				rad %= (2 * Math.PI);
				setRadian(rad);
			}
		}

		// stop rotation
		function stopRotate(rad) {
			mRotateFlag = false;
		}

		function isLoadEnd() {
			return mLoadEnd;
		}

		function isSizeChange() {
			return mSizeChange;
		}

		function setSizeChange() {
			mSizeChange = true;
		}

		function canDiplay() {
			return mDisplayFlag;
		}

		function enableDisplay() {
			mDisplayFlag = true;
		}

		function disableDisplay() {
			mDisplayFlag = false;
		}

		function onScreen() {
			return mOnScreenFlag;
		}

		function setOnScreen(flag) {
			mOnScreenFlag = flag;
		}

		function spriteAnimFlag() {
			return mSpriteAnimFlag;
		}

		function setSpriteAnimFlag(flag) {
			mSpriteAnimFlag = flag;
		}

		function getAddColor() {
			return mAddColor;
		}

		function onMouse() {
			return mOnMouseFlag;
		}

		function checkOnMouse() {

			var cm = RGPP.System.ControlManager.getInstance();
			var mouseX = cm.getMouseX();
			var mouseY = cm.getMouseY();

			var width = that.hitSquareWidth();
			var height = that.hitSquareHeight();
			if (mDstX < mouseX && mouseX < (mDstX + width) && mDstY < mouseY && mouseY < (mDstY + height)) {
				mOnMouseFlag = true;
			}
			else {
				mOnMouseFlag = false;
			}
		}

		function stepAnim() {
			var pattern = mAnimPatternArray;
			var plength = pattern.length;

			var patternArrayIndex = mAnimPatternArrayIndex;
			var divideY = mDivideY;
			var animIndex = getAnimIndex();
			var sizeX = that.divideWidth();
			var sizeY = that.divideHeight();
			var max = mAnimPatternIndexMax;

			mSourceX = Math.floor(patternArrayIndex / divideY) * sizeX * max;
			mSourceX += sizeX * animIndex;

			mSourceY = (patternArrayIndex % divideY) * sizeY;

			if (mUpdateCount > UPDATE_INTERVAL) {
				mAnimPatternIndex = (mAnimPatternIndex + 1) % plength;
				mUpdateCount = 0;
			}
			else {
				++mUpdateCount;
			}
		}

		function getAnimIndex() {
			return mAnimPatternArray[mAnimPatternIndex];
		}

		function setUpdateInterval(interval) {
			UPDATE_INTERVAL = interval;
		}

		function sortFunction(a, b) {
			if (a.getZ() < b.getZ()) {
				return -1;
			}
			if (a.getZ() > b.getZ()) {
				return 1;
			}
			return 0;
		}

		function getZ() {
			return mZ;
		}

		function setZ(az) {
			mZ = az;
		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
