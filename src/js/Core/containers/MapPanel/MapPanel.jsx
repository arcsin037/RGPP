import React, {Component, PropTypes} from 'react'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import RGPP from 'RGPP'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styles from './MapPanel.scss'

const CHIP_WIDTH = 32
const CHIP_HEIGHT = 32

const BasicDraw = RGPP.System.Graphics.BasicDraw
const NumberUtil = RGPP.System.Utils.NumberUtil
const MapData = RGPP.System.Map.MapData

class MapPanel extends Component {
    constructor(props) {
        super(props)
        this.selectedX = 0
        this.selectedY = 0
        this.onEvent = this.onEvent.bind(this)
        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y

        this.chipWidth = CHIP_WIDTH
        this.chipHeight = CHIP_HEIGHT
        this.col = Math.floor(width / this.chipWidth)
        this.row = Math.floor(height / this.chipHeight)

        this.mapData = new MapData({col: this.col, row: this.row, chipWidth: this.chipWidth, chipHeight: this.chipHeight})
    }

    onEvent(state) {
        const {ctx} = state
        this.onUpdate(state)
        this.onDraw(ctx)
    }

    onUpdate(state) {
        const {mouseInfo, padInfo} = state
        this.updateSelectedPos(mouseInfo, padInfo)
    }

    updateSelectedPos(mouseInfo, padInfo) {
        if (mouseInfo.isLeftClick) {
            this.selectedX = Math.floor(mouseInfo.x / this.chipWidth)
            this.selectedY = Math.floor(mouseInfo.y / this.chipHeight)
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

    onDraw(ctx) {
        if (!ctx) {
            return
        }
        BasicDraw.clear(ctx)
        this.drawVirtualImage(ctx)
        this.drawMap(ctx)
        this.drawEditSystemImage(ctx)
    }

    drawMap(ctx) {
        this.mapData.onDraw(ctx)
    }

    drawVirtualImage(ctx) {
        const {
            selection,
            paletteImg,
            chipScaleX,
            chipScaleY
        } = this.props

        if (!paletteImg) {
            return
        }

        ctx.globalAlpha = 0.5

        const option = {
            sx: selection.startPixelX,
            sy: selection.startPixelY,
            sw: selection.specifyRangePixelX,
            sh: selection.specifyRangePixelY,
            dx: this.selectedX * this.chipWidth,
            dy: this.selectedY * this.chipHeight,
            dw: selection.specifyRangePixelX * chipScaleX,
            dh: selection.specifyRangePixelY * chipScaleY
        }
        BasicDraw.drawImage(ctx, paletteImg, option)
    }

    drawEditSystemImage(ctx) {
        ctx.globalAlpha = 1.0
        // draw Green Rectangle in Selected Area
        this.drawCellLargeRect(ctx, this.selectedX, this.selectedY, 0, 255, 0, 1)
    }


    drawCellRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.chipWidth, y * this.chipHeight, this.chipWidth, this.chipHeight, 2)
    }

    drawCellLargeRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.chipWidth, y * this.chipHeight, this.chipWidth, this.chipHeight, 3)
    }

    drawSelectedImage(ctx, dstX, dstY, mapChipWidth, mapChipHeight) {
        const scaleX = mapChipWidth / this.chipWidth
        const scaleY = mapChipHeight / this.chipHeight

        const option = {
            sx: this.startPixelX,
            sy: this.startPixelY,
            sw: this.specifyRangePixelX,
            sh: this.specifyRangePixelY,
            dx: dstX,
            dy: dstY,
            dw: this.specifyRangePixelX * scaleX,
            dh: this.specifyRangePixelY * scaleY
        }
        BasicDraw.drawImage(ctx, this.paletteImage, option)
    }

    drawChipImage(ctx, dstX, dstY, chipNo, mapChipWidth, mapChipHeight) {
        const chipX = chipNo % this.chipMaxWidth
        const chipY = Math.floor(chipNo / this.chipMaxWidth)
        const option = {
            sx: chipX * this.chipWidth,
            sy: chipY * this.chipHeight,
            sw: this.chipWidth,
            sh: this.chipHeight,
            dx: dstX,
            dy: dstY,
            dw: mapChipWidth,
            dh: mapChipHeight
        }
        BasicDraw.drawImage(ctx, this.paletteImage, option)
    }

    render() {
        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y
        return (
            <div className={styles.MapPanel}>
                <ControllableCanvas width={width} height={height} onEvent={this.onEvent}/>
            </div>
        )
    }
}

MapPanel.propTypes = {
    selection: PropTypes.object.isRequired,
    paletteImg: PropTypes.element,
    chipScaleX: PropTypes.number.isRequired,
    chipScaleY: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
    const selection = state.palette.selection
    const paletteId = selection.id
    const selectedPalette = state.palette.palettes[paletteId]
    let paletteImg
    if (selectedPalette) {
        paletteImg = state.palette.palettes[paletteId].img
    }

    return {
        selection,
        paletteImg
    }

}

const mapDispatchToProps = (dispatch) => (bindActionCreators({

}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel)
