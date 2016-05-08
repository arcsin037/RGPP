import $ from 'jquery'
import RGPP from 'RGPP'

/**
 * for uu Canvas
 * @method window.xcanvas
 */
window.xcanvas = (uu) => {
    const system = RGPP.System
    system.OperateCanvas.getInstance(uu)

    // Open editor mode main panel
    system.GameMainPanel.open()
}

/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(() => {
    // Open editor mode main panel
    RGPP.System.GameMainPanel.open()
})

document.write('Game.')
