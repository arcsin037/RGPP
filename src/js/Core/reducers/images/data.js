import * as types from 'Core/actions/Images/actionTypes'
const initialState = []

const createImage = (state, action) => action.data

const data = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_IMAGE:
      return [
        ...state,
        createImage(state, action)
      ]
    default:
      return state
  }
}

export default data
