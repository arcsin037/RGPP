import React, {Component} from 'react'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import RGPP from 'RGPP'
import styles from './MapPanel.scss'

const DOT_MODE = 0
const SQUARE_MODE = 1
const AREA_FILL_MODE = 2
const ERASER_MODE = 3

const MAP_LAYER_NUM = 3

class MapPanel extends Component {

    constructor(props) {
        super(props)
        this.onEvent = this.onEvent.bind(this)
    }

    componentWillMount() {
        this.setState({
        })
    }

    onEvent(state) {
        this.setState(state)
        console.log(state)
    }

    drawEventLayer() {
        const { ctx } = this.state
        ctx.globalAlpha = 1.0

    }

    drawCellRect2 (x, y, r, g, b, a) {
        setColor(mCtx, r, g, b, a)
        fundDrawing.drawRect(mCtx,
            x * CHIP_WIDTH, y * CHIP_HEIGHT, CHIP_WIDTH, CHIP_HEIGHT, 2);
    };

    render() {
        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y
        return (
            <div className={styles.MapPanel}>
                <ControllableCanvas
                    width={width}
                    height={height}
                    onEvent={this.onEvent}
                />
            </div>
        )
    }
}

export default MapPanel
