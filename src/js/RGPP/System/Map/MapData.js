import * as BasicDraw from '../Graphics/Base/BasicDraw'
import MapLayer from './MapLayer'

const DOT_MODE = 0
const SQUARE_MODE = 1
const AREA_FILL_MODE = 2
const ERASER_MODE = 3

const MAP_LAYER_NUM = 3

export class MapData {
    constructor(spec = {}) {
        // Create Map Layer
        this.mapLayers = [MAP_LAYER_NUM]

        this.col = spec.col
        this.row = spec.row
        this.chipWidth = spec.chipWidth
        this.chipHeight = spec.chipHeight
        this.currentLayerNo = 0

        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            this.mapLayers[layerNo] = new MapLayer({
                col: this.col,
                row: this.row
            })
        }
    }

    onDraw(ctx) {
        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            if (layerNo !== this.currentLayerNo && this.currentLayerNo < MAP_LAYER_NUM) {
                ctx.globalAlpha = 0.5
            }
            else {
                ctx.globalAlpha = 1.0
            }
            for (let y = 0; y < this.row; y += 1) {
                for (let x = 0; x < this.col; x += 1) {
                    // draw Red Rectangle
                    this.drawCellRect(ctx, x, y, 255, 0, 0, 1)
                }
            }
        }
    }

    drawCellRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.chipWidth, y * this.chipHeight, this.chipWidth, this.chipHeight, 2)
    }

    getTagData(x, y) {
        let tagData = -1
        for (let layerNo = 0; layerNo < MAP_LAYER_NUM; layerNo += 1) {
            const chipSetCategoryID = this.mapLayers[layerNo].chipSetCategoryID(x, y)
            const chipSetDataID = this.mapLayers[layerNo].chipSetDataID(x, y)
            const chipSetNo = this.mapLayers[layerNo].chipSetNo(x, y)
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

}

export default MapData
