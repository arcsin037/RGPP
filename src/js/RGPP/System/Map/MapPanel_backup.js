/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MapPanel";

	/**
	 * Map panel
	 * @class MapPanel
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		var mMapCategoryID = spec.categoryID;
		var mMapID = spec.mapID;
		var mMapName = spec.name;

		var DOT_MODE = 0;
		var SQUARE_MODE = 1;
		var AREA_FILL_MODE = 2;
		var ERASER_MODE = 3;

		var mRow = spec.row;
		var mCol = spec.col;

		var mCurrentLayerNo = 0;
		var mSpecifyRangeX = 1;
		var mSpecifyRangeY = 1;
		var mSelectedX = 0;
		var mSelectedY = 0;

		var mMouseCellX = 0;
		var mMouseCellY = 0;
		var mDrawMode = DOT_MODE;

		var mCanvas = RGPP.System.OperateCanvas.getInstance().createCanvas();
		var mCtx = RGPP.System.OperateCanvas.getInstance().getContext2D(mCanvas);
		var mMapLayers = null;

		// Create Event List
		var mEventList = RGPP.System.EventList({
			col: mCol,
			row: mRow
		});

		var mMouse = null;

		var mDoubleClicked = false;

		var CHIP_WIDTH = spec.chipWidth;
		var CHIP_HEIGHT = spec.chipHeight;

		var MAP_LAYER_NUM = 3;

		var mMapLayerCommandInvokers = null;
		var mDrawMapReceiver = null;
		var mDrawDotCommand = null;
		var mFillCommand = null;
		var mDrawSquareCommand = null;
		var mDraggedSquareCommand = null;
		var mReleasedCommand = null;
		var mEraserCommand = null;

		var mGameMode = false;

		var mPad = null;

		var mDivElement = null;

		var mDebugPanel = RGPP.System.DebugPanel();

		var mSaveButton = RGPP.System.Button("Save");
		var mAddFirstFlag = false;

		// Interface
		that.categoryID = getCategoryID;
		that.id = id;
		that.mapName = mapName;
		that.row = row;
		that.column = column;

		that.getMapData = getMapData;
		that.getEvents = getEvents;

		that.updateWithJsMapData = updateWithJsMapData;
		that.paintComponent = paintComponent;
		that.drawEditSystemRect = drawEditSystemRect;

		that.setKeyBoard = setKeyBoard;
		that.savePreviousInputInfo = savePreviousInputInfo;
		that.isKeyOnRight = isKeyOnRight;
		that.isKeyOnLeft = isKeyOnLeft;
		that.isKeyOnUp = isKeyOnUp;
		that.isKeyOnDown = isKeyOnDown;
		that.isKeyTriggeredA = isKeyTriggeredA;
		that.isKeyTriggeredB = isKeyTriggeredB;
		that.isKeyTriggeredC = isKeyTriggeredC;
		that.isKeyOnC = isKeyOnC;

		that.getMouseX = getMouseX;
		that.getMouseY = getMouseY;
		that.isLeftClick = isLeftClick;
		that.isPressedLeftMouseButton = isPressedLeftMouseButton;
		that.specifyRangeX = specifyRangeX;
		that.specifyRangeY = specifyRangeY;
		that.selectedX = selectedX;
		that.selectedY = selectedY;
		that.mouseCellX = mouseCellX;
		that.mouseCellY = mouseCellY;

		that.addEventXY = addEventXY;
		that.addEvent = addEvent;
		that.searchEventArrayListIndex = searchEventArrayListIndex;
		that.searchMinEventID = searchMinEventID;
		that.removeEventXY = removeEventXY;
		that.eventDialogOpenXY = eventDialogOpenXY;

		that.fieldWidth = getFieldWidth;
		that.fieldHeight = getFieldHeight;

		that.canvas = canvas;
		that.chipWidth = chipWidth;
		that.chipHeight = chipHeight;
		that.getCtx = getCtx;
		that.setGameMode = setGameMode;

		that.resetGameMode = resetGameMode;
		that.resetInput = resetInput;
		that.resetEventParam = resetEventParam;

		that.setDrawModeByComboBox = setDrawModeByComboBox;
		that.setCurrentLayer = setCurrentLayer;
		that.setSpecifyRange = setSpecifyRange;

		that.setMapChipArray = setMapChipArray;
		that.setMapChipArraySpecificLayer = setMapChipArraySpecificLayer;

		that.currentLayerChipSetCategoryIDArray = currentLayerChipSetCategoryIDArray;
		that.currentLayerChipSetIDArray = currentLayerChipSetIDArray;
		that.currentLayerChipSetNoArray = currentLayerChipSetNoArray;
		that.currentLayerChipSetCategoryID = currentLayerChipSetCategoryID;
		that.currentLayerChipSetID = currentLayerChipSetID;
		that.currentLayerChipSetNo = currentLayerChipSetNo;
		that.createListUL = createListUL;
		that.searchEventXY = searchEventXY;
		that.getTagData = getTagData;

		that.setFocus = setFocus;

		that.clearDebugPanel = clearDebugPanel;
		that.addChangeableValueScript = addChangeableValueScript;
		that.debugPanelDiv = debugPanelDiv;
		that.setFPS = setFPS;

		that.finalize = finalize;
		that.copyPadInfo = copyPadInfo;
		that.setPadInfo = setPadInfo;

		function initialize() {
			var cssStyle = RGPP.System.CssStyle.getInstance();
			cssStyle.setRelativeCenterPosition(mCanvas);
			var canvasWidth = getFieldWidth();
			var canvasHeight = getFieldHeight();
			cssStyle.setResolution(mCanvas, canvasWidth, canvasHeight);
			cssStyle.setPixelSize(mCanvas, canvasWidth, canvasHeight);
			cssStyle.setBgColor(mCanvas, "black");

			mCtx.globalAlpha = 1.0;
			mCtx.lineWidth = 1.0;

			// Create Map Layer
			mMapLayers = [MAP_LAYER_NUM];
			// Registration Command
			mMapLayerCommandInvokers = [MAP_LAYER_NUM];
			for (var layerNo = 0; layerNo < MAP_LAYER_NUM; ++layerNo) {
				mMapLayers[layerNo] = RGPP.System.MapLayer({
					col: mCol,
					row: mRow
				});
				mMapLayerCommandInvokers[layerNo] = RGPP.System.CommandInvoker();
			}
			mDrawMapReceiver = RGPP.System.DrawMapReceiver();
			mDrawDotCommand = RGPP.System.DrawDotCommand(mDrawMapReceiver);
			mFillCommand = RGPP.System.MapFillCommand(mDrawMapReceiver);
			mDrawSquareCommand = RGPP.System.MapDrawSquareCommand(mDrawMapReceiver);
			mDraggedSquareCommand = RGPP.System.MapDraggedSquareCommand(mDrawMapReceiver);
			mReleasedCommand = RGPP.System.MapMouseReleasedCommand(mDrawMapReceiver);
			mEraserCommand = RGPP.System.EraserCommand(mDrawMapReceiver);

			mMouse = RGPP.System.Mouse({
				element: mCanvas,
				moveFunc: mouseMoveFunc,
				downFunc: mouseDownFunc,
				upFunc: mouseUpFunc,
				outFunc: mouseOutFunc,
				overFunc: mouseOverFunc,
				doubleClickFunc: mouseDoubleClickFunc
			});

			$(mCanvas).hide();
		}

		function finalize() {
			mEventList.finalize();
			clearDebugPanel();
		}

		function setKeyBoard(element) {
			mDivElement = element;
			setFocus();
			mPad = RGPP.System.Pad({
				element: mDivElement,
				keyDownFunc: keyDownFunc,
				keyUpFunc: keyUpFunc
			});
		}

		function setFocus() {
			mDivElement.contentEditable = true;
			mDivElement.focus();
		}

		function keyDownFunc(e) {
			if (mPad.isKeyTriggeredCtrlZ()) {
				undo();
			}

			if (mPad.isKeyTriggeredCtrlY()) {
				redo();
			}

			if (mCurrentLayerNo === MAP_LAYER_NUM) {
				if (mPad.isKeyTriggeredBackSpaceOrDeleteKey()) {
					RGPP.System.EventManager.getInstance().deleteEvent();
				}
				if (mPad.isKeyTriggeredCtrlX()) {
					RGPP.System.EventManager.getInstance().cutEvent();
				}
				if (mPad.isKeyTriggeredCtrlC()) {
					RGPP.System.EventManager.getInstance().copyEvent();
				}
				if (mPad.isKeyTriggeredCtrlV()) {
					RGPP.System.EventManager.getInstance().pasteEvent();
				}
			}


			if (mPad.isKeyTriggeredCtrlS()) {
				RGPP.System.MapPanelList.getInstance().saveCurrentMapPanel();
			}

		}

		function keyUpFunc(e) {}

		function undo() {
			scriptUtil.outputMsgToConsole("undo!");
			if (mCurrentLayerNo < MAP_LAYER_NUM) {
				mMapLayerCommandInvokers[mCurrentLayerNo].undo();
			}
			else {
				RGPP.System.EventManager.getInstance().undoEvent();
			}
		}

		function redo() {
			scriptUtil.outputMsgToConsole("redo!");
			if (mCurrentLayerNo < MAP_LAYER_NUM) {
				mMapLayerCommandInvokers[mCurrentLayerNo].redo();
			}
			else {
				RGPP.System.EventManager.getInstance().redoEvent();
			}
		}

		function updateWithJsMapData(mapData) {
			scriptUtil.assert(mapData !== undefined && mapData !== null, "map data is " + mapData);

			if (mapData === undefined) {
				return;
			}

			if (mapData === null) {
				return;
			}

			mMapCategoryID = mapData.categoryID;
			mMapID = mapData.mapID;
			var prevRow = mapData.row;
			var prevCol = mapData.col;

			for (var k = 0; k < MAP_LAYER_NUM; ++k) {
				mMapLayers[k] = RGPP.System.MapLayer({
					col: mCol,
					row: mRow
				});

				for (var j = 0; j < prevRow; ++j) {
					for (var i = 0; i < prevCol; ++i) {
						var index = k * prevRow * prevCol + j * prevCol + i;
						var chipSetCategoryID = mapData.chipSetCategoryIDs[index];
						var chipSetID = mapData.chipSetDataIDs[index];
						var chipSetNo = mapData.chipSetNos[index];
						mMapLayers[k].setData(i, j, chipSetCategoryID, chipSetID, chipSetNo);
					}
				}
			}

			// Load Event
			mEventList.finalize();
			var eventNum = mapData.eventNum;
			var eventStateNamesArray = mapData.eventStateNames;
			var eventScriptArray = mapData.eventScripts;
			var eventInitChangeableValueArray = mapData.eventInitChangeableValues;
			for (var i = 0; i < eventNum; ++i) {
				var eventID = mapData.eventIDs[i];
				var x = mapData.eventPosX[i];
				var y = mapData.eventPosY[i];
				var eventName = mapData.eventNames[i];

				var event = RGPP.System.EventBase({
					id: eventID,
					categoryID: mMapCategoryID,
					mapID: mMapID,
					x: x,
					y: y,
					name: eventName
				});
				mEventList.addEvent(event);
				event.updateStateWithArray(eventStateNamesArray[i], eventScriptArray[i], eventInitChangeableValueArray[i]);
			}

		}

		function getMapData() {
			var eventNum = mEventList.size(); // Event Number

			var mapData = {
				categoryID: mMapCategoryID,
				mapID: mMapID,
				row: mRow,
				col: mCol,
				chipSetCategoryIDs: [],
				chipSetDataIDs: [],
				chipSetNos: [],
				eventNum: eventNum,
				eventIDs: [],
				eventPosX: [],
				eventPosY: [],
				eventNames: [],
				eventStateNames: null,
				eventScripts: null,
				eventInitChangeableValues: null,
			};

			var chipSetCategoryIDArray = [];
			var chipSetDataIDArray = [];
			var chipSetNoArray = [];

			// Save Map Chip Data
			for (var k = 0; k < MAP_LAYER_NUM; ++k) {
				for (var y = 0; y < mRow; ++y) {
					for (var x = 0; x < mCol; ++x) {
						var index = k * mRow * mCol + y * mCol + x;
						chipSetCategoryIDArray[index] = mMapLayers[k].chipSetCategoryID(x, y);
						chipSetDataIDArray[index] = mMapLayers[k].chipSetID(x, y);
						chipSetNoArray[index] = mMapLayers[k].chipSetNo(x, y);
					}
				}
			}

			var eventIDsArray = [];
			var eventPosXArray = [];
			var eventPosYArray = [];
			var eventNamesArray = [];
			var eventStateNameArray = [];
			var eventScriptArray = [];
			var eventInitChangeableValueArray = [];

			var events = mEventList.getEvents();
			var eventSize = mEventList.size();
			for (var eventIndex = 0; eventIndex < eventSize; ++eventIndex) {
				var event = events[eventIndex];
				eventIDsArray[eventIndex] = event.id();
				eventPosXArray[eventIndex] = event.getInitX();
				eventPosYArray[eventIndex] = event.getInitY();
				eventNamesArray[eventIndex] = event.getName();
				var stateSize = event.stateSize();
				eventStateNameArray[eventIndex] = [];
				eventScriptArray[eventIndex] = [];
				eventInitChangeableValueArray[eventIndex] = [];
				event.saveInitValuesFromChangeableValue();
				for (var stateIndex = 0; stateIndex < stateSize; ++stateIndex) {
					eventStateNameArray[eventIndex][stateIndex] = event.stateName(stateIndex);
					var scriptNum = event.scriptNum(stateIndex);
					eventScriptArray[eventIndex][stateIndex] = [];
					eventInitChangeableValueArray[eventIndex][stateIndex] = [];
					for (var scriptIndex = 0; scriptIndex < scriptNum; ++scriptIndex) {

						eventScriptArray[eventIndex][stateIndex][scriptIndex] = event.scriptIDSet(stateIndex, scriptIndex);
						var changeableValueNum = event.changeableValueNum(stateIndex, scriptIndex);
						eventInitChangeableValueArray[eventIndex][stateIndex][scriptIndex] = [];
						for (var cIndex = 0; cIndex < changeableValueNum; cIndex += 1) {
							var changeableInitValue = event.changeableInitValue(stateIndex, scriptIndex, cIndex);
							eventInitChangeableValueArray[eventIndex][stateIndex][scriptIndex][cIndex] = changeableInitValue;
						}
					}
				}
			}

			mapData.chipSetCategoryIDs = chipSetCategoryIDArray;
			mapData.chipSetDataIDs = chipSetDataIDArray;
			mapData.chipSetNos = chipSetNoArray;
			mapData.eventIDs = eventIDsArray;
			mapData.eventPosX = eventPosXArray;
			mapData.eventPosY = eventPosYArray;
			mapData.eventNames = eventNamesArray;
			mapData.eventStateNames = eventStateNameArray;
			mapData.eventScripts = eventScriptArray;
			mapData.eventInitChangeableValues = eventInitChangeableValueArray;

			return mapData;
		}

		function mouseMoveFunc(e) {
			update();
			mousePaintComponent();
		}

		function mouseDownFunc(e) {
			if (mMouse.isMouseOver()) {
				mSelectedX = Math.floor(mMouse.getX() / CHIP_WIDTH);
				mSelectedY = Math.floor(mMouse.getY() / CHIP_HEIGHT);
			}
			update();
			mousePaintComponent();
		}

		function mouseUpFunc(e) {
			if (mCurrentLayerNo !== MAP_LAYER_NUM) {
				switch (mDrawMode) {
					case DOT_MODE:
						mMapLayerCommandInvokers[mCurrentLayerNo].invoke(mReleasedCommand);
						mousePaintComponent();
						break;
					case SQUARE_MODE:
						mMapLayerCommandInvokers[mCurrentLayerNo].invoke(mDrawSquareCommand);
						mousePaintComponent();
						break;
				}
			}

		}

		function mouseOutFunc(e) {
			mousePaintComponent();
		}

		function mouseOverFunc(e) {
			if (mMouse.isDragged()) {
				if (mCurrentLayerNo !== MAP_LAYER_NUM) {
					mSelectedX = Math.floor(mMouse.getX() / CHIP_WIDTH);
					mSelectedY = Math.floor(mMouse.getY() / CHIP_HEIGHT);
				}
			}
			else {
				mSpecifyRangeX = 1;
				mSpecifyRangeY = 1;
			}
			update();
			mousePaintComponent();
		}

		function mouseDoubleClickFunc(e) {
			mDoubleClicked = true;
			update();
			mousePaintComponent();
			mDoubleClicked = false;
		}

		function update() {
			mMouseCellX = Math.floor(mMouse.getX() / CHIP_WIDTH);
			mMouseCellY = Math.floor(mMouse.getY() / CHIP_HEIGHT);

			if (mCurrentLayerNo !== MAP_LAYER_NUM) {
				if (mMouse.isDragged()) {
					switch (mDrawMode) {
						case DOT_MODE:
							RGPP.System.CommandSimpleInvoker.getInstance().invoke(mDrawDotCommand);
							break;
						case SQUARE_MODE:
							mMapLayerCommandInvokers[mCurrentLayerNo].invoke(mDraggedSquareCommand);
							break;
						case AREA_FILL_MODE:
							mMapLayerCommandInvokers[mCurrentLayerNo].invoke(mFillCommand);
							break;
						case ERASER_MODE:
							RGPP.System.CommandSimpleInvoker.getInstance().invoke(mEraserCommand);
							break;
					}
				}
			}
			else {
				if (mDoubleClicked === true) {
					RGPP.System.EventManager.getInstance().operateEvent();
				}
			}
		}

		function savePreviousInputInfo() {
			mPad.savePrevious();
			mMouse.savePreviousButton();
		}

		function paintComponent() {
			RGPP.System.OperateCanvas.getInstance().clear(mCtx);

			drawMapLayer();
		}

		function drawGrid() {
			var gridMode = RGPP.System.MapPanelList.getInstance().gridMode();
			if (gridMode) {
				var fd = RGPP.System.FundamentalDrawing.getInstance();
				fd.setColor(mCtx, 148, 248, 248, 0.7);
				var fieldWidth = getFieldWidth();
				var fieldHeight = getFieldHeight();
				for (var x = 0; x < fieldWidth; x += CHIP_WIDTH) {
					fd.drawLine(mCtx, x, 0, x, fieldHeight);
				}
				for (var y = 0; y < fieldHeight; y += CHIP_HEIGHT) {
					fd.drawLine(mCtx, 0, y, fieldWidth, y);
				}
			}
		}

		function drawEditSystemRect() {
			drawEventLayer();
			drawGrid();
			if (mCurrentLayerNo === MAP_LAYER_NUM) { //Event Layer
				// draw Green Rectangle in Selected Area
				drawCellRect(mSelectedX, mSelectedY, 0, 255, 0, 1);
			}
			else {
				// draw mapchip on the mouse
				if (mMouse.isMouseOver() === true) {
					drawMapLayerRect();
				}
			}
		}

		function mousePaintComponent() {
			if (mGameMode) {
				return;
			}
			paintComponent();
			drawEditSystemRect();
		}

		function drawMapLayer() {
			for (var layerNo = 0; layerNo < MAP_LAYER_NUM; ++layerNo) {
				if (layerNo !== mCurrentLayerNo && mCurrentLayerNo < MAP_LAYER_NUM) {
					mCtx.globalAlpha = 0.5;
				}
				else {
					mCtx.globalAlpha = 1.0;
				}

				var pList = RGPP.System.PalettePanelList.getInstance();
				for (var y = 0; y < mRow; ++y) {
					for (var x = 0; x < mCol; ++x) {
						var chipSetCategoryID = mMapLayers[layerNo].chipSetCategoryID(x, y);
						var chipSetDataID = mMapLayers[layerNo].chipSetID(x, y);
						var chipSetNo = mMapLayers[layerNo].chipSetNo(x, y);
						if (chipSetCategoryID >= 0 && chipSetDataID >= 0 && chipSetNo >= 0) {
							var palettePanel = pList.getPanelFromID(chipSetCategoryID, chipSetDataID);
							if (palettePanel !== null) {
								palettePanel.drawChipImage(
									mCtx,
									x * CHIP_WIDTH,
									y * CHIP_HEIGHT,
									chipSetNo,
									CHIP_WIDTH,
									CHIP_HEIGHT);
							}
						}
					}
				}
			}
		}

		function drawEventLayer() {

			var events = mEventList.getEvents();
			var eventSize = mEventList.size();
			mCtx.globalAlpha = 1.0; // Event Layer
			for (var eventIndex = 0; eventIndex < eventSize; ++eventIndex) {
				var event = events[eventIndex];
				var x = event.getInitX();
				var y = event.getInitY();

				drawCellRect2(x, y, 255, 0, 0, 1);
			}
		}

		function drawMapLayerRect() {
			var currentPalettePanel = RGPP.System.PalettePanelList.getInstance().currentPalettePanel();
			if (currentPalettePanel === null) {
				return;
			}
			mCtx.globalAlpha = 0.5;
			var paletteRangeX = currentPalettePanel.specifyRangeX();
			var paletteRangeY = currentPalettePanel.specifyRangeY();

			var x = mMouseCellX;
			var y = mMouseCellY;
			if (paletteRangeX < 0) {
				x = x + paletteRangeX + 1;
			}

			if (paletteRangeY < 0) {
				y = y + paletteRangeY + 1;
			}

			// set absolute Palette's Specify Range
			var absPaletteRangeX = Math.abs(paletteRangeX);
			var absPaletteRangeY = Math.abs(paletteRangeY);

			switch (mDrawMode) {
				case DOT_MODE:
				case AREA_FILL_MODE:
					currentPalettePanel.drawSelectedImage(mCtx, x * CHIP_WIDTH, y * CHIP_HEIGHT, CHIP_WIDTH, CHIP_HEIGHT);
					break;
				case SQUARE_MODE:
					var areaX = 0;
					var areaY = 0;
					if (mSpecifyRangeX === 1 && mSpecifyRangeY === 1) {
						// Not Drag
						areaX = 1;
						areaY = 1;
					}
					else {
						// Drag
						var tmpX = mSelectedX;
						var tmpY = mSelectedY;
						if (paletteRangeX < 0) {
							tmpX = tmpX + paletteRangeX + 1;
						}
						if (paletteRangeY < 0) {
							tmpY = tmpY + paletteRangeY + 1;
						}

						x = tmpX;
						y = tmpY;
						// set absolute Map Specify Range
						var absMapSpecifyRangeX = Math.abs(mSpecifyRangeX);
						var absMapSpecifyRangeY = Math.abs(mSpecifyRangeY);
						// if it is different from Map Specify Range's sign and
						// Palette Specify Range's sign,
						// the values is modified
						if (mSpecifyRangeX < 0 && paletteRangeX > 0) {
							absMapSpecifyRangeX += paletteRangeX - 1;
							paletteRangeX = -paletteRangeX;
						}
						else if (mSpecifyRangeX > 1 && paletteRangeX < 0) {
							absMapSpecifyRangeX -= paletteRangeX + 1;
							paletteRangeX = -paletteRangeX;
						}
						if (mSpecifyRangeY < 0 && paletteRangeY > 0) {
							absMapSpecifyRangeY += paletteRangeY - 1;
							paletteRangeY = -paletteRangeY;
						}
						else if (mSpecifyRangeY > 1 && paletteRangeY < 0) {
							absMapSpecifyRangeY -= paletteRangeY + 1;
							paletteRangeY = -paletteRangeY;
						}
						// set draw area
						areaX = Math.floor(absMapSpecifyRangeX / absPaletteRangeX);
						areaY = Math.floor(absMapSpecifyRangeY / absPaletteRangeY);
						// area is not 0.
						if (areaX === 0) {
							areaX = 1;
						}
						if (areaY === 0) {
							areaY = 1;
						}
					}
					// draw Rectangle Images
					for (var l = 0; l < areaY; ++l) {
						var indexY = l * paletteRangeY + y;
						for (var k = 0; k < areaX; ++k) {
							var indexX = k * paletteRangeX + x;
							currentPalettePanel.drawSelectedImage(mCtx, indexX * CHIP_WIDTH, indexY * CHIP_HEIGHT, CHIP_WIDTH, CHIP_HEIGHT);
						}
					}
					break;
				default:
					break;
			} // End of Switch
			if (mSpecifyRangeX !== 1 || mSpecifyRangeY !== 1) {
				// if dragging, draw Rectangle
				drawYellowRect();
			}
			mCtx.globalAlpha = 1.0;


		}

		function drawCellRect(x, y, r, g, b, a) {

			var fundDrawing = RGPP.System.FundamentalDrawing.getInstance();
			fundDrawing.setColor(mCtx, r, g, b, a);
			fundDrawing.drawRect(mCtx,
				x * CHIP_WIDTH - 1, y * CHIP_HEIGHT - 1, CHIP_WIDTH + 2, CHIP_HEIGHT + 2, 2);
		}

		var drawCellRect2 = function(x, y, r, g, b, a) {
			var fundDrawing = RGPP.System.FundamentalDrawing.getInstance();
			fundDrawing.setColor(mCtx, r, g, b, a);
			fundDrawing.drawRect(mCtx,
				x * CHIP_WIDTH, y * CHIP_HEIGHT, CHIP_WIDTH, CHIP_HEIGHT, 2);
		};

		function drawYellowRect() {
			var rectX = mSelectedX;
			if (mSpecifyRangeX < 0) {
				rectX += mSpecifyRangeX + 1;
			}
			rectX *= CHIP_WIDTH;
			var rectY = mSelectedY;
			if (mSpecifyRangeY < 0) {
				rectY += mSpecifyRangeY + 1;
			}
			rectY *= CHIP_HEIGHT;
			var absMapSpecifyRangeX = Math.abs(mSpecifyRangeX);
			var absMapSpecifyRangeY = Math.abs(mSpecifyRangeY);
			var fieldWidth = getFieldWidth();
			var fieldHeight = getFieldHeight();

			if (0 <= rectX && rectX < fieldWidth && 0 <= rectY && rectY < fieldHeight) {
				var fd = RGPP.System.FundamentalDrawing.getInstance();
				var rectWidth = CHIP_WIDTH * absMapSpecifyRangeX;
				var rectHeight = CHIP_HEIGHT * absMapSpecifyRangeY;
				// Yellow
				fd.setColor(mCtx, 255, 255, 0, 1);
				fd.drawRect(mCtx, rectX, rectY, rectWidth, rectHeight, 2);
			}
		}

		function setDrawModeByComboBox(selectedIndex) {
			switch (selectedIndex) {
				case 0:
					setDrawMode(DOT_MODE);
					break;
				case 1:
					setDrawMode(SQUARE_MODE);
					break;
				case 2:
					setDrawMode(AREA_FILL_MODE);
					break;
				case 3:
					setDrawMode(ERASER_MODE);
					break;
			}
		}

		function setCurrentLayer(currentLayerNo) {
			if (mCurrentLayerNo !== currentLayerNo) {
				mCurrentLayerNo = currentLayerNo;
				mSelectedX = -1;
				mSelectedY = -1;
			}
			paintComponent();
			drawEditSystemRect();
		}

		function setSpecifyRange(specifyRangeX, specifyRangeY) {
			mSpecifyRangeX = specifyRangeX;
			mSpecifyRangeY = specifyRangeY;
		}

		function setDrawMode(mode) {
			mDrawMode = mode;
		}

		function setMapChipArray(x, y, chipSetCategoryIDArray, chipSetIDArray, chipSetNoArray) {
			setMapChipArraySpecificLayer(mCurrentLayerNo, x, y, chipSetCategoryIDArray, chipSetIDArray, chipSetNoArray);
		}

		function setMapChipArraySpecificLayer(layerNo, x, y, chipSetCategoryIDArray, chipSetIDArray, chipSetNoArray) {
			for (var i = 0, n = chipSetNoArray.length; i < n; ++i) {
				for (var j = 0, m = chipSetNoArray[i].length; j < m; ++j) {
					var dstX = j + x;
					var dstY = i + y;
					mMapLayers[layerNo].setData(
						dstX,
						dstY,
						chipSetCategoryIDArray[i][j],
						chipSetIDArray[i][j],
						chipSetNoArray[i][j]);
				}
			}
		}

		function currentLayerChipSetCategoryIDArray(x, y, rangeX, rangeY) {
			return mMapLayers[mCurrentLayerNo].getChipSetCategoryIDArray(x, y, rangeX, rangeY);
		}

		function currentLayerChipSetIDArray(x, y, rangeX, rangeY) {
			return mMapLayers[mCurrentLayerNo].getChipSetIDArray(x, y, rangeX, rangeY);
		}

		function currentLayerChipSetNoArray(x, y, rangeX, rangeY) {
			return mMapLayers[mCurrentLayerNo].getChipSetNoArray(x, y, rangeX, rangeY);
		}

		function currentLayerChipSetCategoryID(x, y) {
			return mMapLayers[mCurrentLayerNo].chipSetCategoryID(x, y);
		}

		function currentLayerChipSetNo(x, y) {
			return mMapLayers[mCurrentLayerNo].chipSetNo(x, y);
		}

		function currentLayerChipSetID(x, y) {
			return mMapLayers[mCurrentLayerNo].chipSetID(x, y);
		}

		function createListUL() {
			return mEventList.createListUL(mMapCategoryID, mMapID);
		}

		function searchEventXY(x, y) {
			return mEventList.searchEventXY(x, y);
		}

		function addEventXY(x, y) {
			var retEvent = mEventList.addEventXY(mMapCategoryID, mMapID, x, y);
			if (mGameMode) {
				RGPP.System.EventObjManager.getInstance().createEventObj({
					eventBase: retEvent
				});
			}
			return retEvent;
		}

		function addEvent(event) {
			var retEvent = mEventList.addEvent(event);
			if (mGameMode) {
				RGPP.System.EventObjManager.getInstance().createEventObj({
					eventBase: retEvent
				});
			}
			return retEvent;
		}

		function searchEventArrayListIndex(x, y) {
			return mEventList.searchEventArrayListIndex(x, y);
		}

		function searchMinEventID() {
			return mEventList.searchMinEventID();
		}

		function removeEventXY(x, y) {
			if (mGameMode) {
				RGPP.System.EventObjManager.getInstance().removeEventObjXY(mMapCategoryID, mMapID, x, y);
			}
			return mEventList.removeEventXY(mMapCategoryID, mMapID, x, y);
		}

		function eventDialogOpenXY(x, y) {
			mEventList.eventDialogOpenXY(mMapCategoryID, mMapID, x, y);
		}

		function canvas() {
			return mCanvas;
		}

		function specifyRangeX() {
			return mSpecifyRangeX;
		}

		function specifyRangeY() {
			return mSpecifyRangeY;
		}

		function selectedX() {
			return mSelectedX;
		}

		function selectedY() {
			return mSelectedY;
		}

		function mouseCellX() {
			return mMouseCellX;
		}

		function mouseCellY() {
			return mMouseCellY;
		}

		function column() {
			return mCol;
		}

		function row() {
			return mRow;
		}

		function mapName() {
			return mMapName;
		}

		function getCategoryID() {
			return mMapCategoryID;
		}

		function id() {
			return mMapID;
		}

		function isKeyOnRight() {
			return mPad.isKeyOnRight();
		}

		function isKeyOnLeft() {
			return mPad.isKeyOnLeft();
		}

		function isKeyOnUp() {
			return mPad.isKeyOnUp();
		}

		function isKeyOnDown() {
			return mPad.isKeyOnDown();
		}

		function isKeyTriggeredA() {
			return mPad.isKeyTriggeredA();
		}

		function isKeyTriggeredB() {
			return mPad.isKeyTriggeredB();
		}

		function isKeyTriggeredC() {
			return mPad.isKeyTriggeredC();
		}

		function isKeyOnC() {
			return mPad.isKeyOnC();
		}

		function getMouseX() {
			return mMouse.getX();
		}

		function getMouseY() {
			return mMouse.getY();
		}

		function isLeftClick() {
			return mMouse.isLeftClick();
		}

		function isPressedLeftMouseButton() {
			return mMouse.isPressedLeftButton();
		}

		function getTagData(x, y) {
			var tagData = -1;
			for (var layerNo = 0; layerNo < MAP_LAYER_NUM; ++layerNo) {
				var chipSetCategoryID = mMapLayers[layerNo].chipSetCategoryID(x, y);
				var chipSetDataID = mMapLayers[layerNo].chipSetID(x, y);
				var chipSetNo = mMapLayers[layerNo].chipSetNo(x, y);
				var md = RGPP.System.MapChipDataBase.getInstance();
				if (chipSetCategoryID >= 0 && chipSetDataID >= 0 && chipSetNo >= 0) {
					var tmp = md.getTagData(chipSetCategoryID, chipSetDataID, chipSetNo);
					if (tmp < 0) {
						tmp = 0;
					}
					if (tmp > tagData) {
						tagData = tmp;
					}
				}
			}
			return tagData;
		}

		function getFieldWidth() {
			return mCol * CHIP_WIDTH;
		}

		function getFieldHeight() {
			return mRow * CHIP_HEIGHT;
		}

		function chipWidth() {
			return CHIP_WIDTH;
		}

		function chipHeight() {
			return CHIP_HEIGHT;
		}

		function getCtx() {
			return mCtx;
		}

		function setGameMode() {
			paintComponent();
			drawEditSystemRect();
			mGameMode = true;
		}

		function resetGameMode() {
			mGameMode = false;
			resetInput();
			paintComponent();
			drawEditSystemRect();
		}

		function resetInput() {
			mPad.initialize();
			mMouse.initialize();
		}

		function copyPadInfo() {
			return mPad.copyPadInfo();
		}

		function setPadInfo(padInfo) {
			mPad.setPadInfo(padInfo);
		}


		function resetEventParam() {
			mEventList.resetParam();
		}

		function getEvents() {
			return mEventList.getEvents();
		}

		var saveScriptChangeableValue = function() {
			alert("saveScriptChangeableValue");
			RGPP.System.EventObjManager.getInstance().saveChangeableValuesPerScript();
			RGPP.System.ScriptDataBase.getInstance().saveAllChangeableInitValues();
		};

		function clearDebugPanel() {
			mDebugPanel.clear();
			mAddFirstFlag = false;
		}

		function addChangeableValueScript(changeableValue) {
			if (!mAddFirstFlag) {
				$(mDebugPanel.div()).append(mSaveButton.element());

				var uiOperator = RGPP.System.UIOperator.getInstance();
				uiOperator.registClickFunction($(mSaveButton.element()), saveScriptChangeableValue);

				mAddFirstFlag = true;
			}
			mDebugPanel.add(changeableValue);
		}

		function setFPS(fps) {
			mDebugPanel.setFPS(fps);
		}

		function debugPanelDiv() {
			return mDebugPanel.div();
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