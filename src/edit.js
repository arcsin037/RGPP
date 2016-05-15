import $ from 'jquery'
// import RGPP from 'RGPP'
import EditorMainPanel from 'Core/View/EditorMainPanel'
import React from 'react'
import ReactDOM from 'react-dom'
import config from './templates/config.json'
import template from './templates/Edit.mustache'

/**
 * Function to call when DOMs are loaded for uu Canvas
 * @method window.xcanvas
 */
// window.xcanvas = (uu) => {
//     const system = RGPP.System
//     system.OperateCanvas.getInstance(uu)
//
//     // Open editor mode main panel
//     system.EditorMainPanel.open()
// }

/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(() => {
    // Open editor mode main panel
    ReactDOM.render(
        <EditorMainPanel />,
        document.getElementById('content')
    )
})



document.write('Editor.')

const html = template(config)
document.write(html)
