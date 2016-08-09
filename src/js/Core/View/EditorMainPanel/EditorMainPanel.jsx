import EmulationWindow from 'Core/Components/EmulationWindow'
import IconMenu from 'Core/Components/Elements/IconMenu'
// import MainPanel from 'Core/Components/MainPanel'
import MapPanel from 'Core/containers/MapPanel'
import PalettePanel from 'Core/containers/PalettePanel'
import RGPP from 'RGPP'
import React from 'react'
import SelectBox from 'Core/Components/Base/SelectBox'
import App from 'Core/Components/TodoList/App'

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
                <App />
                <IconMenu/>
                <div className='selectbox-wrapper'>
                    <SelectBox options={modeOptions} defaultValue='TestMode'/>
                    <SelectBox options={layerOptions} defaultValue='Event'/>
                </div>
                <MapPanel />
                <PalettePanel />
                {/* <EmulationWindow titleName={RGPP.Config.GAME_NAME}/> */}
            {/*<PaletteWindow />*/}
            </div>
        )
    }
}

export default EditorMainPanel
