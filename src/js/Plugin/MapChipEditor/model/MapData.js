import {
    DEFAULT_COL,
    DEFAULT_ROW,
    MAP_CELL_HEIGHT,
    MAP_CELL_WIDTH
} from '../constants'
import Graphics from 'Core/Graphics'
import MapLayer from './MapLayer'
import {List, Map, Record} from 'immutable'

// const defaultLayers = List([
//   new Map(new MapLayer()),
//   new Map(new MapLayer()),
//   new Map(new MapLayer())
// ])

export class MapData extends Record({
  id: 0,
  col: DEFAULT_COL,
  row: DEFAULT_ROW,
  cellWidth: MAP_CELL_WIDTH,
  cellHeight: MAP_CELL_HEIGHT,
  ctx: null,
  layers: List()
}) {
  constructor ({
    layers
  } = {}) {
    super()
    console.log(this.layers)
    layers.forEach((layer, index) => {
      console.log(this, layer)
      this.layers.push(new Map({
        chipSetDataIDArray: layer.chipSetDataIDArray,
        chipSetNoArray: layer.chipSetNoArray
      }))
    })
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

export default MapData
