import * as types from 'Core/actions/Scenes/actionTypes'
import { List, Map } from 'immutable'

const initialState = List([])

const data = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SCENE:
      return state.push(Map(action.data))
    default:
      return state
  }
}

export default data
