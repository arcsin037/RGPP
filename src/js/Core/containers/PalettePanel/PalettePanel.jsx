import React, {Component, PropTypes} from 'react'
import {addPalette, setSelectionRange} from 'Core/actions/Palette'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import PaletteImage from 'Image/User/MapChip/mack_material.png'
import RGPP from 'RGPP'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styles from './PalettePanel.scss'

const BasicDraw = RGPP.System.Graphics.BasicDraw
const NumberUtil = RGPP.System.Utils.NumberUtil
const Palette = RGPP.System.Palette

class PalettePanel extends Component {
    constructor(props) {
        super(props)

        this.selectedX = 0
        this.selectedY = 0
        this.startPixelX = 0
        this.startPixelY = 0
        this.onEvent = this.onEvent.bind(this)
        this.onLoad = this.onLoad.bind(this)

        this.specifyRangeX = 1
        this.specifyRangeY = 1
        this.palette = new Palette({
            img: PaletteImage,
            onLoad: this.onLoad
        })
    }

    onLoad() {
        this.props.addPalette(this.palette)
    }

    onEvent(state) {
        const {ctx} = state
        this.onUpdate(state)
        this.onDraw(ctx)
    }

    onUpdate(state) {
        const {mouseInfo, padInfo} = state
        this.updateSelectedPos(mouseInfo, padInfo)
        this.updateSelectionRange(mouseInfo, padInfo)
    }

    updateSelectedPos(mouseInfo, padInfo) {
        const selectedX = Math.floor(mouseInfo.x / this.palette.chipWidth)
        const selectedY = Math.floor(mouseInfo.y / this.palette.chipHeight)
        if (mouseInfo.isLeftClick) {
            this.selectedX = selectedX
            this.selectedY = selectedY
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

        if (mouseInfo.isLeftDragged) {
            const x = NumberUtil.clamp(selectedX, 0, this.palette.maxCol - 1)
            const y = NumberUtil.clamp(selectedY, 0, this.palette.maxRow - 1)
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
        this.selectedX = NumberUtil.clamp(this.selectedX, 0, this.palette.maxCol - this.specifyRangeX)
        this.selectedY = NumberUtil.clamp(this.selectedY, 0, this.palette.maxRow - this.specifyRangeY)
    }

    updateSelectionRange(mouseInfo, padInfo) {
        this.startPixelX = this.selectedX
        if (this.specifyRangeX < 0) {
            this.startPixelX += this.specifyRangeX + 1
        }
        this.startPixelX *= this.palette.chipWidth

        this.startPixelY = this.selectedY
        if (this.specifyRangeY < 0) {
            this.startPixelY += this.specifyRangeY + 1
        }
        this.startPixelY *= this.palette.chipHeight

        this.specifyRangePixelX = this.palette.chipWidth * Math.abs(this.specifyRangeX)
        this.specifyRangePixelY = this.palette.chipHeight * Math.abs(this.specifyRangeY)

        if (mouseInfo.isLeftUp || padInfo.isKeyOnDirection) {
            this.props.setSelectionRange({
                id: this.palette.id,
                startPixelX: this.startPixelX,
                startPixelY: this.startPixelY,
                specifyRangePixelX: this.specifyRangePixelX,
                specifyRangePixelY: this.specifyRangePixelY
            })
        }
    }

    onDraw(ctx) {
        if (!ctx) {
            return
        }
        BasicDraw.clear(ctx)
        this.palette.onDraw(ctx)
        this.drawEditSystemImage(ctx)
    }

    drawEditSystemImage(ctx) {
        ctx.globalAlpha = 1.0

        if (this.startPixelX >= 0 && this.startPixelX < this.palette.width && this.startPixelY >= 0 && this.startPixelY < this.palette.height) {
            BasicDraw.setColor(ctx, 244, 255, 0, 1)
            BasicDraw.drawRect(ctx, this.startPixelX, this.startPixelY, this.specifyRangePixelX, this.specifyRangePixelY, 2)
        }
    }

    drawCellLargeRect(ctx, x, y, r, g, b, a) {
        BasicDraw.setColor(ctx, r, g, b, a)
        BasicDraw.drawRect(ctx, x * this.palette.chipWidth, y * this.palette.chipHeight, this.palette.chipWidth, this.palette.chipHeight, 3)
    }

    render() {
        const {
            paletteWidth,
            paletteHeight
        } = this.props
        return (
            <div className={styles.PalettePanel}>
                <ControllableCanvas width={paletteWidth} height={paletteHeight} onEvent={this.onEvent}/>
            </div>
        )
    }
}

PalettePanel.propTypes = {
    paletteWidth: PropTypes.number.isRequired,
    paletteHeight: PropTypes.number.isRequired,
    addPalette: PropTypes.func.isRequired,
    setSelectionRange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    const paletteId = state.palette.selection.id
    const selectedPalette = state.palette.palettes[paletteId]
    let paletteWidth = 0
    let paletteHeight = 0
    if (selectedPalette) {
        const paletteImg = state.palette.palettes[paletteId].img
        paletteWidth = paletteImg.width
        paletteHeight = paletteImg.height
    }

    return {
        paletteWidth,
        paletteHeight
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addPalette,
    setSelectionRange
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(PalettePanel)
