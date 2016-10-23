import * as types from '../../actions/Sounds/actionTypes'
const initialState = []

const createSound = (state, action) => action.data

const data = (state = initialState, action) => {
    switch (action.type) {
    case types.ADD_SOUND:
        return [
            ...state,
            createSound(state, action)
        ]
    default:
        return state
    }
}

export default data
