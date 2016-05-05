/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	/* global $ */
	"use strict";
	var objName = "EditorMainPanel";

	/**
	 * Main Panel of Editor
	 * 
	 * @class EditorMainPanel
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		/** 
		 * Event Layer Number
		 * @property EVENT_LAYER_NUM
		 * @final 
		 */
		var EVENT_LAYER_NUM = 3;

		/**
		 * Menu List
		 * @property MENU_LIST_STRING
		 * @final
		 */
		var MENU_LIST_STRING = ["File", "Edit", "Test", "Database", "Setting", "Help"];

		/**
		 * File sub-sub-title
		 * @property FILE_SUBSUB_TITLE
		 * @final
		 */
		var FILE_SUBSUB_TITLE = "File Menu",
			NEW_MAP_STRING = "New Map",
			NEW_MAP_CLASS_STRING = "NewMap",
			OPEN_PROJECT_STRING = "Open Project",
			OPEN_PROJECT_CLASS_STRING = "OpenProject",
			SAVE_MAP_STRING = "Save",
			SAVE_MAP_CLASS_STRING = "Save",
			DOWNLOAD_PROJECT_STRING = "Download Project",
			DOWNLOAD_PROJECT_CLASS_STRING = "DownloadProject";

		// Edit
		var EDIT_SUBSUB_TITLE = "Edit Menu";

		var UNDO_STRING = "Undo";
		var REDO_STRING = "Redo";
		var CUT_STRING = "Cut";
		var COPY_STRING = "Copy";
		var PASTE_STRING = "Paste";

		// Test
		var TEST_SUBSUB_TITLE = "Test Menu";
		var PLAY_STRING = "Play";
		var STOP_STRING = "Stop";

		// Debug
		var DEBUG_STRING = "Debug";
		var MODE_STRING = "Mode";

		var DEBUG_CLASS_STRING = "Debug";

		// Pause
		var PAUSE_STRING = "Pause";
		var PAUSE_CLASS_STRING = PAUSE_STRING;

		var PLAY_CLASS_STRING = PLAY_STRING;
		var STOP_CLASS_STRING = STOP_STRING;
		var PLAY_QUIT_CLASS_STRING = PLAY_STRING + STOP_STRING;

		// DB
		var GAME_DATA_DB_SUBSUB_TITLE = "Game Data";
		var FILE_DB_SUBSUB_TITLE = "File";
		var MAP_DB_SUBSUB_TITLE = "Map";
		var PM_DB_SUBSUB_TITLE = "Project Management";


		var READ_ONLY_DB_STRING = "Read Only DataBase";
		var READ_ONLY_DB_CLASS_STRING = "ReadOnlyDataBase";
		var GAME_STATE_DB_STRING = "Game State DataBase";
		var GAME_STATE_DB_CLASS_STRING = "GameStateDataBase";
		var SCRIPT_DB_STRING = "Script Database";
		var SCRIPT_DB_CLASS_STRING = "ScriptDatabase";
		var IMAGE_DB_STRING = "Image Database";
		var IMAGE_DB_CLASS_STRING = "ImageDatabase";
		var SOUND_DB_STRING = "Sound Database";
		var SOUND_DB_CLASS_STRING = "SoundDatabase";
		var MAP_DB_STRING = "Map Database";
		var MAP_DB_CLASS_STRING = "MapDatabase";
		var MAP_CHIP_DB_STRING = "MapChip Database";
		var MAP_CHIP_DB_CLASS_STRING = "MapChipDatabase";

		// Task
		var TASK_DB_STRING = "Task Database";
		var TASK_DB_CLASS_STRING = "TaskDatabase";

		// Schedule
		var SCHEDULE_STRING = "Schedule";
		var SCHEDULE_CLASS_STRING = "Schedule";

		// Dead line
		var DEAD_LINE_DB_STRING = "Deadline Database";
		var DEAD_LINE_DB_CLASS_STRING = "DeadlineDatabase";

		// Setting
		var SETTING_SUBSUB_TITLE = "Setting Menu";

		var BASE_SETTING_STRING = "Base Setting";
		var BASE_SETTING_CLASS_STRING = "BasicSetting";

		// Help
		var HELP_SUBSUB_TITLE = "Help Menu";
		var VERSION_STRING = "Version";

		var GRID_CLASS_STRING = "Grid";

		// Panel
		var mMapPanelItemDiv = $("<div id = 'MapPanelItemDiv'>");
		var mPalettePanelItemDiv = $("#PalettePanelItemDiv");
		var mEventListItemDiv = $("<div id = 'EventListItemDiv'>");

		var mListTabMapPanel = null;

		var mListTabPalettePanel = null;

		// Combo box
		// Change Layer
		var mLayerSelectBox = null;
		// Change Game Mode
		var mExecuteModeSelectBox = null;

		// Change Draw Mode
		var mDrawSelectBox = null;

		// Tag data spinner
		var mTagDataSpinner = null;

		// Save pop up
		var mSavePopUp = RGPP.System.PopUp();

		// Interface
		that.open = open;
		/**
		 * Open main panel of editor
		 * @method open
		 */
		function open() {
			// detecting user's browser type & version
			RGPP.System.BrowserUtil.getInstance().detectUserBrowserTypeVersion();

			// init palette panel
			scriptUtil.outputMsgToConsole("init Palette Panel...");
			initPalettePanel_();

			// init map panel
			scriptUtil.outputMsgToConsole("init Map Panel...");
			initMapPanel_();

			// init DB
			scriptUtil.outputMsgToConsole("init DB...");
			initDB_();

			// init side bar
			scriptUtil.outputMsgToConsole("init side bar...");
			initSidebar_();

			// init menu button
			scriptUtil.outputMsgToConsole("init icon menu...");
			initIconMenu_();

			// init command
			scriptUtil.outputMsgToConsole("init command...");
			initCommand_();

			// init combobox
			scriptUtil.outputMsgToConsole("init combobox...");
			initDrawComboBox_();

			scriptUtil.outputMsgToConsole("init popUp...");
			initPopUp_();

			scriptUtil.outputMsgToConsole("init emulation canvas...");
			initEmulationModeCanvas_();

			scriptUtil.outputMsgToConsole("Open all tab...");
			mListTabMapPanel.openAllTab();

		}

		// Private Method Implementation
		/**
		 * initialize palette panel
		 * @method initPalettePanel_
		 * @private
		 */
		var initPalettePanel_ = function() {
			// create palette panels
			var palettePanelList = RGPP.System.PalettePanelList.getInstance();
			palettePanelList.createPalettePanels();

			// set palette panel to list tab palette panel
			var changeTab = function(tabID) {
				palettePanelList.setCurrentPalettePanel(tabID);
			};

			mListTabPalettePanel = RGPP.System.ListTabPanel({
				itemListDiv: mPalettePanelItemDiv,
				listObject: palettePanelList,
				changeTabFunc: changeTab
			});

			// set righ side bar
			$("#rightSidebar").append(mPalettePanelItemDiv);
			$("#rightSidebar").append(mEventListItemDiv);

			$(mPalettePanelItemDiv).hide();

			// after adding element set click function
			mListTabPalettePanel.setClickFunction();
		};

		function initMapPanel_() {

			mListTabMapPanel = RGPP.System.ListTabMapPanel.getInstance({
				itemDiv: mMapPanelItemDiv
			});
			var listTabMapPanelDiv = mListTabMapPanel.div();
			$("#main-panel").append(listTabMapPanelDiv);
			$("#leftSidebar").append(mMapPanelItemDiv);

			mListTabMapPanel.setClickFunction();

		}

		function initSidebar_() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();

			var rightSidebarSection = $("#rightSidebar");
			var rightSidebar = RGPP.System.Sidebar({
				sidebarObj: rightSidebarSection
			});
			rightSidebar.setParameter("right", "#open-sb-right", "", "rightMask");

			var leftSidebarSection = $("#leftSidebar");
			var leftSidebar = RGPP.System.Sidebar({
				sidebarObj: leftSidebarSection
			});
			leftSidebar.setParameter("left", "#open-sb-left", ".main-panel", "leftMask");

			var openerRightFunc = function() {
				if (mLayerSelectBox.selectedIndex() !== EVENT_LAYER_NUM) {
					$(mEventListItemDiv).hide();
					$(mPalettePanelItemDiv).show();
				}
				else {
					$(mPalettePanelItemDiv).hide();
					$(mEventListItemDiv).empty();
					var ulElement = mapPanelList.currentEventNameList();
					$(mEventListItemDiv).append(ulElement);
					$(mEventListItemDiv).show();
				}
			};

			var openerLeftFunc = function() {
				$(mMapPanelItemDiv).show();
			};

			var uiOperator = RGPP.System.UIOperator.getInstance();
			uiOperator.registClickFunction($("#open-sb-right"), openerRightFunc);
			uiOperator.registClickFunction($("#open-sb-left"), openerLeftFunc);

			mTagDataSpinner = RGPP.System.Spinner({
				$element: $("#tag-data-spinner")
			});

			mTagDataSpinner.setUp({
				minValue: 0,
				maxValue: Number.MAX_VALUE,
				defaultValue: 0,
				stepValue: 1,
				format: "n"
			});

			var pw = RGPP.System.PaletteWindow.getInstance({
				$element: $("#palette-window")
			});

			uiOperator.registClickFunction($("#save-tag-data"), saveTagDataFunction);
			uiOperator.registOpener($("a[href = '#Palette']"), pw);
		}

		function initIconMenu_() {
			// Set Layer Combo box
			mLayerSelectBox = RGPP.System.SelectBox({
				$element: $("#layer"),
				updateFunc: layerComboBoxUpdateFunc_
			});

			// Set Execute Combo box
			mExecuteModeSelectBox = RGPP.System.SelectBox({
				$element: $("#executeMode"),
				updateFunc: executeModeComboBoxUpdateFunc_
			});
		}

		var enableTestMode_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			gm.setTestMode(true);
			mPlayButton.changeIcon(mStopButtonImage);
			$(mPlayButton.element()).attr("title", STOP_STRING);
			if (gm.isDebugMode()) {
				$(document.body).css("background", "#bfffbf");
			}
			else {
				$(document.body).css("background", "#F9C270");
			}
		};

		var saveTagDataFunction = function() {
			var md = RGPP.System.MapChipDataBase.getInstance();
			var value = mTagDataSpinner.value();
			var pList = RGPP.System.PalettePanelList.getInstance();
			var categoryID = pList.currentPanelCategoryID();
			var dataID = pList.currentPanelDataID();
			var chipNo = pList.currentSelectedChipNo();
			md.setTagData(categoryID, dataID, chipNo, value);
			md.saveTagData();

			pList.currentPalettePanel().paintComponent();
		};

		var disableTestMode_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			gm.setTestMode(false);
			mPlayButton.changeIcon(mPlayButtonImage);
			$(mPlayButton.element()).attr("title", PLAY_STRING);
			$(document.body).css("background", "white");
		};

		function setTagSpinnerValue() {
			var md = RGPP.System.MapChipDataBase.getInstance();
			var pList = RGPP.System.PalettePanelList.getInstance();
			var categoryID = pList.currentPanelCategoryID();
			var dataID = pList.currentPanelDataID();
			var chipNo = pList.currentSelectedChipNo();
			var tagData = md.getTagData(categoryID, dataID, chipNo);
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("chipNo = " + chipNo + " tagData = " + tagData);
			mTagDataSpinner.setValue(tagData);
		}

		var enableDebugMode_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			gm.setDebugMode(true);
			$("." + DEBUG_CLASS_STRING).css("border", "inset 2px");
			if (gm.isTestMode()) {
				$(document.body).css("background", "#bfffbf");
			}
			else {
				$(document.body).css("background", "white");
			}
		};

		var disableDebugMode_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			gm.setDebugMode(false);
			$("." + DEBUG_CLASS_STRING).css("border", "");
			if (gm.isTestMode()) {
				$(document.body).css("background", "#F9C270");
			}
			else {
				$(document.body).css("background", "white");
			}
		};

		function executeModeComboBoxUpdateFunc_(selectedIndex) {
			var gm = RGPP.System.GameManager.getInstance();
			var emulationModeCanvas = RGPP.System.EmulationModeCanvas.getInstance();
			if (selectedIndex > 0) {
				disableDebugMode_();
				gm.setEmulationMode(true);
				emulationModeCanvas.initialize();
			}
			else {
				gm.setEmulationMode(false);
				emulationModeCanvas.hide();
			}
		}

		function layerComboBoxUpdateFunc_(selectedIndex) {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mapPanelList.updateMapLayer(selectedIndex);
			if (mapPanelList.isEventLayer()) {
				RGPP.System.PaletteWindow.getInstance().closeFunc();
			}
			else {
				mListTabPalettePanel.openAllTabInNothingOpen();
				RGPP.System.PaletteWindow.getInstance().openFunc();
			}
		}

		function initDB_() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var uiOperator = RGPP.System.UIOperator.getInstance();

			var readOnlyDBModalWindow = RGPP.System.ReadOnlyDataBaseModal({
				updateFunc: function() {}
			});

			var gameStateDBModalWindow = RGPP.System.GameStateDataBaseModal({
				updateFunc: function() {}
			});

			var scriptDBModalWindow = RGPP.System.ScriptDataBaseModal({
				updateFunc: function() {
					mapPanelList.updateAll();
				}
			});

			var imageDBModalWindow = RGPP.System.ImageDataBaseModal({
				updateFunc: function() {
					scriptUtil.outputMsgToConsole("update image db!");
					mapPanelList.updateAll();
				}
			});

			var soundDBModalWindow = RGPP.System.SoundDataBaseModal({
				updateFunc: function() {
					scriptUtil.outputMsgToConsole("update sound db!");
					mapPanelList.updateAll();
				}
			});

			var mapDBModalWindow = RGPP.System.MapDataBaseModal({
				updateFunc: function() {
					scriptUtil.outputMsgToConsole("update map db!");
					mListTabMapPanel.updateAll(-1);
				}
			});

			var mapChipDBModalWindow = RGPP.System.MapChipDataBaseModal({
				updateFunc: function() {
					scriptUtil.outputMsgToConsole("update map chip db!");
					var palettePanelList = RGPP.System.PalettePanelList.getInstance();
					palettePanelList.createPalettePanels();
					mapPanelList.updateAll();
					mListTabPalettePanel.update(-1);
					var pw = RGPP.System.PaletteWindow.getInstance();
					uiOperator.registOpener($("a[href = '#Palette']"), pw);
				}
			});

			var taskDBModalWindow = RGPP.System.TaskListModal({
				updateFunc: function() {
					RGPP.System.Schedule.getInstance().initialize();
				}
			});

			var deadlineDBModalWindow = RGPP.System.DeadlineListModal({
				updateFunc: function() {
					RGPP.System.Schedule.getInstance().initialize();
				}
			});

			// After adding body, set click function
			uiOperator.registOpener($("." + READ_ONLY_DB_CLASS_STRING), readOnlyDBModalWindow);
			uiOperator.registOpener($("." + GAME_STATE_DB_CLASS_STRING), gameStateDBModalWindow);
			uiOperator.registOpener($("." + SCRIPT_DB_CLASS_STRING), scriptDBModalWindow);
			uiOperator.registOpener($("." + IMAGE_DB_CLASS_STRING), imageDBModalWindow);
			uiOperator.registOpener($("." + SOUND_DB_CLASS_STRING), soundDBModalWindow);
			uiOperator.registOpener($("." + MAP_DB_CLASS_STRING), mapDBModalWindow);
			uiOperator.registOpener($("." + MAP_CHIP_DB_CLASS_STRING), mapChipDBModalWindow);
			uiOperator.registOpener($("." + TASK_DB_CLASS_STRING), taskDBModalWindow);
			uiOperator.registOpener($("." + DEAD_LINE_DB_CLASS_STRING), deadlineDBModalWindow);

		}

		function initCommand_() {
			// After adding body, set click function
			var uiOperator = RGPP.System.UIOperator.getInstance();

			uiOperator.registOpener($("." + NEW_MAP_CLASS_STRING), newMapModalWindow_);
			uiOperator.registOpener($("." + OPEN_PROJECT_CLASS_STRING), openProjectModalWindow_);
			uiOperator.registClickFunction($("." + SAVE_MAP_CLASS_STRING), saveMapFunc_);
			uiOperator.registClickFunction($("." + DOWNLOAD_PROJECT_CLASS_STRING), downloadProjectFunc_);

			uiOperator.registClickFunction($("." + UNDO_STRING), undoFunc_);
			uiOperator.registClickFunction($("." + REDO_STRING), redoFunc_);


			uiOperator.registClickFunction($("." + PLAY_CLASS_STRING), enableTestMode_);
			uiOperator.registClickFunction($("." + STOP_CLASS_STRING), disableTestMode_);
			uiOperator.registClickFunction($("." + PLAY_QUIT_CLASS_STRING), toggleTestMode_);
			uiOperator.registClickFunction($("." + PAUSE_CLASS_STRING), togglePause_);
			uiOperator.registClickFunction($("." + DEBUG_CLASS_STRING), toggleDebugMode_);

			uiOperator.registClickFunction($("." + SCHEDULE_CLASS_STRING), openShedule_);
			uiOperator.registClickFunction($("." + GRID_CLASS_STRING), toggleGridMode_);

			uiOperator.registOpener($("." + BASE_SETTING_CLASS_STRING), basicSettingModalWindow_);
			uiOperator.registClickFunction($("." + VERSION_STRING), showVersionFunc_);

		}

		var downloadProjectFunc_ = function() {
			alert("Down load project");
			RGPP.System.ProjectOperator.getInstance().downloadProject();
		};

		var openProjectModalWindow_ = RGPP.System.OpenProjectModal({
			updateFunc: function() {
				mListTabMapPanel.updateAll(-1);
			},
		});

		var undoFunc_ = function() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mapPanelList.undo();
		};

		var saveMapFunc_ = function() {
			mSavePopUp.playEffect();
			var menuReceiver = RGPP.System.MenuReceiver();
			var saveCommand = RGPP.System.SaveMap(menuReceiver);
			RGPP.System.CommandSimpleInvoker.getInstance().invoke(saveCommand);
		};

		var newMapModalWindow_ = RGPP.System.NewMapModal({
			updateFunc: function() {
				var mapPanelList = RGPP.System.MapPanelList.getInstance();
				var lastIndex = mapPanelList.size() - 1;
				mListTabMapPanel.updateAll(lastIndex);
			}
		});

		var redoFunc_ = function() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mapPanelList.redo();
		};

		var openShedule_ = function() {
			RGPP.System.Schedule.getInstance().switching();
		};

		var basicSettingModalWindow_ = RGPP.System.BasicSettingModal({
			updateFunc: function() {}
		});

		var showVersionFunc_ = function() {
			var menuReceiver = RGPP.System.MenuReceiver();
			var showVersionCommand = RGPP.System.ShowVersion(menuReceiver);
			RGPP.System.CommandSimpleInvoker.getInstance().invoke(showVersionCommand);
		};

		var toggleGridMode_ = function() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var gridMode = mapPanelList.toggleGridMode();
			if (gridMode) {
				$("." + GRID_CLASS_STRING).css("border", "inset 2px");
			}
			else {
				$("." + GRID_CLASS_STRING).css("border", "");
			}
		};

		var toggleTestMode_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			var testMode = gm.isTestMode();
			if (testMode) {
				disableTestMode_();
			}
			else {
				enableTestMode_();
			}
		};

		var togglePause_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			var isPause = gm.togglePause();
			if (isPause) {
				$("." + PAUSE_CLASS_STRING).css("border", "inset 2px");
			}
			else {
				$("." + PAUSE_CLASS_STRING).css("border", "");
			}
		};

		var toggleDebugMode_ = function() {
			var gm = RGPP.System.GameManager.getInstance();
			var debugMode = gm.isDebugMode();
			if (debugMode) {
				disableDebugMode_();
			}
			else {
				enableDebugMode_();
			}
		};


		/**
		 * initialize draw combo box
		 * @method initDrawComboBox_
		 * @private
		 */
		var initDrawComboBox_ = function() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mDrawSelectBox = RGPP.System.SelectBox({
				$element: $("#drawMode"),
				updateFunc: mapPanelList.updateDrawMode,
			});
		};

		/**
		 * initialize emulation mode canvas
		 * @method initEmulationModeCanvas_
		 * @private
		 */
		var initEmulationModeCanvas_ = function() {
			// $("#emulation-version").append(emulationModeCanvas.element());

			var emulationModeCanvas = RGPP.System.EmulationModeCanvas.getInstance();
			emulationModeCanvas.initialize();
			emulationModeCanvas.hide();
		};

		/**
		 * initialize task pop up
		 * @method initPopUp_
		 * @private
		 */
		var initPopUp_ = function() {
			// set css
			var css = RGPP.System.CssStyle.getInstance();

			// Save Map pop up
			mSavePopUp.appendElement("Save Complete!");
			mSavePopUp.setStartFadeInMs(20);
			mSavePopUp.setStartFadeOutMs(2000);
			mSavePopUp.setFadeInMs(20);
			mSavePopUp.setFadeOutMs(1000);
			css.setFixedLowerRightPosition(mSavePopUp.div());

			// Task pop up
			var taskPopUp = RGPP.System.TaskPopUp();
			css.setFixedCenterPosition(taskPopUp.div());

			taskPopUp.playEffect();
		};

		return that;
	};


	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);