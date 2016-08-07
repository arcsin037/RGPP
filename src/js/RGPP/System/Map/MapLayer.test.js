'use strict'

import MapLayer, {
    DEFAULT_COL,
    DEFAULT_ROW,
    NOTHING,
    OUT_OF_BOUNDS
} from './MapLayer'

import {
    expect
} from 'chai'

describe('MapLayer', () => {
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
                const mapLayer = new MapLayer({
                    col: testCase.col,
                    row: testCase.row
                })

                // nothing
                expect(mapLayer.chipSetCategoryID(0, 0)).to.equal(NOTHING)
                expect(mapLayer.chipSetCategoryID(testCase.expectedCol - 1, 0)).to.equal(NOTHING)
                expect(mapLayer.chipSetCategoryID(0, testCase.expectedRow - 1)).to.equal(NOTHING)
                expect(mapLayer.chipSetCategoryID(testCase.expectedCol - 1, testCase.expectedRow - 1)).to.equal(NOTHING)

                // out of bounds
                expect(mapLayer.chipSetCategoryID(-1, -1)).to.equal(OUT_OF_BOUNDS)
                expect(mapLayer.chipSetCategoryID(testCase.expectedCol, 0)).to.equal(OUT_OF_BOUNDS)
                expect(mapLayer.chipSetCategoryID(0, testCase.expectedRow)).to.equal(OUT_OF_BOUNDS)
                expect(mapLayer.chipSetCategoryID(testCase.expectedCol, testCase.expectedRow)).to.equal(OUT_OF_BOUNDS)
            })
        })
    })

    describe('#setData', () => {
        it('inside', () => {
            const mapLayer = new MapLayer()
            mapLayer.setData(2, 3, 1, 2, 3)
            expect(mapLayer.chipSetCategoryID(2, 3)).to.equal(1)
            expect(mapLayer.chipSetDataID(2, 3)).to.equal(2)
            expect(mapLayer.chipSetNo(2, 3)).to.equal(3)
        })

        it('out of bounds ( < 0 )', () => {
            const mapLayer = new MapLayer()
            mapLayer.setData(-1, -1, 3, 1, 2, 3)
            expect(mapLayer.chipSetCategoryID(-1, -1)).to.equal(OUT_OF_BOUNDS)
            expect(mapLayer.chipSetDataID(-1, -1)).to.equal(OUT_OF_BOUNDS)
            expect(mapLayer.chipSetNo(-1, -1)).to.equal(OUT_OF_BOUNDS)
        })

        it('out of bounds ( >= size )', () => {
            const mapLayer = new MapLayer()
            mapLayer.setData(20, 15, 3, 1, 2, 3)
            expect(mapLayer.chipSetCategoryID(-1, -1)).to.equal(OUT_OF_BOUNDS)
            expect(mapLayer.chipSetDataID(-1, -1)).to.equal(OUT_OF_BOUNDS)
            expect(mapLayer.chipSetNo(-1, -1)).to.equal(OUT_OF_BOUNDS)
        })
    })

    describe('get array data', () => {
        const testCases = [{
            x: 1,
            y: 2,
            pSpecifyRangeX: 3,
            pSpecifyRangeY: 2,
            chipSetCategoryIDArray: [
                [1, 1, 1],
                [2, 2, 2]
            ],
            chipSetDataIDArray: [
                [2, 2, 2],
                [3, 3, 3]
            ],
            chipSetNoArray: [
                [3, 3, 3],
                [4, 4, 4]
            ]
        }, {
            x: 3,
            y: 6,
            pSpecifyRangeX: 4,
            pSpecifyRangeY: 5,
            chipSetCategoryIDArray: [
                [1, 1, 1, 1],
                [2, 2, 2, 2],
                [1, 2, 3, 4],
                [2, 3, 4, 5],
                [3, 4, 5, 6]
            ],
            chipSetDataIDArray: [
                [2, 2, 2, 2],
                [3, 3, 3, 3],
                [2, 3, 4, 5],
                [3, 4, 5, 6],
                [4, 5, 6, 7]
            ],
            chipSetNoArray: [
                [3, 3, 3, 3],
                [4, 4, 4, 4],
                [4, 5, 6, 7],
                [5, 6, 7, 8],
                [6, 7, 8, 9]
            ]
        }]

        const getInitializedMapLayer = (testCase) => {
            const mapLayer = new MapLayer()
            for (let y = 0; y < testCase.pSpecifyRangeY; y += 1) {
                const dstY = testCase.y + y
                for (let x = 0; x < testCase.pSpecifyRangeX; x += 1) {
                    const dstX = testCase.x + x
                    mapLayer.setData(
                        dstX, dstY,
                        testCase.chipSetCategoryIDArray[y][x],
                        testCase.chipSetDataIDArray[y][x],
                        testCase.chipSetNoArray[y][x]
                    )
                }
            }
            return mapLayer
        }

        const getMinusOutOfBoudsArray = (testCase) => {
            const arraySizeX = testCase.pSpecifyRangeX + testCase.x + 1
            const arraySizeY = testCase.pSpecifyRangeY + testCase.y + 1
            const chipSetCategoryIDArray = [arraySizeY]
            const chipSetDataIDArray = [arraySizeY]
            const chipSetNoArray = [arraySizeY]

            for (let y = 0; y < arraySizeY; y += 1) {
                chipSetCategoryIDArray[y] = [arraySizeX]
                chipSetDataIDArray[y] = [arraySizeX]
                chipSetNoArray[y] = [arraySizeX]

                for (let x = 0; x < arraySizeX; x += 1) {
                    if (y - 1 < 0 || x - 1 < 0) {
                        chipSetCategoryIDArray[y][x] = OUT_OF_BOUNDS
                        chipSetDataIDArray[y][x] = OUT_OF_BOUNDS
                        chipSetNoArray[y][x] = OUT_OF_BOUNDS
                    } else if (y - 1 < testCase.y || x - 1 < testCase.x) {
                        chipSetCategoryIDArray[y][x] = NOTHING
                        chipSetDataIDArray[y][x] = NOTHING
                        chipSetNoArray[y][x] = NOTHING
                    } else {
                        chipSetCategoryIDArray[y][x] = testCase.chipSetCategoryIDArray[y - testCase.y - 1][x - testCase.x - 1]
                        chipSetDataIDArray[y][x] = testCase.chipSetDataIDArray[y - testCase.y - 1][x - testCase.x - 1]
                        chipSetNoArray[y][x] = testCase.chipSetNoArray[y - testCase.y - 1][x - testCase.x - 1]
                    }
                }
            }
            return {
                chipSetCategoryIDArray,
                chipSetDataIDArray,
                chipSetNoArray
            }
        }

        const getOverOutOfBoundsArray = (testCase) => {
            const arraySizeX = DEFAULT_COL - testCase.x + 1
            const arraySizeY = DEFAULT_ROW - testCase.y + 1
            const chipSetCategoryIDArray = [arraySizeY]
            const chipSetDataIDArray = [arraySizeY]
            const chipSetNoArray = [arraySizeY]

            for (let y = 0; y < arraySizeY; y += 1) {
                chipSetCategoryIDArray[y] = [arraySizeX]
                chipSetDataIDArray[y] = [arraySizeX]
                chipSetNoArray[y] = [arraySizeX]

                for (let x = 0; x < arraySizeX; x += 1) {
                    if (y + testCase.y >= DEFAULT_ROW || x + testCase.x >= DEFAULT_COL) {
                        chipSetCategoryIDArray[y][x] = OUT_OF_BOUNDS
                        chipSetDataIDArray[y][x] = OUT_OF_BOUNDS
                        chipSetNoArray[y][x] = OUT_OF_BOUNDS
                    } else if (y >= testCase.pSpecifyRangeY || x >= testCase.pSpecifyRangeX) {
                        chipSetCategoryIDArray[y][x] = NOTHING
                        chipSetDataIDArray[y][x] = NOTHING
                        chipSetNoArray[y][x] = NOTHING
                    } else {
                        chipSetCategoryIDArray[y][x] = testCase.chipSetCategoryIDArray[y][x]
                        chipSetDataIDArray[y][x] = testCase.chipSetDataIDArray[y][x]
                        chipSetNoArray[y][x] = testCase.chipSetNoArray[y][x]
                    }
                }
            }
            return {
                chipSetCategoryIDArray,
                chipSetDataIDArray,
                chipSetNoArray
            }
        }

        testCases.forEach((testCase, index) => {
            describe(`case ${index}`, () => {
                it('inside', () => {
                    const mapLayer = getInitializedMapLayer(testCase)
                    expect(mapLayer.getChipSetCategoryIDArray(
                        testCase.x,
                        testCase.y,
                        testCase.pSpecifyRangeX,
                        testCase.pSpecifyRangeY
                    )).to.deep.equal(testCase.chipSetCategoryIDArray)

                    expect(mapLayer.getChipSetDataIDArray(
                        testCase.x,
                        testCase.y,
                        testCase.pSpecifyRangeX,
                        testCase.pSpecifyRangeY
                    )).to.deep.equal(testCase.chipSetDataIDArray)

                    expect(mapLayer.getChipSetNoArray(
                        testCase.x,
                        testCase.y,
                        testCase.pSpecifyRangeX,
                        testCase.pSpecifyRangeY
                    )).to.deep.equal(testCase.chipSetNoArray)
                })

                it('out of bounds ( < 0 )', () => {
                    const mapLayer = getInitializedMapLayer(testCase)
                    const resultArray = getMinusOutOfBoudsArray(testCase)
                    expect(mapLayer.getChipSetCategoryIDArray(-1, -1,
                        testCase.pSpecifyRangeX + testCase.x + 1,
                        testCase.pSpecifyRangeY + testCase.y + 1
                    )).to.deep.equal(resultArray.chipSetCategoryIDArray)
                    expect(mapLayer.getChipSetDataIDArray(-1, -1,
                        testCase.pSpecifyRangeX + testCase.x + 1,
                        testCase.pSpecifyRangeY + testCase.y + 1
                    )).to.deep.equal(resultArray.chipSetDataIDArray)
                    expect(mapLayer.getChipSetNoArray(-1, -1,
                        testCase.pSpecifyRangeX + testCase.x + 1,
                        testCase.pSpecifyRangeY + testCase.y + 1
                    )).to.deep.equal(resultArray.chipSetNoArray)
                })

                it('out of bounds ( >= size )', () => {
                    const mapLayer = getInitializedMapLayer(testCase)
                    const resultArray = getOverOutOfBoundsArray(testCase)
                    expect(mapLayer.getChipSetCategoryIDArray(
                        testCase.x,
                        testCase.y,
                        DEFAULT_COL - testCase.x + 1,
                        DEFAULT_ROW - testCase.y + 1
                    )).to.deep.equal(resultArray.chipSetCategoryIDArray)
                    expect(mapLayer.getChipSetDataIDArray(
                        testCase.x,
                        testCase.y,
                        DEFAULT_COL - testCase.x + 1,
                        DEFAULT_ROW - testCase.y + 1
                    )).to.deep.equal(resultArray.chipSetDataIDArray)
                    expect(mapLayer.getChipSetNoArray(
                        testCase.x,
                        testCase.y,
                        DEFAULT_COL - testCase.x + 1,
                        DEFAULT_ROW - testCase.y + 1
                    )).to.deep.equal(resultArray.chipSetNoArray)
                })
            })
        })
    })
})
