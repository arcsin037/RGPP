/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "PalettePanel";

	/**
	 * Palette Panel
	 *
	 * @class PalettePanel 
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		/** 
		 * Top Margin of Canvas(px)
		 * @property TOP_MARGIN
		 * @final {number} 
		 */
		var TOP_MARGIN = 0;
		var CHIP_WIDTH = spec.chipWidth;
		var CHIP_HEIGHT = spec.chipHeight;

		var mCategoryID = spec.categoryID;
		var mDataID = spec.dataID;
		var mName = spec.paletteName;

		var mMouse = null;
		var mCanvas = null;
		var mPaletteImage = null;
		var mCtx = null;

		var mPaletteWidth = 640;
		var mPaletteHeight = 640;
		var mChipMaxWidth = 0;
		var mChipMaxHeight = 0;

		var mSelectedMapChipX = 0;
		var mSelectedMapChipY = 0;
		var mSelectedMapChipNoArray = null;

		var mStartPixelX = 0;
		var mStartPixelY = 0;

		var mSpecifyRangeX = 1;
		var mSpecifyRangeY = 1;

		var mSpecifyRangePixelX = CHIP_WIDTH;
		var mSpecifyRangePixelY = CHIP_HEIGHT;


		var that = {};

		that.setKeyBoard = setKeyBoard;
		that.setImage = setImage;
		that.mouseMoveFunc = mouseMoveFunc;
		that.mouseDownFunc = mouseDownFunc;
		that.mouseUpFunc = mouseUpFunc;
		that.mouseOutFunc = mouseOutFunc;
		that.canvas = canvas;
		that.drawSelectedImage = drawSelectedImage;
		that.drawChipImage = drawChipImage;
		that.paintComponent = paintComponent;
		that.specifyRangeX = specifyRangeX;
		that.specifyRangeY = specifyRangeY;
		that.selectedMapChipNo = selectedMapChipNo;
		that.selectedMapChipNoArray = selectedMapChipNoArray;
		that.paletteName = getPaletteName;

		function initialize() {

			mCanvas = RGPP.System.OperateCanvas.getInstance().createCanvas();
			var cssStyle = RGPP.System.CssStyle.getInstance();
			cssStyle.setRelativeCenterPosition(mCanvas);
			cssStyle.setBgColor(mCanvas, "cyan");
			cssStyle.setTopMargin(mCanvas, TOP_MARGIN);

			mCtx = RGPP.System.OperateCanvas.getInstance().getContext2D(mCanvas);

			mMouse = RGPP.System.Mouse({
				element: mCanvas,
				moveFunc: mouseMoveFunc,
				downFunc: mouseDownFunc,
				upFunc: mouseUpFunc,
				outFunc: mouseOutFunc
			});
			setImage(spec.palettePathName);

			//initialize selected Map Chip Array
			mSelectedMapChipNoArray = [1];
			mSelectedMapChipNoArray[0] = [1];
			mSelectedMapChipNoArray[0][0] = 0;
		}

		function setKeyBoard(element) {

		}

		function setImage(imgName) {
			mPaletteImage = RGPP.System.OperateCanvas.getInstance().loadImage(imgName);
			mPaletteImage.onload = function() {

				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputMsgToConsole("on load");

				mPaletteWidth = mPaletteImage.width;
				mPaletteHeight = mPaletteImage.height;
				mChipMaxWidth = Math.floor(mPaletteWidth / CHIP_WIDTH);
				mChipMaxHeight = Math.floor(mPaletteHeight / CHIP_HEIGHT);
				var cssStyle = RGPP.System.CssStyle.getInstance();
				cssStyle.setResolution(mCanvas, mPaletteWidth, mPaletteHeight);
				cssStyle.setPixelSize(mCanvas, mPaletteWidth, mPaletteHeight);
				paintComponent();

				RGPP.System.MapPanelList.getInstance().updateAll();
			};
		}

		function mouseMoveFunc(e) {
			if (mMouse.isDragged() === true) {
				var x = Math.floor(mMouse.getX() / CHIP_WIDTH);
				var y = Math.floor(mMouse.getY() / CHIP_HEIGHT);
				var diffX = x - mSelectedMapChipX;
				var diffY = y - mSelectedMapChipY;

				if (diffX < 0) {
					mSpecifyRangeX = diffX - 1;
				}
				else {
					mSpecifyRangeX = diffX + 1;
				}

				if (diffY < 0) {
					mSpecifyRangeY = diffY - 1;
				}
				else {
					mSpecifyRangeY = diffY + 1;
				}
			}
			paintComponent();
		}

		function mouseDownFunc(e) {
			mSelectedMapChipX = Math.floor(mMouse.getX() / CHIP_WIDTH);
			mSelectedMapChipY = Math.floor(mMouse.getY() / CHIP_HEIGHT);

			mSpecifyRangeX = 1;
			mSpecifyRangeY = 1;

			RGPP.System.PaletteWindow.getInstance().setTagSpinnerValue();

			paintComponent();
		}

		function mouseUpFunc(e) {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			var rangeX = Math.abs(mSpecifyRangeX);
			var rangeY = Math.abs(mSpecifyRangeY);
			mSelectedMapChipNoArray = [rangeY];
			var tmpX = mSelectedMapChipX;
			if (mSpecifyRangeX < 0) {
				tmpX += mSpecifyRangeX + 1;
			}
			var tmpY = mSelectedMapChipY;
			if (mSpecifyRangeY < 0) {
				tmpY += mSpecifyRangeY + 1;
			}

			for (var i = 0; i < rangeY; ++i) {
				mSelectedMapChipNoArray[i] = [rangeX];
				scriptUtil.outputMsgToConsole("mSelectedMapChipNoArray[" + i + "].length = " + mSelectedMapChipNoArray[i].length);
				for (var j = 0; j < rangeX; ++j) {
					mSelectedMapChipNoArray[i][j] = mChipMaxWidth * (tmpY + i) + tmpX + j;
					scriptUtil.outputMsgToConsole("mSelectedMapChipNoArray[" + i + "][" + j + "] = " + mSelectedMapChipNoArray[i][j]);
				}
			}

			paintComponent();
		}

		function mouseOutFunc(e) {
			paintComponent();
		}

		function canvas() {
			return mCanvas;
		}

		function drawSelectedImage(ctx, dstX, dstY, mapChipWidth, mapChipHeight) {
			var scaleX = mapChipWidth / CHIP_WIDTH;
			var scaleY = mapChipWidth / CHIP_HEIGHT;

			ctx.drawImage(
				mPaletteImage,
				mStartPixelX, mStartPixelY,
				mSpecifyRangePixelX, mSpecifyRangePixelY,
				dstX, dstY,
				mSpecifyRangePixelX * scaleX, mSpecifyRangePixelY * scaleY);
		}

		function drawChipImage(ctx, dstX, dstY, chipNo, mapChipWidth, mapChipHeight) {
			var chipX = chipNo % mChipMaxWidth;
			var chipY = Math.floor(chipNo / mChipMaxWidth);
			ctx.drawImage(
				mPaletteImage,
				chipX * CHIP_WIDTH, chipY * CHIP_HEIGHT,
				CHIP_WIDTH, CHIP_HEIGHT,
				dstX, dstY,
				mapChipWidth, mapChipHeight);
		}

		function paintComponent() {
			RGPP.System.OperateCanvas.getInstance().clear(mCtx);
			mCtx.drawImage(mPaletteImage, 0, 0);

			drawGrid();
			mStartPixelX = mSelectedMapChipX;
			if (mSpecifyRangeX < 0) {
				mStartPixelX += mSpecifyRangeX + 1;
			}
			mStartPixelX *= CHIP_WIDTH;

			mStartPixelY = mSelectedMapChipY;
			if (mSpecifyRangeY < 0) {
				mStartPixelY += mSpecifyRangeY + 1;
			}
			mStartPixelY *= CHIP_HEIGHT;

			mSpecifyRangePixelX = CHIP_WIDTH * Math.abs(mSpecifyRangeX);
			mSpecifyRangePixelY = CHIP_HEIGHT * Math.abs(mSpecifyRangeY);

			if (mStartPixelX >= 0 && mStartPixelX < mPaletteWidth && mStartPixelY >= 0 && mStartPixelY < mPaletteHeight) {
				var fd = RGPP.System.FundamentalDrawing.getInstance();
				fd.setColor(mCtx, 244, 255, 0, 1);
				fd.drawRect(mCtx, mStartPixelX, mStartPixelY, mSpecifyRangePixelX, mSpecifyRangePixelY, 2);
			}
		}

		var drawGrid = function() {
			var gridMode = RGPP.System.MapPanelList.getInstance().gridMode();

			if (gridMode) {
				var fd = RGPP.System.FundamentalDrawing.getInstance();
				fd.setColor(mCtx, 0, 0, 0, 0.9);
				for (var x = 0; x < mPaletteWidth; x += CHIP_WIDTH) {
					fd.drawLine(mCtx, x, 0, x, mPaletteHeight);
				}
				for (var y = 0; y < mPaletteHeight; y += CHIP_HEIGHT) {
					fd.drawLine(mCtx, 0, y, mPaletteWidth, y);
				}
				var md = RGPP.System.MapChipDataBase.getInstance();
				mCtx.font = 'bold 1em Verdana';
				mCtx.fillStyle = "red";
				mCtx.globalAlpha = 1.0;
				for (var y = 0; y < mChipMaxHeight; y += 1) {
					for (var x = 0; x < mChipMaxWidth; x += 1) {
						var chipSetNo = y * mChipMaxWidth + x;
						var tagData = md.getTagData(mCategoryID, mDataID, chipSetNo);
						var text = tagData;
						var fonts;
						var metrics = mCtx.measureText(text);
						var width = metrics.width;
						if (width === undefined) {
							var scriptUtil = RGPP.System.ScriptUtil.getInstance();
							scriptUtil.outputErrMsgToConsole("width = undefined");
							fonts = mCtx.font.split("pt");
							var widthtPt = null;
							for (var j = 0; j < fonts.length; ++j) {
								widthtPt = fonts[j].match(/[0-9]*/);
								if (widthtPt) {
									width = Math.floor((parseInt(widthtPt, 10) * 3 / 2));
									break;
								}
							}
						}

						var height = width;
						var loopCount = Math.floor(Math.LOG10E * Math.log(tagData));
						for (var i = 0; i < loopCount; i += 1) {
							height = height * 0.5;

						}
						var textX = x * CHIP_WIDTH + (CHIP_WIDTH - width) * 0.5;
						var textY = y * CHIP_HEIGHT + CHIP_HEIGHT * 0.5 + height * 0.5;
						mCtx.fillText(text, textX, textY, CHIP_WIDTH);
					}
				}
			}
		};


		function specifyRangeX() {
			return mSpecifyRangeX;
		}

		function specifyRangeY() {
			return mSpecifyRangeY;
		}

		function selectedMapChipNo() {
			return mSelectedMapChipY * mChipMaxWidth + mSelectedMapChipX;
		}

		function selectedMapChipNoArray() {
			return mSelectedMapChipNoArray;
		}

		function getPaletteName() {
			return mName;
		}

		initialize();

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
