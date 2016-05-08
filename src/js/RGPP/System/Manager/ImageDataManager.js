/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ImageDataManager";

	/**
	 * Image Data Manager
	 * @class Image Data Manager
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var ATTR_NUM = 2;

		var NAME_INDEX = 0;
		var DESCRIPTION_INDEX = 1;

		var that = {};

		that.createObj = createObj;
		that.loadImage = loadImage;
		that.clearObj = clearObj;

		var mImageStateArray = [];

		var ImageState = function(spec) {
			var that = {};

			that.image = image;
			that.loadedEnd = loadedEnd;

			var mProcessedImages = RGPP.System.ProcessedImages();
			var mLoadedEnd = false;

			spec.image.onload = function() {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputMsgToConsole("image load end!");
				mLoadedEnd = true;
			};

			mProcessedImages.setImage(0, 0, 0, 0, spec.image);


			function image(r, g, b, a) {
				if (mProcessedImages.image(r, g, b, a) === null) {
					createChangeColorImage(r, g, b, a);
				}

				return mProcessedImages.image(r, g, b, a);
			}

			function loadedEnd() {
				return mLoadedEnd;
			}

			function createChangeColorImage(r, g, b, a) {

				// Change color //
				if (mLoadedEnd) {
					var baseImage = mProcessedImages.image(0, 0, 0, 0);

					var imageWidth = baseImage.width;
					var imageHeight = baseImage.height;
					var operateCanvasInstance = RGPP.System.OperateCanvas.getInstance();
					var tmpCanvasCtx = operateCanvasInstance.tmpCanvasCtx2d();
					operateCanvasInstance.clear(tmpCanvasCtx);

					var picLength = imageWidth * imageHeight;


					tmpCanvasCtx.save();
					tmpCanvasCtx.drawImage(baseImage, 0, 0);
					tmpCanvasCtx.restore();

					var imageData = tmpCanvasCtx.getImageData(0, 0, imageWidth, imageHeight);
					for (var i = 0; i < picLength * 4; i += 4) {
						imageData.data[i + 0] = imageData.data[i + 0] + r;
						imageData.data[i + 1] = imageData.data[i + 1] + g;
						imageData.data[i + 2] = imageData.data[i + 2] + b;
						imageData.data[i + 3] = imageData.data[i + 3] + a;
					}

					tmpCanvasCtx.save();
					tmpCanvasCtx.putImageData(imageData, 0, 0);
					tmpCanvasCtx.restore();
					mProcessedImages.setImageSrc(r, g, b, a, operateCanvasInstance.tmpCanvasURL());
				}

			}

			return that;
		};

		/**
		 * If arg is text, create image obj of text
		 * If arg is numbr create image from DB.
		 * @method createObj
		 * @param arg {Object|String}
		 * @param [arg.categoryID] {Number|Function} Category ID
		 * @param [arg.dataID] {Number|Function} Data ID
		 */
		function createObj(arg) {
			var retObj = null;
			var categoryID, dataID;
			if (typeof arg === "string") {
				var text = arg;
				retObj = createTextObj(text);
			}
			else {
				if (typeof arg.categoryID === "function") {
					categoryID = arg.categoryID();
				}
				else {
					categoryID = arg.categoryID;
				}

				if (typeof arg.dataID === "function") {
					dataID = arg.dataID();
				}
				else {
					dataID = arg.dataID;
				}
				retObj = createImageObj(categoryID, dataID);
			}
			return retObj;
		}

		var createImageObj = function(categoryID, dataID) {
			var imageObj = RGPP.System.ImageObj({
				imageDBcategoryID: categoryID,
				imageDBdataID: dataID,
			});

			loadImage(categoryID, dataID);

			return imageObj;
		};

		var createTextObj = function(text) {
			var textObj = RGPP.System.ImageObj({});
			textObj.setText(text);
			return textObj;
		};

		function loadImage(categoryID, dataID, addColor) {
			if (categoryID < 0 || dataID < 0) {
				return mImageStateArray[-1][-1].image(0, 0, 0, 0);
			}

			var imageState = searchImageStateByID(categoryID, dataID);
			if (imageState !== null) {
				addColor = addColor || {
					r: 0,
					g: 0,
					b: 0,
					a: 0,
				};
				var loaded = imageState.loadedEnd();
				if (loaded) {
					return imageState.image(
						addColor.r,
						addColor.g,
						addColor.b,
						addColor.a);
				}

			}
			else {
				// create Image from DB
				var imageDB = RGPP.System.ImageDataBase.getInstance();

				var imageData = imageDB.searchDataFromID(categoryID, dataID);
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				if (imageData === null) {
					scriptUtil.outputErrMsgToConsole("[Image Data Manager.js] No Data");
					return null;
				}

				var filename = RGPP.Config.USER_IMAGE_DIRECTORY_PATH + imageData.attrValue(NAME_INDEX);
				scriptUtil.outputMsgToConsole("image name = " + filename);
				var img = RGPP.System.OperateCanvas.getInstance().loadImage(filename);

				imageState = ImageState({
					image: img,
				});
				if (mImageStateArray[categoryID] === undefined) {
					mImageStateArray[categoryID] = [];
				}
				mImageStateArray[categoryID][dataID] = imageState;
			}
			return null;
		}

		function searchImageStateByID(categoryID, dataID) {
			if (mImageStateArray[categoryID] === undefined) {
				return null;
			}
			if (mImageStateArray[categoryID][dataID] === undefined) {
				return null;
			}

			return mImageStateArray[categoryID][dataID];
		}

		function clearObj() {
			mImageStateArray = [];
			mImageStateArray[-1] = [];
			mImageStateArray[-1][-1] = ImageState({
				image: new Image()
			});
		}

		return that;
	};
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);