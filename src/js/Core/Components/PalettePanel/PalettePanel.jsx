import React, {Component} from 'react'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import PaletteImage from 'Image/User/MapChip/mack_material.png'
import RGPP from 'RGPP'
import styles from './PalettePanel.scss'

const CHIP_WIDTH = 32
const CHIP_HEIGHT = 32
const BasicDraw = RGPP.System.Graphics.BasicDraw
const ImageUtil = RGPP.System.Graphics.ImageUtil
const NumberUtil = RGPP.System.Utils.NumberUtil

class PalettePanel extends Component {
    constructor(props) {
        super(props)

        this.selectedX = 0
        this.selectedY = 0
        this.startPixelX = 0
        this.startPixelY = 0
        this.onEvent = this.onEvent.bind(this)
        this.onLoadImage = this.onLoadImage.bind(this)

        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y

        this.chipWidth = CHIP_WIDTH
        this.chipHeight = CHIP_HEIGHT
        this.specifyRangeX = this.chipWidth
        this.specifyRangeY = this.chipHeight

        this.col = Math.floor(width / this.chipWidth)
        this.row = Math.floor(height / this.chipHeight)

        this.paletteImage = ImageUtil.loadImage(PaletteImage, this.onLoadImage)
    }

    componentWillMount() {
        this.setState({paletteWidth: 0, paletteHeight: 0})
    }

    onLoadImage() {
        this.paletteWidth = this.paletteImage.width
        this.paletteHeight = this.paletteImage.height
        this.chipMaxWidth = Math.floor(this.paletteWidth / this.chipWidth)
        this.chipMaxHeight = Math.floor(this.paletteHeight / this.chipHeight)

        this.setState({paletteWidth: this.paletteImage.width, paletteHeight: this.paletteImage.height})
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
            this.specifyRangeX = 1
            this.specifyRangeY = 1
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

        if (mouseInfo.isDragged) {
            const x = Math.floor(mouseInfo.x / this.chipWidth)
            const y = Math.floor(mouseInfo.y / this.chipHeight)
            const diffX = x - this.selectedX
            const diffY = y - this.selectedY

            if (diffX < 0) {
                this.specifyRangeX = diffX - 1
            } else {
                this.specifyRangeX = diffX + 1
            }

            if (diffY < 0) {
                this.specifyRangeY = diffY - 1
            } else {
                this.specifyRangeY = diffY + 1
            }
        }
        this.selectedX = NumberUtil.clamp(this.selectedX, 0, this.chipMaxWidth - this.specifyRangeX)
        this.selectedY = NumberUtil.clamp(this.selectedY, 0, this.chipMaxHeight - this.specifyRangeY)
    }

    onDraw(ctx) {
        if (!ctx) {
            return
        }
        BasicDraw.clear(ctx)
        BasicDraw.drawImage(ctx, this.paletteImage)
        this.drawEditSystemImage(ctx)
    }

    drawEditSystemImage(ctx) {
        ctx.globalAlpha = 1.0
        // draw Green Rectangle in Selected Area
        // this.drawCellLargeRect(ctx, this.selectedX, this.selectedY, 0, 255, 0, 1)
        this.startPixelX = this.selectedX
        if (this.specifyRangeX < 0) {
            this.startPixelX += this.specifyRangeX + 1
        }
        this.startPixelX *= this.chipWidth

        this.startPixelY = this.selectedY
        if (this.specifyRangeY < 0) {
            this.startPixelY += this.specifyRangeY + 1
        }
        this.startPixelY *= this.chipHeight

        this.specifyRangePixelX = CHIP_WIDTH * Math.abs(this.specifyRangeX)
        this.specifyRangePixelY = CHIP_HEIGHT * Math.abs(this.specifyRangeY)

        if (this.startPixelX >= 0 && this.startPixelX < this.paletteWidth && this.startPixelY >= 0 && this.startPixelY < this.paletteHeight) {
            BasicDraw.setColor(ctx, 244, 255, 0, 1)
            BasicDraw.drawRect(ctx, this.startPixelX, this.startPixelY, this.specifyRangePixelX, this.specifyRangePixelY, 2)
        }
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
        BasicDraw.drawImage(ctx, PaletteImage, option)
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
        BasicDraw.drawImage(ctx, PaletteImage, option)
    }

    render() {
        return (
            <div className={styles.PalettePanel}>
                <ControllableCanvas width={this.state.paletteWidth} height={this.state.paletteHeight} onEvent={this.onEvent}/>
            </div>
        )
    }

}

export default PalettePanel
