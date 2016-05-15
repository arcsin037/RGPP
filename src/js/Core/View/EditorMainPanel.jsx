import EmulationWindow from 'Core/Components/EmulationWindow'
import IconMenu from 'Core/Components/IconMenu'
import MainPanel from 'Core/Components/MainPanel'
import PaletteWindow from 'Core/Components/Palette/PaletteWindow.jsx'
import RGPP from 'RGPP'
import React from 'react'
import SelectBox from 'Core/Components/Base/SelectBox.jsx'

/**
 * Main Panel of Editor
 *
 * @class EditorMainPanel
 * @author arcsin
 * @constructor
 */

const modeOptions = [
    {
        value: 'TestMode',
        name: 'Test Mode'
    }, {
        value: 'EmulationMode',
        name: 'EmulationMode Mode'
    }
]

const layerOptions = [
    {
        value: 'Layer1',
        name: 'Layer 1'
    }, {
        value: 'Layer2',
        name: 'Layer 2'
    }, {
        value: 'Layer3',
        name: 'Layer 3'
    }, {
        value: 'Event',
        name: 'Event'
    }
]

class EditorMainPanel extends React.Component {
    render() {
        return (
            <div>
                <IconMenu/>
                <div className='selectbox-wrapper'>
                    <SelectBox options={modeOptions} defaultValue='TestMode'/>
                    <SelectBox options={layerOptions} defaultValue='Event'/>
                </div>
                <EmulationWindow titleName={RGPP.Config.GAME_NAME}/>
                <PaletteWindow />
                <MainPanel />
            </div>
        )
    }
}

export default EditorMainPanel
