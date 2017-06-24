import * as types from './actionTypes'

export const addMap = (data) => ({
  type: types.ADD_MAP,
  payload: data
})

export const updateMap = (index, data) => ({
  type: types.UPDATE_MAP,
  index,
  payload: data
})
