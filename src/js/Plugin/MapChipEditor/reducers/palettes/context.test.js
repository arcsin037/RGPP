'use strict'

import * as types from '../../actions/Palette/actionTypes'
import {
    expect
} from 'chai'
import reducer from './context'

describe('context reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal({
            drawMode: 'Pen'
        })
    })

    it('should handle SET_DRAW_MODE', () => {
        const drawMode = 'Rectangle'
        const action = {
            type: types.SET_DRAW_MODE,
            drawMode
        }
        expect(reducer({}, action)).to.deep.equal({
            drawMode
        })
    })
})
