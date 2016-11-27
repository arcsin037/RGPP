import {
    DEFAULT_COL,
    DEFAULT_ROW,
    MAP_CELL_HEIGHT,
    MAP_CELL_WIDTH
    // MAP_LAYER_NUM
} from '../constants'
// import Graphics from 'Core/Graphics'
// import MapLayer from './MapLayer'
import {List, Map} from 'immutable'

export const MapData = Map({
  id: 0,
  col: DEFAULT_COL,
  row: DEFAULT_ROW,
  cellWidth: MAP_CELL_WIDTH,
  cellHeight: MAP_CELL_HEIGHT,
  layers: List()
})

/*
export class MapData {
  constructor ({
        id = 0,
        col = DEFAULT_COL,
        row = DEFAULT_ROW,
        cellWidth = MAP_CELL_WIDTH,
        cellHeight = MAP_CELL_HEIGHT,
        layers = []
    } = {}) {
    // super()
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

  drawCellRect (ctx, x, y, r, g, b, a) {
    Graphics.BasicDraw.setColor(ctx, r, g, b, a)
    Graphics.BasicDraw.drawRect(ctx, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight, 2)
  }

  getFieldWidth () {
    return this.col * this.cellWidth
  }

  getFieldHeight () {
    return this.row * this.cellHeight
  }
}
*/

export default MapData
