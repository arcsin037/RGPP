import 'babel-polyfill'
import $ from 'jquery'
// import RGPP from 'RGPP'
import App from 'Core/Components/TodoList/App'
import EditorMainPanel from 'Core/View/EditorMainPanel'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import config from './templates/config.json'
import {createStore} from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reducers from 'Core/reducers'

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

const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension())
/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(() => {
    // Open editor mode main panel
    ReactDOM.render(
        <Provider store={store}>
            <EditorMainPanel />
        </Provider>,
        document.getElementById('content')
    )
})

const html = template(config)
document.write(html)
