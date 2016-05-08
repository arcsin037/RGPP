(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "DrawMapReceiver";

	var constructor = function(spec) {
		var that = {};

		var mMapDrawParameterList = RGPP.System.List();

		// Interface
		that.drawDot = drawDot;
		that.eraser = eraser;
		that.drawSquare = drawSquare;
		that.draggedSquare = draggedSquare;
		that.fill = fill;
		that.mapDrawParameterList = mapDrawParameterList;
		that.produceDrawParameter = produceDrawParameter;
		that.undo = undo;
		that.redo = redo;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		function drawDot() {
			var mapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			var palettePanelList = RGPP.System.PalettePanelList.getInstance();
			var palettePanel = palettePanelList.currentPalettePanel();
			if (palettePanel === null) {
				return;
			}
			var currentPalettePanelCategoryID = palettePanelList.currentPanelCategoryID();
			var currentPalettePanelDataID = palettePanelList.currentPanelDataID();
			var chipSetNoArray = palettePanel.selectedMapChipNoArray();

			var mouseCellX = mapPanel.mouseCellX();
			var mouseCellY = mapPanel.mouseCellY();

			var rangeX = palettePanel.specifyRangeX();
			var rangeY = palettePanel.specifyRangeY();

			if (rangeX < 0) {
				mouseCellX = mouseCellX + rangeX + 1;
			}

			if (rangeY < 0) {
				mouseCellY = mouseCellY + rangeY + 1;
			}

			var absPaletteRangeX = Math.abs(rangeX);
			var absPaletteRangeY = Math.abs(rangeY);

			var palettePanelCategoryIDArray = [absPaletteRangeY];
			var palettePanelDataIDArray = [absPaletteRangeY];
			for (var i = 0; i < absPaletteRangeY; ++i) {
				palettePanelCategoryIDArray[i] = [absPaletteRangeX];
				palettePanelDataIDArray[i] = [absPaletteRangeX];
				for (var j = 0; j < absPaletteRangeX; ++j) {
					palettePanelCategoryIDArray[i][j] = currentPalettePanelCategoryID;
					palettePanelDataIDArray[i][j] = currentPalettePanelDataID;
				}
			}

			setMapChipArray(mouseCellX, mouseCellY, palettePanelCategoryIDArray, palettePanelDataIDArray, chipSetNoArray);
		}

		function eraser() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			var mouseCellX = currentMapPanel.mouseCellX();
			var mouseCellY = currentMapPanel.mouseCellY();

			setMapChip(mouseCellX, mouseCellY, -1, -1, -1);
		}

		function drawSquare() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			var palettePanelList = RGPP.System.PalettePanelList.getInstance();
			var palettePanel = palettePanelList.currentPalettePanel();

			if (palettePanel === null) {
				return;
			}

			var specifyRangeX = currentMapPanel.specifyRangeX();
			var specifyRangeY = currentMapPanel.specifyRangeY();
			var paletteRangeX = palettePanel.specifyRangeX();
			var paletteRangeY = palettePanel.specifyRangeY();

			var tmpX = currentMapPanel.selectedX();
			var tmpY = currentMapPanel.selectedY();

			var absPaletteRangeX = Math.abs(paletteRangeX);
			var absPaletteRangeY = Math.abs(paletteRangeY);

			if (paletteRangeX < 0) {
				tmpX = tmpX + paletteRangeX + 1;
			}
			if (paletteRangeY < 0) {
				tmpY = tmpY + paletteRangeY + 1;
			}
			var x = tmpX;
			var y = tmpY;
			// set absolute Map Specify Range
			var absMapSpecifyRangeX = Math.abs(specifyRangeX);
			var absMapSpecifyRangeY = Math.abs(specifyRangeY);
			// if it is different from Map Specify Range's sign and Palette's
			// Specify Range's sign,
			// it is modified
			if (specifyRangeX < 0 && paletteRangeX > 0) {
				absMapSpecifyRangeX += paletteRangeX - 1;
				paletteRangeX = -paletteRangeX;
			}
			else if (specifyRangeX > 1 && paletteRangeX < 0) {
				absMapSpecifyRangeX -= paletteRangeX + 1;
				paletteRangeX = -paletteRangeX;
			}
			if (specifyRangeY < 0 && paletteRangeY > 0) {
				absMapSpecifyRangeY += paletteRangeY - 1;
				paletteRangeY = -paletteRangeY;
			}
			else if (specifyRangeY > 1 && paletteRangeY < 0) {
				absMapSpecifyRangeY -= paletteRangeY + 1;
				paletteRangeY = -paletteRangeY;
			}

			// set draw area
			var areaX = Math.floor(absMapSpecifyRangeX / absPaletteRangeX);
			var areaY = Math.floor(absMapSpecifyRangeY / absPaletteRangeY);

			// area is not 0.
			if (areaX == 0) {
				areaX = 1;
			}
			if (areaY == 0) {
				areaY = 1;
			}

			// draw Rectangle Images
			var selectChipNoArray = palettePanel.selectedMapChipNoArray();
			var currentPalettePanelCategoryID = palettePanelList.currentPanelCategoryID();
			var currentPalettePanelDataID = palettePanelList.currentPanelDataID();
			for (var l = 0; l < areaY; ++l) {
				for (var k = 0; k < areaX; ++k) {
					for (var j = 0; j < absPaletteRangeY; ++j) {
						for (var i = 0; i < absPaletteRangeX; ++i) {
							var selectChipNo = selectChipNoArray[j][i];
							setMapChip(
								(k * paletteRangeX + x + i), (l * paletteRangeY + y + j),
								currentPalettePanelCategoryID,
								currentPalettePanelDataID,
								selectChipNo);
						}
					}
				}
			}
			// initialize box
			currentMapPanel.setSpecifyRange(1, 1);
		}

		function draggedSquare() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}
			var selectedX = currentMapPanel.selectedX();
			var selectedY = currentMapPanel.selectedY();

			var x = currentMapPanel.mouseCellX();
			var y = currentMapPanel.mouseCellY();

			var diffX = x - selectedX;
			var diffY = y - selectedY;
			var tmpSx, tmpSy;
			if (diffX < 0) {
				tmpSx = diffX - 1;
			}
			else {
				tmpSx = diffX + 1;
			}
			if (diffY < 0) {
				tmpSy = diffY - 1;
			}
			else {
				tmpSy = diffY + 1;
			}
			currentMapPanel.setSpecifyRange(tmpSx, tmpSy);

		}

		function fill() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}
			var palettePanel = RGPP.System.PalettePanelList.getInstance().currentPalettePanel();
			if (palettePanel === null) {
				return;
			}
			var selectedX = currentMapPanel.selectedX();
			var selectedY = currentMapPanel.selectedY();

			// palette's X specify range
			var rangeX = palettePanel.specifyRangeX();
			var offsetX = 0;
			if (rangeX < 0) {
				offsetX = Math.abs(rangeY) - 1;
			}

			// palette's Y specify range
			var yIndex = 0;
			var rangeY = palettePanel.specifyRangeY();
			if (rangeY < 0) {
				yIndex = Math.abs(rangeY) - 1;
			}

			var selectedChipSetCategoryIDArray = currentMapPanel.currentLayerChipSetCategoryIDArray(
				selectedX, selectedY,
				palettePanel.specifyRangeX(), palettePanel.specifyRangeY());
			var selectedChipSetIDArray = currentMapPanel.currentLayerChipSetIDArray(
				selectedX, selectedY, palettePanel.specifyRangeX(), palettePanel.specifyRangeY());
			var selectedChipSetNoArray = currentMapPanel.currentLayerChipSetNoArray(
				selectedX, selectedY,
				palettePanel.specifyRangeX(), palettePanel.specifyRangeY());

			filling(selectedX, selectedY, offsetX, yIndex,
				selectedChipSetCategoryIDArray[yIndex][offsetX],
				selectedChipSetIDArray[yIndex][offsetX],
				selectedChipSetNoArray[yIndex][offsetX]);
		}

		var filling = function(ax, ay, aOffsetX, yIndex, chipSetCategoryID, chipSetDataID, chipSetNo) {
			var x = ax;
			var y = ay;
			var offsetX = aOffsetX;
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			var col = currentMapPanel.column();
			var row = currentMapPanel.row();

			var palettePanel = RGPP.System.PalettePanelList.getInstance().currentPalettePanel();
			if (palettePanel === null) {
				return;
			}

			if (x < 0 || x >= col || y < 0 || y >= row) {
				return;
			}
			// If Map Chip Array selected by palettePanel are same as Map Number
			// you want to change,
			// this method is stopped
			var pList = RGPP.System.PalettePanelList.getInstance();
			var currentPalettePanelCategoryID = pList.currentPanelCategoryID();
			var currentPalettePanelDataID = pList.currentPanelDataID();
			var selectedChipSetNoArray = palettePanel.selectedMapChipNoArray();

			if (selectedChipSetNoArray.length === 1 && selectedChipSetNoArray[0].length === 1) {
				if (chipSetNo === selectedChipSetNoArray[yIndex][offsetX]) {
					if (currentPalettePanelDataID === currentMapPanel.currentLayerChipSetID(x, y)) {
						if (currentPalettePanelCategoryID === currentMapPanel.currentLayerChipSetCategoryID(x, y)) {
							scriptUtil.outputMsgToConsole("onaji!");
							return;
						}
					}
				}
			}

			if (isDifferentFromCurrentMap(x, y, chipSetCategoryID, chipSetDataID, chipSetNo)) {
				scriptUtil.outputMsgToConsole("return!");
				return;
			}

			// palette's Specify RangeX
			var paletteRangeX = palettePanel.specifyRangeX();
			var paletteRangeY = palettePanel.specifyRangeY();

			var absPaletteRangeX = Math.abs(paletteRangeX);
			var absPaletteRangeY = Math.abs(paletteRangeY);

			var leftX = x;
			var rightX = x;
			var tmpOffsetX = offsetX;
			// search left X
			for (leftX = x; leftX >= 0; leftX -= 1) {
				if (isDifferentFromCurrentMap(leftX, y, chipSetCategoryID, chipSetDataID, chipSetNo)) {
					break;
				}
				// set temporary Offset X
				tmpOffsetX = (tmpOffsetX + absPaletteRangeX - 1) % absPaletteRangeX;
			}

			// search right X
			for (rightX = x; rightX < col; rightX += 1) {
				if (isDifferentFromCurrentMap(rightX, y, chipSetCategoryID, chipSetDataID, chipSetNo)) {
					break;
				}
			}

			var xIndex = 0;
			var saveX = x;
			x = x - 1;
			// set Map to left
			while (x > leftX) {
				for (var i = absPaletteRangeX - 1; i >= 0; i -= 1) {
					if (x > leftX) {
						xIndex = (i + offsetX) % absPaletteRangeX;
						setMapChip(x, y, currentPalettePanelCategoryID, currentPalettePanelDataID, selectedChipSetNoArray[yIndex][xIndex]);
					}
					x -= 1;
				}
			}
			x = saveX;
			// set Map to Right
			while (x < rightX) {
				for (var i = 0; i < absPaletteRangeX; i += 1) {
					if (x < rightX) {
						xIndex = (i + offsetX) % absPaletteRangeX;
						setMapChip(x, y, currentPalettePanelCategoryID, currentPalettePanelDataID, selectedChipSetNoArray[yIndex][xIndex]);
					}
					x += 1;
				}
			}
			// set offset
			offsetX = tmpOffsetX;

			if (y < row) {
				scanLine(leftX + 1, rightX - 1, y + 1, offsetX, (yIndex + 1) % absPaletteRangeY,
					chipSetCategoryID, chipSetDataID, chipSetNo);
			}
			if (0 <= y - 1) {
				scanLine(leftX + 1, rightX - 1, y - 1, offsetX, (yIndex + absPaletteRangeY - 1) % absPaletteRangeY,
					chipSetCategoryID, chipSetDataID, chipSetNo);
			}

		};

		var scanLine = function(aLeftX, rightX, y, aOffsetX, yIndex, chipSetCategoryID, chipSetDataID, chipSetNo) {

			var leftX = aLeftX;
			var offsetX = aOffsetX;

			var palettePanel = RGPP.System.PalettePanelList.getInstance().currentPalettePanel();
			if (palettePanel === null) {
				return;
			}

			// palette's Specify RangeX
			var paletteRangeX = palettePanel.specifyRangeX();

			var absPaletteRangeX = Math.abs(paletteRangeX);

			while (leftX <= rightX) {
				// Search left End
				// Skip non area
				for (; leftX <= rightX; ++leftX) {
					if (!isDifferentFromCurrentMap(leftX, y, chipSetCategoryID, chipSetDataID, chipSetNo)) {
						break;
					}
					offsetX = (offsetX + 1) % absPaletteRangeX;
				}
				if (isDifferentFromCurrentMap(leftX, y, chipSetCategoryID, chipSetDataID, chipSetNo)) {
					break;
				}
				for (; leftX <= rightX; ++leftX) {
					// search Right End
					// Skip chipSetNo area
					if (isDifferentFromCurrentMap(leftX, y, chipSetCategoryID, chipSetDataID, chipSetNo)) {
						break;
					}
					offsetX = (offsetX + 1) % absPaletteRangeX;
				}
				filling(leftX - 1, y, offsetX, yIndex, chipSetCategoryID, chipSetDataID, chipSetNo);
			}
		};

		function mapDrawParameterList() {
			var ret = mMapDrawParameterList.copy();
			mMapDrawParameterList.clear();
			return ret;
		}

		function produceDrawParameter(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray) {
			//
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			var rangeY = chipSetDataIDArray.length;
			var rangeX = chipSetDataIDArray[0].length;

			var precChipSetCategoryIDArray = currentMapPanel.currentLayerChipSetCategoryIDArray(x, y, rangeX, rangeY);
			var prevChipSetIDArray = currentMapPanel.currentLayerChipSetIDArray(x, y, rangeX, rangeY);
			var prevChipSetNoArray = currentMapPanel.currentLayerChipSetNoArray(x, y, rangeX, rangeY);

			if (prevChipSetIDArray.length != rangeY || prevChipSetIDArray[0].length != rangeX) {
				scriptUtil.outputMsgToConsole("range is not same!");
				return;
			}

			if (isDifferentFromPrevData(
					precChipSetCategoryIDArray, chipSetCategoryIDArray,
					prevChipSetIDArray, chipSetDataIDArray,
					prevChipSetNoArray, chipSetNoArray)) {
				if (isChangedMap(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray)) {
					var param = RGPP.System.MapDrawParameter({
						x: x,
						y: y,
						chipSetCategoryIDs: precChipSetCategoryIDArray,
						chipSetDataIDs: prevChipSetIDArray,
						chipSetNos: prevChipSetNoArray,

					});
					mMapDrawParameterList.push(param);
				}
			}
		}

		var isDifferentFromPrevData = function(
			prevChipSetCategoryIDArray, chipSetCategoryIDArray,
			prevChipSetIDArray, chipSetDataIDArray,
			prevChipSetNoArray, chipSetNoArray) {
			for (var i = 0; i < chipSetDataIDArray.length; ++i) {
				for (var j = 0; j < chipSetDataIDArray[i].length; ++j) {
					if (prevChipSetCategoryIDArray[i][j] !== chipSetCategoryIDArray[i][j]) {
						true;
					}
					if (prevChipSetIDArray[i][j] !== chipSetDataIDArray[i][j]) {
						return true;
					}
					if (prevChipSetNoArray[i][j] !== chipSetNoArray[i][j]) {
						return true;
					}
				}
			}
			return false;
		};

		var isDifferentFromCurrentMap = function(x, y, chipSetCategoryID, chipSetDataID, chipSetNo) {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			if (chipSetCategoryID === currentMapPanel.currentLayerChipSetCategoryID(x, y)) {
				if (chipSetDataID === currentMapPanel.currentLayerChipSetID(x, y)) {
					if (chipSetNo === currentMapPanel.currentLayerChipSetNo(x, y)) {
						return false;
					}
				}
			}
			return true;
		};

		var isChangedMap = function(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray) {
			if (mMapDrawParameterList.isEmpty()) {
				scriptUtil.outputMsgToConsole("Previous Chip Set Data Array == null");
				return true;
			}

			var size = mMapDrawParameterList.size();
			for (var listID = 0; listID < size; ++listID) {
				var param = mMapDrawParameterList.data(listID);
				var prevX = param.getX();
				var prevY = param.getY();
				var prevChipSetCategoryIDArray = param.chipSetCategoryIDArray();
				var prevChipSetIDArray = param.chipSetDataIDArray();
				var prevChipSetDataArray = param.chipSetNoArray();
				var breakFlag = false;

				if (prevX == x && prevY == y) {
					for (var j = 0; j < prevChipSetDataArray.length; ++j) {
						for (var i = 0; i < prevChipSetDataArray[j].length; ++i) {
							if (chipSetNoArray[j][i] != prevChipSetDataArray[j][i]) {
								breakFlag = true;
								break;
							}
						}
						if (breakFlag) {
							break;
						}
					}
					for (var j = 0; j < prevChipSetCategoryIDArray.length; ++j) {
						if (breakFlag) {
							break;
						}
						for (var i = 0; i < prevChipSetCategoryIDArray[j].length; ++i) {
							if (chipSetDataIDArray[j][i] != prevChipSetCategoryIDArray[j][i]) {
								breakFlag = true;
								break;
							}
						}
					}
					for (var j = 0; j < prevChipSetIDArray.length; ++j) {
						if (breakFlag) {
							break;
						}
						for (var i = 0; i < prevChipSetIDArray[j].length; ++i) {
							if (chipSetDataIDArray[j][i] != prevChipSetIDArray[j][i]) {
								breakFlag = true;
								break;
							}
						}
					}

					if (!breakFlag) {
						// completely same
						return false;
					}
				}
			}
			return true;
		};

		function undo(paramLinkedList) {
			var size = paramLinkedList.size();
			for (var i = 0; i < size; ++i) {
				var param = paramLinkedList.pop();
				var x = param.getX();
				var y = param.getY();
				var chipSetCategoryIDArray = param.chipSetCategoryIDArray();
				var chipSetDataIDArray = param.chipSetDataIDArray();
				var chipSetNoArray = param.chipSetNoArray();
				setMapChipArray(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray);
			}
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}
			currentMapPanel.paintComponent();
		}

		function redo(paramLinkedList) {
			var size = paramLinkedList.size();
			for (var i = 0; i < size; ++i) {
				var param = paramLinkedList.pop();
				var x = param.getX();
				var y = param.getY();
				var chipSetCategoryIDArray = param.chipSetCategoryIDArray();
				var chipSetDataIDArray = param.chipSetDataIDArray();
				var mapNoArray = param.chipSetNoArray();
				setMapChipArray(x, y, chipSetCategoryIDArray, chipSetDataIDArray, mapNoArray);
			}
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			currentMapPanel.paintComponent();
		}

		var setMapChip = function(x, y, chipSetCategoryID, chipSetDataID, chipSetNo) {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			var chipSetCategoryIDArray = [1];
			chipSetCategoryIDArray[0] = [1];
			chipSetCategoryIDArray[0][0] = chipSetCategoryID;
			var chipSetDataIDArray = [1];
			chipSetDataIDArray[0] = [1];
			chipSetDataIDArray[0][0] = chipSetDataID;
			var chipSetNoArray = [1];
			chipSetNoArray[0] = [1];
			chipSetNoArray[0][0] = chipSetNo;
			produceDrawParameter(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray);
			currentMapPanel.setMapChipArray(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray);
		};

		var setMapChipArray = function(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray) {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			produceDrawParameter(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray);
			currentMapPanel.setMapChipArray(x, y, chipSetCategoryIDArray, chipSetDataIDArray, chipSetNoArray);
		};

		return that;
	};
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);