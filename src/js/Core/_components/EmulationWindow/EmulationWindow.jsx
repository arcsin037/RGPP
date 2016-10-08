import React, {Component, PropTypes} from 'react'

import Button from 'Core/Components/Base/Button'
import ControllableCanvas from 'Core/Components/Base/ControllableCanvas'
import RGPP from 'RGPP'
import Text from 'Core/Components/Base/Text'

import fullScreenIcon from 'Image/System/fullScreenIcon.svg'
import pseudoFullScreenIcon from 'Image/System/pseudoFullScreenIcon.svg'
import styles from './EmulationWindow.scss'
import windowIcon from 'Image/System/windowIcon.svg'

class EmulationWindow extends Component {
    constructor(props) {
        super(props)
        this.titleName = props.titleName
    }

    getCanvasInfo(canvasInfo) {
        console.log('[emulation]canvasInfo :', canvasInfo)
    }

    render() {
        const fullScreenIconImg = <img src={fullScreenIcon} />
        const pseudoFullScreenIconImg = <img src={pseudoFullScreenIcon} />
        const windowIconImg = <img src={windowIcon} />
        const width = RGPP.Config.RESOLUTION_X
        const height = RGPP.Config.RESOLUTION_Y
        return (
            <div id="emulation-window-panel" className={styles.EmulationWindow}>
                <div id='emulation-window-bar'>
                    <Text text={this.titleName} />
                    <div id='emulation-window-buttons'>
                        <Button title='Full Screen'>
                            {fullScreenIconImg}
                        </Button>
                        <Button title='Pseudo Full Screen'>
                            {pseudoFullScreenIconImg}
                        </Button>
                        <Button title='Window Mode'>
                            {windowIconImg}
                        </Button>
                    </div>
                </div>
                <ControllableCanvas
                    width={width}
                    height={height}
                    getCanvasInfo={this.getCanvasInfo}
                />
            </div>
        )
    }
}

EmulationWindow.propTypes = {
    titleName: PropTypes.string.isRequired
}

export default EmulationWindow
