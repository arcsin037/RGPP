import * as types from '../../actions/Map/actionTypes'
import MapsModel from '../../model/MapsModel'

const initialState = new MapsModel()

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MAP:
      return state.addMap(action.payload)
    case types.UPDATE_MAP:
      return state.updateMap(action.index, action.payload)
    default:
      return state
  }
}

export default reducer
