class SelectionRange {
  constructor ({
        id,
        startX = 0,
        startY = 0,
        specifyRangeX = 1,
        specifyRangeY = 1
    }) {
    this.id = id
    this.startX = startX
    this.startY = startY
    this.specifyRangeX = specifyRangeX
    this.specifyRangeY = specifyRangeY
  }
}

export default SelectionRange
