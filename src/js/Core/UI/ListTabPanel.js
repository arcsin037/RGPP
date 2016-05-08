/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ListTabPanel";

	/**
	 * List Tab Panel
	 * @class ListTabPanel
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		// private valiable
		var mTabFunction = RGPP.System.TabFunction();
		var mListObject = spec.listObject;
		// Base panel
		var mDiv = document.createElement("div");
		// body list panel
		var mDivBody = document.createElement("div");
		// items
		var mListElement = document.createElement("ul");
		var mPanelName = "";
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		// Update list tab panel
		that.update = update;

		// Set click function
		that.setClickFunction = setClickFunction;

		// Add element to panel
		that.add = add;

		// Get list tab panel division
		that.div = div;

		// Open all tab
		that.openAllTab = openAllTab;

		// Open all tab in nothing open
		that.openAllTabInNothingOpen = openAllTabInNothingOpen;

		// Function to call when the tab is switched
		that.changeTab = changeTab;

		/**
		 * Initialize HTML Element
		 * @method initialize_
		 * @private
		 */
		function initialize_() {
			var titleName = mListObject.listName();
			mPanelName = RGPP.System.StringUtil.getInstance().substitute(titleName, " ", "_");

			mDiv.setAttribute("id", mPanelName + "_title");

			var itemListDiv = createItemListDiv_();

			$(spec.itemListDiv).append(itemListDiv);

			var tabPanel = RGPP.System.TabPanel(mPanelName);
			$(mDivBody).append(tabPanel.div());

			var cssStyle = RGPP.System.CssStyle.getInstance();

			cssStyle.setScroll(mDivBody);
			cssStyle.setPercentSize(mDivBody, 100, 100);

			mDiv.appendChild(mDivBody);

			cssStyle.setBgColor(mDiv, "#F6F6F6");
			cssStyle.setListPanel(mDiv);

		}

		/**
		 * @method createItemListDiv_
		 * 
		 * @return item list division
		 * @private
		 */
		var createItemListDiv_ = function() {
			// item list panel
			var itemListDiv = document.createElement("div");
			itemListDiv.setAttribute("id", "itemlist");

			mListElement.setAttribute("id", "items_" + mPanelName);
			mListElement.setAttribute("class", "items");
			var size = mListObject.size();
			for (var i = 0; i < size; ++i) {
				// item
				var listItem = document.createElement("li");
				var anchor = document.createElement("a");
				anchor.setAttribute("href", "#" + mPanelName);
				anchor.setAttribute("rel", mPanelName + "_" + "tab_" + i);
				anchor.setAttribute("tabID", i);
				anchor.innerHTML = mListObject.title(i);

				$(listItem).append(anchor);
				$(mListElement).append(listItem);
			}
			$(itemListDiv).append(mListElement);
			return itemListDiv;
		};

		/**
		 * Update list tab panel
		 * 
		 * @method update
		 * @param {number} lastIndex last index
		 */
		function update(lastIndex) {
			// Save Open Tab
			var tabLi = '#tabs_' + mPanelName + ' li.current';
			var currentAnchorTabID = $($(tabLi).children()[0]).attr("anchorTabID");
			currentAnchorTabID = parseInt(currentAnchorTabID, 10);
			scriptUtil.outputMsgToConsole("currentAnchorTabID = " + currentAnchorTabID);

			var tabAnchor = '#tabs_' + mPanelName + ' a.tab';
			var existedTabSize = $(tabAnchor).length;
			scriptUtil.outputMsgToConsole("openTabSize = " + existedTabSize);
			var existedTabIDs = [existedTabSize];

			// Set existed IDs
			for (var elementIndex = 0; elementIndex < existedTabSize; elementIndex += 1) {
				var value = $($(tabAnchor)[elementIndex]).attr("anchorTabID");
				var intValue = parseInt(value, 10);
				existedTabIDs[elementIndex] = intValue;
				scriptUtil.outputMsgToConsole("tabIDs[" + elementIndex + "] = " + existedTabIDs[elementIndex]);
			}

			var allElementSize = mListObject.size();
			scriptUtil.outputMsgToConsole("allElementSize = " + allElementSize);

			// Remove all Element
			$(mListElement).children().remove();
			$(mDivBody).children().remove();
			var tabPanel = RGPP.System.TabPanel(mPanelName);
			$(mDivBody).append(tabPanel.div());

			var anchors = [allElementSize];
			for (var elementIndex = 0; elementIndex < allElementSize; elementIndex += 1) {
				// item
				var listItem = document.createElement("li");
				var anchor = document.createElement("a");
				anchor.setAttribute("href", "#" + mPanelName);
				anchor.setAttribute("rel", mPanelName + "_" + "tab_" + elementIndex);
				anchor.setAttribute("tabID", elementIndex);
				anchor.innerHTML = mListObject.title(elementIndex);
				listItem.appendChild(anchor);
				mListElement.appendChild(listItem);
				anchors[elementIndex] = anchor;
			}

			var currentTabIndex = -1;
			var addTabNum = 0;

			var maxElementSize = (allElementSize > existedTabSize) ? allElementSize : existedTabSize;
			var saveIDs = [];
			// Add Tab
			for (var elementIndex = 0; elementIndex < maxElementSize; elementIndex += 1) {
				var existedTabID = -1;
				if (lastIndex === elementIndex) {
					// change tab to last tab 
					existedTabID = mTabFunction.addTab($(anchors[elementIndex]), mPanelName, mListObject);
					spec.changeTabFunc(existedTabID);
				}
				else {
					// Add existed tab
					if (elementIndex < existedTabSize) {
						scriptUtil.outputMsgToConsole("[for loop] tabIDs[" + elementIndex + "] = " + existedTabIDs[elementIndex]);
						existedTabID = existedTabIDs[elementIndex];
						if (existedTabID < allElementSize) {
							mTabFunction.addTab($(anchors[existedTabID]), mPanelName, mListObject);
							if (existedTabID === currentAnchorTabID) {
								currentTabIndex = addTabNum;
							}
							saveIDs[addTabNum] = existedTabID;
							++addTabNum;
						}
					}
				}
			}

			// change Tab
			if (lastIndex < 0) {
				// change tab to current tab 
				if (allElementSize > 0) {
					if (currentAnchorTabID < allElementSize && currentTabIndex >= 0) {
						mTabFunction.changeTab($(tabAnchor)[currentTabIndex], mPanelName);
						spec.changeTabFunc(currentAnchorTabID);
					}
					else {
						for (var existedLastTabIndex = addTabNum - 1; existedLastTabIndex >= 0; --existedLastTabIndex) {
							var existedLastTabID = saveIDs[existedLastTabIndex];
							if (existedLastTabID < allElementSize) {
								mTabFunction.changeTab($(tabAnchor)[existedLastTabIndex], mPanelName);
								spec.changeTabFunc(existedLastTabID);
								break;
							}
						}
					}
				}
			}

			setClickFunction();
		}

		/**
		 * Set click function
		 * @method setClickFunction
		 */
		function setClickFunction() {
			var itemsAnchor = "#items_" + mPanelName + " a";
			var tabAnchor = '#tabs_' + mPanelName + ' a.tab';
			var removeAnchor = '#tabs_' + mPanelName + ' a.remove';
			$(itemsAnchor).off('click');
			$(itemsAnchor).on('click', function() {
				var tabID = mTabFunction.addTab($(this), mPanelName, mListObject);
				spec.changeTabFunc(tabID);
			});

			$(mDiv).off('click', tabAnchor);
			$(mDiv).on('click', tabAnchor, function() {
				var tabID = mTabFunction.changeTab($(this), mPanelName);
				spec.changeTabFunc(tabID);
			});

			$(mDiv).off('click', removeAnchor);
			$(mDiv).on('click', removeAnchor, function() {
				var tabID = mTabFunction.removeTab($(this), mPanelName);
				spec.changeTabFunc(tabID);
				scriptUtil.outputMsgToConsole("tabID = " + tabID);
			});
		}

		/**
		 * Add element to panel
		 * @method add
		 * @param element element
		 */
		function add(element) {
			$(mDivBody).append(element);
		}

		/**
		 * Get list tab panel division
		 * @method div
		 * @return list tab panel division
		 */
		function div() {
			return mDiv;
		}

		/**
		 * Open all tab
		 * @method openAllTab
		 */
		function openAllTab() {
			var itemsAnchor = "#items_" + mPanelName + " a";
			var tabAnchor = '#tabs_' + mPanelName + ' a.tab';
			var size = $(itemsAnchor).length;
			if (size <= 0) {
				return;
			}
			for (var i = 0; i < size; ++i) {
				mTabFunction.addTab($(itemsAnchor)[i], mPanelName, mListObject);
			}
			var tabID = mTabFunction.changeTab($(tabAnchor)[0], mPanelName);
			spec.changeTabFunc(tabID);
		}

		/**
		 * Open all tab in nothing open
		 * @method openAllTabInNothingOpen
		 */
		function openAllTabInNothingOpen() {
			var tabAnchor = '#tabs_' + mPanelName + ' a.tab';
			var size = $(tabAnchor).length;
			if (size < 1) {
				openAllTab();
			}
		}

		/**
		 * Function to call when the tab is switched
		 * @method changeTab
		 * @param {number} index
		 */
		function changeTab(index) {
			var itemsAnchor = "#items_" + mPanelName + " a";
			var addTabID = mTabFunction.addTab($(itemsAnchor)[index], mPanelName, mListObject);
			spec.changeTabFunc(addTabID);
		}

		// initialize
		initialize_();

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);