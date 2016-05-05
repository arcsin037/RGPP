/**
 * @class Load User Script Functions
 * @author arcsin
 */
(function() {
	/* global RGPP */
	var settingInfo = RGPP.Config;
	if (!settingInfo.DEBUG_BOOT_MODE) {
		if (!settingInfo.LOAD_END_SYSTEM_SCRIPT || !settingInfo.LOAD_END_MW_SCRIPT) {
			// if the system & mw script loading procss has not been completed,
			// quit.
			return;
		}

	}
	console.log("Load User scripts");

	var EVENT_SCRIPT_DIRECTORY_PATH = settingInfo.USER_SCRIPT_DIRECTORY_PATH + "EventScript/";
	var IMAGE_FILTER_DIRECTORY_PATH = settingInfo.USER_SCRIPT_DIRECTORY_PATH + "ImageFilter/";

	var NAME_INDEX = 0;

		var scriptDB = RGPP.System.ScriptDataBase.getInstance();


	var loadScriptFileNames = [];

	var allScriptData = scriptDB.allData();
	var allDataSize = scriptDB.allDataSize();

	for (var i = 0; i < allDataSize; ++i) {
		loadScriptFileNames.push(allScriptData[i].attrValue(NAME_INDEX) + ".js");
	}

	var loadImageFilterFileNames = [];

	var filePath = "";
	var fileNum = loadScriptFileNames.length + loadImageFilterFileNames.length;

	for (var i = 0; i < loadImageFilterFileNames.length; i += 1) {
		filePath = IMAGE_FILTER_DIRECTORY_PATH + loadImageFilterFileNames[i];
		if (settingInfo.DEBUG_BOOT_MODE) {
			// For Debug
			document.write('<script type="text/javascript" src="' + filePath + '" charset="utf-8"><\/script>');
			console.log("load : " + filePath + " completely!");
		}
		else {
			$.getScript(filePath, completeFunction(filePath));
		}
	}

	for (var i = 0; i < loadScriptFileNames.length; i += 1) {
		filePath = EVENT_SCRIPT_DIRECTORY_PATH + loadScriptFileNames[i];
		if (settingInfo.DEBUG_BOOT_MODE) {
			// For Debug
			document.write('<script type="text/javascript" src="' + filePath + '" charset="utf-8"><\/script>');
			console.log("load : " + filePath + " completely!");
		}
		else {
			$.getScript(filePath, completeFunction(filePath));
		}
	}

	if (settingInfo.DEBUG_BOOT_MODE) {
		console.log("All user scripts have been loaded");
	}

	var count = 0;

	/**
	 * call function when load js script is completed
	 * 
	 * @method completeFunction
	 * @private
	 */
	function completeFunction(filePath) {
		return function() {
			count += 1;
			console.log("load : " + filePath + " completely!");
			$("#NowLoading").empty();
			$("#NowLoading").append("Loading... " + filePath);
			if (fileNum === count) {
				settingInfo.LOAD_END_USER_SCRIPT = true;
				console.log("All user scripts have been loaded");
				if (settingInfo.LOAD_END_SYSTEM_SCRIPT && settingInfo.LOAD_END_USER_SCRIPT && settingInfo.LOAD_END_MW_SCRIPT) {
					RGPP.System.Ready.getInstance().loadMain();
				}
			}
		};
	}
})();
