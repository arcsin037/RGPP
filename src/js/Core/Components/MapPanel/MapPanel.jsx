import React, {Component} from 'react'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import RGPP from 'RGPP'
import styles from './MapPanel.scss'

class MapPanel extends Component {

    getCanvasInfo(canvasInfo) {
        console.log('canvasInfo :', canvasInfo)
    }
    
    render() {
        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y
        return (
            <ControllableCanvas
                width={width}
                height={height}
                getCanvasInfo={this.getCanvasInfo}
            />
        )
    }
}

export default MapPanel
