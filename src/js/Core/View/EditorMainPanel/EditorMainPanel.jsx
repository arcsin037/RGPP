import React, {Component} from 'react'
import App from 'Core/Components/TodoList/App'
import DrawModeSelectBox from 'Core/containers/DrawModeSelectBox'
// import EmulationWindow from 'Core/Components/EmulationWindow'
import IconMenu from 'Core/Components/Elements/IconMenu'
// import MainPanel from 'Core/Components/MainPanel'
import LayerSelectBox from 'Core/containers/LayerSelectBox'
import MapPanel from 'Core/containers/MapPanel'
import PalettePanel from 'Core/containers/PalettePanel'
// import RGPP from 'RGPP'
import SelectBox from 'Core/Components/Base/SelectBox'

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

class EditorMainPanel extends Component {
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
                    <LayerSelectBox />
                    <DrawModeSelectBox />
                </div>
                <MapPanel id={0} />
                <PalettePanel />
                {/* <EmulationWindow titleName={RGPP.Config.GAME_NAME}/> */}
            {/*<PaletteWindow />*/}
            </div>
        )
    }
}
export default EditorMainPanel
