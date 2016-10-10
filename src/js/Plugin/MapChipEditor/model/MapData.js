import * as BasicDraw from 'RGPP/System/Graphics/Base/BasicDraw'
import MapLayer, {NOTHING} from './MapLayer'
import {MAP_LAYER_NUM} from '../constants'

export class MapData {
    constructor({
        id = 0,
        col,
        row,
        chipWidth,
        chipHeight,
        layers = []
    }) {
        // Create Map Layer
        this.layers = [MAP_LAYER_NUM]
        this.id = id || id++
        this.col = col
        this.row = row
        this.chipWidth = chipWidth
        this.chipHeight = chipHeight

        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            this.layers[layerNo] = new MapLayer({
                col: this.col,
                row: this.row,
                layer: layers[layerNo]
            })
        }
    }

    drawCellRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.chipWidth, y * this.chipHeight, this.chipWidth, this.chipHeight, 2)
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
        return this.col * this.chipWidth
    }

    getFieldHeight() {
        return this.row * this.chipHeight
    }

    chipWidth() {
        return this.chipWidth
    }

    chipHeight() {
        return this.chipHeight
    }

    initData() {
        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            for (let y = 0; y < this.row; y += 1) {
                for (let x = 0; x < this.col; x += 1) {
                    this.layers[layerNo].setData(x, y, 0, NOTHING)
                }
            }
        }
    }

}

export default MapData
