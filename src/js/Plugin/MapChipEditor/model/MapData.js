import Graphics from 'Core/Graphics'

import {
    DEFAULT_COL,
    DEFAULT_ROW,
    MAP_CELL_HEIGHT,
    MAP_CELL_WIDTH
} from '../constants'
import {List, Record} from 'immutable'

const MapDataRecord = Record({
  id: 0,
  col: DEFAULT_COL,
  row: DEFAULT_ROW,
  cellWidth: MAP_CELL_WIDTH,
  cellHeight: MAP_CELL_HEIGHT,
  ctx: null,
  layers: List()
})

export class MapData extends MapDataRecord {
  setCtx (ctx) {
    return this.set('ctx', ctx)
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
