import * as types from '../actions/SaveData/actionTypes'

const initialState = {}

const save = (state, action) => action.data

const saveData = (state = initialState, action) => {
    switch (action.type) {
    case types.SAVE:
        return save(state, action)
    default:
        return state
    }
}

export default saveData
