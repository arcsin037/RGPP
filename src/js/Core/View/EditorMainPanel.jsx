import EmulationWindow from 'Core/Components/EmulationWindow'
import IconMenu from 'Core/Components/Elements/IconMenu'
// import MainPanel from 'Core/Components/MainPanel'
import MapPanel from 'Core/Components/MapPanel'
import PaletteWindow from 'Core/Components/Palette/PaletteWindow.jsx'
import RGPP from 'RGPP'
import React from 'react'
import SelectBox from 'Core/Components/Base/SelectBox.jsx'
import Text from 'Core/Components/Base/Text'
// import FlatButtonExampleSimple from 'Core/Components/FlatButtonExampleSimple'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
                {/*
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <FlatButtonExampleSimple/>
                </MuiThemeProvider>
                */}
                <Text text='test' size='xxsmall' />
                <Text text='test' size='xsmall' />
                <Text text='test' size='small' />
                <Text text='test' size='medium' />
                <Text text='test' />
                <Text text='test' size='large' />
                <Text text='test' size='xlarge' />
                <Text text='test' size='xxlarge' />
                <IconMenu/>
                <div className='selectbox-wrapper'>
                    <SelectBox options={modeOptions} defaultValue='TestMode'/>
                    <SelectBox options={layerOptions} defaultValue='Event'/>
                </div>
                <EmulationWindow titleName={RGPP.Config.GAME_NAME}/>
                <PaletteWindow />
                <MapPanel />
            </div>
        )
    }
}

export default EditorMainPanel
