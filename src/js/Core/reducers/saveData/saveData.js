import * as types from 'Core/actions/SaveData/actionTypes'

const initialState = {
    plugin: {},
    gameObjs: {},
    images: {},
    scenes: {},
    sounds: {}
}

const save = (state, action) => action.data

const saveData = (state = initialState, action) => {
    switch (action.type) {
    case types.SAVE:
        return save(state, action)
    default:
        return state
    }
}

export const getImages = (state) => state.images.data

export const getSounds = (state) => state.sounds.data

export const getScenes = (state) => state.scenes.data

export default saveData
