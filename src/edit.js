import $ from 'jquery'
import RGPP from 'RGPP'
import config from './templates/config.json'
import template from './templates/Editor.mustache'

/**
 * Function to call when DOMs are loaded for uu Canvas
 * @method window.xcanvas
 */
window.xcanvas = (uu) => {
    const system = RGPP.System
    system.OperateCanvas.getInstance(uu)

    // Open editor mode main panel
    system.EditorMainPanel.open()
}

/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(() => {
    // Open editor mode main panel
    RGPP.System.EditorMainPanel.open()
})


document.write('Editor.')

const html = template(config)
document.write(html)
