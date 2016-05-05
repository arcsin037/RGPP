/*
 * Sound DB Class
 */
(function(global) {
	/* global RGPP */
	"use strict";
	
	var objName = "SoundDataBase";
	var constructor = function() {
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		var mSoundList = RGPP.System.List();

		var ATTR_NUM = 3;

		var NAME_INDEX = 0;
		var DESCRIPTION_INDEX = 1;
		var FILE_TYPE_INDEX = 2;

		var FILE_TYPE = {
			SE: 0,
			BGM: 1
		};

		var that = RGPP.System.DataBase({
			dbName: "SoundDB",
			attrSize: ATTR_NUM
		});

		that.createObj = createObj;

		that.fileTypeSE = getFileTypeSE;
		that.fileTypeBGM = getFileTypeBGM;

		that.play = play;
		that.playFromStart = playFromStart;
		that.stop = stop;
		that.setLoop = setLoop;

		that.resetLoop = resetLoop;
		that.setVolume = setVolume;
		that.setMute = setMute;
		that.resetMute = resetMute;
		that.clear = clear;
		that.removeFromID = removeFromID;
		that.fadein = fadein;
		that.fadeout = fadeout;

		function initialize() {
			var attrStringArray = [ATTR_NUM];
			attrStringArray[NAME_INDEX] = "Sound File Name ";
			attrStringArray[DESCRIPTION_INDEX] = "Description";
			attrStringArray[FILE_TYPE_INDEX] = "File Type(SE or BGM)";

			that.setAttrString(attrStringArray);

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[NAME_INDEX] = "Sound";
			defaultAttrValueArray[DESCRIPTION_INDEX] = "Description";
			defaultAttrValueArray[FILE_TYPE_INDEX] = 0;

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[NAME_INDEX] = "Sound";
			correctedAttrValueArray[DESCRIPTION_INDEX] = "Description";
			correctedAttrValueArray[FILE_TYPE_INDEX] = 0;
			that.setCorrectedAttrValue(correctedAttrValueArray);
			that.load();

		}

		function createObj(categoryID, databaseID) {

			var soundObj = null;
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex < 0) {
				scriptUtil.outputMsgToConsole("sound == null");
				var soundData = that.searchDataFromID(categoryID, databaseID);
				if (soundData !== null) {

					var filename = soundData.attrValue(NAME_INDEX);
					var fileType = soundData.attrValue(FILE_TYPE_INDEX);
					scriptUtil.outputMsgToConsole("sound name = " + filename);

					var baseFileName = RGPP.System.StringUtil.getInstance().extractFileNameExceptForExtension(filename);
					scriptUtil.outputMsgToConsole("baseFileName = " + baseFileName);

					scriptUtil.outputMsgToConsole("fileType = " + fileType);
					soundObj = RGPP.System.Sound();
					soundObj.createNewAudio(baseFileName, fileType);
					soundObj.setDataBaseID(categoryID, databaseID);
					mSoundList.push(soundObj);
				}
			}
			else {
				soundObj = mSoundList.data(soundIndex);
			}

			scriptUtil.outputMsgToConsole("Sound obj list length = " + mSoundList.size());
			return soundObj;
		}

		function getFileTypeSE() {
			return FILE_TYPE.SE;
		}

		function getFileTypeBGM() {
			return FILE_TYPE.BGM;
		}

		function play(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.play();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function playFromStart(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.playFromStart();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function stop(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.stop();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function setLoop(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.setLoop();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function resetLoop(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.resetLoop();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function setVolume(categoryID, databaseID, volume) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.setVolume(volume);
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function setMute(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.setMute();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function resetMute(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.resetMute();
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function fadein(categoryID, databaseID, finishCount) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.fadein(finishCount);
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}

		}

		function fadeout(categoryID, databaseID, finishCount) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				var soundObj = mSoundList.data(soundIndex);
				soundObj.fadeout(finishCount);
			}
			else {
				scriptUtil.outputErrMsgToConsole("soundIndex can not find!");
			}
		}

		function clear() {
			mSoundList.clear();
		}

		function removeFromID(categoryID, databaseID) {
			var soundIndex = searchSoundIndexByID(categoryID, databaseID);
			if (soundIndex >= 0) {
				return mSoundList.remove(soundIndex);
			}
			return null;
		}

		// Private
		var searchSoundIndexByID = function(categoryID, databaseID) {
			var sounds = mSoundList.datas();
			for (var soundIndex = 0; soundIndex < sounds.length; ++soundIndex) {
				if (sounds[soundIndex].categoryID() === categoryID) {
					if (sounds[soundIndex].dataID() === databaseID) {
						return soundIndex;
					}
				}
			}
			return -1;
		};

		initialize();
		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);