import React, {Component, PropTypes} from 'react'
import {addPalette, setSelectionRange} from '../../actions/Palette'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import PaletteImage from 'Image/User/MapChip/mack_material.png'
import RGPP from 'RGPP'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getStore} from '../../utils/storeUtil'
import styles from './PalettePanel.scss'

const BasicDraw = RGPP.System.Graphics.BasicDraw
const NumberUtil = RGPP.System.Utils.NumberUtil
const Palette = RGPP.System.Palette

class PalettePanel extends Component {
    constructor(props) {
        super(props)

        this.selectedX = 0
        this.selectedY = 0
        this.startX = 0
        this.startY = 0
        this.startPixelX = 0
        this.startPixelY = 0
        this.onEvent = this.onEvent.bind(this)
        this.onLoad = this.onLoad.bind(this)

        this.specifyRangeX = 1
        this.specifyRangeY = 1
        this.palette = new Palette({img: PaletteImage, onLoad: this.onLoad})
    }

    onLoad() {
        this.props.addPalette(this.ctx, this.palette)
    }

    onEvent(state) {
        const {ctx} = state
        if (!this.ctx) {
            this.ctx = ctx
        }
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
            const x = NumberUtil.clamp(selectedX, 0, this.palette.col - 1)
            const y = NumberUtil.clamp(selectedY, 0, this.palette.row - 1)
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
        this.selectedX = NumberUtil.clamp(this.selectedX, 0, this.palette.col - this.specifyRangeX)
        this.selectedY = NumberUtil.clamp(this.selectedY, 0, this.palette.row - this.specifyRangeY)
    }

    updateSelectionRange(mouseInfo, padInfo) {
        this.startX = this.selectedX
        if (this.specifyRangeX < 0) {
            this.startX += this.specifyRangeX + 1
        }
        this.startPixelX = this.startX * this.palette.chipWidth

        this.startY = this.selectedY
        if (this.specifyRangeY < 0) {
            this.startY += this.specifyRangeY + 1
        }
        this.startPixelY = this.startY * this.palette.chipHeight

        this.specifyRangePixelX = this.palette.chipWidth * Math.abs(this.specifyRangeX)
        this.specifyRangePixelY = this.palette.chipHeight * Math.abs(this.specifyRangeY)

        if (mouseInfo.isLeftUp || padInfo.isKeyOnDirection) {
            this.props.setSelectionRange({
                id: this.palette.id,
                startX: this.startX,
                startY: this.startY,
                specifyRangeX: Math.abs(this.specifyRangeX),
                specifyRangeY: Math.abs(this.specifyRangeY),
                chipNoArray: this.getSelectedChipNoArray()
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

    getSelectedChipNoArray() {
        const absSpecifyRangeX = Math.abs(this.specifyRangeX)
        const absSpecifyRangeY = Math.abs(this.specifyRangeY)
        const chipNoArray = []
        for (let y = 0; y < absSpecifyRangeY; y += 1) {
            const tmpChipNo = (this.startY + y) * this.palette.col
            chipNoArray[y] = []
            for (let x = 0; x < absSpecifyRangeX; x += 1) {
                const tmpX = this.startX + x
                const chipNo = tmpChipNo + tmpX
                chipNoArray[y][x] = chipNo
            }
        }
        return chipNoArray
    }

    render() {
        const {paletteWidth, paletteHeight} = this.props
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
    const store = getStore(state)
    const paletteId = store.palettes.selected.id
    const selectedPalette = store.palettes.data[paletteId]
    let paletteWidth = 0
    let paletteHeight = 0
    if (selectedPalette) {
        const paletteImg = selectedPalette.img
        paletteWidth = paletteImg.width
        paletteHeight = paletteImg.height
    }

    return {paletteWidth, paletteHeight}
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addPalette,
    setSelectionRange
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(PalettePanel)
