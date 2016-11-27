import {
    SET_CURRENT_LAYER_NO,
    SET_CURRENT_MAP_ID
} from '../../actions/Map/actionTypes'

import {MAP_LAYER_NUM} from '../../constants'
import {Map} from 'immutable'

export const initialState = Map({
  id: 0,
  currentMapID: 0,
  currentLayerNo: MAP_LAYER_NUM
})

const selected = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_MAP_ID:
      return state.set('currentMapID', action.currentMapID)
    case SET_CURRENT_LAYER_NO:
      return state.set('currentLayerNo', action.currentLayerNo)
    default:
      return state
  }
}

export default selected
