import { Record, List } from 'immutable'
import Selected from './selected'

const MapsRecord = Record({
  selected: new Selected(),
  data: List()
})

class MapsModel extends MapsRecord {
  addMap (mapData) {
    return this.set('data', this.data.push(mapData))
  }
  updateMap (index, mapData) {
    return this.setIn(['data', index], mapData)
  }
}

export default MapsModel
