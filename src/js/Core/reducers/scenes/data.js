import * as types from 'Core/actions/Scenes/actionTypes'
const initialState = []

const createScene = (state, action) => action.data

const data = (state = initialState, action) => {
    switch (action.type) {
    case types.ADD_SCENE:
        return [
            ...state,
            createScene(state, action)
        ]
    default:
        return state
    }
}

export default data
