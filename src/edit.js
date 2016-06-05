import 'babel-polyfill'
import $ from 'jquery'
// import RGPP from 'RGPP'
import EditorMainPanel from 'Core/View/EditorMainPanel'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
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

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

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

const html = template(config)
document.write(html)
