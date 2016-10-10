export const NOTHING = -1
export const OUT_OF_BOUNDS = -2

export const DEFAULT_COL = 20
export const DEFAULT_ROW = 15

export class MapLayer {
    constructor({
        col = DEFAULT_COL,
        row = DEFAULT_ROW,
        layer = {}
    } = {}) {
        this.col = col
        this.row = row
        this.chipSetDataIDArray = layer.chipSetDataIDArray
        this.chipSetNoArray = layer.chipSetNoArray
        if (!this.chipSetDataIDArray || !this.chipSetNoArray) {
            this.initData()
        }
    }

    initData() {
        this.chipSetDataIDArray = []
        this.chipSetNoArray = []
        for (let y = 0; y < this.row; ++y) {
            this.chipSetDataIDArray[y] = []
            this.chipSetNoArray[y] = []
            for (let x = 0; x < this.col; ++x) {
                this.chipSetDataIDArray[y][x] = NOTHING
                this.chipSetNoArray[y][x] = NOTHING
            }
        }
    }
    setData(x, y, chipSetDataID, chipSetNo) {
        if (x >= 0 && x < this.col && y >= 0 && y < this.row) {
            this.chipSetDataIDArray[y][x] = chipSetDataID
            this.chipSetNoArray[y][x] = chipSetNo
        }
    }

    chipSetDataID(x, y) {
        if (x < 0 || x >= this.col || y < 0 || y >= this.row) {
            return OUT_OF_BOUNDS
        }
        return this.chipSetDataIDArray[y][x]
    }

    chipSetNo(x, y) {
        if (x < 0 || x >= this.col || y < 0 || y >= this.row) {
            return OUT_OF_BOUNDS
        }
        return this.chipSetNoArray[y][x]
    }

    getChipSetDataIDArray(x, y, pSpecifyRangeX, pSpecifyRangeY) {
        return this.getPartArray(x, y, pSpecifyRangeX, pSpecifyRangeY, this.chipSetDataIDArray)
    }

    getChipSetNoArray(x, y, pSpecifyRangeX, pSpecifyRangeY) {
        return this.getPartArray(x, y, pSpecifyRangeX, pSpecifyRangeY, this.chipSetNoArray)
    }

    getPartArray(x, y, pSpecifyRangeX, pSpecifyRangeY, arrayData) {
        const absPaletteSpecifyRangeX = Math.abs(pSpecifyRangeX)
        const absPaletteSpecifyRangeY = Math.abs(pSpecifyRangeY)

        const ret = [absPaletteSpecifyRangeY]

        for (let i = 0; i < absPaletteSpecifyRangeY; i += 1) {
            ret[i] = [absPaletteSpecifyRangeX]
            for (let j = 0; j < absPaletteSpecifyRangeX; j += 1) {
                const dstX = j + x
                const dstY = i + y
                if (0 <= dstX && dstX < this.col && 0 <= dstY && dstY < this.row) {
                    ret[i][j] = arrayData[dstY][dstX]
                } else {
                    ret[i][j] = OUT_OF_BOUNDS
                }
            }
        }
        return ret
    }
}

export default MapLayer
