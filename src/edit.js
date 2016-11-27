import 'babel-polyfill'
import {applyMiddleware, compose, createStore} from 'redux'
import middleware, {enhancer} from 'Core/middleware'
import $ from 'jquery'
// import RGPP from 'RGPP'
import EditorMainPanel from 'Core/View/EditorMainPanel'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import config from './templates/config.json'
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

const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension && window.devToolsExtension()
    ),
    compose(...enhancer)
)
/**
 * Function to call when DOMs are loaded
 * @method main
 */
$(() => {
    // Open editor mode main panel
    ReactDOM.render(
        <Provider store={store}>
        <EditorMainPanel/>
    </Provider>, document.getElementById('content'))
})

const html = template(config)
document.write(html)
