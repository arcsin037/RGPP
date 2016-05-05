/* global RGPP */

/**
 * for uu Canvas
 * @method window.xcanvas
 */
window.xcanvas = function(uu, canvasNodes) {
	console.log("xcanvas");
	var system = RGPP.System;
	system.OperateCanvas.getInstance(uu);
	// Open editor mode main panel
	system.GameMainPanel().open();
};

/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(function main() {
	// Open editor mode main panel
	RGPP.System.GameMainPanel().open();
});
