import * as types from '../actions/SaveData/actionTypes'

const initialState = {}

const save = (state, action) => (action.data)

const saveData = (state = initialState, action) => {
    console.log('saveData', action)
    switch (action.type) {
    case types.SAVE:
        return save()
    default:
        return state
    }
}

export default saveData
