import {MAP_LAYER_NUM} from '../constants'
import {Record} from 'immutable'

const SelectedRecord = Record({
  id: 0,
  startX: 0,
  startY: 0,
  specifyRangeX: 1,
  specifyRangeY: 1,
  currentMapID: 0,
  currentLayerNo: MAP_LAYER_NUM
})

class Selected extends SelectedRecord {
  setCurrentMapID (id) {
    return this.set('currentMapID', id)
  }

  setCurrentLayerNo (layerNo) {
    return this.set('currentLayerNo', layerNo)
  }
}
export default Selected
