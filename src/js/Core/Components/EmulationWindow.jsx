import React, {PropTypes} from 'react'

import fullScreenIcon from 'Image/System/fullScreenIcon.svg'
import pseudoFullScreenIcon from 'Image/System/pseudoFullScreenIcon.svg'
import windowIcon from 'Image/System/windowIcon.svg'

class EmulationWindow extends React.Component {
    constructor(props) {
        super(props)
        this.titleName = props.titleName
    }

    render() {
        return (
            <div id="emulation-window-panel">
                <div id='emulation-window-bar'>
                    <b>{this.titleName}</b>
                    <div id='emulation-window-buttons'>
                        <button className='FullScreen' title='Full Screen'>
                            <img src={fullScreenIcon}/>
                        </button>
                        <button className='PseudoFullScreen' title='Save Map'>
                            <img src={pseudoFullScreenIcon}/>
                        </button>
                        <button className='btn' title='Save Map'>
                            <img src={windowIcon}/>
                        </button>
                    </div>
                </div>
                <canvas id='emulation-window-canvas'></canvas>
            </div>
        )
    }
}

EmulationWindow.propTypes = {
    titleName: PropTypes.string.isRequired
}

export default EmulationWindow
