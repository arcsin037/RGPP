/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

import {ScriptUtil} from '../UI'

 /**
  * Event Layer Number
  * @property EVENT_LAYER_NUM
  * @final
  */
 const EVENT_LAYER_NUM = 3

 /**
  * Menu List
  * @property MENU_LIST_STRING
  * @final
  */
 const MENU_LIST_STRING = ['File', 'Edit', 'Test', 'Database', 'Setting', 'Help']

 /**
  * File sub-sub-title
  * @property FILE_SUBSUB_TITLE
  * @final
  */
 const FILE_SUBSUB_TITLE = 'File Menu',
	 NEW_MAP_STRING = 'New Map',
	 NEW_MAP_CLASS_STRING = 'NewMap',
	 OPEN_PROJECT_STRING = 'Open Project',
	 OPEN_PROJECT_CLASS_STRING = 'OpenProject',
	 SAVE_MAP_STRING = 'Save',
	 SAVE_MAP_CLASS_STRING = 'Save',
	 DOWNLOAD_PROJECT_STRING = 'Download Project',
	 DOWNLOAD_PROJECT_CLASS_STRING = 'DownloadProject'
 // Edit
 const EDIT_SUBSUB_TITLE = 'Edit Menu'

 const UNDO_STRING = 'Undo'
 const REDO_STRING = 'Redo'
 const CUT_STRING = 'Cut'
 const COPY_STRING = 'Copy'
 const PASTE_STRING = 'Paste'

 // Test
 const TEST_SUBSUB_TITLE = 'Test Menu'
 const PLAY_STRING = 'Play'
 const STOP_STRING = 'Stop'

 // Debug
 const DEBUG_STRING = 'Debug'
 const MODE_STRING = 'Mode'

 const DEBUG_CLASS_STRING = 'Debug'

 // Pause
 const PAUSE_STRING = 'Pause'
 const PAUSE_CLASS_STRING = PAUSE_STRING

 const PLAY_CLASS_STRING = PLAY_STRING
 const STOP_CLASS_STRING = STOP_STRING
 const PLAY_QUIT_CLASS_STRING = PLAY_STRING + STOP_STRING

 // DB
 const GAME_DATA_DB_SUBSUB_TITLE = 'Game Data'
 const FILE_DB_SUBSUB_TITLE = 'File'
 const MAP_DB_SUBSUB_TITLE = 'Map'
 const PM_DB_SUBSUB_TITLE = 'Project Management'


 const READ_ONLY_DB_STRING = 'Read Only DataBase'
 const READ_ONLY_DB_CLASS_STRING = 'ReadOnlyDataBase'
 const GAME_STATE_DB_STRING = 'Game State DataBase'
 const GAME_STATE_DB_CLASS_STRING = 'GameStateDataBase'
 const SCRIPT_DB_STRING = 'Script Database'
 const SCRIPT_DB_CLASS_STRING = 'ScriptDatabase'
 const IMAGE_DB_STRING = 'Image Database'
 const IMAGE_DB_CLASS_STRING = 'ImageDatabase'
 const SOUND_DB_STRING = 'Sound Database'
 const SOUND_DB_CLASS_STRING = 'SoundDatabase'
 const MAP_DB_STRING = 'Map Database'
 const MAP_DB_CLASS_STRING = 'MapDatabase'
 const MAP_CHIP_DB_STRING = 'MapChip Database'
 const MAP_CHIP_DB_CLASS_STRING = 'MapChipDatabase'

 // Task
 const TASK_DB_STRING = 'Task Database'
 const TASK_DB_CLASS_STRING = 'TaskDatabase'

 // Schedule
 const SCHEDULE_STRING = 'Schedule'
 const SCHEDULE_CLASS_STRING = 'Schedule'

 // Dead line
 const DEAD_LINE_DB_STRING = 'Deadline Database'
 const DEAD_LINE_DB_CLASS_STRING = 'DeadlineDatabase'

 // Setting
 const SETTING_SUBSUB_TITLE = 'Setting Menu'

 const BASE_SETTING_STRING = 'Base Setting'
 const BASE_SETTING_CLASS_STRING = 'BasicSetting'

 // Help
 const HELP_SUBSUB_TITLE = 'Help Menu'
 const VERSION_STRING = 'Version'

 const GRID_CLASS_STRING = 'Grid'

 /**
  * Main Panel of Editor
  *
  * @class EditorMainPanel
  * @author arcsin
  * @constructor
  */
export default class EditorMainPanel {
	constructor() {

	}
}


// (function(global) {
// 	/* global RGPP */
// 	/* global $ */
// 	'use strict'
// 	const objName = 'EditorMainPanel'
//
// 	const constructor = function() {
//
//
// 		// Panel
// 		const mMapPanelItemDiv = $('<div id = 'MapPanelItemDiv'>')
// 		const mPalettePanelItemDiv = $('#PalettePanelItemDiv')
// 		const mEventListItemDiv = $('<div id = 'EventListItemDiv'>')
//
// 		const mListTabMapPanel = null
//
// 		const mListTabPalettePanel = null
//
// 		// Combo box
// 		// Change Layer
// 		const mLayerSelectBox = null
// 		// Change Game Mode
// 		const mExecuteModeSelectBox = null
//
// 		// Change Draw Mode
// 		const mDrawSelectBox = null
//
// 		// Tag data spinner
// 		const mTagDataSpinner = null
//
// 		// Save pop up
// 		const mSavePopUp = RGPP.System.PopUp()
//
// 		// Interface
// 		that.open = open
// 		/**
// 		 * Open main panel of editor
// 		 * @method open
// 		 */
// 		function open() {
// 			// detecting user's browser type & version
// 			RGPP.System.BrowserUtil.getInstance().detectUserBrowserTypeVersion()
//
// 			// init palette panel
// 			scriptUtil.outputMsgToConsole('init Palette Panel...')
// 			initPalettePanel_()
//
// 			// init map panel
// 			scriptUtil.outputMsgToConsole('init Map Panel...')
// 			initMapPanel_()
//
// 			// init DB
// 			scriptUtil.outputMsgToConsole('init DB...')
// 			initDB_()
//
// 			// init side bar
// 			scriptUtil.outputMsgToConsole('init side bar...')
// 			initSidebar_()
//
// 			// init menu button
// 			scriptUtil.outputMsgToConsole('init icon menu...')
// 			initIconMenu_()
//
// 			// init command
// 			scriptUtil.outputMsgToConsole('init command...')
// 			initCommand_()
//
// 			// init combobox
// 			scriptUtil.outputMsgToConsole('init combobox...')
// 			initDrawComboBox_()
//
// 			scriptUtil.outputMsgToConsole('init popUp...')
// 			initPopUp_()
//
// 			scriptUtil.outputMsgToConsole('init emulation canvas...')
// 			initEmulationModeCanvas_()
//
// 			scriptUtil.outputMsgToConsole('Open all tab...')
// 			mListTabMapPanel.openAllTab()
//
// 		}
//
// 		// Private Method Implementation
// 		/**
// 		 * initialize palette panel
// 		 * @method initPalettePanel_
// 		 * @private
// 		 */
// 		const initPalettePanel_ = function() {
// 			// create palette panels
// 			const palettePanelList = RGPP.System.PalettePanelList.getInstance()
// 			palettePanelList.createPalettePanels()
//
// 			// set palette panel to list tab palette panel
// 			const changeTab = function(tabID) {
// 				palettePanelList.setCurrentPalettePanel(tabID)
// 			}
//
// 			mListTabPalettePanel = RGPP.System.ListTabPanel({
// 				itemListDiv: mPalettePanelItemDiv,
// 				listObject: palettePanelList,
// 				changeTabFunc: changeTab
// 			})
//
// 			// set righ side bar
// 			$('#rightSidebar').append(mPalettePanelItemDiv)
// 			$('#rightSidebar').append(mEventListItemDiv)
//
// 			$(mPalettePanelItemDiv).hide()
//
// 			// after adding element set click function
// 			mListTabPalettePanel.setClickFunction()
// 		}
//
// 		function initMapPanel_() {
//
// 			mListTabMapPanel = RGPP.System.ListTabMapPanel.getInstance({
// 				itemDiv: mMapPanelItemDiv
// 			})
// 			const listTabMapPanelDiv = mListTabMapPanel.div()
// 			$('#main-panel').append(listTabMapPanelDiv)
// 			$('#leftSidebar').append(mMapPanelItemDiv)
//
// 			mListTabMapPanel.setClickFunction()
//
// 		}
//
// 		function initSidebar_() {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
//
// 			const rightSidebarSection = $('#rightSidebar')
// 			const rightSidebar = RGPP.System.Sidebar({
// 				sidebarObj: rightSidebarSection
// 			})
// 			rightSidebar.setParameter('right', '#open-sb-right', '', 'rightMask')
//
// 			const leftSidebarSection = $('#leftSidebar')
// 			const leftSidebar = RGPP.System.Sidebar({
// 				sidebarObj: leftSidebarSection
// 			})
// 			leftSidebar.setParameter('left', '#open-sb-left', '.main-panel', 'leftMask')
//
// 			const openerRightFunc = function() {
// 				if (mLayerSelectBox.selectedIndex() !== EVENT_LAYER_NUM) {
// 					$(mEventListItemDiv).hide()
// 					$(mPalettePanelItemDiv).show()
// 				}
// 				else {
// 					$(mPalettePanelItemDiv).hide()
// 					$(mEventListItemDiv).empty()
// 					const ulElement = mapPanelList.currentEventNameList()
// 					$(mEventListItemDiv).append(ulElement)
// 					$(mEventListItemDiv).show()
// 				}
// 			}
//
// 			const openerLeftFunc = function() {
// 				$(mMapPanelItemDiv).show()
// 			}
//
// 			const uiOperator = RGPP.System.UIOperator.getInstance()
// 			uiOperator.registClickFunction($('#open-sb-right'), openerRightFunc)
// 			uiOperator.registClickFunction($('#open-sb-left'), openerLeftFunc)
//
// 			mTagDataSpinner = RGPP.System.Spinner({
// 				$element: $('#tag-data-spinner')
// 			})
//
// 			mTagDataSpinner.setUp({
// 				minValue: 0,
// 				maxValue: Number.MAX_VALUE,
// 				defaultValue: 0,
// 				stepValue: 1,
// 				format: 'n'
// 			})
//
// 			const pw = RGPP.System.PaletteWindow.getInstance({
// 				$element: $('#palette-window')
// 			})
//
// 			uiOperator.registClickFunction($('#save-tag-data'), saveTagDataFunction)
// 			uiOperator.registOpener($('a[href = '#Palette']'), pw)
// 		}
//
// 		function initIconMenu_() {
// 			// Set Layer Combo box
// 			mLayerSelectBox = RGPP.System.SelectBox({
// 				$element: $('#layer'),
// 				updateFunc: layerComboBoxUpdateFunc_
// 			})
//
// 			// Set Execute Combo box
// 			mExecuteModeSelectBox = RGPP.System.SelectBox({
// 				$element: $('#executeMode'),
// 				updateFunc: executeModeComboBoxUpdateFunc_
// 			})
// 		}
//
// 		const enableTestMode_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			gm.setTestMode(true)
// 			mPlayButton.changeIcon(mStopButtonImage)
// 			$(mPlayButton.element()).attr('title', STOP_STRING)
// 			if (gm.isDebugMode()) {
// 				$(document.body).css('background', '#bfffbf')
// 			}
// 			else {
// 				$(document.body).css('background', '#F9C270')
// 			}
// 		}
//
// 		const saveTagDataFunction = function() {
// 			const md = RGPP.System.MapChipDataBase.getInstance()
// 			const value = mTagDataSpinner.value()
// 			const pList = RGPP.System.PalettePanelList.getInstance()
// 			const categoryID = pList.currentPanelCategoryID()
// 			const dataID = pList.currentPanelDataID()
// 			const chipNo = pList.currentSelectedChipNo()
// 			md.setTagData(categoryID, dataID, chipNo, value)
// 			md.saveTagData()
//
// 			pList.currentPalettePanel().paintComponent()
// 		}
//
// 		const disableTestMode_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			gm.setTestMode(false)
// 			mPlayButton.changeIcon(mPlayButtonImage)
// 			$(mPlayButton.element()).attr('title', PLAY_STRING)
// 			$(document.body).css('background', 'white')
// 		}
//
// 		function setTagSpinnerValue() {
// 			const md = RGPP.System.MapChipDataBase.getInstance()
// 			const pList = RGPP.System.PalettePanelList.getInstance()
// 			const categoryID = pList.currentPanelCategoryID()
// 			const dataID = pList.currentPanelDataID()
// 			const chipNo = pList.currentSelectedChipNo()
// 			const tagData = md.getTagData(categoryID, dataID, chipNo)
// 			const scriptUtil = RGPP.System.ScriptUtil.getInstance()
// 			scriptUtil.outputMsgToConsole('chipNo = ' + chipNo + ' tagData = ' + tagData)
// 			mTagDataSpinner.setValue(tagData)
// 		}
//
// 		const enableDebugMode_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			gm.setDebugMode(true)
// 			$('.' + DEBUG_CLASS_STRING).css('border', 'inset 2px')
// 			if (gm.isTestMode()) {
// 				$(document.body).css('background', '#bfffbf')
// 			}
// 			else {
// 				$(document.body).css('background', 'white')
// 			}
// 		}
//
// 		const disableDebugMode_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			gm.setDebugMode(false)
// 			$('.' + DEBUG_CLASS_STRING).css('border', '')
// 			if (gm.isTestMode()) {
// 				$(document.body).css('background', '#F9C270')
// 			}
// 			else {
// 				$(document.body).css('background', 'white')
// 			}
// 		}
//
// 		function executeModeComboBoxUpdateFunc_(selectedIndex) {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			const emulationModeCanvas = RGPP.System.EmulationModeCanvas.getInstance()
// 			if (selectedIndex > 0) {
// 				disableDebugMode_()
// 				gm.setEmulationMode(true)
// 				emulationModeCanvas.initialize()
// 			}
// 			else {
// 				gm.setEmulationMode(false)
// 				emulationModeCanvas.hide()
// 			}
// 		}
//
// 		function layerComboBoxUpdateFunc_(selectedIndex) {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 			mapPanelList.updateMapLayer(selectedIndex)
// 			if (mapPanelList.isEventLayer()) {
// 				RGPP.System.PaletteWindow.getInstance().closeFunc()
// 			}
// 			else {
// 				mListTabPalettePanel.openAllTabInNothingOpen()
// 				RGPP.System.PaletteWindow.getInstance().openFunc()
// 			}
// 		}
//
// 		function initDB_() {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 			const uiOperator = RGPP.System.UIOperator.getInstance()
//
// 			const readOnlyDBModalWindow = RGPP.System.ReadOnlyDataBaseModal({
// 				updateFunc: function() {}
// 			})
//
// 			const gameStateDBModalWindow = RGPP.System.GameStateDataBaseModal({
// 				updateFunc: function() {}
// 			})
//
// 			const scriptDBModalWindow = RGPP.System.ScriptDataBaseModal({
// 				updateFunc: function() {
// 					mapPanelList.updateAll()
// 				}
// 			})
//
// 			const imageDBModalWindow = RGPP.System.ImageDataBaseModal({
// 				updateFunc: function() {
// 					scriptUtil.outputMsgToConsole('update image db!')
// 					mapPanelList.updateAll()
// 				}
// 			})
//
// 			const soundDBModalWindow = RGPP.System.SoundDataBaseModal({
// 				updateFunc: function() {
// 					scriptUtil.outputMsgToConsole('update sound db!')
// 					mapPanelList.updateAll()
// 				}
// 			})
//
// 			const mapDBModalWindow = RGPP.System.MapDataBaseModal({
// 				updateFunc: function() {
// 					scriptUtil.outputMsgToConsole('update map db!')
// 					mListTabMapPanel.updateAll(-1)
// 				}
// 			})
//
// 			const mapChipDBModalWindow = RGPP.System.MapChipDataBaseModal({
// 				updateFunc: function() {
// 					scriptUtil.outputMsgToConsole('update map chip db!')
// 					const palettePanelList = RGPP.System.PalettePanelList.getInstance()
// 					palettePanelList.createPalettePanels()
// 					mapPanelList.updateAll()
// 					mListTabPalettePanel.update(-1)
// 					const pw = RGPP.System.PaletteWindow.getInstance()
// 					uiOperator.registOpener($('a[href = '#Palette']'), pw)
// 				}
// 			})
//
// 			const taskDBModalWindow = RGPP.System.TaskListModal({
// 				updateFunc: function() {
// 					RGPP.System.Schedule.getInstance().initialize()
// 				}
// 			})
//
// 			const deadlineDBModalWindow = RGPP.System.DeadlineListModal({
// 				updateFunc: function() {
// 					RGPP.System.Schedule.getInstance().initialize()
// 				}
// 			})
//
// 			// After adding body, set click function
// 			uiOperator.registOpener($('.' + READ_ONLY_DB_CLASS_STRING), readOnlyDBModalWindow)
// 			uiOperator.registOpener($('.' + GAME_STATE_DB_CLASS_STRING), gameStateDBModalWindow)
// 			uiOperator.registOpener($('.' + SCRIPT_DB_CLASS_STRING), scriptDBModalWindow)
// 			uiOperator.registOpener($('.' + IMAGE_DB_CLASS_STRING), imageDBModalWindow)
// 			uiOperator.registOpener($('.' + SOUND_DB_CLASS_STRING), soundDBModalWindow)
// 			uiOperator.registOpener($('.' + MAP_DB_CLASS_STRING), mapDBModalWindow)
// 			uiOperator.registOpener($('.' + MAP_CHIP_DB_CLASS_STRING), mapChipDBModalWindow)
// 			uiOperator.registOpener($('.' + TASK_DB_CLASS_STRING), taskDBModalWindow)
// 			uiOperator.registOpener($('.' + DEAD_LINE_DB_CLASS_STRING), deadlineDBModalWindow)
//
// 		}
//
// 		function initCommand_() {
// 			// After adding body, set click function
// 			const uiOperator = RGPP.System.UIOperator.getInstance()
//
// 			uiOperator.registOpener($('.' + NEW_MAP_CLASS_STRING), newMapModalWindow_)
// 			uiOperator.registOpener($('.' + OPEN_PROJECT_CLASS_STRING), openProjectModalWindow_)
// 			uiOperator.registClickFunction($('.' + SAVE_MAP_CLASS_STRING), saveMapFunc_)
// 			uiOperator.registClickFunction($('.' + DOWNLOAD_PROJECT_CLASS_STRING), downloadProjectFunc_)
//
// 			uiOperator.registClickFunction($('.' + UNDO_STRING), undoFunc_)
// 			uiOperator.registClickFunction($('.' + REDO_STRING), redoFunc_)
//
//
// 			uiOperator.registClickFunction($('.' + PLAY_CLASS_STRING), enableTestMode_)
// 			uiOperator.registClickFunction($('.' + STOP_CLASS_STRING), disableTestMode_)
// 			uiOperator.registClickFunction($('.' + PLAY_QUIT_CLASS_STRING), toggleTestMode_)
// 			uiOperator.registClickFunction($('.' + PAUSE_CLASS_STRING), togglePause_)
// 			uiOperator.registClickFunction($('.' + DEBUG_CLASS_STRING), toggleDebugMode_)
//
// 			uiOperator.registClickFunction($('.' + SCHEDULE_CLASS_STRING), openShedule_)
// 			uiOperator.registClickFunction($('.' + GRID_CLASS_STRING), toggleGridMode_)
//
// 			uiOperator.registOpener($('.' + BASE_SETTING_CLASS_STRING), basicSettingModalWindow_)
// 			uiOperator.registClickFunction($('.' + VERSION_STRING), showVersionFunc_)
//
// 		}
//
// 		const downloadProjectFunc_ = function() {
// 			alert('Down load project')
// 			RGPP.System.ProjectOperator.getInstance().downloadProject()
// 		}
//
// 		const openProjectModalWindow_ = RGPP.System.OpenProjectModal({
// 			updateFunc: function() {
// 				mListTabMapPanel.updateAll(-1)
// 			},
// 		})
//
// 		const undoFunc_ = function() {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 			mapPanelList.undo()
// 		}
//
// 		const saveMapFunc_ = function() {
// 			mSavePopUp.playEffect()
// 			const menuReceiver = RGPP.System.MenuReceiver()
// 			const saveCommand = RGPP.System.SaveMap(menuReceiver)
// 			RGPP.System.CommandSimpleInvoker.getInstance().invoke(saveCommand)
// 		}
//
// 		const newMapModalWindow_ = RGPP.System.NewMapModal({
// 			updateFunc: function() {
// 				const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 				const lastIndex = mapPanelList.size() - 1
// 				mListTabMapPanel.updateAll(lastIndex)
// 			}
// 		})
//
// 		const redoFunc_ = function() {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 			mapPanelList.redo()
// 		}
//
// 		const openShedule_ = function() {
// 			RGPP.System.Schedule.getInstance().switching()
// 		}
//
// 		const basicSettingModalWindow_ = RGPP.System.BasicSettingModal({
// 			updateFunc: function() {}
// 		})
//
// 		const showVersionFunc_ = function() {
// 			const menuReceiver = RGPP.System.MenuReceiver()
// 			const showVersionCommand = RGPP.System.ShowVersion(menuReceiver)
// 			RGPP.System.CommandSimpleInvoker.getInstance().invoke(showVersionCommand)
// 		}
//
// 		const toggleGridMode_ = function() {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 			const gridMode = mapPanelList.toggleGridMode()
// 			if (gridMode) {
// 				$('.' + GRID_CLASS_STRING).css('border', 'inset 2px')
// 			}
// 			else {
// 				$('.' + GRID_CLASS_STRING).css('border', '')
// 			}
// 		}
//
// 		const toggleTestMode_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			const testMode = gm.isTestMode()
// 			if (testMode) {
// 				disableTestMode_()
// 			}
// 			else {
// 				enableTestMode_()
// 			}
// 		}
//
// 		const togglePause_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			const isPause = gm.togglePause()
// 			if (isPause) {
// 				$('.' + PAUSE_CLASS_STRING).css('border', 'inset 2px')
// 			}
// 			else {
// 				$('.' + PAUSE_CLASS_STRING).css('border', '')
// 			}
// 		}
//
// 		const toggleDebugMode_ = function() {
// 			const gm = RGPP.System.GameManager.getInstance()
// 			const debugMode = gm.isDebugMode()
// 			if (debugMode) {
// 				disableDebugMode_()
// 			}
// 			else {
// 				enableDebugMode_()
// 			}
// 		}
//
//
// 		/**
// 		 * initialize draw combo box
// 		 * @method initDrawComboBox_
// 		 * @private
// 		 */
// 		const initDrawComboBox_ = function() {
// 			const mapPanelList = RGPP.System.MapPanelList.getInstance()
// 			mDrawSelectBox = RGPP.System.SelectBox({
// 				$element: $('#drawMode'),
// 				updateFunc: mapPanelList.updateDrawMode,
// 			})
// 		}
//
// 		/**
// 		 * initialize emulation mode canvas
// 		 * @method initEmulationModeCanvas_
// 		 * @private
// 		 */
// 		const initEmulationModeCanvas_ = function() {
// 			// $('#emulation-version').append(emulationModeCanvas.element())
//
// 			const emulationModeCanvas = RGPP.System.EmulationModeCanvas.getInstance()
// 			emulationModeCanvas.initialize()
// 			emulationModeCanvas.hide()
// 		}
//
// 		/**
// 		 * initialize task pop up
// 		 * @method initPopUp_
// 		 * @private
// 		 */
// 		const initPopUp_ = function() {
// 			// set css
// 			const css = RGPP.System.CssStyle.getInstance()
//
// 			// Save Map pop up
// 			mSavePopUp.appendElement('Save Complete!')
// 			mSavePopUp.setStartFadeInMs(20)
// 			mSavePopUp.setStartFadeOutMs(2000)
// 			mSavePopUp.setFadeInMs(20)
// 			mSavePopUp.setFadeOutMs(1000)
// 			css.setFixedLowerRightPosition(mSavePopUp.div())
//
// 			// Task pop up
// 			const taskPopUp = RGPP.System.TaskPopUp()
// 			css.setFixedCenterPosition(taskPopUp.div())
//
// 			taskPopUp.playEffect()
// 		}
//
// 		return that
// 	}
//
//
// 	RGPP.System.exports({
// 		name: objName,
// 		constructorFunc: constructor,
// 		module: module
// 	})
//
// })((this || 0).self || global)
