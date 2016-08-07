import React, {Component} from 'react'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import PaletteImage from 'Image/User/MapChip/mack_material.png'
import RGPP from 'RGPP'
import styles from './PalettePanel.scss'

const CHIP_WIDTH = 32
const CHIP_HEIGHT = 32
const BasicDraw = RGPP.System.Graphics.BasicDraw
const NumberUtil = RGPP.System.Utils.NumberUtil

class PalettePanel extends Component {

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

        this.paletteImage = BasicDraw.loadImage('Image/User/MapChip/mack_material.png')

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
        // BasicDraw.drawImage(ctx, this.paletteImage)
    }

    render() {
        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y
        return (
            <div className={styles.PalettePanel}>
                <ControllableCanvas width={width} height={height} onEvent={this.onEvent}/>
            </div>
        )
    }

}

export default PalettePanel
