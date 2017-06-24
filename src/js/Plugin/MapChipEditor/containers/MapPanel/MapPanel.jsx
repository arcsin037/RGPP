import {MAP_LAYER_NUM} from '../../constants'
import React, {Component, PropTypes} from 'react'
import {addMap, updateMap} from '../../actions/Map'
import MapData from '../../model/MapData'
import {getStore, loadSaveData} from '../../utils/storeUtil'
import ControllableCanvas from 'Core/components/Base/ControllableCanvas'
import Graphics from 'Core/Graphics'
import RGPP from 'RGPP'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import styles from './MapPanel.scss'

const NumberUtil = RGPP.System.Utils.NumberUtil

class MapPanel extends Component {
  constructor (props) {
    super(props)

    this.mouseCellX = 0
    this.mouseCellY = 0
    this.selectedX = 0
    this.selectedY = 0
    this.isEventLayer = props.currentLayerNo === MAP_LAYER_NUM
    this.onEvent = this.onEvent.bind(this)
  }

  componentWillMount () {
    const { mapSaveData } = this.props
    if (mapSaveData) {
      this.props.addMap(mapSaveData)
    } else {
      this.props.addMap(new MapData())
    }
  }

  onEvent (state) {
    const { ctx } = state
    this.setCtx(this.props, ctx)
    this.onUpdate(this.props, state)
    this.onDraw(ctx)
  }

  setCtx (props, ctx) {
    const { id, mapData, updateMap } = props
    if (mapData) {
      updateMap(id, mapData.setCtx(ctx))
    }
  }

  onUpdate (props, state) {
    this.updateSelectedPos(state)
  }

  updateSelectedPos (state) {
    const {mouseInfo, padInfo} = state
    this.mouseCellX = Math.floor(mouseInfo.x / this.cellWidth)
    this.mouseCellY = Math.floor(mouseInfo.y / this.cellHeight)

    this.mouseCellX = NumberUtil.clamp(this.mouseCellX, 0, this.col - 1)
    this.mouseCellY = NumberUtil.clamp(this.mouseCellY, 0, this.row - 1)
    if (this.isEventLayer) {
      if (mouseInfo.isLeftClick) {
        this.selectedX = this.mouseCellX
        this.selectedY = this.mouseCellY
      }
      if (padInfo.isKeyOnLeft) {
        this.selectedX -= 1
      }
      if (padInfo.isKeyOnRight) {
        this.selectedX += 1
      }
      if (padInfo.isKeyOnUp) {
        this.selectedY -= 1
      }
      if (padInfo.isKeyOnDown) {
        this.selectedY += 1
      }

      this.selectedX = NumberUtil.clamp(this.selectedX, 0, this.col - 1)
      this.selectedY = NumberUtil.clamp(this.selectedY, 0, this.row - 1)
    }
  }

  onDraw (ctx) {
    if (!ctx) {
      return
    }
    Graphics.BasicDraw.clear(ctx)
    this.drawMap(ctx)
    if (this.isEventLayer) {
      this.drawEditSystemImage(ctx)
    } else {
      this.drawVirtualImage(ctx)
    }
  }

  drawEditSystemImage (ctx) {
    ctx.globalAlpha = 1.0
        // draw Green Rectangle in Selected Area
    this.drawCellLargeRect(ctx, this.selectedX, this.selectedY, 0, 255, 0, 1)
  }

  drawCellRect (ctx, x, y, r, g, b, a) {
    Graphics.BasicDraw.setColor(ctx, r, g, b, a)
    Graphics.BasicDraw.drawRect(ctx, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight, 2)
  }

  drawCellLargeRect (ctx, x, y, r, g, b, a) {
    Graphics.BasicDraw.setColor(ctx, r, g, b, a)
    Graphics.BasicDraw.drawRect(ctx, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight, 3)
  }

  drawMap (ctx) {
    const {
      mapData,
      palettesData,
      currentLayerNo
    } = this.props

    if (!mapData || !palettesData) {
      return
    }

    const col = mapData.col
    const row = mapData.row
    const mapChipWidth = mapData.cellWidth
    const mapChipHeight = mapData.cellHeight
    const mapLayers = mapData.layers
    const maxLayerNum = mapLayers.size

    for (let layerNo = 0; layerNo < maxLayerNum; layerNo += 1) {
      if (layerNo !== currentLayerNo && currentLayerNo < maxLayerNum) {
        ctx.globalAlpha = 0.5
      } else {
        ctx.globalAlpha = 1.0
      }
      const layer = mapLayers[layerNo]
      for (let y = 0; y < row; y += 1) {
        for (let x = 0; x < col; x += 1) {
          const chipSetDataID = layer.chipSetDataID(x, y)
          const chipSetNo = layer.chipSetNo(x, y)
          if (chipSetDataID >= 0 && chipSetNo >= 0) {
            const palette = palettesData[chipSetDataID]
            const paletteCol = palette.col
            const paletteChipWidth = palette.chipWidth
            const paletteChipHeight = palette.chipHeight
            const chipX = (chipSetNo % paletteCol) * paletteChipWidth
            const chipY = Math.floor(chipSetNo / paletteCol) * paletteChipHeight
            const option = {
              sx: chipX,
              sy: chipY,
              sw: paletteChipWidth,
              sh: paletteChipHeight,
              dx: x * mapChipWidth,
              dy: y * mapChipHeight,
              dw: mapChipWidth,
              dh: mapChipHeight
            }
            Graphics.BasicDraw.drawImage(ctx, palette.img, option)
          }
        }
      }
    }
  }

  drawVirtualImage (ctx) {
    const {
        mapData,
        selectedPalette,
        palettesData
    } = this.props

    const paletteId = selectedPalette.id
    const selectedPaletteData = palettesData[paletteId]
    if (!selectedPaletteData) {
      return
    }

    const paletteImg = selectedPaletteData.img
    const paletteChipWidth = selectedPaletteData.chipWidth
    const paletteChipHeight = selectedPaletteData.chipHeight

    const scaleX = mapData.cellWidth / paletteChipWidth
    const scaleY = mapData.cellHeight / paletteChipHeight

    ctx.globalAlpha = 0.5

    const startPixelX = selectedPalette.startX * paletteChipWidth
    const startPixelY = selectedPalette.startY * paletteChipHeight
    const specifyRangePixelX = selectedPalette.specifyRangeX * paletteChipWidth
    const specifyRangePixelY = selectedPalette.specifyRangeY * paletteChipHeight

    const option = {
      sx: startPixelX,
      sy: startPixelY,
      sw: specifyRangePixelX,
      sh: specifyRangePixelY,
      dx: this.mouseCellX * mapData.cellWidth,
      dy: this.mouseCellY * mapData.cellHeight,
      dw: specifyRangePixelX * scaleX,
      dh: specifyRangePixelY * scaleY
    }
    Graphics.BasicDraw.drawImage(ctx, paletteImg, option)
  }

  render () {
    const isLoaded = this.props.palettesData.some((data) => (!!data && !!data.img))
    const width = isLoaded
            ? RGPP.Config.RESOLUTION_X
            : 0
    const height = isLoaded
            ? RGPP.Config.RESOLUTION_Y
            : 0
    return (
      <div className={styles.MapPanel}>
        <ControllableCanvas width={width} height={height} onEvent={this.onEvent} />
      </div>
    )
  }
}

MapPanel.propTypes = {
  id: PropTypes.number.isRequired,
  mapData: PropTypes.object,
  palettesData: PropTypes.array.isRequired,
  currentLayerNo: PropTypes.number.isRequired,
  selectedPalette: PropTypes.object.isRequired,
  mapSaveData: PropTypes.object,
  drawMode: PropTypes.string.isRequired,
  addMap: PropTypes.func.isRequired,
  updateMap: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const store = getStore(state)
  const saveData = loadSaveData(state)
  const mapSaveData = saveData && saveData.maps && saveData.maps.data && saveData.maps.data[ownProps.id]
  return {
    mapData: store.maps.data.get(ownProps.id),
    palettesData: store.palettes.data,
    selectedPalette: store.palettes.selected,
    currentLayerNo: store.maps.selected.get('currentLayerNo'),
    drawMode: store.palettes.context.drawMode,
    mapSaveData
  }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  addMap,
  updateMap
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel)
