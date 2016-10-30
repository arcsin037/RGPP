'use strict'

import * as types from 'Core/actions/Scenes/actionTypes'
import {
    expect
} from 'chai'
import reducer from './data'

describe('scenes data reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle ADD_SCENE', () => {
        const data = {
            name: 'hoge',
            events: []
        }
        const action = {
            type: types.ADD_SCENE,
            data
        }
        expect(reducer([], action)).to.deep.equal([data])
    })
})
