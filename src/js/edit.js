import RGPP from 'Core'

/**
 * Function to call when DOMs are loaded for uu Canvas
 * @method window.xcanvas
 */
window.xcanvas = (uu, canvasNodes) => {
    const system = RGPP.System
    system.OperateCanvas.getInstance(uu)
        // Open editor mode main panel
    system.EditorMainPanel.open()
}

/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(function main() {
    // Open editor mode main panel
    RGPP.System.EditorMainPanel.open()
})
