'use strict'

import {
    DEFAULT_COL,
    DEFAULT_ROW
} from '../constants'

import MapData from './MapData'

import {
    expect
} from 'chai'

describe('MapData', () => {
    describe('set size by constructor', () => {
        const col = 30
        const row = 25
        const testCases = [{
            expectedCol: DEFAULT_COL,
            expectedRow: DEFAULT_ROW
        }, {
            col,
            row,
            expectedCol: col,
            expectedRow: row
        }, {
            col,
            expectedCol: col,
            expectedRow: DEFAULT_ROW
        }, {
            row,
            expectedCol: DEFAULT_COL,
            expectedRow: row
        }]

        testCases.forEach((testCase) => {
            it(`{col: ${testCase.col} row: ${testCase.row}} => {col: ${testCase.expectedCol} row: ${testCase.expectedRow}}`, () => {
                const mapData = new MapData(testCase)
                expect(mapData.col).to.equal(testCase.expectedCol)
                expect(mapData.row).to.equal(testCase.expectedRow)
            })
        })
    })

})
