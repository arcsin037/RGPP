'use strict'

import * as types from 'Core/actions/SaveData/actionTypes'
import {
    expect
} from 'chai'
import reducer from './saveData'

describe('save data reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            plugin: {},
            gameObjs: {},
            images: {},
            scenes: {},
            sounds: {}
        }
        expect(reducer(undefined, {})).to.deep.equal(initialState)
    })

    it('should handle SAVE', () => {
        const data = {
            plugin: {hoge: 'hoge'},
            gameObjs: {hoge: 'hoge'},
            images: {hoge: 'hoge'},
            scenes: {hoge: 'hoge'},
            sounds: {hoge: 'hoge'}
        }
        const action = {
            type: types.SAVE,
            data
        }
        expect(reducer([], action)).to.deep.equal(data)
    })
})
