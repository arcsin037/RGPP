import React, {Component} from 'react'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import RGPP from 'RGPP'
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

        this.mapData = new MapData({
            col: this.col,
            row: this.row,
            chipWidth: this.chipWidth,
            chipHeight: this.chipHeight
        })
    }

    onEvent(state) {
        const {ctx} = state
        BasicDraw.clear(ctx)
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
        this.drawMap(ctx)
        this.drawEditSystemImage(ctx)
    }

    drawEditSystemImage(ctx) {
        ctx.globalAlpha = 1.0
        // draw Green Rectangle in Selected Area
        this.drawCellLargeRect(ctx, this.selectedX, this.selectedY, 0, 255, 0, 1)
    }

    drawMap(ctx) {
        this.mapData.onDraw(ctx)
    }

    drawCellRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.chipWidth, y * this.chipHeight, this.chipWidth, this.chipHeight, 2)
    }

    drawCellLargeRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.chipWidth, y * this.chipHeight, this.chipWidth, this.chipHeight, 3)
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

export default MapPanel
