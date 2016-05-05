/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "ProjectOperator";
	/**
	 * Project Operator
	 * @class ProjectOperator
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {

		var that = {};

		that.downloadProject = downloadProject;
		that.uploadProject = uploadProject;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		function downloadProject() {
			// Save JSON Data
			var javascriptData = {
				script: null,
				image: null,
				sound: null,
				map: null,
				mapData: null,
				taskData: null,
				deadlineData: null,
			};

			javascriptData.script = RGPP.System.ScriptDataBase.getInstance().load();
			javascriptData.image = RGPP.System.ImageDataBase.getInstance().load();
			javascriptData.sound = RGPP.System.SoundDataBase.getInstance().load();
			javascriptData.mapChipData = RGPP.System.MapChipDataBase.getInstance().load();
			javascriptData.mapChipTagData = RGPP.System.MapChipDataBase.getInstance().loadTagData();
			javascriptData.map = RGPP.System.MapPanelList.getInstance().load();
			javascriptData.mapData = RGPP.System.MapPanelList.getInstance().loadAllMap();
			javascriptData.taskData = RGPP.System.TaskList.getInstance().load();
			javascriptData.deadlineData = RGPP.System.DeadlineList.getInstance().load();
			scriptUtil.outputMsgToConsole(javascriptData);

			var jsonData = JSON.stringify(javascriptData);
			scriptUtil.outputMsgToConsole("downloadJsonData = " + jsonData);

			var content = jsonData;

			var blob = new Blob([content], {
				// type: "application/json"
				type: "application/octet-stream"
			});
			scriptUtil.outputMsgToConsole(blob);
			var url = URL.createObjectURL(blob);
			scriptUtil.outputMsgToConsole(url);
			window.open(url);
		}

		function uploadProject(jsonData) {
			scriptUtil.outputMsgToConsole("uploadJsonData = " + jsonData);

			var javascriptData = JSON.parse(jsonData);
			scriptUtil.outputMsgToConsole(javascriptData);
			RGPP.System.ScriptDataBase.getInstance().updateWithArray(javascriptData.script.DBDataArray);
			RGPP.System.ImageDataBase.getInstance().updateWithArray(javascriptData.image.DBDataArray);
			RGPP.System.SoundDataBase.getInstance().updateWithArray(javascriptData.sound.DBDataArray);
			RGPP.System.MapPanelList.getInstance().updateWithJsMapData(javascriptData.map.DBDataArray, javascriptData.mapData);
			RGPP.System.MapChipDataBase.getInstance().updateWithJsMapChipData(javascriptData.mapChipData.DBDataArray, javascriptData.mapChipTagData);

			RGPP.System.TaskList.getInstance().updateWithArray(javascriptData.taskData.DBDataArray);
			RGPP.System.DeadlineList.getInstance().updateWithArray(javascriptData.deadlineData.DBDataArray);
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);