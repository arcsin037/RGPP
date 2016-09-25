'use strict'

import * as actions from './PaletteActions'
import * as types from './actionTypes'
import {
    expect
} from 'chai'

describe('PaletteAction', () => {
    it('should create an action to add a palette', () => {
        const ctx = 'hoge'
        const palette = {
            id: 0,
            col: 20,
            row: 15,
            chipWidth: 32,
            chipHeight: 32,
            img: 'fuga'
        }
        const expectedAction = Object.assign({
            type: types.ADD_PALETTE,
            ctx
        }, palette)
        expect(actions.addPalette(ctx, palette)).to.deep.equal(expectedAction)
    })
    it('should create an action to set selection range', () => {
        const arg = {
            id: 0,
            startX: 32,
            startY: 0,
            specifyRangeX: 64,
            specifyRangeY: 128,
            chipNoArray: [
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8]
            ]
        }
        const expectedAction = Object.assign({
            type: types.SET_SELECTION_RANGE
        }, arg)
        expect(actions.setSelectionRange(arg)).to.deep.equal(expectedAction)
    })
    it('should create an action to set draw mode', () => {
        const drawMode = 'Pen'
        const expectedAction = {
            type: types.SET_DRAW_MODE,
            drawMode
        }
        expect(actions.setDrawMode(drawMode)).to.deep.equal(expectedAction)
    })
})
