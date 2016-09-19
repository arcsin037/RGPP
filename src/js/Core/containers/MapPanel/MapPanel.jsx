import React, {Component, PropTypes} from 'react'
import {addMap, setCtx, setMapChip} from 'Core/actions/Map'
import {drawMap, drawVirtualImage} from './MapUtil'
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

        this.mouseCellX = 0
        this.mouseCellY = 0
        this.selectedX = 0
        this.selectedY = 0
        this.currentLayerNo = 0

        this.onEvent = this.onEvent.bind(this)

        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y

        this.chipWidth = CHIP_WIDTH
        this.chipHeight = CHIP_HEIGHT
        this.col = Math.floor(width / this.chipWidth)
        this.row = Math.floor(height / this.chipHeight)

        const mapData = new MapData({col: this.col, row: this.row, chipWidth: this.chipWidth, chipHeight: this.chipHeight})
        mapData.initTestData()
        this.props.addMap(mapData)
    }

    onEvent(state) {
        const {ctx} = state
        if (!this.ctx) {
            this.ctx = ctx
            const {
                id,
                setCtx
            } = this.props
            setCtx(id, ctx)
        }
        this.onUpdate(state)
        this.onDraw(ctx)
    }

    onUpdate(state) {
        this.updateSelectedPos(state)
        this.updateMap(state)
    }

    updateSelectedPos(state) {
        const {mouseInfo, padInfo} = state
        this.mouseCellX = Math.floor(mouseInfo.x / this.chipWidth)
        this.mouseCellY = Math.floor(mouseInfo.y / this.chipHeight)
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

    updateMap(state) {
        const {mouseInfo} = state
        if (mouseInfo.isLeftClick) {
            const {
                id,
                selected: selectedPalette,
                setMapChip
            } = this.props
            setMapChip({
                id,
                currentLayerNo: this.currentLayerNo,
                selectedX: this.selectedX,
                selectedY: this.selectedY,
                selectedPalette
            })
        }

    }

    onDraw(ctx) {
        if (!ctx) {
            return
        }
        BasicDraw.clear(ctx)
        drawMap(ctx, this)
        drawVirtualImage(ctx, this)
        this.drawEditSystemImage(ctx)
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

    render() {
        const isLoaded = this.props.palettesData.some((data) => (!!data && !!data.img))
        const width = isLoaded
            ? RGPP.Config.RESOLUTION_X
            : 0
        const height = isLoaded
            ? RGPP.Config.RESOLUTION_Y
            : 0
        return (
            <div className={styles.MapPanel}>
                <ControllableCanvas width={width} height={height} onEvent={this.onEvent}/>
            </div>
        )
    }
}

MapPanel.propTypes = {
    id: PropTypes.number.isRequired,
    mapData: PropTypes.object,
    selected: PropTypes.object.isRequired,
    palettesData: PropTypes.array.isRequired,
    addMap: PropTypes.func.isRequired,
    setCtx: PropTypes.func.isRequired,
    setMapChip: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    mapData: state.maps.data[ownProps.id],
    selected: state.palettes.selected,
    palettesData: state.palettes.data
})

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addMap,
    setCtx,
    setMapChip
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel)
