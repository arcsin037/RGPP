import {combineReducers} from 'redux'
import {getSaveData} from './MapChipEditor/utils/storeUtil'
import mapChipEditor from './MapChipEditor/reducers'

export const pluginReducers = combineReducers({
    mapChipEditor
})

export const getPluginSaveData = (state) => ({
    mapChipEditor: getSaveData(state)
})
