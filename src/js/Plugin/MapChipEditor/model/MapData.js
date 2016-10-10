import {
    DEFAULT_COL,
    DEFAULT_ROW,
    MAP_CELL_HEIGHT,
    MAP_CELL_WIDTH,
    MAP_LAYER_NUM
} from '../constants'
import Graphics from 'Core/Graphics'
import MapLayer from './MapLayer'

export class MapData {
    constructor({
        id = 0,
        col = DEFAULT_COL,
        row = DEFAULT_ROW,
        cellWidth = MAP_CELL_WIDTH,
        cellHeight = MAP_CELL_HEIGHT,
        layers = []
    } = {}) {
        // Create Map Layer
        this.layers = [MAP_LAYER_NUM]
        this.id = id
        this.col = col
        this.row = row
        this.cellWidth = cellWidth
        this.cellHeight = cellHeight

        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            this.layers[layerNo] = new MapLayer({
                col: this.col,
                row: this.row,
                layer: layers[layerNo]
            })
        }
    }

    drawCellRect(ctx, x, y, r, g, b, a) {
        Graphics.BasicDraw.setColor(ctx, r, g, b, a)
        Graphics.BasicDraw.drawRect(ctx, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight, 2)
    }

    getTagData(x, y) {
        let tagData = -1
        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            const chipSetCategoryID = this.layers[layerNo].chipSetCategoryID(x, y)
            const chipSetDataID = this.layers[layerNo].chipSetDataID(x, y)
            const chipSetNo = this.layers[layerNo].chipSetNo(x, y)
            const md = RGPP.System.MapChipDataBase.getInstance()
            if (chipSetCategoryID >= 0 && chipSetDataID >= 0 && chipSetNo >= 0) {
                let tmp = md.getTagData(chipSetCategoryID, chipSetDataID, chipSetNo)
                if (tmp < 0) {
                    tmp = 0
                }
                if (tmp > tagData) {
                    tagData = tmp
                }
            }
        }
        return tagData
    }

    getFieldWidth() {
        return this.col * this.cellWidth
    }

    getFieldHeight() {
        return this.row * this.cellHeight
    }
}

export default MapData
