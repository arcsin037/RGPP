import {combineReducers} from 'redux'

import images from './images'
import {pluginReducers} from 'Plugin'
import saveData from './saveData'
import sounds from './sounds'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const reducer = combineReducers({
    plugin: pluginReducers,
    todos,
    visibilityFilter,
    saveData,
    images,
    sounds
})

export const getImages = (state) => ({
    images: state.images.data
})

export const getSounds = (state) => ({
    sounds: state.sounds.data
})

export default reducer
