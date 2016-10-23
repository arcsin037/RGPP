'use strict'

import * as types from '../../actions/Sounds/actionTypes'
import {
    expect
} from 'chai'
import reducer from './data'

describe('sounds data reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle ADD_SOUND', () => {
        const data = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const action = {
            type: types.ADD_SOUND,
            data
        }
        expect(reducer([], action)).to.deep.equal([data])
    })
})
