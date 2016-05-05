(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "DBModal";

	var constructor = function(spec) {
		// Creating new modal
		var mModalBody = $("<div>");
		var mUpdateFunc = spec.updateFunc;

		var mTabsDiv = $("<div>");

		var mTbodyElement = [];

		var mInputField = [];
		var mCategoryNameInputField = [];

		var mModalTable = [];
		var mTabDiv = RGPP.System.List();

		var mUlElement = $("<ul>");

		var mDataNum = [];
		var mDB = spec.db;

		var ELEMENT_NAME = spec.dbName;
		var DATA_BASE_NAME = ELEMENT_NAME + " Data Base";
		var mModalWindow = RGPP.System.CategoryModal(addCategory);

		var that = RGPP.System.Modal({
			title: DATA_BASE_NAME,
			bodyElement: mModalBody,
			footerButton: "Save",
			approveFunc: saveClickFunction
		});

		that.openFunc = openFunc;
		that.closeFunc = closeFunc;

		var initialize = function() {
			initTab();
		};

		var initTab = function() {
			// init tab
			$(mModalBody).empty();
			$(mTabsDiv).empty();
			$(mModalBody).append(mTabsDiv);
			$(mTabsDiv).empty();

			initTabLi();
			initTabContents();

			$(mTabsDiv).tabs();

			var uiOperator = RGPP.System.UIOperator.getInstance();

			if (currentCategoryIndex() !== false) {
				// init Button
				var plusButton = RGPP.System.Button("+");
				var minusButton = RGPP.System.Button("-");
				$(mTabsDiv).append(plusButton.element());
				$(mTabsDiv).append(minusButton.element());
				// After adding body, set click function
				uiOperator.registClickFunction(plusButton.element(), addElement);
				uiOperator.registClickFunction(minusButton.element(), removeElement);
			}

			var createCategoryButton = RGPP.System.Button("Create Category");
			$(mModalBody).append(createCategoryButton.element());
			uiOperator.registClickFunction(createCategoryButton.element(), openCategoryModal);

			var removeCategoryButton = RGPP.System.Button("Remove Current Category");
			$(mModalBody).append(removeCategoryButton.element());
			uiOperator.registClickFunction(removeCategoryButton.element(), removeCategory);
		};

		var initTabLi = function() {
			$(mUlElement).empty();
			var categorySize = mDB.categorySize();
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				// init list
				var liElement = $("<li>");
				var anchor = $("<a>");
				$(anchor).attr("href", "#" + mDB.dbName() + "Category" + categoryIndex);
				var categoryName = mDB.categoryName(categoryIndex);
				$(anchor).append(categoryName);
				$(liElement).append(anchor);
				$(mUlElement).append(liElement);
			}
			$(mTabsDiv).append(mUlElement);
		};

		var initTabContents = function() {
			var categorySize = mDB.categorySize();
			mDataNum = [];
			var uiOperator = RGPP.System.UIOperator.getInstance();

			mTabDiv.clear();
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				//init Table
				var tabDiv = $("<div>");
				tabDiv.attr("id", mDB.dbName() + "Category" + categoryIndex);

				// init category name input field
				mCategoryNameInputField[categoryIndex] = $("<input>");
				var categoryName = mDB.categoryName(categoryIndex);
				mCategoryNameInputField[categoryIndex].attr("value", categoryName);
				tabDiv.append(mCategoryNameInputField[categoryIndex]);
				// init renameCategory Button
				var renameCategoryButton = RGPP.System.Button("Rename");
				tabDiv.append(renameCategoryButton.element());

				//init Table
				mModalTable[categoryIndex] = $("<table>");
				$(mTabsDiv).append(tabDiv);
				$(tabDiv).append(mModalTable[categoryIndex]);

				// initialize data num
				mDataNum[categoryIndex] = 0;
				// initialize table
				initTable(categoryIndex);
				$(mTabsDiv).append(tabDiv);
				mTabDiv.push(tabDiv);

				uiOperator.registClickFunction(renameCategoryButton.element(), renameCategory);
			}
		};

		var initTable = function(categoryIndex) {
			initAttrOfTable(categoryIndex);
			initDataOfTable(categoryIndex);
		};

		var initAttrOfTable = function(categoryIndex) {
			var attrSize = mDB.attrSize();
			var attrStringArray = mDB.attrStringArray();

			$(mModalTable[categoryIndex]).addClass("ui-widget ui-widget-content");
			var modalThead = $("<thead>");
			var modalHeader = $("<tr>");
			$(modalHeader).addClass("ui-widget-header");
			var modalIDHeader = $("<th>");
			$(modalIDHeader).append("ID");
			$(modalHeader).append(modalIDHeader);

			for (var attrIndex = 0; attrIndex < attrSize; ++attrIndex) {
				$(modalHeader).addClass("ui-widget-header");
				var modalAttrHeader = $("<th>");
				$(modalAttrHeader).append(attrStringArray[attrIndex]);
				$(modalHeader).append(modalAttrHeader);
			}

			$(modalThead).append(modalHeader);
			$(mModalTable[categoryIndex]).append(modalThead);
		};

		var initDataOfTable = function(categoryIndex) {
			mTbodyElement[categoryIndex] = document.createElement("tbody");
			$(mModalTable[categoryIndex]).append(mTbodyElement[categoryIndex]);

			var categories = mDB.categories();
			var attrSize = mDB.attrSize();

			var datas = categories[categoryIndex].datas();
			var dataSize = mDB.dataSize(categoryIndex);

			var trElements = [dataSize];
			mInputField[categoryIndex] = [dataSize];
			for (var dataIndex = 0; dataIndex < dataSize; dataIndex += 1) {
				trElements[dataIndex] = $("<tr>");
				$(trElements[dataIndex]).append("<td>" + datas[dataIndex].id() + "</td>");

				mInputField[categoryIndex][dataIndex] = [attrSize];
				$(mTbodyElement[categoryIndex]).append(trElements[dataIndex]);
				for (var attrIndex = 0; attrIndex < attrSize; attrIndex += 1) {
					var tdField = $("<td>");
					mInputField[categoryIndex][dataIndex][attrIndex] = RGPP.System.VariousInput({
						type: (spec.type === undefined) ? undefined : spec.type[attrIndex],
					});

					var inputFieldElement = mInputField[categoryIndex][dataIndex][attrIndex].element();
					$(tdField).append(inputFieldElement);
					$(trElements[dataIndex]).append(tdField);

					$(inputFieldElement).addClass("text ui-widget-content ui-corner-all");
					var initValue = mDB.attrValue(categoryIndex, dataIndex, attrIndex);
					mInputField[categoryIndex][dataIndex][attrIndex].initialize({
						minValue: (spec.minValues === undefined) ? undefined : spec.minValues[attrIndex],
						initValue: initValue,
						elements: (spec.elements === undefined) ? undefined : spec.elements[attrIndex]
					});
				}
				mDataNum[categoryIndex] += 1;
			}
		};

		function addCategory(categoryName) {

			saveFunction();

			var attrSize = mDB.attrSize();
			var dataNum = 0;

			// init default attr value
			var defaultAttrValueArray = mDB.defaultAttrValueArray();
			var correctedDefaultAttrValueArray = [attrSize];
			var rgpp = RGPP;

			for (var attrIndex = 0; attrIndex < attrSize; ++attrIndex) {
				var defaultValue = defaultAttrValueArray[attrIndex];
				if (!rgpp.isFiniteNumber(defaultValue)) {
					if (typeof defaultValue === "string") {
						if (defaultValue.indexOf('/') < 0) {
							defaultValue = defaultValue + " " + dataNum;
						}
					}
				}
				correctedDefaultAttrValueArray[attrIndex] = defaultValue;
			}

			var categoryData = {
				name: categoryName,
				data: [],
			};

			categoryData.data[0] = correctedDefaultAttrValueArray;
			mDB.addCategory(categoryData);
			initialize();
			var categoryIndex = mDB.categorySize() - 1;
			$(mTabsDiv).tabs("option", "active", categoryIndex);
		}

		function saveClickFunction() {
			saveFunction();
			that.hide();
		}

		function openFunc() {
			initialize();
			that.open();
		}

		function closeFunc() {
			that.hide();
		}


		var addElement = function() {
			// category Index
			var categoryIndex = currentCategoryIndex();
			if (categoryIndex === false) {
				return;
			}

			var attrSize = mDB.attrSize();
			var dataNum = mDataNum[categoryIndex];

			// init default attr value
			var defaultAttrValueArray = mDB.defaultAttrValueArray();
			var correctedDefaultAttrValueArray = [attrSize];
			var rgpp = RGPP;

			for (var attrIndex = 0; attrIndex < attrSize; ++attrIndex) {
				var defaultValue = defaultAttrValueArray[attrIndex];
				if (!rgpp.isFiniteNumber(defaultValue)) {
					if (typeof defaultValue === "string") {
						if (defaultValue.indexOf('/') < 0) {
							defaultValue = defaultValue + " " + dataNum;
						}
					}
				}
				correctedDefaultAttrValueArray[attrIndex] = defaultValue;
			}

			var trElement = $("<tr>");
			$(trElement).append("<td>" + dataNum + "</td>");
			$(mTbodyElement[categoryIndex]).append(trElement);
			mInputField[categoryIndex][dataNum] = [];

			for (var attrIndex = 0; attrIndex < attrSize; ++attrIndex) {
				var tdField = $("<td>");
				var correctedDefaultValue = correctedDefaultAttrValueArray[attrIndex];

				mInputField[categoryIndex][dataNum][attrIndex] = RGPP.System.VariousInput({
					type: (spec.type === undefined) ? undefined : spec.type[attrIndex],
				});

				var inputFieldElement = mInputField[categoryIndex][dataNum][attrIndex].element();
				$(tdField).append(inputFieldElement);
				$(trElement).append(tdField);

				$(inputFieldElement).addClass("text ui-widget-content ui-corner-all");
				mInputField[categoryIndex][dataNum][attrIndex].initialize({
					minValue: (spec.minValues === undefined) ? undefined : spec.minValues[attrIndex],
					initValue: correctedDefaultValue,
					elements: (spec.elements === undefined) ? undefined : spec.elements[attrIndex]
				});
			}

			mDataNum[categoryIndex] += 1;
		};

		var removeElement = function() {
			var categoryIndex = currentCategoryIndex();
			if (categoryIndex === false) {
				return;
			}

			if (mDataNum[categoryIndex] > 0) {
				mTbodyElement[categoryIndex].removeChild(mTbodyElement[categoryIndex].lastChild);
				mDataNum[categoryIndex] -= 1;
			}
		};

		var openCategoryModal = function() {
			mModalWindow.openFunc();
		};

		var removeCategory = function() {
			var categoryIndex = currentCategoryIndex();
			if (categoryIndex !== false) {
				var removeResult = mDB.removeCategory(categoryIndex);
				if (removeResult) {
					mTabDiv.remove(categoryIndex);
					initialize();
				}
			}
		};

		var renameCategory = function() {
			var categoryIndex = currentCategoryIndex();
			if (categoryIndex !== false) {
				var newName = $(mCategoryNameInputField[categoryIndex]).val();
				mDB.setCategoryName(categoryIndex, newName);
				initialize();
				$(mTabsDiv).tabs("option", "active", categoryIndex);
			}
		};

		var saveFunction = function() {
			var categorySize = mDB.categorySize();
			var attrSize = mDB.attrSize();
			var dataArray = [];
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				dataArray[categoryIndex] = {
					name: mDB.categoryName(categoryIndex),
					data: [],
				};
				for (var dataIndex = 0; dataIndex < mDataNum[categoryIndex]; dataIndex += 1) {
					dataArray[categoryIndex].data[dataIndex] = [];
					for (var attrIndex = 0; attrIndex < attrSize; attrIndex += 1) {
						var inputValue = mInputField[categoryIndex][dataIndex][attrIndex].value();
						dataArray[categoryIndex].data[dataIndex][attrIndex] = inputValue;
					}
				}
			}
			mDB.updateWithArray(dataArray);
			mDB.save();
			mUpdateFunc();
		};

		var currentCategoryIndex = function() {
			var categoryIndex = $(mTabsDiv).tabs("option", "active");
			return categoryIndex;
		};

		initialize();

		return that;
	};
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);