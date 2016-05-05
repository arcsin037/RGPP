/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Sound";

	/**
	 * Sound
	 * @class Sound
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		var mAudio = null;
		var mDataBaseID = 0;
		var mCategoryID = 0;
		var mFadeVolume = 1;
		var mFadeFlag = false;

		that.createNewAudio = createNewAudio;
		that.categoryID = categoryID;
		that.setDataBaseID = setDataBaseID;
		that.dataID = dataID;

		that.play = play;
		that.playFromStart = playFromStart;
		that.pause = pause;
		that.stop = stop;
		that.setLoop = setLoop;
		that.resetLoop = resetLoop;
		that.setVolume = setVolume;
		that.setMute = setMute;
		that.resetMute = resetMute;
		that.fadeout = fadeout;
		that.fadein = fadein;

		function createNewAudio(baseFilename, fileType) {
			baseFilename = baseFilename || "";
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("baseFileName = " + baseFilename);
			try {
				mAudio = new Audio("");
				if (mAudio.canPlayType) {
					var canPlayWave = ("" !== mAudio.canPlayType("audio/wav"));
					var canPlayOgg = ("" !== mAudio.canPlayType("audio/ogg"));
					var canPlayMp3 = ("" !== mAudio.canPlayType("audio/mpeg"));
					var canPlayMidi = ("" !== mAudio.canPlayType("audio/midi"));
					var sdb = RGPP.System.SoundDataBase.getInstance();
					var dataURI = RGPP.Config.USER_SOUND_DIRECTORY_PATH;
					var FILE_TYPE_BGM = sdb.fileTypeBGM();
					var FILE_TYPE_SE = sdb.fileTypeSE();
					switch (fileType) {
						case FILE_TYPE_BGM:
							dataURI = dataURI + "BGM";
							if (canPlayMp3) {
								// support mp3
								dataURI = dataURI + "/mp3/" + baseFilename + ".mp3";
							}
							else if (canPlayMidi) {
								// support midi
								dataURI = dataURI + "/midi/" + baseFilename + ".mid";
							}
							else if (canPlayOgg) {
								// support ogg
								dataURI = dataURI + "/ogg/" + baseFilename + ".ogg";
							}
							else {
								throw "This browser does not support ogg and mp3";
							}
							break;
						case FILE_TYPE_SE:
							dataURI = dataURI + "SE";
							if (canPlayMp3) {
								// support mp3
								dataURI = dataURI + "/mp3/" + baseFilename + ".mp3";
							}
							else if (canPlayOgg) {
								// support ogg
								dataURI = dataURI + "/ogg/" + baseFilename + ".ogg";
							}
							else if (canPlayWave) {
								// support wave
								dataURI = dataURI + "/wave/" + baseFilename + ".wav";
							}
							else {
								throw "This browser does not support ogg and mp3";
							}
							break;
						default:
							alert("Please input BGM or SE");
					}
				}
				else {
					throw "canPlayType method does not exist.";
				}
			}
			catch (e) {
				// Not support HTML5 Audio
				mAudio = null;
				alert("This browser does not htmlAudio");
				return;
			}

			mAudio.src = dataURI;
			mAudio.autobuffer = true;
			if (fileType === sdb.fileTypeBGM()) {
				mAudio.autoplay = true;
				mAudio.loop = true;
			}
			else if (fileType === sdb.fileTypeSE()) {
				mAudio.autoplay = false;
				mAudio.loop = false;
			}

		}


		function play() {
			mAudio.play();
		}


		function playFromStart() {
			mAudio.load();
			mAudio.play();
		}


		function pause() {
			mAudio.pause();
		}


		function stop() {
			if (!mAudio.ended) {
				pause();
				mAudio.currentTime = 0;
			}
		}


		function setLoop() {
			mAudio.loop = true;
		}


		function resetLoop() {
			mAudio.loop = false;
		}


		function setVolume(volume) {
			mAudio.volume = volume;
			mFadeFlag = false;
		}


		function setMute() {
			mAudio.muted = true;
		}


		function resetMute() {
			mAudio.muted = false;
		}

		function fadeout(finishCount) {
			if (!mFadeFlag) {
				mFadeVolume = 1.0;
				mFadeFlag = true;
			}
			else {
				if (mFadeVolume > 0.0) {
					mFadeVolume -= 1.0 / finishCount;
					if (mFadeVolume < 0.0) {
						mFadeVolume = 0.0;
					}
				}
			}
			mAudio.volume = mFadeVolume;
		}

		function fadein(finishCount) {
			if (!mFadeFlag) {
				mFadeVolume = 0.0;
				mFadeFlag = true;
			}
			else {
				if (mFadeVolume < 1.0) {
					mFadeVolume += 1.0 / finishCount;
					if (mFadeVolume > 1.0) {
						mFadeVolume = 1.0;
					}
				}
			}
			mAudio.volume = mFadeVolume;
		}

		function setDataBaseID(categoryID, databaseID) {
			mCategoryID = categoryID;
			mDataBaseID = databaseID;
		}

		function categoryID() {
			return mCategoryID;
		}

		function dataID() {
			return mDataBaseID;
		}

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);